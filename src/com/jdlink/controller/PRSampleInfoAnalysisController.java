package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.FormType;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.ReceiveSampleAnalysis;
import com.jdlink.domain.Produce.SampleInfoAnalysis;
import com.jdlink.service.ClientService;
import com.jdlink.service.produce.ReceiveSampleAnalysisService;
import com.jdlink.service.produce.SampleInfoAnalysisService;
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
import java.nio.channels.FileLock;
import java.text.Normalizer;
import java.util.List;

@Controller
public class PRSampleInfoAnalysisController {

    @Autowired
    SampleInfoAnalysisService sampleInfoAnalysisService;
    @Autowired
    ClientService clientService;
    @Autowired
    ReceiveSampleAnalysisService receiveSampleAnalysisService;

    /**
     * 获取仓储部化验单的
     * @param sampleInfoAnalysis 仓储部化验单的查询参数
     * @return 查询所得数据
     */
    @RequestMapping("getSampleInfoAnalysis")
    @ResponseBody
    public String getSampleInfoAnalysis(@RequestBody SampleInfoAnalysis sampleInfoAnalysis) {
        JSONObject res = new JSONObject();
        try {
            List<SampleInfoAnalysis> sampleInfoAnalysisList = sampleInfoAnalysisService.get(sampleInfoAnalysis.getPage(), sampleInfoAnalysis);
            JSONArray data = JSONArray.fromArray(sampleInfoAnalysisList.toArray(new SampleInfoAnalysis[sampleInfoAnalysisList.size()]));
            res.put("status", "success");
            res.put("message", "仓储部化验单获取数据成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "仓储部化验单获取数据失败");
        }
        return res.toString();
    }

    /**
     * 通过编号获取仓储部化验单
     * @param id
     * @return
     */
    @RequestMapping("getSampleInfoAnalysisById")
    @ResponseBody
    public String getSampleInfoAnalysisById(String id) {
        JSONObject res = new JSONObject();
        try {
            SampleInfoAnalysis sampleInfoAnalysis = sampleInfoAnalysisService.getById(id);
            res.put("status", "success");
            res.put("message", "仓储部化验单获取数据成功");
            res.put("data", sampleInfoAnalysis);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "仓储部化验单获取数据失败");
        }
        return res.toString();
    }

    /**
     * 更新仓储部化验单
     * @param sampleInfoAnalysis
     * @return
     */
    @RequestMapping("updateSampleInfoAnalysisById")
    @ResponseBody
    public String updateSampleInfoAnalysisById(@RequestBody SampleInfoAnalysis sampleInfoAnalysis) {
        JSONObject res = new JSONObject();
        try {
            sampleInfoAnalysisService.update(sampleInfoAnalysis);
            res.put("status", "success");
            res.put("message", "仓储部化验单更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "仓储部化验单更新失败");
        }
        return res.toString();
    }

    /**
     * 获取仓储部化验单的数量
     * @param sampleInfoAnalysis 仓储部化验单的查询参数
     * @return 仓储部化验单的数量
     */
    @RequestMapping("countSampleInfoAnalysis")
    @ResponseBody
    public String countSampleInfoAnalysis(SampleInfoAnalysis sampleInfoAnalysis) {
        JSONObject res = new JSONObject();
        try {
            int count = sampleInfoAnalysisService.count(sampleInfoAnalysis);
            res.put("status", "success");
            res.put("message", "仓储部化验单获取数据成功");
            res.put("data", count);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "仓储部化验单获取数据失败");
        }
        return res.toString();
    }

