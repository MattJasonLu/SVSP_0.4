package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Produce.TransportPlan;
import com.jdlink.domain.Produce.TransportPlanItem;
import com.jdlink.domain.Wastes;
import com.jdlink.service.ClientService;
import com.jdlink.service.TransportPlanService;
import com.jdlink.service.WastesService;
import com.jdlink.util.RandomUtil;
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
 * 运输计划控制器
 */
@Controller
public class TransportPlanController {

    @Autowired
    TransportPlanService transportPlanService;
    @Autowired
    WastesService wastesService;
    @Autowired
    ClientService clientService;

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
            // 设置运输计划编号
            transportPlan.setId(RandomUtil.getRandomEightNumber());
            transportPlan.setAuthor("测试用户");
            transportPlan.setDepartmentDirector("测试用户");
            transportPlan.setProductionDirector("测试用户");
            transportPlan.setGroup("测试组别");
            transportPlan.setCheckState(CheckState.NewBuild);
            for (TransportPlanItem transportPlanItem : transportPlan.getTransportPlanItemList()) {
                // 设置运输计划条目的编号
                transportPlanItem.setId(RandomUtil.getRandomEightNumber());
                Client produceCompany = clientService.getByName(transportPlanItem.getProduceCompany().getCompanyName());
                transportPlanItem.setProduceCompany(produceCompany);
                transportPlanItem.getWastes().setId(RandomUtil.getRandomEightNumber());
            }
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

    @RequestMapping("updateTransportPlan")
    @ResponseBody
    public String updateTransportPlan(@RequestBody TransportPlan transportPlan) {
        JSONObject res = new JSONObject();
        try {

            res.put("status", "success");
            res.put("message", "审核成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审核失败");
        }
        return res.toString();
    }

    /**
     * 获取最新的运输计划
     * @return 运输计划对象
     */
    @RequestMapping("getRecentTransportPlan")
    @ResponseBody
    public String getRecentTransportPlan() {
        JSONObject res = new JSONObject();
        try {
            TransportPlan transportPlan =  transportPlanService.getRecent();
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

    /**
     *
     * 设置运输计划状态为确认
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanConfirm")
    @ResponseBody
    public String setTransportPlanConfirm(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateConfirm(id);
            res.put("status", "success");
            res.put("message", "确认成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "确认失败");
        }
        return res.toString();
    }

    /**
     *
     * 设置运输计划状态为提交
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanSubmit")
    @ResponseBody
    public String setTransportPlanSubmit(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateSubmit(id);
            res.put("status", "success");
            res.put("message", "提交成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");
        }
        return res.toString();
    }

    /**
     *
     * 设置运输计划状态为审核
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanExamined")
    @ResponseBody
    public String setTransportPlanExamined(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateExamined(id);
            res.put("status", "success");
            res.put("message", "审核成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审核失败");
        }
        return res.toString();
    }

    /**
     *
     * 设置运输计划状态为作废
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanInvalid")
    @ResponseBody
    public String setTransportPlanInvalid(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateInvalid(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }
}
