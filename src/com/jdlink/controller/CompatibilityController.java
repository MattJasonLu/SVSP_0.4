package com.jdlink.controller;

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonObjectFormatVisitor;
import com.jdlink.domain.CheckState;
import com.jdlink.domain.FormType;
import com.jdlink.domain.Produce.Compatibility;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.service.CompatibilityService;
import com.jdlink.util.DBUtil;
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
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Controller
public class CompatibilityController {
    @Autowired
    CompatibilityService compatibilityService;
    @RequestMapping("getCurrentCompatibilityId")
    @ResponseBody
    public  String getCurrentCompatibilityId(){
        //得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(4);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(4);
        // 获取最新编号
        String id;
        int index = compatibilityService.total();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (compatibilityService.getByCompatibilityId(id) != null);
        JSONObject res = new JSONObject();
        res.put("compatibilityId", id);
        return res.toString();
    }

    @RequestMapping("importCompatibilityExcel")
    @ResponseBody
    public String importCompatibilityExcel(MultipartFile excelFile, String tableName, String id){
        JSONObject res = new JSONObject();
        try {
            DBUtil db=new DBUtil();
            db.importExcel(excelFile, tableName,id);
            System.out.println("起始编号:"+id);
            int id1=compatibilityService.getLastId();
            String id2= getId(String.valueOf(id1));
            System.out.println("末尾编号:"+id2);
            Calendar cal = Calendar.getInstance();
           //获取年
            String year=String.valueOf(cal.get(Calendar.YEAR));
            //获取月
            String mouth= getMouth(String.valueOf(cal.get(Calendar.MONTH)+1));
            //序列号
           String number = "001";
           //先查看数据库的配伍编号
           List<String> compatibilityIList= compatibilityService.check();
           if(id.equals("0001")){//不存在
            number="001";
           }
         if(!id.equals("0001")){
               String s= compatibilityIList.get(0);//原字符串
               String s2=s.substring(s.length()-3,s.length());//最后一个3字符
               number=getString3(String.valueOf( Integer.parseInt(s2)+1));
           }
            //配伍编号
            String compatibilityId=year+mouth+number;
            compatibilityService.updateCompatibility(compatibilityId,id,id2);
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！"+e.getMessage());
        }
        return res.toString();


    }
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
