package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.WasteIntoService;
import com.jdlink.service.produce.SewageTestService;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 危废/次生分析日报控制器
 */
@Controller
public class WasteIntoController {
    @Autowired
    WasteIntoService wasteIntoService;
    @Autowired
    SewageTestService sewageTestService;
    /**
     * 获得危废入场分析日报列表
     */
    @RequestMapping("getWasteIntoList")
    @ResponseBody
    public String getWasteIntoList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            //首先更新
            //wasteIntoService.updateWasteInto();
            List<WasteInto> wasteIntoList=wasteIntoService.WasteIntoList(page);
            res.put("data",wasteIntoList);
            res.put("status", "success");
            res.put("message", "查询成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }
    /**
     * 获得次生入场分析日报列表
     */
    @RequestMapping("getSecondIntoList")
    @ResponseBody
    public String getSecondIntoList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            //首先更新==>有问题 会报错2018/11/9
           // wasteIntoService.updateWasteInto();
            List<SecondarySample> wasteIntoList=wasteIntoService.getSecondarysample(page);
            res.put("data",wasteIntoList);
            res.put("status", "success");
            res.put("message", "查询成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }
    /**
     * 获取危废入场总记录数
     * @return
     */
    @RequestMapping("totalWasteIntoRecord")
    @ResponseBody
    public int totalWasteIntoRecord() {
        try {
            return wasteIntoService.countWaste();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    /**
     * 获取次生入场总记录数
     * @return
     */
    @RequestMapping("totalSecIntoRecord")
    @ResponseBody
    public int totalSecIntoRecord() {
        try {
            return wasteIntoService.countSec();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    @RequestMapping("getCurrentSecSampleInformationId")
    @ResponseBody
    public String getCurrentSampleInformationId(String companyCode) {
        // 生成预约号
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String prefix = simpleDateFormat.format(date) + companyCode;
        int count =wasteIntoService.countById((prefix)) + 1;
        String suffix;
        if (count <= 9) suffix = "0" + count;
        else suffix = count + "";
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (wasteIntoService.getSecondarysampleById(id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id = index + "";
        }
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }
    /**
     * 添加次生登记主表
     */
    @RequestMapping("addSecondarySample")
    @ResponseBody
    public String addSecondarySample(@RequestBody SecondarySample secondarySample){
        JSONObject res=new JSONObject();
        try {
//            // 生成预约号
//            Date date = new Date();   //获取当前时间
//            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
//            String prefix = simpleDateFormat.format(date) + secondarySample.getClient().getClientId();
//            System.out.println("前缀"+prefix);
//            int count =(wasteIntoService.countById((prefix))) + 1;
//            System.out.println("数量"+count);
//            String suffix;
//            if (count <= 9) suffix = "0" + count;
//            else suffix = count + "";
//            String id = RandomUtil.getAppointId(prefix, suffix);
//             //确保编号唯一
//            while (wasteIntoService.getSecondarysampleById(id) != null) {
//                int index = Integer.parseInt(id);
//                index += 1;
//                id =String.valueOf(index);
//            }
//
//            //找到最新的预约单号==>年月日++公司代码+两位数
//            secondarySample.setId(id);
            wasteIntoService.addSecondarySample(secondarySample);
            res.put("status", "success");
            res.put("message", "主表添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "主表添加失败");

        }


        return res.toString();
    }

    /**
     * 添加次生登记子表
     */
    @RequestMapping("addSecondarySampleItem")
    @ResponseBody
    public String addSecondarySampleItem(@RequestBody SecondarySampleItem secondarySampleItem){
        JSONObject res=new JSONObject();

        try {
            String id;

            int index = wasteIntoService.wastesCountById(secondarySampleItem.getSampleinformationId());
            // 获取唯一的编号
            do {
                index += 1;
                String index1 = index + "";
                if(index < 10) index1 = "000" + index;
                else if(index < 100) index1 = "00" + index;
                else if(index < 1000) index1 = "0" + index;
                id = secondarySampleItem.getSampleinformationId() + index1;
            } while (wasteIntoService.getByWastesId(id) != null);

           secondarySampleItem.setId(id);
           wasteIntoService.addSecondarySampleItem(secondarySampleItem);
            res.put("status", "success");
            res.put("message", "子表添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "\"子表添加失败");
        }



        return  res.toString();

    }

    //根据编号查询次生登记信息
    @RequestMapping("getSecondarysampleById")
    @ResponseBody
    public String getSecondarysampleById(String id){
        JSONObject res=new JSONObject();

        try {
            SecondarySample secondarySample= wasteIntoService.getSecondarysampleById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", secondarySample);

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }


        return res.toString();
    }

    //确认收样==>预约登记
    @RequestMapping("confirmSecondarySampleById")
    @ResponseBody
    public String confirmSecondarySampleById(String id,String laboratorySignatory,String wastesName){
        JSONObject res=new JSONObject();
 try {
     wasteIntoService.confirmSecondarySampleById(id,laboratorySignatory);

    SecondarySample secondarySample= wasteIntoService.getSecondarysampleById(id);

    SecondarySampleItem secondarySampleItem=secondarySample.getSecondarySampleItemList().get(0);

    SecondaryTest secondaryTest=new SecondaryTest();
    secondaryTest.setId(id);
    secondaryTest.setWastesName(wastesName);
    secondaryTest.setAddress(secondarySample.getSecondaryPointItem().getDictionaryItemName());
     //如果存在就更新 否则就添加
     //根据编号获得次生送样明细
    if(secondarySampleItem.getWater()==1){
        secondaryTest.setWater(0);

    }
    else
    {
        secondaryTest.setWater(-9999);
    }
     if(secondarySampleItem.getScorchingRate()==1){
         secondaryTest.setScorchingRate(0);
     }
     else
     {
         secondaryTest.setScorchingRate(-9999);
     }
         //根据编号获取次生化验信息


         if(sewageTestService.getSecondaryTestById(id)==null){
            //新增
             sewageTestService.addSecondaryTest(secondaryTest);
         }
         else {
             //更新
             wasteIntoService.updateSecondarySample(secondaryTest);
         }




     res.put("status", "success");
     res.put("message", "已收样！");
 }
 catch (Exception e){
     e.printStackTrace();
     res.put("status", "fail");
     res.put("message", "收样失败");
 }

        return res.toString();

    }

    //拒绝收样==>预约登记
    @RequestMapping("rejectSecondarySampleById")
    @ResponseBody
    public String rejectSecondarySampleById(String id,String advice){
        JSONObject res=new JSONObject();
          try {
              wasteIntoService.rejectSecondarySampleById(id,advice);
              res.put("status", "success");
              res.put("message", "已拒收！");
          }
          catch (Exception e){
              e.printStackTrace();
              res.put("status", "fail");
              res.put("message", "拒收失败");
          }

        return res.toString();
    }

    /**
     * 次生导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importSampleSecondaryExcel")
    @ResponseBody
    public String importSampleSecondaryExcel(MultipartFile excelFile) {
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
            Map<String, SecondarySample> map = new HashMap<>();
            List<SecondarySampleItem> secondarySampleItemArrayList = new ArrayList<>();
            String id1 = "";
            for (int i = 2; i < data.length; i++) {
                String id = data[i][0].toString();
                SecondarySampleItem secondarySampleItem = new SecondarySampleItem();
                //map内不存在即添加公共数据，存在即添加List内数据
                if (!map.keySet().contains(id)) {
                    map.put(id, new SecondarySample());
                    map.get(id).setId(id);
                    map.get(id).setSendingPerson(data[i][1].toString());
                    map.get(id).setAddress(data[i][2].toString());
                    map.get(id).setCreationDate(DateUtil.getDateFromStr(data[i][7].toString()));
                    //新存储一个id对象时，将以下两个累计数据清零
                    secondarySampleItemArrayList = new ArrayList<>();
                    int index = wasteIntoService.wastesCountById(id);  // 设置危废ID
                    // 获取唯一的编号
                    do {
                        index += 1;
                        String index1 = index + "";
                        if (index < 10) index1 = "000" + index;
                        else if (index < 100) index1 = "00" + index;
                        else if (index < 1000) index1 = "0" + index;
                        id1 = id + index1;
                    } while (wasteIntoService.getByWastesId(id) != null);
                } else {
                    int index1 = Integer.parseInt(id1.substring(id1.length() - 5)); // 截取ID后五位，然后叠加
                    String index2 = id1.substring(0, id1.length() - 5); // 截取ID前几位
                    index1++;
                    id1 = index2 + index1;  // 拼接ID
                }
                secondarySampleItem.setId(id1);
                secondarySampleItem.setWastesCode(data[i][3].toString());
                secondarySampleItem.setWastesName(data[i][4].toString());
                // 设置检测项目
                if ((data[i][5].toString().equals("R") || data[i][5].toString().equals("1") || data[i][5].toString().equals("1.0")))
                    secondarySampleItem.setWater(1);
                if ((data[i][6].toString().equals("R") || data[i][6].toString().equals("1") || data[i][6].toString().equals("1.0")))
                    secondarySampleItem.setScorchingRate(1);
                secondarySampleItem.setSampleinformationId(id);
                secondarySampleItemArrayList.add(secondarySampleItem);
                map.get(id).setSecondarySampleItemList(secondarySampleItemArrayList);
            }
            for (String key : map.keySet()) {
                SecondarySample secondarySample1 = wasteIntoService.getSecondarysampleById(map.get(key).getId());
                SecondarySample secondarySample = map.get(key);
                if (secondarySample1 == null) {
                    //插入新数据
                    wasteIntoService.addSecondarySample(secondarySample);
                    for (SecondarySampleItem secondarySampleItem : secondarySample.getSecondarySampleItemList())
                        wasteIntoService.addSecondarySampleItem(secondarySampleItem);
                } else {
                    res.put("status", "fail");
                    res.put("message", "预约单号重复，请检查后导入");
                    return res.toString();
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
     * 次生送样查询
     */
    @RequestMapping("searchSecondary")
    @ResponseBody
    public String searchSecondary(@RequestBody SecondarySample secondarySample){
        JSONObject res=new JSONObject();

        try {
           List<SecondarySample> secondarySampleList=wasteIntoService.searchSecondary(secondarySample);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", secondarySampleList);

        }

        catch (Exception e){

            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();

    }

    /**
     * 次生送样查询总数
     */
    @RequestMapping("searchSecondaryCount")
    @ResponseBody
    public int searchSecondaryCount(@RequestBody SecondarySample secondarySample){

        return wasteIntoService.searchSecondaryCount(secondarySample);
    }

    //危废入场查询
    @RequestMapping("searchWastesDaily")
    @ResponseBody
    public String searchWastesDaily(@RequestBody SampleInfoAnalysis sampleInfoAnalysis){
        JSONObject res=new JSONObject();


        try {
     List<SampleInfoAnalysis> sampleInfoAnalysisList=wasteIntoService.searchWastesDaily(sampleInfoAnalysis);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", sampleInfoAnalysisList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }
        return res.toString();

    }

   //危废入场查询计数
    @RequestMapping("searchWastesDailyCount")
    @ResponseBody
    public String searchWastesDailyCount(@RequestBody SampleInfoAnalysis sampleInfoAnalysis ){
        JSONObject res=new JSONObject();

        try {
                   int count =wasteIntoService.searchWastesDailyCount(sampleInfoAnalysis);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", count);
                }
                catch (Exception e){
                    e.printStackTrace();
                    res.put("status", "fail");
                    res.put("message", "查询失败");
                }
        return res.toString();
    }

    //次生入场查询
    @RequestMapping("searchSecondaryDaily")
    @ResponseBody
    public String searchSecondaryDaily(@RequestBody SecondaryTest secondaryTest){
        JSONObject res=new JSONObject();

        try {
     List<SecondaryTest> secondaryTestList=wasteIntoService.searchSecondaryDaily(secondaryTest);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", secondaryTestList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }



        return res.toString();
    }


    //次生入场查询计数
    @RequestMapping("searchSecondaryDailyCount")
    @ResponseBody
    public int  searchSecondaryDailyCount(@RequestBody SecondaryTest secondaryTest ){

        return wasteIntoService.searchSecondaryDailyCount(secondaryTest);

    }



}
