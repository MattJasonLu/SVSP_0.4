package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Dictionary.SecondaryCategory;
import com.jdlink.domain.Inventory.RecordState;
import com.jdlink.domain.Inventory.WareHouse;
import com.jdlink.domain.Produce.Equipment;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.ProcessWay;
import com.jdlink.service.SecondaryCategoryService;
import com.jdlink.service.WastesInfoService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
public class WastesInfoController {

    @Autowired
    WastesInfoService wastesInfoService;
    @Autowired
    SecondaryCategoryService secondaryCategoryService;

    /**
     * 获取危废编码集合
     * @return 危废编码集合
     */
    @RequestMapping("getWastesInfoList")
    @ResponseBody
    public String getWastesInfoList(){
        JSONObject res = new JSONObject();
        try {
            List<WastesInfo> wastesInfoList = wastesInfoService.list();
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

    // TODO: 获取危废类别集合 @2018.8.2

    /**
     * 获取危废物质形态和包装方式枚举信息
     * @return 物质形态和包装方式
     */
    @RequestMapping("getFormTypeAndPackageType")
    @ResponseBody
    public String getFormTypeAndPackageType() {
        JSONObject res = new JSONObject();
        JSONArray formTypeList = JSONArray.fromArray(FormType.values());
        res.put("formTypeList", formTypeList);
        JSONArray packageTypeList = JSONArray.fromArray(PackageType.values());
        res.put("packageTypeList", packageTypeList);
        return res.toString();
    }

    /**
     * 获取审核状态
     * @return 审核状态
     */
    @RequestMapping("getCheckState")
    @ResponseBody
    public String getCheckState() {
        JSONObject res = new JSONObject();
        JSONArray checkStateList = JSONArray.fromArray(CheckState.values());
        res.put("checkStateList", checkStateList);
        return res.toString();
    }

    @RequestMapping("getRecordState")
    @ResponseBody
    public String getRecordState() {
        JSONObject res = new JSONObject();
        JSONArray recordStateList = JSONArray.fromArray(RecordState.values());
        res.put("recordStateList", recordStateList);
        return res.toString();
    }

    /**
     * 获取处置方式
     * @return 处置方式
     */
    @RequestMapping("getProcessWay")
    @ResponseBody
    public String getProcessWay() {
        JSONObject res = new JSONObject();
        try {
            JSONArray processWayList = JSONArray.fromArray(ProcessWay.values());
            res.put("processWayList", processWayList);
            res.put("status", "success");
            res.put("message", "获取信息成功");
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

    /**
     * 获取处置方式
     * @return 处置方式
     */
    @RequestMapping("getHandleCategory")
    @ResponseBody
    public String getHandleCategory() {
        JSONObject res = new JSONObject();
        try {
            JSONArray handleCategoryList = JSONArray.fromArray(HandleCategory.values());
            res.put("handleCategoryList", handleCategoryList);
            res.put("status", "success");
            res.put("message", "获取信息成功");
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }
    /**
     * 设置下拉框数据
     */
    @RequestMapping("getEquipmentNameList")
    @ResponseBody
    public String getEquipmentNameList() {
        JSONObject res = new JSONObject();
        //获取枚举
        //故障设备名称
        try{
            JSONArray equipmentList = JSONArray.fromArray(Equipment.values());
//            Equipment[] equipment = new Equipment[]{Equipment.MedicalCookingSystem,Equipment.A2,Equipment.B2,Equipment.SecondaryTwoCombustionChamber,Equipment.ThirdPhasePretreatmentSystem,Equipment.Prepare2};
//            JSONArray equipmentList = JSONArray.fromArray(equipment);
            res.put("equipmentList",equipmentList);
            res.put("status", "success");
            res.put("message", "获取信息成功");
        } catch (Exception e){
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }

        return res.toString();
    }
    /**
     * 仓库接口
     */
    @RequestMapping("getWareHouseList")
    @ResponseBody
    public String getWareHouseList(){
        JSONObject res=new JSONObject();
        try {
       List<WareHouse> wareHouseList=wastesInfoService.getWareHouseList();
       JSONArray array=JSONArray.fromObject(wareHouseList);
            res.put("status", "success");
            res.put("message", "仓库查询成功");
            res.put("array", array);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "仓库查询失败");
        }
       return  res.toString();
    }

    /**
     * 获取运输方式
     */
    @RequestMapping("getTransportTypeList")
    @ResponseBody
    public String getTransportTypeList(){
        JSONObject res = new JSONObject();
        try {
            JSONArray transportTypeList = JSONArray.fromArray(TransportType.values());
            res.put("transportTypeList",transportTypeList);
            res.put("status", "success");
            res.put("message", "获取运输方式成功");
        }
        catch (Exception e){
            res.put("status", "fail");
            res.put("message", "获取运输方式失败");
        }

         return  res.toString();
    }

    /**
     * 获取单位
     */
    @RequestMapping("getUnitList")
    @ResponseBody
    public String getUnitList(){
      JSONObject res = new JSONObject();
      try {
          JSONArray unitList = JSONArray.fromArray(Unit.values());
          res.put("unitList",unitList);
          res.put("status", "success");
          res.put("message", "获取单位成功");
      }
      catch (Exception e){
          res.put("status", "fail");
          res.put("message", "获取单位失败");
      }

      return res.toString();
  }

    /**
     * 根据危废编码获取危废名称
     */
    @RequestMapping("getWastesNameByCode")
    @ResponseBody
    public String getWastesNameByCode(String code){
        JSONObject res=new JSONObject();
        try{
       String wastesName=wastesInfoService.getWastesNameByCode(code);
            res.put("status", "success");
            res.put("message", "危废名称成功");
            res.put("wastesName", wastesName);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "危废名称失败");
        }

        return res.toString();

    }

    @RequestMapping("getSecondaryCategory")
    @ResponseBody
    public String getSecondaryCategory() {
        JSONObject res = new JSONObject();
        try {
            List<SecondaryCategory> secondaryCategoryList = secondaryCategoryService.list();
            JSONArray data = JSONArray.fromArray(secondaryCategoryList.toArray());
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取单位成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取单位失败");
        }
        return res.toString();
    }

}