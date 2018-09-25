package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Inventory.RecordState;
import com.jdlink.domain.Inventory.WareHouse;
import com.jdlink.domain.Produce.Equipment;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.ProcessWay;
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
     * 仓库借口
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
     * 你可以url中打love试下
     * @param response
     * @throws Exception
     */
    @RequestMapping("love")
    @ResponseBody
    public void getLove(HttpServletResponse response) throws Exception {
        response.setContentType("text/html;charset=utf-8");
        String data = printLove();
        for (int i = 0; i < data.length(); i++) {
            write(response,data.charAt(i) + "");
            Thread.sleep(10);
        }

        response.getWriter().close();
    }

    private void write(HttpServletResponse response,String content) throws Exception {
        response.getWriter().write(content);
        response.flushBuffer();
        response.getWriter().flush();
    }

    public String printLove() {
        StringBuilder love = new StringBuilder();
        // 分三个大部分 上中下
        for (int i = 0, k = 0; i < 14; i++) {// 打印行

            // 上部分 上分为 四个部分

            if (i < 3) {

                for (int j = 0; j < 5 - 2 * i; j++) {// 1、空心

//                    System.out.print(" ");
                    love.append("&nbsp;&nbsp;");

                }

                if (i == 2) {// 2、*

                    for (int j = 0; j < 6 + 4 * i - 1; j++) {

//                        System.out.print("*");
                        love.append("*");
                    }

                    for (int j = 0; j < 7 - 4 * i + 2; j++) {// 3、空心

                        love.append("&nbsp;&nbsp;");

                    }

                    for (int j = 0; j < 6 + 4 * i - 1; j++) {// 4、*

                        love.append("*");

                    }

                } else {

                    for (int j = 0; j < 6 + 4 * i; j++) {// 2、*

                        love.append("*");

                    }

                    for (int j = 0; j < 7 - 4 * i; j++) {// 3、空心

                        love.append("&nbsp;&nbsp;");

                    }

                    for (int j = 0; j < 6 + 4 * i; j++) {// 4、*

                        love.append("*");

                    }

                }

            } else if (i < 6) {// 中间

                for (int j = 0; j < 29; j++) {

                    love.append("*");

                }

            } else {// 下部分 6

                if (i == 13) {

                    for (int j = 0; j < 2 * (i - 6); j++) {// 打印空格

                        love.append("&nbsp;&nbsp;");

                    }

                    love.append("*");

                } else {

                    for (int j = 0; j < 2 * (i - 6) + 1; j++) {// 打印空格

                        love.append("&nbsp;&nbsp;");

                    }

                    for (int j = 1; j < 28 - 4 * k; j++) {

                        love.append("*");

                    }

                    k++;

                }

            }

            love.append("<br>");

        }
        return love.toString();
    }

}