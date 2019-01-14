package com.jdlink.controller;

import com.jdlink.domain.Produce.WastesSummary;
import com.jdlink.service.SecondaryWastesSummaryService;
import com.jdlink.service.WastesSummaryService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 危废收发汇总表控制器
 */
@Controller
public class WastesSummaryController {
    /**
     * 危废汇总服务
     */
    @Autowired
    WastesSummaryService wastesSummaryService;
    @Autowired
    SecondaryWastesSummaryService secondaryWastesSummaryService;

    /**
     * 获取危废汇总列表
     * @return 汇总列表
     */
    @RequestMapping("getWastesSummaryList")
    @ResponseBody
    public String getWastesSummaryList(@RequestBody WastesSummary wastesSummary) {
        JSONObject res = new JSONObject();
        try {
            List<WastesSummary> wastesSummaryList = wastesSummaryService.get(wastesSummary);
            JSONArray data = JSONArray.fromArray(wastesSummaryList.toArray(new WastesSummary[wastesSummaryList.size()]));
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

    /**
     * 获取危废汇总数量
     * @param wastesSummary 危废汇总参数
     * @return 数量
     */
    @RequestMapping("getWastesSummaryCount")
    @ResponseBody
    public String getWastesSummaryCount(@RequestBody WastesSummary wastesSummary) {
        JSONObject res = new JSONObject();
        try {
            int count = wastesSummaryService.count(wastesSummary);
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", count);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }


    /**
     * 获取次生汇总列表
     * @return 次生汇总列表
     */
    @RequestMapping("getSecondaryWastesSummaryList")
    @ResponseBody
    public String getSecondaryWastesSummaryList(@RequestBody WastesSummary wastesSummary) {
        JSONObject res = new JSONObject();
        try {
            List<WastesSummary> wastesSummaryList = secondaryWastesSummaryService.get(wastesSummary);
            JSONArray data = JSONArray.fromArray(wastesSummaryList.toArray(new WastesSummary[wastesSummaryList.size()]));
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

    /**
     * 获取次生汇总数量
     * @param wastesSummary 次生汇总参数
     * @return 数量
     */
    @RequestMapping("getSecondaryWastesSummaryCount")
    @ResponseBody
    public String getSecondaryWastesSummaryCount(@RequestBody WastesSummary wastesSummary) {
        JSONObject res = new JSONObject();
        try {
            int count = secondaryWastesSummaryService.count(wastesSummary);
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", count);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

}
