package com.jdlink.domain.Inventory;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Salesman;
import com.jdlink.domain.Wastes;

import java.util.Date;
import java.util.List;

/*配料单*/
   public class BatchingOrder {
    /*配料单号*/
    private String batchingOrderId;
    /*配料日期*/
    private Date  batchingDate;
    /*创建人*/
    private String creator;
    /*创建日期*/
   private Date createDate;
    /*备注*/
    private String remarks;
    /*仓库*/
    private WareHouse wareHouse;
    /*产废单位*/
    private Client produceCompany;
    /*接收单位*/
    private Client acceptCompany;
    /*联单号*/
    private  String transferDraftId;
    /*创建部门*/
    private String departmentId;
    /*创建公司*/
    private String companyId;
    /*修改人*/
    private String modifierId;
    /*业务员 来自产废单位的业务员*/
    private Salesman salesman;
    private Wastes wastes;

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
    }

    public Salesman getSalesman() {
        return salesman;
    }

    public void setSalesman(Salesman salesman) {
        this.salesman = salesman;
    }

    /*领料状态*/
    private CheckState checkState;
    /*记录状态*/
    private  RecordState recordState;
    /*危废库存*/
    private WasteInventory wasteInventory;
    /*入库单对象*/
    private InboundOrder inboundOrder;
    /*配料数量*/
    private float batchingNumber;
    public InboundOrder getInboundOrder() {
        return inboundOrder;
    }

    public void setInboundOrder(InboundOrder inboundOrder) {
        this.inboundOrder = inboundOrder;
    }

    public float getBatchingNumber() {
        return batchingNumber;
    }

    public void setBatchingNumber(float batchingNumber) {
        this.batchingNumber = batchingNumber;
    }

    public WasteInventory getWasteInventory() {
        return wasteInventory;
    }

    public void setWasteInventory(WasteInventory wasteInventory) {
        this.wasteInventory = wasteInventory;
    }

    /*领料单对象
    * 1:N
    * */
    private List<MaterialRequisitionOrder> materialRequisitionOrderList;
    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
    }

    public Client getAcceptCompany() {
        return acceptCompany;
    }

    public void setAcceptCompany(Client acceptCompany) {
        this.acceptCompany = acceptCompany;
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

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getModifierId() {
        return modifierId;
    }

    public void setModifierId(String modifierId) {
        this.modifierId = modifierId;
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

    public WareHouse getWareHouse() {
        return wareHouse;
    }

    public void setWareHouse(WareHouse wareHouse) {
        this.wareHouse = wareHouse;
    }


    public String getBatchingOrderId() {
        return batchingOrderId;
    }

    public void setBatchingOrderId(String batchingOrderId) {
        this.batchingOrderId = batchingOrderId;
    }

    public Date getBatchingDate() {
        return batchingDate;
    }

    public void setBatchingDate(Date batchingDate) {
        this.batchingDate = batchingDate;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }




    public List<MaterialRequisitionOrder> getMaterialRequisitionOrderList() {
        return materialRequisitionOrderList;
    }

    public void setMaterialRequisitionOrderList(List<MaterialRequisitionOrder> materialRequisitionOrderList) {
        this.materialRequisitionOrderList = materialRequisitionOrderList;
    }

    @Override
    public String toString() {
        return "BatchingOrder{" +
                "batchingOrderId='" + batchingOrderId + '\'' +
                ", batchingDate=" + batchingDate +
                ", creator='" + creator + '\'' +
                ", createDate=" + createDate +
                ", remarks='" + remarks + '\'' +
                ", wareHouse=" + wareHouse +
                ", produceCompany=" + produceCompany +
                ", acceptCompany=" + acceptCompany +
                ", transferDraftId='" + transferDraftId + '\'' +
                ", departmentId='" + departmentId + '\'' +
                ", companyId='" + companyId + '\'' +
                ", modifierId='" + modifierId + '\'' +
                ", checkState=" + checkState +
                ", recordState=" + recordState +
                ", wasteInventory=" + wasteInventory +
                ", inboundOrder=" + inboundOrder +
                ", batchingNumber=" + batchingNumber +
                ", materialRequisitionOrderList=" + materialRequisitionOrderList +
                '}';
    }
}
