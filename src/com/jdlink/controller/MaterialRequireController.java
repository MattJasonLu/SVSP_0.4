package com.jdlink.controller;

import com.jdlink.domain.FormType;
import com.jdlink.domain.MixingElement;
import com.jdlink.domain.PackageType;
import com.jdlink.domain.Produce.*;
import com.jdlink.domain.Wastes;
import com.jdlink.service.CompatibilityService;
import com.jdlink.service.MaterialRequireService;
import com.jdlink.service.MixingElementService;
import com.jdlink.service.ThresholdService;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import static com.jdlink.domain.PackageType.*;

@Controller
public class MaterialRequireController {
    @Autowired
    MaterialRequireService materialRequireService;
    @Autowired
    CompatibilityService compatibilityService;
    @Autowired
    ThresholdService thresholdService;
    @Autowired
    MixingElementService mixingElementService;
    @RequestMapping("generateSheet")
    @ResponseBody
    public  String generateSheet() {
        JSONObject res = new JSONObject();
        //1首先获得最新的物料编号 即页面显示的配伍单号
        List<String> compatibilityIdList = compatibilityService.check1();
        //最新的一个配伍编号
        String compatibilityId = compatibilityIdList.get(0);
        //根据最新的配伍编号查找配伍计划表
        List<Compatibility> compatibilityList = compatibilityService.list(compatibilityId);
        //2获得基础数据阈值表的数据
        List<Threshold> thresholdList = thresholdService.list();
        Calendar cal = Calendar.getInstance();
        //获取年
        String year = String.valueOf(cal.get(Calendar.YEAR));
        //获取月
        String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
        //序列号
        String number = "001";
        //物料编号设置
        List<String> materialRequireList = materialRequireService.check();
        int total1 = materialRequireService.total();
        if (total1 == 0) {
            number = "001";
        }
        if (total1 != 0) {
            String s = materialRequireList.get(0);//原字符串
            String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
            number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
        }
        String materialRequireId = year + mouth + number;
        //3获得之后在后台进行拼接
        // 参数列表
try{
        for (int i = 0; i < compatibilityList.size(); i++) {
            MaterialRequire materialRequire = new MaterialRequire();
            List<Wastes> wastesList = new ArrayList<>();
            List<MixingElement> parameterList = new ArrayList<>();
            Wastes wastes = new Wastes();//危废信息
            materialRequire.setMaterialRequireId(materialRequireId);//设置物料编号
            //1查找最大序号，如果为空就为"1"
            int total = materialRequireService.total();
            //设置序号
            if (total == 0) {
                materialRequire.setId("1");
            } else {
                materialRequire.setId(String.valueOf(total + 1));
            }
            wastes.setId(RandomUtil.getRandomEightNumber());
            //对包装方式进行判断
            //污泥+半固态==>标准箱
            if (compatibilityList.get(i).getHandleCategory().toString() == "Sludge" && compatibilityList.get(i).getFormType().toString() == "HalfSolid") {
                wastes.setPackageType(Box);
            }
            //废液+液态==>吨箱
            else if (compatibilityList.get(i).getHandleCategory().toString() == "WasteLiquid" && compatibilityList.get(i).getFormType().toString() == "Liquid") {
                wastes.setPackageType(Ton);
            }
            //散装料+固态==>吨袋
            else if (compatibilityList.get(i).getHandleCategory().toString() == "Bulk" && compatibilityList.get(i).getFormType().toString() == "Solid") {
                wastes.setPackageType(Bag);
            }
            //破碎料+固态==>标准箱
            else if (compatibilityList.get(i).getHandleCategory().toString() == "Crushing" && compatibilityList.get(i).getFormType().toString() == "Solid") {
                wastes.setPackageType(Box);
            }
            //精馏残渣
            else if (compatibilityList.get(i).getHandleCategory().toString() == "Distillation") {
                //固态/半固态==>铁桶
                if (compatibilityList.get(i).getFormType().toString() == "Solid" || compatibilityList.get(i).getFormType().toString() == "HalfSolid") {
                    wastes.setPackageType(Iron);
                }
                //液态==>吨箱
                if (compatibilityList.get(i).getFormType().toString() == "Liquid") {
                    wastes.setPackageType(Ton);
                }
            }
            //悬挂连==>小袋
            else if (compatibilityList.get(i).getHandleCategory().toString() == "Suspension") {
                wastes.setPackageType(Pouch);
            } else {
                wastes.setPackageType(Ton);
            }
            wastes.setWastesId(RandomUtil.getRandomEightNumber());//设置危废编号
            //设置周安全计划量
                materialRequire.setWeeklyDemand(compatibilityList.get(i).getWeeklyDemand());
            //设置安全库存量
            materialRequire.setSafety(thresholdService.getSafety(compatibilityList.get(i).getHandleCategory().toString()));
            //最值摄入
            //1获得当前配屋计划的热值
            Threshold threshold = thresholdService.getByHandleCategory(compatibilityList.get(i).getHandleCategory().toString());
            //获得基础数据阈值表对应进料方式的最大最小值
            //热值
            MixingElement parameter = new MixingElement();
            float calorific = compatibilityList.get(i).getWastesList().get(i).getCalorific();
            float calorificMax = calorific + threshold.getCalorificMax();
            float calorificMin = calorific - threshold.getCalorificMin();
            parameter.setParameter(Parameter.values()[3]);//设置热值
            parameter.setMinimum(calorificMin);
            parameter.setMaximum(calorificMax);
            parameter.setId(RandomUtil.getRandomEightNumber());
            parameterList.add(parameter);
            //灰分
            MixingElement parameter1 = new MixingElement();
            float ash = compatibilityList.get(i).getWastesList().get(i).getAshPercentage();
            float ashMax = ash + threshold.getAshMax();
            float ashMin = ash - threshold.getAshMin();
            parameter1.setParameter(Parameter.values()[4]);//设置灰分
            parameter1.setMinimum(ashMin);
            parameter1.setMaximum(ashMax);
            parameter1.setId(RandomUtil.getRandomEightNumber());
            parameterList.add(parameter1);
            //水分
            MixingElement parameter2 = new MixingElement();
            float water = compatibilityList.get(i).getWastesList().get(i).getWetPercentage();
            float waterMax = water + threshold.getWaterMax();
            float waterMin = water - threshold.getWaterMin();
            parameter2.setParameter(Parameter.values()[8]);
            parameter2.setMinimum(waterMin);
            parameter2.setMaximum(waterMax);
            parameter2.setId(RandomUtil.getRandomEightNumber());
            parameterList.add(parameter2);
            //硫
            MixingElement parameter3 = new MixingElement();
            float s = compatibilityList.get(i).getWastesList().get(i).getSulfurPercentage();
            float sMax = s + threshold.getsMax();
            float sMin = s - threshold.getsMin();
            parameter3.setParameter(Parameter.values()[10]);//设置硫
            parameter3.setMinimum(sMin);
            parameter3.setMaximum(sMax);
            parameter3.setId(RandomUtil.getRandomEightNumber());
            parameterList.add(parameter3);
            //氯
            MixingElement parameter4 = new MixingElement();
            float cl = compatibilityList.get(i).getWastesList().get(i).getChlorinePercentage();//要改成这样子！！
            System.out.println(cl + "NNN");
            float clMax = cl + threshold.getClMax();
            float clMin = cl - threshold.getClMin();
            parameter4.setParameter(Parameter.values()[11]);
            parameter4.setMinimum(clMin);
            parameter4.setMaximum(clMax);
            parameter4.setId(RandomUtil.getRandomEightNumber());
            parameterList.add(parameter4);
            //磷
            MixingElement parameter5 = new MixingElement();
            float p = compatibilityList.get(i).getWastesList().get(i).getPhosphorusPercentage();
            float pMax = p + threshold.getpMax();
            float pMin = p - threshold.getpMin();
            parameter5.setParameter(Parameter.values()[13]);//设置磷
            parameter5.setMinimum(pMin);
            parameter5.setMaximum(pMax);
            parameter5.setId(RandomUtil.getRandomEightNumber());
            parameterList.add(parameter5);
            //氟
            MixingElement parameter6 = new MixingElement();
            float f = compatibilityList.get(i).getWastesList().get(i).getFluorinePercentage();
            System.out.println(f+"111");
            float fMax = f + threshold.getfMax();
            float fMin = f - threshold.getfMin();
            System.out.println(fMax+"====>"+fMin);
            parameter6.setParameter(Parameter.values()[12]);//设置磷
            parameter6.setMinimum(fMin);
            parameter6.setMaximum(fMax);
            parameter6.setId(RandomUtil.getRandomEightNumber());
            parameterList.add(parameter6);
            //PH
            MixingElement parameter7 = new MixingElement();
            float ph = compatibilityList.get(i).getWastesList().get(i).getPh();
            float phMax = ph + threshold.getPhMax();
            float phMin = ph - threshold.getPhMin();
            parameter7.setParameter(Parameter.values()[2]);//设置磷
            parameter7.setMinimum(phMin);
            parameter7.setMaximum(phMax);
            parameter7.setId(RandomUtil.getRandomEightNumber());
            parameterList.add(parameter7);
            wastes.setParameterList(parameterList);
            wastesList.add(wastes);
            materialRequire.setWastesList(wastesList);
            materialRequire.setThreshold(threshold);
            materialRequire.setCompatibility(compatibilityList.get(i));
            //设置包装类别
            materialRequire.setPackageType(wastes.getPackageType());
            //设置进料方式
            materialRequire.setHandleCategory(compatibilityList.get(i).getHandleCategory());
            //设置物质形态
            materialRequire.setFormType(compatibilityList.get(i).getFormType());
            materialRequireService.addMix(materialRequire);
        }
    res.put("status", "success");
    res.put("message", "添加成功");

}
     catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更添加失败");
        }


