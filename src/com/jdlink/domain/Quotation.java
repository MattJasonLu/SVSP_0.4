package com.jdlink.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/7/3.
 */
public class Quotation {
    /**
     * ID
     */
    private String id;
    /**
     * 报价单编号
     */
    private String quotationId;
    /**
     * 报价单名称
     */
    private String name;
    /**
     * 版本号
     */
    private String version;
    /**
     * 客户(包含客户名称、联系人、电话、地址)
     */
    private Client client;
    /**
     * 开始日期
     */
    private Date startDate;
    /**
     * 结束日期
     */
    private Date endDate;
    /**
     * 是否含税
     */
    private boolean isContainTax;
    /**
     * 是否含运费
     */
    private boolean isContainFreight;
    /**
     * 含税总价=各行合约量*单价(含税)
     */
    private float totalPriceTax;
    /**
     * 去税总价=各行合约量*单价(去税)
     */
    private float totalPrice;
    /**
     * 税额
     */
    private float totalTax;
    /**
     * 总量=各行合约量之和
     */
    private int totalAmount;
    /**
     * 报价单条目列表
     */
    private List<QuotationItem> quotationItemList = new ArrayList<>();
    /**
     * 状态
     */
    private CheckState checkState;
    /**
     * 意见
     */
    private String advice;
    /**
     * 是否需要盖章
     */
    private boolean isStamp;
    /**
     * 当前时间
     */
    private Date nowTime;
    /**
     * 页码
     */
    private Page page;
    /**
     * 查询关键字
     */
    private String keyword;

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

    public Date getNowTime() {
        return nowTime;
    }

    public void setNowTime(Date nowTime) {
        this.nowTime = nowTime;
    }

    public String getQuotationId() {
        return quotationId;
    }

    public void setQuotationId(String quotationId) {
        this.quotationId = quotationId;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
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

    public boolean getIsContainTax() {
        return isContainTax;
    }

    public void setIsContainTax(boolean containTax) {
        isContainTax = containTax;
    }

    public boolean getIsContainFreight() {
        return isContainFreight;
    }

    public void setIsContainFreight(boolean containFreight) {
        isContainFreight = containFreight;
    }

    public float getTotalPriceTax() {
        return totalPriceTax;
    }

    public void setTotalPriceTax(float totalPriceTax) {
        this.totalPriceTax = totalPriceTax;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public float getTotalTax() {
        return totalTax;
    }

    public void setTotalTax(float totalTax) {
        this.totalTax = totalTax;
    }

    public boolean getIsStamp() {
        return isStamp;
    }

    public void setIsStamp(boolean stamp) {
        isStamp = stamp;
    }

    public List<QuotationItem> getQuotationItemList() {
        return quotationItemList;
    }

    public void setQuotationItemList(List<QuotationItem> quotationItemList) {
        this.quotationItemList = quotationItemList;
    }

    @Override
    public String toString() {
        return "Quotation{" +
                "id='" + id + '\'' +
                ", quotationId='" + quotationId + '\'' +
                ", name='" + name + '\'' +
                ", version='" + version + '\'' +
                ", client=" + client +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", isContainTax=" + isContainTax +
                ", isContainFreight=" + isContainFreight +
                ", totalPriceTax=" + totalPriceTax +
                ", totalPrice=" + totalPrice +
                ", totalTax=" + totalTax +
                ", totalAmount=" + totalAmount +
                ", quotationItemList=" + quotationItemList +
                ", checkState=" + checkState +
                ", advice='" + advice + '\'' +
                ", isStamp=" + isStamp +
                ", nowTime=" + nowTime +
                ", page=" + page +
                ", keyword='" + keyword + '\'' +
                '}';
    }
}
