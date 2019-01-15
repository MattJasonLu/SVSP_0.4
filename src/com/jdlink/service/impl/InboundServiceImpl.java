package com.jdlink.service.impl;

import com.jdlink.domain.Inventory.InboundOrder;
import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Inventory.InboundPlanOrder;
import com.jdlink.domain.Page;
import com.jdlink.mapper.InboundMapper;
import com.jdlink.service.InboundService;
import com.jdlink.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/8/22.
 * DoubleClickTo 666
 */
@Service
public class InboundServiceImpl implements InboundService {

    @Autowired
    InboundMapper inboundMapper;

    @Override
    public List<InboundPlanOrder> listInboundPlanOrder(InboundPlanOrder inboundPlanOrder) {
        return inboundMapper.listInboundPlanOrder(inboundPlanOrder);
    }

    @Override
    public int countInboundPlanOrder(InboundPlanOrder inboundPlanOrder) {
        return inboundMapper.countInboundPlanOrder(inboundPlanOrder);
    }

    @Override
    public void updateInboundPlanPounds(InboundPlanOrder inboundPlanOrder) {
        inboundMapper.updateInboundPlanPounds(inboundPlanOrder);
    }

    @Override
    public void addInboundPlanOrder(InboundPlanOrder inboundPlanOrder) {
        inboundMapper.addInboundPlanOrder(inboundPlanOrder);
    }

    @Override
    public InboundPlanOrder getInboundPlanOrder(String inboundPlanOrderId) {
        return inboundMapper.getInboundPlanOrder(inboundPlanOrderId);
    }

    @Override
    public void setInboundPlanOrderInvalid(String inboundPlanOrderId) {
        String newId = RandomUtil.getRandomEightNumber();
        inboundMapper.setInboundPlanOrderInvalid(inboundPlanOrderId, newId);
    }

    @Override
    public void setInboundPlanOrderSignIn(String inboundPlanOrderId) {
        inboundMapper.setInboundPlanOrderSignIn(inboundPlanOrderId);
    }

    @Override
    public void setInboundPlanOrderReject(InboundPlanOrder inboundPlanOrder) {
        inboundMapper.setInboundPlanOrderReject(inboundPlanOrder);
    }

    @Override
    public List<InboundPlanOrder> searchInboundPlanOrder(InboundPlanOrder inboundPlanOrder) {
        return inboundMapper.searchInboundPlanOrder(inboundPlanOrder);
    }

    @Override
    public String getInboundPlanOrderId() {
        Calendar calendar = Calendar.getInstance();
        // 获取年份
        String year = String.valueOf(calendar.get(Calendar.YEAR));
        // 获取月份
        //得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
//        //设置是否使用分组
//        nf.setGroupingUsed(false);
//        //设置最大整数位数
//        nf.setMaximumIntegerDigits(2);
//        //设置最小整数位数
//        nf.setMinimumIntegerDigits(2);
//        // 获取最新编号
//        String month = nf.format(calendar.get(Calendar.MONTH) + 1);
//        String prefix = year + month;
        // 获取数量
        String prefix = year;
        int count = getInboundPlanCountByPrefix(prefix) + 1;
        //得到一个NumberFormat的实例
        nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(5);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(5);
        // 获取最新编号
        String countStr = nf.format(count);
        return "HWPL" + year + countStr;
    }

    @Override
    public int getInboundPlanCountByPrefix(String prefix) {
        return inboundMapper.getInboundPlanCountByPrefix(prefix);
    }

    @Override
    public String getInboundOrderId() {
        // 获取入库单的数量
        int count = countInboundOrder();
        //得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(4);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(4);
        String id = null;
        do {
            count += 1;
            id = nf.format(count);
        } while (existInboundOrderId("1H"+id) || existInboundOrderId("2H"+id) ||
                existInboundOrderId("3H"+id) || existInboundOrderId("4H"+id) ||
                existInboundOrderId("ZN"+id) || existInboundOrderId("ZC"+id) ||
                existInboundOrderId("CS"+id) || existInboundOrderId("FL"+id) ||
                existInboundOrderId("WJ"+id));
        return id;
    }

    @Override
    public void addInboundOrder(InboundOrder inboundOrder) {
        inboundMapper.addInboundOrder(inboundOrder);
    }

    @Override
    public List<InboundOrder> listInboundOrder(Page page) {
        return inboundMapper.listInboundOrder(page);
    }

    @Override
    public List<InboundOrder> searchInboundOrder(InboundOrder inboundOrder) {
        return inboundMapper.searchInboundOrder(inboundOrder);
    }

    @Override
    public int searchInboundOrderCount(InboundOrder inboundOrder) {
        return inboundMapper.searchInboundOrderCount(inboundOrder);
    }

    @Override
    public void setInboundOrderStateInvalid(String inboundOrderId) {
        inboundMapper.setInboundOrderStateInvalid(inboundOrderId);
    }

    @Override
    public void setInboundOrderStateSubmit(String inboundOrderId) {
        inboundMapper.setInboundOrderStateSubmit(inboundOrderId);
    }

    @Override
    public InboundOrder getInboundOrderById(String inboundOrderId) {
        return inboundMapper.getInboundOrderById(inboundOrderId);
    }

    @Override
    public void updateInboundOrderItem(InboundOrderItem inboundOrderItem) {
        inboundMapper.updateInboundOrderItem(inboundOrderItem);
    }

    @Override
    public void updateItemHandleCategory(InboundOrderItem inboundOrderItem) {
        inboundMapper.updateItemHandleCategory(inboundOrderItem);
    }

    @Override
    public boolean existInboundOrderId(String inboundOrderId) {
        return inboundMapper.existInboundOrderId(inboundOrderId);
    }

    @Override
    public int countInboundOrder() {
        return inboundMapper.countInboundOrder();
    }

    @Override
    public int countSecondInboundOrder(InboundOrder inboundOrder) {
        return inboundMapper.countSecondInboundOrder(inboundOrder);
    }

    @Override
    public List<InboundOrder> listSecondInboundOrder(InboundOrder inboundOrder) {
        return inboundMapper.listSecondInboundOrder(inboundOrder);
    }

    @Override
    public void addSecondInboundOrder(InboundOrder inboundOrder) {
        inboundMapper.addSecondInboundOrder(inboundOrder);
    }

    @Override
    public void updateSecondInboundOrder(InboundOrder inboundOrder) {
        inboundMapper.updateSecondInboundOrder(inboundOrder);
    }

    @Override
    public List<InboundOrderItem> getInboundOrderItemByRange(Date startDate, Date endDate) {
        return inboundMapper.getInboundOrderItemByRange(startDate, endDate);
    }

    @Override
    public List<InboundOrderItem> getSecondInboundOrderItemByRange(Date startDate, Date endDate) {
        return inboundMapper.getSecondInboundOrderItemByRange(startDate, endDate);
    }

    @Override
    public List<InboundOrderItem> getInboundOrderItemByClientId(String id){ return inboundMapper.getInboundOrderItemByClientId(id); }

    @Override
    public int getInventoryByWastesNameAndWareHouse(String wastesName,String wareHouseName){ return inboundMapper.getInventoryByWastesNameAndWareHouse(wastesName,wareHouseName);}

}
