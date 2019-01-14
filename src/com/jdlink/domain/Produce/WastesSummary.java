package com.jdlink.domain.Produce;

import com.jdlink.domain.Client;
import com.jdlink.domain.Dictionary.SecondaryCategoryItem;
import com.jdlink.domain.Dictionary.UnitDataItem;
import com.jdlink.domain.Inventory.WareHouse;
import com.jdlink.domain.Page;

import java.util.Date;

/**
 * 危废汇总对象
 */
public class WastesSummary {
    /**
     * 主键
     */
    private int id;
    /**
     * 入库单编号
     */
    private String inboundOrderId;
    /**
     * 出库单编号
     */
    private String outboundOrderId;
    /**
     * 入库日期
     */
    private Date inboundDate;
    /**
     * 出库日期
     */
    private Date outboundDate;
    /**
     * 产废单位
     */
    private Client produceCompany;
    /**
     * 仓库对象
     */
    private WareHouse wareHouse;
    /**
     * 次生危废名称
     */
    private SecondaryCategoryItem secondaryCategoryItem;
    /**
     * 危废名称
     */
    private String wastesName;
    /**
     * 危废代码
     */
    private String wastesCode;
    /**
     * 计量单位
     */
    private UnitDataItem unitDataItem;
    /**
     * 危废单价
     */
    private Float unitPriceTax;
    /**
     * 期初数量
     */
    private Float beginningCount;
    /**
     * 期初金额
     */
    private Float beginningPrice;
    /**
     * 入库数量
     */
    private Float inboundCount;
    /**
     * 入库金额
     */
    private Float inboundPrice;
    /**
     * 出库数量
     */
    private Float outboundCount;
    /**
     * 出库金额
     */
    private Float outboundPrice;
    /**
     * 库存数量
     */
    private Float storageCount;
    /**
     * 库存金额
     */
    private Float storagePrice;
    /**
     * 页码
     */
    private Page page;
    /**
     * 关键字
     */
    private String keywords;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getInboundOrderId() {
        return inboundOrderId;
    }

    public void setInboundOrderId(String inboundOrderId) {
        this.inboundOrderId = inboundOrderId;
    }

    public String getOutboundOrderId() {
        return outboundOrderId;
    }

    public void setOutboundOrderId(String outboundOrderId) {
        this.outboundOrderId = outboundOrderId;
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

    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
    }

    public WareHouse getWareHouse() {
        return wareHouse;
    }

    public void setWareHouse(WareHouse wareHouse) {
        this.wareHouse = wareHouse;
    }

    public SecondaryCategoryItem getSecondaryCategoryItem() {
        return secondaryCategoryItem;
    }

    public void setSecondaryCategoryItem(SecondaryCategoryItem secondaryCategoryItem) {
        this.secondaryCategoryItem = secondaryCategoryItem;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }

    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public UnitDataItem getUnitDataItem() {
        return unitDataItem;
    }

    public void setUnitDataItem(UnitDataItem unitDataItem) {
        this.unitDataItem = unitDataItem;
    }

    public Float getUnitPriceTax() {
        return unitPriceTax;
    }

    public void setUnitPriceTax(Float unitPriceTax) {
        this.unitPriceTax = unitPriceTax;
    }

    public Float getBeginningCount() {
        return beginningCount;
    }

    public void setBeginningCount(Float beginningCount) {
        this.beginningCount = beginningCount;
    }

    public Float getBeginningPrice() {
        return beginningPrice;
    }

    public void setBeginningPrice(Float beginningPrice) {
        this.beginningPrice = beginningPrice;
    }

    public Float getInboundCount() {
        return inboundCount;
    }

    public void setInboundCount(Float inboundCount) {
        this.inboundCount = inboundCount;
    }

    public Float getInboundPrice() {
        return inboundPrice;
    }

    public void setInboundPrice(Float inboundPrice) {
        this.inboundPrice = inboundPrice;
    }

    public Float getOutboundCount() {
        return outboundCount;
    }

    public void setOutboundCount(Float outboundCount) {
        this.outboundCount = outboundCount;
    }

    public Float getOutboundPrice() {
        return outboundPrice;
    }

    public void setOutboundPrice(Float outboundPrice) {
        this.outboundPrice = outboundPrice;
    }

    public Float getStorageCount() {
        return storageCount;
    }

    public void setStorageCount(Float storageCount) {
        this.storageCount = storageCount;
    }

    public Float getStoragePrice() {
        return storagePrice;
    }

    public void setStoragePrice(Float storagePrice) {
        this.storagePrice = storagePrice;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }
}
