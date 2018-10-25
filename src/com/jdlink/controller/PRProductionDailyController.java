package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.domain.Wastes;
import com.jdlink.service.ProductionDailyService;
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

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class PRProductionDailyController {

    @Autowired
    ProductionDailyService productionDailyService;
//////污水分析日报////
    @RequestMapping("loadPageSewageList")
    @ResponseBody
    public String loadPageSewageList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<Sewageregistration> sewageList = productionDailyService.sewageList(page);
           JSONArray data = JSONArray.fromArray(sewageList.toArray(new Sewageregistration[sewageList.size()]));
            res.put("data", data);
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
     * 获取总记录数
     * @return
     */
    @RequestMapping("totalSewageRecord")
    @ResponseBody
    public int totalSewageRecord() {
        try {
            return productionDailyService.countSewage();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importSewageExcel")
    @ResponseBody
    public String importSewageExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            System.out.println("数据如下：");
            for (int i = 1; i < data.length; i++) {
                for (int j = 0; j < data[0].length; j++) {
                    System.out.print(data[i][j].toString());
                    System.out.print(",");
                }
                System.out.println();
            }
            for(int i = 1; i < data.length; i++){
                Sewage sewage = new Sewage();
                sewage.setName(data[i][1].toString());
                sewage.setReceiveDate(DateUtil.getDateFromStr(data[i][2].toString()));
                sewage.setCod(Float.parseFloat(data[i][3].toString()));
                sewage.setBod5(Float.parseFloat(data[i][4].toString()));
                sewage.setOxygen(Float.parseFloat(data[i][5].toString()));
                sewage.setNitrogen(Float.parseFloat(data[i][6].toString()));
                sewage.setLye(Float.parseFloat(data[i][7].toString()));
                sewage.setPh(Float.parseFloat(data[i][8].toString()));
                sewage.setRemarks(data[i][9].toString());
                productionDailyService.addSewage(sewage);
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch(Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();
    }

    /**
     * 获取查询总数
     * @param sewage
     * @return
     */
    @RequestMapping("searchSewageTotal")
    @ResponseBody
    public int searchSewageTotal(@RequestBody Sewage sewage) {
        try {
            return productionDailyService.searchCountSewage(sewage);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param sewage
     * @return
     */
    @RequestMapping("searchSewage")
    @ResponseBody
    public String search(@RequestBody Sewage sewage) {
        JSONObject res = new JSONObject();
        try {
            List<Sewage> sewageList = productionDailyService.searchSewage(sewage);
            JSONArray data = JSONArray.fromArray(sewageList.toArray(new Sewage[sewageList.size()]));
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

    //////软水分析日报////
    @RequestMapping("loadPageSoftWaterList")
    @ResponseBody
    public String loadPageSoftWaterList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<Sewageregistration> softWaterList = productionDailyService.softList(page);
           // JSONArray data = JSONArray.fromArray(softWaterList.toArray(new SoftWater[softWaterList.size()]));
            res.put("data", softWaterList);
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
     * 获取总记录数
     * @return
     */
    @RequestMapping("totalSoftWaterRecord")
    @ResponseBody
    public int totalSoftWaterRecord() {
        try {
            return productionDailyService.countSoftWater();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importSoftWaterExcel")
    @ResponseBody
    public String importSoftWaterExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            System.out.println("数据如下：");
            for (int i = 1; i < data.length; i++) {
                for (int j = 0; j < data[0].length; j++) {
                    System.out.print(data[i][j].toString());
                    System.out.print(",");
                }
                System.out.println();
            }
            for(int i = 1; i < data.length; i++){
                SoftWater softWater = new SoftWater();
                softWater.setName(data[i][1].toString());
                softWater.setReceiveDate(DateUtil.getDateFromStr(data[i][2].toString()));
                softWater.setRelativeAlkalinity(Float.parseFloat(data[i][3].toString()));
                softWater.setDissolvedSolidForm(Float.parseFloat(data[i][4].toString()));
                softWater.setPh(Float.parseFloat(data[i][5].toString()));
                softWater.setAlkalinity(Float.parseFloat(data[i][6].toString()));
                softWater.setHardness(Float.parseFloat(data[i][7].toString()));
                softWater.setElectricalConductivity(Float.parseFloat(data[i][8].toString()));
                softWater.setRemarks(data[i][9].toString());
                productionDailyService.addSoftWater(softWater);
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch(Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();
    }

    /**
     * 获取查询总数
     * @param softWater
     * @return
     */
    @RequestMapping("searchSoftWaterTotal")
    @ResponseBody
    public int searchSoftWaterTotal(@RequestBody SoftWater softWater) {
        try {
            return productionDailyService.searchCountSoftWater(softWater);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param softWater
     * @return
     */
    @RequestMapping("searchSoftWater")
    @ResponseBody
    public String search(@RequestBody SoftWater softWater) {
        JSONObject res = new JSONObject();
        try {
            List<SoftWater> softWaterList = productionDailyService.searchSoftWater(softWater);
            JSONArray data = JSONArray.fromArray(softWaterList.toArray(new SoftWater[softWaterList.size()]));
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


    //添加污水登记主表
    @RequestMapping("addSewaGeregistration")
    @ResponseBody
    public String addSewaGeregistration(@RequestBody Sewageregistration sewageregistration){
        JSONObject res=new JSONObject();

        try {
            // 生成预约号
            Date date = new Date();   //获取当前时间
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
            String prefix = simpleDateFormat.format(date) + sewageregistration.getClient().getClientId();
            System.out.println("前缀"+prefix);
            int count =productionDailyService.countByIdSew(prefix) + 1;
            String suffix;
            if (count <= 9) suffix = "0" + count;
            else suffix = count + "";
            String id = RandomUtil.getAppointId(prefix, suffix);
            // 确保编号唯一
            while (productionDailyService.getSewaGeregistrationById(id) != null) {
                int index = Integer.parseInt(id);
                index += 1;
                id =String.valueOf(index);
            }
            sewageregistration.setId(id);
            productionDailyService.addSewaGeregistration(sewageregistration);
            res.put("status", "success");
            res.put("message", "添加主表成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "添加主表失败");

        }

        return res.toString();

    }


    //添加污水登记子表
    @RequestMapping("addSewaGeregistrationItem")
    @ResponseBody
    public String addSewaGeregistrationItem(@RequestBody SewageregistrationItem sewageregistrationItem){
        JSONObject res=new JSONObject();


        try {
            String id=productionDailyService.getNewestId().get(0);
            sewageregistrationItem.setSampleinformationId(id);
            productionDailyService.addSewaGeregistrationItem(sewageregistrationItem);

            res.put("status", "success");
            res.put("message", "字表添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "字表添加失败");

        }

        return res.toString();


    }

    //添加软水登记主表
    @RequestMapping("addSoftGeregistration")
    @ResponseBody
    public String addSoftGeregistration(@RequestBody Sewageregistration sewageregistration){
        JSONObject res=new JSONObject();

        try {
            // 生成预约号
            Date date = new Date();   //获取当前时间
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
            String prefix = simpleDateFormat.format(date) + sewageregistration.getClient().getClientId();
            System.out.println("前缀"+prefix);
            int count =productionDailyService.countByIdSew(prefix) + 1;
            String suffix;
            if (count <= 9) suffix = "0" + count;
            else suffix = count + "";
            String id = RandomUtil.getAppointId(prefix, suffix);
            // 确保编号唯一
            while (productionDailyService.getSewaGeregistrationById(id) != null) {
                int index = Integer.parseInt(id);
                index += 1;
                id =String.valueOf(index);
            }
            sewageregistration.setId(id);
            productionDailyService.addSoftGeregistration(sewageregistration);
            res.put("status", "success");
            res.put("message", "添加主表成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "添加主表失败");
        }

        return res.toString();


    }

    //添加软水登记子表
    @RequestMapping("addSoftGeregistrationItem")
    @ResponseBody
    public String addSoftGeregistrationItem(@RequestBody SewageregistrationItem sewageregistrationItem){
        JSONObject res=new JSONObject();
        try{
            String id=productionDailyService.getNewestId().get(0);
            sewageregistrationItem.setSampleinformationId(id);
            productionDailyService.addSoftGeregistrationItem(sewageregistrationItem);
            res.put("status", "success");
            res.put("message", "字表添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "字表添加失败");

        }

        return res.toString();


    }

  //根据编号获取污水登记信息
    @RequestMapping("getSewaGeregistrationById")
    @ResponseBody
    public String getSewaGeregistrationById(String id){
        JSONObject res=new JSONObject();
        System.out.println(id+"89");
        try {
            Sewageregistration sewageregistration=productionDailyService.getSewaGeregistrationById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", sewageregistration);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }


        return res.toString();


    }

    //确认送样
    @RequestMapping("confirmSewaGeregistrationById")
    @ResponseBody
    public String confirmSewaGeregistrationById(String id){
        JSONObject res=new JSONObject();
        try {
            productionDailyService.confirmSewaGeregistrationById(id);
            res.put("status", "success");
            res.put("message", "收样成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "收样失败");

        }

        return  res.toString();


    }

    //拒收
    @RequestMapping("rejectSewaGeregistrationById")
    @ResponseBody
    public String rejectSewaGeregistrationById(String id,String advice){
        JSONObject res=new JSONObject();
        try {
      productionDailyService.rejectSewaGeregistrationById(id,advice);
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

}
