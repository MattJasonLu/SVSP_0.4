package com.jdlink.domain;

import com.jdlink.domain.Dictionary.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

/**
 * Created by matt on 2018/4/23.
 * 客户类
 */
public class Client {
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
     * 客户编号(编码)
     */
    private String clientId;
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
     * 账号状态
     */
    private ClientState clientState;
    /**
     * 审核状态
     */
    private CheckState checkState;
    /**
     * 业务员
     */
    private Salesman salesman;
    /**
     * 客户类型
     */
    private ClientType clientType;
    /**
     * 开户行名称
     */
    private String bankName;
    /**
     * 开户行账号
     */
    private String bankAccount;
    /**
     * 开票地址
     */
    private String taxAddress;
    /**
     * 开票电话
     */
    private String taxMobile;
    /**
     * 税号
     */
    private String taxNumber;
    /**
     * 税率
     */
    private TicketRate1 ticketType;
    /**
     * 是否为北控处置
     */
    private boolean isDisposal;
    /**
     * 创建人
     */
    private String creator;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 当前时间
     */
    private Date nowTime;

    private String keyword;

    private Page page;
    /**
     * 审批 驳回意见
     */
    private String advice;

    //申报状态数据字典
    private ApplicationStatusItem applicationStatusItem;

    //事故防范和应急预案数据字典
    private ContingencyPlanItem contingencyPlanItem;

    //企业类型数据字典
    private EnterpriseTypeItem enterpriseTypeItem;

    //经营方式数据字典
    private OperationModelItem operationModelItem;

    //危废经营记录情况数据字典
    private OperationRecordItem operationRecordItem;

    //经营单位类别数据字典
    private OperationTypeItem operationTypeItem;

    /**
     * 开票类型
     */
    private TicketRateItem ticketRateItem;
    /**
     * 客户类型
     */
    private ClientTypeItem clientTypeItem;
    /**
     * 审批状态
     */
    private CheckStateItem checkStateItem;
    /**
     * 客户状态
     */
    private ClientStateItem clientStateItem;

    /*库容==>
    *
    * */
    private float capacity;

    /*经纬度*/
    private String latitudeAndLongitude;

    /*当前剩余库存*/
    private float currentInventory;

    /*预警值
    * 上限
    * */
    private Warning warningUpper;


    /*预警值
     * 下限
     * */
    private Warning warningLower;

    public Warning getWarningUpper() {
        return warningUpper;
    }

    public void setWarningUpper(Warning warningUpper) {
        this.warningUpper = warningUpper;
    }

    public Warning getWarningLower() {
        return warningLower;
    }

    public void setWarningLower(Warning warningLower) {
        this.warningLower = warningLower;
    }

    public float getCurrentInventory() {
        return currentInventory;
    }

    public void setCurrentInventory(float currentInventory) {
        this.currentInventory = currentInventory;
    }

    public String getLatitudeAndLongitude() {
        return latitudeAndLongitude;
    }

    public void setLatitudeAndLongitude(String latitudeAndLongitude) {
        this.latitudeAndLongitude = latitudeAndLongitude;
    }

    public float getCapacity() {
        return capacity;
    }

    public void setCapacity(float capacity) {
        this.capacity = capacity;
    }

    public ApplicationStatusItem getApplicationStatusItem() {
        return applicationStatusItem;
    }

    public void setApplicationStatusItem(ApplicationStatusItem applicationStatusItem) {
        this.applicationStatusItem = applicationStatusItem;
    }

    public ContingencyPlanItem getContingencyPlanItem() {
        return contingencyPlanItem;
    }

    public void setContingencyPlanItem(ContingencyPlanItem contingencyPlanItem) {
        this.contingencyPlanItem = contingencyPlanItem;
    }

    public EnterpriseTypeItem getEnterpriseTypeItem() {
        return enterpriseTypeItem;
    }

    public void setEnterpriseTypeItem(EnterpriseTypeItem enterpriseTypeItem) {
        this.enterpriseTypeItem = enterpriseTypeItem;
    }

    public OperationModelItem getOperationModelItem() {
        return operationModelItem;
    }

    public void setOperationModelItem(OperationModelItem operationModelItem) {
        this.operationModelItem = operationModelItem;
    }

    public OperationRecordItem getOperationRecordItem() {
        return operationRecordItem;
    }

    public void setOperationRecordItem(OperationRecordItem operationRecordItem) {
        this.operationRecordItem = operationRecordItem;
    }

    public OperationTypeItem getOperationTypeItem() {
        return operationTypeItem;
    }

    public void setOperationTypeItem(OperationTypeItem operationTypeItem) {
        this.operationTypeItem = operationTypeItem;
    }

    public boolean isDisposal() {
        return isDisposal;
    }

    public void setDisposal(boolean disposal) {
        isDisposal = disposal;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public Date getNowTime() {
        return nowTime;
    }

    public void setNowTime(Date nowTime) {
        this.nowTime = nowTime;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

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

    public void setPostCode(String postCode) {
        this.postCode = postCode;
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

    public ClientState getClientState() {
        return clientState;
    }

    public void setClientState(ClientState clientState) {
        this.clientState = clientState;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public Salesman getSalesman() {
        return salesman;
    }

    public void setSalesman(Salesman salesman) {
        this.salesman = salesman;
    }

    public ClientType getClientType() {
        return clientType;
    }

    public void setClientType(ClientType clientType) {
        this.clientType = clientType;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public String getTaxAddress() {
        return taxAddress;
    }

    public void setTaxAddress(String taxAddress) {
        this.taxAddress = taxAddress;
    }

    public String getTaxMobile() {
        return taxMobile;
    }

    public void setTaxMobile(String taxMobile) {
        this.taxMobile = taxMobile;
    }

    public TicketRate1 getTicketType() {
        return ticketType;
    }

    public void setTicketType(TicketRate1 ticketType) {
        this.ticketType = ticketType;
    }

    public boolean getIsDisposal() {
        return isDisposal;
    }

    public void setIsDisposal(boolean disposal) {
        isDisposal = disposal;
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

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public TicketRateItem getTicketRateItem() {
        return ticketRateItem;
    }

    public void setTicketRateItem(TicketRateItem ticketRateItem) {
        this.ticketRateItem = ticketRateItem;
    }

    public ClientTypeItem getClientTypeItem() {
        return clientTypeItem;
    }

    public void setClientTypeItem(ClientTypeItem clientTypeItem) {
        this.clientTypeItem = clientTypeItem;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    public ClientStateItem getClientStateItem() {
        return clientStateItem;
    }

    public void setClientStateItem(ClientStateItem clientStateItem) {
        this.clientStateItem = clientStateItem;
    }

    @Override
    public String toString() {
        return "Client{" +
                "groupId='" + groupId + '\'' +
                ", companyName='" + companyName + '\'' +
                ", clientId='" + clientId + '\'' +
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
                ", clientState=" + clientState +
                ", checkState=" + checkState +
                ", salesman=" + salesman +
                ", clientType=" + clientType +
                ", bankName='" + bankName + '\'' +
                ", bankAccount='" + bankAccount + '\'' +
                ", taxNumber='" + taxNumber + '\'' +
                ", ticketType=" + ticketType +
                ", isDisposal=" + isDisposal +
                ", nowTime=" + nowTime +
                ", keyword='" + keyword + '\'' +
                ", page=" + page +
                ", advice='" + advice + '\'' +
                '}';
    }
}
