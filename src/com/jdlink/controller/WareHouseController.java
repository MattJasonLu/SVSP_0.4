package com.jdlink.controller;

import com.jdlink.domain.Inventory.WareHouse;
import com.jdlink.service.WareHouseService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 仓库控制器
 */
@Controller
public class WareHouseController {

    /**
     * 仓库服务
     */
    @Autowired
    WareHouseService wareHouseService;

    /**
     * 取出所有仓库
     * @return 仓库列表
     */
    @RequestMapping("listWareHouse")
    @ResponseBody
    public String listWareHouse() {
        JSONObject res=new JSONObject();
        try {
            List<WareHouse> wareHouseList = wareHouseService.list();
            JSONArray data = JSONArray.fromArray(wareHouseList.toArray(new WareHouse[wareHouseList.size()]));
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

    /**
     * 通过主键获取仓库对象
     * @param id 主键
     * @return 仓库对象
     */
    @RequestMapping("getWareHouseById")
    @ResponseBody
    public String getWareHouseById(String id) {
        JSONObject res=new JSONObject();
        try {
            WareHouse wareHouse = wareHouseService.getWareHouseById(id);
            if (wareHouse == null) throw new NullPointerException("未找到数据");
            JSONObject data = JSONObject.fromBean(wareHouse);
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

    /**
     * 更新仓库对象
     * @param wareHouse 仓库对象
     * @return 成功与否
     */
    @RequestMapping("updateWareHouse")
    @ResponseBody
    public String updateWareHouse(@RequestBody WareHouse wareHouse) {
        JSONObject res=new JSONObject();
        try {
            wareHouseService.update(wareHouse);
            res.put("status", "success");
            res.put("message", "更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();
    }

    /**
     * 删除仓库对象
     * @param id 主键
     * @return 成功与否
     */
    @RequestMapping("deleteWareHouseById")
    @ResponseBody
    public String deleteWareHouseById(String id) {
        JSONObject res=new JSONObject();
        try {
            wareHouseService.delete(id);
            res.put("status", "success");
            res.put("message", "删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除失败");
        }
        return res.toString();
    }

    /**
     * 增加仓库
     * @param wareHouse 仓库对象
     * @return 成功与否
     */
    @RequestMapping("addWareHouse")
    @ResponseBody
    public String addWareHouse(@RequestBody WareHouse wareHouse) {
        JSONObject res = new JSONObject();
        try {
            // 增加仓库对象
            wareHouseService.add(wareHouse);
            res.put("status", "success");
            res.put("message", "新增成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新增失败");
        }
        return res.toString();
    }

    /**
     * 通过名称获取仓库对象
     * @param name 仓库名
     * @return 仓库对象
     */
    @RequestMapping("getWareHouseByName")
    @ResponseBody
    public String getWareHouseByName(String name) {
        JSONObject res=new JSONObject();
        try {
            WareHouse wareHouse = wareHouseService.getWareHouseByName(name);
            if (wareHouse == null) throw new NullPointerException("未找到数据");
            JSONObject data = JSONObject.fromBean(wareHouse);
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

}
