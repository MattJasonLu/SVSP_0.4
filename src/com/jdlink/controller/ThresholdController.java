package com.jdlink.controller;

import com.jdlink.domain.FormType;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.Threshold;
import com.jdlink.service.ThresholdService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ThresholdController {
    @Autowired
    ThresholdService thresholdService;

    @RequestMapping("thresholdList")
    @ResponseBody
    public String thresholdList() {
        JSONObject res = new JSONObject();
        try {
            //取出数据
            List<Threshold> thresholdList = thresholdService.list();
            JSONArray array = JSONArray.fromArray(thresholdList.toArray(new Threshold[thresholdList.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", array);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }

    /**
     * 获取下拉框数据
     *
     * @return
     */
    @RequestMapping("getThresholdSelectedList")
    @ResponseBody
    public String getSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        HandleCategory[] handleCategories = HandleCategory.values();
        JSONArray handleCategoryList = JSONArray.fromArray(handleCategories);
        res.put("handleCategoryList", handleCategoryList);
        FormType[] formTypes = FormType.values();
        JSONArray fromArray = JSONArray.fromArray(formTypes);
        res.put("formTypeList", fromArray);
        return res.toString();
    }

    @RequestMapping("saveThresholdList")
    @ResponseBody
    public String saveThresholdList(@RequestBody List<Threshold> thresholdList) {
        JSONObject res = new JSONObject();
        try {
            thresholdService.deleteAll();            // 删除所有旧数据
            for(int i = 0; i < thresholdList.size(); i++){
                thresholdService.add(thresholdList.get(i));   // 添加新数据
            }
            res.put("message", "保存数据成功");
            res.put("status", "success");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "保存数据失败");
            res.put("status", "fail");
        }
        return res.toString();
    }


}
