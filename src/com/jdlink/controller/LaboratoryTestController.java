package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.HeavyMetal;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.domain.Produce.Parameter;
import com.jdlink.service.ClientService;
import com.jdlink.service.LaboratoryTestService;
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
import java.util.ArrayList;
import java.util.List;

/**
 * 化验单控制器
 */
@Controller
public class LaboratoryTestController {

    /**
     * 化验单事务
     */
    @Autowired
    LaboratoryTestService laboratoryTestService;
    @Autowired
    ClientService clientService;

    /**
     * 获取化验单列表
     * @return 化验单列表
     */
    @RequestMapping("loadPageLaboratoryTestList")
    @ResponseBody
    public String loadPageLaboratoryTestList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 列出所有化验单对象，获取列表
            List<LaboratoryTest> laboratoryTestList = laboratoryTestService.list(page);
            JSONArray data = JSONArray.fromArray(laboratoryTestList.toArray(new LaboratoryTest[laboratoryTestList.size()]));
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

    /**
     * 获取所有数据数量
     * @return 数据数量
     */
    @RequestMapping("totalLaboratoryTestRecord")
    @ResponseBody
    public int totalLaboratoryTestRecord(){
        try {
            return laboratoryTestService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询数据
     * @param laboratoryTest 参数
     * @return 查询到的数据
     */
    @RequestMapping("searchLaboratoryTest")
    @ResponseBody
    public String searchLaboratoryTest(@RequestBody LaboratoryTest laboratoryTest) {
        JSONObject res = new JSONObject();
        try {
            List<LaboratoryTest> laboratoryTestList = laboratoryTestService.search(laboratoryTest);
            JSONArray data = JSONArray.fromArray(laboratoryTestList.toArray(new LaboratoryTest[laboratoryTestList.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    /**
     * 查询数据的数量
     * @param laboratoryTest
     * @return
     */
    @RequestMapping("searchLaboratoryTestTotal")
    @ResponseBody
    public int searchLaboratoryTestTotal(@RequestBody LaboratoryTest laboratoryTest){
        try {
            return laboratoryTestService.searchCount(laboratoryTest);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 导入excel文件来增加化验单
     * @param excelFile 化验单excel文件
     * @return 导入成功与否
     */
    @RequestMapping("importLaboratoryTestExcel")
    @ResponseBody
    public String importLaboratoryTestExcel(MultipartFile excelFile){
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile);
            // 化验单对象
            LaboratoryTest laboratoryTest = new LaboratoryTest();
            List<Wastes> wastesList = new ArrayList<>();
            for (int i = 0; i < data.length; i++) {
                if (i == 2) {
                    // 创建客户对象
                    Client client = new Client();
                    client.setCompanyName(data[i][0].toString());
                    // 通过客户名称查询到客户，若不存在则添加，否则直接更新
                    Client oldClient = clientService.getByName(client.getCompanyName());
                    if (oldClient == null) {
                        client.setClientId(clientService.getCurrentId());
                        client.setLocation(data[i][1].toString());
                        client.setContactName(data[i][2].toString());
                        client.setPhone(data[i][3].toString());
                        client.setIndustry(data[i][4].toString());
                        client.setProduct(data[i][5].toString());
                        clientService.add(client);
                    } else {
                        client = oldClient;
                    }
                    // 化验单数据
                    laboratoryTest.setClient(client);
                    laboratoryTest.setRecord(data[i][6].toString());
                    laboratoryTest.setRecordDate(DateUtil.getDateFromStr(data[i][7].toString()));
                    laboratoryTest.setLaboratory(data[i][8].toString());
                    laboratoryTest.setLaboratoryDate(DateUtil.getDateFromStr(data[i][9].toString()));
                    laboratoryTest.setLaboratoryCompany(data[i][10].toString());
                }
                if (i >= 2) {
                    Wastes wastes = new Wastes();
                    wastes.setId(RandomUtil.getRandomEightNumber());
                    wastes.setSamplingDate(DateUtil.getDateFromStr(data[i][11].toString()));
                    wastes.setName(data[i][12].toString());
                    wastes.setWastesId(data[i][13].toString());
                    wastes.setSamplingNumber(data[i][14].toString());
                    wastes.setTestDate(DateUtil.getDateFromStr(data[i][15].toString()));
                    wastes.setIsProductionLine(data[i][16] != null && data[i][16].toString().equals("√"));
                    wastes.setIsStorageArea(data[i][17] != null && data[i][17].toString().equals("√"));
                    // 参数列表
                    List<MixingElement> parameterList = new ArrayList<>();
                    for (int j = 0, k = 18; j < Parameter.values().length; j++, k+=3) {
                        if (data[i][k] != null || data[i][k+1] != null || data[i][k+2] != null) {
                            MixingElement parameter = new MixingElement();
                            parameter.setId(RandomUtil.getRandomEightNumber());
                            parameter.setParameter(Parameter.values()[j]);
                            parameter.setMinimum(Float.parseFloat(data[i][k].toString()));
                            parameter.setAverage(Float.parseFloat(data[i][k+1].toString()));
                            parameter.setMaximum(Float.parseFloat(data[i][k+2].toString()));
                            parameterList.add(parameter);
                        }
                    }
                    for (int j = 0, k = 57; j < 3; j++, k+=3) {
                        if (data[i][k] != null || data[i][k+1] != null || data[i][k+2] != null) {
                            MixingElement parameter = new MixingElement();
                            parameter.setId(RandomUtil.getRandomEightNumber());
                            parameter.setName("其他" + (j+1));
                            parameter.setMinimum(Float.parseFloat(data[i][k].toString()));
                            parameter.setAverage(Float.parseFloat(data[i][k+1].toString()));
                            parameter.setMaximum(Float.parseFloat(data[i][k+2].toString()));
                            parameterList.add(parameter);
                        }
                    }
                    // 重金属列表
                    List<MixingElement> heavyMetalList = new ArrayList<>();
                    for (int j = 0, k = 66; j < HeavyMetal.values().length; j++, k+=3) {
                        if (data[i][k] != null || data[i][k+1] != null || data[i][k+2] != null) {
                            MixingElement heavyMetal = new MixingElement();
                            heavyMetal.setId(RandomUtil.getRandomEightNumber());
                            heavyMetal.setHeavyMetal(HeavyMetal.values()[j]);
                            heavyMetal.setMinimum(Float.parseFloat(data[i][k].toString()));
                            heavyMetal.setAverage(Float.parseFloat(data[i][k+1].toString()));
                            heavyMetal.setMaximum(Float.parseFloat(data[i][k+2].toString()));
                            heavyMetalList.add(heavyMetal);
                        }
                    }
                    for (int j = 0, k = 144; j < 4; j++, k+=3) {
                        if (data[i][k] != null || data[i][k+1] != null || data[i][k+2] != null) {
                            MixingElement heavyMetal = new MixingElement();
                            heavyMetal.setId(RandomUtil.getRandomEightNumber());
                            heavyMetal.setName("其他" + (j+1));
                            heavyMetal.setMinimum(Float.parseFloat(data[i][k].toString()));
                            heavyMetal.setAverage(Float.parseFloat(data[i][k+1].toString()));
                            heavyMetal.setMaximum(Float.parseFloat(data[i][k+2].toString()));
                            heavyMetalList.add(heavyMetal);
                        }
                    }
                    // 设置列表
                    wastes.setParameterList(parameterList);
                    wastes.setHeavyMetalList(heavyMetalList);
                    wastesList.add(wastes);
                }
            }
            laboratoryTest.setWastesList(wastesList);
            // 设置状态为待提交
            laboratoryTest.setCheckState(CheckState.ToSubmit);
            // 设置编号
            laboratoryTest.setLaboratoryTestNumber(laboratoryTestService.getCurrentId());
            laboratoryTest.setQueryNumber(RandomUtil.getRandomEightNumber());
            laboratoryTestService.add(laboratoryTest);
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请检查文件！");
            res.put("exception", e.getMessage());
        }
        return res.toString();

    }

    /**
     * 获取目前的客户编号
     * @return 客户编号
     */
    @RequestMapping("getCurrentLaboratoryTestId")
    @ResponseBody
    public String getCurrentLaboratoryTestId() {
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
        int index = laboratoryTestService.count();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (laboratoryTestService.getLaboratoryTestById(id) != null);
        JSONObject res = new JSONObject();
        res.put("laboratoryTestId", id);
        return res.toString();
    }

    /**
     * 获取化验单对象
     * @param laboratoryTestNumber 化验单号
     * @return 化验单对象
     */
    @RequestMapping("getLaboratoryTest")
    @ResponseBody
    public String getLaboratoryTest(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            // 通过化验单号拿到对应的数据
            LaboratoryTest laboratoryTest = laboratoryTestService.getLaboratoryTestById(laboratoryTestNumber);
            // 制作json数据
            JSONObject data = JSONObject.fromBean(laboratoryTest);
            res.put("status","success");
            res.put("message","查看成功");
            // 放入数据
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","查看失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单状态为作废
     * @param laboratoryTestNumber 化验单号
     * @return 作废成功与否
     */
    @RequestMapping("setLaboratoryTestInvalid")
    @ResponseBody
    public String setInvalid(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.setInvalid(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","作废失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单状态为已化验
     * @param laboratoryTestNumber 化验单号
     * @return 成功与否
     */
    @RequestMapping("setLaboratoryTestTested")
    @ResponseBody
    public String setTested(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.setTested(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","化验成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","化验失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单对象状态为已化验
     * @param laboratoryTestNumber 化验单号
     * @return 成功与否
     */
    @RequestMapping("setLaboratoryTestSubmit")
    @ResponseBody
    public String submit(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.submit(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","提交成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","提交失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单对象状态为已确认
     * @param laboratoryTestNumber 化验单号
     * @return 成功与否
     */
    @RequestMapping("setLaboratoryTestConfirm")
    @ResponseBody
    public String confirm(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.confirm(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","确认成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","确认失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }
}
