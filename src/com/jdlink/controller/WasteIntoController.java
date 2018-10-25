package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SecondarySample;
import com.jdlink.domain.Produce.WasteInto;
import com.jdlink.service.WasteIntoService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 危废/次生分析日报控制器
 */
@Controller
public class WasteIntoController {
    @Autowired
    WasteIntoService wasteIntoService;
    /**
     * 获得危废入场分析日报列表
     */
    @RequestMapping("getWasteIntoList")
    @ResponseBody
    public String getWasteIntoList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            //首先更新
            //wasteIntoService.updateWasteInto();
            List<WasteInto> wasteIntoList=wasteIntoService.WasteIntoList(page);
            res.put("data",wasteIntoList);
            res.put("status", "success");
            res.put("message", "查询成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }
    /**
     * 获得次生入场分析日报列表
     */
    @RequestMapping("getSecondIntoList")
    @ResponseBody
    public String getSecondIntoList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            //首先更新
            wasteIntoService.updateWasteInto();
            List<WasteInto> wasteIntoList=wasteIntoService.SecondIntoList(page);
            res.put("data",wasteIntoList);
            res.put("status", "success");
            res.put("message", "查询成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }
    /**
     * 获取危废入场总记录数
     * @return
     */
    @RequestMapping("totalWasteIntoRecord")
    @ResponseBody
    public int totalWasteIntoRecord() {
        try {
            return wasteIntoService.countWaste();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    /**
     * 获取次生入场总记录数
     * @return
     */
    @RequestMapping("totalSecIntoRecord")
    @ResponseBody
    public int totalSecIntoRecord() {
        try {
            return wasteIntoService.countSec();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 添加次生登记主表
     */
    @RequestMapping("addSecondarySample")
    @ResponseBody
    public String addSecondarySample(@RequestBody SecondarySample secondarySample){
        JSONObject res=new JSONObject();
        try {
            //找到最新的预约单号
        }
        catch (Exception e){


        }


        return res.toString();
    }

}
