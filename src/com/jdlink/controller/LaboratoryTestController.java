package com.jdlink.controller;

import com.jdlink.domain.Produce.LaboratoryTest;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import com.jdlink.service.LaboratoryTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LaboratoryTestController {

    @Autowired
    LaboratoryTestService laboratoryTestService;


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
            res.put("stackTrace",e.getStackTrace());
        }
        return res.toString();
    }

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
            res.put("stackTrace",e.getStackTrace());
        }
        return res.toString();
    }

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
            res.put("stackTrace",e.getStackTrace());
        }
        return res.toString();
    }

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
            res.put("stackTrace",e.getStackTrace());
        }
        return res.toString();
    }
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
            res.put("stackTrace",e.getStackTrace());
        }
        return res.toString();
    }
}
