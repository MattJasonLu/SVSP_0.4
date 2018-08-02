package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.TransferDraft;
import com.jdlink.service.TransferDraftService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by matt on 2018/8/2.
 * 转移联单控制器
 */
@Controller
public class TransferDraftController {

    /**
     * 转移联单服务
     */
    @Autowired
    TransferDraftService transferDraftService;

    /**
     * 增加转移联单
     * @param transferDraft 转移联单对象
     * @return 成功与否
     */
    @RequestMapping("addTransferDraft")
    @ResponseBody
    public String addTransferDraft(@RequestBody TransferDraft transferDraft) {
        JSONObject res = new JSONObject();
        try {
            transferDraftService.add(transferDraft);
            res.put("status", "success");
            res.put("message", "新增成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新增失败");
        }
        return res.toString();
    }

    /**
     * 作废转移联单
     * @param id 联单编号
     * @return 成功与否
     */
    @RequestMapping("setTransferDraftInvalid")
    @ResponseBody
    public String setTransferDraftInvalid(String id) {
        JSONObject res = new JSONObject();
        try {
            // 作废转移联单
            transferDraftService.setStateInvalid(id);
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
     * 获取联单数据
     * @param id 联单编号
     * @return 获取的联单数据
     */
    @RequestMapping("getTransferDraftById")
    @ResponseBody
    public String getTransferDraftById(String id) {
        JSONObject res = new JSONObject();
        try {
            // 根据编号获取转移联单
            TransferDraft transferDraft = transferDraftService.getById(id);
            JSONObject data = JSONObject.fromBean(transferDraft);
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

    /**
     * 更新联单对象
     * @param transferDraft 联单对象
     * @return 成功与否
     */
    @RequestMapping("updateTransferDraft")
    @ResponseBody
    public String updateTransferDraft(@RequestBody TransferDraft transferDraft) {
        JSONObject res = new JSONObject();
        try {
            // 更新联单对象
            transferDraftService.update(transferDraft);
            res.put("status", "success");
            res.put("message", "更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();
    }

    /**
     * 更新联单对象
     * @return 成功与否
     */
    @RequestMapping("listTransferDraft")
    @ResponseBody
    public String listTransferDraft(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 更新联单对象
            List<TransferDraft> transferDraftList = transferDraftService.list();
            JSONArray data = JSONArray.fromArray(transferDraftList.toArray(new TransferDraft[transferDraftList.size()]));
            res.put("status", "success");
            res.put("message", "更新成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();
    }

}
