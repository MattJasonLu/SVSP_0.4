package com.jdlink.controller;

import com.jdlink.domain.Client;
import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.service.ClientService;
import com.jdlink.service.produce.BatchOrderService;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import static com.jdlink.domain.Produce.HandleCategory.*;
import static com.jdlink.util.ScienceToNumber.getNumber;

@Controller
public class BatchOrderController {
@Autowired
    BatchOrderService batchOrderService;
@Autowired
    ClientService clientService;
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
}
