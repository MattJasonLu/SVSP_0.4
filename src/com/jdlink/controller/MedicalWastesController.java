package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Equipment;
import com.jdlink.domain.Produce.MedicalWastes;
import com.jdlink.service.MedicalWastesService;
import com.jdlink.util.DBUtil;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.jdlink.util.NumberToDate.double2Date;

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

                 //日期
                if(data[i][0]!="null"){
          String datestr=data[i][0].toString().replace("年","-").replace("月","-").replace("日","");
          SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
                  medicalWastes.setDateTime(simpleDateFormat.parse(datestr));
                }
                if(data[i][0]=="null"){
                    medicalWastes.setDateTime(null);
                }

                //本日进厂危废
                if(data[i][1]!="null"){
                    medicalWastes.setThisMonthWastes(Float.parseFloat(data[i][1].toString()));
                }
                if(data[i][1]=="null"){
                    medicalWastes.setThisMonthWastes(0);
                }


                //本日直接转外处置量
                if(data[i][2]!="null"){
                    medicalWastes.setDirectDisposal(Float.parseFloat(data[i][2].toString()));
                }
                if(data[i][2]=="null"){
                    medicalWastes.setDirectDisposal(0);
                }

                //本日蒸煮医废(过磅)
                if(data[i][3]!="null"){
                    medicalWastes.setCookingWastes(Float.parseFloat(data[i][3].toString()));
                }
                if(data[i][3]=="null"){
                    medicalWastes.setCookingWastes(0);
                }

                //蒸煮后重量
                if(data[i][4]!="null"){
                    medicalWastes.setAfterCookingNumber(Float.parseFloat(data[i][4].toString()));
                }
                if(data[i][4]=="null"){
                    medicalWastes.setAfterCookingNumber(0);
                }


                //蒸煮后入库量
                if(data[i][5]!="null"){
                    medicalWastes.setAfterCookingInbound(Float.parseFloat(data[i][5].toString()));
                }

                if(data[i][5]=="null"){
                    medicalWastes.setAfterCookingInbound(0);
                }

                //本月蒸煮后外送量
                if(data[i][6]!="null"){
                    medicalWastes.setThisMonthSendCooking(Float.parseFloat(data[i][6].toString()));
                }
                if(data[i][6]=="null"){
                    medicalWastes.setThisMonthSendCooking(0);
                }

                //焚烧量
                if(data[i][7]!="null"){
                    medicalWastes.setIncineration(Float.parseFloat(data[i][7].toString()));
                }
                if(data[i][7]=="null"){
                    medicalWastes.setIncineration(0);
                }

                if(data[i][8]!="null"){
                    //接运单与称重差KG(误差)
                    medicalWastes.setErrorNumber(Float.parseFloat(data[i][8].toString()));
                }
                if(data[i][8]=="null"){
                    medicalWastes.setErrorNumber(0);
                }

                //水分含量

                if(data[i][4]=="null"){
                    data[i][4]=0;
                }
                if(data[i][5]=="null"){
                    data[i][5]=0;
                }

                medicalWastes.setWetNumber(Float.parseFloat(data[i][4].toString())-Float.parseFloat(data[i][5].toString()));


                //处置设备
                //medicalWastes.setEquipment(Equipment.getEquipment((data[i][11].toString())));

                medicalWastesService.addMedicalWastes(medicalWastes);

            }
            res.put("status", "success");
            res.put("message", "导入成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败");
        }


        return res.toString();

    }

    //根据编号获取信息
    @RequestMapping("getMedicalWasteById")
    @ResponseBody
    public String getMedicalWasteById(String medicalWastesId){
        JSONObject res=new JSONObject();
        try {
            MedicalWastes medicalWastes=medicalWastesService.getMedicalWasteById(medicalWastesId);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", medicalWastes);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();

    }

    //修改信息
    @RequestMapping("updateMedicalWaste")
    @ResponseBody
    public String updateMedicalWaste(@RequestBody MedicalWastes medicalWastes){
        JSONObject res=new JSONObject();


        try {
              medicalWastesService.updateMedicalWaste(medicalWastes);
            res.put("status", "success");
            res.put("message", "更新成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();

    }

    //医危废出入库导出
    @RequestMapping("exportExcelMedicalWastes")
    @ResponseBody
    public String exportExcelMedicalWastes(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "登记单号/登记日期/登记部门/登记人/修改人/修改时间/本日进厂危废/本日直接转外处置量/本日蒸煮医废(过磅)/蒸煮后重量/蒸煮后入库量/本日蒸煮后外送量/误差量/水分含量/处置设备";
            name = "医危废出入库单";   //重写文件名
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
}
