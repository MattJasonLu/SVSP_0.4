package com.jdlink.controller;
import com.jdlink.domain.WastesInfo;
import com.jdlink.service.WastesInfoService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import java.util.List;

@Controller
public class WastesInfoController {

    @Autowired
    WastesInfoService wastesInfoService;

    @RequestMapping("getWastesInfoList")//
    @ResponseBody
    public String getWastesInfoList(){
        JSONObject res = new JSONObject();
        try {
            List<WastesInfo> wastesInfoList = wastesInfoService.list();
            JSONArray data = JSONArray.fromArray(wastesInfoList.toArray(new WastesInfo[wastesInfoList.size()]));
            res.put("data", data.toString());
            res.put("status", "success");
            res.put("message", "危废信息获取成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "危废信息获取失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }
}