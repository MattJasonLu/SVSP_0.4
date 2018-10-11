package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Equipment;
import com.jdlink.domain.Produce.MedicalWastes;
import com.jdlink.service.MedicalWastesService;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
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
    public String loadMedicalWastesList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            List<MedicalWastes> medicalWastesList=medicalWastesService.loadMedicalWastesList(page);
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

    //获取总记录数
    @RequestMapping("totalMedicalWasteRecord")
    @ResponseBody
    public int totalMedicalWasteRecord(){
        try {
            return medicalWastesService.total();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 作废
     */
    @RequestMapping("cancelMedicalWastes")
    @ResponseBody
    public String cancelMedicalWastes(String id){
        JSONObject res=new JSONObject();
        try{
            medicalWastesService.cancelMedicalWastes(id);
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

    //导入医危废
    @RequestMapping("importMedicalWaste")
    @ResponseBody
    public String importMedicalWaste(MultipartFile excelFile){
        JSONObject res=new JSONObject();
        Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
        try{
            Calendar cal = Calendar.getInstance();
            //获取年
            String year = String.valueOf(cal.get(Calendar.YEAR));
            //获取月
            String mouth = getMouth(String.valueOf(cal.get(Calendar.MONTH) + 1));
            //序列号
            String number = "00001";
            for(int i=1;i<data.length;i++){
                MedicalWastes medicalWastes=new MedicalWastes();
                //寻找最新的编号
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

                 medicalWastes.setMedicalWastesId(medicalWastesId);

                 //登记部门
                medicalWastes.setDepartment(data[i][1].toString());

                //登记人
                medicalWastes.setDepartmentName(data[i][2].toString());

                //修改人
                medicalWastes.setAdjustName(data[i][3].toString());

                //修改时间

                SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
                Date date=simpleDateFormat.parse( data[i][4].toString().replace("/","-"));
                medicalWastes.setAdjustDate(date);

                //本日进厂危废
                medicalWastes.setThisMonthWastes(Float.parseFloat(data[i][5].toString()));

                //本日直接转外处置量
                medicalWastes.setDirectDisposal(Float.parseFloat(data[i][6].toString()));

                //本日蒸煮医废(过磅)
                medicalWastes.setCookingWastes(Float.parseFloat(data[i][7].toString()));

                //蒸煮后重量
                medicalWastes.setAfterCookingNumber(Float.parseFloat(data[i][8].toString()));

                //蒸煮后入库量
                medicalWastes.setAfterCookingInbound(Float.parseFloat(data[i][9].toString()));

                //本日蒸煮后外送量
                medicalWastes.setThisMonthSendCooking(Float.parseFloat(data[i][10].toString()));

                //误差量
                medicalWastes.setErrorNumber(Float.parseFloat(data[i][5].toString())-Float.parseFloat(data[i][6].toString())-Float.parseFloat(data[i][7].toString()));

                //水分含量
                medicalWastes.setWetNumber(Float.parseFloat(data[i][7].toString())-Float.parseFloat(data[i][8].toString()));


                //处置设备
                medicalWastes.setEquipment(Equipment.getEquipment((data[i][11].toString())));

                medicalWastesService.addMedicalWastes(medicalWastes);
                res.put("status", "success");
                res.put("message", "导入成功");
            }

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败");
        }


        return res.toString();

    }

}