        //4保存在数据库
        return res.toString();
    }
    @RequestMapping("getMaterialList")
    @ResponseBody
     public String getMaterialList(){
        JSONObject res=new JSONObject();
        //1首先获得最新的物料编号
        List<String> theNewestId=materialRequireService.check();
        //2根据最新的物料单号查询信息
        try {
            List<MaterialRequire> materialRequireList = materialRequireService.list(theNewestId.get(0));
            JSONArray array = JSONArray.fromObject(materialRequireList);
            res.put("length",materialRequireList.size());
            res.put("array",array);
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
      /*导入功能*/
     @RequestMapping("importMaterialRequireIdExcel")
     @ResponseBody
     public String  importMaterialRequireIdExcel(MultipartFile excelFile){
         JSONObject res = new JSONObject();
         String fileName = excelFile.getOriginalFilename();
         Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile);
         Calendar cal = Calendar.getInstance();
         //获取年
         String year=String.valueOf(cal.get(Calendar.YEAR));
         //获取月
         String mouth= getMouth(String.valueOf(cal.get(Calendar.MONTH)+1));
         //序列号
         String number = "001";
         //物料编号设置
         List<String> materialRequireList = materialRequireService.check();
         int total1 = materialRequireService.total();
         if (total1 == 0) {
             number = "001";
         }
         if (total1 != 0) {
             String s = materialRequireList.get(0);//原字符串
             String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
             number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
         }
         //物料编号
         String materialRequireId = year + mouth + number;
         //进行数据绑定
         try {
             for(int i=2;i<data.length;i++){
                 MaterialRequire materialRequire = new MaterialRequire();
                 List<Wastes> wastesList = new ArrayList<>();
                 List<MixingElement> parameterList = new ArrayList<>();
                 Wastes wastes = new Wastes();//危废信息
                 materialRequire.setMaterialRequireId(materialRequireId);
                 int total = materialRequireService.total();
                 //设置序号
                 if (total == 0) {
                     materialRequire.setId("1");
                 } else {
                     materialRequire.setId(String.valueOf(total + 1));
                 }
                 wastes.setId(RandomUtil.getRandomEightNumber());
                 //第二列是一个枚举进行进行判断，首先是遍历第二列 处理方式
                 if(data[i][1].toString()!="null"){
                     HandleCategory handleCategory =(HandleCategory.getHandleCategory(data[i][1].toString()));
                     materialRequire.setHandleCategory(handleCategory);//射入
                 }
                 if(data[i][1].toString()=="null")
                     materialRequire.setHandleCategory(null);//射入
                 //第三列是一个枚举进行进行判断，首先是遍历第二列 包装
                 if(data[i][2].toString()!="null"){
                     PackageType packageType=(PackageType.getPackageType(data[i][2].toString())) ;
                     materialRequire.setPackageType(packageType);
                 }
                 if(data[i][2]=="null")
                     materialRequire.setPackageType(null);
                 //第四列是一个枚举进行进行判断，首先是遍历第二列 形态
                 if(data[i][3].toString()!="null"){
                     FormType formType=FormType.getFormType(data[i][3].toString());
                     materialRequire.setFormType(formType);
                 }
                 if(data[i][3]=="null"){
                     materialRequire.setFormType(null);
                 }
                 //第五列是周生产计划量
                 if(data[i][4].toString()!="null"){
                     materialRequire.setWeeklyDemand(Float.parseFloat(data[i][4].toString()));
                 }
                 if(data[i][4]=="null"){
                     materialRequire.setWeeklyDemand(0);
                 }
                 //第六列是目前库存量
                 if(data[i][5].toString()!="null"){
                     materialRequire.setCurrentInventory(Float.parseFloat(data[i][5].toString()));
                 }
                 if(data[i][5].toString()=="null"){
                     materialRequire.setSafety(0);
                 }
                 //第七列安全库存量
                 if(data[i][6].toString()!="null"){
                     materialRequire.setSafety(Float.parseFloat(data[i][6].toString()));
                 }
                 if(data[i][6].toString()=="null"){
                     materialRequire.setSafety(0);
                 }
                 //第8列市场采购量
                 if(data[i][7].toString()!="null"){
                     materialRequire.setMarketPurchases(Float.parseFloat(data[i][7].toString()));
                 }
                 if(data[i][7].toString()=="null"){
                     materialRequire.setMarketPurchases(0);
                 }
                 //第9列是热值最大 第10列是热值最小
                 MixingElement parameter = new MixingElement();
                 parameter.setParameter(Parameter.values()[3]);//设置热值
                 if(data[i][8].toString()!="null"&&data[i][9].toString()!="null"){
                     parameter.setMaximum(Float.parseFloat(data[i][8].toString()));
                     parameter.setMinimum(Float.parseFloat(data[i][9].toString()));
                 }
                 if(data[i][8].toString()=="null"||data[i][9].toString()=="null"){
                     parameter.setMinimum(0);
                     parameter.setMaximum(0);
                 }
                 parameter.setId(RandomUtil.getRandomEightNumber());
                 parameterList.add(parameter);
                 //第11列是灰分最大 第12列是灰分最小
                 MixingElement parameter1 = new MixingElement();
                 parameter1.setParameter(Parameter.values()[4]);//设置灰分
                 if(data[i][10].toString()!="null"&&data[i][11].toString()!="null"){
                     parameter1.setMaximum(Float.parseFloat(data[i][10].toString()));
                     parameter1.setMinimum(Float.parseFloat(data[i][11].toString()));
                 }
                 if(data[i][10].toString()=="null"||data[i][11].toString()=="null"){
                     parameter1.setMinimum(0);
                     parameter1.setMaximum(0);
                 }
                 parameter1.setId(RandomUtil.getRandomEightNumber());
                 parameterList.add(parameter1);
                 //第13列是水分最大 第14列是水分最小
                 MixingElement parameter2 = new MixingElement();
                 parameter2.setParameter(Parameter.values()[8]);
                 if(data[i][12].toString()!="null"&&data[i][13].toString()!="null"){
                     parameter2.setMaximum(Float.parseFloat(data[i][12].toString()));
                     parameter2.setMinimum(Float.parseFloat(data[i][13].toString()));
                 }
                 if(data[i][12].toString()=="null"||data[i][13].toString()=="null"){
                     parameter2.setMinimum(0);
                     parameter2.setMaximum(0);
                 }
                 parameter2.setId(RandomUtil.getRandomEightNumber());
                 parameterList.add(parameter2);
                 //第15列是硫最大 第16列是硫最小
                 MixingElement parameter3 = new MixingElement();
                 parameter3.setParameter(Parameter.values()[10]);//设置硫
                 if(data[i][14].toString()!="null"&&data[i][15].toString()!="null"){
                     parameter3.setMaximum(Float.parseFloat(data[i][14].toString()));
                     parameter3.setMinimum(Float.parseFloat(data[i][15].toString()));
                 }
                 if(data[i][14].toString()=="null"||data[i][15].toString()=="null"){
                     parameter3.setMinimum(0);
                     parameter3.setMaximum(0);
                 }
                 parameter3.setId(RandomUtil.getRandomEightNumber());
                 parameterList.add(parameter3);
                 //第17列是氯最大 第18列是氯最小
                 MixingElement parameter4 = new MixingElement();
                 parameter4.setParameter(Parameter.values()[11]);
                 if(data[i][16].toString()!="null"&&data[i][17].toString()!="null"){
                     parameter4.setMaximum(Float.parseFloat(data[i][16].toString()));
                     parameter4.setMinimum(Float.parseFloat(data[i][17].toString()));
                 }
                 if(data[i][16].toString()=="null"||data[i][17].toString()=="null"){
                     parameter4.setMinimum(0);
                     parameter4.setMaximum(0);
                 }
                 parameter4.setId(RandomUtil.getRandomEightNumber());
                 parameterList.add(parameter4);
                 //第19列是磷最大 第20列是磷最小
                 MixingElement parameter5 = new MixingElement();
                 parameter5.setParameter(Parameter.values()[13]);//设置磷
                 if(data[i][18].toString()!="null"&&data[i][19].toString()!="null"){
                     parameter5.setMaximum(Float.parseFloat(data[i][18].toString()));
                     parameter5.setMinimum(Float.parseFloat(data[i][19].toString()));
                 }
                 if(data[i][18].toString()=="null"||data[i][19].toString()=="null"){
                     parameter5.setMinimum(0);
                     parameter5.setMaximum(0);
                 }
                 parameter5.setId(RandomUtil.getRandomEightNumber());
                 parameterList.add(parameter5);
                 //第21列是氟最大 第22列是氟最小
                 MixingElement parameter6 = new MixingElement();
                 parameter6.setParameter(Parameter.values()[12]);//设置磷
                 if(data[i][20].toString()!="null"&&data[i][21].toString()!="null"){
                     parameter6.setMaximum(Float.parseFloat(data[i][20].toString()));
                     parameter6.setMinimum(Float.parseFloat(data[i][21].toString()));
                 }
                 if(data[i][20].toString()=="null"||data[i][21].toString()=="null"){
                     parameter6.setMinimum(0);
                     parameter6.setMaximum(0);
                 }
                 parameter6.setId(RandomUtil.getRandomEightNumber());
                 parameterList.add(parameter6);
                 //第23列是ph最大 第24列是ph最小
                 MixingElement parameter7 = new MixingElement();
                 parameter7.setParameter(Parameter.values()[2]);//设置磷
                 if(data[i][22].toString()!="null"&&data[i][23].toString()!="null"){
                     parameter7.setMaximum(Float.parseFloat(data[i][22].toString()));
                     parameter7.setMinimum(Float.parseFloat(data[i][23].toString()));
                 }
                 if(data[i][22].toString()=="null"||data[i][23].toString()=="null"){
                     parameter7.setMinimum(0);
                     parameter7.setMaximum(0);
                 }
                 parameter7.setId(RandomUtil.getRandomEightNumber());
                 parameterList.add(parameter7);
                 wastes.setParameterList(parameterList);
                 wastesList.add(wastes);
                 materialRequire.setWastesList(wastesList);
                 materialRequireService.addMix(materialRequire);
             }
             res.put("status", "success");
             res.put("message", "导入成功");
         }
         catch (Exception e){
             e.printStackTrace();
             res.put("status", "fail");
             res.put("message", "导入失败！");
         }

         return res.toString();
     }
     /*根据编号获得信息*/
    @RequestMapping("getByMrId")
    @ResponseBody
    public String getByMrId(String id){
        JSONObject res=new JSONObject();
        try {
            MaterialRequire materialRequire=materialRequireService.getByMrId(id);
            res.put("data",materialRequire);
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
    //审批物料
    @RequestMapping("backMa")
    @ResponseBody
    public String backMa(String id,String remarks){
        JSONObject res=new JSONObject();
        try {
            materialRequireService.back(id,remarks);
            res.put("status", "success");
            res.put("message", "驳回通过!");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "驳回失败!");
        }
        return res.toString();
    }
    //驳回物料
    @RequestMapping("approvalMa")
    @ResponseBody
    public String approvalMa(String id,String remarks){
        JSONObject res=new JSONObject();
        try {
            materialRequireService.approval(id,remarks);
            res.put("status", "success");
            res.put("message", "审批通过!");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审批失败!");
        }
        return res.toString();
    }
    //提交至审批
    @RequestMapping("submitByMrId")
    @ResponseBody
    public  String submitByMrId(String id){
        JSONObject res=new JSONObject();
        try {
            materialRequireService.submit(id);
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
    //作废
    @RequestMapping("cancelByMrId")
    @ResponseBody
    public  String cancelByMrId(String id){
        JSONObject res=new JSONObject();
        try {
            materialRequireService.cancel(id);
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
    //获取三位序列号
    public static String getString3(String id){
        while (id.length()!=3){
            System.out.println(id.length());
            id="0"+id;
        }
        return id;
    }
    //获取两位月数
    public  static  String getMouth(String mouth){
        if(mouth.length()!=2){
            mouth="0"+mouth;
        }
        return mouth;
    }
}
