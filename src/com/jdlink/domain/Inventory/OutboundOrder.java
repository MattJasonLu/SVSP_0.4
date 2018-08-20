package com.jdlink.domain.Inventory;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Salesman;

import java.util.Date;
import java.util.List;

/*出库单*/
public class OutboundOrder {
    /*领料单对列表*/
    private List<MaterialRequisitionOrder> materialRequisitionOrder;
    /*仓库*/
    private WareHouse wareHouse;
    /*出库单编号*/
   private String outboundOrderId;
    /*出库日期*/
    private Date outboundDate;
    /*制单人*/
    private String founder;
    /*审核人*/
    private String auditor;
    /*出库类型*/
    private OutboundOrder outboundOrder;
    /*转移联单号*/
    private String transferDraftId;
    /*部门*/
    private String departmentId;
    /*业务员 来自产废单位的业务员*/
    private Salesman salmsman;
    /*保管员*/
    private String  guardian;
    /*仓库部门主管*/
    private String warehouseManager;
    /*领料部门主管*/
    private String materialManager;
    /*领料人*/
    private String picker;
    /*单据状态*/
    private CheckState checkState;
    /*记录状态*/
    private  RecordState recordState;

    public List<MaterialRequisitionOrder> getMaterialRequisitionOrder() {
        return materialRequisitionOrder;
    }

    public void setMaterialRequisitionOrder(List<MaterialRequisitionOrder> materialRequisitionOrder) {
        this.materialRequisitionOrder = materialRequisitionOrder;
    }

    public WareHouse getWareHouse() {
        return wareHouse;
    }

    public void setWareHouse(WareHouse wareHouse) {
        this.wareHouse = wareHouse;
    }

    public String getOutboundOrderId() {
        return outboundOrderId;
    }

    public void setOutboundOrderId(String outboundOrderId) {
        this.outboundOrderId = outboundOrderId;
    }

    public Date getOutboundDate() {
        return outboundDate;
    }

    public void setOutboundDate(Date outboundDate) {
        this.outboundDate = outboundDate;
    }

    public String getFounder() {
        return founder;
    }

    public void setFounder(String founder) {
        this.founder = founder;
    }

    public String getAuditor() {
        return auditor;
    }

    public void setAuditor(String auditor) {
        this.auditor = auditor;
    }

    public OutboundOrder getOutboundOrder() {
        return outboundOrder;
    }

    public void setOutboundOrder(OutboundOrder outboundOrder) {
        this.outboundOrder = outboundOrder;
    }

    public String getTransferDraftId() {
        return transferDraftId;
    }

    public void setTransferDraftId(String transferDraftId) {
        this.transferDraftId = transferDraftId;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public Salesman getSalmsman() {
        return salmsman;
    }

    public void setSalmsman(Salesman salmsman) {
        this.salmsman = salmsman;
    }

    public String getGuardian() {
        return guardian;
    }

    public void setGuardian(String guardian) {
        this.guardian = guardian;
    }

    public String getWarehouseManager() {
        return warehouseManager;
    }

    public void setWarehouseManager(String warehouseManager) {
        this.warehouseManager = warehouseManager;
    }

    public String getMaterialManager() {
        return materialManager;
    }

    public void setMaterialManager(String materialManager) {
        this.materialManager = materialManager;
    }

    public String getPicker() {
        return picker;
    }

    public void setPicker(String picker) {
        this.picker = picker;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public RecordState getRecordState() {
        return recordState;
    }

    public void setRecordState(RecordState recordState) {
        this.recordState = recordState;
    }

    @Override
    public String toString() {
        return "OutboundOrder{" +
                "materialRequisitionOrder=" + materialRequisitionOrder +
                ", wareHouse=" + wareHouse +
                ", outboundOrderId='" + outboundOrderId + '\'' +
                ", outboundDate=" + outboundDate +
                ", founder='" + founder + '\'' +
                ", auditor='" + auditor + '\'' +
                ", outboundOrder=" + outboundOrder +
                ", transferDraftId='" + transferDraftId + '\'' +
                ", departmentId='" + departmentId + '\'' +
                ", salmsman=" + salmsman +
                ", guardian='" + guardian + '\'' +
                ", warehouseManager='" + warehouseManager + '\'' +
                ", materialManager='" + materialManager + '\'' +
                ", picker='" + picker + '\'' +
                ", checkState=" + checkState +
                ", recordState=" + recordState +
                '}';
    }
}
