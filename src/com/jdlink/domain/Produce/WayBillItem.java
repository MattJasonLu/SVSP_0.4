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
    private Client receiveCompany;
    /**
     * 业务员
     */
    private Salesman salesman;
    /**
     * 危废列表
     */
    private Wastes wastes;
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

    public Client getReceiveCompany() {
        return receiveCompany;
    }

    public void setReceiveCompany(Client receiveCompany) {
        this.receiveCompany = receiveCompany;
    }

    public Salesman getSalesman() {
        return salesman;
    }

    public void setSalesman(Salesman salesman) {
        this.salesman = salesman;
    }

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
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
                "receiveCompany=" + receiveCompany +
                ", salesman=" + salesman +
                ", wastesList=" +
                ", invoiceDate=" + invoiceDate +
                ", invoiceNumber='" + invoiceNumber + '\'' +
                ", receiveCompanyOperator='" + receiveCompanyOperator + '\'' +
                '}';
    }
}