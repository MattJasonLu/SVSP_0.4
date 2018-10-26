package com.jdlink.controller;

import com.jdlink.domain.Produce.SewageTest;
import com.jdlink.service.SewageTestService;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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
                    //7碳酸盐碱度
                    if(data.get(i)[j][7]!="null"){
                        sewageTest.setAlkalinity(Float.parseFloat(data.get(i)[j][7].toString()));
                    }
                    if(data.get(i)[j][7]=="null"){
                        sewageTest.setAlkalinity(0);
                    }
                    //8重碳酸盐碱度
                    if(data.get(i)[j][8]!="null"){
                        sewageTest.setBicarbonate(Float.parseFloat(data.get(i)[j][8].toString()));
                    }
                    if(data.get(i)[j][8]=="null"){
                        sewageTest.setBicarbonate(0);
                    }
                    //总氮
                    if(data.get(i)[j][9]!="null"){
                        sewageTest.setNitrogen(Float.parseFloat(data.get(i)[j][9].toString()));
                    }
                    if(data.get(i)[j][9]=="null"){
                        sewageTest.setNitrogen(0);
                    }
                    //总磷
                    if(data.get(i)[j][10]!="null"){
                        sewageTest.setPhosphorus(Float.parseFloat(data.get(i)[j][10].toString()));
                    }
                    if(data.get(i)[j][10]=="null"){
                        sewageTest.setPhosphorus(0);
                    }
                    //备注
                    if(data.get(i)[j][11]!="null"){
                        sewageTest.setRemarks((data.get(i)[j][11].toString()));
                    }
                    if(data.get(i)[j][11]=="null"){
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

}
