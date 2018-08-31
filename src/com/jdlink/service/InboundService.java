package com.jdlink.service;

import com.jdlink.domain.Inventory.InboundOrder;
import com.jdlink.domain.Inventory.InboundPlanOrder;

import java.util.List;

/**
 * Created by matt on 2018/8/22.
 * DoubleClickTo 666
 */
public interface InboundService {

    /**
     * 列出所有入库计划单
     * @return 入库计划单
     */
    List<InboundPlanOrder> listInboundPlanOrder();

    /**
     * 增加入库计划单
     * @param inboundPlanOrder 入库计划单
     */
    void addInboundPlanOrder(InboundPlanOrder inboundPlanOrder);

    /**
     * 获取入库计划单编号
     * @return 入库计划单编号
     */
    String getInboundPlanOrderId();

    /**
     * 根据年月前缀获取入库计划单数量
     * @param prefix 前缀
     * @return 数量
     */
    int getInboundPlanCountByPrefix(String prefix);

    /**
     * 获取入库单号
     * @return 入库单号
     */
    String getInboundOrderId();

    /**
     * 增加入库单
     * @param inboundOrder 入库单
     */
    void addInboundOrder(InboundOrder inboundOrder);

    /**
     * 是否存在该单号
     * @param inboundOrderId 入库单号
     * @return 存在与否
     */
    boolean existInboundOrderId(String inboundOrderId);

    /**
     * 计算入库单数量
     * @return 入库单数量
     */
    int countInboundOrder();
}
