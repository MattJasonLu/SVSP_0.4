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

    //签订意向书
    @RequestMapping("signDisposalContract")
    @ResponseBody
    public String signDisposalContract(int id){
        JSONObject res=new JSONObject();
try {
    disposalContractSrevice.signDisposalContract(id);
    res.put("status", "success");
    res.put("message", "合同签订成功");

}
catch (Exception e){
    e.printStackTrace();
    res.put("status", "fail");
    res.put("message", "合同签订失败");
}

        return res.toString();
    }

    //作废意向书
    @RequestMapping("cancelDisposalContract")
    @ResponseBody
    public String cancelDisposalContract(int id){
        JSONObject res=new JSONObject();

        try {
           disposalContractSrevice.cancelDisposalContract(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }

        return res.toString();

    }

    //危废处置意向书查询
    @RequestMapping("searchDisposalContract")
    @ResponseBody
    public String searchDisposalContract(@RequestBody DisposalContract disposalContract){
        JSONObject res=new JSONObject();

        try {
            List<DisposalContract> disposalContractList=disposalContractSrevice.searchDisposalContract(disposalContract);
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", disposalContractList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");

        }
        return res.toString();

    }


    //查询总数==>高级
    @RequestMapping("searchDisposalContractCount")
    @ResponseBody
    public  int searchCompatibilityTotal(@RequestBody DisposalContract disposalContract){

        try {
            return disposalContractSrevice.searchDisposalContractCount(disposalContract);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
}


