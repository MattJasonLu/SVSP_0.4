package com.jdlink.controller;


import com.jdlink.domain.*;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.*;
import com.jdlink.util.DBUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.Map;

@Controller
public class AssessmentController {
    @Autowired
    ContractService contractService;
    @Autowired
    LaboratoryTestService laboratoryTestService;
    @Autowired
    ClientService clientService;
    @Autowired
    WayBillService wayBillService;
    @Autowired
    ContractPercentageService contractPercentageService;


    /**
     * 获取各月份合同数据
     *
     * @return
     */
    @RequestMapping("loadMonthData")
    @ResponseBody
    public String loadMonthData(String year) {
        JSONObject res = new JSONObject();
        try {
            //月份数据
            Map<String, Assessment> map = new HashMap<>();
            List<Contract> contractList = contractService.getContractList(year);
            // 遍历合同列表，获取每个合同对应信息
            float wayBillTotalPrice = 0;
            float wayBillTotalWastesAmount = 0;
            for (Contract contract : contractList) {
                String clientId = contract.getClientId();
                //map.put(clientId,laboratoryTest);
                float wayBillPrice = 0;
                float wayBillWastesAmount = 0;
                //根据合同ID获取接运单数据
                WayBill wayBill = wayBillService.getWayBillByContractId(contract.getContractId());
                if(wayBill != null){
                    wayBillPrice = wayBill.getTotal(); //计算单个接运单总额
                    for(WayBillItem wayBillItem : wayBill.getWayBillItemList()){
                        wayBillWastesAmount += wayBillItem.getWastesAmount();  // 计算单个接运单的危废总数量
                    }
                }
                Date beginDate = contract.getBeginTime();
                String month = String.format("%tm", beginDate); // 获取合同月份
                if (!map.keySet().contains(month)) {          // 没有该月份就添加，并初始化累加数据
                    map.put(month, new Assessment());
                    wayBillTotalPrice = 0;
                    wayBillTotalWastesAmount = 0;
                    map.get(month).setWayBillTotalWastesAmount(wayBillTotalWastesAmount);
                    map.get(month).setWayBillTotalPrice(wayBillTotalPrice);
                }
                wayBillTotalPrice = map.get(month).getWayBillTotalPrice();
                wayBillTotalWastesAmount = map.get(month).getWayBillTotalWastesAmount();
                wayBillTotalPrice += wayBillPrice;
                map.get(month).setWayBillTotalPrice(wayBillTotalPrice);    // 所有接运单总金额
                wayBillTotalWastesAmount += wayBillWastesAmount;
                map.get(month).setWayBillTotalWastesAmount(wayBillTotalWastesAmount);   //所有接运单总数量
                map.get(month).setTotalCommission(calculateTotalCommission(wayBillTotalWastesAmount));  // 总提成
            }
            JSONObject jMap = JSONObject.fromMap(map);
            res.put("data", jMap);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }
    /**
     * 搜索合同数据
     *
     * @return
     */
    @RequestMapping("searchMonthData")
    @ResponseBody
    public String searchMonthData(@RequestBody Assessment assessment) {
        JSONObject res = new JSONObject();
        try {
            //月份数据
            Map<String, Assessment> map = new HashMap<>();
            List<Contract> contractList = contractService.searchMonthData(assessment);
            // 遍历合同列表，获取每个合同对应信息
            float wayBillTotalPrice = 0;
            float wayBillTotalWastesAmount = 0;
            for (Contract contract : contractList) {
                String clientId = contract.getClientId();
                //map.put(clientId,laboratoryTest);
                List<QuotationItem> quotationItemList = contract.getQuotationItemList();
                List<WayBillItem> wayBillItemList = new ArrayList<>();
                float wayBillPrice = 0;
                float wayBillWastesAmount = 0;
                //根据合同ID获取接运单数据
                WayBill wayBill = wayBillService.getWayBillByContractId(contract.getContractId());
                if(wayBill != null){
                    wayBillPrice = wayBill.getTotal(); //计算单个接运单总额
                    for(WayBillItem wayBillItem : wayBill.getWayBillItemList()){
                        wayBillWastesAmount += wayBillItem.getWastesAmount();  // 计算单个接运单的危废总数量
                    }
                }
                Date beginDate = contract.getBeginTime();
                String month = String.format("%tm", beginDate); // 获取合同月份
                if (!map.keySet().contains(month)) {          // 没有该月份就添加，并初始化累加数据
                    map.put(month, new Assessment());
                    wayBillTotalPrice = 0;
                    wayBillTotalWastesAmount = 0;
                    map.get(month).setWayBillTotalWastesAmount(wayBillTotalWastesAmount);
                    map.get(month).setWayBillTotalPrice(wayBillTotalPrice);
                }
                wayBillTotalPrice = map.get(month).getWayBillTotalPrice();
                wayBillTotalWastesAmount = map.get(month).getWayBillTotalWastesAmount();
                wayBillTotalPrice += wayBillPrice;
                map.get(month).setWayBillTotalPrice(wayBillTotalPrice);    // 接运单总金额
                wayBillTotalWastesAmount += wayBillWastesAmount;
                map.get(month).setWayBillTotalWastesAmount(wayBillTotalWastesAmount);   //接运单总数量
                map.get(month).setTotalCommission(calculateTotalCommission(wayBillTotalWastesAmount));  // 总提成
            }
            JSONObject jMap = JSONObject.fromMap(map);
            res.put("data", jMap);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }


    /**
     * 计算总提成
     *
     * @param wayBillTotalWastesAmount
     * @return
     */
    public double calculateTotalCommission(float wayBillTotalWastesAmount) {
        // 获取合同提成比例
        List<ContractPercentage> contractPercentageList = contractPercentageService.list();
        double totalCommission = 0;
        for(ContractPercentage contractPercentage : contractPercentageList) {
           if(contractPercentage.getContractAmountMax() == 0){
                    if(contractPercentage.getContractAmountMin() <= wayBillTotalWastesAmount)
                        totalCommission = wayBillTotalWastesAmount * contractPercentage.getCommissionRatio();
           }else {
               if(contractPercentage.getContractAmountMin() <= wayBillTotalWastesAmount && wayBillTotalWastesAmount < contractPercentage.getContractAmountMax())
                   totalCommission = wayBillTotalWastesAmount * contractPercentage.getCommissionRatio();
           }
        }
        return totalCommission;
    }

    /**
     * 根据年月份查询合同数据查询
     * @param month
     * @return
     */
    @RequestMapping("loadMonthSalesmanData")
    @ResponseBody
    public String loadMonthSalesmanData(String month) {
        JSONObject res = new JSONObject();
        try {
            //月份数据
            Map<String, Assessment> map = new HashMap<>();
            List<Contract> contractList = contractService.getContractListByMonth(month);
            // 遍历合同列表，获取每个合同对应信息
            float wayBillTotalPrice = 0;
            float wayBillTotalWastesAmount = 0;
            for (Contract contract : contractList) {
                String clientId = contract.getClientId();
                Date beginDate = contract.getBeginTime();
                String month1 = String.format("%tm", beginDate); // 获取合同月份
                //获取并设置业务员ID和姓名
                Client client = clientService.getByClientId(clientId);
                String salesmanId = "";
                String salesmanName = "";
                if(client != null && client.getSalesman() != null) {
                    salesmanId = client.getSalesman().getSalesmanId();
                    salesmanName = client.getSalesman().getName();
                }
                contract.setSalesmanId(salesmanId);
                contract.setSalesmanName(salesmanName);
                //map.put(clientId,laboratoryTest);
                List<QuotationItem> quotationItemList = contract.getQuotationItemList();
                List<Hazardous> hazardousList = contract.getHazardousList();
                List<WayBillItem> wayBillItemList = new ArrayList<>();
                float wayBillPrice = 0;           // 接运单总额
                float wayBillWastesAmount = 0;     // 接运单危废总数量
                //根据合同ID获取接运单数据
                WayBill wayBill = wayBillService.getWayBillByContractId(contract.getContractId());
                if(wayBill != null){
                    wayBillPrice = wayBill.getTotal(); //计算单个接运单总额
                    for(WayBillItem wayBillItem : wayBill.getWayBillItemList()){
                        wayBillWastesAmount += wayBillItem.getWastesAmount();  // 计算单个接运单的危废总数量
                    }
                }
                if (!map.keySet().contains(salesmanId)) {          // 没有该业务员就添加，并初始化累加数据
                    map.put(salesmanId, new Assessment());
                    wayBillTotalPrice = 0;
                    wayBillTotalWastesAmount = 0;
                    map.get(salesmanId).setMonth(month1);
                    map.get(salesmanId).setSalesmanName(salesmanName);
                    map.get(salesmanId).setSalesmanId(salesmanId);
                    map.get(salesmanId).setWayBillTotalWastesAmount(wayBillTotalWastesAmount);
                    map.get(salesmanId).setWayBillTotalPrice(wayBillTotalPrice);
                }
                wayBillTotalPrice = map.get(salesmanId).getWayBillTotalPrice();
                wayBillTotalWastesAmount = map.get(salesmanId).getWayBillTotalWastesAmount();
                wayBillTotalPrice += wayBillPrice;
                map.get(salesmanId).setWayBillTotalPrice(wayBillTotalPrice);    // 接运单总金额
                wayBillTotalWastesAmount += wayBillWastesAmount;
                map.get(salesmanId).setWayBillTotalWastesAmount(wayBillTotalWastesAmount);   //接运单总数量
                map.get(salesmanId).setTotalCommission(calculateTotalCommission(wayBillTotalWastesAmount));  // 总提成
            }
            JSONObject jMap = JSONObject.fromMap(map);
            res.put("data", jMap);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /**
     * 根据业务员的编号和年月份筛选出所有的合同
     *
     * @param salesmanId 业务员编号
     * @return 合同列表
     */
    @RequestMapping("getContractBySalesman")
    @ResponseBody
    public String getContractBySalesman(String salesmanId, String month) {
        JSONObject res = new JSONObject();
        try {
            // 获取该业务员名下所有合同
            List<Contract> contractList = contractService.getContractBySalesman(salesmanId, month);
            // 危废信息
            //Map<String, LaboratoryTest> map = new HashMap<>();
            // 客户联系信息
            Map<String, String> map2 = new HashMap<>();
            //总额数据
            Map<String, Assessment> map3 = new HashMap<>();
            // 接运单数据
            Map<String, WayBill> map4 = new HashMap<>();
            float wayBillTotalPrice = 0;
            float wayBillTotalWastesAmount = 0;
            // 遍历合同列表，获取每个合同对应信息
            for (Contract contract : contractList) {
                String clientId = contract.getClientId();
                //获取并设置业务员ID和姓名
                Client client = clientService.getByClientId(clientId);
                String companyName = client.getCompanyName();
                String salesmanId1 = client.getSalesman().getSalesmanId();
                String salesmanName = client.getSalesman().getName();
                contract.setSalesmanId(salesmanId1);
                contract.setSalesmanName(salesmanName);
                // 设置map
//                LaboratoryTest laboratoryTest = laboratoryTestService.getRecentLaboratoryTestByClientId(clientId);
//                map.put(clientId,laboratoryTest);
                // 设置map2
                String contactInfo = client.getContactName() + "-" + client.getPhone();
                map2.put(clientId, contactInfo);
                // 设置map3
                List<QuotationItem> quotationItemList = contract.getQuotationItemList();
                List<WayBillItem> wayBillItemList = new ArrayList<>();
                float wayBillPrice = 0;           // 接运单总额
                float wayBillWastesAmount = 0;     // 接运单危废总数量
                //根据合同ID获取接运单数据
                WayBill wayBill = wayBillService.getWayBillByContractId(contract.getContractId());
                if(wayBill != null){
                    wayBillPrice = wayBill.getTotal(); //计算单个接运单总额
                    for(WayBillItem wayBillItem : wayBill.getWayBillItemList()){
                        wayBillWastesAmount += wayBillItem.getWastesAmount();  // 计算单个接运单的危废总数量
                    }
                }
                if (!map3.keySet().contains(clientId)) {          // 没有就添加，并初始化累加数据
                    map3.put(clientId, new Assessment());
                    wayBillTotalPrice = 0;
                    wayBillTotalWastesAmount = 0;
                    map3.get(clientId).setSalesmanName(salesmanName);
                    map3.get(clientId).setSalesmanId(salesmanId);
                    map3.get(clientId).setWayBillTotalWastesAmount(wayBillTotalWastesAmount);
                    map3.get(clientId).setWayBillTotalPrice(wayBillTotalPrice);
                }
                wayBillTotalPrice = map3.get(clientId).getWayBillTotalPrice();
                wayBillTotalWastesAmount = map3.get(clientId).getWayBillTotalWastesAmount();
                wayBillTotalPrice += wayBillPrice;
                map3.get(clientId).setWayBillTotalPrice(wayBillTotalPrice);    // 接运单总金额
                wayBillTotalWastesAmount += wayBillWastesAmount;
                map3.get(clientId).setWayBillTotalWastesAmount(wayBillTotalWastesAmount);   //接运单总数量
                map3.get(clientId).setTotalCommission(calculateTotalCommission(wayBillTotalWastesAmount));  // 总提成
                map3.get(clientId).setCompanyName(companyName);
                // 设置map4
                if (!map4.keySet().contains(clientId)) {
                    if (wayBill != null)
                        map4.put(clientId, wayBill);
                }
            }
            // map转json
//            JSONObject jMap = JSONObject.fromMap(map);
            JSONObject jMap2 = JSONObject.fromMap(map2);
            JSONObject jMap3 = JSONObject.fromMap(map3);
//            JSONArray data = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            // 赋值
            JSONObject jMap4 = JSONObject.fromMap(map4);
            res.put("status", "success");
            res.put("message", "获取成功");
            // res.put("contractInfo", data);
//            res.put("wastesInfo", jMap);
            res.put("contactInfo", jMap2);                // 联系人信息
            res.put("assessmentInfo", jMap3);              // 总额信息
            res.put("wayBillInfo", jMap4);              // 接运单信息
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

    @ResponseBody
    @RequestMapping("getContractByMonth")
    public String getContractByMonth(String month){
        JSONObject res = new JSONObject();
        try {
            // 获取该时间内的所有合同
            List<Contract> contractList = contractService.getContractByMonth(month);
            // 危废信息
            JSONArray data = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            res.put("data",data);
            res.put("status", "success");
            res.put("message", "获取成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

    /**
     * 导出(带表头字段)
     *
     * @param name
     * @param response
     * @param sqlWords
     * @return
     */
    @RequestMapping("exportExcelAssessment")
    @ResponseBody
    public String exportExcelAssessment(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            // 设置表头
            String tableHead = "合同编号/合同起始时间/业务员编号/业务员姓名/产废单位/接运单总额/备注";
            name = "月份考核";   // 重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");
        } catch (IOException ex) {
            ex.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");
        }
        return res.toString();
    }

}

