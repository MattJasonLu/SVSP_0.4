package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.service.ClientService;
import com.jdlink.service.SampleAppointService;
import com.jdlink.service.SampleCheckService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
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
 * Created by matt on 2018/5/14.
 */
@Controller
public class SampleController {
    @Autowired
    SampleAppointService sampleAppointService;
    @Autowired
    SampleCheckService sampleCheckService;
    @Autowired
    ClientService clientService;

    /**
     * 列出所有样品
     * @return
     */
    @RequestMapping("listSample")
    @ResponseBody
    public String listSample() {
        try {
            // 获取样品列表
            List<SampleAppoint> sampleAppointList = sampleAppointService.list();
            JSONArray array = JSONArray.fromArray(sampleAppointList.toArray(new SampleAppoint[sampleAppointList.size()]));
            return array.toString();
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject res = new JSONObject();
            res.put("status", "fail");
            res.put("message", "获取样品列表失败");
            res.put("exception", e.getMessage());
            return res.toString();
        }
    }

    /**
     * 获取确认收样模态框所需要的下拉列表数据
     * @return
     */
    @RequestMapping("getSampleSelectList")
    @ResponseBody
    public String getSampleSelectList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        JSONArray array1 = JSONArray.fromArray(FormType.values());
        res.put("formTypeStrList", array1);
        JSONArray array2 = JSONArray.fromArray(PackageType.values());
        res.put("packageTypeStrList", array2);
        return res.toString();
    }

    /**
     * 增加样品预约单
     * @param sampleAppoint 样品预约单
     * @return 成功与否
     */
    @RequestMapping("addSampleAppoint")
    @ResponseBody
    public String addSampleAppoint(@RequestBody SampleAppoint sampleAppoint) {
        JSONObject res = new JSONObject();
        try {
            // 生成预约号
            Date date = new Date();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
            String prefix = simpleDateFormat.format(date);
            int count = sampleAppointService.countById(prefix) + 1;
            String suffix;
            if (count <= 9) suffix = "0" + count;
            else suffix = count + "";
            String id = RandomUtil.getAppointId(prefix, suffix);
            // 确保编号唯一
            while (sampleAppointService.getById(id) != null) {
                int index = Integer.parseInt(id);
                index += 1;
                id = index + "";
            }
            sampleAppoint.setAppointId(id);
            // 通过用户输入的公司名称匹配客户
            Client client = clientService.getByName(sampleAppoint.getCompanyName());
            // 若匹配到客户则更新预约表中的客户编号
            if (client != null) sampleAppoint.setClientId(client.getClientId());
            sampleAppoint.setState(ApplyState.Appointed);
            // 添加预约表
            sampleAppointService.add(sampleAppoint);
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

    /**
     * 根据预约单号获取到预约单对象
     * @param appointId
     * @return
     */
    @RequestMapping("getSampleAppoint")
    @ResponseBody
    public String getSampleAppoint(String appointId) {
        JSONObject res = new JSONObject();
        try {
            SampleAppoint sampleAppoint = sampleAppointService.getById(appointId);
            JSONObject data = JSONObject.fromBean(sampleAppoint);
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "获取信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 更新样品预约单
     * @param sampleAppoint 样品预约单
     * @return 成功与否
     */
    @RequestMapping("updateSampleAppoint")
    @ResponseBody
    public String updateSampleAppoint(SampleAppoint sampleAppoint) {
        JSONObject res = new JSONObject();
        try {
            sampleAppointService.update(sampleAppoint);
            res.put("status", "success");
            res.put("message", "修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("searchSampleAppoint")
    @ResponseBody
    public String searchSampleAppoint(String keyword) {
        JSONObject res = new JSONObject();
        try {
            // 查询集合
            List<SampleAppoint> sampleAppointList = sampleAppointService.getByKeyword(keyword);
            JSONArray array = JSONArray.fromArray(sampleAppointList.toArray(new SampleAppoint[sampleAppointList.size()]));
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", array);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }
//作废合同 将合同状态修改
    @RequestMapping("cancelSampleAppoint")
    @ResponseBody
    public String deleteSampleAppoint(String appointId) {
        JSONObject res = new JSONObject();
        try {
            //sampleAppointService.delete(appointId);
           sampleAppointService.updateApplyState(appointId);
            res.put("status", "success");
            res.put("message", "作废成功");

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 增加样品接收单
     * @param sampleCheck 样品接收单
     * @return 成功与否
     */
    @RequestMapping("addSampleCheck")
    @ResponseBody
    public String addSampleCheck(@RequestBody SampleCheck sampleCheck) {
        JSONObject res = new JSONObject();
        // 取得预约号
        String appointId = sampleCheck.getCheckId().split("R")[0];
        // 设置预约号
        sampleCheck.setAppointId(appointId);
        try {
            SampleCheck oldSampleCheck = sampleCheckService.getById(sampleCheck.getCheckId());
            if (oldSampleCheck == null) {
                // 取得预约数据
                SampleAppoint sampleAppoint = sampleAppointService.getById(appointId);
                sampleCheck.setClientId(sampleAppoint.getClientId());
                for (Sample sample : sampleCheck.getSampleList()) {
                    sample.setSampleId(RandomUtil.getRandomEightNumber());
                }
                // 添加登记表
                sampleCheckService.add(sampleCheck);
                // 更新状态
                sampleAppointService.setSampleTaked(sampleAppoint);
                // 更新产品和危废代码
                sampleAppointService.updatePdtAndCode(sampleCheck);
                res.put("message", "登记成功");
            } else {
                // 旧列表更新id
                for (int i = 0; i < oldSampleCheck.getSampleList().size(); i++) {
                    sampleCheck.getSampleList().get(i).setSampleId(oldSampleCheck.getSampleList().get(i).getSampleId());
                }
                // 新列表直接生成新编号
                for (int i = oldSampleCheck.getSampleList().size(); i < sampleCheck.getSampleList().size(); i++) {
                    sampleCheck.getSampleList().get(i).setSampleId(RandomUtil.getRandomEightNumber());
                }
                sampleCheckService.update(sampleCheck);
                // 更新产品和危废代码
                sampleAppointService.updatePdtAndCode(sampleCheck);
                res.put("message", "修改成功");
            }
            res.put("status", "success");
        } catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "登记失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 通过样品登记号查找登记单
     * @param checkId 登记号
     * @return 登记单
     */
    @RequestMapping("getSampleCheck")
    @ResponseBody
    public String getSampleCheck(String checkId) {
        JSONObject res = new JSONObject();
        try {
            SampleCheck sampleCheck = sampleCheckService.getById(checkId);
            if (sampleCheck != null) {
                res.put("data", JSONObject.fromBean(sampleCheck));
                res.put("status", "success");
                res.put("message", "获取成功");
            } else {
                throw new Exception("获取数据为空");
            }
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "获取失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 获取总记录数
     * @return
     */
    @RequestMapping("totalSampleManageRecord")
    @ResponseBody
    public int totalSampleManageRecord(){
        try {
            return sampleAppointService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageSampleManageList")
    @ResponseBody
    public  String loadPageSampleManageList(@RequestBody Page page){
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<SampleAppoint> samplesAppointList = sampleAppointService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(samplesAppointList.toArray(new SampleAppoint[samplesAppointList.size()]));
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
}
