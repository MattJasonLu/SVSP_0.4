package com.jdlink.domain.Inventory;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Salesman;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/8/20.
 * DoubleClickTo 666
 * 出库单对象
 */
public class InboundOrder {

    /**
     * 转移联单号
     */
    private String transferDraftId;
    /**
     * 入库单号
     */
    private String inboundOrderId;
    /**
     * 入库日期
     */
    private Date inboundDate;
    /**
     * 仓库
     */
    private WareHouse wareHouse;
    /**
     * 业务员
     */
    private Salesman salesman;
    /**
     * 入库类别
     */
    private BoundType boundType;
    /**
     * 计划数量
     */
    private float planCount;
    /**
     * 危废数量
     */
    private float actualCount;
    /**
     * 保管员编号
     */
    private String keeperId;
    /**
     * 主管编号
     */
    private String directorId;
    /**
     * 审批人编号
     */
    private String approverId;
    /**
     * 审批状态
     */
    private CheckState checkState;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 创建人编号
     */
    private String creatorId;
    /**
     * 创建日期
     */
    private Date createDate;
    /**
     * 创建部门编号
     */
    private String departmentId;
    /**
     * 创建公司编号
     */
    private String companyId;
    /**
     * 修改人
     */
    private String modifierId;
    /**
     * 修改时间
     */
    private Date modifyDate;
    /**
     * 记录状态
     */
    private RecordState recordState;
    /**
     * 入库单明细列表
     */
    private List<InboundOrderItem> inboundOrderItemList = new ArrayList<>();

    public String getTransferDraftId() {
        return transferDraftId;
    }

    public void setTransferDraftId(String transferDraftId) {
        this.transferDraftId = transferDraftId;
    }

    public String getInboundOrderId() {
        return inboundOrderId;
    }

    public void setInboundOrderId(String inboundOrderId) {
        this.inboundOrderId = inboundOrderId;
    }

    public Date getInboundDate() {
        return inboundDate;
    }

    public void setInboundDate(Date inboundDate) {
        this.inboundDate = inboundDate;
    }

    public BoundType getBoundType() {
        return boundType;
    }

    public void setBoundType(BoundType boundType) {
        this.boundType = boundType;
    }

    public WareHouse getWareHouse() {
        return wareHouse;
    }

    public void setWareHouse(WareHouse wareHouse) {
        this.wareHouse = wareHouse;
    }

    public Salesman getSalesman() {
        return salesman;
    }

    public void setSalesman(Salesman salesman) {
        this.salesman = salesman;
    }

    public float getPlanCount() {
        return planCount;
    }

    public void setPlanCount(float planCount) {
        this.planCount = planCount;
    }

    public float getActualCount() {
        return actualCount;
    }

    public void setActualCount(float actualCount) {
        this.actualCount = actualCount;
    }

    public String getKeeperId() {
        return keeperId;
    }

    public void setKeeperId(String keeperId) {
        this.keeperId = keeperId;
    }

    public String getDirectorId() {
        return directorId;
    }

    public void setDirectorId(String directorId) {
        this.directorId = directorId;
    }

    public String getApproverId() {
        return approverId;
    }

    public void setApproverId(String approverId) {
        this.approverId = approverId;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
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

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public RecordState getRecordState() {
        return recordState;
    }

    public void setRecordState(RecordState recordState) {
        this.recordState = recordState;
    }

    public List<InboundOrderItem> getInboundOrderItemList() {
        return inboundOrderItemList;
    }

    public void setInboundOrderItemList(List<InboundOrderItem> inboundOrderItemList) {
        this.inboundOrderItemList = inboundOrderItemList;
    }

    @Override
    public String toString() {
        return "InboundOrder{" +
                "transferDraftId='" + transferDraftId + '\'' +
                ", inboundOrderId='" + inboundOrderId + '\'' +
                ", inboundDate=" + inboundDate +
                ", wareHouse=" + wareHouse +
                ", salesman=" + salesman +
                ", boundType=" + boundType +
                ", planCount=" + planCount +
                ", actualCount=" + actualCount +
                ", keeperId='" + keeperId + '\'' +
                ", directorId='" + directorId + '\'' +
                ", approverId='" + approverId + '\'' +
                ", checkState=" + checkState +
                ", remarks='" + remarks + '\'' +
                ", creatorId='" + creatorId + '\'' +
                ", createDate=" + createDate +
                ", departmentId='" + departmentId + '\'' +
                ", companyId='" + companyId + '\'' +
                ", modifierId='" + modifierId + '\'' +
                ", modifyDate=" + modifyDate +
                ", recordState=" + recordState +
                ", inboundOrderItemList=" + inboundOrderItemList +
                '}';
    }
}
