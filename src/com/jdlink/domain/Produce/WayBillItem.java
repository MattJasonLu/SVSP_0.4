package com.jdlink.domain.Produce;

import com.jdlink.domain.Client;
import com.jdlink.domain.Salesman;
import com.jdlink.domain.Wastes;

import java.util.Date;

public class WayBillItem{
    /**
     * 接运单明细项目号
     */
    private String itemId;
    /**
     * 接运单号
     */
    private String wayBillId;
    /**
     * 接收单位
     */
    private String receiveCompanyName;
    /**
     * 业务员姓名
     */
    private String salesmanName;
    /**
     * 业务员ID
     */
    private String salesmanId;
    /**
     * 危废名称
     */
    private String wastesName;
    /**
     * 危废Id
     */
    private String wastesId;
    /**
     * 危废数量
     */
    private float wastesAmount;
    /**
     * 危废价格
     */
    private float wastesPrice;
    /**
     * 危废总额
     */
    private float wastesTotalPrice;
    /**
     * 危废代码
     */
    private String wastesCode;
    /**
     * 开票日期
     */
    private Date invoiceDate;
    /**
     * 发票号码
     */
    private String invoiceNumber;
    /**
     * 处置单位/接收单位经手人
     */
    private String receiveCompanyOperator;

    private Date receiveDate;

    public Date getReceiveDate() {
        return receiveDate;
    }

    public void setReceiveDate(Date receiveDate) {
        this.receiveDate = receiveDate;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getReceiveCompanyName() {
        return receiveCompanyName;
    }

    public void setReceiveCompanyName(String receiveCompanyName) {
        this.receiveCompanyName = receiveCompanyName;
    }

    public String getSalesmanName() {
        return salesmanName;
    }

    public void setSalesmanName(String salesmanName) {
        this.salesmanName = salesmanName;
    }

    public String getSalesmanId() {
        return salesmanId;
    }

    public void setSalesmanId(String salesmanId) {
        this.salesmanId = salesmanId;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }

    public String getWastesId() {
        return wastesId;
    }

    public void setWastesId(String wastesId) {
        this.wastesId = wastesId;
    }

    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public float getWastesAmount() {
        return wastesAmount;
    }

    public void setWastesAmount(float wastesAmount) {
        this.wastesAmount = wastesAmount;
    }

    public float getWastesPrice() {
        return wastesPrice;
    }

    public void setWastesPrice(float wastesPrice) {
        this.wastesPrice = wastesPrice;
    }

    public float getWastesTotalPrice() {
        return wastesTotalPrice;
    }

    public void setWastesTotalPrice(float wastesTotalPrice) {
        this.wastesTotalPrice = wastesTotalPrice;
    }

    public Date getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(Date invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getReceiveCompanyOperator() {
        return receiveCompanyOperator;
    }

    public void setReceiveCompanyOperator(String receiveCompanyOperator) {
        this.receiveCompanyOperator = receiveCompanyOperator;
    }

    public String getWayBillId() {
        return wayBillId;
    }

    public void setWayBillId(String wayBillId) {
        this.wayBillId = wayBillId;
    }

    @Override
    public String toString() {
        return "WayBillItem{" +
                "itemId='" + itemId + '\'' +
                ", wayBillId='" + wayBillId + '\'' +
                ", receiveCompanyName='" + receiveCompanyName + '\'' +
                ", salesmanName='" + salesmanName + '\'' +
                ", salesmanId='" + salesmanId + '\'' +
                ", wastesName='" + wastesName + '\'' +
                ", wastesId='" + wastesId + '\'' +
                ", wastesAmount='" + wastesAmount + '\'' +
                ", wastesPrice='" + wastesPrice + '\'' +
                ", invoiceDate=" + invoiceDate +
                ", invoiceNumber='" + invoiceNumber + '\'' +
                ", receiveCompanyOperator='" + receiveCompanyOperator + '\'' +
                ", receiveDate=" + receiveDate +
                '}';
    }
}