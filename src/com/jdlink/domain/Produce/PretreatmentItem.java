package com.jdlink.domain.Produce;

import com.jdlink.domain.Client;
import com.jdlink.domain.Dictionary.HandleCategoryItem;
import com.jdlink.domain.Dictionary.ProcessWayItem;
import com.jdlink.domain.Wastes;

public class PretreatmentItem {
    /**
     * 项目Id
     */
    private int itemId;
    /**
     * 预处理单号
     */
    private String pretreatmentId;
    /**
     * 项目序号
     */
    private int serialNumber;
    /**
     * 出库单号
     */
    private String outboundOrderId;
    /**
     * 产废单位
     */
    private String produceCompanyName;
    /**
     * 指标要求及来源
     */
    private String requirements;
    /**
     * 危废信息(重量、热值、灰分、水分、挥发份、)
     */
    private Wastes wastes;
    /**
     * 比例
     */
    private Float proportion;
    /**
     * 预处理暂存点
     */
    private String temporaryAddress;

    //进料方式数据字典
    private HandleCategoryItem handleCategoryItem;

    //处置方式数据字典
    private ProcessWayItem processWayItem;

    public HandleCategoryItem getHandleCategoryItem() {
        return handleCategoryItem;
    }

    public void setHandleCategoryItem(HandleCategoryItem handleCategoryItem) {
        this.handleCategoryItem = handleCategoryItem;
    }

    public ProcessWayItem getProcessWayItem() {
        return processWayItem;
    }

    public void setProcessWayItem(ProcessWayItem processWayItem) {
        this.processWayItem = processWayItem;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(int serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getPretreatmentId() {
        return pretreatmentId;
    }

    public void setPretreatmentId(String pretreatmentId) {
        this.pretreatmentId = pretreatmentId;
    }

    public String getProduceCompanyName() {
        return produceCompanyName;
    }

    public void setProduceCompanyName(String produceCompanyName) {
        this.produceCompanyName = produceCompanyName;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
    }

    public void setProportion(Float proportion) {
        this.proportion = proportion;
    }

    public Float getProportion() {
        return proportion;
    }

    public String getOutboundOrderId() {
        return outboundOrderId;
    }

    public void setOutboundOrderId(String outboundOrderId) {
        this.outboundOrderId = outboundOrderId;
    }

    public String getTemporaryAddress() {
        return temporaryAddress;
    }

    public void setTemporaryAddress(String temporaryAddress) {
        this.temporaryAddress = temporaryAddress;
    }

    @Override
    public String toString() {
        return "PretreatmentItem{" +
                "itemId=" + itemId +
                ", pretreatmentId='" + pretreatmentId + '\'' +
                ", serialNumber=" + serialNumber +
                ", outboundOrderId='" + outboundOrderId + '\'' +
                ", produceCompanyName='" + produceCompanyName + '\'' +
                ", requirements='" + requirements + '\'' +
                ", wastes=" + wastes +
                ", proportion=" + proportion +
                ", temporaryAddress='" + temporaryAddress + '\'' +
                '}';
    }
}
