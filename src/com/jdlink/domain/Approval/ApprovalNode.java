package com.jdlink.domain.Approval;

import java.util.Date;

/**
 * 审批节点
 */
public class ApprovalNode {
    /**
     * 主键ID
     */
    private String id;
    /**
     * 审批流程ID，外键
     */
    private Integer approvalProcessId;
    /**
     * 角色ID
     */
    private Integer roleId;
    /**
     * 审批流父节点ID
     */
    private String approvalPId;
    /**
     * 审批时间
     */
    private Date approvalDate;
    /**
     * 审批状态（0驳回，1通过，2审批中，3待审批，4，未提交，5已提交  6重新提交,7重新审批）
     */
    private Integer approvalState;
    /**
     * 审批意见
     */
    private String approvalAdvice;
    /**
     *  用户姓名
     */
    private String userName;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setApprovalPId(String approvalPId) {
        this.approvalPId = approvalPId;
    }

    public Integer getApprovalProcessId() {
        return approvalProcessId;
    }

    public void setApprovalProcessId(Integer approvalProcessId) {
        this.approvalProcessId = approvalProcessId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getApprovalPId() {
        return approvalPId;
    }

    public Date getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(Date approvalDate) {
        this.approvalDate = approvalDate;
    }

    public Integer getApprovalState() {
        return approvalState;
    }

    public void setApprovalState(Integer approvalState) {
        this.approvalState = approvalState;
    }

    public String getApprovalAdvice() {
        return approvalAdvice;
    }

    public void setApprovalAdvice(String approvalAdvice) {
        this.approvalAdvice = approvalAdvice;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "ApprovalNode{" +
                "id=" + id +
                ", approvalProcessId=" + approvalProcessId +
                ", roleId=" + roleId +
                ", approvalPId=" + approvalPId +
                ", approvalDate=" + approvalDate +
                ", approvalState=" + approvalState +
                ", approvalAdvice='" + approvalAdvice + '\'' +
                '}';
    }
}
