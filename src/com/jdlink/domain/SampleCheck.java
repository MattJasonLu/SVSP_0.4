package com.jdlink.domain;

import java.util.Date;

/**
 * Created by matt on 2018/5/14.
 */
public class SampleCheck {
    /**
     * 签收单编号
     * 例：2018052001R
     */
    private String checkId;
    /**
     * 预约单编号
     * 例：2018052001
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
     * 制单日期，登记单创建日期，不可修改
     */
    private Date createTime;
    /**
     * 接收人
     */
    private String recipient;
    /**
     * 样品状态
     */
    private FormType formType;
    /**
     * 颜色
     */
    private String color;
    /**
     * 处置量
     */
    private float quantity;
    /**
     * 拟用包装
     */
    private PackageType packageType;
    /**
     * 主要成分
     */
    private String mainComponent;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getCheckId() {
        return checkId;
    }

    public void setCheckId(String checkId) {
        this.checkId = checkId;
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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public PackageType getPackageType() {
        return packageType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    public String getMainComponent() {
        return mainComponent;
    }

    public void setMainComponent(String mainComponent) {
        this.mainComponent = mainComponent;
    }

    @Override
    public String toString() {
        return "SampleCheck{" +
                "checkId='" + checkId + '\'' +
                ", appointId='" + appointId + '\'' +
                ", companyName='" + companyName + '\'' +
                ", productName='" + productName + '\'' +
                ", code='" + code + '\'' +
                ", contactName='" + contactName + '\'' +
                ", telephone='" + telephone + '\'' +
                ", createTime=" + createTime +
                ", recipient='" + recipient + '\'' +
                ", formType=" + formType +
                ", color='" + color + '\'' +
                ", quantity=" + quantity +
                ", packageType=" + packageType +
                ", mainComponent='" + mainComponent + '\'' +
                '}';
    }
}
