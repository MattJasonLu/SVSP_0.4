package com.jdlink.domain.Inventory;

import com.jdlink.domain.Client;
import com.jdlink.domain.Produce.HandleCategory;
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
     * 进料方式
     */
    private HandleCategory handleCategory;
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
    /**
     * 化验结果是否合格
     */
    private boolean isQualified;

    public String getInboundOrderItemId() {
        return inboundOrderItemId;
    }

    public void setInboundOrderItemId(String inboundOrderItemId) {
        this.inboundOrderItemId = inboundOrderItemId;
    }

    public String getInboundOrderId() {
        return inboundOrderId;
    }

    public void setInboundOrderId(String inboundOrderId) {
        this.inboundOrderId = inboundOrderId;
    }

    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
    }

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
    }

    public ProcessWay getProcessWay() {
        return processWay;
    }

    public void setProcessWay(ProcessWay processWay) {
        this.processWay = processWay;
    }

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getWarehouseArea() {
        return warehouseArea;
    }

    public void setWarehouseArea(String warehouseArea) {
        this.warehouseArea = warehouseArea;
    }

    public RecordState getRecordState() {
        return recordState;
    }

    public void setRecordState(RecordState recordState) {
        this.recordState = recordState;
    }

    public boolean getIsQualified() {
        return isQualified;
    }

    public void setIsQualified(boolean qualified) {
        isQualified = qualified;
    }
}
