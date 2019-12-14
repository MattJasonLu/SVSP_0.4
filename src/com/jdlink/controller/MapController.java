package com.jdlink.controller;

import com.jdlink.domain.Map;
import com.jdlink.service.MapService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MapController {
    @Autowired
    MapService mapService;

    /*获取所有的地图信息*/
    @RequestMapping("getMap")
    @ResponseBody
    public String getMap(){

        JSONObject res=new JSONObject();

        try {
            List<Map> mapList=mapService.getMap();
            res.put("data", mapList);
            res.put("status", "success");
            res.put("message", "地图信息获取成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "地图信息获取失败");
        }

        return res.toString();
    }
}
