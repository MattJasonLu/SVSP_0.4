package com.jdlink.controller;

import com.jdlink.domain.DisposalContract;
import com.jdlink.domain.Page;
import com.jdlink.service.DisposalContractSrevice;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 危险废物处置合同控制器
 */
@Controller
public class DisposalContractController {
    @Autowired
    DisposalContractSrevice disposalContractSrevice;

    //添加危险废物处置合同
    @RequestMapping("addWastesContract")
    @ResponseBody
    public String addWastesContract(@RequestBody DisposalContract disposalContract){
        JSONObject res=new JSONObject();

        try {
    disposalContractSrevice.addWastesContract(disposalContract);
            res.put("status", "success");
            res.put("message", "添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败");

        }

        return res.toString();


    }


    //页面初始化
    @RequestMapping("loadWastesContractList")
    @ResponseBody
    public String loadWastesContractList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            List<DisposalContract> disposalContractList=disposalContractSrevice.loadWastesContractList(page);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", disposalContractList);

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }

        return res.toString();

    }

    //通过编号获取意向书
    @RequestMapping("getWastesContractListById")
    @ResponseBody
    public String getWastesContractListById(String id){
        JSONObject res=new JSONObject();

        try {
      DisposalContract disposalContract=disposalContractSrevice.getWastesContractListById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", disposalContract);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }

        return res.toString();

    }

    //修改意向书
    @RequestMapping("updateWastesContract")
    @ResponseBody
    public String updateWastesContract(@RequestBody DisposalContract disposalContract){
        JSONObject res=new JSONObject();

        try {
            disposalContractSrevice.updateWastesContract(disposalContract);
            res.put("status", "success");
            res.put("message", "更新成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");

        }


        return res.toString();



    }
}
