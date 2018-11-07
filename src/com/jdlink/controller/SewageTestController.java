package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.produce.SewageTestService;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.List;

@Controller
public class SewageTestController {
    @Autowired
    SewageTestService sewageTestService;

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

                    //1化验单号
                    if(data.get(i)[j][1]!="null"){
                        sewageTest.setId(data.get(i)[j][1].toString());
                    }
                    if(data.get(i)[j][1]=="null"){
                        sewageTest.setId(null);//
                    }
                    //2采样点
                    if(data.get(i)[j][2]!="null"){
                        sewageTest.setAddress(data.get(i)[j][2].toString());
                    }
                    if(data.get(i)[j][2]=="null"){
                        sewageTest.setAddress("");//
                    }
                    //3ph
                    if(data.get(i)[j][3]!="null"){
                        sewageTest.setPh(Float.parseFloat(data.get(i)[j][3].toString()));
                    }
                    if(data.get(i)[j][3]=="null"){
                        sewageTest.setPh(0);
                    }
                    //4COD
                    if(data.get(i)[j][4]!="null"){
                        sewageTest.setCOD(Float.parseFloat(data.get(i)[j][4].toString()));
                    }
                    if(data.get(i)[j][4]=="null"){
                        sewageTest.setCOD(0);
                    }
                    //5BOD
                    if(data.get(i)[j][5]!="null"){
                        sewageTest.setBOD5(Float.parseFloat(data.get(i)[j][5].toString()));
                    }
                    if(data.get(i)[j][5]=="null"){
                        sewageTest.setBOD5(0);
                    }
                    //6氨氮
                    if(data.get(i)[j][6]!="null"){
                        sewageTest.setN2(Float.parseFloat(data.get(i)[j][6].toString()));
                    }
                    if(data.get(i)[j][6]=="null"){
                        sewageTest.setN2(0);
                    }
                    //碳酸盐碱度Cao
                    if(data.get(i)[j][7]!="null"){
                        sewageTest.setAlkalinity(Float.parseFloat(data.get(i)[j][7].toString()));
                    }
                    if(data.get(i)[j][7]=="null"){
                        sewageTest.setAlkalinity(0);
                    }
                    //碳酸盐碱度CaCo3
                    if(data.get(i)[j][8]!="null"){
                        sewageTest.setAlkalinityCaCo3(Float.parseFloat(data.get(i)[j][8].toString()));
                    }
                    if(data.get(i)[j][8]=="null"){
                        sewageTest.setAlkalinityCaCo3(0);
                    }
                    //碳酸盐碱度HCO3-
                    if(data.get(i)[j][9]!="null"){
                        sewageTest.setAlkalinityHCO3(Float.parseFloat(data.get(i)[j][9].toString()));
                    }
                    if(data.get(i)[j][9]=="null"){
                        sewageTest.setAlkalinityHCO3(0);
                    }
                    //重碳酸盐碱度Cao
                    if(data.get(i)[j][10]!="null"){
                        sewageTest.setBicarbonate(Float.parseFloat(data.get(i)[j][10].toString()));
                    }
                    if(data.get(i)[j][10]=="null"){
                        sewageTest.setBicarbonate(0);
                    }
                    //重碳酸盐碱度CaCo3
                    if(data.get(i)[j][11]!="null"){
                        sewageTest.setBicarbonateCaCo3(Float.parseFloat(data.get(i)[j][11].toString()));
                    }
                    if(data.get(i)[j][11]=="null"){
                        sewageTest.setBicarbonateCaCo3(0);
                    }
                    //重碳酸盐碱度HCO3-
                    if(data.get(i)[j][12]!="null"){
                        sewageTest.setBicarbonateHCO3(Float.parseFloat(data.get(i)[j][12].toString()));
                    }
                    if(data.get(i)[j][12]=="null"){
                        sewageTest.setBicarbonateHCO3(0);
                    }


