package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Quotation;
import com.jdlink.domain.Wastes;
import com.jdlink.service.QuotationService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.NumberFormat;
import java.util.List;

/**
 * Created by matt on 2018/7/3.
 */
@Controller
public class QuotationController {

    @Autowired
    QuotationService quotationService;

    /**
     * 保存报价单
     * @param quotation 报价单
     * @return 成功与否
     */
    @RequestMapping("saveQuotation")
    @ResponseBody
    public String saveQuotation(@RequestBody Quotation quotation) {
        quotation.setCheckState(CheckState.ToSubmit);
        return addQuotation(quotation);
    }

    /**
     * 提交报价单
     * @param quotation 报价单
     * @return 成功与否
     */
    @RequestMapping("submitQuotation")
    @ResponseBody
    public String submitQuotation(@RequestBody Quotation quotation) {
        quotation.setCheckState(CheckState.Examining);
        return addQuotation(quotation);
    }

    /**
     * 作废报价单
     * @param id 报价单编号
     * @return 成功与否
     */
    @RequestMapping("setStateDisabled")
    @ResponseBody
    public String setStateDisabled(String id) {
        JSONObject res = new JSONObject();
        try {
            quotationService.setStateDisabled(id);
            res.put("status", "success");
            res.put("message", "报价单作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "报价单作废失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 修改结束日期
     * @param quotation 报价单
     * @return 成功与否
     */
    @RequestMapping("changeEndDate")
    @ResponseBody
    public String changeEndDate(Quotation quotation) {
        JSONObject res = new JSONObject();
        try {
            quotationService.changeEndDate(quotation);
            res.put("status", "success");
            res.put("message", "结束日期修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "结束日期修改失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

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
            // 设置每个危废的编码,唯一
            for (Wastes wastes : quotation.getWastesList()) {
                wastes.setId(RandomUtil.getRandomEightNumber());
            }
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
            List<Wastes> oldWastesList = quotationService.getById(quotation.getId()).getWastesList();
            List<Wastes> newWastesList = quotation.getWastesList();
            for (int i = 0; i < oldWastesList.size(); i++) {
                newWastesList.get(i).setId(oldWastesList.get(i).getId());
            }
            for (int i = oldWastesList.size(); i < newWastesList.size(); i++) {
                newWastesList.get(i).setId(RandomUtil.getRandomEightNumber());
            }
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
     * 更新报价单
     * @param quotation 报价单
     * @return 成功与否
     */
    @RequestMapping("levelUpQuotation")
    @ResponseBody
    public String levelUpQuotation(@RequestBody Quotation quotation) {
        JSONObject res = new JSONObject();
        try {
            for (Wastes wastes : quotation.getWastesList()) {
                wastes.setId(RandomUtil.getRandomEightNumber());
            }
            // 作废旧报价单
            quotationService.setStateDisabled(quotation.getId());
            quotation.setId((quotationService.count() + 1) + "");
            // 升级新报价单
            quotationService.levelUp(quotation);
            res.put("status", "success");
            res.put("message", "报价单升级成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "报价单升级失败");
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

    /**
     * 获取报价单号
     * @return 报价单号
     */
    @RequestMapping(value = {"getCurrentQuotationId", "client/getCurrentQuotationId"})
    @ResponseBody
    public String getCurrentQuotationId() {
        JSONObject res = new JSONObject();
        try {
            //得到一个NumberFormat的实例
            NumberFormat nf = NumberFormat.getInstance();
            //设置是否使用分组
            nf.setGroupingUsed(false);
            //设置最大整数位数
            nf.setMaximumIntegerDigits(4);
            //设置最小整数位数
            nf.setMinimumIntegerDigits(4);
            // 获取最新编号
            String id;
            int index = quotationService.count();
            // 获取唯一的编号
            do {
                index += 1;
                id = nf.format(index);
            } while (quotationService.getByQuotationId(id) != null);
            res.put("status", "success");
            res.put("message", "获取报价单编号成功");
            res.put("quotationId", id);
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "获取报价单编号失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 通过报价单编号获取报价单
     * @param id 报价单编号
     * @return 报价单对象
     */
    @RequestMapping("getQuotation")
    @ResponseBody
    public String getQuotation(String id) {
        JSONObject res = new JSONObject();
        try {
            Quotation quotation = quotationService.getById(id);
            if (quotation == null) throw new Exception("没有该报价单!");
            JSONObject data = JSONObject.fromBean(quotation);
            res.put("status", "success");
            res.put("data", data.toString());
            res.put("message", "获取报价单信息成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取报价单信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }
}
