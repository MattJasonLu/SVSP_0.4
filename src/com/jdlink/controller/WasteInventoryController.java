package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Inventory.*;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.WastesInfo;
import com.jdlink.service.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
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
    @Autowired
    OutboundOrderService outboundOrderService;
   //获得库存信息（无参数）
    @RequestMapping("getWasteInventoryList")
    @ResponseBody
    public String getWasteInventoryList(){
        JSONObject res=new JSONObject();
        try{
            wasteInventoryService.updateLeftNumber();
            List<WasteInventory> wasteInventoryList= wasteInventoryService.list();
            JSONArray arrray=JSONArray.fromObject(wasteInventoryList);
            //更新剩余库存量
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
        JSONObject res=new JSONObject();
        try {
            List<WasteInventory> wasteInventoryList=wasteInventoryService.searchInventory(wasteInventory);
            res.put("data",wasteInventoryList);
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
        //添加完更新数量更新的是库存表的数据 所有的数据
        List<WasteInventory> wasteInventoryList= wasteInventoryService.list();
        for (int i=0;i<wasteInventoryList.size();i++){
            wasteInventoryService.batchingNumber(wasteInventoryList.get(i));
        }

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
       for(int i=0;i<batchingOrderList.size();i++){
           wasteInventoryService.updateBatchingOrderOnId(batchingOrderList.get(i));//更新危废主键，总量
       }
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
//       int total= materialRequisitionOrderService.total();
       //查找最新的领料单号
//        List<String> materialRequisitionOrderList=materialRequisitionOrderService.getMaterialRequisitionOrderList();
        Calendar cal = Calendar.getInstance();
        //获取年
        String year = String.valueOf(cal.get(Calendar.YEAR));
        //获取月
        String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
        //序列号
        String number = "001";
        //1找到最新的领料单号
        List<String> materialRequisitionOrderListId = materialRequisitionOrderService.getMaterialRequisitionOrderList();
        if(materialRequisitionOrderListId.size()==0){
            number="001";
            String materialRequisitionId = year + mouth + number;
            //设置ID
            materialRequisitionOrder.setMaterialRequisitionId(materialRequisitionId);
        }
        if(materialRequisitionOrderListId.size()>0){
            String theNewestmaterialRequisitionOrderId = materialRequisitionOrderListId.get(0);
            String s = theNewestmaterialRequisitionOrderId;//原字符串
            String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
            number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
            String materialRequisitionId = year + mouth + number;
            materialRequisitionOrder.setMaterialRequisitionId(materialRequisitionId);
        }

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
         //1遍历materialRequisitionOrderList 如果不为空添加
           List<MaterialRequisitionOrder> list=new ArrayList<>();
           for (int i=0;i<materialRequisitionOrderList.size();i++){
               if(materialRequisitionOrderList.get(i).getBatchingOrder()!=null){
                   list.add(materialRequisitionOrderList.get(i));
               }
           }
           Calendar cal = Calendar.getInstance();
           //获取年
           String year = String.valueOf(cal.get(Calendar.YEAR));
           //获取月
           String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
           //序列号
           String number = "001";
           for (int i=0;i<list.size();i++){
               materialRequisitionOrderService.updateMaterialRequisitionOrderOnId(list.get(i));//更新危废主键和仓库编码和库户编号
               materialRequisitionOrderService.updateBatchingOrderCheck(list.get(i));//更新配料单的状态
               //更新仓库编号
               //materialRequisitionOrderService.updateMaterialRequisitionOrderCheck(list.get(i));//更新领料单的状态
           }
           List<MaterialRequisitionOrder> materialRequisitionOrderList1= materialRequisitionOrderService.list();
           List<MaterialRequisitionOrder> list2=new ArrayList<>();
           for (int i=0;i<materialRequisitionOrderList1.size();i++){
               if(materialRequisitionOrderList1.get(i).getBatchingOrder()!=null){
                   list2.add(materialRequisitionOrderList1.get(i));
               }
           }
          JSONArray jsonArray=JSONArray.fromObject(list2);
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
//更新领料单单号
    @RequestMapping("updateMaterialRequisitionId")
    @ResponseBody
    public String updateMaterialRequisitionId(){
        JSONObject res=new JSONObject();
        Calendar cal = Calendar.getInstance();
        //获取年
        String year = String.valueOf(cal.get(Calendar.YEAR));
        //获取月
        String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
        //序列号
        String number = "001";
        List<MaterialRequisitionOrder> materialRequisitionOrderList= materialRequisitionOrderService.list();
        //1遍历materialRequisitionOrderList 如果不为空添加
        List<MaterialRequisitionOrder> list=new ArrayList<>();
        for (int i=0;i<materialRequisitionOrderList.size();i++){
            if(materialRequisitionOrderList.get(i)!=null){
                list.add(materialRequisitionOrderList.get(i));
            }
        }
        try{
            for (int i=0;i<list.size();i++) {
                //1找到最新的领料单号
                List<String> materialRequisitionOrderListId = materialRequisitionOrderService.getMaterialRequisitionOrderList();
                String theNewestmaterialRequisitionOrderId = materialRequisitionOrderListId.get(0);
                if (theNewestmaterialRequisitionOrderId == null) {//假设没有领料单号
                    number = "001";
                    String materialRequisitionId = year + mouth + number;
                    list.get(0).setMaterialRequisitionId(materialRequisitionId);
                    System.out.println(materialRequisitionId+"YH");
                    materialRequisitionOrderService.updateMaterialRequisitionId1(list.get(0));
                }
                if (theNewestmaterialRequisitionOrderId != null) {
                    String s = theNewestmaterialRequisitionOrderId;//原字符串
                    String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
                    number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
                    String materialRequisitionId = year + mouth + number;
                    list.get(i).setMaterialRequisitionId(materialRequisitionId);
                    System.out.println(materialRequisitionId+"YH");
                    materialRequisitionOrderService.updateMaterialRequisitionId1(list.get(i));
                }
            }
            res.put("status", "success");
            res.put("message", "更新成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();
    }
    @RequestMapping("isMaterialRequisitionOrderId")
    @ResponseBody
    public String isMaterialRequisitionOrderId(){
        JSONObject res=new JSONObject();
        try{
            List<String> materialRequisitionOrderList=materialRequisitionOrderService.getMaterialRequisitionOrderList();
            String theNewestmaterialRequisitionOrderId=materialRequisitionOrderList.get(0);
            if(theNewestmaterialRequisitionOrderId==null){
                theNewestmaterialRequisitionOrderId="null";
            }
            //System.out.println(theNewestmaterialRequisitionOrderId+"YH");
            res.put("theNewestmaterialRequisitionOrderId",theNewestmaterialRequisitionOrderId);
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
    //更新领料单的特有数据结构
    @RequestMapping("updateMaterialRequisitionOrder")
    @ResponseBody
    public String updateMaterialRequisitionOrder(@RequestBody MaterialRequisitionOrder materialRequisitionOrder ){
        JSONObject res=new JSONObject();
        try{
          materialRequisitionOrderService.updateMaterialRequisitionOrder(materialRequisitionOrder);
            res.put("status", "success");
            res.put("message", "更新成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }


        return  res.toString();
    }
//根据领料编号获取信息
    @RequestMapping("getByMaterialRequisitionId")
    @ResponseBody
    public String getByMaterialRequisitionId(String materialRequisitionId){
        JSONObject res=new JSONObject();
        try{
           MaterialRequisitionOrder materialRequisitionOrder= materialRequisitionOrderService.getByMaterialRequisitionId(materialRequisitionId);
            res.put("materialRequisitionOrder",materialRequisitionOrder);
           res.put("status", "success");
            res.put("message", "查询成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString() ;
    }
    //获取最新的出库单号
    @RequestMapping("getOutBoundOrderId")
    @ResponseBody
    public  String getOutBoundOrderId(){
        JSONObject res=new JSONObject();
        try{
            Calendar cal = Calendar.getInstance();
            //获取年
            String year = String.valueOf(cal.get(Calendar.YEAR));
            //获取月
            String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
            //序列号
            String number = "001";
            //1查找是否存在出库单号 如果有序列号加1 如果没有就为001
            List<String>  outboundOrderId= outboundOrderService.check();
            if(outboundOrderId.size()==0){
                number = "001";
            }
            if(outboundOrderId.size()!=0){
                String s = outboundOrderId.get(0);//原字符串
                String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
                number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
            }
            String outboundOrderId1=year+mouth+number;
            res.put("outboundOrderId",outboundOrderId1);
            res.put("status", "success");
            res.put("message", "入库单号获取成功");


        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "入库单号获取失败");
        }


        return  res.toString();
    }
    //添加出库单
    @RequestMapping("addOutBoundOrder")
    @ResponseBody
    public  String addOutBoundOrder(@RequestBody OutboundOrder outboundOrder){
        JSONObject res=new JSONObject();
        Calendar cal = Calendar.getInstance();
        //获取年
        String year = String.valueOf(cal.get(Calendar.YEAR));
        //获取月
        String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
        //序列号
        String number = "001";
       try{
            //1查找是否存在出库单号 如果有序列号加1 如果没有就为001
           List<String>  outboundOrderId= outboundOrderService.check();
           if(outboundOrderId.size()==0){
               number = "001";
           }
           if(outboundOrderId.size()!=0){
               String s = outboundOrderId.get(0);//原字符串
               String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
               number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
           }
           String outboundOrderId1=year+mouth+number;
            //添加出库单
            outboundOrder.setOutboundOrderId(outboundOrderId1);
            //紧接着进行更新对领料单进行更新
            outboundOrderService.updateMaterialRequisitionOrderCheck1(outboundOrder);
            materialRequisitionOrderService.addOutboundOrder(outboundOrder);
            //添加完进行更新操作 根据配料单编号
            OutboundOrder outboundOrder1=outboundOrderService.getOutBoundByMId(outboundOrder.getMaterialRequisitionOrder().getMaterialRequisitionId());
            outboundOrderService.updateOutBoundOrder(outboundOrder1);
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
//加载出库信息列表
    @RequestMapping("loadOutBoundList")
    @ResponseBody
    public String loadOutBoundList(){
        JSONObject res=new JSONObject();
       try {
           List<OutboundOrder> outboundOrderList=outboundOrderService.loadOutBoundList();
           res.put("data",outboundOrderList);
           res.put("status", "success");
           res.put("message", "查询成功");
           //将获取到的信息进行更新(危废主键 业务员主键 客户主键)
//          for(int i=0;i<outboundOrderList.size();i++){
//              outboundOrderService.updateOutBoundOrder(outboundOrderList.get(i));
//          }
       }
catch (Exception e){
    e.printStackTrace();
    res.put("status", "fail");
    res.put("message", "查询失败");
}

        return res.toString();
    }
    /**
     * 获取总记录数
     * @return
     */
    @RequestMapping("totalOutBoundRecord")
    @ResponseBody
    public int totalOutBoundRecord(){
        try {
            return outboundOrderService.total();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }

    }
    @RequestMapping("searchOutBoundTotal")
    @ResponseBody
    public int searchOutBoundTotal(@RequestBody OutboundOrder outboundOrder){

        return 0;
    }
    //根据入库单号查询信息
    @RequestMapping("getByOutBoundOrderId")
    @ResponseBody
    public  String getByOutBoundOrderId(String outboundOrderId){
        JSONObject res=new JSONObject();
        try {
            List<OutboundOrder> outboundOrderList=outboundOrderService.getByOutBoundOrderId(outboundOrderId);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data",outboundOrderList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }
        return res.toString();

    }
    //根据入库单号获得总量，然后根据配料量减去得到剩余量
    @RequestMapping("getWasteInventoryLeftNumber")
    @ResponseBody
    public String getWasteInventoryLeftNumber(String inboundOrderId,String number){
        JSONObject res=new JSONObject();
        //1先更新 在获取
        try {
            if(number==null||number==""||number.trim().length()<=0){
                number="0";
            }
            float number1=Float.parseFloat(number);
            wasteInventoryService.getWasteInventoryLeftNumber(inboundOrderId, number1);
            float leftNumber = wasteInventoryService.getLeftNumber(inboundOrderId);
            res.put("leftNumber", leftNumber);
            res.put("status", "success");
            res.put("message", "获取成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }

        return  res.toString();
    }
   //获取出库单信息的接口
    @RequestMapping("getOutBoundOrderList")
   @ResponseBody
    public String getOutBoundOrderList(){
        JSONObject res=new JSONObject();
        try{
            List<OutboundOrder> outboundOrderList=outboundOrderService.getOutBoundOrderList();
            JSONArray jsonArray=JSONArray.fromObject(outboundOrderList);
            res.put("jsonArray",jsonArray);
            res.put("status", "success");
            res.put("message", "查询成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return  res.toString();
    }
   //加载下拉列表
    @RequestMapping("getOutBoundList")
    @ResponseBody
    public String getOutBoundList(){
        JSONObject res=new JSONObject();
        try{
            JSONArray array = JSONArray.fromArray(BoundType.values());
            res.put("array", array);
            res.put("status", "success");
            res.put("message", "更新成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();
    }
    //添加次生出库单
    @RequestMapping("addSecondary")
    @ResponseBody
    public String addSecondary(@RequestBody OutboundOrder outboundOrder){
        JSONObject res=new JSONObject();
        Calendar cal = Calendar.getInstance();
        //获取年
        String year = String.valueOf(cal.get(Calendar.YEAR));
        //获取月
        String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
        //序列号
        String number = "001";
        try{
            //1查找是否存在出库单号 如果有序列号加1 如果没有就为001
            List<String>  outboundOrderId= outboundOrderService.check();
            if(outboundOrderId.size()==0){
                number = "001";
            }
            if(outboundOrderId.size()!=0){
                String s = outboundOrderId.get(0);//原字符串
                String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
                number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
            }
            String outboundOrderId1=year+mouth+number;
            //添加出库单
            outboundOrder.setOutboundOrderId(outboundOrderId1);
            //做添加操作
            outboundOrderService.addSecondary(outboundOrder);
            //添加完进行更新操作 根据入库单号
            //查询后
             OutboundOrder outboundOrder1=  outboundOrderService.getOutBoundByInId(outboundOrder.getWasteInventory().getInboundOrderId());
           //更新危废编号 客户编号 业务员编号 仓库编号
            outboundOrderService.updateSecOutBoundOrder(outboundOrder1);
            //更新危废库存的数量
            outboundOrderService.upWastesInventoryNumber(outboundOrder1);
            res.put("status", "success");
            res.put("message", "添加成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败");
        }

        return  res.toString();
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
