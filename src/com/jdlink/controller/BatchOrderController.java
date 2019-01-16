package com.jdlink.controller;

import com.jdlink.domain.Client;
import com.jdlink.domain.Dictionary.*;
import com.jdlink.domain.Inventory.*;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.service.ClientService;
import com.jdlink.service.WareHouseService;
import com.jdlink.service.dictionary.DictionaryService;
import com.jdlink.service.produce.BatchOrderService;
import com.jdlink.util.DBUtil;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Array;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.jdlink.domain.Inventory.BoundType.SecondaryOutbound;
import static com.jdlink.domain.Produce.HandleCategory.*;
import static com.jdlink.util.ScienceToNumber.getNumber;

@Controller
public class BatchOrderController {
@Autowired
    BatchOrderService batchOrderService;
@Autowired
    ClientService clientService;
    @Autowired
    DictionaryService dictionaryService;
    @Autowired
    WareHouseService wareHouseService;

    //获取两位月数
    public  static  String getMouth(String mouth){
        if(mouth.length()!=2){
            mouth="0"+mouth;
        }
        return mouth;
    }

    //获取3位序列号
    public static String getString3(String id){
        while (id.length()!=3){
            System.out.println(id.length());
            id="0"+id;
        }
        return id;
    }


    //配料单导入
    @RequestMapping("importBatchExcel")
    @ResponseBody
    public String importBatchExcel(MultipartFile excelFile){
        JSONObject res=new JSONObject();
        List<Object[][]> data = ImportUtil.getInstance().getExcelFileData(excelFile);
        try {
            for(int i=0;i<data.size();i++) {//页数遍历
            //1首先找到所有的"常州市安耐得工业废弃物处置有限公司危险废物配料单"所在的行数u
                List<Integer> indexList=new ArrayList<>(0);//保存标题的列表
                for(int j=0;j<data.get(i).length;j++){
                     if(data.get(i)[j][0].toString().indexOf("常州市安耐得工业废弃物处置有限公司危险废物配料单")!=-1){
                         indexList.add(j);
                     }
                }
                for (Integer i1:indexList
                     ) {
                    System.out.println(i1);
                }
                for(int k=0;k<indexList.size();k++){//寻找的次数
                    if(k<indexList.size()-1){//前面几次
                        for(int z=indexList.get(k)+2;z<indexList.get(k+1)-2;z++){
                           //在这里面进行遍历添加
                            if(data.get(i)[z][0]!="null"&&data.get(i)[z][0].toString().indexOf("配料人")==-1){
                                BatchingOrder batchingOrder=new BatchingOrder();
                                //1配料日期
                                if(data.get(i)[z][0].toString().indexOf("年")!=-1){
                                    String datestr=data.get(i)[z][0].toString().replace("年","-").replace("月","-").replace("日","");
                                    SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
                                    batchingOrder.setInboundOrderDate(simpleDateFormat.parse(datestr));
                                }
                                if(data.get(i)[z][0].toString().indexOf("/")!=-1){
                                    String datestr=data.get(i)[z][0].toString().replace("/","-");
                                    SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
                                    batchingOrder.setInboundOrderDate(simpleDateFormat.parse(datestr));
                                }


                                //2产废单位
                                Client client = clientService.getByName(data.get(i)[z][1].toString());
                                if (client != null) batchingOrder.setProduceCompany(client);
                                else {
                                    client = new Client();
                                    client.setClientId(clientService.getCurrentId());
                                    client.setCompanyName(data.get(i)[z][1].toString());
                                    clientService.add(client);
                                    batchingOrder.setProduceCompany(client);
                                }
                                //3废物名称
                                batchingOrder.setWastesName(data.get(i)[z][2].toString());

                                //3类别
                                batchingOrder.setWasteCategory(data.get(i)[z][3].toString());

                                //1号库入库量
                                if(data.get(i)[z][4]!="null"){
                                    batchingOrder.setStorage1(Float.parseFloat(data.get(i)[z][4].toString()));
                                }
                                if(data.get(i)[z][4]=="null"){
                                    batchingOrder.setStorage1(0);
                                }


                                //2号库入库量
                                if(data.get(i)[z][5]!="null"){
                                    batchingOrder.setStorage2(Float.parseFloat(data.get(i)[z][5].toString()));
                                }
                                if(data.get(i)[z][5]=="null"){
                                    batchingOrder.setStorage2(0);
                                }

                                //3智能库入库量
                                if(data.get(i)[z][6]!="null"){
                                    batchingOrder.setIntelligent(Float.parseFloat(data.get(i)[z][6].toString()));
                                }
                                if(data.get(i)[z][6]=="null"){
                                    batchingOrder.setIntelligent(0);
                                }


                                //1号库配料量
                                if(data.get(i)[z][7]!="null"){
                                    batchingOrder.setStorage1Batch(Float.parseFloat(data.get(i)[z][7].toString()));
                                }
                                if(data.get(i)[z][7]=="null"){
                                    batchingOrder.setStorage1Batch(0);
                                }

                                //2号库配料量
                                if(data.get(i)[z][8]!="null"){
                                    batchingOrder.setStorage2Batch(Float.parseFloat(data.get(i)[z][8].toString()));
                                }
                                if(data.get(i)[z][8]=="null"){
                                    batchingOrder.setStorage2Batch(0);
                                }
                                //智能库配料数
                                if(data.get(i)[z][9]!="null"){
                                    batchingOrder.setIntelligentBatch(Float.parseFloat(data.get(i)[z][9].toString()));
                                }
                                if(data.get(i)[z][9]=="null"){
                                    batchingOrder.setIntelligentBatch(0);
                                }

                                //余量
                                //1号库
                                float Storage1=0;
                                if(data.get(i)[z][4]=="null"){
                                    Storage1=0;
                                }
                                //2号库
                                float Storage2=0;
                                if(data.get(i)[z][5]=="null"){
                                    Storage2=0;
                                }
                                //3智能库
                                float intelligent=0;
                                if(data.get(i)[z][6]=="null"){
                                    intelligent=0;
                                }
                                //1号库配料量
                                float storage1Batch=0;
                                if(data.get(i)[z][7]=="null"){
                                    storage1Batch=0;
                                }
                                //2号库配料量
                                float storage2Batch=0;
                                if(data.get(i)[z][8]=="null"){
                                    storage2Batch=0;
                                }
                                //智能库配料数
                                float intelligentBatch=0;
                                if(data.get(i)[z][9]=="null"){
                                    intelligentBatch=0;
                                }
                                batchingOrder.setAllowance(Storage1+Storage2+intelligent-storage1Batch-storage2Batch-intelligentBatch);

                                //进料方式
                                if(data.get(i)[z][12]!="null"){
                                    if(data.get(i)[z][12].toString().indexOf("污")!=-1){
                                        batchingOrder.setHandelCategory(Sludge);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("液")!=-1){
                                        batchingOrder.setHandelCategory(WasteLiquid);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("散")!=-1){
                                        batchingOrder.setHandelCategory(Bulk);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("破")!=-1){
                                        batchingOrder.setHandelCategory(Crushing);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("精")!=-1){
                                        batchingOrder.setHandelCategory(Distillation);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("悬")!=-1){
                                        batchingOrder.setHandelCategory(Suspension);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("果")!=-1){
                                        batchingOrder.setHandelCategory(Jelly);
                                    }
                                }
                                if(data.get(i)[z][12]=="null"){
                                    batchingOrder.setHandelCategory(null);
                                }
                              //2配料单号
                                if(data.get(i)[z][13]!="null"){
                                    batchingOrder.setBatchingOrderId(getNumber((data.get(i)[z][13].toString())));
                                }
                                System.out.println(getNumber((data.get(i)[z][13].toString()))+"配料单号");
                                       batchOrderService.addBatchList(batchingOrder);
                            }

                        }


                    }
                    if(k==indexList.size()-1){//最后几次
                        for(int z=indexList.get(k)+2;z<data.get(i).length;z++){
                            if(data.get(i)[z][0]!="null"&&data.get(i)[z][0].toString().indexOf("配料人")==-1){
                                BatchingOrder batchingOrder=new BatchingOrder();
                                //1配料日期
                                if(data.get(i)[z][0].toString().indexOf("年")!=-1){
                                    String datestr=data.get(i)[z][0].toString().replace("年","-").replace("月","-").replace("日","");
                                    SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
                                    batchingOrder.setInboundOrderDate(simpleDateFormat.parse(datestr));
                                }
                                if(data.get(i)[z][0].toString().indexOf("/")!=-1){
                                    String datestr=data.get(i)[z][0].toString().replace("/","-");
                                    SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
                                    batchingOrder.setInboundOrderDate(simpleDateFormat.parse(datestr));
                                }

                                //2产废单位
                                Client client = clientService.getByName(data.get(i)[z][1].toString());
                                if (client != null) batchingOrder.setProduceCompany(client);
                                else {
                                    client = new Client();
                                    client.setClientId(clientService.getCurrentId());
                                    client.setCompanyName(data.get(i)[z][1].toString());
                                    clientService.add(client);
                                    batchingOrder.setProduceCompany(client);
                                }
                                //3废物名称
                                batchingOrder.setWastesName(data.get(i)[z][2].toString());

                                //3类别
                                batchingOrder.setWasteCategory(data.get(i)[z][3].toString());

                                //1号库入库量
                                if(data.get(i)[z][4]!="null"){
                                    batchingOrder.setStorage1(Float.parseFloat(data.get(i)[z][4].toString()));
                                }
                                if(data.get(i)[z][4]=="null"){
                                    batchingOrder.setStorage1(0);
                                }


                                //2号库入库量
                                if(data.get(i)[z][5]!="null"){
                                    batchingOrder.setStorage2(Float.parseFloat(data.get(i)[z][5].toString()));
                                }
                                if(data.get(i)[z][5]=="null"){
                                    batchingOrder.setStorage2(0);
                                }

                                //3智能库入库量
                                if(data.get(i)[z][6]!="null"){
                                    batchingOrder.setIntelligent(Float.parseFloat(data.get(i)[z][6].toString()));
                                }
                                if(data.get(i)[z][6]=="null"){
                                    batchingOrder.setIntelligent(0);
                                }


                                //1号库配料量
                                if(data.get(i)[z][7]!="null"){
                                    batchingOrder.setStorage1Batch(Float.parseFloat(data.get(i)[z][7].toString()));
                                }
                                if(data.get(i)[z][7]=="null"){
                                    batchingOrder.setStorage1Batch(0);
                                }

                                //2号库配料量
                                if(data.get(i)[z][8]!="null"){
                                    batchingOrder.setStorage2Batch(Float.parseFloat(data.get(i)[z][8].toString()));
                                }
                                if(data.get(i)[z][8]=="null"){
                                    batchingOrder.setStorage2Batch(0);
                                }
                                //智能库配料数
                                if(data.get(i)[z][9]!="null"){
                                    batchingOrder.setIntelligentBatch(Float.parseFloat(data.get(i)[z][9].toString()));
                                }
                                if(data.get(i)[z][9]=="null"){
                                    batchingOrder.setIntelligentBatch(0);
                                }

                                //余量
                                //1号库
                                float Storage1=0;
                                if(data.get(i)[z][4]=="null"){
                                    Storage1=0;
                                }
                                //2号库
                                float Storage2=0;
                                if(data.get(i)[z][5]=="null"){
                                    Storage2=0;
                                }
                                //3智能库
                                float intelligent=0;
                                if(data.get(i)[z][6]=="null"){
                                    intelligent=0;
                                }
                                //1号库配料量
                                float storage1Batch=0;
                                if(data.get(i)[z][7]=="null"){
                                    storage1Batch=0;
                                }
                                //2号库配料量
                                float storage2Batch=0;
                                if(data.get(i)[z][8]=="null"){
                                    storage2Batch=0;
                                }
                                //智能库配料数
                                float intelligentBatch=0;
                                if(data.get(i)[z][9]=="null"){
                                    intelligentBatch=0;
                                }

                                batchingOrder.setAllowance(Storage1+Storage2+intelligent-storage1Batch-storage2Batch-intelligentBatch);

                                //进料方式
                                if(data.get(i)[z][12]!="null"){
                                    if(data.get(i)[z][12].toString().indexOf("污")!=-1){
                                        batchingOrder.setHandelCategory(Sludge);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("液")!=-1){
                                        batchingOrder.setHandelCategory(WasteLiquid);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("散")!=-1){
                                        batchingOrder.setHandelCategory(Bulk);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("破")!=-1){
                                        batchingOrder.setHandelCategory(Crushing);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("精")!=-1){
                                        batchingOrder.setHandelCategory(Distillation);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("悬")!=-1){
                                        batchingOrder.setHandelCategory(Suspension);
                                    }
                                    if(data.get(i)[z][12].toString().indexOf("果")!=-1){
                                        batchingOrder.setHandelCategory(Jelly);
                                    }
                                }
                                if(data.get(i)[z][12]=="null"){
                                    batchingOrder.setHandelCategory(null);
                                }
                                //2配料单号
                                if(data.get(i)[z][13]!="null"){
                                    batchingOrder.setBatchingOrderId(getNumber((data.get(i)[z][13].toString())));
                                }
                                batchOrderService.addBatchList(batchingOrder);
                                System.out.println(batchingOrder+"对象");

                            }
                        }
                    }



                }




            }
            res.put("status", "success");
            res.put("message", "配料单添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "配料单添加失败");
        }

        return res.toString();

    }


    //获得配料单的下拉列表
    @RequestMapping("getBatchOrderList")
    @ResponseBody
    public String getBatchOrderList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            List<BatchingOrder> batchingOrderList=batchOrderService.BatchList(page);
            JSONArray array=JSONArray.fromObject(batchingOrderList);
            res.put("status", "success");
            res.put("message", "分页数据获取成功");
            res.put("batchingOrderList",array);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败");
        }

