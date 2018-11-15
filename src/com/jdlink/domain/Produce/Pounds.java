package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import jxl.write.DateTime;

import java.util.Date;

/**
 * 磅单
 */
public class Pounds {
    /**
     * 磅单号
     */
    private String id;
    /**
     *转移联单号
     */
    private String transferId;
    /**
     * 入库计划单ID
     */
    private String inboundPlanOrderId;
    /**
     * 创建人
     */
    private String founder;
    /**
     * 创建日期
     */
    private Date creationDate;
    /**
     * 入厂车牌号
     */
    private String enterLicencePlate;
    /**
     * 出厂车牌号
     */
    private String outLicencePlate;
    /**
     * 货物名称
     */
    private String goodsName;
    /**
     * 危废代码
     */
    private String wastesCode;
    /**
     * 毛重/总重
     */
    private Float grossWeight;
    /**
     * 皮重
     */
    private Float tare;
    /**
     * 净重
     */
    private Float netWeight;
    /**
     * 发货单位
     */
    private Client deliveryCompany;
    /**
     * 收货单位
     */
    private String receiveCompanyName;
    /**
     * 业务类型
     */
    private String businessType;
    /**
     * 进厂时间
     */
    private Date enterTime;
    /**
     * 出厂时间
     */
    private Date outTime;
    /**
     * 打印时间
     */
    private Date printTime;
    /**
     * 司机
     */
    private String driver;
    /**
     * 司磅员
     */
    private String weighman;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 磅单状态
     */
    private CheckState state;
    /**
     * 分页
     */
    private Page page;
    /**
     * 查询关键字
     */
    private String keywords;
    /**
     * 日期查询 起始时间
     */
    private Date startDate;
    /**
     * 日期查询 终止时间
     */
    private Date endDate;

    public String getInboundPlanOrderId() {
        return inboundPlanOrderId;
    }

    public void setInboundPlanOrderId(String inboundPlanOrderId) {
        this.inboundPlanOrderId = inboundPlanOrderId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEnterLicencePlate() {
        return enterLicencePlate;
    }

    public void setEnterLicencePlate(String enterLicencePlate) {
        this.enterLicencePlate = enterLicencePlate;
    }

    public String getOutLicencePlate() {
        return outLicencePlate;
    }

    public CheckState getState() {
        return state;
    }

    public void setState(CheckState state) {
        this.state = state;
    }

    public void setOutLicencePlate(String outLicencePlate) {
        this.outLicencePlate = outLicencePlate;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public Float getGrossWeight() {
        return grossWeight;
    }

    public void setGrossWeight(Float grossWeight) {
        this.grossWeight = grossWeight;
    }

    public Float getNetWeight() {
        return netWeight;
    }

    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public void setNetWeight(Float netWeight) {
        this.netWeight = netWeight;
    }

    public Float getTare() {
        return tare;
    }

    public void setTare(Float tare) {
        this.tare = tare;
    }

    public Client getDeliveryCompany() {
        return deliveryCompany;
    }

    public void setDeliveryCompany(Client deliveryCompany) {
        this.deliveryCompany = deliveryCompany;
    }

    public String getReceiveCompanyName() {
        return receiveCompanyName;
    }

    public void setReceiveCompanyName(String receiveCompanyName) {
        this.receiveCompanyName = receiveCompanyName;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public Date getEnterTime() {
        return enterTime;
    }

    public void setEnterTime(Date enterTime) {
        this.enterTime = enterTime;
    }

    public Date getOutTime() {
        return outTime;
    }

    public void setOutTime(Date outTime) {
        this.outTime = outTime;
    }

    public Date getPrintTime() {
        return printTime;
    }

    public void setPrintTime(Date printTime) {
        this.printTime = printTime;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getWeighman() {
        return weighman;
    }

    public void setWeighman(String weighman) {
        this.weighman = weighman;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getTransferId() {
        return transferId;
    }

    public void setTransferId(String transferId) {
        this.transferId = transferId;
    }

    public String getFounder() {
        return founder;
    }

    public void setFounder(String founder) {
        this.founder = founder;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    @Override
    public String toString() {
        return "Pounds{" +
                "id='" + id + '\'' +
                ", transferId='" + transferId + '\'' +
                ", founder='" + founder + '\'' +
                ", creationDate=" + creationDate +
                ", enterLicencePlate='" + enterLicencePlate + '\'' +
                ", outLicencePlate='" + outLicencePlate + '\'' +
                ", goodsName='" + goodsName + '\'' +
                ", grossWeight=" + grossWeight +
                ", netWeight=" + netWeight +
                ", tare=" + tare +
                ", deliveryCompany=" + deliveryCompany +
                ", businessType='" + businessType + '\'' +
                ", enterTime=" + enterTime +
                ", outTime=" + outTime +
                ", printTime=" + printTime +
                ", driver='" + driver + '\'' +
                ", weighman='" + weighman + '\'' +
                ", remarks='" + remarks + '\'' +
                ", state=" + state +
                '}';
    }
}
