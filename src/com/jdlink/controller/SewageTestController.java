package com.jdlink.controller;

import com.jdlink.domain.Dictionary.RawMaterialsItem;
import com.jdlink.domain.Dictionary.SewagePointItem;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.dictionary.DictionaryService;
import com.jdlink.service.produce.SewageTestService;
import com.jdlink.util.DBUtil;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class SewageTestController {
    @Autowired
    SewageTestService sewageTestService;
    @Autowired
    DictionaryService dictionaryService;

    /**
     * 导入污水化验单数据
     */
    @RequestMapping("importSewageTestExcel")
    @ResponseBody
    public String importSewageTestExcel(MultipartFile excelFile){
        JSONObject res=new JSONObject();
        List<Object[][]> data = ImportUtil.getInstance().getExcelFileData(excelFile);
        System.out.println(data.size()+"页数");
        try {
      for(int i=0;i<data.size();i++){//分页遍历

          for(int j=2;j<data.get(i).length;j++){
                if(data.get(i)[j][0]!="null"){ //有数据
                   //创建污水化验对象
                    SewageTest sewageTest=new SewageTest();
                    //0化验单号
                    if(data.get(i)[j][0]!="null"){
                        sewageTest.setId(data.get(i)[j][0].toString());
                    }else {
                        sewageTest.setId(null);//
                    }
                    //1采样点
                    if(data.get(i)[j][1]!="null"){
                        sewageTest.setAddress(data.get(i)[j][1].toString());
                    }else {
                        sewageTest.setAddress("");//
                    }
                    //2ph
                    if(data.get(i)[j][2]!="null"){
                        sewageTest.setPh(Float.parseFloat(data.get(i)[j][2].toString()));
                    }else {
                        sewageTest.setPh(-9999);
                    }
                    //3COD
                    if(data.get(i)[j][3]!="null"){
                        sewageTest.setCOD(Float.parseFloat(data.get(i)[j][3].toString()));
                    }else {
                        sewageTest.setCOD(-9999);
                    }
                    //4BOD
                    if(data.get(i)[j][4]!="null"){
                        sewageTest.setBOD5(Float.parseFloat(data.get(i)[j][4].toString()));
                    }else {
                        sewageTest.setBOD5(-9999);
                    }
                    //5氨氮
                    if(data.get(i)[j][5]!="null"){
                        sewageTest.setN2(Float.parseFloat(data.get(i)[j][5].toString()));
                    }else{
                        sewageTest.setN2(-9999);
                    }
                    //6碳酸盐碱度Cao
                    if(data.get(i)[j][6]!="null"){
                        sewageTest.setAlkalinity(Float.parseFloat(data.get(i)[j][6].toString()));
                    }else {
                        sewageTest.setAlkalinity(-9999);
                    }
                    //7碳酸盐碱度CaCo3
                    if(data.get(i)[j][7]!="null"){
                        sewageTest.setAlkalinityCaCo3(Float.parseFloat(data.get(i)[j][7].toString()));
                    }else {
                        sewageTest.setAlkalinityCaCo3(-9999);
                    }
                    //8碳酸盐碱度HCO3-
                    if(data.get(i)[j][8]!="null"){
                        sewageTest.setAlkalinityHCO3(Float.parseFloat(data.get(i)[j][8].toString()));
                    }else {
                        sewageTest.setAlkalinityHCO3(-9999);
                    }
                    //9重碳酸盐碱度Cao
                    if(data.get(i)[j][9]!="null"){
                        sewageTest.setBicarbonate(Float.parseFloat(data.get(i)[j][9].toString()));
                    }else {
                        sewageTest.setBicarbonate(-9999);
                    }
                    //10重碳酸盐碱度CaCo3
                    if(data.get(i)[j][10]!="null"){
                        sewageTest.setBicarbonateCaCo3(Float.parseFloat(data.get(i)[j][10].toString()));
                    }else {
                        sewageTest.setBicarbonateCaCo3(-9999);
                    }
                    //11重碳酸盐碱度HCO3-
                    if(data.get(i)[j][11]!="null"){
                        sewageTest.setBicarbonateHCO3(Float.parseFloat(data.get(i)[j][11].toString()));
                    }else {
                        sewageTest.setBicarbonateHCO3(-9999);
                    }
                    //12总氮
                    if(data.get(i)[j][12]!="null"){
                        sewageTest.setNitrogen(Float.parseFloat(data.get(i)[j][12].toString()));
                    }else {
                        sewageTest.setNitrogen(-9999);
                    }
                    //13总磷
                    if(data.get(i)[j][13]!="null"){
                        sewageTest.setPhosphorus(Float.parseFloat(data.get(i)[j][13].toString()));
                    }else {
                        sewageTest.setPhosphorus(-9999);
                    }
                    //14备注
                    if(data.get(i)[j][14]!="null"){
                        sewageTest.setRemarks((data.get(i)[j][14].toString()));
                    }else {
                        sewageTest.setRemarks("");
                    }
                    //判断化验单是否存在 存在就更新
                    //存在就更新
                    SewageTest sewageTest1 = sewageTestService.getSewageTestById(data.get(i)[j][0].toString());
                    if(sewageTest1 !=null){
                         sewageTestService.updateSewageTestById(sewageTest);
                    }else{//添加化验单对象
                        sewageTestService.addSewageTest(sewageTest);
                    }
                }
          }
      }
            res.put("status", "success");
            res.put("message", "污水化验单添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "污水化验单添加失败");
        }

        return res.toString();


    }

    /**
     * 加载初始化页面
     */
    @RequestMapping("loadSewageTestResultsList")
    @ResponseBody
    public String loadSewageTestResultsList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
        List<SewageTest> sewageTestList=sewageTestService.loadSewageTestResultsList(page);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", sewageTestList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }



        return res.toString();
    }

    /**
     * 获取总数==>污水
     *
     */
    @RequestMapping("totalSewageTestRecord")
    @ResponseBody
    public  int totalSewageTestRecord(){

        return sewageTestService.totalSewageTestRecord();
    }

    /**
     * 导入软水化验单
     */
    @RequestMapping("importSoftTestExcel")
    @ResponseBody
    public String importSoftTestExcel(MultipartFile excelFile){
        JSONObject res=new JSONObject();
        List<Object[][]> data = ImportUtil.getInstance().getExcelFileData(excelFile);
        try {

            for(int i=0;i<data.size();i++){//页数遍历

                for(int j=2;j<data.get(i).length;j++){

                    if(data.get(i)[j][1]!="null"){
                        SoftTest softTest=new SoftTest();

                        //设置化验单号
                        softTest.setId(data.get(i)[j][0].toString());

                        if(data.get(i)[j][1]!="null"){
                            softTest.setAddress(data.get(i)[j][1].toString());
                        }
                        if(data.get(i)[j][1]=="null"){
                            softTest.setAddress("");
                        }
                        //浊度
                        if(data.get(i)[j][2]!="null"){
                            softTest.setTurbidity(Float.parseFloat(data.get(i)[j][2].toString()));
                        }
                        if(data.get(i)[j][2]=="null"){
                            softTest.setTurbidity(-9999);
                        }
                        //硬度
                        if(data.get(i)[j][3]!="null"){
                            if(!(data.get(i)[j][3].toString()).contains("*10-3")){
                                softTest.setHardness((data.get(i)[j][3].toString())+"*10-3");
                            }
                            else
                            softTest.setHardness((data.get(i)[j][3].toString()));
                        }
                        if(data.get(i)[j][3]=="null"){
                            softTest.setHardness("-9999");
                        }
                        //ph
                        if(data.get(i)[j][4]!="null"){
                            softTest.setPH(Float.parseFloat(data.get(i)[j][4].toString()));
                        }

                        if(data.get(i)[j][4]=="null"){
                            softTest.setPH(-9999);
                        }

                        //电导率
                        if(data.get(i)[j][5]!="null"){
                            softTest.setElectricalConductivity(Float.parseFloat(data.get(i)[j][5].toString()));
                        }
                        if(data.get(i)[j][5]=="null"){
                            softTest.setElectricalConductivity(-9999);
                        }

                        //全碱度
                        if(data.get(i)[j][6]!="null"){
                            softTest.setBasicity(Float.parseFloat(data.get(i)[j][6].toString()));
                        }
                        if(data.get(i)[j][6]=="null"){
                            softTest.setBasicity(-9999);
                        }
                        //酚酞碱度
                        if(data.get(i)[j][7]!="null"){
                            softTest.setPhenolphthalein(Float.parseFloat(data.get(i)[j][7].toString()));
                        }
                        if(data.get(i)[j][7]=="null"){
                            softTest.setPhenolphthalein(-9999);
                        }
                        //备注
                        if(data.get(i)[j][8]!="null"){
                            softTest.setRemarks((data.get(i)[j][8].toString()));
                        }
                        if(data.get(i)[j][8]=="null"){
                            softTest.setRemarks("");
                        }
                        SoftTest softTest1 = sewageTestService.getSoftTestById(data.get(i)[j][0].toString());
                        //根据化验单号查询对象 如果存在就更新 不存在就添加
                        if(softTest1 == null){
                            sewageTestService.addSoftTest(softTest);
                        }else{
                            sewageTestService.updateSoftTest(softTest);
                        }
                    }

                }
            }
            res.put("status", "success");
            res.put("message", "软水化验单导入成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "软水化验单导入失败");
        }
        return res.toString();
    }

    /**
     * 导出(带表头字段)
     *
     * @param name
     * @param response
     * @param sqlWords
     * @return
     */
    @RequestMapping("exportExcelSoftWater")
    @ResponseBody
    public String exportExcelSoftWater(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            // 设置表头
            String tableHead = "序号/采样点/浊度/硬度/PH/电导率/全碱度/酚酞碱度/备注";
            if(name.equals("1")){
                name = "软水化验单";   // 重写文件名
            }else{
                name = "软水分析日报";   // 重写文件名
            }
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");
        } catch (IOException ex) {
            ex.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");
        }
        return res.toString();
    }

    /**
     * 软水化验的总数
     */
    @RequestMapping("totalSoftTestRecord")
    @ResponseBody
    public int totalSoftTestRecord(){

        return sewageTestService.totalSoftTestRecord();
    }

    /**
     * 软食化验单初始化数据
     */
    @RequestMapping("loadSoftTestResultsList")
    @ResponseBody
    public String loadSoftTestResultsList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            List<SoftTest> softTestList=sewageTestService.loadSoftTestResultsList(page);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", softTestList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();

    }

    //修改污水信息
    @RequestMapping("updateSewaGeregistration")
    @ResponseBody
    public String updateSewaGeregistration(@RequestBody Sewageregistration sewageregistration){
        JSONObject res=new JSONObject();
        try {
            //1更新主表
            sewageTestService.updateSewaGeregistration(sewageregistration);
            //2删除字表
            sewageTestService.deleteSewaGeregistrationById(sewageregistration.getId());
            res.put("status", "success");
            res.put("message", "主表更新成功,字表删除成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "主表更新失败,字表删除失败");
        }


        return res.toString();


    }

    //修改软水信息
    @RequestMapping("updateSoftGeregistration")
    @ResponseBody
    public String updateSoftGeregistration(@RequestBody Sewageregistration sewageregistration){
        JSONObject res=new JSONObject();


        try {
            //1更新主表
            sewageTestService.updateSoftGeregistration(sewageregistration);
            //2删除字表
            sewageTestService.deleteSoftGeregistrationById(sewageregistration.getId());
            res.put("status", "success");
            res.put("message", "主表更新成功,字表删除成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "主表更新失败,字表删除失败");

        }

        return res.toString();


    }

   //更新次生送样信息
    @RequestMapping("updateSecondarySample")
    @ResponseBody
    public String updateSecondarySample(@RequestBody SecondarySample secondarySample){
        JSONObject res=new JSONObject();

        try {
            //删除字表
            sewageTestService.deleteSecondarySampleItem(secondarySample.getId());
            //更新完成
        sewageTestService.updateSecondarySample(secondarySample);

            res.put("status", "success");
            res.put("message", "更新主表,删除字表完成");

        }

        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }


        return res.toString();


    }

    //次生化验导入
    @RequestMapping("importSecondaryTestResultsExcel")
    @ResponseBody
    public String importSecondaryTestResultsExcel(MultipartFile excelFile){
        JSONObject res=new JSONObject();
        Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
        try {
         for(int i=2;i<data.length;i++){

             if(data[i][0]!="null"){
                 SecondaryTest secondaryTest=new SecondaryTest();
                 //1化验单号
                 secondaryTest.setId(data[i][0].toString());

//                 //2日期
//                 if(data[i][1].toString().indexOf("/")!=-1){
//                     String  datestr=data[i][1].toString().replace("/","-");
//                     SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
//                     secondaryTest.setDateTime(simpleDateFormat.parse(datestr));
//                 }

                 //1废物名称
                 secondaryTest.setWastesName(data[i][1].toString());


                 //2热灼减率
                 if(data[i][2].toString() != null && !data[i][2].toString().equals("null")) {
                     secondaryTest.setScorchingRate(Float.parseFloat(data[i][2].toString()));
                 }else {
                     secondaryTest.setScorchingRate(-9999);
                 }

                 //3水分
                 if(data[i][3].toString() != null && !data[i][3].toString().equals("null")) {
                     secondaryTest.setWater(Float.parseFloat(data[i][3].toString()));
                 }else {
                     secondaryTest.setWater(-9999);
                 }

                 //4备注
                 if(data[i][4].toString() != null && !data[i][4].toString().equals("null")) {
                     secondaryTest.setRemarks(data[i][4].toString());
                 }else {
                     secondaryTest.setRemarks("");
                 }

                 //更加化验单号查询化验单信息
                 if(sewageTestService.getSecondaryTestById(data[i][0].toString())!=null){
                     //更新
                     sewageTestService.updateSecondaryTestById(secondaryTest);
                 } else{ //添加
                     sewageTestService.addSecondaryTest(secondaryTest);
                 }
             }
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

    //次生化验显示
    @RequestMapping("loadPageSecondaryTestResultsList")
    @ResponseBody
    public String loadPageSecondaryTestResultsList(@RequestBody Page page){
        JSONObject res=new JSONObject();
       try{
           List<SecondaryTest> secondaryTestList=sewageTestService.loadPageSecondaryTestResultsList(page);
           res.put("status", "success");
           res.put("message", "更新成功");
           res.put("data", secondaryTestList);
       }
       catch (Exception e){
           e.printStackTrace();
           res.put("status", "fail");
           res.put("message", "更新失败");
       }

        return res.toString();


    }

    //查询次生化验的数量
    @RequestMapping("totalSecondaryTestRecord")
    @ResponseBody
    public int totalSecondaryTestRecord(){

        return sewageTestService.totalSecondaryTestRecord();

    }

    //次生化验添加
    @RequestMapping("addSecondaryTest")
    @ResponseBody
    public String addSecondaryTest(@RequestBody SecondaryTest secondaryTest){
        JSONObject res=new JSONObject();

        try {
         sewageTestService.addSecondaryTest(secondaryTest);
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

    //污水化验添加
    @RequestMapping("addSewageTest")
    @ResponseBody
    public String addSewageTest(@RequestBody SewageTest sewageTest){
        JSONObject res=new JSONObject();
        try {
            sewageTestService.addSewageTest(sewageTest);
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

    //添加软水化验
    @RequestMapping("addSoftTest")
    @ResponseBody
    public String addSoftTest(@RequestBody SoftTest softTest){
        JSONObject res=new JSONObject();
        try {
            sewageTestService.addSoftTest(softTest);
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

    //提交污水化验单
    @RequestMapping("submitSewageTest")
    @ResponseBody
    public String submitSewageTest(String id){
        JSONObject res=new JSONObject();
        try {
        sewageTestService.submitSewageTest(id);
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

    //签收污水化验单
    @RequestMapping("confirmSewageTest")
    @ResponseBody
    public String confirmSewageTest(String id){
        JSONObject res=new JSONObject();


        try {
            sewageTestService.confirmSewageTest(id);
            res.put("status", "success");
            res.put("message", "已确认");
        }

        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "确认失败");
        }

        return res.toString();
    }

    //作废污水化验单
    @RequestMapping("cancelSewageTest")
    @ResponseBody
    public String cancelSewageTest(String id){
        JSONObject res=new JSONObject();

        try {
           sewageTestService.cancelSewageTest(id);
          //污水收样状态为待收样
            sewageTestService.cancelSewageTestAfter(id);
            res.put("status", "success");
            res.put("message", "已作废");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }

        return res.toString();
    }

    //根据编号获取污水化验单信息
    @RequestMapping("getSewageTestById")
    @ResponseBody
    public String getSewageTestById(String id){
        JSONObject res=new JSONObject();


        try {
             SewageTest sewageTest=sewageTestService.getSewageTestById(id);
             res.put("status", "success");
             res.put("message", "查询成功");
             res.put("data", sewageTest);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return  res.toString();

    }

    //修改污水化验单
    @RequestMapping("updateSewageTestById")
    @ResponseBody
    private String updateSewageTestById(@RequestBody SewageTest sewageTest){
        JSONObject res=new JSONObject();


        try {
            sewageTestService.updateSewageTestById(sewageTest);
            res.put("status", "success");
            res.put("message", "修改成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改失败");
        }

        return res.toString();


    }

    //提交软水化验单
    @RequestMapping("submitSoftTest")
    @ResponseBody
    public String submitSoftTest(String id){
        JSONObject res=new JSONObject();

        try {
     sewageTestService.submitSoftTest(id);
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

    //签收软水化验单
    @RequestMapping("confirmSoftTest")
    @ResponseBody
    public String confirmSoftTest(String id){
        JSONObject res=new JSONObject();

        try {
  sewageTestService.confirmSoftTest(id);
            res.put("status", "success");
            res.put("message", "已签收");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "签收失败");
        }

        return res.toString();


    }

    //作废软水化验单
    @RequestMapping("cancelSoftTest")
    @ResponseBody
    public String cancelSoftTest(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelSoftTest(id);
            sewageTestService.cancelSoftTestAfter(id);
            res.put("status", "success");
            res.put("message", "已作废");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }

        return res.toString();
    }

    //根据编号查询软水化验
    @RequestMapping("getSoftTestById")
    @ResponseBody
    public String getSoftTestById(String id){
        JSONObject res=new JSONObject();

        try {
            SoftTest softTest=sewageTestService.getSoftTestById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", softTest);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");

        }


        return res.toString();
    }

    //更新软水化验
    @RequestMapping("updateSoftTestById")
    @ResponseBody
    public String updateSoftTestById(@RequestBody SoftTest softTest){
        JSONObject res=new JSONObject();

        try {
              sewageTestService.updateSoftTest(softTest);
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

    //提交次生化验单
    @RequestMapping("submitSecondaryTest")
    @ResponseBody
    public String submitSecondaryTest(String id){
        JSONObject res=new JSONObject();


        try {
            sewageTestService.submitSecondaryTest(id);
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


    //签收次生化验单
    @RequestMapping("confirmSecondaryTest")
    @ResponseBody
    public String confirmSecondaryTest(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.confirmSecondaryTest(id);
            res.put("status", "success");
            res.put("message", "已签收");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "签收失败");
        }

        return res.toString();


    }


    //作废次生化验单
    @RequestMapping("cancelSecondaryTest")
    @ResponseBody
    public String cancelSecondaryTest(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelSecondaryTest(id);
            //次生送样待收样
            sewageTestService. cancelSecondaryTestAfter(id);

            res.put("status", "success");
            res.put("message", "已作废");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }

        return res.toString();
    }

    //根据编号查找次生化验信息
    @RequestMapping("getSecondaryTestById")
    @ResponseBody
    public String getSecondaryTestById(String id){
        JSONObject res=new JSONObject();

        try {
            SecondaryTest secondaryTest=sewageTestService.getSecondaryTestById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", secondaryTest);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");

        }


        return res.toString();
    }

    //更新次生化验单
    @RequestMapping("updateSecondaryTestById")
    @ResponseBody
    public String updateSecondaryTestById(@RequestBody SecondaryTest secondaryTest){
        JSONObject res=new JSONObject();

        try {
              sewageTestService.updateSecondaryTestById(secondaryTest);
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


    //检测污水预约单号是否存在
    @RequestMapping("testingSewageId")
    @ResponseBody
    public String testingSewageId(String id){
        JSONObject res=new JSONObject();

        try {
           List<String> sewageIdList=sewageTestService.getAllSewageId();
            boolean bool = sewageIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }

    //检测软水预约单号是否存在
    @RequestMapping("testingSoftId")
    @ResponseBody
    public String testingSoftId(String id){
        JSONObject res=new JSONObject();

        try {
            List<String> softIdList=sewageTestService.getAllSoftId();
            boolean bool = softIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }

    //检测次生预约单号是否存在
    @RequestMapping("testingSecondaryId")
    @ResponseBody
    public String testingSecondaryId(String id){
        JSONObject res=new JSONObject();

        try {
            List<String> secondaryIdList=sewageTestService.getAllSecondaryId();
            boolean bool = secondaryIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }

    //检测污水化验单号
    @RequestMapping("testingSewageTestId")
    @ResponseBody
    public String testingSewageTestId(String  id){

        JSONObject res=new JSONObject();

        try {
            List<String> sewageTestIdList=sewageTestService.getAllSewageTestId();
            boolean bool = sewageTestIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }

    //检测软水化验单号
    @RequestMapping("testingSoftTestId")
    @ResponseBody
    public String testingSoftTestId(String  id){

        JSONObject res=new JSONObject();

        try {
            List<String> softTestIdList=sewageTestService.getAllSoftTestId();
            boolean bool = softTestIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }


    //检测次生化验单号
    @RequestMapping("testingSecondaryTestId")
    @ResponseBody
    public String testingSecondaryTestId(String  id){

        JSONObject res=new JSONObject();

        try {
            List<String> secondaryTestIdList=sewageTestService.getAllSecondaryTestId();
            boolean bool = secondaryTestIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }


    //作废污水送样
    @RequestMapping("cancelSewaGeregistration")
    @ResponseBody
    public String cancelSewaGeregistration(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelSewaGeregistration(id);
            //字表更新一样的id
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

    //作废软水送样
    @RequestMapping("cancelSoftGeregistration")
    @ResponseBody
    public String cancelSoftGeregistration(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelSoftGeregistration(id);
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

    //次生送样作废
    @RequestMapping("cancelSecondaryGeregistration")
    @ResponseBody
    public String cancelSecondaryGeregistration(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelSecondaryGeregistration(id);
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
     * 导出(带表头字段)
     *
     * @param name
     * @param response
     * @param sqlWords
     * @return
     */
    @RequestMapping("exportExcelSewage")
    @ResponseBody
    public String exportExcel(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            // 设置表头
            String tableHead = "样品编号/采样点/PH/COD/BOD5/氨氮/碳酸盐碱度(Cao)/碳酸盐碱度(CaCo3)/碳酸盐碱度(HCo3-)/重碳酸盐碱度(Cao)/" +
                    "重碳酸盐碱度(CaCo3)/重碳酸盐碱度(HCo3-)/总氮/总磷/备注";
            if(name.equals("1")){
                  name = "污水化验结果";
            }else{
                name = "污水分析日报";
            }
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");
        } catch (IOException ex) {
            ex.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");
        }
        return res.toString();
    }


    //污水送样导出
    @RequestMapping("exportSewageregistration")
    @ResponseBody
    public String exportSewageregistration(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "预约单号/采样点/送样人/签收人/状态/PH/COD/BOD5/氨氮/总氮/总磷/碱度";
            name = "污水送样";   //重写文件名
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

    //软水送样导出
    @RequestMapping("exportSoftregistration")
    @ResponseBody
    public String exportSoftregistration(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "预约单号/采样点/送样人/签收人/状态/浊度/硬度/PH/酚酞碱度/全碱度/电导率";
            name = "软水送样";   //重写文件名
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


    //次生送样导出
    @RequestMapping("exportSecondarySample")
    @ResponseBody
    public String exportSecondarySample(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "预约单号/危废名称/送样人/签收人/采样点/状态/水分/热灼减率";
            name = "次生送样";   //重写文件名
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


    /*软水化验查询*/
    @RequestMapping("searchSoftTest")
    @ResponseBody
    public String searchSoftTest(@RequestBody SoftTest softTest){
        JSONObject res=new JSONObject();

        try {
           List<SoftTest> softTestList=sewageTestService.searchSoftTest(softTest);
            res.put("status", "success");
            res.put("message", "软水化验查询成功");
            res.put("data", softTestList);
         }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "软水化验查询失败");
        }
            return res.toString();
    }

    /*软水化验查询总数*/
    @RequestMapping("searchSoftTestCount")
    @ResponseBody
    public int searchSoftTestCount(@RequestBody SoftTest softTest){
        return sewageTestService.searchSoftTestCount(softTest);
    }


  /*污水化验查询*/
    @RequestMapping("searchSewageTest")
    @ResponseBody
    public String searchSewageTest(@RequestBody SewageTest sewageTest){
        JSONObject res=new JSONObject();

        try{
            List<SewageTest> sewageTestList=sewageTestService.searchSewageTest(sewageTest);
            res.put("status", "success");
            res.put("message", "污水化验查询成功");
            res.put("data", sewageTestList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "污水化验查询失败");
        }

        return res.toString();
    }

    /*污水化验查询总数*/
    @RequestMapping("searchSewageTestCount")
    @ResponseBody
    public int searchSewageTestCount(@RequestBody SewageTest sewageTest){
        return sewageTestService.searchSewageTestCount(sewageTest);
    }

    /*次生化验查询*/
    @RequestMapping("searchSecondaryTest")
    @ResponseBody
    public String searchSecondaryTest(@RequestBody SecondaryTest secondaryTest){
        JSONObject res=new JSONObject();

        try{
      List<SecondaryTest> secondaryTestList=sewageTestService.searchSecondaryTest(secondaryTest);
            res.put("status", "success");
            res.put("message", "次生化验查询成功");
            res.put("data", secondaryTestList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "次生化验查询失败");
        }

       return res.toString();
    }


    /*次生化验查询总数*/
    @RequestMapping("searchSecondaryTestCount")
    @ResponseBody
    public int searchSecondaryTestCount(@RequestBody SecondaryTest secondaryTest){
        return sewageTestService.searchSecondaryTestCount(secondaryTest);
    }


   /*=========================原辅材料送样与化验===================================================================>*/


    //检测原辅材料预约单号是否存在
    @RequestMapping("testingRawSampleId")
    @ResponseBody
    public String testingRawSampleId(String id){
        JSONObject res=new JSONObject();

        try {
            List<String> rawSampleIdList=sewageTestService.getAllRawSampleId();
            boolean bool = rawSampleIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }


    //添加原辅材料主表
    @RequestMapping("addRawSample")
    @ResponseBody
    public String addRawSample(@RequestBody RawSample rawSample) {
        JSONObject res = new JSONObject();

        try {
            sewageTestService.addRawSample(rawSample);
            res.put("status", "success");
            res.put("message", "添加主表成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "添加主表失败");

        }

        return res.toString();

    }

    //添加原辅材料子表
    @RequestMapping("addRawSampleItem")
    @ResponseBody
    public String addRawSampleItem(@RequestBody RawSampleItem rawSampleItem) {
        JSONObject res = new JSONObject();

        try {
            String id1;
            int index = sewageTestService.CountById(rawSampleItem.getSampleinformationId());
            do {
                index += 1;
                String index1 = index + "";
                if (index < 10) index1 = "000" + index;
                else if (index < 100) index1 = "00" + index;
                else if (index < 1000) index1 = "0" + index;
                id1 = rawSampleItem.getSampleinformationId() + index1;
            } while (sewageTestService.getRawSampleItemById(id1) != null);
            rawSampleItem.setId(id1);
//            String id = productionDailyService.getNewestId().get(0);
            sewageTestService.addRawSampleItem(rawSampleItem);
            res.put("status", "success");
            res.put("message", "字表添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "字表添加失败");

        }

        return res.toString();


    }

    //////加载原辅材料页面////
    @RequestMapping("loadRawSampleList")
    @ResponseBody
    public String loadRawSampleList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<RawSample> rawSampleList = sewageTestService.loadRawSampleList(page);
            res.put("data", rawSampleList);
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }

    /*根据编号获取原辅材料*/
    @RequestMapping("getRawSampleById")
    @ResponseBody
    public String getRawSampleById(String id){
        JSONObject res=new JSONObject();

         try {
             RawSample rawSample=sewageTestService.getRawSampleById(id);
             res.put("status", "success");
             res.put("message", "查询成功");
             res.put("data", rawSample);

         }
         catch (Exception e){
             e.printStackTrace();
             res.put("status", "fail");
             res.put("message", "查询失败");

         }


        return res.toString();
    }


    //更新原辅材料
    @RequestMapping("updateRawSample")
    @ResponseBody
    public String updateRawSample(@RequestBody RawSample rawSample){
        JSONObject res=new JSONObject();
        try {
            //1更新主表
            sewageTestService.updateRawSample(rawSample);
            //2删除字表
            sewageTestService.deleteRawSampleItem(rawSample.getId());
            res.put("status", "success");
            res.put("message", "主表更新成功,字表删除成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "主表更新失败,字表删除失败");
        }


        return res.toString();


    }

    /*作废原辅材料*/
     @RequestMapping("cancelRawSample")
      @ResponseBody
    public String cancelRawSample(String id){
         JSONObject res=new JSONObject();

          try {
         sewageTestService.cancelRawSample(id);
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

     @RequestMapping("rejectRawSampleItemById")
    @ResponseBody
    public String rejectRawSampleItemById(String id ,String advice){
         JSONObject res=new JSONObject();

         try {
         sewageTestService.rejectRawSampleItemById(id, advice);
             res.put("status", "success");
             res.put("message", "已拒收");
         }
         catch (Exception e){
             e.printStackTrace();
             res.put("status", "fail");
             res.put("message", "拒收失败");

         }

         return res.toString();
     }

     /*原辅材料送样总数*/
     @RequestMapping("searchRawSampleTotal")
     @ResponseBody
     public int searchRawSampleTotal(){
         return sewageTestService.searchRawSampleTotal();
     }

     /*原辅材料送样查询*/
    @RequestMapping("searchRawSample")
    @ResponseBody
    public String searchRawSample(@RequestBody RawSample rawSample){
        JSONObject res=new JSONObject();

        try{
     List<RawSample> rawSampleList=sewageTestService.searchRawSample(rawSample);
            res.put("data", rawSampleList);
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");

        }

        return res.toString();
    }

    /*原辅材料送样查询计数*/
    @RequestMapping("searchRawSampleCount")
    @ResponseBody
    public int searchRawSampleCount(@RequestBody RawSample rawSample){
       return sewageTestService.searchRawSampleCount(rawSample);
    }


    /**
     * 原辅材料送样导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importRawSampleExcel")
    @ResponseBody
    public String importRawSampleExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            System.out.println(data);
            for(int i=2;i<data.length;i++){
                 if(data[i][0].toString()!="null"){
                     RawSample rawSample=new RawSample();
                     rawSample.setId(data[i][0].toString());
                     rawSample.setNewId(data[i][0].toString());
                     if(data[i][1].toString()!="null"){
                         rawSample.setSendingPerson(data[i][1].toString());
                     }
                     if(data[i][2].toString()!="null"){
                         RawMaterialsItem rawMaterialsItem=new RawMaterialsItem();
                         int dataDictionaryItemId=dictionaryService.getdatadictionaryitemIdByName(data[i][2].toString(),41);
                         rawMaterialsItem.setDataDictionaryItemId(dataDictionaryItemId);
                         rawSample.setRawMaterialsItem(rawMaterialsItem);
                     }
                     RawSampleItem rawSampleItem=new RawSampleItem();
                     rawSampleItem.setSampleinformationId(data[i][0].toString());
                     String id1;
                     int index = sewageTestService.CountById(data[i][0].toString());
                     do {
                         index += 1;
                         String index1 = index + "";
                         if (index < 10) index1 = "000" + index;
                         else if (index < 100) index1 = "00" + index;
                         else if (index < 1000) index1 = "0" + index;
                         id1 = rawSampleItem.getSampleinformationId() + index1;
                     } while (sewageTestService.getRawSampleItemById(id1) != null);
                     rawSampleItem.setId(id1);
                     //氢氧化钠
                     if(data[i][3].toString().equals("1")){
                         rawSampleItem.setSodium(true);
                     }
                     else
                         rawSampleItem.setSodium(false);
                     //氢氧化钙
                     if(data[i][4].toString().equals("1")){
                         rawSampleItem.setCalcium(true);
                     }
                     else
                         rawSampleItem.setCalcium(false);
                     //干燥减量
                     if(data[i][5].toString().equals("1")){
                         rawSampleItem.setDry(true);
                     }
                     else
                         rawSampleItem.setDry(false);
                     //碘吸附值
                     if(data[i][6].toString().equals("1")){
                         rawSampleItem.setAdsorption(true);
                     }
                     else
                         rawSampleItem.setAdsorption(false);
                     //PH
                     if(data[i][7].toString().equals("1")){
                         rawSampleItem.setPh(true);
                     }
                     else
                         rawSampleItem.setPh(false);
                     //水分
                     if(data[i][8].toString().equals("1")){
                         rawSampleItem.setWater(true);
                     }
                     else
                         rawSampleItem.setWater(false);
                     //灰分
                     if(data[i][9].toString().equals("1")){
                         rawSampleItem.setAsh(true);
                     }
                     else
                         rawSampleItem.setAsh(false);
                     //粒度分布
                     if(data[i][10].toString().equals("1")){
                         rawSampleItem.setParticle(true);
                     }
                     else
                         rawSampleItem.setParticle(false);
                     //表观密度
                     if(data[i][10].toString().equals("1")){
                         rawSampleItem.setDensity(true);
                     }
                     else
                         rawSampleItem.setDensity(false);

                     //判断有没有预约单号相同的，有的话更新，没有添加

                     RawSample rawSample1=sewageTestService.getRawSampleById(data[i][0].toString());
                     if(rawSample1!=null){//更新
                         //删除字表
                         sewageTestService.deleteRawSampleItem(data[i][0].toString());
                         //更新主表
                         sewageTestService.updateRawSample(rawSample);
                         //添加字表
                         sewageTestService.addRawSampleItem(rawSampleItem);
                     }
                     if(rawSample1==null){//没有就是全部添加
                         sewageTestService.addRawSample(rawSample);
                         sewageTestService.addRawSampleItem(rawSampleItem);
                     }
                 }



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

    //原辅材料送样导出
    @RequestMapping("exportRawSample")
    @ResponseBody
    public String exportRawSample(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "预约单号/送样人/签收人/状态/氢氧化钠/氢氧化钙/干燥减量/碘吸附值/PH/水分/灰分/粒度分布/表观密度";
            name = "原辅材料送样";   //重写文件名
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


   /*添加原辅材料化验*/
    @RequestMapping("addRawMaterialsTest")
    @ResponseBody
    public String addRawMaterialsTest(@RequestBody RawMaterialsTest rawMaterialsTest){
        JSONObject res=new JSONObject();

        try{
                    sewageTestService.addRawMaterialsTest(rawMaterialsTest);
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



    //检测原辅材料化验单号
    @RequestMapping("testingRawMaterialsTestId")
    @ResponseBody
    public String testingRawMaterialsTestId(String  id){

        JSONObject res=new JSONObject();

        try {
            List<String> rawMaterialsTestIdList=sewageTestService.getAllRawMaterialsTestId();
            boolean bool = rawMaterialsTestIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }

    /*加载原辅材料化验页面*/
    @RequestMapping("loadRawMaterialsTestList")
    @ResponseBody
    public String loadRawMaterialsTestList(@RequestBody Page page){
        JSONObject res=new JSONObject();

        try{
             List<RawMaterialsTest>  rawMaterialsTestList=sewageTestService.loadRawMaterialsTestList(page);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", rawMaterialsTestList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }


          return res.toString();
    }

    /*根据单号获取原辅化验单号*/
    @RequestMapping("getRawMaterialsTestById")
    @ResponseBody
    public String getRawMaterialsTestById(String id){
        JSONObject res=new JSONObject();

        try{
            RawMaterialsTest rawMaterialsTest=sewageTestService.getRawMaterialsTestById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", rawMaterialsTest);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }



          return res.toString();
    }

    /*更新原辅材料化验单*/
    @RequestMapping("updateRawMaterialsTestById")
    @ResponseBody
    public String updateRawMaterialsTestById(@RequestBody RawMaterialsTest rawMaterialsTest){
            JSONObject res=new JSONObject();
                          try {
                    sewageTestService.updateRawMaterialsTestById(rawMaterialsTest);
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

      /*原辅材料化验单总数*/
    @RequestMapping("rawMaterialsTestTotal")
    @ResponseBody
    public int rawMaterialsTestTotal(){
        return sewageTestService.rawMaterialsTestTotal();

    }

    /*提交原辅材料化验单*/
    @RequestMapping("submitRawMaterialsTest")
    @ResponseBody
    public String submitRawMaterialsTest(String id){
        JSONObject res=new JSONObject();

        try{
             sewageTestService.submitRawMaterialsTest(id);
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


    //签收原辅材料化验单
    @RequestMapping("confirmRawMaterialsTest")
    @ResponseBody
    public String confirmRawMaterialsTest(String id){
        JSONObject res=new JSONObject();


        try {
            sewageTestService.confirmRawMaterialsTest(id);
            res.put("status", "success");
            res.put("message", "已确认");
        }

        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "确认失败");
        }

        return res.toString();
    }


    //作废原辅材料化验单
    @RequestMapping("cancelRawMaterialsTest")
    @ResponseBody
    public String cancelRawMaterialsTest(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelRawMaterialsTest(id);
            //污水收样状态为待收样
            sewageTestService.cancelRawMaterialsTestAfter(id);
            res.put("status", "success");
            res.put("message", "已作废");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }

        return res.toString();
    }


    //原辅材料化验单导入
    @RequestMapping("importRawMaterialsTestResultsExcel")
    @ResponseBody
    public String importRawMaterialsTestResultsExcel(MultipartFile excelFile){
        JSONObject res=new JSONObject();
        Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
        System.out.println(data);
        try {
          for(int i=2;i<data.length;i++){
              if(data[i][0].toString()!="null"){
                  RawMaterialsTest rawMaterialsTest=new RawMaterialsTest();
                  rawMaterialsTest.setId(data[i][0].toString());
                  if(data[i][1].toString()!="null"){
                      rawMaterialsTest.setRawMaterialsName(data[i][1].toString());
                  }
                  if(data[i][2].toString()!="null"){
                      rawMaterialsTest.setSodium(Float.parseFloat(data[i][2].toString()));
                  }
                  if(data[i][2].toString()=="null"){
                      rawMaterialsTest.setSodium(-9999);
                  }

                  if(data[i][3].toString()!="null"){
                      rawMaterialsTest.setCalcium(Float.parseFloat(data[i][3].toString()));
                  }
                  if(data[i][3].toString()=="null"){
                      rawMaterialsTest.setCalcium(-9999);
                  }

                  if(data[i][4].toString()!="null"){
                      rawMaterialsTest.setDry(Float.parseFloat(data[i][4].toString()));
                  }
                  if(data[i][4].toString()=="null"){
                      rawMaterialsTest.setDry(-9999);
                  }

                  if(data[i][5].toString()!="null"){
                      rawMaterialsTest.setAdsorption(Float.parseFloat(data[i][5].toString()));
                  }
                  if(data[i][5].toString()=="null"){
                      rawMaterialsTest.setAdsorption(-9999);
                  }
                  if(data[i][6].toString()!="null"){
                      rawMaterialsTest.setPh(Float.parseFloat(data[i][6].toString()));
                  }
                  if(data[i][6].toString()=="null"){
                      rawMaterialsTest.setPh(-9999);
                  }
                  if(data[i][7].toString()!="null"){
                      rawMaterialsTest.setWater(Float.parseFloat(data[i][7].toString()));
                  }
                  if(data[i][7].toString()=="null"){
                      rawMaterialsTest.setWater(-9999);
                  }
                  if(data[i][8].toString()!="null"){
                      rawMaterialsTest.setAsh(Float.parseFloat(data[i][8].toString()));
                  }
                  if(data[i][8].toString()=="null"){
                      rawMaterialsTest.setAsh(-9999);
                  }
                  if(data[i][9].toString()!="null"){
                      rawMaterialsTest.setParticle(Float.parseFloat(data[i][9].toString()));
                  }
                  if(data[i][9].toString()=="null"){
                      rawMaterialsTest.setParticle(-9999);
                  }
                  if(data[i][10].toString()!="null"){
                      rawMaterialsTest.setDensity(Float.parseFloat(data[i][10].toString()));
                  }
                  if(data[i][10].toString()=="null"){
                      rawMaterialsTest.setDensity(-9999);
                  }
                  if(data[i][11].toString()!="null"){
                      rawMaterialsTest.setRemarks(data[i][11].toString());
                  }

                  //如果存在更新,不存在就添加
                  RawMaterialsTest rawMaterialsTest1=sewageTestService.getRawMaterialsTestById(data[i][0].toString());

                    if(rawMaterialsTest1!=null){
                        sewageTestService.updateRawMaterialsTestById(rawMaterialsTest);
                    }
                  if(rawMaterialsTest1==null){
                      sewageTestService.addRawMaterialsTest(rawMaterialsTest);
                  }
              }
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


    /**
     * 原辅材料化验单导出(带表头字段)
     *
     * @param name
     * @param response
     * @param sqlWords
     * @return
     */
    @RequestMapping("exportExcelRawMaterialsTest")
    @ResponseBody
    public String exportExcelRawMaterialsTest(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            // 设置表头
            String tableHead = "化验单号/氢氧化钠/氢氧化钙/干燥减量/碘吸附值/PH/水分/灰分/粒度分布/表观密度/备注";

            if(name.equals("1")){
                name = "原辅材料化验单";
            }else{
                name = "原辅材料化验单";
            }
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");
        } catch (IOException ex) {
            ex.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");
        }
        return res.toString();
    }

    /*原辅材料化验单查询*/
    @RequestMapping("searchRawMaterialsTest")
    @ResponseBody
    public String searchRawMaterialsTest(@RequestBody RawMaterialsTest rawMaterialsTest ){
        JSONObject res=new JSONObject();

        try{
           List<RawMaterialsTest> rawMaterialsTestList=sewageTestService.searchRawMaterialsTest(rawMaterialsTest);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", rawMaterialsTestList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

     return res.toString();
    }
    /*原辅材料化验单查询计数*/
    @RequestMapping("searchRawMaterialsTestCount")
    @ResponseBody
    public  int searchRawMaterialsTestCount(@RequestBody RawMaterialsTest rawMaterialsTest ){

        return sewageTestService.searchRawMaterialsTestCount(rawMaterialsTest);
    }

    //确认送样==》原辅材料送样
    @RequestMapping("confirmRawSampleById")
    @ResponseBody
    public String confirmRawSampleById(String id, String laboratorySignatory) {
        JSONObject res = new JSONObject();
        try {
            sewageTestService.confirmRawSampleById(id, laboratorySignatory);

            //根据样品单号获取送样信息
            RawSample rawSample=sewageTestService.getRawSampleById(id);
            RawSampleItem rawSampleItem=rawSample.getRawSampleItemList().get(0);
            RawMaterialsTest rawMaterialsTest=new RawMaterialsTest();

            //单号
            rawMaterialsTest.setId(id);

            //材料类别
            if(rawSample.getRawMaterialsItem()!=null){
                rawMaterialsTest.setRawMaterialsName(rawSample.getRawMaterialsItem().getDictionaryItemName());
            }

           if(rawSampleItem.getSodium()==true){
               rawMaterialsTest.setSodium(0);
           }
           else
               rawMaterialsTest.setSodium(-9999);

            if(rawSampleItem.getCalcium()==true){
                rawMaterialsTest.setCalcium(0);
            }
            else
                rawMaterialsTest.setCalcium(-9999);

            if(rawSampleItem.getDry()==true){
                rawMaterialsTest.setDry(0);
            }
            else
                rawMaterialsTest.setDry(-9999);

            if(rawSampleItem.getAdsorption()==true){
                rawMaterialsTest.setAdsorption(0);
            }
            else
                rawMaterialsTest.setAdsorption(-9999);

            if(rawSampleItem.getPh()==true){
                rawMaterialsTest.setPh(0);
            }
            else
                rawMaterialsTest.setPh(-9999);

            if(rawSampleItem.getWater()==true){
                rawMaterialsTest.setWater(0);
            }
            else
                rawMaterialsTest.setWater(-9999);

            if(rawSampleItem.getAsh()==true){
                rawMaterialsTest.setAsh(0);
            }
            else
                rawMaterialsTest.setAsh(-9999);

            if(rawSampleItem.getParticle()==true){
                rawMaterialsTest.setParticle(0);
            }
            else
                rawMaterialsTest.setParticle(-9999);

            if(rawSampleItem.getDensity()==true){
                rawMaterialsTest.setDensity(0);
            }
            else
                rawMaterialsTest.setDensity(-9999);


            if (sewageTestService.getRawMaterialsTestById(id) == null) {
                sewageTestService.addRawMaterialsTest(rawMaterialsTest);
            }
            else {
                sewageTestService.updateRawMaterialsTestById(rawMaterialsTest);
            }
            res.put("status", "success");
            res.put("message", "收样成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "收样失败");
        }
        return res.toString();
    }


    /**
     * 一键签收原辅材料送样
     *
     * @return
     */
    @RequestMapping("confirmAllRawSampleisCheck")
    @ResponseBody
    public String confirmAllRawSampleisCheck(@RequestBody RawSample RawSample) {
        JSONObject res = new JSONObject();
        try {
            // 改变单据状态
            sewageTestService.confirmAllRawSampleisCheck(RawSample);
            if(RawSample.getSampleIdList().size() > 0){
                for (String id : RawSample.getSampleIdList()) {
                    //根据样品单号获取送样信息
                    RawSample rawSample=sewageTestService.getRawSampleById(id);
                    RawSampleItem rawSampleItem=rawSample.getRawSampleItemList().get(0);
                    RawMaterialsTest rawMaterialsTest=new RawMaterialsTest();

                    //单号
                    rawMaterialsTest.setId(id);

                    //材料类别
                    if(rawSample.getRawMaterialsItem()!=null){
                        rawMaterialsTest.setRawMaterialsName(rawSample.getRawMaterialsItem().getDictionaryItemName());
                    }

                    if(rawSampleItem.getSodium()==true){
                        rawMaterialsTest.setSodium(0);
                    }
                    else
                        rawMaterialsTest.setSodium(-9999);

                    if(rawSampleItem.getCalcium()==true){
                        rawMaterialsTest.setCalcium(0);
                    }
                    else
                        rawMaterialsTest.setCalcium(-9999);

                    if(rawSampleItem.getDry()==true){
                        rawMaterialsTest.setDry(0);
                    }
                    else
                        rawMaterialsTest.setDry(-9999);

                    if(rawSampleItem.getAdsorption()==true){
                        rawMaterialsTest.setAdsorption(0);
                    }
                    else
                        rawMaterialsTest.setAdsorption(-9999);

                    if(rawSampleItem.getPh()==true){
                        rawMaterialsTest.setPh(0);
                    }
                    else
                        rawMaterialsTest.setPh(-9999);

                    if(rawSampleItem.getWater()==true){
                        rawMaterialsTest.setWater(0);
                    }
                    else
                        rawMaterialsTest.setWater(-9999);

                    if(rawSampleItem.getAsh()==true){
                        rawMaterialsTest.setAsh(0);
                    }
                    else
                        rawMaterialsTest.setAsh(-9999);

                    if(rawSampleItem.getParticle()==true){
                        rawMaterialsTest.setParticle(0);
                    }
                    else
                        rawMaterialsTest.setParticle(-9999);

                    if(rawSampleItem.getDensity()==true){
                        rawMaterialsTest.setDensity(0);
                    }
                    else
                        rawMaterialsTest.setDensity(-9999);


                    if (sewageTestService.getRawMaterialsTestById(id) == null) {
                        sewageTestService.addRawMaterialsTest(rawMaterialsTest);
                    }
                    else {
                        sewageTestService.updateRawMaterialsTestById(rawMaterialsTest);
                    }
                }
                res.put("status", "success");
                res.put("message", "收样成功");
            }else {
                res.put("status", "success");
                res.put("message", "请勾选需要签收的单据");
            }
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "收样失败");
        }
        return res.toString();
    }
}


