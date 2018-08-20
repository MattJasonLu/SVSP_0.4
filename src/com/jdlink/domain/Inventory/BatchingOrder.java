package com.jdlink.domain.Inventory;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Salesman;

import java.util.Date;

/*配料单*/
public class BatchingOrder {
    /*配料单号*/
    private String batchingOrderId;
    /*配料日期*/
    private Date  batchigDate;
    /*创建人*/
    private String founder;
    /*创建日期*/
    Date founderDate;
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
    private Salesman salmsman;
    /*单据状态*/
    private CheckState checkState;
    /*记录状态*/
    private  RecordState recordState;
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

    public Salesman getSalmsman() {
        return salmsman;
    }

    public void setSalmsman(Salesman salmsman) {
        this.salmsman = salmsman;
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

    public Date getBatchigDate() {
        return batchigDate;
    }

    public void setBatchigDate(Date batchigDate) {
        this.batchigDate = batchigDate;
    }

    public String getFounder() {
        return founder;
    }

    public void setFounder(String founder) {
        this.founder = founder;
    }

    public Date getFounderDate() {
        return founderDate;
    }

    public void setFounderDate(Date founderDate) {
        this.founderDate = founderDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    @Override
    public String toString() {
        return "BatchingOrder{" +
                "batchingOrderId='" + batchingOrderId + '\'' +
                ", batchigDate=" + batchigDate +
                ", founder='" + founder + '\'' +
                ", founderDate=" + founderDate +
                ", remarks='" + remarks + '\'' +
                ", wareHouse=" + wareHouse +
                ", produceCompany=" + produceCompany +
                ", acceptCompany=" + acceptCompany +
                ", transferDraftId='" + transferDraftId + '\'' +
                ", departmentId='" + departmentId + '\'' +
                ", companyId='" + companyId + '\'' +
                ", modifierId='" + modifierId + '\'' +
                ", salmsman=" + salmsman +
                ", checkState=" + checkState +
                ", recordState=" + recordState +
                '}';
    }
}
