package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.service.ClientService;
import com.jdlink.service.SampleInformationService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class PRSampleInfoController {

    @Autowired
    SampleInformationService sampleInformationService;
    @Autowired
    ClientService clientService;


    /**
     * 增加样品登记预约单
     * @param sampleInformation 样品信息预约单
     * @return 成功与否
     */
    @RequestMapping("addSampleInfo")
    @ResponseBody
    public String addSampleAppoint(@RequestBody SampleInformation sampleInformation) {
        JSONObject res = new JSONObject();
        try {
           // sampleInformation.setApplyState(ApplyState.Appointed);
            // 添加预约登记表
            sampleInformationService.add(sampleInformation);
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


    @RequestMapping("getCurrentSampleInformationId")
    @ResponseBody
    public String getCurrentSampleInformationId(String companyCode) {
        // 生成预约号
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String prefix = simpleDateFormat.format(date) + companyCode;
        int count = sampleInformationService.countById(prefix) + 1;
        String suffix;
        if (count <= 9) suffix = "0" + count;
        else suffix = count + "";
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (sampleInformationService.getBySampleInformationId(id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id = index + "";
        }
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }
    /**
     * 整数成规范8位字符
     * @param number
     * @return
     */
    @RequestMapping("normalization")
    @ResponseBody
    public String normalization(int number){
        // 得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(8);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(8);
        String num = nf.format(number);
        JSONObject res = new JSONObject();
        res.put("id", num);
        return res.toString();
    }

    @RequestMapping("getCurrentWastesId")
    @ResponseBody
    public String getCurrentWastesId(String sampleId) {
        String id;
        int index = sampleInformationService.wastesCountById(sampleId);
        // 获取唯一的编号
        do {
            index += 1;
            String index1 = index + "";
            if(index < 10) index1 = "000" + index;
                else if(index < 100) index1 = "00" + index;
                    else if(index < 1000) index1 = "0" + index;
            id = sampleId + index1;
        } while (sampleInformationService.getByWastesId(id) != null);
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    @RequestMapping("getWastesByWastesId")
    @ResponseBody
    public String getWastesByWastesId(String id){
        JSONObject res = new JSONObject();
        try {
            Wastes wastes = sampleInformationService.getByWastesId(id);
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
    @RequestMapping("totalSampleInformationRecord")
    @ResponseBody
    public int totalSampleInformationRecord(){
        try {
            return sampleInformationService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageSampleInformationList")
    @ResponseBody
    public  String loadPageSampleInformationList(@RequestBody Page page){
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<SampleInformation> samplesInformationList = sampleInformationService.listPage(page);
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

    @RequestMapping("getSampleInformation")
    @ResponseBody
    public String getSampleInformation(String sampleId){
        JSONObject res = new JSONObject();
        try {
            //根据公司代码查询出相应的对象信息
            SampleInformation sampleInformation = sampleInformationService.getById(sampleId);
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

    @RequestMapping("confirmSampleInformationCheck")
    @ResponseBody
    public String confirmSampleInformationCheck(String sampleId,String laboratorySigner){
        JSONObject res = new JSONObject();
        try{
            sampleInformationService.confirmCheck(sampleId,laboratorySigner);
            res.put("status","success");
            res.put("message","确认登记成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","确认登记失败！");
        }
        return res.toString();
    }

    @RequestMapping("updateSampleInformation")
    @ResponseBody
    public String updateSampleInformation(@RequestBody SampleInformation sampleInformation){
        JSONObject res = new JSONObject();
        try{
            sampleInformationService.deleteById(sampleInformation.getId()); // 删除旧数据
            sampleInformationService.update(sampleInformation);       // 添加新数据
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
    @RequestMapping("searchSampleInformation")
    @ResponseBody
    public String searchSampleInformation(String keyword){
           JSONObject res = new JSONObject();
           try{
               List<SampleInformation> sampleInformationList = sampleInformationService.listByKeyword(keyword);
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

    @RequestMapping("cancelSampleInformation")
    @ResponseBody
    public String cancelSampleInformation(String sampleId){
        JSONObject res = new JSONObject();
        try{
            sampleInformationService.updateSampleInfo(sampleId);
            res.put("status","success");
            res.put("message","作废数据成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","作废数据失败！");
        }
        return res.toString();
    }

    @RequestMapping("searchSampleInfoTotal")
    @ResponseBody
    public int searchsampleInfoTotal(@RequestBody SampleInformation sampleInformation) {
        try {
            return sampleInformationService.searchCount(sampleInformation);
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
    @RequestMapping("searchSampleInfo")
    @ResponseBody
    public String searchSampleInfo(@RequestBody SampleInformation sampleInformation) {
        JSONObject res = new JSONObject();
        try {
            List<SampleInformation> sampleInformationList = sampleInformationService.search(sampleInformation);
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

    @RequestMapping("getSampleInfoSeniorSelectedList")
    @ResponseBody
    public String getSampleInfoSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        ApplyState[] applyStates = new ApplyState[] { ApplyState.Appointed,ApplyState.Canceld,ApplyState.SampleTaked,ApplyState.Invalid };
        JSONArray applyStateList = JSONArray.fromArray(applyStates);
        res.put("applyStateList", applyStateList);
        return res.toString();
    }

    @RequestMapping("getClientAndWastesCodeSelectedList")
    @ResponseBody
    public String getClientAndWastesCodeSelectedList(){
        JSONObject res = new JSONObject();
        try {
            List<Client> client = clientService.list();
            System.out.println(client);
            JSONArray companyList = JSONArray.fromArray(client.toArray(new Client[client.size()]));
            List<Wastes> wastes = sampleInformationService.listWastes();
            System.out.println(wastes);
            JSONArray wastesList = JSONArray.fromArray(wastes.toArray(new Wastes[wastes.size()]));
            res.put("companyCodeList", companyList);
            res.put("wastesCodeList", wastesList);
            res.put("status","success");
            res.put("message","数据获取成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","数据获取失败！");
        }
        return res.toString();
    }

    /**
     * 拒收功能
     * @param id
     * @param advice
     * @return
     */
    @RequestMapping("rejectSampleInfoById")
    @ResponseBody
    public String rejectSampleInfoById(String id,String advice){
        JSONObject res=new JSONObject();
        try {
            sampleInformationService.rejectSampleInfoById(id,advice);
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

    /**
     * 获取危废物质形态
     * @return 物质形态
     */
    @RequestMapping("getSampleFormType")
    @ResponseBody
    public String getSampleFormType() {
        JSONObject res = new JSONObject();
        //JSONArray formTypeList = JSONArray.fromArray(FormType.values());
        FormType[] states = new FormType[]{FormType.Solid, FormType.HalfSolid,FormType.HalfSolid.Liquid,FormType.Solid1AndHalfSolid,FormType.HalfSolidAndLiquid,FormType.Solid1AndLiquid};
        JSONArray formTypeList = JSONArray.fromArray(states);
        res.put("formTypeList", formTypeList);
        return res.toString();
    }

}
