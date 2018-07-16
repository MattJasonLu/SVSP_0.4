package com.jdlink.domain;

import java.util.Date;

/**
 * Created by matt on 2018/5/17.
 * 合同类
 */
public class Contract {
    /**
     * 合同编号
     */
    private String contractId;
    /**
     * 公司名称
     */
    private String companyName;
    /**
     * 合同名称
     */
    private String contractName;
    /**
     * 合同版本(是否为公司合同)
     */
    private boolean isCompanyContract;
    /**
     * 所属区域(省+市+区)
     */
    private String area;
    /**
     * 合同状态
     */
    private CheckState checkState;
    /**
     * 签订日期
     */
    private Date beginTime;
    /**
     * 结束日期
     */
    private Date endTime;
    /**
     * 合约量(吨)
     */
    private float agreedQuantity;
    /**
     * 联系人
     */
    private String contactName;
    /**
     * 电话
     */
    private String telephone;
    /**
     * 送审人员
     */
    private String reviewer;
    /**
     * 送审部门
     */
    private String reviewDepartment;
    /**
     * 送审日期
     */
    private Date reviewDate;

    private ContractType contractType;
    /**
     * 合同版本
     */
    private ContractVersion contractVersion;
    /**
     * 省市地区
     */
    private Province province;
    private  String city;
    /**
     * 预约处置费
     */
private  String order1;
    /**
     * 是否包含运费
     */
    private  boolean isFreight;
    /**
     * 客户列表(数据库存在)
     */
    private  String clientId;
    /**
     * 开户行名称
     */
    private  String bankName;
    /**
     * 开户行账号
     */
    private  String bankAccount;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    /**
     * 关键字
     */

    private  String key;
    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public String getBankName() {
        return bankName;
    }
/**
* 开票税率1
*/
private  TicketRate1 ticketRate1;

    public TicketRate1 getTicketRate1() {
        return ticketRate1;
    }

    public void setTicketRate1(TicketRate1 ticketRate1) {
        this.ticketRate1 = ticketRate1;
    }

    public TicketRate2 getTicketRate2() {
        return ticketRate2;
    }

    public void setTicketRate2(TicketRate2 ticketRate2) {
        this.ticketRate2 = ticketRate2;
    }

    /**
     * 开票税率2
     */
    private  TicketRate2 ticketRate2;


    /**
     *
     * Logistics qualification物流公司资质
     */
    private  String logisticsQualification;

    /**
     * Qualification资质有效期
     * @return
     */
    private Date beginQualification;
    private Date endQualification;
    /**
     * 危险废物名称
     *
     */
    private  String wasteName;

    /**
     * 危险废物数量 吨每年
     *
     */
    private  String tonNumber;
    /**
     *甲方法定代表人
     */
    private String companyLegal;
    /**
     *甲方委托代理人
     */
    private String companyAgent;

    /**
     *
     * 乙方法定代表人
     */
      private String clientLegal;

    /**
     *
     * 乙方委托代理人
     */
    private String clientAgent;
    /**
     * 模板
     */

    private String modelName;
    /**
     * 年份
     */
    private String year;
    /**
     * 适用期限
     */
    private String period;
    private String contractContent;

    /**
     * 单位地址
     */
    private String address;
    /**
     * 委托事项
     */
    private String thing;

    /**
     * 添加状况

     */
    private  String addType;

    public String getAddType() {
        return addType;
    }

    public void setAddType(String addType) {
        this.addType = addType;
    }

    public String getThing() {
        return thing;
    }

    public void setThing(String thing) {
        this.thing = thing;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContractContent() {
        return contractContent;
    }

    public void setContractContent(String contractContent) {
        this.contractContent = contractContent;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getClientAgent() {
        return clientAgent;
    }

    public void setClientAgent(String clientAgent) {
        this.clientAgent = clientAgent;
    }

    public String getClientLegal() {
        return clientLegal;
    }

    public void setClientLegal(String clientLegal) {
        this.clientLegal = clientLegal;
    }

    public String getCompanyAgent() {
        return companyAgent;
    }

    public void setCompanyAgent(String companyAgent) {
        this.companyAgent = companyAgent;
    }

    public String getCompanyLegal() {
        return companyLegal;
    }

    public void setCompanyLegal(String companyLega) {
        this.companyLegal = companyLega;
    }

    public String getWasteName() {
        return wasteName;
    }

    public String getTonNumber() {
        return tonNumber;
    }

    public void setTonNumber(String tonNumber) {
        this.tonNumber = tonNumber;
    }

    public void setWasteName(String wasteName) {
        this.wasteName = wasteName;
    }

    public Date getBeginQualification() {
        return beginQualification;
    }

    public void setBeginQualification(Date beginQualification) {
        this.beginQualification = beginQualification;
    }

    public Date getEndQualification() {
        return endQualification;
    }

    public void setEndQualification(Date endQualification) {
        this.endQualification = endQualification;
    }

    public String getLogisticsQualification() {
        return logisticsQualification;
    }

    public void setLogisticsQualification(String logisticsQualification) {
        this.logisticsQualification = logisticsQualification;
    }





    public void setBankName(String bankName) {
        this.bankName = bankName;
    }


    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getOrder1() {
        return order1;
    }

    public void setOrder1(String order1) {
        this.order1 = order1;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public boolean isFreight() {
        return isFreight;
    }

    public void setFreight(boolean freight) {
        isFreight = freight;
    }

    public void setCompanyContract(boolean companyContract) {
        isCompanyContract = companyContract;
    }
    public ContractVersion getContractVersion() {
        return contractVersion;
    }

    public void setContractVersion(ContractVersion contractVersion) {
        this.contractVersion = contractVersion;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getContractName() {
        return contractName;
    }

    public void setContractName(String contractName) {
        this.contractName = contractName;
    }

    public boolean getIsCompanyContract() {
        return isCompanyContract;
    }

    public void setIsCompanyContract(boolean companyContract) {
        isCompanyContract = companyContract;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public Date getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(Date beginTime) {
        this.beginTime = beginTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public float getAgreedQuantity() {
        return agreedQuantity;
    }

    public void setAgreedQuantity(float agreedQuantity) {
        this.agreedQuantity = agreedQuantity;
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

    public String getReviewer() {
        return reviewer;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public String getReviewDepartment() {
        return reviewDepartment;
    }

    public void setReviewDepartment(String reviewDepartment) {
        this.reviewDepartment = reviewDepartment;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }
}
