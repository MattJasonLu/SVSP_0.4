package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.ClientService;
import com.jdlink.service.TransportPlanService;
import com.jdlink.service.WastesService;
import com.jdlink.service.WayBillService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * Created by matt on 2018/8/9.
 * DoubleClickTo 666
 * 运输计划控制器
 */
@Controller
public class TransportPlanController {

    @Autowired
    TransportPlanService transportPlanService;
    @Autowired
    WastesService wastesService;
    @Autowired
    ClientService clientService;
    @Autowired
    WayBillService wayBillService;

    /**
     * 增加运输计划
     * @param transportPlan 运输计划
     * @return 成功与否
     */
    @RequestMapping("addTransportPlan")
    @ResponseBody
    public String addTransportPlan(@RequestBody TransportPlan transportPlan) {
        JSONObject res = new JSONObject();
        try {
            // 设置运输计划编号
            transportPlan.setId(RandomUtil.getRandomEightNumber());
            transportPlan.setAuthor("测试用户");
            transportPlan.setDepartmentDirector("测试用户");
            transportPlan.setProductionDirector("测试用户");
            transportPlan.setGroup("测试组别");
            transportPlan.setCheckState(CheckState.NewBuild);
            for (TransportPlanItem transportPlanItem : transportPlan.getTransportPlanItemList()) {
                // 设置运输计划条目的编号
                transportPlanItem.setId(RandomUtil.getRandomEightNumber());
                Client produceCompany = clientService.getByName(transportPlanItem.getProduceCompany().getCompanyName());
                transportPlanItem.setProduceCompany(produceCompany);
//                transportPlanItem.getWastes().setId(RandomUtil.getRandomEightNumber());
            }
            transportPlanService.add(transportPlan);
            res.put("status", "success");
            res.put("message", "增加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加失败");
        }
        return res.toString();
    }

