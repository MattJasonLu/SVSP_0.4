package com.jdlink.service.impl;

import com.jdlink.domain.Inventory.InboundOrder;
import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Inventory.InboundPlanOrder;
import com.jdlink.domain.Page;
import com.jdlink.mapper.InboundMapper;
import com.jdlink.service.InboundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.Calendar;
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
    public List<InboundPlanOrder> listInboundPlanOrder() {
        return inboundMapper.listInboundPlanOrder();
    }

    @Override
    public void addInboundPlanOrder(InboundPlanOrder inboundPlanOrder) {
        inboundMapper.addInboundPlanOrder(inboundPlanOrder);
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
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(2);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(2);
        // 获取最新编号
        String month = nf.format(calendar.get(Calendar.MONTH) + 1);
        String prefix = year + month;
        // 获取数量
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
        return "HWPL" + year + month + countStr;
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
        } while (existInboundOrderId(id));
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
    public void setInboundOrderStateInvalid(String inboundOrderId) {
        inboundMapper.setInboundOrderStateInvalid(inboundOrderId);
    }

    @Override
    public InboundOrder getInboundOrderById(String inboundOrderId) {
        return inboundMapper.getInboundOrderById(inboundOrderId);
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

}
