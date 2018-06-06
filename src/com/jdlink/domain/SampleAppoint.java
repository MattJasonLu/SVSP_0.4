package com.jdlink.domain;

import java.util.Date;

/**
 * Created by matt on 2018/5/14.
 */
public class SampleAppoint {
    /**
     * 预约单编号
     */
    private String appointId;
    /**
     * 客户编号
     */
    private String clientId;
    /**
     * 公司名称
     */
    private String companyName;
    /**
     * 样品名称
     */
    private String productName;
    /**
     * 代码
     */
    private String code;
    /**
     * 联系人
     */
    private String contactName;
    /**
     * 联系方式
     */
    private String telephone;
    /**
     * 预约状态
     */
    private ApplyState state;
    /**
     * 预约取样时间
     */
    private Date appointTime;
    /**
     * 备注
     */
    private String comment;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getAppointId() {
        return appointId;
    }

    public void setAppointId(String appointId) {
        this.appointId = appointId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public ApplyState getState() {
        return state;
    }

    public void setState(ApplyState state) {
        this.state = state;
    }

    public Date getAppointTime() {
        return appointTime;
    }

    public void setAppointTime(Date appointTime) {
        this.appointTime = appointTime;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "SampleAppoint{" +
                "appointId='" + appointId + '\'' +
                ", companyName='" + companyName + '\'' +
                ", productName='" + productName + '\'' +
                ", code='" + code + '\'' +
                ", contactName='" + contactName + '\'' +
                ", telephone='" + telephone + '\'' +
                ", state=" + state +
                ", appointTime=" + appointTime +
                ", comment='" + comment + '\'' +
                '}';
    }
}
