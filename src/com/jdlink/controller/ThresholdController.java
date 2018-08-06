package com.jdlink.controller;

import com.jdlink.domain.Contract;
import com.jdlink.domain.Produce.Threshold;
import com.jdlink.service.ThresholdService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ThresholdController {
    @Autowired
    ThresholdService thresholdService;
    @RequestMapping("thresholdList")
    @ResponseBody
    public  String thresholdList(){
        JSONObject res=new JSONObject();
        try{
            //取出数据
            List<Threshold> thresholdList = thresholdService.list();
            JSONArray array = JSONArray.fromArray(thresholdList.toArray(new Threshold[thresholdList.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", array);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }



}
