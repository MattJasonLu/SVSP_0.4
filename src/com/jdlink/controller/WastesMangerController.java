package com.jdlink.controller;

import com.jdlink.domain.Category;
import com.jdlink.domain.Characteristic;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WasteInto;
import com.jdlink.domain.WastesInfo;
import com.jdlink.service.produce.WastesMangerService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class WastesMangerController {
    @Autowired
    WastesMangerService wastesMangerService;

    /**
     * 获取危废编码集合
     * @return 危废编码集合
     */
    @RequestMapping("getWastesMangerList")
    @ResponseBody
    public String getWastesInfoList(@RequestBody Page page){
        JSONObject res = new JSONObject();
        try {
            List<WastesInfo> wastesInfoList = wastesMangerService.list(page);
            JSONArray data = JSONArray.fromArray(wastesInfoList.toArray(new WastesInfo[wastesInfoList.size()]));
            res.put("data", data.toString());
            res.put("status", "success");
            res.put("message", "危废信息获取成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "危废信息获取失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 获取总数
     */
    @RequestMapping("totalWastesMangerRecord")
    @ResponseBody
    public int totalWastesMangerRecord(){
        return wastesMangerService.totalWastesMangerRecord();

    }

    /**
     * 获取所有的危废类别
     */
    @RequestMapping("getWastesCategoryList")
    @ResponseBody
    public String getWastesCategoryList(){
        JSONObject res = new JSONObject();

        try {
            List<Category> categoryList=wastesMangerService.getWastesCategoryList();
            res.put("status", "success");
            res.put("message", "获取危废类别下拉框成功");
            res.put("data", categoryList);
        }
        catch (Exception e){


        }

        return res.toString();

    }

    /**
     * 获取所有的危废特性
     */
    @RequestMapping("getWastesCharacteristicList")
    @ResponseBody
    public String getWastesCharacteristicList(){
        JSONObject res = new JSONObject();

        try {
            List<Characteristic> characteristicList=wastesMangerService.getWastesCharacteristicList();
            res.put("status", "success");
            res.put("message", "获取危废特性下拉框成功");
            res.put("data", characteristicList);
        }
        catch (Exception e){


        }

        return res.toString();

    }

    /**
     * 新增危废代码
     */
    @RequestMapping("addWastesManger")
    @ResponseBody
    public String addWastesManger(@RequestBody WastesInfo wastesInfo){
        JSONObject res=new JSONObject();
         try {
           wastesMangerService.addWastesManger(wastesInfo);
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

    /**
     * 删除危废代码
     */
    @RequestMapping("removeWastesManger")
    @ResponseBody
    public String removeWastesManger(int id){
        JSONObject res=new JSONObject();
        try {
           wastesMangerService.removeWastesManger(id);
            res.put("status", "success");
            res.put("message", "删除成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除失败");

        }

        return res.toString();

    }

    /**
     * 根据编号获取信息
     */
    @RequestMapping("getWastesMangerById")
    @ResponseBody
    public String getWastesMangerById(int id){
        JSONObject res=new JSONObject();

        try {
            WastesInfo wastesInfo=wastesMangerService.getWastesMangerById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", wastesInfo);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }

        return res.toString();
    }

    /**
     * 更新
     */
    @RequestMapping("updateWastesManger")
    @ResponseBody
    public String updateWastesManger(@RequestBody WastesInfo wastesInfo){
        JSONObject res=new JSONObject();

        try {
           wastesMangerService.updateWastesManger(wastesInfo);
            res.put("status", "success");
            res.put("message", "修改成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改失败");
        }

        return res.toString();
    }

    /**
     * 查询
     */
    @RequestMapping("searchWastesManger")
    @ResponseBody
    public  String searchWastesManger(@RequestBody WastesInfo wastesInfo){
        JSONObject res=new JSONObject();

        try {
            List<WastesInfo> wastesInfoList = wastesMangerService.searchWastesManger(wastesInfo);
            JSONArray data = JSONArray.fromArray(wastesInfoList.toArray(new WastesInfo[wastesInfoList.size()]));
            res.put("data", data.toString());
            res.put("status", "success");
            res.put("message", "危废信息获取成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "危废信息获取失败");
            res.put("exception", e.getMessage());
        }

   return res.toString();
    }


    /**
     * 查询计数
     */
    @RequestMapping("searchWastesMangerCount")
    @ResponseBody
    public int searchWastesMangerCount(@RequestBody WastesInfo wastesInfo){


        return wastesMangerService.searchWastesMangerCount(wastesInfo);
    }

}