    @RequestMapping("updateTransportPlan")
    @ResponseBody
    public String updateTransportPlan(@RequestBody TransportPlan transportPlan) {
        JSONObject res = new JSONObject();
        try {
            // 为危废设置编号
            TransportPlan oldTransportPlan = transportPlanService.getById(transportPlan.getId());
            for (int i = 0; i < oldTransportPlan.getTransportPlanItemList().size(); i++) {
                transportPlan.getTransportPlanItemList().get(i).getWastes().setId(oldTransportPlan.getTransportPlanItemList().get(i).getWastes().getId());
            }
            // 更新运输计划
            transportPlanService.update(transportPlan);
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
     * 获取最新的运输计划
     * @return 运输计划对象
     */
    @RequestMapping("getRecentTransportPlan")
    @ResponseBody
    public String getRecentTransportPlan() {
        JSONObject res = new JSONObject();
        try {
            TransportPlan transportPlan =  transportPlanService.getRecent();
            JSONObject data = JSONObject.fromBean(transportPlan);
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
     * 通过编号获取运输计划单
     * @param id 编号
     * @return 运输计划单
     */
    @RequestMapping("getTransportPlanById")
    @ResponseBody
    public String getTransportPlanById(String id) {
        JSONObject res = new JSONObject();
        try {
            TransportPlan transportPlan =  transportPlanService.getById(id);
            JSONObject data = JSONObject.fromBean(transportPlan);
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
     * 获取危废列表
     * @return 危废列表
     */
    @RequestMapping("getTransportPlanWastesList")
    @ResponseBody
    public String getTransportPlanWastesList() {
        JSONObject res = new JSONObject();
        try {
            List<Wastes> wastesList = wastesService.list();
            JSONArray data = JSONArray.fromArray(wastesList.toArray(new Wastes[wastesList.size()]));
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
     *
     * 设置运输计划状态为确认
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanConfirm")
    @ResponseBody
    public String setTransportPlanConfirm(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateConfirm(id);
            res.put("status", "success");
            res.put("message", "确认成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "确认失败");
        }
        return res.toString();
    }

    /**
     *
     * 设置运输计划状态为提交
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanSubmit")
    @ResponseBody
    public String setTransportPlanSubmit(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateSubmit(id);
            res.put("status", "success");
            res.put("message", "提交成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");
        }
        return res.toString();
    }

    /**
     *
     * 设置运输计划状态为审核
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanExamined")
    @ResponseBody
    public String setTransportPlanExamined(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateExamined(id);
            res.put("status", "success");
            res.put("message", "审核成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审核失败");
        }
        return res.toString();
    }

    /**
     *
     * 设置运输计划状态为作废
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanInvalid")
    @ResponseBody
    public String setTransportPlanInvalid(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateInvalid(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }

    @RequestMapping("generateWayBill")
    @ResponseBody
    public String generateWayBill(String id) {
        JSONObject res = new JSONObject();
        try {
            TransportPlan transportPlan = transportPlanService.getById(id);
            Map<String, ArrayList<TransportPlanItem>> map = new HashMap<>();
            // 按公司进行划分为多个列表
            for (TransportPlanItem transportPlanItem : transportPlan.getTransportPlanItemList()) {
                // 获取客户编号
                String clientId = transportPlanItem.getProduceCompany().getClientId();
                // 判断编号是否存在于数组中，若不存在则初始化列表
                if (!map.keySet().contains(clientId)) {
                    map.put(clientId, new ArrayList<TransportPlanItem>());
                }
                map.get(clientId).add(transportPlanItem);
            }
            // 根据不同公司的列表生成接运单，一个公司一个接运单
            Iterator<Map.Entry<String, ArrayList<TransportPlanItem>>> entries = map.entrySet().iterator();
            while (entries.hasNext()) {
                Map.Entry<String, ArrayList<TransportPlanItem>> entry = entries.next();
                ArrayList<TransportPlanItem> itemList = entry.getValue();
                // 创建接运单
                WayBill wayBill = new WayBill();
                // 设置接运单的编号
                wayBill.setId(wayBillService.getCurrentWayBillId());
                // 设置接运单中的生产公司
                wayBill.setProduceCompanyId(itemList.get(0).getProduceCompany().getClientId());
                wayBill.setProduceCompanyName(itemList.get(0).getProduceCompany().getCompanyName());
                wayBill.setWayBillDate(new Date());
                wayBill.setFounder("管理员");
                wayBill.setProduceCompanyOperator("管理员");
                // 获取当前公司的业务员
                Salesman salesman = null;
                Client client = clientService.getByClientId(itemList.get(0).getProduceCompany().getClientId());
                Client reveiveClient = clientService.getByClientId("0038");
                if (client != null) {
                    if (client.getSalesman() != null) salesman = client.getSalesman();
                }
                List<WayBillItem> wayBillItemList = new ArrayList<>();
                int itemId = Integer.parseInt(wayBillService.getItemId());
                // 创建接运单中的接运单条目
                for (TransportPlanItem transportPlanItem : itemList) {
                    WayBillItem wayBillItem = new WayBillItem();
                    // 设置接运单条目的编号
                    wayBillItem.setItemId(String.valueOf(itemId));
                    // 设置接运单条目的危废
                    wayBillItem.setWastesId(transportPlanItem.getWastes().getId());
                    wayBillItem.setWastesCode(transportPlanItem.getWastes().getName());
                    wayBillItem.setWastesAmount((float)transportPlanItem.getWastes().getWasteAmount());
                    wayBillItem.setWastesPrice(transportPlanItem.getWastes().getUnitPriceTax());
                    wayBillItem.setWastesName(transportPlanItem.getWastes().getName());
                    wayBillItem.setWastesTotalPrice(wayBillItem.getWastesPrice() * wayBillItem.getWastesAmount());
                    // 设置接运单条目的业务员
                    wayBillItem.setSalesmanName(salesman.getName());
                    // 设置接运单条目的接运单日期
                    wayBillItem.setReceiveDate(transportPlanItem.getApproachTime());
                    // 设置接收单位
                    wayBillItem.setReceiveCompanyName(reveiveClient.getCompanyName());
                    wayBillItem.setReceiveCompanyOperator("管理员");
                    // 增加接运单条目
                    wayBillItemList.add(wayBillItem);
                    itemId++;
                }
                // 设置接运单条目列表
                wayBill.setWayBillItemList(wayBillItemList);
                // 增加接运单
                wayBillService.addWayBill(wayBill);
            }
            res.put("status", "success");
            res.put("message", "生成成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "生成失败");
        }
        return res.toString();
    }

    /**
     * 读取运输计划单的分页数据
     * @param page 页码
     * @return 运输计划单数据
     */
    @RequestMapping("listTransportPlanByPage")
    @ResponseBody
    public String listTransportPlanByPage(Page page) {
        JSONObject res = new JSONObject();
        try {
            List<TransportPlan> transportPlanList = transportPlanService.list(page);
            JSONArray data = JSONArray.fromArray(transportPlanList.toArray(new TransportPlan[transportPlanList.size()]));
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

    /**
     * 获取运输单的数量
     * @return 运输单的数量
     */
    @RequestMapping("transportPlanCount")
    @ResponseBody
    public int transportPlanCount() {
        try {
            return transportPlanService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查找运输计划单
     * @param transportPlan 运输计划单
     * @return 查询
     */
    @RequestMapping("searchTransportPlan")
    @ResponseBody
    public String searchTransportPlan(@RequestBody TransportPlan transportPlan) {
        JSONObject res = new JSONObject();
        try {
            List<TransportPlan> transportPlanList = transportPlanService.search(transportPlan);
            JSONArray data = JSONArray.fromArray(transportPlanList.toArray(new TransportPlan[transportPlanList.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    /**
     * 查询运输单的数量
     * @return 运输单的数量
     */
    @RequestMapping("searchTransportPlanCount")
    @ResponseBody
    public int searchTransportPlanCount(@RequestBody TransportPlan transportPlan) {
        try {
            return transportPlanService.searchCount(transportPlan);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }
}
