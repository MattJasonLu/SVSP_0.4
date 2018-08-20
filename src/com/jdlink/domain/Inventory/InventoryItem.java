package com.jdlink.domain.Inventory;

import com.jdlink.domain.Client;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.ProcessWay;
import com.jdlink.domain.Wastes;

/*库存明细*/
public class InventoryItem {
    /**
     * 库存编号
     */
    private String stockId;
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
    /**
     * 进料方式
     */
    private HandleCategory handleCategory;

    @Override
    public String toString() {
        return "InventoryItem{" +
                "stockId='" + stockId + '\'' +
                ", inboundOrderId='" + inboundOrderId + '\'' +
                ", produceCompany=" + produceCompany +
                ", wastes=" + wastes +
                ", processWay=" + processWay +
                ", remarks='" + remarks + '\'' +
                ", warehouseArea='" + warehouseArea + '\'' +
                ", recordState=" + recordState +
                ", handleCategory=" + handleCategory +
                '}';
    }

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
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

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }
}
