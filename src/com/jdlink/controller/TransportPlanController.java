package com.jdlink.controller;

import com.jdlink.domain.Produce.TransportPlan;
import com.jdlink.domain.Wastes;
import com.jdlink.service.TransportPlanService;
import com.jdlink.service.WastesService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by matt on 2018/8/9.
 * DoubleClickTo 666
 */
@Controller
public class TransportPlanController {

    @Autowired
    TransportPlanService transportPlanService;

    @Autowired
    WastesService wastesService;

    /**
     * 增加运输计划
     * @param transportPlan 运输计划
     * @return 成功与否
     */
    @RequestMapping("addTransportPlan")
    @ResponseBody
    public String addTransportPlan(@RequestBody TransportPlan transportPlan) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.add(transportPlan);
            res.put("status", "success");
            res.put("message", "增加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加失败");
        }
        return res.toString();
    }

    /**
     * 通过编号来获取运输计划
     * @param id 运输计划编号
     * @return 运输计划对象
     */
    @RequestMapping("getTransportPlanById")
    @ResponseBody
    public String getTransportPlanById(String id) {
        JSONObject res = new JSONObject();
        try {
            TransportPlan transportPlan =  transportPlanService.getById(id);
            JSONObject data = JSONObject.fromBean(transportPlan);
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

    /**
     * 获取危废列表
     * @return 危废列表
     */
    @RequestMapping("getTransportPlanWastesList")
    @ResponseBody
    public String getTransportPlanWastesList() {
        JSONObject res = new JSONObject();
        try {
            List<Wastes> wastesList = wastesService.list();
            JSONArray data = JSONArray.fromArray(wastesList.toArray(new Wastes[wastesList.size()]));
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }
}
