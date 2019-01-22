package com.jdlink.domain;

import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Dictionary.TicketRateItem;
import com.jdlink.domain.Dictionary.UnitDataItem;

import java.util.Date;

/**
 * 入库单条目
 */
public class OfficeSuppliesItem {
    /**
     * 条目编号
     */
    private String itemId;
    /**
     * 入库单号
     */
    private String inboundId;
    /**
     * 出库单号
     */
    private String outboundId;
    /**
     * 采购单位
     */
    private Supplier supplier;
    /**
     * 物品编号
     */
    private String itemCode;
    /**
     * 物品名称
     */
    private String itemName;
    /**
     * 物品规格
     */
    private String itemSpecifications;
    /**
     * 计量单位
     */
    private UnitDataItem unitDataItem;
    /**
     * 物品数量
     */
    private Float itemAmount;
    /**
     * 剩余数量
     */
    private Float leftAmount;
    /**
     * 含税单价
     */
    private Float taxUnitPrice;
    /**
     * 不含税单价
     */
    private Float unitPrice;
    /**
     * 含税总价
     */
    private Float totalTaxPrice;
    /**
     * 不含税总价
     */
    private Float totalPrice;
    /**
     * 入库日期
     */
    private Date inboundDate;
    /**
     * 出库日期
     */
    private Date outboundDate;
    /**
     * 开票税率
     */
    private TicketRateItem ticketRateItem;
    /**
     * 制单人
     */
    private String author;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 备注
     */
    private String remark;
    /**
     * 审批状态
     */
    private CheckStateItem checkStateItem;
    /**
     * 关键字
     */
    private String keyword;
    /**
     * 页码
     */
    private Page page;

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getInboundId() {
        return inboundId;
    }

    public void setInboundId(String inboundId) {
        this.inboundId = inboundId;
    }

    public String getOutboundId() {
        return outboundId;
    }

    public void setOutboundId(String outboundId) {
        this.outboundId = outboundId;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemSpecifications() {
        return itemSpecifications;
    }

    public void setItemSpecifications(String itemSpecifications) {
        this.itemSpecifications = itemSpecifications;
    }

    public UnitDataItem getUnitDataItem() {
        return unitDataItem;
    }

    public void setUnitDataItem(UnitDataItem unitDataItem) {
        this.unitDataItem = unitDataItem;
    }

    public Float getItemAmount() {
        return itemAmount;
    }

    public void setItemAmount(Float itemAmount) {
        this.itemAmount = itemAmount;
    }

    public Float getLeftAmount() {
        return leftAmount;
    }

    public void setLeftAmount(Float leftAmount) {
        this.leftAmount = leftAmount;
    }

    public Float getTaxUnitPrice() {
        return taxUnitPrice;
    }

    public void setTaxUnitPrice(Float taxUnitPrice) {
        this.taxUnitPrice = taxUnitPrice;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
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

    public Date getOutboundDate() {
        return outboundDate;
    }

    public void setOutboundDate(Date outboundDate) {
        this.outboundDate = outboundDate;
    }

    public TicketRateItem getTicketRateItem() {
        return ticketRateItem;
    }

    public void setTicketRateItem(TicketRateItem ticketRateItem) {
        this.ticketRateItem = ticketRateItem;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
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
}
