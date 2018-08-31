package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Inventory.*;
import com.jdlink.domain.User;
import com.jdlink.service.InboundService;
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
            inboundOrder.setBoundType(BoundType.NormalOutbound);
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

            }
            // 增加入库单
            inboundService.addInboundOrder(inboundOrder);
            res.put("status", "success");
            res.put("message", "获取信息成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

}
