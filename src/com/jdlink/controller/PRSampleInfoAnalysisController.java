package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInfoAnalysis;
import com.jdlink.service.produce.SampleInfoAnalysisService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class PRSampleInfoAnalysisController {

    @Autowired
    SampleInfoAnalysisService sampleInfoAnalysisService;

    /**
     * 获取仓储部化验单的
     * @param page 分页数据
     * @param sampleInfoAnalysis 仓储部化验单的查询参数
     * @return 查询所得数据
     */
    @RequestMapping("getSampleInfoAnalysis")
    @ResponseBody
    public String getSampleInfoAnalysis(Page page, SampleInfoAnalysis sampleInfoAnalysis) {
        JSONObject res = new JSONObject();
        try {
            List<SampleInfoAnalysis> sampleInfoAnalysisList = sampleInfoAnalysisService.get(page, sampleInfoAnalysis);
            JSONArray data = JSONArray.fromArray(sampleInfoAnalysisList.toArray(new SampleInfoAnalysis[sampleInfoAnalysisList.size()]));
            res.put("status", "success");
            res.put("message", "仓储部化验单获取数据成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "仓储部化验单获取数据失败");
        }
        return res.toString();
    }

    /**
     * 获取仓储部化验单的数量
     * @param sampleInfoAnalysis 仓储部化验单的查询参数
     * @return 仓储部化验单的数量
     */
    @RequestMapping("countSampleInfoAnalysis")
    @ResponseBody
    public String countSampleInfoAnalysis(SampleInfoAnalysis sampleInfoAnalysis) {
        JSONObject res = new JSONObject();
        try {
            int count = sampleInfoAnalysisService.count(sampleInfoAnalysis);
            res.put("status", "success");
            res.put("message", "仓储部化验单获取数据成功");
            res.put("data", count);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "仓储部化验单获取数据失败");
        }
        return res.toString();
    }

}
