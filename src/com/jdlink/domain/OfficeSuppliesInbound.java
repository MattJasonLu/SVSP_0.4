package com.jdlink.domain;

import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Dictionary.TicketRateItem;
import com.jdlink.domain.Dictionary.UnitDataItem;

import java.util.Date;
import java.util.List;

/**
 * 办公用品入库
 */
public class OfficeSuppliesInbound {
    /**
     * 出库单号
     */
    private String inboundId;
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
     * 入库时间
     */
    private Date inboundDate;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 审批状态
     */
    private CheckStateItem checkStateItem;

    public String getInboundId() {
        return inboundId;
    }

    public void setInboundId(String inboundId) {
        this.inboundId = inboundId;
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

    public Date getInboundDate() {
        return inboundDate;
    }

    public void setInboundDate(Date inboundDate) {
        this.inboundDate = inboundDate;
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
