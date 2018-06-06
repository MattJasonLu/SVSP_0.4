package com.jdlink.domain;

import org.springframework.web.multipart.MultipartFile;

/**
 * Created by matt on 2018/4/23.
 * 供应商类
 */
public class Supplier {
    /**
     * 集团编号
     */
    private String groupId;
    // 基本信息
    /**
     * 企业名称
     */
    private String companyName;
    /**
     * 供应商编码
     */
    private String supplierId;
    /**
     * 组织机构代码
     */
    private String organizationCode;
    /**
     * 营业执照注册号
     */
    private String licenseCode;
    /**
     * 法人代表
     */
    private String representative;
    /**
     * 工商注册地邮编
     */
    private String postCode;
    /**
     * 所属行业
     */
    private String industry;
    /**
     * 主要产品
     */
    private String product;

    /**
     * 企业类型
     */
    private EnterpriseType enterpriseType;
    /**
     * 经营方式
     */
    private OperationMode operationMode;
    /**
     * 经营单位类别
     */
    private OperationType operationType;
    /**
     * 事故防范和应急预案
     */
    private ContingencyPlan contingencyPlan;
    /**
     * 建立危废经营记录情况
     */
    private OperationRecord operationRecord;
    /**
     * 供应商类型
     */
    private SupplierType supplierType;
    /**
     * 工商注册地址
     */
    private String location;
    /**
     * 所属街道
     */
    private String street;
    /**
     * 申报状态
     */
    private ApplicationStatus applicationStatus;

    // 环评信息
    /**
     * 原辅材料附件地址
     */
    private String materialAttachmentUrl;
    /**
     * 原辅材料附件
     */
    private MultipartFile materialAttachment;

    /**
     * 工艺流程图附件地址
     */
    private String processAttachmentUrl;
    /**
     * 工艺流程图附件
     */
    private MultipartFile processAttachment;
    /**
     * 工艺描述
     */
    private String processDesp;

    // 联系信息
    /**
     * 联系人
     */
    private String contactName;
    /**
     * 联系电话
     */
    private String phone;
    /**
     * 手机号
     */
    private String mobile;
    /**
     * 邮箱
     */
    private String email;
    /**
     * 审核状态
     */
    private CheckState checkState;

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }

    public String getOrganizationCode() {
        return organizationCode;
    }

    public void setOrganizationCode(String organizationCode) {
        this.organizationCode = organizationCode;
    }

    public String getLicenseCode() {
        return licenseCode;
    }

    public void setLicenseCode(String licenseCode) {
        this.licenseCode = licenseCode;
    }

    public String getRepresentative() {
        return representative;
    }

    public void setRepresentative(String representative) {
        this.representative = representative;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public EnterpriseType getEnterpriseType() {
        return enterpriseType;
    }

    public void setEnterpriseType(EnterpriseType enterpriseType) {
        this.enterpriseType = enterpriseType;
    }

    public OperationMode getOperationMode() {
        return operationMode;
    }

    public void setOperationMode(OperationMode operationMode) {
        this.operationMode = operationMode;
    }

    public OperationType getOperationType() {
        return operationType;
    }

    public void setOperationType(OperationType operationType) {
        this.operationType = operationType;
    }

    public ContingencyPlan getContingencyPlan() {
        return contingencyPlan;
    }

    public void setContingencyPlan(ContingencyPlan contingencyPlan) {
        this.contingencyPlan = contingencyPlan;
    }

    public OperationRecord getOperationRecord() {
        return operationRecord;
    }

    public void setOperationRecord(OperationRecord operationRecord) {
        this.operationRecord = operationRecord;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public ApplicationStatus getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(ApplicationStatus applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

    public String getMaterialAttachmentUrl() {
        return materialAttachmentUrl;
    }

    public void setMaterialAttachmentUrl(String materialAttachmentUrl) {
        this.materialAttachmentUrl = materialAttachmentUrl;
    }

    public MultipartFile getMaterialAttachment() {
        return materialAttachment;
    }

    public void setMaterialAttachment(MultipartFile materialAttachment) {
        this.materialAttachment = materialAttachment;
    }

    public String getProcessAttachmentUrl() {
        return processAttachmentUrl;
    }

    public void setProcessAttachmentUrl(String processAttachmentUrl) {
        this.processAttachmentUrl = processAttachmentUrl;
    }

    public MultipartFile getProcessAttachment() {
        return processAttachment;
    }

    public void setProcessAttachment(MultipartFile processAttachment) {
        this.processAttachment = processAttachment;
    }

    public String getProcessDesp() {
        return processDesp;
    }

    public void setProcessDesp(String processDesp) {
        this.processDesp = processDesp;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public SupplierType getSupplierType() {
        return supplierType;
    }

    public void setSupplierType(SupplierType supplierType) {
        this.supplierType = supplierType;
    }

    @Override
    public String toString() {
        return "Supplier{" +
                "groupId='" + groupId + '\'' +
                ", companyName='" + companyName + '\'' +
                ", supplierId='" + supplierId + '\'' +
                ", organizationCode='" + organizationCode + '\'' +
                ", licenseCode='" + licenseCode + '\'' +
                ", representative='" + representative + '\'' +
                ", postCode='" + postCode + '\'' +
                ", industry='" + industry + '\'' +
                ", product='" + product + '\'' +
                ", enterpriseType=" + enterpriseType +
                ", operationMode=" + operationMode +
                ", operationType=" + operationType +
                ", contingencyPlan=" + contingencyPlan +
                ", operationRecord=" + operationRecord +
                ", supplierType=" + supplierType +
                ", location='" + location + '\'' +
                ", street='" + street + '\'' +
                ", applicationStatus=" + applicationStatus +
                ", materialAttachmentUrl='" + materialAttachmentUrl + '\'' +
                ", materialAttachment=" + materialAttachment +
                ", processAttachmentUrl='" + processAttachmentUrl + '\'' +
                ", processAttachment=" + processAttachment +
                ", processDesp='" + processDesp + '\'' +
                ", contactName='" + contactName + '\'' +
                ", phone='" + phone + '\'' +
                ", mobile='" + mobile + '\'' +
                ", email='" + email + '\'' +
                ", checkState=" + checkState +
                '}';
    }
}
