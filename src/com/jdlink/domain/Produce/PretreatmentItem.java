package com.jdlink.domain.Produce;

import com.jdlink.domain.Client;
import com.jdlink.domain.Wastes;

public class PretreatmentItem {
    /**
     * 序号
     */
    private String itemId;
    /**
     * 预处理单号
     */
    private String pretreatmentId;
    /**
     * 出库单号
     */
    private String outboundOrderId;
    /**
     * 产废单位
     */
    private Client produceCompany;
    /**
     * 指标要求及来源
     */
    private String requirements;
    /**
     * 危废信息(比例、重量、热值、灰分、水分、挥发份、)
     */
    private Wastes wastes;
    /**
     * 比例
     */
    private Float proportion;

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getPretreatmentId() {
        return pretreatmentId;
    }

    public void setPretreatmentId(String pretreatmentId) {
        this.pretreatmentId = pretreatmentId;
    }

    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
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

    public String getOutboundOrderId() {
        return outboundOrderId;
    }

    public void setOutboundOrderId(String outboundOrderId) {
        this.outboundOrderId = outboundOrderId;
    }

    @Override
    public String toString() {
        return "PretreatmentItem{" +
                "itemId='" + itemId + '\'' +
                ", pretreatmentId='" + pretreatmentId + '\'' +
                ", outboundOrderId='" + outboundOrderId + '\'' +
                ", produceCompany=" + produceCompany +
                ", requirements='" + requirements + '\'' +
                ", wastes=" + wastes +
                ", proportion='" + proportion + '\'' +
                '}';
    }
}
