package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.Pounds;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.domain.Produce.WayBillItem;
import com.jdlink.service.PoundsService;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PRPoundsController {

    @Autowired
    PoundsService poundsService;

    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalPoundsRecord")
    @ResponseBody
    public int totalPoundsRecord() {
        try {
            return poundsService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPagePoundsList")
    @ResponseBody
    public String loadPagePoundsList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<Pounds> poundsList = poundsService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(poundsList.toArray(new Pounds[poundsList.size()]));
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

    @RequestMapping("getPounds")
    @ResponseBody
    public String getWayBill(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            Pounds pounds = poundsService.getById(id);
            //新建一个对象并给它赋值为wayBill
            JSONObject data = JSONObject.fromBean(pounds);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /**
     * 获取目前的磅单编号
     *
     * @return
     */
    @RequestMapping("getCurrentPoundsId")
    @ResponseBody
    public String getCurrentWayBillId() {
        String id = poundsService.getCurrentPoundsId();
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    /**
     * 导入
     * @param excelFile
     * @return
     */
    @RequestMapping("importPoundsExcel")
    @ResponseBody
    public String importPoundsExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile);
            for (int i = 0; i < data.length; i++) {
                System.out.println();
                for (int j = 0; j < data[0].length; j++) {
                    System.out.print(data[i][j].toString() + ',');
                }
            }
            for (int i = 1; i < data.length; i++) {
                Pounds pounds = new Pounds();
                pounds.setId(poundsService.getCurrentPoundsId());
                pounds.setTransferId(data[i][0].toString());
                pounds.setEnterLicencePlate(data[i][1].toString());
                pounds.setGoodsName(data[i][2].toString());
                pounds.setGrossWeight(Float.parseFloat(data[i][3].toString()));
                pounds.setNetWeight(Float.parseFloat(data[i][4].toString()));
                pounds.setTare(Float.parseFloat(data[i][5].toString()));
                Client deliveryCompany = new Client();
                deliveryCompany.setClientId(poundsService.getClientIdByName(data[i][6].toString()));
                pounds.setDeliveryCompany(deliveryCompany);
                Client receiveCompany = new Client();
                receiveCompany.setClientId(poundsService.getClientIdByName(data[i][7].toString()));
                pounds.setReceiveCompany(receiveCompany);
                pounds.setBusinessType(data[i][8].toString());
                pounds.setEnterTime(DateUtil.getDateTimeFromStr(data[i][9].toString()));
                pounds.setOutTime(DateUtil.getDateTimeFromStr(data[i][10].toString()));
                pounds.setDriver(data[i][11].toString());
                pounds.setWeighman(data[i][12].toString());
                pounds.setRemarks(data[i][13].toString());
                pounds.setOutLicencePlate(data[i][14].toString());
                pounds.setFounder(data[i][15].toString());
                pounds.setCreationDate(new Date());
                Pounds pounds1 = poundsService.getByTransferId(pounds.getTransferId());
                if (pounds1 != null) {
                    res.put("status", "fail");
                    res.put("message", "转移联单号已存在，请检查！");
                } else {
                    poundsService.add(pounds);
                    res.put("status", "success");
                    res.put("message", "导入成功");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();
    }

    @RequestMapping("getPoundsSeniorSelectedList")
    @ResponseBody
    public String getPoundsSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        CheckState[] states = new CheckState[]{CheckState.Confirm, CheckState.Invalid};
        JSONArray stateList = JSONArray.fromArray(states);
        res.put("stateList", stateList);
        return res.toString();
    }

    @RequestMapping("searchPoundsTotal")
    @ResponseBody
    public int searchWayBillTotal(@RequestBody Pounds pounds) {
        try {
            return poundsService.searchCount(pounds);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

//    @RequestMapping("getClientIdByName")
//    @ResponseBody
//    public String getClientIdByName(String name){
//        JSONObject res = new JSONObject();
//        try{
//            String id = poundsService.getClientIdByName(name);
//            res.put("id",id);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return res.toString();
//    }

    /**
     * 查询功能
     *
     * @param pounds
     * @return
     */
    @RequestMapping("searchPounds")
    @ResponseBody
    public String searchSampleInfo(@RequestBody Pounds pounds) {
        JSONObject res = new JSONObject();
        try {
            List<Pounds> poundsList = poundsService.search(pounds);
            JSONArray data = JSONArray.fromArray(poundsList.toArray(new Pounds[poundsList.size()]));
            System.out.println(data);
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

    @RequestMapping("invalidPounds")
    @ResponseBody
    public String invalidPounds(String id) {
        JSONObject res = new JSONObject();
        try {
            poundsService.invalid(id);
            res.put("status", "success");
            res.put("message", "作废成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败！");
        }
        return res.toString();
    }

    @RequestMapping("printTime")
    @ResponseBody
    public String printTime(String id) {
        JSONObject res = new JSONObject();
        try {
            poundsService.printTime(id);
            res.put("status", "success");
            res.put("message", "打印时间更新成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "打印时间更新失败！");
        }
        return res.toString();
    }
}

