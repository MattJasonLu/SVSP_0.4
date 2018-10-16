package com.jdlink.domain.Produce;

import com.jdlink.domain.*;

import java.util.ArrayList;
import java.util.List;

/**
 *库存申报
 */

public class Stock {
    /**
     *库存申报ID
     */
    private  String stockId;
    /**
     *产废公司名称(已不用)
     */
    private String proWasteCompany;
    /**
     *产废联系人(已不用)
     */
     private String proContactName;
    /**
     *产废联系电话(已不用)
     */
     private String proTelephone;
    /**
     *运输公司(已不用)
     */
     private  String transport;
    /**
     *运输公司联系电话(已不用)
     */
    private  String transportTelephone;
    /**
     *车牌号
     */
    private  String plateNumber;
    /**
    * 危废列表
     */
    private List<Wastes> wastesList=new ArrayList<>();
    /**
     * 审批意见
     */
    private  String opinion;
    /**
     * 驳回意见
     */
    private  String backContent;
    /**
     * 产废公司
     */
    private Client client;
    /**
     * 运输类供应方
     */
    private Supplier supplier;
    /**
     * 是否自营
     */
    private boolean selfEmployed;
    /**
     * 是否需要添加
     */
    private String addType;
    /**
     * 状态
     */
    private CheckState checkState;
    /**
     * 申报明细
     */
    List<StockItem> stockItemList=new ArrayList<>();

    private Page page;
    private String keyword;

    public List<StockItem> getStockItemList() {
        return stockItemList;
    }

    public void setStockItemList(List<StockItem> stockItemList) {
        this.stockItemList = stockItemList;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public String getProWasteCompany() {
        return proWasteCompany;
    }

    public void setProWasteCompany(String proWasteCompany) {
        this.proWasteCompany = proWasteCompany;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getOpinion() {
        return opinion;
    }

    public void setOpinion(String opinion) {
        this.opinion = opinion;
    }

    public String getBackContent() {
        return backContent;
    }

    public void setBackContent(String backContent) {
        this.backContent = backContent;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public List<Wastes> getWastesList() {
        return wastesList;
    }

    public void setWastesList(List<Wastes> wastesList) {
        this.wastesList = wastesList;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public String getAddType() {
        return addType;
    }

    public void setAddType(String addType) {
        this.addType = addType;
    }

    public boolean isSelfEmployed() {
        return selfEmployed;
    }

    public void setSelfEmployed(boolean selfEmployed) {
        this.selfEmployed = selfEmployed;
    }

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
    }

    public String getProContactName() {
        return proContactName;
    }

    public void setProContactName(String proContactName) {
        this.proContactName = proContactName;
    }

    public String getProTelephone() {
        return proTelephone;
    }

    public void setProTelephone(String proTelephone) {
        this.proTelephone = proTelephone;
    }

    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }

    public String getTransportTelephone() {
        return transportTelephone;
    }

    public void setTransportTelephone(String transportTelephone) {
        this.transportTelephone = transportTelephone;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "stockId='" + stockId + '\'' +
                ", proWasteCompany='" + proWasteCompany + '\'' +
                ", proContactName='" + proContactName + '\'' +
                ", proTelephone='" + proTelephone + '\'' +
                ", transport='" + transport + '\'' +
                ", transportTelephone='" + transportTelephone + '\'' +
                ", plateNumber='" + plateNumber + '\'' +
                ", wastesList=" + wastesList +
                ", opinion='" + opinion + '\'' +
                ", backContent='" + backContent + '\'' +
                ", client=" + client +
                ", supplier=" + supplier +
                ", selfEmployed=" + selfEmployed +
                ", addType='" + addType + '\'' +
                ", checkState=" + checkState +
                ", page=" + page +
                ", keyword='" + keyword + '\'' +
                '}';
    }
}
