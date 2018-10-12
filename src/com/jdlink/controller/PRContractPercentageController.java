package com.jdlink.controller;

import com.jdlink.domain.Produce.ContractPercentage;
import com.jdlink.service.ContractPercentageService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class PRContractPercentageController {
    @Autowired
    ContractPercentageService contractPercentageService;

    @RequestMapping("loadContractPercentage")
    @ResponseBody
    public String loadContractPercentage(){
        JSONObject res = new JSONObject();
        try {
            // 获取所有的数据
            List<ContractPercentage> contractPercentageList = contractPercentageService.list();
            JSONArray data = JSONArray.fromArray(contractPercentageList.toArray(new ContractPercentage[contractPercentageList.size()]));
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

    @RequestMapping("saveContractPercentageList")
    @ResponseBody
    public String saveContractPercentageList(@RequestBody List<ContractPercentage> contractPercentageList) {
        JSONObject res = new JSONObject();
        try {
            contractPercentageService.deleteAll();            // 删除所有旧数据
            for(int i = 0; i < contractPercentageList.size(); i++){
                contractPercentageService.add(contractPercentageList.get(i));   // 添加新数据
            }
            res.put("message", "保存数据成功");
            res.put("status", "success");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "保存数据失败");
            res.put("status", "fail");
        }
        return res.toString();
    }
}
