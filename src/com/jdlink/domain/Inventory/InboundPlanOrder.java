package com.jdlink.domain.Inventory;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.ProcessWay;

import java.util.Date;

/**
 * Created by matt on 2018/8/20.
 * DoubleClickTo 666
 */
public class InboundPlanOrder {
    /**
     * 计划单号
     */
    private String inboundPlanOrderId;
    /**
     * 计划日期
     */
    private Date planDate;
    /**
     * 产废单位
     */
    private Client produceCompany;
    /**
     * 接收单位
     */
    private Client acceptCompany;
    /**
     * 转移时间
     */
    private Date transferDate;
    /**
     * 联单号
     */
    private String transferDraftId;
    /**
     * 拟转移量
     */
    private float prepareTransferCount;
    /**
     * 转移量
     */
    private float transferCount;
    /**
     * 已入库数量
     */
    private float storageCount;
    /**
     * 剩余数量
     */
    private float leftCount;
    /**
     * 磅单数量
     */
    private float poundsCount;
    /**
     * 危废(危废名称、危废代码、危废类别)
     */
    private Wastes wastes;
    /**
     * 创建人编号
     */
    private String creatorId;
    /**
     * 创建日期
     */
    private Date createDate;
    /**
     * 创建部门
     */
    private String departmentId;
    /**
     * 创建公司
     */
    private String companyId;
    /**
     * 修改人
     */
    private String modifierId;
    /**
     * 业务员
     */
    private Salesman salesman;
    /**
     * 单据状态
     */
    private CheckState checkState;
    /**
     * 记录状态
     */
    private RecordState recordState;
    /**
     * 处理方式
     */
    private ProcessWay processWay;
    /**
     * 进料方式
     */
    private HandleCategory handleCategory;
    /**
     * 化验结果是否合格
     */
    private boolean isQualified;
    /**
     * 关键字
     */
    private String keyword;
    /**
     * 页码
     */
    private Page page;

    public String getInboundPlanOrderId() {
        return inboundPlanOrderId;
    }

    public void setInboundPlanOrderId(String inboundPlanOrderId) {
        this.inboundPlanOrderId = inboundPlanOrderId;
    }

    public Date getPlanDate() {
        return planDate;
    }

    public void setPlanDate(Date planDate) {
        this.planDate = planDate;
    }

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

    public Date getTransferDate() {
        return transferDate;
    }

    public void setTransferDate(Date transferDate) {
        this.transferDate = transferDate;
    }

    public String getTransferDraftId() {
        return transferDraftId;
    }

    public void setTransferDraftId(String transferDraftId) {
        this.transferDraftId = transferDraftId;
    }

    public float getPrepareTransferCount() {
        return prepareTransferCount;
    }

    public void setPrepareTransferCount(float prepareTransferCount) {
        this.prepareTransferCount = prepareTransferCount;
    }

    public float getTransferCount() {
        return transferCount;
    }

    public void setTransferCount(float transferCount) {
        this.transferCount = transferCount;
    }

    public float getStorageCount() {
        return storageCount;
    }

    public void setStorageCount(float storageCount) {
        this.storageCount = storageCount;
    }

    public float getLeftCount() {
        return leftCount;
    }

    public void setLeftCount(float leftCount) {
        this.leftCount = leftCount;
    }

    public float getPoundsCount() {
        return poundsCount;
    }

    public void setPoundsCount(float poundsCount) {
        this.poundsCount = poundsCount;
    }

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
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

    public Salesman getSalesman() {
        return salesman;
    }

    public void setSalesman(Salesman salesman) {
        this.salesman = salesman;
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

    public boolean getIsQualified() {
        return isQualified;
    }

    public void setIsQualified(boolean qualified) {
        isQualified = qualified;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    @Override
    public String toString() {
        return "InboundPlanOrder{" +
                "inboundPlanOrderId='" + inboundPlanOrderId + '\'' +
                ", planDate=" + planDate +
                ", produceCompany=" + produceCompany +
                ", acceptCompany=" + acceptCompany +
                ", transferDate=" + transferDate +
                ", transferDraftId='" + transferDraftId + '\'' +
                ", prepareTransferCount=" + prepareTransferCount +
                ", transferCount=" + transferCount +
                ", storageCount=" + storageCount +
                ", leftCount=" + leftCount +
                ", poundsCount=" + poundsCount +
                ", wastes=" + wastes +
                ", creatorId='" + creatorId + '\'' +
                ", createDate=" + createDate +
                ", departmentId='" + departmentId + '\'' +
                ", companyId='" + companyId + '\'' +
                ", modifierId='" + modifierId + '\'' +
                ", salesman=" + salesman +
                ", checkState=" + checkState +
                ", recordState=" + recordState +
                ", processWay=" + processWay +
                ", handleCategory=" + handleCategory +
                ", isQualified=" + isQualified +
                '}';
    }
}
