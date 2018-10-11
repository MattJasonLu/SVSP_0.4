package com.jdlink.controller;

import com.jdlink.domain.FormType;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.Threshold;
import com.jdlink.domain.Produce.ThresholdList;
import com.jdlink.service.ThresholdService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class ThresholdController {
    @Autowired
    ThresholdService thresholdService;

    @RequestMapping("thresholdOutList")
    @ResponseBody
    public String thresholdOutList(@RequestBody Page page ) {
        JSONObject res = new JSONObject();
        try {
            //取出数据
            List<ThresholdList> thresholdLists = thresholdService.listOut(page);
            JSONArray array = JSONArray.fromArray(thresholdLists.toArray(new ThresholdList[thresholdLists.size()]));
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
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalThresholdListRecord")
    @ResponseBody
    public int totalThresholdListRecord() {
        try {
            return thresholdService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("searchThresholdListTotal")
    @ResponseBody
    public int searchThresholdListTotal(@RequestBody ThresholdList thresholdList) {
        try {
            return thresholdService.searchCount(thresholdList);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param thresholdList
     * @return
     */
    @RequestMapping("searchThresholdList")
    @ResponseBody
    public String searchThresholdList(@RequestBody ThresholdList thresholdList) {
        JSONObject res = new JSONObject();
        try {
            List<ThresholdList> thresholdLists = thresholdService.search(thresholdList);
            JSONArray data = JSONArray.fromArray(thresholdLists.toArray(new ThresholdList[thresholdLists.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    /**
     * 根据ID获取详细信息
     * @param id
     * @return
     */
    @RequestMapping("thresholdList")
    @ResponseBody
    public String thresholdList(String id) {
        JSONObject res = new JSONObject();
        try {
            //取出数据
            List<Threshold> thresholdList = thresholdService.list(id);
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
    public String saveThresholdList(@RequestBody ThresholdList thresholdList) {
        JSONObject res = new JSONObject();
        try {
            if(thresholdService.getById(thresholdList.getId()) != null){      // 如果原数据存在则更新
                thresholdList.setKeywords("1");
            }
            thresholdService.deleteAll(thresholdList.getId());            // 删除该id的所有旧数据
            thresholdService.add(thresholdList);   // 添加新数据
            res.put("message", "保存数据成功");
            res.put("status", "success");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "保存数据失败");
            res.put("status", "fail");
        }
        return res.toString();
    }

    /**
     * 获取目前的编号
     *
     * @return
     */
    @RequestMapping("getCurrentThresholdListId")
    @ResponseBody
    public String getCurrentWayBillId() {
        JSONObject res = new JSONObject();
        // 生成预约号
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMM");
        String prefix = simpleDateFormat.format(date);
        int count = thresholdService.countById(prefix) + 1;
        String suffix;
        if (count <= 9) suffix = "0" + count;
        else suffix = count + "";
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (thresholdService.getById(id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id = index + "";
        }
        res.put("id", id);
        return res.toString();
    }

    @RequestMapping("enableThresholdList")
    @ResponseBody
    public String enableThresholdList(String id){
        JSONObject res = new JSONObject();
        try {
           thresholdService.updateStateEnable(id);
            res.put("message", "状态更新成功");
            res.put("status", "success");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "状态更新失败");
            res.put("status", "fail");
        }
        return res.toString();
    }

    @RequestMapping("disabledThresholdList")
    @ResponseBody
    public String disabledThresholdList(String id){
        JSONObject res = new JSONObject();
        try {
            thresholdService.updateStateDisabled(id);
            res.put("message", "状态更新成功");
            res.put("status", "success");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "状态更新失败");
            res.put("status", "fail");
        }
        return res.toString();
    }


}
