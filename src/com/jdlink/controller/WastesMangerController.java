package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.WastesInfo;
import com.jdlink.service.produce.WastesMangerService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class WastesMangerController {
    @Autowired
    WastesMangerService wastesMangerService;

    /**
     * 获取危废编码集合
     * @return 危废编码集合
     */
    @RequestMapping("getWastesMangerList")
    @ResponseBody
    public String getWastesInfoList(@RequestBody Page page){
        JSONObject res = new JSONObject();
        try {
            List<WastesInfo> wastesInfoList = wastesMangerService.list(page);
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

    /**
     * 获取总数
     */
    @RequestMapping("totalWastesMangerRecord")
    @ResponseBody
    public int totalWastesMangerRecord(){
        return wastesMangerService.totalWastesMangerRecord();

    }
}
