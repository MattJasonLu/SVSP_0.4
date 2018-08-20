package com.jdlink.mapper;

import com.jdlink.domain.Inventory.InboundPlanOrder;

/**
 * Created by matt on 2018/8/2.
 * 入库映射
 */
public interface InboundMapper {

    /**
     * 增加入库计划单
     * @param inboundPlanOrder 入库计划单
     */
    void addInboundPlanOrder(InboundPlanOrder inboundPlanOrder);

}
