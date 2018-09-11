package com.jdlink.controller;

import com.jdlink.domain.Produce.MedicalWastes;
import com.jdlink.service.MedicalWastesService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Controller
public class MedicalWastesController {
    @Autowired
    MedicalWastesService medicalWastesService;
    @RequestMapping("getNewestMedicalWastesId")
    @ResponseBody
    public  String getNewestMedicalWastesId(){
        JSONObject res=new JSONObject();
        Calendar cal = Calendar.getInstance();
        //获取年
        String year = String.valueOf(cal.get(Calendar.YEAR));
        //获取月
        String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
        //序列号
        String number = "00001";
        try {
            //1寻找最新的编号
            List<String> medicalWastesIdList=medicalWastesService.getNewId();
            if(medicalWastesIdList.size()==0){
                number = "00001";
            }
            if (medicalWastesIdList.size()>0){
                String s = medicalWastesIdList.get(0);//原字符串
                String s2 = s.substring(s.length() - 3, s.length());//最后一个3字符
                number = getString3(String.valueOf(Integer.parseInt(s2) + 1));
            }
            String medicalWastesId=year+mouth+number;
            res.put("medicalWastesId", medicalWastesId);
            res.put("status", "success");
            res.put("message", "最新编号获取成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return  res.toString();
    }

    /**
     * 添加医危废信息
     * @param
     * @return
     */
    @RequestMapping("addMedicalWastes")
    @ResponseBody
    public String addMedicalWastes(@RequestBody MedicalWastes medicalWastes){
        JSONObject res=new JSONObject();
        try{
            medicalWastesService.addMedicalWastes(medicalWastes);
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

    /**
     * 获得医危废列表
     * @param
     * @return
     */
    @RequestMapping("loadMedicalWastesList")
    @ResponseBody
    public String loadMedicalWastesList(){
        JSONObject res=new JSONObject();
        try {
            List<MedicalWastes> medicalWastesList=medicalWastesService.loadMedicalWastesList();
            res.put("medicalWastesList", medicalWastesList);
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
     * 高级查询
     * @param
     * @return
     */
    @RequestMapping("searchMedicalWastes")
    @ResponseBody
    public  String searchMedicalWastes(@RequestBody MedicalWastes medicalWastes){
        JSONObject res=new JSONObject();
        try{
        List<MedicalWastes> medicalWastesList=medicalWastesService.searchMedicalWastes(medicalWastes);
            res.put("medicalWastesList",medicalWastesList);
            res.put("status", "success");
            res.put("message", "高级查询成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "高级查询失败");
        }
        return  res.toString();
    }
    //获取5位序列号
    public static String getString3(String id){
        while (id.length()!=5){
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

    /**
     * 通过日期获取
     * @param startDate
     * @param endDate
     * @return
     */
    @RequestMapping("getMedicalWastesByRange")
    @ResponseBody
    public String getMedicalWastesByRange(Date startDate, Date endDate){
        JSONObject res=new JSONObject();
        try{
            List<MedicalWastes> medicalWastesList=medicalWastesService.getMedicalWastesByRange(startDate, endDate);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", medicalWastesList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return  res.toString();

    }
    /**
     * 通过日期和设备
     */
    @RequestMapping("getMedicalWastesByDateAndEquipment")
    @ResponseBody
    public String getMedicalWastesByDateAndEquipment(Date startDate, Date endDate,String equipment){
        JSONObject res=new JSONObject();
        try{
            List<MedicalWastes> medicalWastesList=medicalWastesService.getMedicalWastesByDateAndEquipment(startDate, endDate,equipment);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", medicalWastesList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return  res.toString();
    }
}
