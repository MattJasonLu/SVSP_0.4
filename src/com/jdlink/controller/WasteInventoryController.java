package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Dictionary.DataDictionaryItem;
import com.jdlink.domain.Inventory.*;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.MaterialRequire;
import com.jdlink.domain.Produce.Stock;
import com.jdlink.domain.Produce.StockItem;
import com.jdlink.service.*;
import com.jdlink.service.dictionary.DictionaryService;
import com.jdlink.service.produce.BatchOrderService;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.omg.PortableInterceptor.INACTIVE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
    @Autowired
    QuotationService quotationService;
    @Autowired
    StockService stockService;
    @Autowired
    BatchOrderService batchOrderService;
    @Autowired
    DictionaryService dictionaryService;
   //获得库存信息==》危废（无参数）

    //获得库存信息==》次生（无参数）


//   //获得库存信息(根据入库单号)
//    @RequestMapping("getWasteInventoryByInboundOrderId")
//    @ResponseBody
//    public String getWasteInventoryByInboundOrderId(String inboundOrderItemId){
//    JSONObject res=new JSONObject();
//     try {
//         List<WasteInventory> wasteInventoryList= wasteInventoryService.getWasteInventoryByInboundOrderId(inboundOrderItemId);
//         JSONArray array=JSONArray.fromObject(wasteInventoryList);
//         res.put("data", array);
//         //res.put("batchingOrderId",batchingOrderId);
//         res.put("status", "success");
//         res.put("message", "查询成功");
//
//     }
//     catch (Exception e ){
//         e.printStackTrace();
//         res.put("status", "fail");
//         res.put("message", "查询");
//     }
//        return res.toString();
//    }
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
        String number = "00001";

        if(total<0){//如果配料单号不存在
            number = "00001";
        }
        if(total!=0){
            String s = batchingOrderIdList.get(0);//原字符串
            String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
            number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
        }
        String batchingOrderId = year + mouth + number;
        batchingOrder.setBatchingOrderId(batchingOrderId);
        wasteInventoryService.addBatchingOrder(batchingOrder);
        //添加完更新当前的配料对象
        List<BatchingOrder> batchingOrderList=  wasteInventoryService.getBatchingOrderList();
        wasteInventoryService.updateBatching(batchingOrderList.get(0));

       //最后同步更新库存的数量(需要配料的数量和入库单明细编号即可)
           wasteInventoryService.updateInventoryCount(batchingOrder.getBatchingNumber(),batchingOrder.getInboundOrderItemId());
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
//    @RequestMapping("getMaterialRequisitionList")
//    @ResponseBody
//    public  String getMaterialRequisitionList(){
//       JSONObject res=new JSONObject();
//       try{
//          List<MaterialRequisitionOrder> materialRequisitionOrderList= materialRequisitionOrderService.list();
//         //1遍历materialRequisitionOrderList 如果不为空添加
//           List<MaterialRequisitionOrder> list=new ArrayList<>();
//           for (int i=0;i<materialRequisitionOrderList.size();i++){
//               if(materialRequisitionOrderList.get(i).getBatchingOrder()!=null){
//                   list.add(materialRequisitionOrderList.get(i));
//               }
//           }
//           Calendar cal = Calendar.getInstance();
//           //获取年
//           String year = String.valueOf(cal.get(Calendar.YEAR));
//           //获取月
//           String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
//           //序列号
//           String number = "00001";
//          // for (int i=0;i<list.size();i++){
//               //materialRequisitionOrderService.updateMaterialRequisitionOrderOnId(list.get(i));//更新危废主键和仓库编码和库户编号
//               //materialRequisitionOrderService.updateBatchingOrderCheck(list.get(i));//更新配料单的状态
//               //更新仓库编号
//               //materialRequisitionOrderService.updateMaterialRequisitionOrderCheck(list.get(i));//更新领料单的状态
//           //}
//           List<MaterialRequisitionOrder> materialRequisitionOrderList1= materialRequisitionOrderService.list();
//           List<MaterialRequisitionOrder> list2=new ArrayList<>();
//           for (int i=0;i<materialRequisitionOrderList1.size();i++){
//               if(materialRequisitionOrderList1.get(i).getBatchingOrder()!=null){
//                   list2.add(materialRequisitionOrderList1.get(i));
//               }
//           }
//          JSONArray jsonArray=JSONArray.fromObject(list2);
//          res.put("jsonArray",materialRequisitionOrderList);
//           res.put("status", "success");
//           res.put("message", "分页数据获取成功");
//
//       }
//       catch (Exception e){
//           e.printStackTrace();
//           res.put("status", "fail");
//           res.put("message", "分页数据获取失败");
//       }
//
//
//        return res.toString();
//    }
//更新领料单单号
    @RequestMapping("updateMaterialRequisitionId")
    @ResponseBody
    public String updateMaterialRequisitionId(@RequestBody Page page){
        JSONObject res=new JSONObject();
        Calendar cal = Calendar.getInstance();
        //获取年
        String year = String.valueOf(cal.get(Calendar.YEAR));
        //获取月
        String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
        //序列号
        String number = "00001";
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
                    number = "00001";
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
            String number = "00001";
            //1查找是否存在出库单号 如果有序列号加1 如果没有就为001
            List<String>  outboundOrderId= outboundOrderService.check();
            if(outboundOrderId.size()==0){
                number = "00001";
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

//加载出库信息列表==>接口
    @RequestMapping("loadOutBoundList")
    @ResponseBody
    public String loadOutBoundList(Page page){
        JSONObject res=new JSONObject();
       try {
           page.setCount(0);
           List<OutboundOrder> outboundOrderList = batchOrderService.loadOutBoundList(page);
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
     * 获取出库总记录数
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
    /**
     * 获取次生库存总记录数
     */
    @RequestMapping("totalSecondaryInventory")
    @ResponseBody
    public int totalSecondaryInventory(){
        try {
            return outboundOrderService.totalSecondaryInventory();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }

    }
    /**
    /**
     * 搜索总记录数
     * @param outboundOrder
     * @return
     */
    @RequestMapping("searchOutBoundTotal")
    @ResponseBody
    public int searchOutBoundTotal(@RequestBody OutboundOrder outboundOrder){
        return outboundOrderService.searchCount(outboundOrder);
    }


    //根据入库单号获得总量，然后根据配料量减去得到剩余量
    @RequestMapping("getWasteInventoryLeftNumber")
    @ResponseBody
    public String getWasteInventoryLeftNumber(String inboundOrderItemId,String number){
        JSONObject res=new JSONObject();
        //1先更新 在获取
        try {
            if(number==null||number==""||number.trim().length()<=0){
                number="0";
            }
            float number1=Float.parseFloat(number);
            wasteInventoryService.getWasteInventoryLeftNumber(inboundOrderItemId, number1);
            float leftNumber = wasteInventoryService.getLeftNumber(inboundOrderItemId);
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
            res.put("data",jsonArray);
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

    //根据Id获取出库数据List形式
    @RequestMapping("getOutBoundOrderListById")
    @ResponseBody
    public String getOutBoundOrderListById(String id){
        JSONObject res=new JSONObject();
        try{
            List<OutboundOrder> outboundOrderList=outboundOrderService.getById(id);
            JSONArray jsonArray=JSONArray.fromObject(outboundOrderList);
            res.put("data",jsonArray);
            res.put("status", "success");
            res.put("message", "数据获取成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "数据获取失败");
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

    //获取两位月数
    public  static  String getMouth(String mouth){
        if(mouth.length()!=2){
            mouth="0"+mouth;
        }
        return mouth;
    }
    //获取5位序列号
    public static String getString3(String id){
        while (id.length()!=5){
            System.out.println(id.length());
            id="0"+id;
        }
        return id;
    }
  //加载进料方式下拉列表
    @RequestMapping("getHandelCategoryList")
    @ResponseBody
    public String getHandelCategoryList(String outboundOrderId){
        JSONObject res=new JSONObject();
        try {
            List<DataDictionaryItem> formTypeList = dictionaryService.getSelectListByDataDictionary(6);
            JSONArray data = JSONArray.fromArray(formTypeList.toArray());
            //根据出库单号获取进料方式
            int handelCategoryId=outboundOrderService.getHandelCategoryById(outboundOrderId);
             res.put("handelCategoryId",handelCategoryId);
             res.put("data",data);
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
    /**
     * 查询功能
     *
     * @param
     * @return
     */
    @RequestMapping("searchOutBoundOrder")
    @ResponseBody
    public String searchOutBoundOrder(@RequestBody OutboundOrder outboundOrder) {
        JSONObject res = new JSONObject();
        try {
            List<OutboundOrder> outboundOrderList = outboundOrderService.search(outboundOrder);
            JSONArray data = JSONArray.fromArray(outboundOrderList.toArray(new OutboundOrder[outboundOrderList.size()]));
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
    /**
     *
     * 修改属性
     */
    @RequestMapping("upHandelCategoryById")
    @ResponseBody
    public String upHandelCategoryById(String outboundOrderId,int index){
        JSONObject res=new JSONObject();
        try {
          outboundOrderService.upHandelCategoryById(outboundOrderId,index);
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
    /**
     * totalInventoryRecord计算数据总条数
     */
    @RequestMapping("totalInventoryRecord")
    @ResponseBody
    public int totalInventoryRecord(){
        try {
            return wasteInventoryService.countInventory();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    /**
     * 获取查询总数
     * @param wasteInventory
     * @return
     */
//    @RequestMapping("searchSewageTotal")
//    @ResponseBody
//    public int searchSewageTotal(@RequestBody WasteInventory wasteInventory) {
//            return 0;
//    }
    /**
     * 获取配料单总数
     */
    @RequestMapping("totalBatchingRecord")
    @ResponseBody
    public int totalBatchingRecord() {
        try {
            return wasteInventoryService.total1();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }


    /**
     * 获得领料单总数
     *
     */
    @RequestMapping("totalMaterialRecord")
    @ResponseBody
    public int totalMaterialRecord(){
        try {
            return materialRequisitionOrderService.total();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    /**
     * 根据编号查询入库信息
     */
    @RequestMapping("getByInboundOrderItemId")
    @ResponseBody
    public String getByInboundOrderItemId(String inboundOrderItemId){
        JSONObject res=new JSONObject();
       try {
           List<WasteInventory> wasteInventoryList=wasteInventoryService.getByInboundOrderItemId(inboundOrderItemId);
           res.put("wasteInventoryList", wasteInventoryList);
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

    /**
     * 获取危废出库总数
     *
     */
    @RequestMapping("totalWastesOutBoundRecord")
    @ResponseBody
    public int totalWastesOutBoundRecord(){
        try {
            return outboundOrderService.totalWastesOutBoundRecord();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }
    /**
     * 获得次生出库总记录数
     */
    @RequestMapping("totalSecOutBoundRecord")
    @ResponseBody
    public int totalSecOutBoundRecord(){
        try {
            return outboundOrderService.totalSecOutBoundRecord();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }
    //获取待出库的领料单列表
    @RequestMapping("getMaterialByToOut")
    @ResponseBody
    public String getMaterialByToOut(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try{
            List<MaterialRequisitionOrder> materialRequisitionOrderList= materialRequisitionOrderService.list2(page);
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
            String number = "00001";
            // for (int i=0;i<list.size();i++){
            //materialRequisitionOrderService.updateMaterialRequisitionOrderOnId(list.get(i));//更新危废主键和仓库编码和库户编号
            //materialRequisitionOrderService.updateBatchingOrderCheck(list.get(i));//更新配料单的状态
            //更新仓库编号
            //materialRequisitionOrderService.updateMaterialRequisitionOrderCheck(list.get(i));//更新领料单的状态
            //}
            List<MaterialRequisitionOrder> materialRequisitionOrderList1= materialRequisitionOrderService.list2(page);
            List<MaterialRequisitionOrder> list2=new ArrayList<>();
            for (int i=0;i<materialRequisitionOrderList1.size();i++){
                if(materialRequisitionOrderList1.get(i).getBatchingOrder()!=null){
                    list2.add(materialRequisitionOrderList1.get(i));
                }
            }
            JSONArray jsonArray=JSONArray.fromObject(list2);
            res.put("jsonArray",materialRequisitionOrderList);
            res.put("status", "success");
            res.put("message", "分页数据获取成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败");
        }


        return res.toString();

    }
    //获取最早的出库日期 ==》危废
    @RequestMapping("getNewestDate")
    @ResponseBody
    public String getNewestDate(){
        JSONObject res=new JSONObject();
     try {
      List<Date> dateList=outboundOrderService.getNewestDate();
         res.put("status", "success");
         res.put("message", "查询最早出库时间成功");
         res.put("dateList", dateList);
     }
     catch (Exception e){
         e.printStackTrace();
         res.put("status", "fail");
         res.put("message", "查询最早出库时间失败");
     }
       return  res.toString();
    }
    //获取最早的入库日期危废
    @RequestMapping("getNewestInBoundDate")
    @ResponseBody
    public String getNewestInBoundDate(){
        JSONObject res=new JSONObject();
        try {
            List<Date> dateList=wasteInventoryService.getNewestInBoundDate();
            res.put("status", "success");
            res.put("message", "查询最早出库时间成功");
            res.put("dateList", dateList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询最早出库时间失败");
        }
        return  res.toString();
    }

    //获取最早的入库日期次生
    @RequestMapping("getNewestInBoundDateSec")
    @ResponseBody
    public String getNewestInBoundDateSec(){
        JSONObject res=new JSONObject();
        try {
            List<Date> dateList=wasteInventoryService.getNewestInBoundDateSec();
            res.put("status", "success");
            res.put("message", "查询最早出库时间成功");
            res.put("dateList", dateList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询最早出库时间失败");
        }
        return  res.toString();
    }

    //获取最早的出库日期 ==》次生
    @RequestMapping("getNewestDateSec")
    @ResponseBody
    public String getNewestDateSec(){
        JSONObject res=new JSONObject();
        try {
            List<Date> dateList=outboundOrderService.getNewestDateSec();
            res.put("status", "success");
            res.put("message", "查询最早出库时间成功");
            res.put("dateList", dateList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询最早出库时间失败");
        }
        return  res.toString();
    }

    //根据入库单的明细 查找用户编号以及危废的信息 添加到库存主表和库存明细中
    @RequestMapping("declareGeneration")
    @ResponseBody
    public String declareGeneration(@RequestBody Stock stock){
        JSONObject res=new JSONObject();
        try {
            List<String> list = stockService.getStockIdList();//合同id集合
            Client client=new Client();
            client.setClientId(stock.getClient().getClientId());
            if (list.size() <= 0) {
                stock.setStockId("1");
            }
            if (list.size() > 0) {
                stock.setStockId(String.valueOf(Integer.parseInt(list.get(0))+1));
            }
            stock.setClient(client);
            stockService.add(stock);
            res.put("status", "success");
            res.put("message", "添加主表成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加主表失败");
        }
        return res.toString();
    }

    @RequestMapping("declareGeneration1")
    @ResponseBody
    public String declareGeneration1(@RequestBody StockItem stockItem){
        JSONObject res=new JSONObject();
        try {
            List<String> list = stockService.getStockIdList();//合同id集合
            stockItem.setStockId(list.get(0));
            stockService.addStockItem(stockItem);
            res.put("status", "success");
            res.put("message", "添加子表成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加子表失败");
        }
        return res.toString();
    }

    //危废出库退库
    @RequestMapping("rollback")
    @ResponseBody
    public String rollback(String inboundOrderItemId,String outboundOrderId,float outboundNumber){
        JSONObject res=new JSONObject();
        try{
            //1显示更新出库单的状态
            wasteInventoryService.rollback(outboundOrderId);
            //2 更新库存的数据
            wasteInventoryService.returnNumber(inboundOrderItemId,outboundNumber);
            res.put("status", "success");
            res.put("message", "退库成功!");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "退库失败!");
        }


        return res.toString();


    }



}
