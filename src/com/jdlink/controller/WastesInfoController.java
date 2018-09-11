package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.FormType;
import com.jdlink.domain.PackageType;
import com.jdlink.domain.Produce.Equipment;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.ProcessWay;
import com.jdlink.domain.WastesInfo;
import com.jdlink.service.WastesInfoService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class WastesInfoController {

    @Autowired
    WastesInfoService wastesInfoService;

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
}