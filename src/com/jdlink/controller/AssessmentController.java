package com.jdlink.controller;

import com.jdlink.domain.Client;
import com.jdlink.domain.Contract;
import com.jdlink.domain.Hazardous;
import com.jdlink.domain.Produce.Assessment;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.domain.Produce.WayBillItem;
import com.jdlink.service.ClientService;
import com.jdlink.service.ContractService;
import com.jdlink.service.LaboratoryTestService;
import com.jdlink.service.WayBillService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

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

    @RequestMapping("loadMonthData")
    @ResponseBody
    public String loadMonthData(){
        JSONObject res = new JSONObject();
        try {
            //月份数据
            Map<String,Assessment> map = new HashMap<>();
            List<Contract> contractList = contractService.getContractList();
            // 遍历合同列表，获取每个合同对应信息
            float wayBillTotalPrice = 0;
            float  wayBillTotalWastesAmount = 0;
            for (Contract contract : contractList) {
                String clientId = contract.getClientId();
                //map.put(clientId,laboratoryTest);
                List<Hazardous> hazardousList = contract.getHazardousList();
                List<WayBillItem> wayBillItemList = new ArrayList<>();
                float wayBillPrice = 0;
                float wayBillWastesAmount = 0;
                //获取接运单明细数据
                for(Hazardous hazardous : hazardousList){
                    String code = hazardous.getCode();
                    if(code != null){
                        WayBillItem wayBillItem = wayBillService.getWayBillItemByClientIdAndWastesCode(clientId,code);
                        wayBillItemList.add(wayBillItem);
                        wayBillPrice += wayBillItem.getWastes().getUnitPriceTax() *  wayBillItem.getWastes().getWasteAmount(); //计算接运单明细总额
                        wayBillWastesAmount += wayBillItem.getWastes().getWasteAmount();  // 计算危废总数量
                    }
                }
                Date beginDate = contract.getBeginTime();
                String month = String .format("%tm", beginDate); // 获取合同月份
                if (!map.keySet().contains(month)){          // 没有该月份就添加，并初始化累加数据
                    map.put(month,new Assessment());
                    wayBillTotalPrice = 0;
                    wayBillTotalWastesAmount = 0;
                    map.get(month).setWayBillTotalWastesAmount(wayBillTotalWastesAmount);
                    map.get(month).setWayBillTotalPrice(wayBillTotalPrice);
                }
                wayBillTotalPrice = map.get(month).getWayBillTotalPrice();
                wayBillTotalWastesAmount= map.get(month).getWayBillTotalWastesAmount();
                wayBillTotalPrice += wayBillPrice;
                map.get(month).setWayBillTotalPrice(wayBillTotalPrice);    // 接运单总金额
                wayBillTotalWastesAmount += wayBillWastesAmount;
                map.get(month).setWayBillTotalWastesAmount(wayBillTotalWastesAmount);   //接运单总数量
                map.get(month).setTotalCommission(calculateTotalCommission(wayBillTotalWastesAmount));  // 总提成
            }
            JSONObject jMap = JSONObject.fromMap(map);
            res.put("data",jMap);
            res.put("status","success");
            res.put("message","获取数据成功");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","获取数据失败");
        }
        return res.toString();
    }

    /**
     * 计算总提成
     * @param wayBillTotalWastesAmount
     * @return
     */
    public double calculateTotalCommission(float wayBillTotalWastesAmount){
        double totalCommission = 0;
        if(wayBillTotalWastesAmount < 10){
            totalCommission = 0;
        }else if(wayBillTotalWastesAmount >= 10 && wayBillTotalWastesAmount < 50){
            totalCommission = wayBillTotalWastesAmount * 0.004;
        }else if(wayBillTotalWastesAmount >= 50 && wayBillTotalWastesAmount < 200){
            totalCommission = wayBillTotalWastesAmount * 0.01;
        }else if(wayBillTotalWastesAmount >= 200 && wayBillTotalWastesAmount < 500){
            totalCommission = wayBillTotalWastesAmount * 0.013;
        }else if(wayBillTotalWastesAmount >= 500 && wayBillTotalWastesAmount < 2000){
            totalCommission = wayBillTotalWastesAmount * 0.02;
        }else if(wayBillTotalWastesAmount >= 2000 && wayBillTotalWastesAmount <5000 ){
            totalCommission = wayBillTotalWastesAmount * 0.025;
        }else if(wayBillTotalWastesAmount >=5000){
            totalCommission = wayBillTotalWastesAmount * 0.035;
        }
        return totalCommission;
    }
}