                    //总氮
                    if(data.get(i)[j][13]!="null"){
                        sewageTest.setNitrogen(Float.parseFloat(data.get(i)[j][13].toString()));
                    }
                    if(data.get(i)[j][13]=="null"){
                        sewageTest.setNitrogen(0);
                    }
                    //总磷
                    if(data.get(i)[j][14]!="null"){
                        sewageTest.setPhosphorus(Float.parseFloat(data.get(i)[j][14].toString()));
                    }
                    if(data.get(i)[j][14]=="null"){
                        sewageTest.setPhosphorus(0);
                    }
                    //备注
                    if(data.get(i)[j][15]!="null"){
                        sewageTest.setRemarks((data.get(i)[j][15].toString()));
                    }
                    if(data.get(i)[j][15]=="null"){
                        sewageTest.setRemarks("");
                    }
                    //判断化验单是否存在 存在就更新
                    //存在就更新
                    if(sewageTestService.getSewageTestById(data.get(i)[j][1].toString())!=null){
                         sewageTestService.updateSewageTestById(sewageTest);
                    }
                    //添加化验单对象
                    if(sewageTestService.getSewageTestById(data.get(i)[j][1].toString())==null){
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
                        softTest.setId(data.get(i)[j][1].toString());

                        if(data.get(i)[j][2]!="null"){
                            softTest.setAddress(data.get(i)[j][2].toString());
                        }
                        if(data.get(i)[j][2]=="null"){
                            softTest.setAddress("");
                        }
                        //浊度
                        if(data.get(i)[j][3]!="null"){
                            softTest.setTurbidity(Float.parseFloat(data.get(i)[j][3].toString()));
                        }
                        if(data.get(i)[j][3]=="null"){
                            softTest.setTurbidity(0);
                        }
                        //硬度
                        if(data.get(i)[j][4]!="null"){
                            softTest.setHardness(Float.parseFloat(data.get(i)[j][4].toString()));
                        }
                        if(data.get(i)[j][4]=="null"){
                            softTest.setHardness(0);
                        }
                        //ph
                        if(data.get(i)[j][5]!="null"){
                            softTest.setPH(Float.parseFloat(data.get(i)[j][5].toString()));
                        }

                        if(data.get(i)[j][5]=="null"){
                            softTest.setPH(0);
                        }

                        //电导率
                        if(data.get(i)[j][6]!="null"){
                            softTest.setElectricalConductivity(Float.parseFloat(data.get(i)[j][6].toString()));
                        }
                        if(data.get(i)[j][6]=="null"){
                            softTest.setElectricalConductivity(0);
                        }

                        //全碱度
                        if(data.get(i)[j][7]!="null"){
                            softTest.setBasicity(Float.parseFloat(data.get(i)[j][7].toString()));
                        }
                        if(data.get(i)[j][7]=="null"){
                            softTest.setBasicity(0);
                        }
                        //酚酞碱度
                        if(data.get(i)[j][8]!="null"){
                            softTest.setPhenolphthalein(Float.parseFloat(data.get(i)[j][8].toString()));
                        }
                        if(data.get(i)[j][8]=="null"){
                            softTest.setPhenolphthalein(0);
                        }
                        //备注
                        if(data.get(i)[j][9]!="null"){
                            softTest.setRemarks((data.get(i)[j][9].toString()));
                        }
                        if(data.get(i)[j][9]=="null"){
                            softTest.setRemarks("");
                        }
                        //根据化验单号查询对象 如果存在就更新 不存在就添加
                        if(sewageTestService.getSoftTestById(data.get(i)[j][1].toString())==null){
                            sewageTestService.addSoftTest(softTest);
                        }
                        if(sewageTestService.getSoftTestById(data.get(i)[j][1].toString())!=null){
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

        }
        catch (Exception e){


        }

        return res.toString();


    }

   //更新次生送样信息
    @RequestMapping("updateSecondarySample")
    @ResponseBody
    public String updateSecondarySample(@RequestBody SecondarySample secondarySample){
        JSONObject res=new JSONObject();

        try {
            //更新完成
        sewageTestService.updateSecondarySample(secondarySample);
        //删除字表
            sewageTestService.deleteSecondarySampleItem(secondarySample.getId());
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

                 //2日期
                 if(data[i][1].toString().indexOf("/")!=-1){
                     String  datestr=data[i][1].toString().replace("/","-");
                     SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
                     secondaryTest.setDateTime(simpleDateFormat.parse(datestr));
                 }

                 //3废物名称
                 secondaryTest.setWastesName(data[i][2].toString());

                 //4热灼减率
                 secondaryTest.setScorchingRate(Float.parseFloat(data[i][3].toString()));

                 //5水分
                 secondaryTest.setWater(Float.parseFloat(data[i][4].toString()));

                 //6备注
                 secondaryTest.setRemarks(data[i][5].toString());

                 //更加化验单号查询化验单信息
                 if(sewageTestService.getSecondaryTestById(data[i][0].toString())!=null){
                     //更新
                     sewageTestService.updateSecondaryTestById(secondaryTest);
                 }
                 if(sewageTestService.getSecondaryTestById(data[i][0].toString())==null){
                     //添加
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
}
