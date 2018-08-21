package com.jdlink.controller;

import com.jdlink.domain.Inventory.WasteInventory;
import com.jdlink.service.WasteInventoryService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 库存控制器
 * create By JackYang 2018/08/21
 */
@Controller
public class WasteInventoryController {
    @Autowired
     WasteInventoryService wasteInventoryService;
   //获得库存信息（无参数）
    @RequestMapping("getWasteInventoryList")
    @ResponseBody
    public String getWasteInventoryList(){
        JSONObject res=new JSONObject();
        try{
           List<WasteInventory> wasteInventoryList= wasteInventoryService.list();
            JSONArray arrray=JSONArray.fromObject(wasteInventoryList);
            res.put("status", "success");
            res.put("message", "查询成功");
           res.put("data", arrray);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }


        return res.toString();
    }
   //获得库存信息(根据入库单号)
    @RequestMapping("getWasteInventoryByInboundOrderId")
    @ResponseBody
    public String getWasteInventoryByInboundOrderId(String inboundOrderId){
    JSONObject res=new JSONObject();
     try {
        List<WasteInventory> wasteInventoryList= wasteInventoryService.getWasteInventoryByInboundOrderId(inboundOrderId);
         JSONArray array=JSONArray.fromObject(wasteInventoryList);
        res.put("data", array);
         res.put("status", "success");
         res.put("message", "查询成功");

     }
     catch (Exception e ){
         e.printStackTrace();
         res.put("status", "fail");
         res.put("message", "查询");
     }
        return res.toString();
    }
}
