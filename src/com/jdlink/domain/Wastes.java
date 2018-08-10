package com.jdlink.domain;

import com.jdlink.domain.Produce.ProcessWay;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    /**
     * 废物数量
     */
    private double wasteAmount;
    /**
     * 单个危废合计
     */
    private Float wastesTotal;
    /**
     * 运费
     */
    private Float freight;
    /**
     * 重量
     */
    private float weight;
    /**
     * 计量单位
     */
    private String unit;
    /**
     * 处理方式
     */
    private ProcessWay processWay;

    private boolean isPH; // PH值

    private boolean isAsh;  // 灰分

    private boolean isWater;  // 水分

    private boolean isHeat;   // 热值

    private boolean isSulfur;  // 硫

    private boolean isChlorine;  // 氯

    private boolean isFluorine;  // 氟

    private boolean isPhosphorus;  // 磷

    private boolean isFlashPoint;  // 闪点

    private boolean isViscosity;  // 黏度

    /**
     * 取样日期
     */
    private Date samplingDate;
    /**
     * 取样号
     */
    private String samplingNumber;
    /**
     * 参数列表
     */
    private List<MixingElement> parameterList = new ArrayList<>();
    /**
     * 重金属列表
     */
    private  List<MixingElement> heavyMetalList = new ArrayList<>();

    /**
     * 生产线上取样
     */
    private boolean isProductionLine;
    /**
     * 储存区取样
     */
    private boolean isStorageArea;
    /**
     * 检测日期
     */
    private Date testDate;


    public Float getWastesTotal() {
        return wastesTotal;
    }

    public void setWastesTotal(Float wastesTotal) {
        this.wastesTotal = wastesTotal;
    }

    public Float getFreight() {
        return freight;
    }

    public void setFreight(Float freight) {
        this.freight = freight;
    }

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

    public boolean getIsPH() {
        return isPH;
    }

    public void setIsPH(boolean PH) {
        isPH = PH;
    }

    public boolean getIsAsh() {
        return isAsh;
    }

    public void setIsAsh(boolean ash) {
        isAsh = ash;
    }

    public boolean getIsWater() {
        return isWater;
    }

    public void setIsWater(boolean water) {
        isWater = water;
    }

    public boolean getIsHeat() {
        return isHeat;
    }

    public void setIsHeat(boolean heat) {
        isHeat = heat;
    }

    public boolean getIsSulfur() {
        return isSulfur;
    }

    public void setIsSulfur(boolean sulfur) {
        isSulfur = sulfur;
    }

    public boolean getIsChlorine() {
        return isChlorine;
    }

    public void setIsChlorine(boolean chlorine) {
        isChlorine = chlorine;
    }

    public boolean getIsFluorine() {
        return isFluorine;
    }

    public void setIsFluorine(boolean fluorine) {
        isFluorine = fluorine;
    }

    public boolean getIsPhosphorus() {
        return isPhosphorus;
    }

    public void setIsPhosphorus(boolean phosphorus) {
        isPhosphorus = phosphorus;
    }

    public boolean getIsFlashPoint() {
        return isFlashPoint;
    }

    public void setIsFlashPoint(boolean flashPoint) {
        isFlashPoint = flashPoint;
    }

    public boolean getIsViscosity() {
        return isViscosity;
    }

    public void setIsViscosity(boolean viscosity) {
        isViscosity = viscosity;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public ProcessWay getProcessWay() {
        return processWay;
    }

    public void setProcessWay(ProcessWay processWay) {
        this.processWay = processWay;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Date getSamplingDate() {
        return samplingDate;
    }

    public void setSamplingDate(Date samplingDate) {
        this.samplingDate = samplingDate;
    }

    public String getSamplingNumber() {
        return samplingNumber;
    }

    public void setSamplingNumber(String samplingNumber) {
        this.samplingNumber = samplingNumber;
    }

    public List<MixingElement> getParameterList() {
        return parameterList;
    }

    public void setParameterList(List<MixingElement> parameterList) {
        this.parameterList = parameterList;
    }

    public List<MixingElement> getHeavyMetalList() {
        return heavyMetalList;
    }

    public void setHeavyMetalList(List<MixingElement> heavyMetalList) {
        this.heavyMetalList = heavyMetalList;
    }

    public boolean getIsProductionLine() {
        return isProductionLine;
    }

    public void setIsProductionLine(boolean productionLine) {
        isProductionLine = productionLine;
    }

    public boolean getIsStorageArea() {
        return isStorageArea;
    }

    public void setIsStorageArea(boolean storageArea) {
        isStorageArea = storageArea;
    }

    public Date getTestDate() {
        return testDate;
    }

    public void setTestDate(Date testDate) {
        this.testDate = testDate;
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
                ", component='" + component + '\'' +
                ", remarks='" + remarks + '\'' +
                ", stockId='" + stockId + '\'' +
                ", code='" + code + '\'' +
                ", prepareTransferCount=" + prepareTransferCount +
                ", transferCount=" + transferCount +
                ", signCount=" + signCount +
                ", wastesCharacter='" + wastesCharacter + '\'' +
                ", category='" + category + '\'' +
                ", wasteAmount=" + wasteAmount +
                ", wastesTotal=" + wastesTotal +
                ", freight=" + freight +
                ", weight=" + weight +
                ", unit='" + unit + '\'' +
                ", processWay=" + processWay +
                ", isPH=" + isPH +
                ", isAsh=" + isAsh +
                ", isWater=" + isWater +
                ", isHeat=" + isHeat +
                ", isSulfur=" + isSulfur +
                ", isChlorine=" + isChlorine +
                ", isFluorine=" + isFluorine +
                ", isPhosphorus=" + isPhosphorus +
                ", isFlashPoint=" + isFlashPoint +
                ", isViscosity=" + isViscosity +
                '}';
    }
}
