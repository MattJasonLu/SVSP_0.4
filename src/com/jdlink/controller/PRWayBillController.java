package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.domain.Produce.WayBillItem;
import com.jdlink.service.ClientService;
import com.jdlink.service.WayBillService;
import com.jdlink.util.DBUtil;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class PRWayBillController {

    @Autowired
    WayBillService wayBillService;
    @Autowired
    ClientService clientService;


    @RequestMapping("addWayBill")
    @ResponseBody
    public String addWayBill(@RequestBody WayBill wayBill) {
        JSONObject res = new JSONObject();
        try {
            wayBillService.addWayBill(wayBill);
            res.put("status", "success");
            res.put("message", "添加成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败！");
        }
        return res.toString();
    }


    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalWayBillRecord")
    @ResponseBody
    public int totalWayBillRecord() {
        try {
            return wayBillService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageWayBillList")
    @ResponseBody
    public String loadPageWayBillList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<WayBill> wayBillList = wayBillService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(wayBillList.toArray(new WayBill[wayBillList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }

    @RequestMapping("getWayBill")
    @ResponseBody
    public String getWayBill(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            WayBill wayBill = wayBillService.getById(id);
            //新建一个对象并给它赋值为wayBill
            JSONObject data = JSONObject.fromBean(wayBill);
            res.put("data", data);
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
     * 获取目前的接运单编号
     *
     * @return
     */
    @RequestMapping("getCurrentWayBillId")
    @ResponseBody
    public String getCurrentWayBillId() {
        String id = wayBillService.getCurrentWayBillId();
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importWayBillExcel")
    @ResponseBody
    public String importWayBillExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
//            {
//                System.out.println("数据如下：");
//                for (int i = 1; i < data.length; i++) {
//                    for (int j = 0; j < data[0].length; j++) {
//                        System.out.print(data[i][j].toString());
//                        System.out.print(",");
//                    }
//                    System.out.println();
//                }
//            }
            Map<String, WayBill> map = new HashMap<>();
            float total = 0;
            List<WayBillItem> wayBillItemList = new ArrayList<>();
            for (int i = 1; i < data.length; i++) {
                BigDecimal id = new BigDecimal(data[i][0].toString());  // 科学计数法转换，获取ID
                WayBillItem wayBillItem = new WayBillItem();
                wayBillItem.setItemId(wayBillService.getItemId());
                wayBillItem.setWayBillId(id.toString());
                wayBillItem.setReceiveCompanyName(data[i][6].toString());
                wayBillItem.setReceiveCompanyOperator(data[i][7].toString());
                wayBillItem.setReceiveDate(DateUtil.getDateFromStr(data[i][8].toString()));
                wayBillItem.setSalesmanName(data[i][9].toString());
                wayBillItem.setWastesName(data[i][10].toString());
                wayBillItem.setWastesAmount(Float.parseFloat(data[i][11].toString()));
                wayBillItem.setWastesPrice(Float.parseFloat(data[i][12].toString()));
                wayBillItem.setWastesCode(data[i][13].toString());
                float wastesTotal = Float.parseFloat(data[i][12].toString()) * Float.parseFloat(data[i][11].toString());
                wayBillItem.setWastesTotalPrice(wastesTotal);
                wayBillItem.setInvoiceDate(DateUtil.getDateFromStr(data[i][14].toString()));
                BigDecimal invoiceNumber = new BigDecimal(data[i][15].toString());
                wayBillItem.setInvoiceNumber(invoiceNumber.toString());
                //map内不存在即添加公共数据，存在即添加List内数据
                if (!map.keySet().contains(id.toString())) {
                    map.put(id.toString(), new WayBill());
                    map.get(id.toString()).setId(id.toString());
                    String produceCompanyId = wayBillService.getClientIdByName(data[i][1].toString());
                    map.get(id.toString()).setProduceCompanyId(produceCompanyId);
                    map.get(id.toString()).setProduceCompanyName(data[i][1].toString());
                    map.get(id.toString()).setFounder(data[i][2].toString());
                    map.get(id.toString()).setRemarks(data[i][3].toString());
                    map.get(id.toString()).setProduceCompanyOperator(data[i][4].toString());
                    map.get(id.toString()).setFreight(Float.parseFloat(data[i][5].toString()));
                    //新存储一个id对象时，将以下两个累计数据清零
                    total = 0;
                    wayBillItemList = new ArrayList<>();

                }
                wayBillItemList.add(wayBillItem);
                map.get(id.toString()).setWayBillItemList(wayBillItemList);
                total += wastesTotal;
                map.get(id.toString()).setTotal(total);
                // map.get(id.toString()).getWayBillItemList().add(wayBillItem);
            }
            for (String key : map.keySet()) {
                WayBill wayBill1 = wayBillService.getById(map.get(key).getId());
                WayBill wayBill = map.get(key);
                if (wayBill1 == null) {
                    //插入新数据
                    wayBillService.addWayBill(wayBill);
                } else {
                    //根据id更新数据
                    wayBillService.update(wayBill);
                }
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();
    }

    @RequestMapping("getWayBillSeniorSelectedList")
    @ResponseBody
    public String getWayBillSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        CheckState[] states = new CheckState[]{CheckState.NewBuild, CheckState.ToExamine, CheckState.Examining, CheckState.Approval, CheckState.Backed, CheckState.Invalid};
        JSONArray stateList = JSONArray.fromArray(states);
        res.put("stateList", stateList);
        return res.toString();
    }

    @RequestMapping("searchWayBillTotal")
    @ResponseBody
    public int searchWayBillTotal(@RequestBody WayBill wayBill) {
        try {
            return wayBillService.searchCount(wayBill);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param wayBill
     * @return
     */
    @RequestMapping("searchWayBill")
    @ResponseBody
    public String searchSampleInfo(@RequestBody WayBill wayBill) {
        JSONObject res = new JSONObject();
        try {
            List<WayBill> wayBillList = wayBillService.search(wayBill);
            JSONArray data = JSONArray.fromArray(wayBillList.toArray(new WayBill[wayBillList.size()]));
            System.out.println(data);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    /**
     * 审核通过
     *
     * @param wayBill
     * @return
     */
    @RequestMapping("approvalWayBill")
    @ResponseBody
    public String approvalWayBill(@RequestBody WayBill wayBill) {
        JSONObject res = new JSONObject();
        try {
            wayBillService.approval(wayBill);
            res.put("status", "success");
            res.put("message", "审核通过成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审核通过失败！");
        }
        return res.toString();
    }

    /**
     * 驳回
     *
     * @param wayBill
     * @return
     */
    @RequestMapping("rejectWayBill")
    @ResponseBody
    public String rejectWayBill(@RequestBody WayBill wayBill) {
        JSONObject res = new JSONObject();
        try {
            wayBillService.reject(wayBill);
            res.put("status", "success");
            res.put("message", "审核驳回成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审核驳回失败！");
        }
        return res.toString();
    }

    /**
     * 提交
     *
     * @param id
     * @return
     */
    @RequestMapping("submitWayBill")
    @ResponseBody
    public String submitWayBill(String id) {
        JSONObject res = new JSONObject();
        try {
            wayBillService.submit(id);
            res.put("status", "success");
            res.put("message", "提交成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败！");
        }
        return res.toString();
    }

    /**
     * 作废
     *
     * @param id
     * @return
     */
    @RequestMapping("invalidWayBill")
    @ResponseBody
    public String invalidWayBill(String id) {
        JSONObject res = new JSONObject();
        try {
            wayBillService.invalid(id);
            res.put("status", "success");
            res.put("message", "作废成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败！");
        }
        return res.toString();
    }
/////////////////////////////////////////////////////////////////////////
    //WayBill.html

    /**
     * 添加接运单详细项目
     *
     * @param wayBill
     * @return
     */
    @RequestMapping("addWayBillItem")
    @ResponseBody
    public String addWayBillItem(@RequestBody WayBill wayBill) {
        JSONObject res = new JSONObject();
        try {
            wayBillService.deleteItem(wayBill.getId());
            wayBillService.addItem(wayBill);
            res.put("status", "success");
            res.put("message", "添加接运单详细项目成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加接运单详细项目失败！");
        }
        return res.toString();
    }

    @RequestMapping("getCurrentItemId")
    @ResponseBody
    public String getCurrentItemId() {
        JSONObject res = new JSONObject();
        int count = wayBillService.countItem() + 1;
        String id = Integer.toString(count);
        while (wayBillService.getItemById(id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id = index + "";
        }
        res.put("id", id);
        return res.toString();
    }

    @RequestMapping("getSalesmanIdByName")
    @ResponseBody
    public String getSalesmanByName(String name) {
        JSONObject res = new JSONObject();
        String id = wayBillService.getSalesmanIdByName(name);
        res.put("id", id);
        return res.toString();
    }

    @RequestMapping("getClientIdByName")
    @ResponseBody
    public String getClientIdByName(String name) {
        JSONObject res = new JSONObject();
        String id = wayBillService.getClientIdByName(name);
        res.put("id", id);
        return res.toString();
    }

    @RequestMapping("getWastesIdByName")
    @ResponseBody
    public String getWastesIdByName(String name) {
        JSONObject res = new JSONObject();
        String id = wayBillService.getWastesIdByName(name);
        res.put("id", id);
        return res.toString();
    }

    @RequestMapping("getCurrentItemWastesId")
    @ResponseBody
    public String getCurrentWastesId() {
        JSONObject res = new JSONObject();
        // 得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(8);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(8);
        String id;
        int index = wayBillService.countWastes();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (wayBillService.getWastesById(id) != null);
        res.put("id", id);
        return res.toString();
    }

    @RequestMapping("changeWastesIdFormat")
    @ResponseBody
    public String changeWastesIdFormat(int id) {
        JSONObject res = new JSONObject();
        // 得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(8);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(8);
        String r = nf.format(id);
        res.put("id", r);
        return res.toString();
    }

    /**
     * 自动设置接运单业务员
     */
    @RequestMapping("setSalesmanNameAuto")
    @ResponseBody
    public String setSalesmanNameAuto() {
        JSONObject res = new JSONObject();
        try {
            List<Client> clientList = clientService.listAll(); // 获取公司信息
//            for(int i = 0; i< clientList.size();i++){
//                System.out.print(clientList.get(i).getCompanyName()+"-"+clientList.get(i).getSalesman().getName()+" ");
//                if(i%5 == 0) System.out.println();
//            }
            if (clientList.size() > 0)
                for (Client client : clientList) {
                    String salesmanName = "";
                    if (client.getSalesman() != null) {
                        salesmanName = client.getSalesman().getName(); // 获取业务员姓名
                        String companyName = client.getCompanyName();  // 获取公司名
                        System.out.print(salesmanName + "," + companyName + " ");
                        if (salesmanName != null && !salesmanName.equals(""))
                            wayBillService.updateSalesmanNameByCompanyName(salesmanName, companyName);
                    }
                }
            res.put("status", "success");
            res.put("message", "设置成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "设置失败！");
        }
        return res.toString();
    }

}
