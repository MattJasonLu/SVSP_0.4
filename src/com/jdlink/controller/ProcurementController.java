package com.jdlink.controller;

import com.jdlink.domain.Produce.Material;
import com.jdlink.domain.Produce.Procurement;
import com.jdlink.service.ProcurementService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 采购控制器
 * create By JackYang on 2018/9/1
 */
@Controller
public class ProcurementController {
    @Autowired
    ProcurementService procurementService;
    /**
     * 添加购物对象
     */
    @RequestMapping("addProcurement")
    @ResponseBody
    public String addProcurement(@RequestBody Procurement procurement){
        JSONObject res=new JSONObject();
        try {
            //1首先寻找最新的采购编号
            List<String> receiptNumberList=procurementService.getNewestId();
            //设定初始编号为'0001'
            String receiptNumber="0001";
            if(receiptNumberList.size()==0){
                receiptNumber="0001";
            }
            if(receiptNumberList.size()>0){
                receiptNumber=get4(receiptNumberList.get(0));
            }
            procurement.setReceiptNumber(receiptNumber);
            procurementService.add(procurement);
            res.put("status", "success");
            res.put("message", "添加采购信息成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加采购信息失败");
        }
        return res.toString();
    }
    /**
     * 添加物料信息
     *
     */
    @RequestMapping("addMaterial")
    @ResponseBody
    public String addMaterial(@RequestBody Material material){
        JSONObject res=new JSONObject();
        try{
          //1首先寻找最新的采购编号然后进行设置注入
            List<String> receiptNumberList=procurementService.getNewestId();
         material.setReceiptNumber(receiptNumberList.get(0));
            procurementService.addMaterial(material);
            res.put("status", "success");
            res.put("message", "添加物料需求成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加物料需求失败");
        }
     return  res.toString();
    }
    /**
     * 加载采购列表
     */
     @RequestMapping("getProcurementList")
     @ResponseBody
     public  String getProcurementList(){
         JSONObject res=new JSONObject();
         try {
              List<Procurement> procurements=procurementService.getProcurementList();
             JSONArray array=JSONArray.fromObject(procurements);
              res.put("data",array);
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
    /**
     * 根据编号获取信息
     */
    @RequestMapping("getProcurementListById")
    @ResponseBody
    public String getProcurementListById(String receiptNumber){
        JSONObject res=new JSONObject();
        try{
         List<Procurement> procurementList=procurementService.getProcurementListById(receiptNumber);
            res.put("data",procurementList);
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
    /**
     * 获取四位的编号
     */
    /**
     * 高级查询
     * @param
     * @return
     */
    @RequestMapping("searchProcurement")
    @ResponseBody
    public String searchProcurement(@RequestBody Procurement procurement){
        JSONObject res=new JSONObject();
        try {
            List<Procurement> procurementList=procurementService.searchProcurement(procurement);
            JSONArray array=JSONArray.fromObject(procurementList);
            res.put("data",array);
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
    public  String get4(String s){
        int i=Integer.parseInt(s);
        int i1=i+1;
        String s1=String.valueOf(i1);
        while (s1.length()!=4){
            s1="0"+s1;
        }
        return s1;
    }
    /**
     * 获得辅料物品列表
     */
    @RequestMapping("getIngredientsList")
    @ResponseBody
    public String getIngredientsList(){
        JSONObject res=new JSONObject();
       try {
           List<String> stringList=procurementService.getIngredientsList();
           res.put("stringList",stringList);
           res.put("status", "success");
           res.put("message", "更新成功");
       }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
           }


         return  res.toString();
    }
    /**
     * 作废
     */
    @RequestMapping("setProcurementListCancel")
    @ResponseBody
    public String setProcurementListCancel(String receiptNumber){
        JSONObject res=new JSONObject();
       try {
        procurementService.setProcurementListCancel(receiptNumber);
           res.put("status", "success");
           res.put("message", "作废成功");

       }
       catch (Exception e){
           e.printStackTrace();
           res.put("status", "fail");
           res.put("message", "作废失败");
       }
        return res.toString();

    }
    /**
     * 提交
     */
    @RequestMapping("setProcurementListSubmit")
    @ResponseBody
    public String setProcurementListSubmit(String receiptNumber){
        JSONObject res=new JSONObject();
        try {
            procurementService.setProcurementListSubmit(receiptNumber);
            res.put("status", "success");
            res.put("message", "提交成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");
        }
        return res.toString();

    }
}
