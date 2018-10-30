package com.jdlink.domain.Inventory;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;

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
//    /**
//     * 业务员
//     */
//    private Salesman salesman;
    /**
     * 入库类别
     */
    private BoundType boundType;
//    /**
//     * 计划数量
//     */
//    private float planCount;
//    /**
//     * 危废数量
//     */
//    private float actualCount;
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
    /**
     * 类别（危废、次生）
     */
    private int category;
    /**
     * 页面
     */
    private Page page;
    /**
     * 关键字
     */
    private String keyword;
    /**
     * 检查库存是否存在
     */
    private String aid;

    public String getAid() {
        return aid;
    }

    public void setAid(String aid) {
        this.aid = aid;
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

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    @Override
    public String toString() {
        return "InboundOrder{" +
                "inboundOrderId='" + inboundOrderId + '\'' +
                ", inboundDate=" + inboundDate +
                ", wareHouse=" + wareHouse +
                ", boundType=" + boundType +
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
