package com.jdlink.domain.Inventory;

import com.jdlink.domain.Client;
import com.jdlink.domain.Produce.ProcessWay;
import com.jdlink.domain.Wastes;

/**
 * Created by matt on 2018/8/20.
 * DoubleClickTo 666
 */
public class InboundOrderItem {
    /**
     * 入库单明细编号
     */
    private String inboundOrderItemId;
    /**
     * 入库单号
     */
    private String inboundOrderId;
    /**
     * 产废单位
     */
    private Client produceCompany;
    /**
     * 危废(危废名称、危废代码、危废类别、危废数量、单价、总价)
     */
    private Wastes wastes;
    /**
     * 处理方式
     */
    private ProcessWay processWay;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 库区
     */
    private String warehouseArea;
    /**
     * 记录状态
     */
    private RecordState recordState;
}
