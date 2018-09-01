package com.jdlink.mapper;

import com.jdlink.domain.Inventory.InboundOrder;
import com.jdlink.domain.Inventory.InboundPlanOrder;
import com.jdlink.domain.Page;

import java.util.List;

/**
 * Created by matt on 2018/8/2.
 * 入库映射
 */
public interface InboundMapper {

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
     * 根据年月前缀获取入库计划单数量
     * @param prefix 前缀
     * @return 数量
     */
    int getInboundPlanCountByPrefix(String prefix);

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
