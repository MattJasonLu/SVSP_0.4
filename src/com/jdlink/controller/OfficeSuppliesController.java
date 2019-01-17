package com.jdlink.controller;

import com.jdlink.domain.OfficeSuppliesItem;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 办公用品控制器
 */
@Controller
public class OfficeSuppliesController {

    /**
     * 列出所有入库单数据
     * @return 入库单数据
     */
    @RequestMapping("listOfficeSuppliesInbound")
    @ResponseBody
    public String listOfficeSuppliesInbound(@RequestBody OfficeSuppliesItem officeSuppliesItem) {
        JSONObject res = new JSONObject();
        try {

            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /**
     * 列出所有出库单数据
     * @return 出库单数据
     */
    @RequestMapping("listOfficeSuppliesOutbound")
    @ResponseBody
    public String listOfficeSuppliesOutbound(@RequestBody OfficeSuppliesItem officeSuppliesItem) {
        JSONObject res = new JSONObject();
        try {

            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

}
