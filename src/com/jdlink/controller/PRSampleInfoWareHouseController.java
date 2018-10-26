package com.jdlink.controller;

import com.jdlink.domain.ApplyState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Wastes;
import com.jdlink.service.ClientService;
import com.jdlink.service.SampleInfoWareHouseService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class PRSampleInfoWareHouseController {

    @Autowired
    SampleInfoWareHouseService sampleInfoWareHouseService;
    @Autowired
    ClientService clientService;


    /**
     * 增加样品登记预约单
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
            if(index < 10) index1 = "000" + index;
            else if(index < 100) index1 = "00" + index;
            else if(index < 1000) index1 = "0" + index;
            id = sampleId + index1;
        } while (sampleInfoWareHouseService.getByWastesId(id) != null);
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    @RequestMapping("getWareHouseWastesByWastesId")
    @ResponseBody
    public String getWastesByWastesId(String id){
        JSONObject res = new JSONObject();
        try {
            Wastes wastes = sampleInfoWareHouseService.getByWastesId(id);
            res.put("data",wastes);
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
     * @return
     */
    @RequestMapping("totalSampleInformationWareHouseRecord")
    @ResponseBody
    public int totalSampleInformationRecord(){
        try {
            return sampleInfoWareHouseService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageSampleInformationWareHouseList")
    @ResponseBody
    public  String loadPageSampleInformationList(@RequestBody Page page){
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

    @RequestMapping("getSampleInformationWareHouse")
    @ResponseBody
    public String getSampleInformation(String sampleId){
        JSONObject res = new JSONObject();
        try {
            //根据公司代码查询出相应的对象信息
            SampleInformation sampleInformation = sampleInfoWareHouseService.getById(sampleId);
            //新建一个对象并给它赋值为sampleInformation
            JSONObject data = JSONObject.fromBean(sampleInformation);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "查看数据成功");
        }catch(Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","查看数据失败");
        }
        return res.toString();
    }

    @RequestMapping("confirmSampleInformationWareHouseCheck")
    @ResponseBody
    public String confirmSampleInformationCheck(String sampleId,String laboratorySigner){
        JSONObject res = new JSONObject();
        try{
            sampleInfoWareHouseService.confirmCheck(sampleId,laboratorySigner);
            res.put("status","success");
            res.put("message","确认登记成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","确认登记失败！");
        }
        return res.toString();
    }

    @RequestMapping("updateSampleInformationWareHouse")
    @ResponseBody
    public String updateSampleInformation(@RequestBody SampleInformation sampleInformation){
        JSONObject res = new JSONObject();
        try{
            sampleInfoWareHouseService.deleteById(sampleInformation.getId()); // 删除旧数据
            sampleInfoWareHouseService.update(sampleInformation);       // 添加新数据
            System.out.println("更新的数据为：");
            System.out.println(sampleInformation.getWastesList().size());
            System.out.println(sampleInformation);
            res.put("status","success");
            res.put("message","登记单修改成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","登记单修改失败！");
        }
        return res.toString();
    }

    /**
     * 模糊查询 已整合  暂时不用
     * @param keyword
     * @return
     */
    @RequestMapping("searchSampleInformationWareHouse")
    @ResponseBody
    public String searchSampleInformation(String keyword){
        JSONObject res = new JSONObject();
        try{
            List<SampleInformation> sampleInformationList = sampleInfoWareHouseService.listByKeyword(keyword);
            JSONArray data = JSONArray.fromArray(sampleInformationList.toArray(new SampleInformation[sampleInformationList.size()]));
            res.put("data",data);
            res.put("status","success");
            res.put("message","查询数据获取成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","查询数据获取失败！");
        }
        return res.toString();
    }

    @RequestMapping("cancelSampleInformationWareHouse")
    @ResponseBody
    public String cancelSampleInformation(String sampleId){
        JSONObject res = new JSONObject();
        try{
            sampleInfoWareHouseService.updateSampleInfo(sampleId);
            res.put("status","success");
            res.put("message","作废数据成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","作废数据失败！");
        }
        return res.toString();
    }

    @RequestMapping("searchSampleInfoWareHouseTotal")
    @ResponseBody
    public int searchsampleInfoTotal(@RequestBody SampleInformation sampleInformation) {
        try {
            return sampleInfoWareHouseService.searchCount(sampleInformation);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     * @param sampleInformation
     * @return
     */
    @RequestMapping("searchSampleInfoWareHouse")
    @ResponseBody
    public String searchSampleInfo(@RequestBody SampleInformation sampleInformation) {
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
        ApplyState[] applyStates = new ApplyState[] { ApplyState.Appointed,ApplyState.Canceld,ApplyState.SampleTaked,ApplyState.Invalid };
        JSONArray applyStateList = JSONArray.fromArray(applyStates);
        res.put("applyStateList", applyStateList);
        return res.toString();
    }

    /**
     * 拒收功能
     * @param id
     * @param advice
     * @return
     */
    @RequestMapping("rejectSampleInfoWareHouseById")
    @ResponseBody
    public String rejectSampleInfoById(String id,String advice){
        JSONObject res=new JSONObject();
        try {
            sampleInfoWareHouseService.rejectSampleInfoById(id,advice);
            res.put("status", "success");
            res.put("message", "拒收成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "拒收失败");
        }
        return res.toString();
    }


}
