package com.jdlink.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/7/3.
 */
public class Cost {
    /**
     * 成本单编号
     */
    private String quotationId;
    /**
     * 供应商(包含供应商名称、联系人、电话、地址)
     */
    private Supplier supplier;
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
     * 总量=各行合约量之和
     */
    private int totalAmount;
    /**
     * 危废列表
     */
    private List<Wastes> wastesList = new ArrayList<>();

    public String getQuotationId() {
        return quotationId;
    }

    public void setQuotationId(String quotationId) {
        this.quotationId = quotationId;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
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

    public List<Wastes> getWastesList() {
        return wastesList;
    }

    public void setWastesList(List<Wastes> wastesList) {
        this.wastesList = wastesList;
    }

    @Override
    public String toString() {
        return "Cost{" +
                "quotationId='" + quotationId + '\'' +
                ", supplier=" + supplier +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", isContainTax=" + isContainTax +
                ", isContainFreight=" + isContainFreight +
                ", totalPriceTax=" + totalPriceTax +
                ", totalPrice=" + totalPrice +
                ", totalAmount=" + totalAmount +
                ", wastesList=" + wastesList +
                '}';
    }
}
