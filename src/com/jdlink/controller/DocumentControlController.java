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

}