        return res.toString();
    }


    //配料单新增页面获取仓储信息
    @RequestMapping("getWasteInventoryListBat")
    @ResponseBody
    public String getWasteInventoryListBat(){
        JSONObject res=new JSONObject();
        try {
            List<WasteInventory> wasteInventoryList=batchOrderService.getWasteInventoryListBat();
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", wasteInventoryList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }



        return res.toString();
    }

    //获得库存信息(根据入库单明细编号)
    @RequestMapping("getWasteInventoryByInboundOrderId")
    @ResponseBody
    public String getWasteInventoryByInboundOrderId(String inboundOrderItemId){
        JSONObject res=new JSONObject();
        try {
           List<WasteInventory> wasteInventoryList= batchOrderService.getWasteInventoryByInboundOrderId(inboundOrderItemId);
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

    //添加配料单
    @RequestMapping("addBatchingOrderBat")
    @ResponseBody
    public String addBatchingOrderBat(@RequestBody BatchingOrder batchingOrder){
        JSONObject res=new JSONObject();

          Date date = new Date();   //获取当前时间
         SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");

        String prefix = simpleDateFormat.format(date);

        String count=String.valueOf ((batchOrderService.getCountByTime(prefix))+1);

        while (count.length()!=3){

            count='0'+count;
        }

        String batchingOrderId = prefix + count;


        try {
            //添加配料单
               batchingOrder.setBatchingOrderId(batchingOrderId);

            //处置方式适配
            ProcessWayItem processWayItem =batchingOrder.getProcessWayItem();
            if(processWayItem.getDataDictionaryItemId()!=0){
                int  dataDictionaryItemId= dictionaryService.getdatadictionaryitemIdByName(processWayItem.getDictionaryItemName(),8);
                processWayItem.setDataDictionaryItemId(dataDictionaryItemId);
            }

            batchingOrder.setProcessWayItem(processWayItem);

            //进料方式适配

            HandleCategoryItem handleCategoryItem=batchingOrder.getHandleCategoryItem();
            if(handleCategoryItem.getDataDictionaryItemId()!=0){
                int  dataDictionaryItemId1= dictionaryService.getdatadictionaryitemIdByName(handleCategoryItem.getDictionaryItemName(),6);
                handleCategoryItem.setDataDictionaryItemId(dataDictionaryItemId1);

            }
            batchingOrder.setHandleCategoryItem(handleCategoryItem);
               batchOrderService.addBatchingOrderBat(batchingOrder);
            //配料完成后扣除库存数据
            batchOrderService.deducNumber(batchingOrder.getInboundOrderItemId(),batchingOrder.getBatchingNumber());
            res.put("status", "success");
            res.put("message", "配料单添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "配料单添加失败");

        }

        return res.toString();

    }

    //添加领料单
    @RequestMapping("addRequisition")
    @ResponseBody
    public String addRequisition(@RequestBody MaterialRequisitionOrder materialRequisitionOrder)
    {
        JSONObject res=new JSONObject();

        try{
            //重新选择配料单号
            String prefix=materialRequisitionOrder.getMaterialRequisitionId();

            String count=String.valueOf ((batchOrderService.getCountByBatchId(prefix))+1);


            while (count.length()!=3){

                count='0'+count;
            }

            String materialRequisitionOrderId=prefix+count;
            materialRequisitionOrder.setMaterialRequisitionId(materialRequisitionOrderId);

            //处置方式适配

            ProcessWayItem processWayItem =materialRequisitionOrder.getProcessWayItem();
            if(processWayItem.getDataDictionaryItemId()!=0){
                int  dataDictionaryItemId= dictionaryService.getdatadictionaryitemIdByName(processWayItem.getDictionaryItemName(),8);
                processWayItem.setDataDictionaryItemId(dataDictionaryItemId);
            }

            materialRequisitionOrder.setProcessWayItem(processWayItem);

            //进料方式适配
            HandleCategoryItem handleCategoryItem=materialRequisitionOrder.getHandleCategoryItem();
            if(handleCategoryItem.getDataDictionaryItemId()!=0){
                int  dataDictionaryItemId1= dictionaryService.getdatadictionaryitemIdByName(handleCategoryItem.getDictionaryItemName(),6);
                handleCategoryItem.setDataDictionaryItemId(dataDictionaryItemId1);
            }

            materialRequisitionOrder.setHandleCategoryItem(handleCategoryItem);
            batchOrderService.addRequisition(materialRequisitionOrder);
            //紧接着更新配料单的状态==>现在不更新状态，更新数量（配料单号和领用数量）
            //batchOrderService.updateBatchOrderState(materialRequisitionOrder.getMaterialRequisitionId());
            batchOrderService.updateBatchOrderNumberAfterMater(prefix,materialRequisitionOrder.getRecipientsNumber());
            res.put("status", "success");
            res.put("message", "领料单添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "领料单添加失败");

        }
        return res.toString();
    }

    //领料单新增页面显示
    @RequestMapping("getMaterialRequisitionList")
    @ResponseBody
    public String getMaterialRequisitionList(String b){
        JSONObject res=new JSONObject();
        try {
            //List<MaterialRequisitionOrder> materialRequisitionOrderList=batchOrderService.getMaterialRequisitionList();
          List<BatchingOrder> batchingOrderList=new ArrayList<>();
           String[] arr = b.split(",");
           for(int i=0;i<arr.length;i++){
               //根据配料单号查询
               batchingOrderList.add(batchOrderService.getBatchById(arr[i]));
           }

            res.put("status", "success");
            res.put("message", "新领料查询成功");
           res.put("jsonArray", batchingOrderList);

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新领料查询失败");


        }

        return res.toString();


    }

    //领料单新增完毕进行更新
    @RequestMapping("updateMaterialRequisitionOrder")
    @ResponseBody
    public String updateMaterialRequisitionOrder(@RequestBody MaterialRequisitionOrder materialRequisitionOrder ){
        JSONObject res=new JSONObject();
        try{
            batchOrderService.updateMaterialRequisitionOrder(materialRequisitionOrder);
            res.put("status", "success");
            res.put("message", "领料成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "领料失败");
        }


        return  res.toString();
    }

    //根据领料编号获取信息
    @RequestMapping("getByMaterialRequisitionId")
    @ResponseBody
    public String getByMaterialRequisitionId(String materialRequisitionId){
        JSONObject res=new JSONObject();
        try{
            MaterialRequisitionOrder materialRequisitionOrder= batchOrderService.getByMaterialRequisitionId(materialRequisitionId);
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

    //添加出库单
    @RequestMapping("addOutBoundOrder")
    @ResponseBody
    public  String addOutBoundOrder(@RequestBody OutboundOrder outboundOrder){
        JSONObject res=new JSONObject();

        try{

            List<String> stringList=batchOrderService.getDateBbySettledWastes();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
            String yearAndMouth=sdf.format(outboundOrder.getOutboundDate());

            if(stringList.contains(yearAndMouth)){
                res.put("message", "无法出库,出库日期为:"+yearAndMouth+"月份已结账");
                res.put("status", "back");
            }
            else {
                //改变领料单的状态
                batchOrderService.updateMaterialRequisitionOrderCheck(outboundOrder.getOutboundOrderId());

                String outboundOrderId=outboundOrder.getOutboundOrderId();
                if(outboundOrder.getWareHouse().getWareHouseId()!=0){
                    WareHouse wareHouse = wareHouseService.getWareHouseById(outboundOrder.getWareHouse().getWareHouseId()+"");
                    if(wareHouse!=null){
                        outboundOrderId=wareHouse.getPrefix()+outboundOrderId;
                    }

                }
                outboundOrder.setOutboundOrderId(outboundOrderId);
                //处置方式适配

                ProcessWayItem processWayItem =outboundOrder.getProcessWayItem();
                if(processWayItem.getDataDictionaryItemId()!=0){
                    int  dataDictionaryItemId= dictionaryService.getdatadictionaryitemIdByName(processWayItem.getDictionaryItemName(),8);
                    processWayItem.setDataDictionaryItemId(dataDictionaryItemId);
                }

                outboundOrder.setProcessWayItem(processWayItem);


                //进料方式适配
                HandleCategoryItem handleCategoryItem=outboundOrder.getHandleCategoryItem();
                if(handleCategoryItem.getDataDictionaryItemId()!=0){
                    int  dataDictionaryItemId1= dictionaryService.getdatadictionaryitemIdByName(handleCategoryItem.getDictionaryItemName(),6);
                    handleCategoryItem.setDataDictionaryItemId(dataDictionaryItemId1);
                }

                outboundOrder.setHandleCategoryItem(handleCategoryItem);
                batchOrderService.addOutBoundOrder(outboundOrder);

                res.put("status", "success");
                res.put("message", "出库成功");
            }

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "出库失败");

        }

        return res.toString();
    }

    //加载危废出库
    @RequestMapping("loadWastesOutBoundList")
    @ResponseBody
    public  String loadWastesOutBoundList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            List<OutboundOrder> outboundOrderList=batchOrderService.loadWastesOutBoundList(page);
            res.put("data",outboundOrderList);
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

    //次生库存查看
    @RequestMapping("getSecondaryInventoryList")
    @ResponseBody
    public String getSecondaryInventoryList(@RequestBody Page page) {
        JSONObject res=new JSONObject();
        try {
            List<WasteInventory> wasteInventoryList= batchOrderService.getSecInventoryListBat(page);
            JSONArray arrray=JSONArray.fromObject(wasteInventoryList);
            // Quotation quotation=quotationService.getQuotationByWastesCodeAndClientId(wastesCode, clientId);
            //更新剩余库存量
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
            res.put("data", arrray);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }


        return res.toString();
    }

    //次生库存新增
    @RequestMapping("getSecInventoryListAdd")
    @ResponseBody
    public String getSecInventoryListAdd(@RequestBody Page page) {
        JSONObject res=new JSONObject();
        try {
            List<WasteInventory> wasteInventoryList= batchOrderService.getSecInventoryListAdd();
            JSONArray arrray=JSONArray.fromObject(wasteInventoryList);
            // Quotation quotation=quotationService.getQuotationByWastesCodeAndClientId(wastesCode, clientId);
            //更新剩余库存量
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
            res.put("data", arrray);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }


        return res.toString();
    }

    //添加次生出库单
    @RequestMapping("addSecondary")
    @ResponseBody
    public String addSecondary(@RequestBody OutboundOrder outboundOrder){
        JSONObject res=new JSONObject();
        try{
            List<String> stringList=batchOrderService.getDateBbySettled();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
            String yearAndMouth=sdf.format(outboundOrder.getOutboundDate());
            if(stringList.contains(yearAndMouth)){
                res.put("message", "无法出库,出库日期为:"+yearAndMouth+"月份已结账");
                res.put("status", "back");
            }else {
            Date date = new Date();   //获取当前时间
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");

            String prefix = simpleDateFormat.format(date);

            String count=String.valueOf ((batchOrderService.getSecCountByTime(prefix))+1);

            while (count.length()!=4){

                count='0'+count;
            }
            String outBoundOrderId = prefix + count;
            WareHouse wareHouse=wareHouseService.getWareHouseByName(outboundOrder.getWareHouse().getWareHouseName());
            if(wareHouse!=null){
                outboundOrder.setWareHouse(wareHouse);
                outBoundOrderId=wareHouse.getPrefix()+outBoundOrderId;
            }


            outboundOrder.setOutboundOrderId(outBoundOrderId);

              //处置方式适配
                ProcessWayItem processWayItem =outboundOrder.getProcessWayItem();
                int  dataDictionaryItemId1= dictionaryService.getdatadictionaryitemIdByName(processWayItem.getDictionaryItemName(),8);
                processWayItem.setDataDictionaryItemId(dataDictionaryItemId1);
                outboundOrder.setProcessWayItem(processWayItem);

                  //次生名称适配
            SecondaryCategoryItem secondaryCategoryItem=new SecondaryCategoryItem();
            int dataDictionaryItemId=dictionaryService.getdatadictionaryitemIdByName(outboundOrder.getWastesName(),26);
            secondaryCategoryItem.setDataDictionaryItemId(dataDictionaryItemId);
            outboundOrder.setSecondaryCategoryItem(secondaryCategoryItem);

            //物质形态
            FormTypeItem formTypeItem=outboundOrder.getFormTypeItem();
            int  dataDictionaryItemId2= dictionaryService.getdatadictionaryitemIdByName(formTypeItem.getDictionaryItemName(),1);
            formTypeItem.setDataDictionaryItemId(dataDictionaryItemId2);
            outboundOrder.setFormTypeItem(formTypeItem);
            //包装方式
            PackageTypeItem packageTypeItem=outboundOrder.getPackageTypeItem();
            int  dataDictionaryItemId3= dictionaryService.getdatadictionaryitemIdByName(packageTypeItem.getDictionaryItemName(),21);
            packageTypeItem.setDataDictionaryItemId(dataDictionaryItemId3);
            outboundOrder.setPackageTypeItem(packageTypeItem);

            //先扣减库存(按照入库日期优先)
             List<WasteInventory> wasteInventoryList=batchOrderService.getSecInventoryByDate(outboundOrder.getSecondaryCategoryItem().getDataDictionaryItemId(),outboundOrder.getWareHouse().getWareHouseId());
             outboundByDateFromSec(wasteInventoryList,outboundOrder.getOutboundNumber());
             batchOrderService.addSecondary(outboundOrder);
                res.put("message", "次生出库成功");
                res.put("status", "success");
            }




        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "次生出库失败");
        }

        return  res.toString();
    }

    //加载次生出库
    @RequestMapping("loadSecOutBoundList")
    @ResponseBody
    public  String loadSecOutBoundList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            List<OutboundOrder> outboundOrderList=batchOrderService.loadSecOutBoundList(page);
            res.put("data",outboundOrderList);
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

    //加载领料单列表
    @RequestMapping("getMaterialRequisitionOrderList")
    @ResponseBody
    public String getMaterialRequisitionOrderList(@RequestBody Page page){
        JSONObject res=new JSONObject();

        try {
            List<MaterialRequisitionOrder> materialRequisitionOrderList=batchOrderService.getMaterialRequisitionOrderList(page);
            res.put("status", "success");
            res.put("message", "领料单查询成功");
            res.put("data", materialRequisitionOrderList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "领料单查询失败");
        }

        return res.toString();


    }

    //根据入库单号查询信息==》危废
    @RequestMapping("getByOutBoundOrderId")
    @ResponseBody
    public  String getByOutBoundOrderId(String outboundOrderId){
        JSONObject res=new JSONObject();
        try {
            OutboundOrder outboundOrder = batchOrderService.getWastesOutBoundById(outboundOrderId);
            JSONObject data = JSONObject.fromBean(outboundOrder);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data",data);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }
        return res.toString();
    }

    //根据入库单号查询信息==》次生
    @RequestMapping("getSecOutBoundById")
    @ResponseBody
    public String getSecOutBoundById(String outboundOrderId){
        JSONObject res=new JSONObject();
        try {
            OutboundOrder outboundOrder=batchOrderService.getSecOutBoundById(outboundOrderId);

            //查询库存数量（根据仓库和危废名称）
      if(outboundOrder.getWareHouse()!=null&&outboundOrder.getSecondaryCategoryItem()!=null){
         float inventoryNumber=batchOrderService.getCountByWareHouseAndName(outboundOrder.getWareHouse().getWareHouseId(),outboundOrder.getSecondaryCategoryItem().getDataDictionaryItemId());
         outboundOrder.setInventoryNumber(inventoryNumber);
     }
     else
         outboundOrder.setInventoryNumber(0);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data",outboundOrder);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }
        return res.toString();
    }

    @RequestMapping("getWasteInventoryList")
    @ResponseBody
    public String getWasteInventoryList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try{
              List<WasteInventory> wasteInventoryList=batchOrderService.getWasteInventoryList(page);
            res.put("data", wasteInventoryList);
              res.put("status", "success");
            res.put("message", "分页数据获取成功!");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }
        return res.toString();
    }

    //根据配料单号查询信息
    @RequestMapping("getBatchingOrderById")
    @ResponseBody
    public String getBatchingOrderById(String batchingOrderId){
        JSONObject res=new JSONObject();



        try {
            BatchingOrder batchingOrder=batchOrderService.getBatchById(batchingOrderId);
            //再获取下库存数量
            float inventoryNumber=batchOrderService.getCountByInboundOrderItemId(batchingOrder.getInboundOrderItemId());
            batchingOrder.setInventoryNumber(inventoryNumber);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", batchingOrder);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();

    }

    //修改配料单
    @RequestMapping("updateBatchingOrder")
    @ResponseBody
    public String updateBatchingOrder(@RequestBody BatchingOrder batchingOrder){
        JSONObject res=new JSONObject();

        try {
            batchOrderService.updateBatchingOrder(batchingOrder);
            //更新库存数量
            batchOrderService.updateWasteInventoryActualCount(batchingOrder.getInboundOrderItemId(),batchingOrder.getInventoryNumber());
            res.put("status", "success");
            res.put("message", "配料单修改成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "配料单修改失败");
        }

        return res.toString();

    }

   //通过领料单号获取领料单
    @RequestMapping("getMaterialRequisitionOrderById")
    @ResponseBody
    public String getMaterialRequisitionOrderById(String materialRequisitionOrderId){
        JSONObject res=new JSONObject();

        try {
            MaterialRequisitionOrder materialRequisitionOrder=batchOrderService.getByMaterialRequisitionId(materialRequisitionOrderId);
            //根据配料单号查询配料数量
            String batchingOrderId=materialRequisitionOrderId.substring(0,materialRequisitionOrderId.length()-3);
                  float batchingNumber=batchOrderService.getCountByBatchingOrderId(batchingOrderId);
            materialRequisitionOrder.setBatchingNumber(batchingNumber);

            res.put("status", "success");
            res.put("message", "领料单获取成功");
            res.put("data", materialRequisitionOrder);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "领料单获取失败");
        }
        return res.toString();

    }

     //修改领料单数据
    @RequestMapping("adjustMaterialRequisitionOrder")
    @ResponseBody
    public String adjustMaterialRequisitionOrder(@RequestBody MaterialRequisitionOrder materialRequisitionOrder){
        JSONObject res=new JSONObject();

        try {
            batchOrderService.adjustMaterialRequisitionOrder(materialRequisitionOrder);
            String batchingOrderId=materialRequisitionOrder.getMaterialRequisitionId().substring(0,materialRequisitionOrder.getMaterialRequisitionId().length()-3);
            batchOrderService.updateCountByBatchingOrderId(batchingOrderId,materialRequisitionOrder.getBatchingNumber());
            res.put("status", "success");
            res.put("message", "领料单修改成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "领料单修改失败");

        }


        return res.toString();

    }

    //更新次生出库单
    @RequestMapping("updateSecOutBound")
    @ResponseBody
    public String updateSecOutBound(@RequestBody OutboundOrder outboundOrder){
        JSONObject res=new JSONObject();

        try {
            OutboundOrder outboundOrder1=batchOrderService.getSecOutBoundById(outboundOrder.getOutboundOrderId());
                 //1获取此物品在该仓库的总数
           float count=batchOrderService.getCountByWareHouseAndName(outboundOrder1.getWareHouse().getWareHouseId(),outboundOrder1.getSecondaryCategoryItem().getDataDictionaryItemId());

                 //2将获取的总数减去数库存量
            float difference=count-outboundOrder.getInventoryNumber();
            //3判断
            //3.1若大于0 即扣减库存
            if(difference>0){
                List<WasteInventory> wasteInventoryList=batchOrderService.getSecInventoryByDate(outboundOrder1.getSecondaryCategoryItem().getDataDictionaryItemId(),outboundOrder1.getWareHouse().getWareHouseId());
                outboundByDateFromSec(wasteInventoryList,difference);
            }
            //3.2若小于0即添加库存
            if(difference<=0){
                WasteInventory wasteInventory=batchOrderService.getSecInventoryByDateDesc(outboundOrder1.getSecondaryCategoryItem().getDataDictionaryItemId(),outboundOrder1.getWareHouse().getWareHouseId());
                AddWasteInventory(wasteInventory,difference);
            }
//            getCountByWareHouseAndName
      batchOrderService.updateSecOutBound(outboundOrder);


            res.put("status", "success");
            res.put("message", "次生出库单修改成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "次生出库单修改失败");
        }
        return res.toString();

    }

    //作废配料单
    @RequestMapping("cancelBatchingOrder")
    @ResponseBody
    public String cancelBatchingOrder(@RequestBody BatchingOrder batchingOrder){
        JSONObject res=new JSONObject();

        try {
           //1作废
            batchOrderService.cancelBatchingOrder(batchingOrder);

            //2库存更细
            batchOrderService.updateInventoryNumber(batchingOrder.getInboundOrderItemId(),batchingOrder.getBatchingNumber());
            res.put("status", "success");
            res.put("message", "配料单作废成功");


        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "配料单作废失败");
        }

        return res.toString();
    }

    //作废领料单
    @RequestMapping("cancelMaterialRequisitionOrder")
    @ResponseBody
    public String cancelMaterialRequisitionOrder(@RequestBody MaterialRequisitionOrder materialRequisitionOrder){
        JSONObject res=new JSONObject();

        try {
            //1作废
          batchOrderService.cancelMaterialRequisitionOrder(materialRequisitionOrder);

          //更新配料单数据
            String batchingOrderId=materialRequisitionOrder.getMaterialRequisitionId().substring(0,materialRequisitionOrder.getMaterialRequisitionId().length()-3);
            batchOrderService.updateBatchOrderNumber(batchingOrderId,materialRequisitionOrder.getRecipientsNumber());
            res.put("status", "success");
            res.put("message", "领料单作废成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "领料单作废失败");
        }
        return res.toString();

    }

    /**
     * 作废危废出库单
     */
    @RequestMapping("cancelOutBoundOrder")
    @ResponseBody
    public  String cancelOutBoundOrder(@RequestBody OutboundOrder outboundOrder){
        JSONObject res=new JSONObject();
        try {
             //1状态作废
            batchOrderService.cancelOutBoundOrder(outboundOrder);
            //2将数量还给库存
            batchOrderService.updateInventoryNumberAfterInvalid(outboundOrder.getInboundOrderItemId(),outboundOrder.getInventoryNumber());
            res.put("status", "success");
            res.put("message", "作废成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }
        return  res.toString();
    }

    /**
     * 退库危废出库单
     */
    @RequestMapping("retireOutBoundOrder")
    @ResponseBody
    public  String retireOutBoundOrder(@RequestBody OutboundOrder outboundOrder){
        JSONObject res=new JSONObject();
        try {
            //1状态作废
            batchOrderService.retireOutBoundOrder(outboundOrder);
            //2将数量还给库存
          OutboundOrder outboundOrder1=batchOrderService.getSecOutBoundById(outboundOrder.getOutboundOrderId());
          WasteInventory wasteInventory=batchOrderService.getSecInventoryByDateDesc(outboundOrder1.getSecondaryCategoryItem().getDataDictionaryItemId(),outboundOrder1.getWareHouse().getWareHouseId());
          AddWasteInventory(wasteInventory,-(outboundOrder.getInventoryNumber()));

            res.put("status", "success");
            res.put("message", "退库成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }
        return  res.toString();
    }

    //作废次生出库单
    @RequestMapping("cancelSecOutBoundOrder")
    @ResponseBody
    public String cancelSecOutBoundOrder(@RequestBody OutboundOrder outboundOrder){
        JSONObject res=new JSONObject();

        try {
          batchOrderService.cancelOutBoundOrder(outboundOrder);
           OutboundOrder outboundOrder1=batchOrderService.getSecOutBoundById(outboundOrder.getOutboundOrderId());

         WasteInventory wasteInventory=batchOrderService.getSecInventoryByDateDesc(outboundOrder1.getSecondaryCategoryItem().getDataDictionaryItemId(),outboundOrder1.getWareHouse().getWareHouseId());
            AddWasteInventory(wasteInventory,-(outboundOrder.getInventoryNumber()));
        //同步更新库存数量
            res.put("status", "success");
            res.put("message", "出库单作废成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "出库单作废失败");
        }

        return res.toString();

    }

    //配料单导出
    @RequestMapping("exportExcelBatchingOrder")
    @ResponseBody
    public String exportExcelBatchingOrder(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "配料单号/仓库/产废单位/废物名称/配料数量(吨)/配料日期/创建日期/联单号/进料方式/处置方式";
            name = "配料单";   //重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");

        }


        return res.toString();
    }


    //领料单导出
    @RequestMapping("exportExcelMaterialRequisitionOrder")
    @ResponseBody
    public String exportExcelMaterialRequisitionOrder(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "领料单号/仓库名称/危废类别/危废名称/配料数量/领用数量/产废单位/转移联单/进料方式/处置方式/保管员/领料部门主管/领料人/领料日期/部门/主管副总经理/部门仓库主管";
            name = "领料单";   //重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");

        }


        return res.toString();
    }


    //危废出库导出
    @RequestMapping("exportExcelWastesOutBound")
    @ResponseBody
    public String exportExcelWastesOutBound(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "出库单号/出库日期/产废单位/危废名称/危废类别/仓库/出库数量/转移联单/进料方式/处置方式/处置设备";
            name = "危废出库单";   //重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");

        }


        return res.toString();
    }

    //危废库存导出
    @RequestMapping("exportExcelWasteInventory")
    @ResponseBody
    public String exportExcelWasteInventory(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "入库单号/仓库/创建日期/入库日期/实际数量/产废单位/危废编码/危废名称/进料方式/处置方式";
            name = "危废库存单";   //重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");

        }


        return res.toString();
    }

    //次生出库导出
    @RequestMapping("exportExcelSecOutBound")
    @ResponseBody
    public String exportExcelSecOutBound(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "出库单号/出库日期/产废单位/危废名称/危废类别/仓库/出库数量/转移联单/处置方式/处置设备";
            name = "次生出库单";   //重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");

        }


        return res.toString();
    }

    //次生库存导出
    @RequestMapping("exportExcelSecInventory")
    @ResponseBody
    public String exportExcelSecInventory(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "入库单号/仓库/创建日期/入库日期/实际数量/产废单位/危废编码/危废名称";
            name = "次生库存单";   //重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");

        }


        return res.toString();
    }


    /*次生出库时按照优先入库扣减库存*/
    public void outboundByDateFromSec(List<WasteInventory> list,float count){
        for (int i=0;i<list.size();i++){
            if(count>0){

            if(list.get(i).getActualCount()<=count&&count>0){
                //做更新(库存为0) 条件是库存编号
                batchOrderService.lessThanOutBoundNumber(list.get(i).getWasteInventoryId());
                count=count-list.get(i).getActualCount();
             continue;
            }
                if(list.get(i).getActualCount()>count){
                    batchOrderService.moreThanOutBoundNumber(list.get(i).getWasteInventoryId(),count);
                    //做更新(做减法即可) 条件是库存编号
                    count=0;
                    continue;
                }
            }

            if(count<=0){
                System.out.println("OVER!");
            }
        }

    }

    /*小于0时添加库存*/
    public void AddWasteInventory(WasteInventory wasteInventory,float count){
        //更新库存添加
        batchOrderService.AddWasteInventory(count,wasteInventory.getWasteInventoryId());

    }

    /*根据出库单号锁定出库单*/
    @RequestMapping("confirmSettled")
    @ResponseBody
    public String confirmSettled(String outboundOrderId){
        JSONObject res=new JSONObject();
        try {
         batchOrderService.confirmSettled(outboundOrderId);
            res.put("status", "success");
            res.put("message", "出库单锁定成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "出库单锁定失败");
        }

      return res.toString();
    }

    /*危废库存查询*/
    @RequestMapping("searchWastesInventory")
    @ResponseBody
    public String searchWastesInventory(@RequestBody WasteInventory wasteInventory){
        JSONObject res=new JSONObject();

        try {
         List<WasteInventory> wasteInventoryList=batchOrderService.searchWastesInventory(wasteInventory);
            res.put("data", wasteInventoryList);
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败");
        }

        return res.toString();
    }

    /*危废库存查询计数*/
    @RequestMapping("searchWastesInventoryCount")
    @ResponseBody
    public int searchWastesInventoryCount(@RequestBody WasteInventory wasteInventory){
         return batchOrderService.searchWastesInventoryCount(wasteInventory);
    }

    /*次生出库查询*/
    @RequestMapping("searchSecOutbound")
    @ResponseBody
    public String searchSecOutbound(@RequestBody OutboundOrder outboundOrder){
        JSONObject res=new JSONObject();

        try {
           List<OutboundOrder> outboundOrderList=batchOrderService.searchSecOutbound(outboundOrder);
//            List<OutboundOrder> outboundOrderList=new ArrayList<>();
//            for(int i=0;i<outboundOrderList1.size();i++){
//                if(outboundOrderList1.get(i).getBoundType()==SecondaryOutbound){
//                    outboundOrderList.add(outboundOrderList1.get(i));
//                }
//            }
            res.put("status", "success");
            res.put("message", "高级查询成功");
            res.put("data", outboundOrderList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "高级查询失败");

        }


            return res.toString();
    }

    /*次生出库查询计数
     * */
    @RequestMapping("searchSecOutboundCount")
    @ResponseBody
    public int searchSecOutboundCount(@RequestBody OutboundOrder outboundOrder){

        return batchOrderService.searchSecOutboundCount(outboundOrder);
    }
}



