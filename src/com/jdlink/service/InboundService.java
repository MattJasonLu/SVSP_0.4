package com.jdlink.service;

import com.jdlink.domain.Inventory.InboundOrder;
import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Inventory.InboundPlanOrder;
import com.jdlink.domain.Page;

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
     * 查找入库计划单
     * @param inboundPlanOrder 入库计划单数据
     * @return 符合条件的入库计划单列表
     */
    List<InboundPlanOrder> searchInboundPlanOrder(InboundPlanOrder inboundPlanOrder);

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
     * 列出入库单
     * @return 入库单列表
     */
    List<InboundOrder> listInboundOrder(Page page);

    /**
     * 作废入库单
     * @param inboundOrderId 入库单编号
     */
    void setInboundOrderStateInvalid(String inboundOrderId);

    /**
     * 根据编号获取入库单
     * @param inboundOrderId 入库单号
     * @return 入库单
     */
    InboundOrder getInboundOrderById(String inboundOrderId);

    /**
     * 更新入库单明细中的进料方式
     * @param inboundOrderItem 入库单明细
     */
    void updateItemHandleCategory(InboundOrderItem inboundOrderItem);

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

    /**
     * 计算次生入库单数量
     * @return 入库单数量
     */
    int countSecondInboundOrder();

    /**
     * 列出次生入库单
     * @return 次生入库单列表
     */
    List<InboundOrder> listSecondInboundOrder(Page page);

    /**
     * 增加次生危废入库单
     * @param inboundOrder 入库单
     */
    void addSecondInboundOrder(InboundOrder inboundOrder);
}
