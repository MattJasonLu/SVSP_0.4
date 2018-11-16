package com.jdlink.domain.Produce;

import com.jdlink.domain.Unit;

/*
 * 采购计划数据明细结构
 * */
public class ProcurementPlanItem {

    //主键
    private int id;

    //外键
    private String procurementPlanId;

    //类别
    private String category;

    //物资名称
    private String suppliesName;

     //规格型号
    private String specifications;

    //申购部门
    private String proposer;

    //需求数量
    private int demandQuantity;

    //单位
    private Unit unit;

    public Unit getUnit() {
        return unit;
    }

    //单价
    private float price;

    //预计金额
    private float priceTotal;

    //备注
    private String remarks;

    public String getProcurementPlanId() {
        return procurementPlanId;
    }

    public void setProcurementPlanId(String procurementPlanId) {
        this.procurementPlanId = procurementPlanId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSuppliesName() {
        return suppliesName;
    }

    public void setSuppliesName(String suppliesName) {
        this.suppliesName = suppliesName;
    }

    public String getSpecifications() {
        return specifications;
    }

    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    public String getProposer() {
        return proposer;
    }

    public void setProposer(String proposer) {
        this.proposer = proposer;
    }

    public float getDemandQuantity() {
        return demandQuantity;
    }

    public void setDemandQuantity(int demandQuantity) {
        this.demandQuantity = demandQuantity;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getPriceTotal() {
        return priceTotal;
    }

    public void setPriceTotal(float priceTotal) {
        this.priceTotal = priceTotal;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "ProcurementPlanItem{" +
                "id=" + id +
                ", category='" + category + '\'' +
                ", suppliesName='" + suppliesName + '\'' +
                ", specifications='" + specifications + '\'' +
                ", proposer='" + proposer + '\'' +
                ", demandQuantity=" + demandQuantity +
                ", unit=" + unit +
                ", price=" + price +
                ", priceTotal=" + priceTotal +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}
