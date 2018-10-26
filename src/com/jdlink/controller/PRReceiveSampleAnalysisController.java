package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ReceiveSampleAnalysis;
import com.jdlink.domain.Produce.SampleInfoAnalysis;
import com.jdlink.service.produce.ReceiveSampleAnalysisService;
import com.jdlink.service.produce.SampleInfoAnalysisService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class PRReceiveSampleAnalysisController {

    @Autowired
    ReceiveSampleAnalysisService receiveSampleAnalysisService;

    /**
     * 获取市场部化验单的
     * @param page 分页数据
     * @param receiveSampleAnalysis 市场部化验单的查询参数
     * @return 查询所得数据
     */
    @RequestMapping("getReceiveSampleAnalysis")
    @ResponseBody
    public String getReceiveSampleAnalysis(Page page, ReceiveSampleAnalysis receiveSampleAnalysis) {
        JSONObject res = new JSONObject();
        try {
            List<ReceiveSampleAnalysis> receiveSampleAnalysisList = receiveSampleAnalysisService.get(page, receiveSampleAnalysis);
            JSONArray data = JSONArray.fromArray(receiveSampleAnalysisList.toArray(new ReceiveSampleAnalysis[receiveSampleAnalysisList.size()]));
            res.put("status", "success");
            res.put("message", "市场部化验单获取数据成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "市场部化验单获取数据失败");
        }
        return res.toString();
    }

    /**
     * 获取市场部化验单的数量
     * @param receiveSampleAnalysis 市场部化验单的查询参数
     * @return 市场部化验单的数量
     */
    @RequestMapping("countReceiveSampleAnalysis")
    @ResponseBody
    public String countReceiveSampleAnalysis(ReceiveSampleAnalysis receiveSampleAnalysis) {
        JSONObject res = new JSONObject();
        try {
            int count = receiveSampleAnalysisService.count(receiveSampleAnalysis);
            res.put("status", "success");
            res.put("message", "市场部化验单获取数据成功");
            res.put("data", count);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "市场部化验单获取数据失败");
        }
        return res.toString();
    }

}
