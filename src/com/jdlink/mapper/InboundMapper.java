package com.jdlink.mapper;

import com.jdlink.domain.Inventory.InboundPlanOrder;

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

}
