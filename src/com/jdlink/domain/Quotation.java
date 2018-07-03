package com.jdlink.domain;

import java.util.Date;

/**
 * Created by matt on 2018/7/3.
 */
public class Quotation {
    /**
     * 报价单编号
     */
    private String quotationId;
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

    @Override
    public String toString() {
        return "Quotation{" +
                "quotationId='" + quotationId + '\'' +
                ", client=" + client +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", isContainTax=" + isContainTax +
                ", isContainFreight=" + isContainFreight +
                '}';
    }
}
