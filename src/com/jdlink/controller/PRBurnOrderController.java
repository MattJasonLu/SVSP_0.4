package com.jdlink.controller;

import com.jdlink.domain.Produce.BurnOrder;
import com.jdlink.domain.Produce.Pretreatment;
import com.jdlink.service.BurnOrderService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PRBurnOrderController {
    @Autowired
    BurnOrderService burnOrderService;

    /**
     * 获取当前焚烧单编号
     *
     * @return
     */
    @RequestMapping("getCurrentBurnOrderId")
    @ResponseBody
    public String getCurrentBurnOrderId() {
        String id = burnOrderService.getCurrentBurnOrderId();
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    /**
     * 根据Id获取对象数据
     *
     * @param id
     * @return
     */
    @RequestMapping("getBurnOrderById")
    @ResponseBody
    public String getBurnOrderById(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            BurnOrder burnOrder = burnOrderService.getById(id);
            //新建一个对象并给它赋值
            JSONObject data = JSONObject.fromBean(burnOrder);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    @RequestMapping("updateTemporaryAddressById")
    @ResponseBody
    public String updateTemporaryAddressById(@RequestBody Pretreatment pretreatment) {
        JSONObject res = new JSONObject();
        try {
            burnOrderService.updateTemporaryAddressById(pretreatment);
            res.put("status", "success");
            res.put("message", "暂存点更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "暂存点更新失败");
        }
        return res.toString();
    }

    @RequestMapping("insertNewBurnOrder")
    @ResponseBody
    public String updateNewBurnOrder(@RequestBody BurnOrder burnOrder) {
        JSONObject res = new JSONObject();
        try {



            burnOrderService.insert(burnOrder);
            res.put("status", "success");
            res.put("message", "新建焚烧单数据更新成功");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新建焚烧单数据更新失败");
        }
        return res.toString();
    }
}
