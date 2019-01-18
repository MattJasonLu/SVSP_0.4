package com.jdlink.domain;

import com.jdlink.domain.Dictionary.CheckStateItem;

import java.util.Date;
import java.util.List;

public class OfficeSuppliesOutbound {
    /**
     * 出库单号
     */
    private String outboundId;
    /**
     * 入库单列表
     */
    private List<OfficeSuppliesItem> officeSuppliesItemList;
    /**
     * 含税总价
     */
    private Float totalTaxPrice;
    /**
     * 去税总价
     */
    private Float totalPrice;
    /**
     * 出库时间
     */
    private Date outboundDate;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 审批状态
     */
    private CheckStateItem checkStateItem;

    public String getOutboundId() {
        return outboundId;
    }

    public void setOutboundId(String outboundId) {
        this.outboundId = outboundId;
    }

    public List<OfficeSuppliesItem> getOfficeSuppliesItemList() {
        return officeSuppliesItemList;
    }

    public void setOfficeSuppliesItemList(List<OfficeSuppliesItem> officeSuppliesItemList) {
        this.officeSuppliesItemList = officeSuppliesItemList;
    }

    public Float getTotalTaxPrice() {
        return totalTaxPrice;
    }

    public void setTotalTaxPrice(Float totalTaxPrice) {
        this.totalTaxPrice = totalTaxPrice;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Date getOutboundDate() {
        return outboundDate;
    }

    public void setOutboundDate(Date outboundDate) {
        this.outboundDate = outboundDate;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }
}
