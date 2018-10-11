package com.jdlink.domain.Produce;

import com.jdlink.domain.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 物料需求单主表
 */
public class MaterialRequire {
    /**
     * 物料需求单编号
     */
    private String materialRequireId;

    /**
     * 配伍编号
     *
     */
    private String compatibilityId;


    /**
     * 周生产计划量汇总
     */
    private float weeklyDemandTotal;

    /**
     * 目前库存量汇总
     */
    private  float currentInventoryTotal;
    /**
     * 安全库存量汇总
     */
    private float safetyTotal;
    /**
     * 市场采购量汇总
     */
    private float marketPurchasesTotal;
    /**
     * 基础数据阈值表
     *
     */
    private Threshold threshold;

    //热值平均

    private  float calorificAvg;

    //灰分平均

    private  float  ashAvg;

    //水分平均

    private  float  waterAvg;

    //氯平均

    private float   clAvg;

    //硫平均

    private float  sAvg;

    //磷平均

    private float pAvg;

    //氟平均

    private float fAvg;

    //酸碱度平均

    private float phAvg;

    /**
     * 状态
     *
     */
    private CheckState checkState;
    /**
     * 备注
     *
     */
    private String remarks;

    //物料明细
    private List<MaterialRequireItem> materialRequireItemList=new ArrayList<>();

    /**
     * 意见
     */
    private String opinion;

    /**
     * 分页
     * @return
     */
    /**
     * 关键字
     * @return
     */
    private String keywords;

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getOpinion() {
        return opinion;
    }

    public void setOpinion(String opinion) {
        this.opinion = opinion;
    }
    private Page page;

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public List<MaterialRequireItem> getMaterialRequireItemList() {
        return materialRequireItemList;
    }

    public void setMaterialRequireItemList(List<MaterialRequireItem> materialRequireItemList) {
        this.materialRequireItemList = materialRequireItemList;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }


    public String getCompatibilityId() {
        return compatibilityId;
    }

    public void setCompatibilityId(String compatibilityId) {
        this.compatibilityId = compatibilityId;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }


    public void setThreshold(Threshold threshold) {
        this.threshold = threshold;
    }

    public String getMaterialRequireId() {
        return materialRequireId;
    }

    public void setMaterialRequireId(String materialRequireId) {
        this.materialRequireId = materialRequireId;
    }


    public float getWeeklyDemandTotal() {
        return weeklyDemandTotal;
    }

    public void setWeeklyDemandTotal(float weeklyDemandTotal) {
        this.weeklyDemandTotal = weeklyDemandTotal;
    }

    public float getCurrentInventoryTotal() {
        return currentInventoryTotal;
    }

    public void setCurrentInventoryTotal(float currentInventoryTotal) {
        this.currentInventoryTotal = currentInventoryTotal;
    }

    public float getSafetyTotal() {
        return safetyTotal;
    }

    public void setSafetyTotal(float safetyTotal) {
        this.safetyTotal = safetyTotal;
    }

    public float getMarketPurchasesTotal() {
        return marketPurchasesTotal;
    }

    public void setMarketPurchasesTotal(float marketPurchasesTotal) {
        this.marketPurchasesTotal = marketPurchasesTotal;
    }

    public Threshold getThreshold() {
        return threshold;
    }

    public float getCalorificAvg() {
        return calorificAvg;
    }

    public void setCalorificAvg(float calorificAvg) {
        this.calorificAvg = calorificAvg;
    }

    public float getAshAvg() {
        return ashAvg;
    }

    public void setAshAvg(float ashAvg) {
        this.ashAvg = ashAvg;
    }

    public float getWaterAvg() {
        return waterAvg;
    }

    public void setWaterAvg(float waterAvg) {
        this.waterAvg = waterAvg;
    }

    public float getClAvg() {
        return clAvg;
    }

    public void setClAvg(float clAvg) {
        this.clAvg = clAvg;
    }

    public float getsAvg() {
        return sAvg;
    }

    public void setsAvg(float sAvg) {
        this.sAvg = sAvg;
    }

    public float getpAvg() {
        return pAvg;
    }

    public void setpAvg(float pAvg) {
        this.pAvg = pAvg;
    }

    public float getfAvg() {
        return fAvg;
    }

    public void setfAvg(float fAvg) {
        this.fAvg = fAvg;
    }

    public float getPhAvg() {
        return phAvg;
    }

    public void setPhAvg(float phAvg) {
        this.phAvg = phAvg;
    }

    @Override
    public String toString() {
        return "MaterialRequire{" +
                "materialRequireId='" + materialRequireId + '\'' +
                ", compatibilityId='" + compatibilityId + '\'' +
                ", weeklyDemandTotal=" + weeklyDemandTotal +
                ", currentInventoryTotal=" + currentInventoryTotal +
                ", safetyTotal=" + safetyTotal +
                ", marketPurchasesTotal=" + marketPurchasesTotal +
                ", threshold=" + threshold +
                ", calorificAvg=" + calorificAvg +
                ", ashAvg=" + ashAvg +
                ", waterAvg=" + waterAvg +
                ", clAvg=" + clAvg +
                ", sAvg=" + sAvg +
                ", pAvg=" + pAvg +
                ", fAvg=" + fAvg +
                ", phAvg=" + phAvg +
                ", checkState=" + checkState +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}
