package com.jdlink.controller;

import com.jdlink.domain.Quotation;
import com.jdlink.service.QuotationService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by matt on 2018/7/3.
 */
@Controller
public class QuotationController {

    @Autowired
    QuotationService quotationService;

    /**
     * 增加报价单
     * @param quotation 报价单
     * @return 成功与否
     */
    @RequestMapping("addQuotation")
    @ResponseBody
    public String addQuotation(@RequestBody Quotation quotation) {
        JSONObject res = new JSONObject();
        try {
            quotationService.add(quotation);
            res.put("status", "success");
            res.put("message", "报价单增加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "报价单增加失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 更新报价单
     * @param quotation 报价单
     * @return 成功与否
     */
    @RequestMapping("updateQuotation")
    @ResponseBody
    public String updateQuotation(@RequestBody Quotation quotation) {
        JSONObject res = new JSONObject();
        try {
            quotationService.update(quotation);
            res.put("status", "success");
            res.put("message", "报价单修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "报价单修改失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 列出所有报价单对象
     * @param clientId 客户编号
     * @return 报价单对象列表
     */
    @RequestMapping("listQuotation")
    @ResponseBody
    public String listQuotation(String clientId) {
        JSONObject res = new JSONObject();
        try {
            List<Quotation> quotationList = quotationService.list();
            JSONArray data = JSONArray.fromArray(quotationList.toArray(new Quotation[quotationList.size()]));
            res.put("data", data.toString());
            res.put("status", "success");
            res.put("message", "报价单信息获取成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "报价单信息获取失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }
}
