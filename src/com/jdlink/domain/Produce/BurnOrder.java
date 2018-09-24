package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;

import java.util.Date;
import java.util.List;

public class BurnOrder {
    /**
     * 焚烧工单编号
     */
    private String id;
    /**
     * 焚烧工单创建日期
     */
    private Date creationDate;
    /**
     * 分页
     */
    private Page page;
    /**
     * 焚烧工单状态
     */
    private CheckState state;
    /**
     * 预处理单号
     */
    private String pretreatmentId;
    /**
     * 预处理项目数据
     */
    private List<PretreatmentItem> pretreatmentItemList;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 重量合计
     */
    private Float weightTotal;
    /**
     * 热值总计
     */
    private Float calorificTotal;
    /**
     * 灰分总计
     */
    private Float ashPercentageTotal;
    /**
     * 水分总计
     */
    private Float wetPercentageTotal;
    /**
     * 挥发份总计
     */
    private Float volatileNumberTotal;
    /**
     * 氯总计
     */
    private Float chlorinePercentageTotal;
    /**
     * 硫总计
     */
    private Float sulfurPercentageTotal;
    /**
     * PH总计
     */
    private Float phTotal;
    /**
     * 磷合计
     */
    private Float phosphorusPercentageTotal;
    /**
     * 氟合计
     */
    private Float fluorinePercentageTotal;
    /**
     * 残渣比例
     */
    private Float distillationProportion;
    /**
     * 废液比例
     */
    private Float wasteLiquidProportion;
    /**
     * 污泥比例
     */
    private Float sludgeProportion;
    /**
     * 散装比例
     */
    private Float bulkProportion;
    /**
     * 破碎比例
     */
    private Float crushingProportion;
    /**
     *悬挂连比例
     */
    private Float suspensionProportion;
    /**
     * 查询关键字
     */
    private String keywords;
    /**
     * 日期查询 起始时间
     */
    private Date startDate;
    /**
     * 日期查询 终止时间
     */
    private Date endDate;

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

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getPretreatmentId() {
        return pretreatmentId;
    }

    public void setPretreatmentId(String pretreatmentId) {
        this.pretreatmentId = pretreatmentId;
    }

    public CheckState getState() {
        return state;
    }

    public void setState(CheckState state) {
        this.state = state;
    }

    public List<PretreatmentItem> getPretreatmentItemList() {
        return pretreatmentItemList;
    }

    public void setPretreatmentItemList(List<PretreatmentItem> pretreatmentItemList) {
        this.pretreatmentItemList = pretreatmentItemList;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Float getWeightTotal() {
        return weightTotal;
    }

    public void setWeightTotal(Float weightTotal) {
        this.weightTotal = weightTotal;
    }

    public Float getCalorificTotal() {
        return calorificTotal;
    }

    public void setCalorificTotal(Float calorificTotal) {
        this.calorificTotal = calorificTotal;
    }

    public Float getAshPercentageTotal() {
        return ashPercentageTotal;
    }

    public void setAshPercentageTotal(Float ashPercentageTotal) {
        this.ashPercentageTotal = ashPercentageTotal;
    }

    public Float getWetPercentageTotal() {
        return wetPercentageTotal;
    }

    public void setWetPercentageTotal(Float wetPercentageTotal) {
        this.wetPercentageTotal = wetPercentageTotal;
    }

    public Float getVolatileNumberTotal() {
        return volatileNumberTotal;
    }

    public void setVolatileNumberTotal(Float volatileNumberTotal) {
        this.volatileNumberTotal = volatileNumberTotal;
    }

    public Float getChlorinePercentageTotal() {
        return chlorinePercentageTotal;
    }

    public void setChlorinePercentageTotal(Float chlorinePercentageTotal) {
        this.chlorinePercentageTotal = chlorinePercentageTotal;
    }

    public Float getSulfurPercentageTotal() {
        return sulfurPercentageTotal;
    }

    public void setSulfurPercentageTotal(Float sulfurPercentageTotal) {
        this.sulfurPercentageTotal = sulfurPercentageTotal;
    }

    public Float getPhTotal() {
        return phTotal;
    }

    public void setPhTotal(Float phTotal) {
        this.phTotal = phTotal;
    }

    public Float getPhosphorusPercentageTotal() {
        return phosphorusPercentageTotal;
    }

    public void setPhosphorusPercentageTotal(Float phosphorusPercentageTotal) {
        this.phosphorusPercentageTotal = phosphorusPercentageTotal;
    }

    public Float getFluorinePercentageTotal() {
        return fluorinePercentageTotal;
    }

    public void setFluorinePercentageTotal(Float fluorinePercentageTotal) {
        this.fluorinePercentageTotal = fluorinePercentageTotal;
    }

    public Float getDistillationProportion() {
        return distillationProportion;
    }

    public void setDistillationProportion(Float distillationProportion) {
        this.distillationProportion = distillationProportion;
    }

    public Float getWasteLiquidProportion() {
        return wasteLiquidProportion;
    }

    public void setWasteLiquidProportion(Float wasteLiquidProportion) {
        this.wasteLiquidProportion = wasteLiquidProportion;
    }

    public Float getSludgeProportion() {
        return sludgeProportion;
    }

    public void setSludgeProportion(Float sludgeProportion) {
        this.sludgeProportion = sludgeProportion;
    }

    public Float getBulkProportion() {
        return bulkProportion;
    }

    public void setBulkProportion(Float bulkProportion) {
        this.bulkProportion = bulkProportion;
    }

    public Float getCrushingProportion() {
        return crushingProportion;
    }

    public void setCrushingProportion(Float crushingProportion) {
        this.crushingProportion = crushingProportion;
    }

    public Float getSuspensionProportion() {
        return suspensionProportion;
    }

    public void setSuspensionProportion(Float suspensionProportion) {
        this.suspensionProportion = suspensionProportion;
    }

    @Override
    public String toString() {
        return "BurnOrder{" +
                "id='" + id + '\'' +
                ", creationDate=" + creationDate +
                ", page=" + page +
                ", state=" + state +
                ", pretreatmentItemList=" + pretreatmentItemList +
                ", remarks='" + remarks + '\'' +
                ", weightTotal=" + weightTotal +
                ", calorificTotal=" + calorificTotal +
                ", ashPercentageTotal=" + ashPercentageTotal +
                ", wetPercentageTotal=" + wetPercentageTotal +
                ", volatileNumberTotal=" + volatileNumberTotal +
                ", chlorinePercentageTotal=" + chlorinePercentageTotal +
                ", sulfurPercentageTotal=" + sulfurPercentageTotal +
                ", phTotal=" + phTotal +
                ", phosphorusPercentageTotal=" + phosphorusPercentageTotal +
                ", fluorinePercentageTotal=" + fluorinePercentageTotal +
                ", distillationProportion=" + distillationProportion +
                ", wasteLiquidProportion=" + wasteLiquidProportion +
                ", sludgeProportion=" + sludgeProportion +
                ", bulkProportion=" + bulkProportion +
                ", crushingProportion=" + crushingProportion +
                ", suspensionProportion=" + suspensionProportion +
                '}';
    }
}
