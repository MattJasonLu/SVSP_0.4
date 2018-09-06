package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Inventory.*;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.service.ClientService;
import com.jdlink.service.InboundService;
import com.jdlink.service.LaboratoryTestService;
import com.jdlink.service.QuotationService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/8/22.
 * DoubleClickTo 666
 */
@Controller
public class InboundController {

    @Autowired
    InboundService inboundService;
    @Autowired
    ClientService clientService;
    @Autowired
    QuotationService quotationService;
    @Autowired
    LaboratoryTestService laboratoryTestService;

    /**
     * 列出所有入库计划单信息
     * @return 入库计划单列表
     */
    @RequestMapping("listInboundPlanOrder")
    @ResponseBody
    public String listInboundPlanOrder() {
        JSONObject res = new JSONObject();
        try {
            List<InboundPlanOrder> inboundPlanOrderList = inboundService.listInboundPlanOrder();
            JSONArray data = JSONArray.fromArray(inboundPlanOrderList.toArray(new InboundPlanOrder[inboundPlanOrderList.size()]));
            for (int i = 0; i < inboundPlanOrderList.size(); i++) {
                InboundPlanOrder inboundPlanOrder = inboundPlanOrderList.get(i);
                // 通过客户编码和危废编码获取价格
                String clientId = inboundPlanOrder.getProduceCompany().getClientId();
                String wastesCode = inboundPlanOrder.getWastes().getWastesId();
                QuotationItem quotationItem = quotationService.getQuotationByWastesCodeAndClientId(wastesCode, clientId);
                // 获取价格，如果价格存在则存入数据
                if (quotationItem != null) {
                    float unitPriceTax = quotationItem.getUnitPriceTax();
                    data.getJSONObject(i).put("unitPriceTax", unitPriceTax);
                }
            }
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
     * 查询入库计划单列表
     * @param inboundPlanOrder 入库计划单数据
     * @return 查询结果
     */
    @RequestMapping("searchInboundPlanOrder")
    @ResponseBody
    public String searchInboundPlanOrder(@RequestBody InboundPlanOrder inboundPlanOrder) {
        JSONObject res = new JSONObject();
        try {
            List<InboundPlanOrder> inboundPlanOrderList = inboundService.searchInboundPlanOrder(inboundPlanOrder);
            JSONArray data = JSONArray.fromArray(inboundPlanOrderList.toArray(new InboundPlanOrder[inboundPlanOrderList.size()]));
            // 获取入库单列表
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
     * 增加入库单
     * @param inboundOrder
     * @return
     */
    @RequestMapping("addInboundOrder")
    @ResponseBody
    public String addInboundOrder(@RequestBody InboundOrder inboundOrder, HttpSession session) {
        JSONObject res = new JSONObject();
        try {
            // 设置编号
            inboundOrder.setInboundOrderId(inboundService.getInboundOrderId());
            // 设置记录状态
            inboundOrder.setRecordState(RecordState.Usable);
            // 设置审核状态
            inboundOrder.setCheckState(CheckState.NewBuild);
            // 设置入库类别
            inboundOrder.setBoundType(BoundType.WasteInbound);
            // 获取用户登录信息
            User user = (User) session.getAttribute("user");
            if (user != null) {
                // 设置创建人和编辑人
                inboundOrder.setCreatorId(String.valueOf(user.getId()));
                inboundOrder.setModifierId(String.valueOf(user.getId()));
            }
            inboundOrder.setInboundDate(new Date());
            // 设置修改时间
            inboundOrder.setModifyDate(new Date());
            // 设置创建日期为当前日期
            inboundOrder.setCreateDate(new Date());
            // 遍历入库条目
            for (InboundOrderItem inboundOrderItem : inboundOrder.getInboundOrderItemList()) {
                // 设置条目编号为随机八位码
                inboundOrderItem.setInboundOrderItemId(RandomUtil.getRandomEightNumber());
                // 入库单号
                inboundOrderItem.setInboundOrderId(inboundOrder.getInboundOrderId());
                Client produceCompany = clientService.getByName(inboundOrderItem.getProduceCompany().getCompanyName());
                // 设置生产单位
                inboundOrderItem.setProduceCompany(produceCompany);
                // 根据客户编号和危废编码找到化验单中的对应的信息，绑定
                String clientId = produceCompany.getClientId();
                String wastesCode = inboundOrderItem.getWastes().getWastesId();
                LaboratoryTest laboratoryTest = laboratoryTestService.getLaboratoryTestByWastesCodeAndClientId(wastesCode, clientId);
                if (laboratoryTest != null) inboundOrderItem.setLaboratoryTest(laboratoryTest);
            }
            // 增加入库单
            inboundService.addInboundOrder(inboundOrder);
            res.put("status", "success");
            res.put("message", "增加入库单成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加入库单失败");
        }
        return res.toString();
    }

    /**
     * 列出所有入库单
     * @return 入库单列表
     */
    @RequestMapping("listInboundOrder")
    @ResponseBody
    public String listInboundOrder(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 获取入库单列表
            List<InboundOrder> inboundOrderList = inboundService.listInboundOrder(page);
            JSONArray data = JSONArray.fromArray(inboundOrderList.toArray(new InboundOrder[inboundOrderList.size()]));
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
     * 作废入库单
     * @param inboundOrderId 入库单编号
     * @return 成功与否
     */
    @RequestMapping("setInboundOrderStateInvalid")
    @ResponseBody
    public String setInboundOrderStateInvalid(String inboundOrderId) {
        JSONObject res = new JSONObject();
        try {
            // 作废入库单
            inboundService.setInboundOrderStateInvalid(inboundOrderId);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }

    /**
     * 通过编号获取入库单
     * @param inboundOrderId 入库单编号
     * @return 入库单对象
     */
    @RequestMapping("getInboundOrderById")
    @ResponseBody
    public String getInboundOrderById(String inboundOrderId) {
        JSONObject res = new JSONObject();
        try {
            InboundOrder inboundOrder = inboundService.getInboundOrderById(inboundOrderId);
            JSONObject data = JSONObject.fromBean(inboundOrder);
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

    @RequestMapping("updateItemHandleCategory")
    @ResponseBody
    public String updateItemHandleCategory(@RequestBody InboundOrderItem InboundOrderItem) {
        JSONObject res = new JSONObject();
        try {
            // 更新进料方式
            inboundService.updateItemHandleCategory(InboundOrderItem);
            res.put("status", "success");
            res.put("message", "属性修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "属性修改失败");
        }
        return res.toString();
    }

    /**
     * 获取入库单的数量
     * @return 入库单数量
     */
    @RequestMapping("countInboundOrder")
    @ResponseBody
    public int countInboundOrder() {
        try {
            return inboundService.countInboundOrder();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取入库单的数量
     * @return 入库单数量
     */
    @RequestMapping("countSecondInboundOrder")
    @ResponseBody
    public int countSecondInboundOrder() {
        try {
            return inboundService.countSecondInboundOrder();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 列出所有次生入库单
     * @return 次生入库单列表
     */
    @RequestMapping("listSecondInboundOrder")
    @ResponseBody
    public String listSecondInboundOrder(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 获取入库单列表
            List<InboundOrder> inboundOrderList = inboundService.listSecondInboundOrder(page);
            JSONArray data = JSONArray.fromArray(inboundOrderList.toArray(new InboundOrder[inboundOrderList.size()]));
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

    @RequestMapping("addSecondInboundOrder")
    @ResponseBody
    public String addSecondInboundOrder(@RequestBody InboundOrder inboundOrder) {
        JSONObject res = new JSONObject();
        try {
            inboundOrder.setInboundOrderId(inboundService.getInboundOrderId());
            // 获取入库单列表
            inboundOrder.setBoundType(BoundType.SecondaryInbound);
            inboundOrder.setCheckState(CheckState.NewBuild);
            inboundOrder.setRecordState(RecordState.Usable);
            for (InboundOrderItem inboundOrderItem : inboundOrder.getInboundOrderItemList()) {
                inboundOrderItem.setInboundOrderItemId(RandomUtil.getRandomEightNumber());
                String companyName = inboundOrderItem.getProduceCompany().getCompanyName();
                // 通过名字查找客户
                Client produceCompany = clientService.getByName(companyName);
                // 如果查找到的公司为空则添加到客户表
                if (produceCompany == null) {
                    inboundOrderItem.getProduceCompany().setClientId(clientService.getCurrentId());
                    clientService.add(inboundOrderItem.getProduceCompany());
                } else {
                    inboundOrderItem.setProduceCompany(produceCompany);
                }
                // 设置编号
                inboundOrderItem.getLaboratoryTest().setLaboratoryTestNumber(laboratoryTestService.getCurrentId());
            }
            inboundService.addSecondInboundOrder(inboundOrder);
            res.put("status", "success");
            res.put("message", "增加次生入库单成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加次生入库单失败");
        }
        return res.toString();
    }

}
