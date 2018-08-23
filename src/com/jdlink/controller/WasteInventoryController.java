package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Inventory.MaterialRequisitionOrder;
import com.jdlink.domain.Inventory.WasteInventory;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.WastesInfo;
import com.jdlink.service.ClientService;
import com.jdlink.service.MaterialRequisitionOrderService;
import com.jdlink.service.WasteInventoryService;
import com.jdlink.service.WastesInfoService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Calendar;
import java.util.List;

/**
 * 库存控制器
 * create By JackYang 2018/08/21
 */
@Controller
public class WasteInventoryController {
    @Autowired
     WasteInventoryService wasteInventoryService;
    @Autowired
    WastesInfoService wastesInfoService;
    @Autowired
    ClientService clientService;
    @Autowired
    MaterialRequisitionOrderService materialRequisitionOrderService;
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

         //res.put("batchingOrderId",batchingOrderId);
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
    //高级查询获得下拉列表
    @RequestMapping("getSeniorList")
    @ResponseBody
    public String getSeniorList(){
        JSONObject res = new JSONObject();
        try{
            JSONArray checkStateList = JSONArray.fromArray(CheckState.values());
            res.put("checkStateList", checkStateList);
            JSONArray handelCategoryList = JSONArray.fromArray(HandleCategory.values());
            res.put("handelCategoryList", handelCategoryList);
            List<WastesInfo> wastesInfoList = wastesInfoService.list();
            JSONArray data = JSONArray.fromArray(wastesInfoList.toArray(new WastesInfo[wastesInfoList.size()]));
            res.put("data", data);
            List<Client> clientList = clientService.list();
            JSONArray array = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
            res.put("array", array);
            res.put("status", "success");
            res.put("message", "查询成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }
    //高级查询功能
    @RequestMapping("searchInventory")
    @ResponseBody
    public String searchInventory(@RequestBody WasteInventory wasteInventory){
        System.out.println(wasteInventory+"==>");
        return null;
    }
    //添加配料单
    @RequestMapping("addBatchingOrder")
    @ResponseBody
    public String addBatchingOrder(@RequestBody BatchingOrder batchingOrder){
        JSONObject res=new JSONObject();
    try {
        int total=wasteInventoryService.total();
        List<String> batchingOrderIdList=wasteInventoryService.getBatchingOrderIdList();
        Calendar cal = Calendar.getInstance();
        //获取年
        String year = String.valueOf(cal.get(Calendar.YEAR));
        //获取月
        String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
        //序列号
        String number = "001";

        if(total<0){//如果配料单号不存在
            number = "001";
        }
        if(total!=0){
            String s = batchingOrderIdList.get(0);//原字符串
            String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
            number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
        }
        String batchingOrderId = year + mouth + number;
        batchingOrder.setBatchingOrderId(batchingOrderId);
        wasteInventoryService.addBatchingOrder(batchingOrder);
        res.put("status", "success");
        res.put("message", "添加成功");
    }
    catch (Exception e){
        e.printStackTrace();
        res.put("status", "fail");
        res.put("message", "添加失败");
    }


        return res.toString();
    }
    //获得配料单的下拉列表
    @RequestMapping("getBatchOrderList")
    @ResponseBody
    public String getBatchOrderList(){
        JSONObject res=new JSONObject();
    try {
        List<BatchingOrder> batchingOrderList=wasteInventoryService.getBatchingOrderList();
      JSONArray array=JSONArray.fromObject(batchingOrderList);
        res.put("status", "success");
        res.put("message", "查询成功");
        res.put("batchingOrderList",batchingOrderList);
    }
   catch (Exception e){
       e.printStackTrace();
       res.put("status", "fail");
       res.put("message", "查询失败");
   }

        return res.toString();
    }
    //添加领料单
    @RequestMapping("addRequisition")
    @ResponseBody
    public String addRequisition(@RequestBody MaterialRequisitionOrder materialRequisitionOrder){
        JSONObject res=new JSONObject();
       int total= materialRequisitionOrderService.total();
       //查找最新的领料单号
        //List<String> materialRequisitionOrderList=materialRequisitionOrderService.getMaterialRequisitionOrderList();
        Calendar cal = Calendar.getInstance();
        //获取年
        String year = String.valueOf(cal.get(Calendar.YEAR));
        //获取月
        String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
        //序列号
        String number = "001";
//        if(total<0){//如果领料单号不存在
//            number = "001";
//        }
//        if(total!=0){
//            String s = materialRequisitionOrderList.get(0);//原字符串
//            String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
//            number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
//        }
//        String materialRequisitionId = year + mouth + number;
        //设置ID
        //materialRequisitionOrder.setMaterialRequisitionId(materialRequisitionId);
        try{
            materialRequisitionOrderService.addMaterialRequisitionOrder(materialRequisitionOrder);
            res.put("status", "success");
            res.put("message", "添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败");

        }
        return res.toString();
    }
    //获取领料单数据列表
    @RequestMapping("getMaterialRequisitionList")
    @ResponseBody
    public  String getMaterialRequisitionList(){
       JSONObject res=new JSONObject();
       try{
          List<MaterialRequisitionOrder> materialRequisitionOrderList= materialRequisitionOrderService.list();
          JSONArray jsonArray=JSONArray.fromObject(materialRequisitionOrderList);
          res.put("jsonArray",jsonArray);
           res.put("status", "success");
           res.put("message", "查询成功");

       }
       catch (Exception e){
           e.printStackTrace();
           res.put("status", "fail");
           res.put("message", "查询失败");
       }


        return res.toString();
    }

    //获取两位月数
    public  static  String getMouth(String mouth){
        if(mouth.length()!=2){
            mouth="0"+mouth;
        }
        return mouth;
    }
    //获取三位序列号
    public static String getString3(String id){
        while (id.length()!=3){
            System.out.println(id.length());
            id="0"+id;
        }
        return id;
    }
}
