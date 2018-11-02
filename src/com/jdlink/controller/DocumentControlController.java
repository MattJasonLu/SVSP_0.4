package com.jdlink.controller;

import com.jdlink.domain.Produce.DocumentControl;
import com.jdlink.service.DocumentControlService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

/**
 * Created by matt on 2018/7/8.
 */
@Controller
public class DocumentControlController {
    @Autowired
    DocumentControlService documentControlService;

    @RequestMapping("getDocument")
    @ResponseBody
    public void getDocument() {
        JSONObject res = new JSONObject();
        try {
            List<DocumentControl> documentControlList = documentControlService.getDocument();
            JSONArray data = JSONArray.fromArray(documentControlList.toArray(new DocumentControl[documentControlList.size()]));
            res.put("status", "success");
            res.put("message", "获取数据成功");
            res.put("data", data.toString());
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
            res.put("exception", e.getMessage());
        }
    }

}
