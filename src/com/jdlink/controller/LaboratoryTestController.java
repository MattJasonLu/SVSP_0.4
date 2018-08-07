package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.service.LaboratoryTestService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 化验单控制器
 */
@Controller
public class LaboratoryTestController {

    /**
     * 化验单事务
     */
    @Autowired
    LaboratoryTestService laboratoryTestService;

    /**
     * 获取化验单列表
     * @return 化验单列表
     */
    @RequestMapping("loadPageLaboratoryTestList")
    @ResponseBody
    public String loadPageLaboratoryTestList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 列出所有化验单对象，获取列表
            List<LaboratoryTest> laboratoryTestList = laboratoryTestService.list(page);
            JSONArray data = JSONArray.fromArray(laboratoryTestList.toArray(new LaboratoryTest[laboratoryTestList.size()]));
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
     * 获取所有数据数量
     * @return 数据数量
     */
    @RequestMapping("totalLaboratoryTestRecord")
    @ResponseBody
    public int totalLaboratoryTestRecord(){
        try {
            return laboratoryTestService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取化验单对象
     * @param laboratoryTestNumber 化验单号
     * @return 化验单对象
     */
    @RequestMapping("getLaboratoryTest")
    @ResponseBody
    public String getLaboratoryTest(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            // 通过化验单号拿到对应的数据
            LaboratoryTest laboratoryTest = laboratoryTestService.getLaboratoryTestById(laboratoryTestNumber);
            // 制作json数据
            JSONObject data = JSONObject.fromBean(laboratoryTest);
            res.put("status","success");
            res.put("message","查看成功");
            // 放入数据
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","查看失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单状态为作废
     * @param laboratoryTestNumber 化验单号
     * @return 作废成功与否
     */
    @RequestMapping("setLaboratoryTestInvalid")
    @ResponseBody
    public String setInvalid(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.setInvalid(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","作废失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单状态为已化验
     * @param laboratoryTestNumber 化验单号
     * @return 成功与否
     */
    @RequestMapping("setLaboratoryTestTested")
    @ResponseBody
    public String setTested(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.setTested(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","化验成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","化验失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单对象状态为已化验
     * @param laboratoryTestNumber 化验单号
     * @return 成功与否
     */
    @RequestMapping("submit")
    @ResponseBody
    public String submit(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.submit(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","提交成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","提交失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单对象状态为已确认
     * @param laboratoryTestNumber 化验单号
     * @return 成功与否
     */
    @RequestMapping("confirm")
    @ResponseBody
    public String confirm(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.confirm(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","确认成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","确认失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }
}
