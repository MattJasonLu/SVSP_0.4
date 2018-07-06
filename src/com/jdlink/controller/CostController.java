package com.jdlink.controller;

import com.jdlink.domain.Cost;
import com.jdlink.domain.Wastes;
import com.jdlink.service.CostService;
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
public class CostController {

    @Autowired
    CostService costService;

    /**
     * 增加成本单
     * @param cost 成本单
     * @return 成功与否
     */
    @RequestMapping("addCost")
    @ResponseBody
    public String addCost(@RequestBody Cost cost) {
        JSONObject res = new JSONObject();
        try {
            // 设置每个危废的编码,唯一
            for (Wastes wastes : cost.getWastesList()) {
                wastes.setId(RandomUtil.getRandomEightNumber());
            }
            costService.add(cost);
            res.put("status", "success");
            res.put("message", "成本单增加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "成本单增加失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 更新成本单
     * @param cost 成本单
     * @return 成功与否
     */
    @RequestMapping("updateCost")
    @ResponseBody
    public String updateCost(@RequestBody Cost cost) {
        JSONObject res = new JSONObject();
        try {
            List<Wastes> oldWastesList = costService.getById(cost.getCostId()).getWastesList();
            List<Wastes> newWastesList = cost.getWastesList();
            for (int i = 0; i < oldWastesList.size(); i++) {
                newWastesList.get(i).setId(oldWastesList.get(i).getId());
            }
            for (int i = oldWastesList.size(); i < newWastesList.size(); i++) {
                newWastesList.get(i).setId(RandomUtil.getRandomEightNumber());
            }
            costService.update(cost);
            res.put("status", "success");
            res.put("message", "成本单修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "成本单修改失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 列出所有成本单对象
     * @param supplierId 供应商编号
     * @return 成本单对象列表
     */
    @RequestMapping("listCost")
    @ResponseBody
    public String listCost(String supplierId) {
        JSONObject res = new JSONObject();
        try {
            List<Cost> costList = costService.list();
            JSONArray data = JSONArray.fromArray(costList.toArray(new Cost[costList.size()]));
            res.put("data", data.toString());
            res.put("status", "success");
            res.put("message", "成本单信息获取成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "成本单信息获取失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 获取成本单号
     * @return 成本单号
     */
    @RequestMapping(value = {"getCurrentCostId", "client/getCurrentCostId"})
    @ResponseBody
    public String getCurrentCostId() {
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
            int index = costService.count();
            // 获取唯一的编号
            do {
                index += 1;
                id = nf.format(index);
            } while (costService.getById(id) != null);
            res.put("status", "success");
            res.put("message", "获取成本单编号成功");
            res.put("costId", id);
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "获取成本单编号失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 通过成本单编号获取成本单
     * @param costId 成本单编号
     * @return 成本单对象
     */
    @RequestMapping("getCost")
    @ResponseBody
    public String getCost(String costId) {
        JSONObject res = new JSONObject();
        try {
            Cost cost = costService.getById(costId);
            if (cost == null) throw new Exception("没有该成本单!");
            JSONObject data = JSONObject.fromBean(cost);
            res.put("status", "success");
            res.put("data", data.toString());
            res.put("message", "获取成本单信息成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取成本单信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }
}
