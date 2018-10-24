package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.*;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
//    @RequestMapping("generateSheet")
////    @ResponseBody
//////    public  String generateSheet() {
//////        JSONObject res = new JSONObject();
//////        //1首先获得最新的物料编号 即页面显示的配伍单号
//////        List<String> compatibilityIdList = compatibilityService.check1();
//////        //最新的一个配伍编号
//////        String compatibilityId = compatibilityIdList.get(0);
//////        //根据最新的配伍编号查找配伍计划表
//////        List<Compatibility> compatibilityList = compatibilityService.list(compatibilityId);
//////        //2获得基础数据阈值表的数据
//////        List<Threshold> thresholdList = thresholdService.list();
//////        Calendar cal = Calendar.getInstance();
//////        //获取年
//////        String year = String.valueOf(cal.get(Calendar.YEAR));
//////        //获取月
//////        String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
//////        //序列号
//////        String number = "001";
//////        //物料编号设置
//////        List<String> materialRequireList = materialRequireService.check();
//////        int total1 = materialRequireService.total();
//////        if (total1 == 0) {
//////            number = "001";
//////        }
//////        if (total1 != 0) {
//////            String s = materialRequireList.get(0);//原字符串
//////            String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
//////            number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
//////        }
//////        String materialRequireId = year + mouth + number;
//////        //3获得之后在后台进行拼接
//////        // 参数列表
//////try{
//////        for (int i = 0; i < compatibilityList.size(); i++) {
//////            MaterialRequire materialRequire = new MaterialRequire();
//////            List<Wastes> wastesList = new ArrayList<>();
//////            List<MixingElement> parameterList = new ArrayList<>();
//////            Wastes wastes = new Wastes();//危废信息
//////            materialRequire.setMaterialRequireId(materialRequireId);//设置物料编号
//////            //1查找最大序号，如果为空就为"1"
//////            int total = materialRequireService.total();
//////            //设置序号
//////            if (total == 0) {
//////                materialRequire.setId("1");
//////            } else {
//////                materialRequire.setId(String.valueOf(total + 1));
//////            }
//////            wastes.setId(RandomUtil.getRandomEightNumber());
//////            //对包装方式进行判断
//////            //污泥+半固态==>标准箱
//////            if (compatibilityList.get(i).getHandleCategory().toString() == "Sludge" && compatibilityList.get(i).getFormType().toString() == "HalfSolid") {
//////                wastes.setPackageType(Box);
//////            }
//////            //废液+液态==>吨箱
//////            else if (compatibilityList.get(i).getHandleCategory().toString() == "WasteLiquid" && compatibilityList.get(i).getFormType().toString() == "Liquid") {
//////                wastes.setPackageType(Ton);
//////            }
//////            //散装料+固态==>吨袋
//////            else if (compatibilityList.get(i).getHandleCategory().toString() == "Bulk" && compatibilityList.get(i).getFormType().toString() == "Solid") {
//////                wastes.setPackageType(Bag);
//////            }
//////            //破碎料+固态==>标准箱
//////            else if (compatibilityList.get(i).getHandleCategory().toString() == "Crushing" && compatibilityList.get(i).getFormType().toString() == "Solid") {
//////                wastes.setPackageType(Box);
//////            }
//////            //精馏残渣
//////            else if (compatibilityList.get(i).getHandleCategory().toString() == "Distillation") {
//////                //固态/半固态==>铁桶
//////                if (compatibilityList.get(i).getFormType().toString() == "Solid" || compatibilityList.get(i).getFormType().toString() == "HalfSolid") {
//////                    wastes.setPackageType(Iron);
//////                }
//////                //液态==>吨箱
//////                if (compatibilityList.get(i).getFormType().toString() == "Liquid") {
//////                    wastes.setPackageType(Ton);
//////                }
//////            }
//////            //悬挂连==>小袋
//////            else if (compatibilityList.get(i).getHandleCategory().toString() == "Suspension") {
//////                wastes.setPackageType(Pouch);
//////            } else {
//////                wastes.setPackageType(Ton);
//////            }
//////            wastes.setWastesId(RandomUtil.getRandomEightNumber());//设置危废编号
//////            //设置周安全计划量
//////                materialRequire.setWeeklyDemand(compatibilityList.get(i).getWeeklyDemand());
//////            //设置安全库存量
//////            materialRequire.setSafety(thresholdService.getSafety(compatibilityList.get(i).getHandleCategory().toString()));
//////            //最值摄入
//////            //1获得当前配屋计划的热值
//////            Threshold threshold = thresholdService.getByHandleCategory(compatibilityList.get(i).getHandleCategory().toString());
//////            //获得基础数据阈值表对应进料方式的最大最小值
//////            //热值
//////            MixingElement parameter = new MixingElement();
//////            float calorific = compatibilityList.get(i).getWastesList().get(i).getCalorific();
//////            float calorificMax = calorific + threshold.getCalorificMax();
//////            float calorificMin = calorific - threshold.getCalorificMin();
//////            parameter.setParameter(Parameter.values()[3]);//设置热值
//////            parameter.setMinimum(calorificMin);
//////            parameter.setMaximum(calorificMax);
//////            parameter.setId(RandomUtil.getRandomEightNumber());
//////            parameterList.add(parameter);
//////            //灰分
//////            MixingElement parameter1 = new MixingElement();
//////            float ash = compatibilityList.get(i).getWastesList().get(i).getAshPercentage();
//////            float ashMax = ash + threshold.getAshMax();
//////            float ashMin = ash - threshold.getAshMin();
//////            parameter1.setParameter(Parameter.values()[4]);//设置灰分
//////            parameter1.setMinimum(ashMin);
//////            parameter1.setMaximum(ashMax);
//////            parameter1.setId(RandomUtil.getRandomEightNumber());
//////            parameterList.add(parameter1);
//////            //水分
//////            MixingElement parameter2 = new MixingElement();
//////            float water = compatibilityList.get(i).getWastesList().get(i).getWetPercentage();
//////            float waterMax = water + threshold.getWaterMax();
//////            float waterMin = water - threshold.getWaterMin();
//////            parameter2.setParameter(Parameter.values()[8]);
//////            parameter2.setMinimum(waterMin);
//////            parameter2.setMaximum(waterMax);
//////            parameter2.setId(RandomUtil.getRandomEightNumber());
//////            parameterList.add(parameter2);
//////            //硫
//////            MixingElement parameter3 = new MixingElement();
//////            float s = compatibilityList.get(i).getWastesList().get(i).getSulfurPercentage();
//////            float sMax = s + threshold.getsMax();
//////            float sMin = s - threshold.getsMin();
//////            parameter3.setParameter(Parameter.values()[10]);//设置硫
//////            parameter3.setMinimum(sMin);
//////            parameter3.setMaximum(sMax);
//////            parameter3.setId(RandomUtil.getRandomEightNumber());
//////            parameterList.add(parameter3);
//////            //氯
//////            MixingElement parameter4 = new MixingElement();
//////            float cl = compatibilityList.get(i).getWastesList().get(i).getChlorinePercentage();//要改成这样子！！
//////            System.out.println(cl + "NNN");
//////            float clMax = cl + threshold.getClMax();
//////            float clMin = cl - threshold.getClMin();
//////            parameter4.setParameter(Parameter.values()[11]);
//////            parameter4.setMinimum(clMin);
//////            parameter4.setMaximum(clMax);
//////            parameter4.setId(RandomUtil.getRandomEightNumber());
//////            parameterList.add(parameter4);
//////            //磷
//////            MixingElement parameter5 = new MixingElement();
//////            float p = compatibilityList.get(i).getWastesList().get(i).getPhosphorusPercentage();
//////            float pMax = p + threshold.getpMax();
//////            float pMin = p - threshold.getpMin();
//////            parameter5.setParameter(Parameter.values()[13]);//设置磷
//////            parameter5.setMinimum(pMin);
//////            parameter5.setMaximum(pMax);
//////            parameter5.setId(RandomUtil.getRandomEightNumber());
//////            parameterList.add(parameter5);
//////            //氟
//////            MixingElement parameter6 = new MixingElement();
//////            float f = compatibilityList.get(i).getWastesList().get(i).getFluorinePercentage();
//////            System.out.println(f+"111");
//////            float fMax = f + threshold.getfMax();
//////            float fMin = f - threshold.getfMin();
//////            System.out.println(fMax+"====>"+fMin);
//////            parameter6.setParameter(Parameter.values()[12]);//设置磷
//////            parameter6.setMinimum(fMin);
//////            parameter6.setMaximum(fMax);
//////            parameter6.setId(RandomUtil.getRandomEightNumber());
//////            parameterList.add(parameter6);
//////            //PH
//////            MixingElement parameter7 = new MixingElement();
//////            float ph = compatibilityList.get(i).getWastesList().get(i).getPh();
//////            float phMax = ph + threshold.getPhMax();
//////            float phMin = ph - threshold.getPhMin();
//////            parameter7.setParameter(Parameter.values()[2]);//设置磷
//////            parameter7.setMinimum(phMin);
//////            parameter7.setMaximum(phMax);
//////            parameter7.setId(RandomUtil.getRandomEightNumber());
//////            parameterList.add(parameter7);
//////            wastes.setParameterList(parameterList);
//////            wastesList.add(wastes);
//////            materialRequire.setWastesList(wastesList);
//////            materialRequire.setThreshold(threshold);
//////            materialRequire.setCompatibility(compatibilityList.get(i));
//////            //设置包装类别
//////            materialRequire.setPackageType(wastes.getPackageType());
//////            //设置进料方式
//////            materialRequire.setHandleCategory(compatibilityList.get(i).getHandleCategory());
//////            //设置物质形态
//////            materialRequire.setFormType(compatibilityList.get(i).getFormType());
//////            materialRequireService.addMix(materialRequire);
//////        }
//////    res.put("status", "success");
//////    res.put("message", "添加成功");
//////
//////}
//////     catch (Exception e){
//////            e.printStackTrace();
//////            res.put("status", "fail");
//////            res.put("message", "更添加失败");
//////        }
//////
//////
//////        //4保存在数据库
//////        return res.toString();
//////    }
    @RequestMapping("getMaterialList")
    @ResponseBody
     public String getMaterialList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
         List<MaterialRequire> materialRequireList=materialRequireService.getMaterialList(page);
            res.put("array", materialRequireList);
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
     * 计算物料条数
     * @param
     * @return
     */
    @RequestMapping("totalMaterRecord")
    @ResponseBody
    public int totalMaterRecord(){
        try {
            return materialRequireService.total();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }




    /*导入功能*/
     @RequestMapping("importMaterialRequireIdExcel")
     @ResponseBody
     public String  importMaterialRequireIdExcel(MultipartFile excelFile) {
         JSONObject res = new JSONObject();
         String fileName = excelFile.getOriginalFilename();
         List<Object[][]> data = ImportUtil.getInstance().getExcelFileData(excelFile);

         try {
             for(int i=0;i<data.size();i++) {  //页数遍历
                 Calendar cal = Calendar.getInstance();
                 //获取年
                 String year = String.valueOf(cal.get(Calendar.YEAR));
                 //获取月
                 String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
                 //序列号
                 String number = "001";

                 List<String> materialRequireIdList = compatibilityService.getNewestMaterialRequireId();

                 if (materialRequireIdList.size() == 0) {
                     number = "001";
                 } else {
                     String s = materialRequireIdList.get(0);//原字符串
                     String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
                     number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
                 }

                 String materialRequireId = year + mouth + number;//需要的物料编号

                 //主表对象
                 MaterialRequire materialRequire = new MaterialRequire();

                 materialRequire.setMaterialRequireId(materialRequireId);
                 float weeklyDemandTotal = 0;

                 float currentInventoryTotal = 0;

                 float safetyTotal = 0;

                 float marketPurchasesTotal = 0;

                 //热值总量
                 float calorificMaxSum = 0;
                 float calorificMinSum = 0;

                 float ashMaxSum = 0;
                 float ashMinSum = 0;

                 float waterMaxSum = 0;
                 float waterMinSum = 0;

                 float clMaxSum = 0;
                 float clMinSum = 0;

                 float sMaxSum = 0;
                 float sMinSum = 0;

                 float pMaxSum = 0;
                 float pMinSum = 0;

                 float fMaxSum = 0;
                 float fMinSum = 0;

                 float phMaxSum = 0;
                 float phMinSum = 0;
                 int index = 0;

                 for(int j=2;j<data.get(i).length;j++){

                     if(data.get(i)[j][0].toString()!="null") {
                         index++;
                         MaterialRequireItem materialRequireItem = new MaterialRequireItem();

                         materialRequireItem.setMaterialRequireId(materialRequireId);

                         //进料方式
                         materialRequireItem.setHandleCategory(HandleCategory.getHandleCategory(data.get(i)[j][1].toString()));

                         //包装形式
                         materialRequireItem.setPackageType(PackageType.getPackageType(data.get(i)[j][2].toString()));

                         //形态
                         materialRequireItem.setFormType(FormType.getFormType(data.get(i)[j][3].toString()));

                         //周生产计划量
                         if (data.get(i)[j][4].toString() != "null") {
                             materialRequireItem.setWeeklyDemand(Float.parseFloat(data.get(i)[j][4].toString()));
                             weeklyDemandTotal += Float.parseFloat(data.get(i)[j][4].toString());
                         }
                         if (data.get(i)[j][4].toString() == "null") {
                             materialRequireItem.setWeeklyDemand(0);
                         }


                         //目前库存量
                         if (data.get(i)[j][5].toString() != "null") {
                             materialRequireItem.setCurrentInventory(Float.parseFloat(data.get(i)[j][5].toString()));
                             currentInventoryTotal += Float.parseFloat(data.get(i)[j][5].toString());
                         }
                         if (data.get(i)[j][5].toString() == "null") {
                             materialRequireItem.setCurrentInventory(0);
                         }

                         //安全库存量
                         if (data.get(i)[j][6].toString() != "null") {
                             materialRequireItem.setSafety(Float.parseFloat(data.get(i)[j][6].toString()));
                             safetyTotal += Float.parseFloat(data.get(i)[j][6].toString());
                         }
                         if (data.get(i)[j][6].toString() == "null") {
                             materialRequireItem.setSafety(0);
                         }
                         //市场采购量
                         if (data.get(i)[j][7].toString() != "null") {
                             materialRequireItem.setMarketPurchases(Float.parseFloat(data.get(i)[j][7].toString()));
                             marketPurchasesTotal += Float.parseFloat(data.get(i)[j][7].toString());
                         }
                         if (data.get(i)[j][7].toString() == "null") {
                             materialRequireItem.setMarketPurchases(0);
                         }

                         //热值max
                         materialRequireItem.setCalorificMax(Float.parseFloat(data.get(i)[j][8].toString()));
                         calorificMaxSum += Float.parseFloat(data.get(i)[j][8].toString());

                         //热值Min
                         materialRequireItem.setCalorificMin(Float.parseFloat(data.get(i)[j][9].toString()));
                         calorificMinSum += Float.parseFloat(data.get(i)[j][9].toString());

                         //灰分Max
                         materialRequireItem.setAshMax(Float.parseFloat(data.get(i)[j][10].toString()));
                         ashMaxSum += Float.parseFloat(data.get(i)[j][10].toString());

                         //灰分Min
                         materialRequireItem.setAshMin(Float.parseFloat(data.get(i)[j][11].toString()));
                         ashMinSum += Float.parseFloat(data.get(i)[j][11].toString());

                         //水分Max
                         materialRequireItem.setWaterMax(Float.parseFloat(data.get(i)[j][12].toString()));
                         waterMaxSum += Float.parseFloat(data.get(i)[j][12].toString());

                         //水分Min
                         materialRequireItem.setWaterMin(Float.parseFloat(data.get(i)[j][13].toString()));
                         waterMinSum += Float.parseFloat(data.get(i)[j][13].toString());

                         //硫Max
                         materialRequireItem.setsMax(Float.parseFloat(data.get(i)[j][14].toString()));
                         sMaxSum += Float.parseFloat(data.get(i)[j][14].toString());

                         //硫Min
                         materialRequireItem.setsMin(Float.parseFloat(data.get(i)[j][15].toString()));
                         sMinSum += Float.parseFloat(data.get(i)[j][15].toString());

                         //CLMax
                         materialRequireItem.setClMax(Float.parseFloat(data.get(i)[j][16].toString()));
                         clMaxSum += Float.parseFloat(data.get(i)[j][16].toString());

                         //CLMin
                         materialRequireItem.setClMin(Float.parseFloat(data.get(i)[j][17].toString()));
                         clMinSum += Float.parseFloat(data.get(i)[j][17].toString());

                         //PMax
                         materialRequireItem.setpMax(Float.parseFloat(data.get(i)[j][18].toString()));
                         pMaxSum += Float.parseFloat(data.get(i)[j][18].toString());

                         //PMin
                         materialRequireItem.setpMin(Float.parseFloat(data.get(i)[j][19].toString()));
                         pMinSum += Float.parseFloat(data.get(i)[j][19].toString());

                         //FMax
                         materialRequireItem.setfMax(Float.parseFloat(data.get(i)[j][20].toString()));
                         fMaxSum += Float.parseFloat(data.get(i)[j][20].toString());

                         //FMin
                         materialRequireItem.setfMin(Float.parseFloat(data.get(i)[j][21].toString()));
                         fMinSum += Float.parseFloat(data.get(i)[j][21].toString());

                         //PHMax
                         materialRequireItem.setPhMax(Float.parseFloat(data.get(i)[j][22].toString()));
                         phMaxSum += Float.parseFloat(data.get(i)[j][22].toString());

                         //PHMin
                         materialRequireItem.setPhMin(Float.parseFloat(data.get(i)[j][23].toString()));
                         phMinSum += Float.parseFloat(data.get(i)[j][23].toString());

                         compatibilityService.addMaterialRequireItem(materialRequireItem);

                     }


                     }
                 materialRequire.setWeeklyDemandTotal(weeklyDemandTotal);

                 materialRequire.setCurrentInventoryTotal(currentInventoryTotal);

                 materialRequire.setSafetyTotal(safetyTotal);

                 materialRequire.setMarketPurchasesTotal(marketPurchasesTotal);

                 materialRequire.setCalorificAvg((calorificMaxSum + calorificMinSum) / 2);

                 materialRequire.setAshAvg((ashMaxSum + ashMinSum) / 2);

                 materialRequire.setWaterAvg((waterMaxSum + waterMinSum) / 2);

                 materialRequire.setClAvg((clMaxSum + clMinSum) / 2);

                 materialRequire.setsAvg((sMaxSum + sMinSum) / 2);

                 materialRequire.setpAvg((pMaxSum + pMinSum) / 2);

                 materialRequire.setfAvg((fMaxSum + fMinSum) / 2);

                 materialRequire.setPhAvg((phMaxSum + phMinSum) / 2);

                 compatibilityService.addMaterialRequire(materialRequire);
             }
             res.put("status", "success");
             res.put("message", "物料需求导入成功");
     }

    catch (Exception e){
        e.printStackTrace();
        res.put("status", "fail");
        res.put("message", "物料需求导入失败");
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
    //驳回物料
    @RequestMapping("backMa")
    @ResponseBody
    public String backMa(String materialRequireId,String opinion){
        JSONObject res=new JSONObject();
        try {
            materialRequireService.back(materialRequireId,opinion);
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
    //审批
    @RequestMapping("approvalMa")
    @ResponseBody
    public String approvalMa(String materialRequireId,String opinion){
        JSONObject res=new JSONObject();
        try {
            materialRequireService.approval(materialRequireId,opinion);
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
    public  String submitByMrId(String materialRequireId){
        JSONObject res=new JSONObject();
        try {
            materialRequireService.submit(materialRequireId);
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
    public  String cancelByMrId(String materialRequireId){
        JSONObject res=new JSONObject();
        try {
            materialRequireService.cancel(materialRequireId);
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
    @RequestMapping("getForm")
    @ResponseBody
    public String getForm(HttpServletRequest request, HttpServletResponse response){
        JSONObject res=new JSONObject();
        res.put("status", "success");
        res.put("message", "更新成功");
       String data=request.getParameter("data");
        System.out.println(data+"123213");
        return res.toString();
    }
//更新
    @RequestMapping("updatemarketPurchases")
    @ResponseBody
    public  String updatemarketPurchases(String id,String marketPurchases){
     JSONObject res=new JSONObject();
     try{
         materialRequireService.updatemarketPurchases(id,Float.parseFloat(marketPurchases));
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

    //图标点击查看物料明细
    @RequestMapping("getMaterialRequireById")
    @ResponseBody
    public String getMaterialRequireById(String materialRequireId){
        JSONObject res=new JSONObject();
        try{
            List<MaterialRequireItem> materialRequireItemList=materialRequireService.getMaterialRequireById(materialRequireId);
            res.put("status", "success");
            res.put("message", "获取明细成功");
            res.put("materialRequireItemList", materialRequireItemList);
                     }

                     catch (Exception e){
                         e.printStackTrace();
                         res.put("status", "fail");
                         res.put("message", "获取明细失败");
                     }


        return  res.toString();


    }

    //根据编号查看物料主表信息
    @RequestMapping("getMaterialRequireByMaterialRequireId")
    @ResponseBody
    public String getMaterialRequireByMaterialRequireId(String materialRequireId){
        JSONObject res=new JSONObject();

        try{
            MaterialRequire materialRequire=materialRequireService.getMaterialRequireByMaterialRequireId(materialRequireId);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", materialRequire);

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }



   //物料需求明细修改
    @RequestMapping("updateMaterialRequireItem")
    @ResponseBody
    public String updateMaterialRequireItem(@RequestBody MaterialRequireItem materialRequireItem){
        JSONObject res=new JSONObject();
        try{
          materialRequireService.updateMaterialRequireItem(materialRequireItem);
            res.put("status", "success");
            res.put("message", "明细更新成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "明细更新失败");

        }
        return  res.toString();
    }

    //物料需求主表更新
    @RequestMapping("updateMaterialRequire")
    @ResponseBody
    public String updateMaterialRequire(@RequestBody MaterialRequire materialRequire){
        JSONObject res=new JSONObject();
            try{
                materialRequireService.updateMaterialRequire(materialRequire);
                res.put("status", "success");
                res.put("message", "主表更新成功");
            }
            catch (Exception e){
                e.printStackTrace();
                res.put("status", "fail");
                res.put("message", "主表更新失败");

            }


        return  res.toString();

    }

    //粗查询
    @RequestMapping("searchMaterialRequire")
    @ResponseBody
    public String searchMaterialRequire(@RequestBody MaterialRequire materialRequire){
        JSONObject res=new JSONObject();
        try {
            List<MaterialRequire> materialRequireList=materialRequireService.searchMaterialRequire(materialRequire);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("array", materialRequireList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }


        return res.toString();
    }

    //粗查询总数
    @RequestMapping("searchMaterialRequireCount")
    @ResponseBody
    public int searchMaterialRequireCount(@RequestBody MaterialRequire materialRequire){
        try {
            return materialRequireService.searchMaterialRequireCount(materialRequire);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }


    //高级查询
    @RequestMapping("searchMaterialRequireItem")
    @ResponseBody
    public String searchMaterialRequireItem(@RequestBody MaterialRequireItem materialRequireItem){
        JSONObject res=new JSONObject();
        List<MaterialRequire> materialRequireList=new ArrayList<>();
        try{
            List<String> materialRequireItemIdList=materialRequireService.searchMaterialRequireItem(materialRequireItem);
            for(int i=0;i<materialRequireItemIdList.size();i++ ){
                materialRequireList.add(materialRequireService.getMaterialRequireByMaterialRequireId(materialRequireItemIdList.get(i)));
            }
           res.put("array",materialRequireList);
            res.put("status", "success");
            res.put("message", "高级查询成功");


        }

        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "高级查询失败");
        }


        return res.toString();

    }

    //高级查询总数
    @RequestMapping("searchMaterialRequireItemCount")
    @ResponseBody
    public int searchMaterialRequireItemCount(@RequestBody MaterialRequireItem materialRequireItem){
        try {
            return materialRequireService.searchMaterialRequireItemCount(materialRequireItem);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取最新的物料信息
     * @param
     * @return
     */

    @RequestMapping("getNewMaterialRequire")
    @ResponseBody
    public String getNewMaterialRequire(){
        JSONObject res=new JSONObject();

        try {
            List<String> materialRequireIdList = compatibilityService.getNewestMaterialRequireId();
          MaterialRequire materialRequire=  materialRequireService.getMaterialRequireByMaterialRequireId(materialRequireIdList.get(0));
            res.put("status", "success");
            res.put("message", "获取最新的物料信息成功");
            res.put("materialRequire", materialRequire);
        }

        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取最新的物料信息失败");
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
