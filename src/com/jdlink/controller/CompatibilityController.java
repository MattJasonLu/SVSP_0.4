package com.jdlink.controller;

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonObjectFormatVisitor;
import com.jdlink.domain.CheckState;
import com.jdlink.domain.FormType;
import com.jdlink.domain.Produce.Compatibility;
import com.jdlink.domain.Produce.CompatibilityItem;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Wastes;
import com.jdlink.service.CompatibilityService;
import com.jdlink.util.DBUtil;
import com.jdlink.util.DateUtil;
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

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.jdlink.domain.CheckState.ToExamine;

@Controller
public class CompatibilityController {
    @Autowired
    CompatibilityService compatibilityService;

//    @RequestMapping("getCurrentCompatibilityId")
//    @ResponseBody
//    public  String getCurrentCompatibilityId(){
//        //得到一个NumberFormat的实例
//        NumberFormat nf = NumberFormat.getInstance();
//        //设置是否使用分组
//        nf.setGroupingUsed(false);
//        //设置最大整数位数
//        nf.setMaximumIntegerDigits(4);
//        //设置最小整数位数
//        nf.setMinimumIntegerDigits(4);
//        // 获取最新编号
//        String id;
//        int index = compatibilityService.total();
//        // 获取唯一的编号
//        do {
//            index += 1;
//            id = nf.format(index);
//        } while (compatibilityService.getByCompatibilityId(id) != null);
//        JSONObject res = new JSONObject();
//        res.put("compatibilityId", id);
//        return res.toString();
//    }
@RequestMapping("importCompatibilityExcel")
@ResponseBody
public String importCompatibilityExcel(MultipartFile excelFile){
    JSONObject res = new JSONObject();
    String fileName = excelFile.getOriginalFilename();
    Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
    try{
        //        //配伍对象
        Calendar cal = Calendar.getInstance();
        //获取年
        String year=String.valueOf(cal.get(Calendar.YEAR));
        //获取月
        String mouth= getMouth(String.valueOf(cal.get(Calendar.MONTH)+1));
        //序列号
        String number = "001";
        //先查看数据库的配伍编号
        List<String> compatibilityIList= compatibilityService.check();
        if(compatibilityIList.size()==0){
            number="001";
        }
        if(compatibilityIList.size()>0) {
            String s= compatibilityIList.get(0);//原字符串
            String s2=s.substring(s.length()-3,s.length());//最后一个3字符
           number=getString3(String.valueOf( Integer.parseInt(s2)+1));
        }
        //配伍编号
       String compatibilityId=year+mouth+number;
        //创建配伍对象
        Compatibility compatibility=new Compatibility();

        compatibility.setCompatibilityId(compatibilityId);//设置配伍的主键

        //每日配比量合计

        float totalDailyAmount=0;

        //周需求合计

        float  weeklyDemandTotalAggregate=0;

        //热值总量

        float calorificSum=0;

        //灰分总量

        float  ashSum=0;

        //水分总量

        float  waterSum=0;

        //氯总量

        float   clSum=0;

        //硫总量

        float  sSum=0;

        //磷总量

        float pSum=0;

        //氟总量

        float fSum=0;

        //酸碱度总量

        float phSum=0;


        for(int i=1;i<data.length;i++){


            CompatibilityItem compatibilityItem=new CompatibilityItem();

            //配伍主表的序号绑定
            compatibilityItem.setCompatibility(compatibility);

            //第二列是处理类别

            if(data[i][1].toString()!="null"){
                    HandleCategory handleCategory =(HandleCategory.getHandleCategory(data[i][1].toString()));
                compatibilityItem.setHandleCategory(handleCategory);//射入
               }
            if(data[i][1]=="null"){
                compatibilityItem.setHandleCategory(null);//射入
            }

            //第三列是物质形态

                if(data[i][2].toString()!="null"){
                    FormType formType=FormType.getFormType(data[i][2].toString());
                    compatibilityItem.setFormType(formType);
                }
                if(data[i][2]=="null"){
                    compatibilityItem.setFormType(null);
                }

                //第五列是每日配置量
                if(data[i][4].toString()!="null"){
                    compatibilityItem.setDailyRatio(Float.parseFloat(data[i][4].toString()));
                    totalDailyAmount+=Float.parseFloat(data[i][4].toString());
                }
                if(data[i][4].toString()=="null")
                    compatibilityItem.setDailyRatio(0);

            //第六列是周需求总量
                if(data[i][5].toString()!="null"){
                    compatibilityItem.setWeeklyDemandTotal(Float.parseFloat(data[i][5].toString()));
                    weeklyDemandTotalAggregate+=Float.parseFloat(data[i][5].toString());
                }
                if(data[i][5].toString()=="null")
                    compatibilityItem.setWeeklyDemandTotal(0);

            //第七列是热值
            if(data[i][6].toString()!="null"){
                compatibilityItem.setCalorific(Float.parseFloat(data[i][6].toString()));
                calorificSum+=Float.parseFloat(data[i][6].toString());
                }
                if(data[i][6].toString()=="null")
                    compatibilityItem.setCalorific(0);

               //第八列是灰分
                if(data[i][7]!="null"){
                    compatibilityItem.setAsh(Float.parseFloat(data[i][7].toString()));
                    ashSum+=Float.parseFloat(data[i][7].toString());
                }
                if(data[i][7]=="null")
                    compatibilityItem.setAsh(0);

            //第九列是水分

            if(data[i][8]!="null"){
                compatibilityItem.setWater(Float.parseFloat(data[i][8].toString()));
                    waterSum+=Float.parseFloat(data[i][8].toString());
                }
                if(data[i][8]=="null")
                    compatibilityItem.setWater(0);

            //第十列是氯

            if(data[i][9].toString()!="null"){
                compatibilityItem.setCl(Float.parseFloat(data[i][9].toString()));
                clSum+=Float.parseFloat(data[i][9].toString());
                }
                if(data[i][9].toString()=="null")
                    compatibilityItem.setCl(0);

            //硫 11
                if(data[i][10].toString()!="null"){
                    compatibilityItem.setS(Float.parseFloat(data[i][10].toString()));
                    sSum+=Float.parseFloat(data[i][10].toString());
                }
                if(data[i][10].toString()=="null")
                    compatibilityItem.setS(0);

            //磷 12
                if(data[i][11].toString()!="null"){
                    compatibilityItem.setP(Float.parseFloat(data[i][11].toString()));
                   pSum+=Float.parseFloat(data[i][11].toString());
                }
                if(data[i][11].toString()=="null")
                    compatibilityItem.setP(0);

            //弗 13
                if(data[i][12].toString()!="null"){
                    compatibilityItem.setF(Float.parseFloat(data[i][12].toString()));
                      fSum+=Float.parseFloat(data[i][12].toString());
                }
                if(data[i][12].toString()=="null")
                    compatibilityItem.setF(0);

            //PH 14
                if(data[i][13].toString()!="null"){
                    compatibilityItem.setPh(Float.parseFloat(data[i][13].toString()));
                    phSum+=Float.parseFloat(data[i][13].toString());
                }
                if(data[i][13].toString()=="null")
                    compatibilityItem.setPh(0);
                compatibilityService.addCompatibilityItem(compatibilityItem);

        }
        //设置每日配比量合计
        compatibility.setTotalDailyAmount(totalDailyAmount);

        //设置周需求总量
        compatibility.setWeeklyDemandTotalAggregate(weeklyDemandTotalAggregate);

        //设置平均热值
        compatibility.setCalorificAvg(calorificSum/(data.length-1));

        //设置平均灰分
        compatibility.setAshAvg(ashSum/(data.length-1));

        //设置水分平均
        compatibility.setWaterAvg(waterSum/(data.length-1));

        //设置cl平均
        compatibility.setClAvg(clSum/(data.length-1));

        //设置硫平均
        compatibility.setsAvg(sSum/(data.length-1));

        //设置磷平均
        compatibility.setpAvg(pSum/(data.length-1));

        //设置氟平均
        compatibility.setfAvg(fSum/(data.length-1));

        //设置ph平均
        compatibility.setPhAvg(phSum/(data.length-1));
        //添加主表
        compatibilityService.addCompatibility(compatibility);
        res.put("status", "success");
        res.put("message", "导入配伍周计划成功!");

    }


    catch (Exception e){
        e.printStackTrace();
        res.put("status", "fail");
        res.put("message", "导入配伍周计划失败!");

    }



    return res.toString();

}
//    @RequestMapping("importCompatibilityExcel")
//    @ResponseBody
//    public String importCompatibilityExcel(MultipartFile excelFile, String tableName, String id){
//        JSONObject res = new JSONObject();
//        String fileName = excelFile.getOriginalFilename();
//        Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
//        for (int i = 0; i < data.length; i++){
//            for (int j = 0; j < data[i].length; j++)
//                System.out.print((data[i][j]).toString() + " ");
//            System.out.println();
//        }
//        //配伍对象
//        Calendar cal = Calendar.getInstance();
//        //获取年
//        String year=String.valueOf(cal.get(Calendar.YEAR));
//        //获取月
//        String mouth= getMouth(String.valueOf(cal.get(Calendar.MONTH)+1));
//        //序列号
//        String number = "001";
//        //先查看数据库的配伍编号
//        List<String> compatibilityIList= compatibilityService.check();
//        if(id.equals("0001")){//不存在
//            number="001";
//        }
//        if(!id.equals("0001")){
//            String s= compatibilityIList.get(0);//原字符串
//            String s2=s.substring(s.length()-3,s.length());//最后一个3字符
//            number=getString3(String.valueOf( Integer.parseInt(s2)+1));
//        }
//        //配伍编号
//        String compatibilityId=year+mouth+number;
//        //进行数据绑定
//        try {
//            for(int i=1;i<data.length;i++){
//                Wastes wastes=new Wastes();//危废信息
//                List<Wastes> wastesList=new ArrayList<>();
//                Compatibility compatibility=new Compatibility();
//                //序号绑定
//                String id1= getId(String.valueOf(Integer.parseInt(id)+(i-1))) ;
//                compatibility.setPwId(id1);
//                //第二列是一个枚举进行进行判断，首先是遍历第二列 处理方式
//                if(data[i][1].toString()!="null"){
//                    HandleCategory handleCategory =(HandleCategory.getHandleCategory(data[i][1].toString()));
//                    compatibility.setHandleCategory(handleCategory);//射入
//                }
//                if(data[i][1]=="null")
//                    compatibility.setHandleCategory(null);//射入
//                //第三列是一个枚举进行进行判断，首先是遍历第二列 物质形态
//                if(data[i][2].toString()!="null"){
//                    FormType formType=FormType.getFormType(data[i][2].toString());
//                    compatibility.setFormType(formType);
//                }
//                if(data[i][2]=="null"){
//                    compatibility.setFormType(null);
//                }
//                //第四列是比例
//                if(data[i][3].toString()!="null"){
//                    compatibility.setProportion(Float.parseFloat(data[i][3].toString()));
//                }
//                if(data[i][3]=="null"){
//                    compatibility.setProportion(0);
//                }
//
//
//                //第五列是每日配置量
//                if(data[i][4].toString()!="null"){
//                    compatibility.setDailyProportions(Float.parseFloat(data[i][4].toString()));
//                }
//                if(data[i][4].toString()=="null")
//                    compatibility.setDailyProportions(0);
//                //第六列是周需求总量
//                if(data[i][5].toString()!="null"){
//                    compatibility.setWeeklyDemand(Float.parseFloat(data[i][5].toString()));
//                }
//                if(data[i][5].toString()=="null")
//                    compatibility.setWeeklyDemand(0);
//                //第七列是热值
//                if(data[i][6].toString()!="null"){
//                    wastes.setCalorific(Float.parseFloat(data[i][6].toString()));
//                    //compatibility.setCalorific(Float.parseFloat(data[i][6].toString()));
//                }
//                if(data[i][6].toString()=="null")
//                    //compatibility.setCalorific(0);
//                    wastes.setCalorific(0);
//                //第八列是灰分
//                if(data[i][7]!="null"){
//                    //compatibility.setAsh(Float.parseFloat(data[i][7].toString()));
//                    wastes.setAshPercentage(Float.parseFloat(data[i][7].toString()));
//                }
//                if(data[i][7]=="null")
//                    wastes.setAshPercentage(0);
//                   // compatibility.setAsh(0);
//                //第九列是水分
//                if(data[i][8]!="null"){
//                    wastes.setWetPercentage(Float.parseFloat(data[i][8].toString()));
//                    //compatibility.setAsh(Float.parseFloat(data[i][8].toString()));
//                }
//                if(data[i][8]=="null")
//                    wastes.setWetPercentage(0);
//                    //compatibility.setAsh(0);
//                //第十列是氯
//                if(data[i][9].toString()!="null"){
//                    wastes.setChlorinePercentage(Float.parseFloat(data[i][9].toString()));
//                    //compatibility.setCL(Float.parseFloat(data[i][9].toString()));
//                }
//                if(data[i][9].toString()=="null")
//                    wastes.setChlorinePercentage(0);
//                    //compatibility.setCL(0);
//                //硫 11
//                if(data[i][10].toString()!="null"){
//                    wastes.setSulfurPercentage(Float.parseFloat(data[i][10].toString()));
//                    //compatibility.setS(Float.parseFloat(data[i][10].toString()));
//                }
//                if(data[i][10].toString()=="null")
//                    wastes.setSulfurPercentage(0);
//                    //compatibility.setS(0);
//                //磷 12
//                if(data[i][11].toString()!="null"){
//                    wastes.setPhosphorusPercentage(Float.parseFloat(data[i][11].toString()));
//                    //compatibility.setP(Float.parseFloat(data[i][11].toString()));
//                }
//                if(data[i][11].toString()=="null")
//                    wastes.setPhosphorusPercentage(0);
//                   // compatibility.setP(0);
//                //弗 13
//                if(data[i][12].toString()!="null"){
//                    wastes.setFluorinePercentage(Float.parseFloat(data[i][12].toString()));
//                    //compatibility.setF(Float.parseFloat(data[i][12].toString()));
//                }
//                if(data[i][12].toString()=="null")
//                    wastes.setFluorinePercentage(0);
//                   // compatibility.setF(0);
//                //PH 14
//                if(data[i][13].toString()!="null"){
//                    wastes.setPh(Float.parseFloat(data[i][13].toString()));
//                   //compatibility.setPH(Float.parseFloat(data[i][13].toString()));
//                }
//                if(data[i][13].toString()=="null")
//                    wastes.setPh(0);
//                    //compatibility.setPH(0);
//                //开始时间 15
//                if(fileName.endsWith("xlsx")){//2007
//                    if(data[i][14].toString()!="null"){
//                        compatibility.setBeginTime(DateUtil.getDateFromStr(data[i][14].toString()));
//                    }
//                    if(data[i][14].toString()=="null")
//                        compatibility.setBeginTime(null);
//                }
//                else if(fileName.endsWith("xls")){
//                    if(data[i][14].toString()!="null"){
//                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//                        Date beginTime= sdf.parse("20"+data[i][14].toString());
//                        compatibility.setBeginTime(beginTime);
//                    }
//                    if(data[i][14].toString()=="null")
//                        compatibility.setBeginTime(null);
//                }
//                //结束时间 16
//                if(fileName.endsWith("xlsx")){//2007
//                    if(data[i][15].toString()!="null"){
//                        compatibility.setEndTime(DateUtil.getDateFromStr(data[i][15].toString()));
//                    }
//                    if(data[i][15].toString()=="null")
//                        compatibility.setEndTime(null);
//                }
//                else if(fileName.endsWith("xls")){
//                    if(data[i][15].toString()!="null"){
//                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//                        Date endTime= sdf.parse("20"+data[i][15].toString());
//                        compatibility.setEndTime(endTime);
//                    }
//                    if(data[i][15].toString()=="null")
//                        compatibility.setEndTime(null);
//                }
//                //每日配比量合计 17
////                if(data[i][16].toString()!="null"){
////                    compatibility.setDailyProportionsTotal(Float.parseFloat(data[i][16].toString()));
////                }
////                if(data[i][16].toString()=="null")
////                    compatibility.setDailyProportionsTotal(0);
//                //周需求总和 18
////                if(data[i][17].toString()!="null"){
////                    compatibility.setWeeklyDemandTotal(Float.parseFloat(data[i][17].toString()));
////                }
////                if(data[i][17].toString()=="null")
////                    compatibility.setWeeklyDemandTotal(0);
//                //热量总和 19
////                if(data[i][18].toString()!="null"){
////                    compatibility.setCalorificTotal(Float.parseFloat(data[i][18].toString()));
////                }
////                if(data[i][18].toString()=="null")
////                    compatibility.setCalorificTotal(0);
//                //状态 20
////                if(data[i][19].toString()!="null"){
////                    compatibility.setCheckState(CheckState.getCheckState(data[i][19].toString()));
////                }
////                if(data[i][19].toString()=="null")
////                    compatibility.setCheckState(ToExamine);
//                //当前时间 21
//                //compatibility.setNowTime(DateUtil.getDateFromStr(data[i][20].toString()));
//                //配伍编号 22
//                compatibility.setCompatibilityId(compatibilityId);
//                wastes.setCompatibilityId(compatibilityId);
//                //审批内容 23
////                if(data[i][22].toString()!="null"){
////                    compatibility.setApprovalContent(data[i][22].toString());
////                }
////                if(data[i][22].toString()=="null")
////                    compatibility.setApprovalContent(null);
//                //驳回内容 24
////                if(data[i][23].toString()!="null"){
////                    compatibility.setBackContent(data[i][23].toString());
////                }
////                if(data[i][23].toString()=="null")
////                    compatibility.setBackContent(null);
//                //数据绑定完成
//                //进行数据添加
//                wastes.setId(RandomUtil.getRandomEightNumber());
//                wastesList.add(wastes);
//                compatibility.setWastesList(wastesList);
//                compatibilityService.add(compatibility);
//            }
//            res.put("status", "success");
//            res.put("message", "导入成功");
//        }
//        catch (Exception e){
//            e.printStackTrace();
//            res.put("status", "fail");
//            res.put("message", "导入失败！");
//        }
//
////        try {
////            DBUtil db=new DBUtil();
////            db.importExcel(excelFile, tableName,id);
////            System.out.println("起始编号:"+id);
////            int id1=compatibilityService.getLastId();
////            String id2= getId(String.valueOf(id1));
////            System.out.println("末尾编号:"+id2);
////            Calendar cal = Calendar.getInstance();
////           //获取年
////            String year=String.valueOf(cal.get(Calendar.YEAR));
////            //获取月
////            String mouth= getMouth(String.valueOf(cal.get(Calendar.MONTH)+1));
////            //序列号
////           String number = "001";
////           //先查看数据库的配伍编号
////           List<String> compatibilityIList= compatibilityService.check();
////           if(id.equals("0001")){//不存在
////            number="001";
////           }
////         if(!id.equals("0001")){
////               String s= compatibilityIList.get(0);//原字符串
////               String s2=s.substring(s.length()-3,s.length());//最后一个3字符
////               number=getString3(String.valueOf( Integer.parseInt(s2)+1));
////           }
////            //配伍编号
////            String compatibilityId=year+mouth+number;
////            compatibilityService.updateCompatibility(compatibilityId,id,id2);
////            res.put("status", "success");
////            res.put("message", "导入成功");
////        } catch (Exception e) {
////            e.printStackTrace();
////            res.put("status", "fail");
////            res.put("message", "导入失败，请重试！"+e.getMessage());
////        }
//        return res.toString();
//
//
//    }
    //加载数据
    @RequestMapping("getList1")
    @ResponseBody
    public String getList1(){
        JSONObject res=new JSONObject();
        try {
            //1首先查找最新一期的compatibilityId
            List<String> compatibilityIdList=compatibilityService.check1();
            JSONArray array = JSONArray.fromArray(compatibilityIdList.toArray(new String[compatibilityIdList.size()]));
            res.put("compatibilityIdList",array);
            //最新的一个配伍编号
            String compatibilityId=compatibilityIdList.get(0);
            res.put("theNewestId",compatibilityIdList.get(0));
            List<Compatibility> compatibilityList=compatibilityService.list(compatibilityId);
            JSONArray array1=JSONArray.fromArray(compatibilityList.toArray(new Compatibility[compatibilityList.size()]));
            res.put("compatibilityList",array1);
            res.put("length",compatibilityList.size());
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
   //审批配伍计划
    @RequestMapping("approvalPw")
    @ResponseBody
    public String approvalPw(String pwId,String opinion){
      JSONObject res=new JSONObject();
       try {
        compatibilityService.approval(pwId,opinion);
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
    //驳回配伍计划
    @RequestMapping("backPw")
    @ResponseBody
    public String backPw(String pwId,String backContent){
        JSONObject res=new JSONObject();
        try {
            compatibilityService.back(pwId,backContent);
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
    //作废配屋计划
    @RequestMapping("cancelPw")
    @ResponseBody
    public String cancelPw(String pwId){
        JSONObject res=new JSONObject();
        try {
            compatibilityService.cancel(pwId);
            res.put("status", "success");
            res.put("message", "作废成功!");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败!");
        }
        return res.toString();
    }
    //通过序号获得信息
    @RequestMapping("getByPwId2")
    @ResponseBody
    public String getByPwId2(String pwId){
        System.out.println(pwId);
        JSONObject res=new JSONObject();
    try {
        Compatibility compatibility=compatibilityService.getByPwId1(pwId);
        res.put("data",compatibility);
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
    //加载下拉框数据
    @RequestMapping("getSelectList")
    @ResponseBody
    public String getSelectList(){
        JSONObject res = new JSONObject();
        // 获取枚举
        //审核状态
        JSONArray checkStateList = JSONArray.fromArray(CheckState.values());
        res.put("checkStateList", checkStateList);
        //形态
        JSONArray formTypeList=JSONArray.fromArray(FormType.values());
        res.put("formTypeList", formTypeList);
        //处理类别
        JSONArray handleCategoryList=JSONArray.fromArray(HandleCategory.values());
        res.put("handleCategoryList", handleCategoryList);
        return res.toString();
    }
 //高级查询
//    @RequestMapping("searchPw")
//    @ResponseBody
//    public String searchPw(@RequestBody Compatibility compatibility){
//        System.out.println(compatibility.getKeyword()+"YH");
//        JSONObject res = new JSONObject();
//        try {
//            List<Compatibility> compatibilityList = compatibilityService.search(compatibility);
//            JSONArray data = JSONArray.fromArray(compatibilityList.toArray(new Compatibility[compatibilityList.size()]));
//            res.put("length",compatibilityList.size());
//            res.put("status", "success");
//            res.put("message", "查询成功");
//            res.put("data", data);
//        } catch (Exception e) {
//            e.printStackTrace();
//            res.put("status", "fail");
//            res.put("message", "查询失败");
//        }
//        return  res.toString();
//    }
    //获取最后一位四位编号
     public static String getId(String id){
        while (id.length()!=4){
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
    //获取三位序列号
    public static String getString3(String id){
        while (id.length()!=3){
            System.out.println(id.length());
            id="0"+id;
        }
        return id;
    }

}
