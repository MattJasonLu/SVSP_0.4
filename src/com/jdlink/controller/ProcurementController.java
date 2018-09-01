package com.jdlink.controller;

import com.jdlink.domain.Produce.Material;
import com.jdlink.domain.Produce.Procurement;
import com.jdlink.service.ProcurementService;
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
     * 获取四位的编号
     */
    public  String get4(String s){
        int i=Integer.parseInt(s);
        int i1=i+1;
        String s1=String.valueOf(i1);
        while (s1.length()!=4){
            s1="0"+s1;
        }
        return s1;
    }
}