    @RequestMapping("importSampleInfoAnalysis")
    @ResponseBody
    public String importSampleInfoAnalysis(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            // 获取危废入库的表格数据
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            System.out.println("数据为");
            System.out.println("列："+data[0].length+",行："+data.length);
            for(int i = 0; i < data.length;i++){
                for(int j = 0; j < data[0].length;j++){
                    System.out.print(data[i][j].toString()+" ");
                }
                System.out.println();
            }

            for (int i = 1; i < data.length; i++) {
                SampleInfoAnalysis sampleInfoAnalysis = new SampleInfoAnalysis();
                // 如果样品编号存在则赋值
                System.out.println("w:"+data[i][18].toString());
                if (!data[i][18].toString().trim().equals("") && data[i][18].toString() != null && !data[i][18].toString().equals("null")) {
                    System.out.println("q:"+data[i][18].toString().trim() );
                    sampleInfoAnalysis.setId(data[i][18].toString() + "R");
                    sampleInfoAnalysis.setSampleId(data[i][18].toString());
                    // 若不存在则赋联单编号
                } else {
                    sampleInfoAnalysis.setId(data[i][0].toString());
                }
                sampleInfoAnalysis.setTransferDraftId(data[i][0].toString());
                // 设置产废单位，若不存在则添加单位
                Client produceCompany = clientService.getByName(data[i][1].toString());
                if (produceCompany == null) {
                    produceCompany = new Client();
                    produceCompany.setClientId(clientService.getCurrentId());
                    produceCompany.setCompanyName(data[i][1].toString());
                    clientService.add(produceCompany);
                }
                sampleInfoAnalysis.setProduceCompany(produceCompany);
                sampleInfoAnalysis.setWastesName(data[i][2].toString());
                sampleInfoAnalysis.setWastesCode(data[i][3].toString());
                sampleInfoAnalysis.setWastesCategory(data[i][4].toString());
                // 设置进料方式
//                if (data[i][5].toString().contains("污泥")) {
//                    sampleInfoAnalysis.setHandleCategory(HandleCategory.Sludge);
//                } else if (data[i][5].toString().contains("废液")) {
//                    sampleInfoAnalysis.setHandleCategory(HandleCategory.WasteLiquid);
//                } else if (data[i][5].toString().contains("散料")) {
//                    sampleInfoAnalysis.setHandleCategory(HandleCategory.Bulk);
//                } else if (data[i][5].toString().contains("破碎")) {
//                    sampleInfoAnalysis.setHandleCategory(HandleCategory.Crushing);
//                } else if (data[i][5].toString().contains("悬挂")) {
//                    sampleInfoAnalysis.setHandleCategory(HandleCategory.Suspension);
//                } else if (data[i][5].toString().contains("精馏")) {
//                    sampleInfoAnalysis.setHandleCategory(HandleCategory.Distillation);
//                }
                // 设置废物形态
                if (data[i][5].toString().contains("固") && !data[i][5].toString().contains("不")) {
                    sampleInfoAnalysis.setFormType(FormType.Solid);
                } else if (data[i][5].toString().contains("半固")) {
                    sampleInfoAnalysis.setFormType(FormType.HalfSolid);
                } else if (data[i][5].toString().contains("液")) {
                    sampleInfoAnalysis.setFormType(FormType.Liquid);
                }
//                sampleInfoAnalysis.setSender(data[i][6].toString());
//                sampleInfoAnalysis.setSigner(data[i][7].toString());
                sampleInfoAnalysis.setPH(Float.parseFloat(data[i][6].toString()));
                sampleInfoAnalysis.setHeat(Float.parseFloat(data[i][7].toString()));
                sampleInfoAnalysis.setAsh(Float.parseFloat(data[i][8].toString()));
                sampleInfoAnalysis.setWater(Float.parseFloat(data[i][9].toString()));
                sampleInfoAnalysis.setFluorine(Float.parseFloat(data[i][10].toString()));
                sampleInfoAnalysis.setChlorine(Float.parseFloat(data[i][11].toString()));
                sampleInfoAnalysis.setSulfur(Float.parseFloat(data[i][12].toString()));
                sampleInfoAnalysis.setPhosphorus(Float.parseFloat(data[i][13].toString()));
                sampleInfoAnalysis.setFlashPoint(Float.parseFloat(data[i][14].toString()));
                sampleInfoAnalysis.setViscosity(data[i][15].toString());
                sampleInfoAnalysis.setHotMelt(data[i][16].toString());
//                sampleInfoAnalysis.setSignDate(DateUtil.getDateFromStr(data[i][19].toString()));
                sampleInfoAnalysis.setRemark(data[i][17].toString());
                sampleInfoAnalysis.setCheckState(CheckState.NewBuild);
                sampleInfoAnalysisService.add(sampleInfoAnalysis);
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (DuplicateKeyException e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "编号重复，导入失败");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败");
        }
        return res.toString();
    }

    @RequestMapping("setSampleInfoAnalysisInvalid")
    @ResponseBody
    public String setSampleInfoAnalysisInvalid(String id) {
        JSONObject res = new JSONObject();
        try {
            sampleInfoAnalysisService.setState(id, CheckState.Invalid);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }

    /**
     * 增加仓储部化验单
     * @param sampleInfoAnalysis 仓储部化验单
     * @return 添加成功与否
     */
    @RequestMapping("addSampleInfoAnalysis")
    @ResponseBody
    public String addSampleInfoAnalysis(@RequestBody SampleInfoAnalysis sampleInfoAnalysis,MultipartFile pictureFile) {
        JSONObject res = new JSONObject();
        try {
            // 增加
            sampleInfoAnalysis.setId(sampleInfoAnalysis.getTransferDraftId());
            sampleInfoAnalysis.setCheckState(CheckState.NewBuild);
            sampleInfoAnalysisService.add(sampleInfoAnalysis);
            res.put("status", "success");
            res.put("message", "增加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加失败");
        }
        return res.toString();
    }

    /**
     * 危废入厂分析日报导出(带表头字段)
     *
     * @param name
     * @param response
     * @param sqlWords
     * @return
     */
    @RequestMapping("exportExcelWastesDaily")
    @ResponseBody
    public String exportExcelWastesDaily(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            // 设置表头
            String tableHead = "联单号/产废单位/危废名称/危废代码/危废形态/PH/灰分/水分/热值/硫含量/氯含量/氟含量/磷含量/闪点/黏度/热融";
            if(name.equals("wastesAnalysis")){
                name = "危废入厂分析日报";   // 重写文件名
            }else{
                name= "仓储部化验结果";
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
     * 仓储部与市场部的比较
     */
    @RequestMapping("comparison")
    @ResponseBody
    public String comparison(@RequestBody SampleInfoAnalysis sampleInfoAnalysis){
        JSONObject res=new JSONObject();

        try {

            //1先找出仓储部的化验信息
            SampleInfoAnalysis sampleInfoAnalysis1 = sampleInfoAnalysisService.getById(sampleInfoAnalysis.getId());

            //2再找出符合条件市场部化验信息  ReceiveSampleAnalysis
            List<ReceiveSampleAnalysis> receiveSampleAnalysisList=sampleInfoAnalysisService.getByMoreFactor(sampleInfoAnalysis.getProduceCompany().getClientId(),sampleInfoAnalysis.getWastesCode(),sampleInfoAnalysis.getWastesName());


            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("sampleInfoAnalysis", sampleInfoAnalysis1);
            res.put("receiveSampleAnalysisList", receiveSampleAnalysisList);



        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }

        return res.toString();
    }


}
