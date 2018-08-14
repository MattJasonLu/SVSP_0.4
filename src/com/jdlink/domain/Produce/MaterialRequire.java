package com.jdlink.domain.Produce;

import com.jdlink.domain.FormType;
import com.jdlink.domain.PackageType;
import com.jdlink.domain.Wastes;

import java.util.ArrayList;
import java.util.List;

public class MaterialRequire {
    /**
     * 物料需求单编号
     */
    private String materialRequireId;
    /**
     * 处置类别
     */
    private  HandleCategory handleCategory;
    /**
     * 目前库存量=====>
     */
    private  float currentInventory;
    /**
     * 周生产计划量
     */
    private float weeklyDemand;
    /**
     * 安全库存量
     */
    private float safety;
    /**
     * 市场采购量
     */
    private float marketPurchases;
    /**
     * 基础数据阈值表
     *
     */
    private Threshold threshold;
    /**
     * 序号
     *
     */
    private  String id;
    /**
     * 物质形态
     *
     */
    private FormType formType;

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Threshold getThreshold() {
        return threshold;
    }

    /**
     * 物料需求
     *
     */
    private Compatibility compatibility;
    /**
     * 包装方式
     *
     */
    private PackageType packageType;

    public PackageType getPackageType() {
        return packageType;
    }
    /**
     * 备注
     *
     */
    private String remarks;
    /**
     * 配伍编号
     *
     */
    private String compatibilityId;

    @Override
    public String toString() {
        return "MaterialRequire{" +
                "materialRequireId='" + materialRequireId + '\'' +
                ", handleCategory=" + handleCategory +
                ", currentInventory=" + currentInventory +
                ", weeklyDemand=" + weeklyDemand +
                ", safety=" + safety +
                ", marketPurchases=" + marketPurchases +
                ", threshold=" + threshold +
                ", id='" + id + '\'' +
                ", formType=" + formType +
                ", compatibility=" + compatibility +
                ", packageType=" + packageType +
                ", remarks='" + remarks + '\'' +
                ", compatibilityId='" + compatibilityId + '\'' +
                ", wastesList=" + wastesList +
                '}';
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

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    public Compatibility getCompatibility() {
        return compatibility;
    }

    public void setCompatibility(Compatibility compatibility) {
        this.compatibility = compatibility;
    }

    public void setThreshold(Threshold threshold) {
        this.threshold = threshold;
    }

    /**
 * 危废信息(形态、包装方式、一些物质的最大值最小值)
 */
  List<Wastes> wastesList=new ArrayList<>();

    public String getMaterialRequireId() {
        return materialRequireId;
    }

    public void setMaterialRequireId(String materialRequireId) {
        this.materialRequireId = materialRequireId;
    }

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }

    public float getCurrentInventory() {
        return currentInventory;
    }

    public void setCurrentInventory(float currentInventory) {
        this.currentInventory = currentInventory;
    }

    public float getWeeklyDemand() {
        return weeklyDemand;
    }

    public void setWeeklyDemand(float weeklyDemand) {
        this.weeklyDemand = weeklyDemand;
    }

    public float getSafety() {
        return safety;
    }

    public void setSafety(float safety) {
        this.safety = safety;
    }

    public float getMarketPurchases() {
        return marketPurchases;
    }

    public void setMarketPurchases(float marketPurchases) {
        this.marketPurchases = marketPurchases;
    }

    public List<Wastes> getWastesList() {
        return wastesList;
    }

    public void setWastesList(List<Wastes> wastesList) {
        this.wastesList = wastesList;
    }

}
