package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SecondarySample;
import com.jdlink.domain.Produce.SecondarySampleItem;
import com.jdlink.domain.Produce.WasteInto;
import com.jdlink.service.WasteIntoService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 危废/次生分析日报控制器
 */
@Controller
public class WasteIntoController {
    @Autowired
    WasteIntoService wasteIntoService;
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
            //首先更新
            wasteIntoService.updateWasteInto();
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
    public String confirmSecondarySampleById(String id){
        JSONObject res=new JSONObject();
 try {
     wasteIntoService.confirmSecondarySampleById(id);
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
}
