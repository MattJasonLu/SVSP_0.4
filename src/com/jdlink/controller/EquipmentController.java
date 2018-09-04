package com.jdlink.controller;

import com.jdlink.domain.Produce.EquipmentDate;
import com.jdlink.service.EquipmentService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;

/**
 * 设备控制器，用于捕获url路径并进行操作返回数据
 */
@Controller
public class EquipmentController {

    /**
     * 设备服务，用于CRUD(Create、Retrieve、Update、Delete)
     */
    @Autowired
    EquipmentService equipmentService;

    /**
     * 通过日期查询设备明细集合
     * @param id 序号
     * @return 设备明细集合
     */
    @RequestMapping("getEquipment")
    @ResponseBody
    public String getEquipment(Integer id) {
        // 新建一个用于存放数据的结果集
        JSONObject res = new JSONObject();
        try{
            // 通过日期查询到数据列表
            List<EquipmentDate> equipmentList = equipmentService.getEquipment(id);
            // 获取数据：将数据列表转换成json数组(把list列表转换成json数组的通用写法)
            JSONArray data = JSONArray.fromArray(equipmentList.toArray());
            // 存放数据
            res.put("status", "success");
            res.put("message", "获取信息条目成功");
            res.put("data", data);
            // 返回结果集
            return res.toString();
        } catch (Exception e) {
            // 获取枚举
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息条目失败");
            // 返回结果
            return res.toString();
        }
    }

    /**
     * 列出所有设备按日期
     * @return 设备列表
     */
    @RequestMapping("listEquipment")
    @ResponseBody
    public String listEquipment() {
        JSONObject res = new JSONObject();
        try {
            // 获取设备列表
            List<EquipmentDate> equipmentList = equipmentService.listEquipment();
            JSONArray data = JSONArray.fromArray(equipmentList.toArray());
            res.put("status", "success");
            res.put("message", "操作成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "操作失败");
        }
        return res.toString();
    }
}
