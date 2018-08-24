package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.PretreatmentService;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PRPretreatmentController {

    @Autowired
    PretreatmentService pretreatmentService;

    @RequestMapping("addPretreatment")
    @ResponseBody
    public String addPretreatment(@RequestBody Pretreatment pretreatment) {
        JSONObject res = new JSONObject();
        try {
            pretreatmentService.add(pretreatment);
            res.put("status", "success");
            res.put("message", "添加成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败！");
        }
        return res.toString();
    }


    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalPretreatmentRecord")
    @ResponseBody
    public int totalPretreatmentRecord() {
        try {
            return pretreatmentService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPagePretreatmentList")
    @ResponseBody
    public String loadPagePretreatmentList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<Pretreatment> pretreatmentList = pretreatmentService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(pretreatmentList.toArray(new Pretreatment[pretreatmentList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }

    @RequestMapping("getById")
    @ResponseBody
    public String getById(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            Pretreatment pretreatment = pretreatmentService.getById(id);
            //新建一个对象并给它赋值为wayBill
            JSONObject data = JSONObject.fromBean(pretreatment);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /**
     * 获取目前的预处理单号
     *
     * @return
     */
    @RequestMapping("getCurrentPretreatmentId")
    @ResponseBody
    public String getCurrentPretreatmentId() {
        String id = getCurrentPretreatmentId();
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importPretreatmentExcel")
    @ResponseBody
    public String importPretreatmentExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile);
            {
                System.out.println("数据如下：");
                for (int i = 1; i < data.length; i++) {
                    for (int j = 0; j < data[0].length; j++) {
                        System.out.print(data[i][j].toString());
                        System.out.print(",");
                    }
                    System.out.println();
                }
            }


            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();
    }

    /**
     * 获取预处理单状态列表
     * @return
     */
    @RequestMapping("getPretreatmentStateList")
    @ResponseBody
    public String getPretreatmentStateList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        CheckState[] states = new CheckState[]{CheckState.NewBuild, CheckState.Confirm, CheckState.Invalid};
        JSONArray stateList = JSONArray.fromArray(states);
        res.put("stateList", stateList);
        return res.toString();
    }

    /**
     * 获取处置方式、进料方式列表
     * @param
     * @return
     */
    @RequestMapping("getPretreatmentSelectedList")
    @ResponseBody
    public String getPretreatmentSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        ProcessWay[] processWays = new ProcessWay[]{ProcessWay.Burning,ProcessWay.Landfill};
        JSONArray processWaysList = JSONArray.fromArray(processWays);
        HandleCategory[] handleCategories = new HandleCategory[]{HandleCategory.Sludge,HandleCategory.WasteLiquid,HandleCategory.Bulk,HandleCategory.Crushing,HandleCategory.Distillation,HandleCategory.Suspension};
        JSONArray handleCategoryList = JSONArray.fromArray(handleCategories);
        res.put("handleCategoryList", handleCategoryList);
        res.put("processWayList", processWaysList);
        return res.toString();
    }


    @RequestMapping("searchPretreatmentTotal")
    @ResponseBody
    public int searchPretreatmentTotal(@RequestBody Pretreatment pretreatment) {
        try {
            return pretreatmentService.searchCount(pretreatment);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param
     * @return
     */
    @RequestMapping("searchPretreatment")
    @ResponseBody
    public String searchPretreatment(@RequestBody Pretreatment pretreatment) {
        JSONObject res = new JSONObject();
        try {
            List<Pretreatment> pretreatmentList = pretreatmentService.search(pretreatment);
            JSONArray data = JSONArray.fromArray(pretreatmentList.toArray(new Pretreatment[pretreatmentList.size()]));
            System.out.println(data);
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

    @RequestMapping("invalidPretreatment")
    @ResponseBody
    public String invalidPretreatment(String id) {
        JSONObject res = new JSONObject();
        try {
            pretreatmentService.invalid(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }

    @RequestMapping("adjustPretreatment")
    @ResponseBody
    public String adjustPretreatment(Wastes wastes) {
        JSONObject res = new JSONObject();
        try {
            pretreatmentService.adjust(wastes);
            res.put("status", "success");
            res.put("message", "属性调整成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "属性调整失败");
        }
        return res.toString();
    }

}
