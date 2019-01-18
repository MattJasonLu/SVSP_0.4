package com.jdlink.controller;

import com.jdlink.domain.OfficeSuppliesInbound;
import com.jdlink.domain.OfficeSuppliesItem;
import com.jdlink.domain.OfficeSuppliesOutbound;
import com.jdlink.service.OfficeSuppliesService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 办公用品控制器
 */
@Controller
public class OfficeSuppliesController {

    @Autowired
    OfficeSuppliesService officeSuppliesService;

    /*******************************************************入库部分********************************************************/

    /**
     * 列出所有入库单数据
     * @return 入库单数据
     */
    @RequestMapping("listOfficeSuppliesInbound")
    @ResponseBody
    public String listOfficeSuppliesInbound(@RequestBody OfficeSuppliesItem officeSuppliesItem) {
        JSONObject res = new JSONObject();
        try {
            List<OfficeSuppliesInbound> officeSuppliesInboundList = officeSuppliesService.listOfficeSuppliesInbound(officeSuppliesItem);
            JSONArray data = JSONArray.fromArray(officeSuppliesInboundList.toArray(new OfficeSuppliesInbound[officeSuppliesInboundList.size()]));
            res.put("status", "success");
            res.put("message", "获取数据成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /**
     * 增加办公用品入库单
     * @param officeSuppliesInbound 办公用品入库单
     * @return 成功与否
     */
    @RequestMapping("addOfficeSuppliesInbound")
    @ResponseBody
    public String addOfficeSuppliesInbound(@RequestBody OfficeSuppliesInbound officeSuppliesInbound) {
        JSONObject res = new JSONObject();
        try {
            officeSuppliesService.addOfficeSuppliesInbound(officeSuppliesInbound);
            res.put("status", "success");
            res.put("message", "新增成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新增失败");
        }
        return res.toString();
    }

    /*******************************************************入库部分********************************************************/



    /*******************************************************出库部分********************************************************/

    /**
     * 列出所有出库单数据
     * @return 出库单数据
     */
    @RequestMapping("listOfficeSuppliesOutbound")
    @ResponseBody
    public String listOfficeSuppliesOutbound(@RequestBody OfficeSuppliesItem officeSuppliesItem) {
        JSONObject res = new JSONObject();
        try {
            List<OfficeSuppliesOutbound> officeSuppliesOutboundList = officeSuppliesService.listOfficeSuppliesOutbound(officeSuppliesItem);
            JSONArray data = JSONArray.fromArray(officeSuppliesOutboundList.toArray(new OfficeSuppliesOutbound[officeSuppliesOutboundList.size()]));
            res.put("status", "success");
            res.put("message", "获取数据成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /**
     * 增加办公用品出库单
     * @param officeSuppliesOutbound 办公用品出库单
     * @return 成功与否
     */
    @RequestMapping("addOfficeSuppliesOutbound")
    @ResponseBody
    public String addOfficeSuppliesOutbound(@RequestBody OfficeSuppliesOutbound officeSuppliesOutbound) {
        JSONObject res = new JSONObject();
        try {
            officeSuppliesService.addOfficeSuppliesOutbound(officeSuppliesOutbound);
            res.put("status", "success");
            res.put("message", "新增成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新增失败");
        }
        return res.toString();
    }

    /*******************************************************出库部分********************************************************/

}
