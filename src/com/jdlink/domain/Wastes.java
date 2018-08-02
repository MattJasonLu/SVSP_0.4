package com.jdlink.domain;

/**
 * Created by matt on 2018/7/4.
 * 危废信息
 */
public class Wastes {

    private String id;
    /**
     * 危废名称
     */
    private String name;
    /**
     * 状态
     */
    private FormType formType;
    /**
     * 包装方式
     */
    private PackageType packageType;
    /**
     * 危废编码
     */
    private String wastesId;
    /**
     * 合约量
     */
    private int contractAmount;
    /**
     * 含税单价
     */
    private float unitPriceTax;
    /**
     * 去税单价
     */
    private float unitPrice;
    /**
     * 税率
     */
    private float taxRate;
    /**
     * 税额
     */
    private float tax;
    /**
     * ph值
     */
    private float ph;
    /**
     * 灰分
     */
    private float ashPercentage;
    /**
     * 水分
     */
    private float wetPercentage;
    /**
     * 热值
     */
    private float calorific;
    /**
     * 卤素
     */
    private float halogenPercentage;
    /**
     * 硫
     */
    private float sulfurPercentage;
    /**
     * 闪点
     */
    private float flashPoint;
    /**
     * 废物数量
     */
    private double wasteAmount;
    /**
     * 废物成分
     */
    private String component;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 和库存申报表存在一对多联系
     */
    private String stockId;
    /**
     * 危废类别(8位)
     */
    private String code;
    /**
     * 拟转移量
     */
    private float prepareTransferCount;
    /**
     * 转移量
     */
    private float transferCount;
    /**
     * 签收量
     */
    private float signCount;
    /**
     * 危废特性
     */
    private String wastesCharacter;
    /**
     * 类别
     */
    private String category;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getWastesId() {
        return wastesId;
    }

    public void setWastesId(String wastesId) {
        this.wastesId = wastesId;
    }

    public int getContractAmount() {
        return contractAmount;
    }

    public void setContractAmount(int contractAmount) {
        this.contractAmount = contractAmount;
    }

    public float getUnitPriceTax() {
        return unitPriceTax;
    }

    public void setUnitPriceTax(float unitPriceTax) {
        this.unitPriceTax = unitPriceTax;
    }

    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public float getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(float taxRate) {
        this.taxRate = taxRate;
    }

    public float getTax() {
        return tax;
    }

    public void setTax(float tax) {
        this.tax = tax;
    }

    public float getPh() {
        return ph;
    }

    public void setPh(float ph) {
        this.ph = ph;
    }

    public float getAshPercentage() {
        return ashPercentage;
    }

    public void setAshPercentage(float ashPercentage) {
        this.ashPercentage = ashPercentage;
    }

    public float getWetPercentage() {
        return wetPercentage;
    }

    public void setWetPercentage(float wetPercentage) {
        this.wetPercentage = wetPercentage;
    }

    public float getCalorific() {
        return calorific;
    }

    public void setCalorific(float calorific) {
        this.calorific = calorific;
    }

    public float getHalogenPercentage() {
        return halogenPercentage;
    }

    public void setHalogenPercentage(float halogenPercentage) {
        this.halogenPercentage = halogenPercentage;
    }

    public float getSulfurPercentage() {
        return sulfurPercentage;
    }

    public void setSulfurPercentage(float sulfurPercentage) {
        this.sulfurPercentage = sulfurPercentage;
    }

    public float getFlashPoint() {
        return flashPoint;
    }

    public void setFlashPoint(float flashPoint) {
        this.flashPoint = flashPoint;
    }

    public double getWasteAmount() {
        return wasteAmount;
    }

    public void setWasteAmount(double wasteAmount) {
        this.wasteAmount = wasteAmount;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public float getPrepareTransferCount() {
        return prepareTransferCount;
    }

    public void setPrepareTransferCount(float prepareTransferCount) {
        this.prepareTransferCount = prepareTransferCount;
    }

    public float getTransferCount() {
        return transferCount;
    }

    public void setTransferCount(float transferCount) {
        this.transferCount = transferCount;
    }

    public float getSignCount() {
        return signCount;
    }

    public void setSignCount(float signCount) {
        this.signCount = signCount;
    }

    public String getWastesCharacter() {
        return wastesCharacter;
    }

    public void setWastesCharacter(String wastesCharacter) {
        this.wastesCharacter = wastesCharacter;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Wastes{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", formType=" + formType +
                ", packageType=" + packageType +
                ", wastesId='" + wastesId + '\'' +
                ", contractAmount=" + contractAmount +
                ", unitPriceTax=" + unitPriceTax +
                ", unitPrice=" + unitPrice +
                ", taxRate=" + taxRate +
                ", tax=" + tax +
                ", ph=" + ph +
                ", ashPercentage=" + ashPercentage +
                ", wetPercentage=" + wetPercentage +
                ", calorific=" + calorific +
                ", halogenPercentage=" + halogenPercentage +
                ", sulfurPercentage=" + sulfurPercentage +
                ", flashPoint=" + flashPoint +
                ", wasteAmount=" + wasteAmount +
                ", component='" + component + '\'' +
                ", remarks='" + remarks + '\'' +
                ", stockId='" + stockId + '\'' +
                ", code='" + code + '\'' +
                ", prepareTransferCount=" + prepareTransferCount +
                ", transferCount=" + transferCount +
                ", signCount=" + signCount +
                ", wastesCharacter='" + wastesCharacter + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
