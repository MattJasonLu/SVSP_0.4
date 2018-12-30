package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.ReceiveSampleAnalysis;
import com.jdlink.domain.Produce.SampleInfoAnalysis;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Produce.SampleInformationItem;
import com.jdlink.service.ClientService;
import com.jdlink.service.SampleInfoWareHouseService;
import com.jdlink.service.produce.SampleInfoAnalysisService;
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

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class PRSampleInfoWareHouseController {

    @Autowired
    SampleInfoWareHouseService sampleInfoWareHouseService;
    @Autowired
    ClientService clientService;
    @Autowired
    SampleInfoAnalysisService sampleInfoAnalysisService;

    /**
     * 增加样品登记预约单
     *
     * @param sampleInformation 样品信息预约单
     * @return 成功与否
     */
    @RequestMapping("addSampleInfoWareHouse")
    @ResponseBody
    public String addSampleAppoint(@RequestBody SampleInformation sampleInformation) {
        JSONObject res = new JSONObject();
        try {
            sampleInformation.setCreationDate(new Date());
            // sampleInformation.setApplyState(ApplyState.Appointed);
            // 添加预约登记表
            sampleInfoWareHouseService.add(sampleInformation);
            res.put("status", "success");
            res.put("message", "增加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }


    @RequestMapping("getCurrentSampleInformationWareHouseId")
    @ResponseBody
    public String getCurrentSampleInformationId(String companyCode) {
        // 生成预约号
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String prefix = simpleDateFormat.format(date) + companyCode;
        int count = sampleInfoWareHouseService.countById(prefix) + 1;
        String suffix;
        if (count <= 9) suffix = "0" + count;
        else suffix = count + "";
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (sampleInfoWareHouseService.getBySampleInformationId(id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id = index + "";
        }
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    @RequestMapping("getCurrentWareHouseWastesId")
    @ResponseBody
    public String getCurrentWastesId(String sampleId) {
        String id;
        int index = sampleInfoWareHouseService.wastesCountById(sampleId);
        // 获取唯一的编号
        do {
            index += 1;
            String index1 = index + "";
            if (index < 10) index1 = "000" + index;
            else if (index < 100) index1 = "00" + index;
            else if (index < 1000) index1 = "0" + index;
            id = sampleId + index1;
        } while (sampleInfoWareHouseService.getByWastesId(id) != null);
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    @RequestMapping("getWareHouseWastesByWastesId")
    @ResponseBody
    public String getWastesByWastesId(String id) {
        JSONObject res = new JSONObject();
        try {
            Wastes wastes = sampleInfoWareHouseService.getByWastesId(id);
            res.put("data", wastes);
            res.put("status", "success");
            res.put("message", "查询成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }


    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalSampleInformationWareHouseRecord")
    @ResponseBody
    public int totalSampleInformationRecord() {
        try {
            return sampleInfoWareHouseService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取明细总记录数
     *
     * @return
     */
    @RequestMapping("totalSampleInformationWareHouseItemRecord")
    @ResponseBody
    public int totalSampleInformationWareHouseItemRecord() {
        try {
            return sampleInfoWareHouseService.countItem();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取分页数据
     *
     * @param page
     * @return
     */
    @RequestMapping("loadPageSampleInformationWareHouseList")
    @ResponseBody
    public String loadPageSampleInformationList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<SampleInformation> samplesInformationList = sampleInfoWareHouseService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(samplesInformationList.toArray(new SampleInformation[samplesInformationList.size()]));
            res.put("data", array);
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

    /**
     * 获取明细页面分页数据
     *
     * @param page
     * @return
     */
    @RequestMapping("loadPageSampleInformationWareHouseItemList")
    @ResponseBody
    public String loadPageSampleInformationWareHouseItemList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<SampleInformationItem> sampleInformationItemList = sampleInfoWareHouseService.listItemPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(sampleInformationItemList.toArray(new SampleInformationItem[sampleInformationItemList.size()]));
            res.put("data", array);
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

    @RequestMapping("getSampleInformationWareHouse")
    @ResponseBody
    public String getSampleInformation(String sampleId) {
        JSONObject res = new JSONObject();
        try {
            //根据公司代码查询出相应的对象信息
            SampleInformation sampleInformation = sampleInfoWareHouseService.getById(sampleId);
            //新建一个对象并给它赋值为sampleInformation
            JSONObject data = JSONObject.fromBean(sampleInformation);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "查看数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查看数据失败");
        }
        return res.toString();
    }

    @RequestMapping("getSampleInformationWareHouseByTransferId")
    @ResponseBody
    public int getSampleInformationWareHouseByTransferId(String transferId) {
        int count = sampleInfoWareHouseService.getCountByTransferId(transferId);
        //新建一个对象并给它赋值为sampleInformation
        return count;
    }

    @RequestMapping("confirmSampleInformationWareHouseCheck")
    @ResponseBody
    public String confirmSampleInformationCheck(String sampleId, String laboratorySigner) {
        JSONObject res = new JSONObject();
        try {
            sampleInfoWareHouseService.confirmCheck(sampleId, laboratorySigner);
            // 创建化验单
            SampleInformation sampleInformation = sampleInfoWareHouseService.getById(sampleId);

            if (sampleInformation.getWastesList() != null && sampleInformation.getWastesList().size() > 0) {
                for (Wastes wastes : sampleInformation.getWastesList()) {
                    SampleInfoAnalysis sampleAnalysis = new SampleInfoAnalysis();
                    sampleAnalysis.setId(sampleInformation.getId());
                    sampleAnalysis.setSampleId(sampleInformation.getId());
                    sampleAnalysis.setSignDate(new Date());   // 签收日期
                    sampleAnalysis.setWastesName(wastes.getName());
                    sampleAnalysis.setWastesCode(wastes.getCode());
                    sampleAnalysis.setTransferDraftId(wastes.getTransferId());
                    Client produceCompany = new Client();
                    produceCompany.setClientId(sampleInformation.getCompanyCode());
                    produceCompany.setCompanyName(sampleInformation.getCompanyName());
                    sampleAnalysis.setProduceCompany(produceCompany);
                    sampleAnalysis.setFormType(wastes.getFormType());
                    sampleAnalysis.setSender(sampleInformation.getSendingPerson());
                    sampleAnalysis.setSigner(sampleInformation.getLaboratorySigner());
                    sampleAnalysis.setCheckState(CheckState.NewBuild);
                    if (wastes.getIsPH()) {
                        sampleAnalysis.setPH(0); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setPH(-9999);  // 如果不存在则设置为不可能值-9999
                    }
                    if (wastes.getIsAsh()) {
                        sampleAnalysis.setAsh(0); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setAsh(-9999);  // 如果不存在则设置为不可能值-9999
                    }
                    if (wastes.getIsWater()) {
                        sampleAnalysis.setWater(0); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setWater(-9999);  // 如果不存在则设置为不可能值-9999
                    }
                    if (wastes.getIsHeat()) {
                        sampleAnalysis.setHeat(0); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setHeat(-9999);  // 如果不存在则设置为不可能值-9999
                    }
                    if (wastes.getIsSulfur()) {
                        sampleAnalysis.setSulfur(0); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setSulfur(-9999);  // 如果不存在则设置为不可能值-9999
                    }
                    if (wastes.getIsChlorine()) {
                        sampleAnalysis.setChlorine(0); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setChlorine(-9999);  // 如果不存在则设置为不可能值-9999
                    }
                    if (wastes.getIsFluorine()) {
                        sampleAnalysis.setFluorine(0); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setFluorine(-9999);  // 如果不存在则设置为不可能值-9999
                    }
                    if (wastes.getIsPhosphorus()) {
                        sampleAnalysis.setPhosphorus(0); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setPhosphorus(-9999);  // 如果不存在则设置为不可能值-9999
                    }
                    if (wastes.getIsFlashPoint()) {
                        sampleAnalysis.setFlashPoint(0); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setFlashPoint(-9999);  // 如果不存在则设置为不可能值-9999
                    }
                    if (wastes.getIsViscosity()) {
                        sampleAnalysis.setViscosity("0"); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setViscosity("-9999");  // 如果不存在则设置为不可能值-9999
                    }
                    if (wastes.getIsHotMelt()) {
                        sampleAnalysis.setHotMelt("0"); // 如果检测项目存在设置初始值为0
                    } else {
                        sampleAnalysis.setHotMelt("-9999");  // 如果不存在则设置为不可能值-9999
                    }
                    sampleInfoAnalysisService.add(sampleAnalysis);  // 添加新的化验结果单
                }
            }
            res.put("status", "success");
            res.put("message", "确认登记成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "确认登记失败！");
        }
        return res.toString();
    }

    @RequestMapping("updateSampleInformationWareHouse")
    @ResponseBody
    public String updateSampleInformation(@RequestBody SampleInformation sampleInformation) {
        JSONObject res = new JSONObject();
        try {
            //   sampleInfoWareHouseService.deleteById(sampleInformation.getId()); // 删除旧数据
            sampleInfoWareHouseService.update(sampleInformation);       // 添加新数据
            System.out.println("更新的数据为：");
            System.out.println(sampleInformation.getWastesList().size());
            System.out.println(sampleInformation);
            res.put("status", "success");
            res.put("message", "登记单修改成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "登记单修改失败！");
        }
        return res.toString();
    }

    @RequestMapping("cancelSampleInformationWareHouse")
    @ResponseBody
    public String cancelSampleInformation(String sampleId) {
        JSONObject res = new JSONObject();
        try {
            String newId = "I-" + sampleId;
            sampleInfoWareHouseService.updateSampleInfo(sampleId, newId);
            res.put("status", "success");
            res.put("message", "作废数据成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废数据失败！");
        }
        return res.toString();
    }

    @RequestMapping("searchSampleInfoWareHouseTotal")
    @ResponseBody
    public int searchsampleInfoTotal(@RequestBody SampleInformation sampleInformation) {
        try {
            return sampleInfoWareHouseService.searchCount(sampleInformation);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("searchSampleInfoWareHouseItemTotal")
    @ResponseBody
    public int searchSampleInfoWareHouseItemTotal(@RequestBody SampleInformationItem sampleInformationItem) {
        try {
            return sampleInfoWareHouseService.searchItemCount(sampleInformationItem);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param sampleInformationItem
     * @return
     */
    @RequestMapping("searchSampleInfoWareHouseItem")
    @ResponseBody
    public String searchSampleInfoWareHouseItem(@RequestBody SampleInformationItem sampleInformationItem) {
        JSONObject res = new JSONObject();
        try {
            List<SampleInformationItem> sampleInformationItemList = sampleInfoWareHouseService.searchItem(sampleInformationItem);
            JSONArray data = JSONArray.fromArray(sampleInformationItemList.toArray(new SampleInformationItem[sampleInformationItemList.size()]));
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
     * 查询功能
     *
     * @param sampleInformation
     * @return
     */
    @RequestMapping("searchSampleInfoWareHouse")
    @ResponseBody
    public String searchSampleInfoWareHouseItem(@RequestBody SampleInformation sampleInformation) {
        JSONObject res = new JSONObject();
        try {
            List<SampleInformation> sampleInformationList = sampleInfoWareHouseService.search(sampleInformation);
            JSONArray data = JSONArray.fromArray(sampleInformationList.toArray(new SampleInformation[sampleInformationList.size()]));
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

    @RequestMapping("getSampleInfoWareHouseSeniorSelectedList")
    @ResponseBody
    public String getSampleInfoSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        ApplyState[] applyStates = new ApplyState[]{ApplyState.ToCollected, ApplyState.Received, ApplyState.Rejected, ApplyState.Invalid};
        JSONArray applyStateList = JSONArray.fromArray(applyStates);
        res.put("applyStateList", applyStateList);
        return res.toString();
    }

    /**
     * 拒收功能
     *
     * @param id
     * @param advice
     * @return
     */
    @RequestMapping("rejectSampleInfoWareHouseById")
    @ResponseBody
    public String rejectSampleInfoById(String id, String advice) {
        JSONObject res = new JSONObject();
        try {
            sampleInfoWareHouseService.rejectSampleInfoById(id, advice);
            res.put("status", "success");
            res.put("message", "拒收成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "拒收失败");
        }
        return res.toString();
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importSampleWareHouseExcel")
    @ResponseBody
    public String importSampleWareHouseExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            {
                System.out.println("数据如下：");
                for (int i = 1; i < data.length; i++) {
                    for (int j = 0; j < data[1].length; j++) {
                        System.out.print(data[i][j].toString());
                        System.out.print(",");
                    }
                    System.out.println();
                }
            }
            Map<String, SampleInformation> map = new HashMap<>();
            List<Wastes> wastesList = new ArrayList<>();
            String id1 = "";
            for (int i = 2; i < data.length; i++) {
                String id = data[i][0].toString();
                Wastes wastes = new Wastes();
                //map内不存在即添加公共数据，存在即添加List内数据
                if (!map.keySet().contains(id)) {
                    map.put(id, new SampleInformation());
                    map.get(id).setId(id);
                    map.get(id).setNewId(id);
                    String companyName = data[i][1].toString().trim();
                    Client client = clientService.getClientByCompanyName(companyName);
                    String produceCompanyId = "";
                    if (client != null)
                        produceCompanyId = client.getClientId();
                    if (produceCompanyId != null && produceCompanyId != "") {
                        map.get(id).setCompanyCode(produceCompanyId);
                    } else {
                        res.put("status", "fail");
                        res.put("message", companyName + "不存在，请备案后再导入！");
                        return res.toString();
                    }
                    map.get(id).setCompanyName(companyName);
                    map.get(id).setSendingPerson(data[i][2].toString());
                    map.get(id).setCreationDate(DateUtil.getDateFromStr(data[i][18].toString()));
                    //新存储一个id对象时，将以下两个累计数据清零
                    wastesList = new ArrayList<>();
                    int index = sampleInfoWareHouseService.wastesCountById(id);  // 设置危废ID
                    // 获取唯一的编号
                    do {
                        index += 1;
                        String index1 = index + "";
                        if (index < 10) index1 = "000" + index;
                        else if (index < 100) index1 = "00" + index;
                        else if (index < 1000) index1 = "0" + index;
                        id1 = id + index1;
                    } while (sampleInfoWareHouseService.getByWastesId(id) != null);
                } else {
                    int index1 = Integer.parseInt(id1.substring(id1.length() - 5)); // 截取ID后五位，然后叠加
                    String index2 = id1.substring(0, id1.length() - 5); // 截取ID前几位
                    index1++;
                    id1 = index2 + index1;  // 拼接ID
                }
                wastes.setId(id1);
                wastes.setCode(data[i][3].toString());
                wastes.setName(data[i][4].toString());
                wastes.setCategory(data[i][5].toString());
                switch (data[i][6].toString()) { // 设置危废形态
                    case "液态":
                        wastes.setFormType(FormType.Liquid);
                        break;
                    case "固态":
                        wastes.setFormType(FormType.Solid);
                        break;
                    case "半固态":
                        wastes.setFormType(FormType.HalfSolid);
                        break;
                    case "固态+半固态":
                        wastes.setFormType(FormType.Solid1AndHalfSolid);
                        break;
                    case "半固态+固态":
                        wastes.setFormType(FormType.Solid1AndHalfSolid);
                        break;
                    case "半固态+液态":
                        wastes.setFormType(FormType.HalfSolidAndLiquid);
                        break;
                    case "液态+半固态":
                        wastes.setFormType(FormType.HalfSolidAndLiquid);
                        break;
                    case "固态+液态":
                        wastes.setFormType(FormType.Solid1AndLiquid);
                        break;
                    case "液态+固态":
                        wastes.setFormType(FormType.Solid1AndLiquid);
                        break;
                }
                // 设置检测项目
                if (!data[i][7].toString().equals("null") && (data[i][7].toString().equals("R") || data[i][7].toString().equals("1") || data[i][7].toString().equals("1.0")))
                    wastes.setIsPH(true);
                if (!data[i][8].toString().equals("null") && (data[i][8].toString().equals("R") || data[i][8].toString().equals("1") || data[i][8].toString().equals("1.0")))
                    wastes.setIsAsh(true);
                if (!data[i][9].toString().equals("null") && (data[i][9].toString().equals("R") || data[i][9].toString().equals("1") || data[i][9].toString().equals("1.0")))
                    wastes.setIsWater(true);
                if (!data[i][10].toString().equals("null") && (data[i][10].toString().equals("R") || data[i][10].toString().equals("1") || data[i][10].toString().equals("1.0")))
                    wastes.setIsHeat(true);
                if (!data[i][11].toString().equals("null") && (data[i][11].toString().equals("R") || data[i][11].toString().equals("1") || data[i][11].toString().equals("1.0")))
                    wastes.setIsSulfur(true);
                if (!data[i][12].toString().equals("null") && (data[i][12].toString().equals("R") || data[i][12].toString().equals("1") || data[i][12].toString().equals("1.0")))
                    wastes.setIsChlorine(true);
                if (!data[i][13].toString().equals("null") && (data[i][13].toString().equals("R") || data[i][13].toString().equals("1") || data[i][13].toString().equals("1.0")))
                    wastes.setIsFluorine(true);
                if (!data[i][14].toString().equals("null") && (data[i][14].toString().equals("R") || data[i][14].toString().equals("1") || data[i][14].toString().equals("1.0")))
                    wastes.setIsPhosphorus(true);
                if (!data[i][15].toString().equals("null") && (data[i][15].toString().equals("R") || data[i][15].toString().equals("1") || data[i][15].toString().equals("1.0")))
                    wastes.setIsFlashPoint(true);
                if (!data[i][16].toString().equals("null") && (data[i][16].toString().equals("R") || data[i][16].toString().equals("1") || data[i][16].toString().equals("1.0")))
                    wastes.setIsViscosity(true);
                if (!data[i][17].toString().equals("null") && (data[i][17].toString().equals("R") || data[i][17].toString().equals("1") || data[i][17].toString().equals("1.0")))
                    wastes.setIsHotMelt(true);
                wastes.setTransferId(data[i][19].toString());
                wastesList.add(wastes);
                map.get(id).setWastesList(wastesList);
            }
            for (String key : map.keySet()) {
                // 根据联单编号获取数据
                int count = sampleInfoWareHouseService.getCountByTransferId(map.get(key).getWastesList().get(0).getTransferId());
                SampleInformation sampleInformation = map.get(key);
                if (count == 0) {  // 不存在则新增
                    //插入新数据
                    sampleInfoWareHouseService.add(sampleInformation);
                } else {  // 存在则更新
                    //根据id更新数据
                    sampleInfoWareHouseService.update(sampleInformation);
                }
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
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
    @RequestMapping("exportExcelSampleInfoWareHouse")
    @ResponseBody
    public String exportExcel(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            // 设置表头
            String tableHead = "联单编号/产废单位/危废名称/危废代码/危废类别/危废形态/送样人/PH/热值/灰分/水分/氟/氯/硫/磷/闪点/黏度/热融/预约单号";
            name = "仓储部送样登记单";   // 重写文件名
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

}
