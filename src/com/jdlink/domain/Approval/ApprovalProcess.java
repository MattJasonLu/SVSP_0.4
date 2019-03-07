package com.jdlink.domain.Approval;

import java.util.Date;
import java.util.List;

/**
 * 审批流
 */
public class ApprovalProcess {
    /**
     * 主键
     */
    private Integer id;
    /**
     * 单据号
     */
    private String orderId;
    /**
     * 审批流类型
     */
    private String type;
    /**
     * 审批节点
     */
    private List<ApprovalNode> approvalNodeList;
    /**
     * 创建日期
     */
    private Date creationDate;
    /**
     * 修改日期
     */
    private Date modifyDate;
    /**
     * 创建人
     */
    private String creator;
    /**
     * 修改人
     */
    private String modifier;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<ApprovalNode> getApprovalNodeList() {
        return approvalNodeList;
    }

    public void setApprovalNodeList(List<ApprovalNode> approvalNodeList) {
        this.approvalNodeList = approvalNodeList;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getModifier() {
        return modifier;
    }

    public void setModifier(String modifier) {
        this.modifier = modifier;
    }

    @Override
    public String toString() {
        return "ApprovalProcess{" +
                "id=" + id +
                ", orderId='" + orderId + '\'' +
                ", type='" + type + '\'' +
                ", approvalNodeList=" + approvalNodeList +
                ", creationDate=" + creationDate +
                ", modifyDate=" + modifyDate +
                '}';
    }
}
