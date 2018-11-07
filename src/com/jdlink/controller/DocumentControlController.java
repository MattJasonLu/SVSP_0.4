package com.jdlink.controller;

import com.jdlink.domain.Produce.DocumentControl;
import com.jdlink.service.DocumentControlService;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

/**
 * Created by Leon on 2018/11/2.
 */
@Controller
public class DocumentControlController {
    @Autowired
    DocumentControlService documentControlService;

    /**
     * 列出所有受控文档
     */
    @RequestMapping("listDocumentControl")
    @ResponseBody
    public String listDocumentControl(DocumentControl documentControl) {
        JSONObject res = new JSONObject();
        try {
            List<DocumentControl> documentControlList = documentControlService.list(documentControl);
            JSONArray data = JSONArray.fromArray(documentControlList.toArray(new DocumentControl[documentControlList.size()]));
            res.put("status", "success");
            res.put("message", "获取数据成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 计算受控文档数量
     */
    @RequestMapping("countDocumentControl")
    @ResponseBody
    public String countDocumentControl(DocumentControl documentControl) {
        JSONObject res = new JSONObject();
        try {
            int count = documentControlService.count(documentControl);
            res.put("status", "success");
            res.put("message", "获取数据成功");
            res.put("data", count);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 增加文档控制对象
     * @param documentControl 文档控制表
     * @return 成功与否
     */
    @RequestMapping("addDocumentControl")
    @ResponseBody
    public String addDocumentControl(DocumentControl documentControl) {
        JSONObject res = new JSONObject();
        try {
            documentControlService.add(documentControl);
            res.put("status", "success");
            res.put("message", "新增成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新增失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置受控文档失效
     * @param ID 编号
     * @return 成功与否
     */
    @RequestMapping("setDocumentControlInvalid")
    @ResponseBody
    public String setDocumentControlInvalid(String ID) {
        JSONObject res = new JSONObject();
        try {
            documentControlService.setInvalid(ID);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置受控文档生效
     * @param ID 编号
     * @return 成功与否
     */
    @RequestMapping("setDocumentControlEffective")
    @ResponseBody
    public String setDocumentControlEffective(String ID) {
        JSONObject res = new JSONObject();
        try {
            documentControlService.setEffective(ID);
            res.put("status", "success");
            res.put("message", "生效成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "生效失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置受控文档生效
     * @param ID 编号
     * @return 成功与否
     */
    @RequestMapping("setDocumentControlUnEffective")
    @ResponseBody
    public String setDocumentControlUnEffective(String ID) {
        JSONObject res = new JSONObject();
        try {
            documentControlService.setUnEffective(ID);
            res.put("status", "success");
            res.put("message", "失效成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "失效失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

}
