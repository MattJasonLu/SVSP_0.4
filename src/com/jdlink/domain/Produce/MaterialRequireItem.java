package com.jdlink.domain.Produce;

import com.jdlink.domain.Dictionary.FormTypeItem;
import com.jdlink.domain.Dictionary.HandleCategoryItem;
import com.jdlink.domain.Dictionary.PackageTypeItem;
import com.jdlink.domain.FormType;
import com.jdlink.domain.PackageType;
import com.jdlink.domain.Page;

/**
 * 物料需求单明细 字表
 */
public class MaterialRequireItem {

    /**
     * 物料需求单编号
     */
    private String materialRequireId;

    //进料方式
    private HandleCategory handleCategory;

    //形态
    private FormType formType;

    //包装方式
   private PackageType packageType;

    /**
     * 周生产计划量
     */
    private float weeklyDemand;

    //周生产计划量开始
    private float weeklyDemandBeg;

    //周生产计划量结束
    private float weeklyDemandEnd;

    /**
     * 目前库存量
     */
    private  float currentInventory;

    //目前库存量开始
    private  float currentInventoryBeg;

    //目前库存量结束
    private  float currentInventoryEnd;
    /**
     * 安全库存量
     */
    private float safety;

    //安全库存量开始
    private float safetyBeg;

    //安全库存量结束
    private float safetyEnd;


    /**
     * 市场采购量
     */
    private float marketPurchases;

    //市场采购量开始
    private float marketPurchasesBeg;

    //市场采购量结束
    private float marketPurchasesEnd;

    //热值Max
    private float calorificMax;

    //热值最小
    private float calorificMin;

    //灰分最大
    private float ashMax;

    //灰分最小
    private float ashMin;

    //水分最大
    private float waterMax;

    //水分最小
    private  float waterMin;

    //氯最大
    private  float clMax;

    //氯最小
    private  float clMin;

    //硫最大
    private  float sMax;

    //硫最小
    private  float sMin;

    //磷最大
    private  float pMax;

    //磷最小
    private float pMin;

    //氟最大
    private float fMax;

    //氟最小
    private float fMin;

    //ph最大
    private float phMax;

    //ph最小
    private  float phMin;

    private String id;

    //分页
    private Page page;

    //进料方式数据字典
    private HandleCategoryItem handleCategoryItem;


    //物质形态数据字典
    private FormTypeItem formTypeItem;


    //包装方式数据字典
    private PackageTypeItem packageTypeItem;


    public HandleCategoryItem getHandleCategoryItem() {
        return handleCategoryItem;
    }

    public void setHandleCategoryItem(HandleCategoryItem handleCategoryItem) {
        this.handleCategoryItem = handleCategoryItem;
    }

    public FormTypeItem getFormTypeItem() {
        return formTypeItem;
    }

    public void setFormTypeItem(FormTypeItem formTypeItem) {
        this.formTypeItem = formTypeItem;
    }

    public PackageTypeItem getPackageTypeItem() {
        return packageTypeItem;
    }

    public void setPackageTypeItem(PackageTypeItem packageTypeItem) {
        this.packageTypeItem = packageTypeItem;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public float getWeeklyDemandBeg() {
        return weeklyDemandBeg;
    }

    public void setWeeklyDemandBeg(float weeklyDemandBeg) {
        this.weeklyDemandBeg = weeklyDemandBeg;
    }

    public float getWeeklyDemandEnd() {
        return weeklyDemandEnd;
    }

    public void setWeeklyDemandEnd(float weeklyDemandEnd) {
        this.weeklyDemandEnd = weeklyDemandEnd;
    }

    public float getCurrentInventoryBeg() {
        return currentInventoryBeg;
    }

    public void setCurrentInventoryBeg(float currentInventoryBeg) {
        this.currentInventoryBeg = currentInventoryBeg;
    }

    public float getCurrentInventoryEnd() {
        return currentInventoryEnd;
    }

    public void setCurrentInventoryEnd(float currentInventoryEnd) {
        this.currentInventoryEnd = currentInventoryEnd;
    }

    public float getSafetyBeg() {
        return safetyBeg;
    }

    public void setSafetyBeg(float safetyBeg) {
        this.safetyBeg = safetyBeg;
    }

    public float getSafetyEnd() {
        return safetyEnd;
    }

    public void setSafetyEnd(float safetyEnd) {
        this.safetyEnd = safetyEnd;
    }

    public float getMarketPurchasesBeg() {
        return marketPurchasesBeg;
    }

    public void setMarketPurchasesBeg(float marketPurchasesBeg) {
        this.marketPurchasesBeg = marketPurchasesBeg;
    }

    public float getMarketPurchasesEnd() {
        return marketPurchasesEnd;
    }

    public void setMarketPurchasesEnd(float marketPurchasesEnd) {
        this.marketPurchasesEnd = marketPurchasesEnd;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public PackageType getPackageType() {
        return packageType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    public float getWeeklyDemand() {
        return weeklyDemand;
    }

    public void setWeeklyDemand(float weeklyDemand) {
        this.weeklyDemand = weeklyDemand;
    }

    public float getCurrentInventory() {
        return currentInventory;
    }

    public void setCurrentInventory(float currentInventory) {
        this.currentInventory = currentInventory;
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

    public float getCalorificMax() {
        return calorificMax;
    }

    public void setCalorificMax(float calorificMax) {
        this.calorificMax = calorificMax;
    }

    public float getCalorificMin() {
        return calorificMin;
    }

    public void setCalorificMin(float calorificMin) {
        this.calorificMin = calorificMin;
    }

    public float getAshMax() {
        return ashMax;
    }

    public void setAshMax(float ashMax) {
        this.ashMax = ashMax;
    }

    public float getAshMin() {
        return ashMin;
    }

    public void setAshMin(float ashMin) {
        this.ashMin = ashMin;
    }

    public float getWaterMax() {
        return waterMax;
    }

    public void setWaterMax(float waterMax) {
        this.waterMax = waterMax;
    }

    public float getWaterMin() {
        return waterMin;
    }

    public void setWaterMin(float waterMin) {
        this.waterMin = waterMin;
    }

    public float getClMax() {
        return clMax;
    }

    public void setClMax(float clMax) {
        this.clMax = clMax;
    }

    public float getClMin() {
        return clMin;
    }

    public void setClMin(float clMin) {
        this.clMin = clMin;
    }

    public float getsMax() {
        return sMax;
    }

    public void setsMax(float sMax) {
        this.sMax = sMax;
    }

    public float getsMin() {
        return sMin;
    }

    public void setsMin(float sMin) {
        this.sMin = sMin;
    }

    public float getpMax() {
        return pMax;
    }

    public void setpMax(float pMax) {
        this.pMax = pMax;
    }

    public float getpMin() {
        return pMin;
    }

    public void setpMin(float pMin) {
        this.pMin = pMin;
    }

    public float getfMax() {
        return fMax;
    }

    public void setfMax(float fMax) {
        this.fMax = fMax;
    }

    public float getfMin() {
        return fMin;
    }

    public void setfMin(float fMin) {
        this.fMin = fMin;
    }

    public float getPhMax() {
        return phMax;
    }

    public void setPhMax(float phMax) {
        this.phMax = phMax;
    }

    public float getPhMin() {
        return phMin;
    }

    public void setPhMin(float phMin) {
        this.phMin = phMin;
    }

    @Override
    public String toString() {
        return "MaterialRequireItem{" +
                "materialRequireId='" + materialRequireId + '\'' +
                ", handleCategory=" + handleCategory +
                ", formType=" + formType +
                ", packageType=" + packageType +
                ", weeklyDemand=" + weeklyDemand +
                ", currentInventory=" + currentInventory +
                ", safety=" + safety +
                ", marketPurchases=" + marketPurchases +
                ", calorificMax=" + calorificMax +
                ", calorificMin=" + calorificMin +
                ", ashMax=" + ashMax +
                ", ashMin=" + ashMin +
                ", waterMax=" + waterMax +
                ", waterMin=" + waterMin +
                ", clMax=" + clMax +
                ", clMin=" + clMin +
                ", sMax=" + sMax +
                ", sMin=" + sMin +
                ", pMax=" + pMax +
                ", pMin=" + pMin +
                ", fMax=" + fMax +
                ", fMin=" + fMin +
                ", phMax=" + phMax +
                ", phMin=" + phMin +
                '}';
    }
}
