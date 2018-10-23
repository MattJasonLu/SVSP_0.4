package com.jdlink.domain;

import com.jdlink.domain.Produce.HandleCategory;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/9/3.
 * DoubleClickTo 666
 */
public class QuotationItem {
    /**
     * 条目编号
     */
    private int quotationItemId;
    /**
     * 签订客户
     */
    private Client client;
    /**
     * 开始日期
     */
    private Date startDate;
    /**
     * 结束日期
     */
    private Date endDate;
    /**
     * 状态
     */
    private FormType formType;
    /**
     * 危废名称
     */
    private String wastesName;
    /**
     * 危废编码
     */
    private String wastesCode;
    /**
     * 合约量
     */
    private float contractAmount;
    /**
     * 含税单价
     */
    private float unitPriceTax;
    /**
     * 去税单价
     */
    private float unitPrice;
    /**
     * 处置金额
     */
    private float totalPrice;
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
    private float ash;
    /**
     * 水分
     */
    private float waterContent;
    /**
     * 热值
     */
    private float heat;
    /**
     * 卤素
     */
    private float halogenContent;
    /**
     * 硫
     */
    private float sulfurContent;
    /**
     * 氯
     */
    private float chlorineContent;
    /**
     * 磷
     */
    private float phosphorusContent;
    /**
     * 氟
     */
    private float fluorineContent;
    /**
     * 闪点
     */
    private float flashPoint;

    /**
     * 包装类型
     */
    private PackageType packageType;

    /**
     * 运输单位
     * @return
     */
    private TransportType transport;
    /**
     * 计量单位
     */
    private Unit util;
    /**
     *
     * @return
     */
    private String contractId;

    /**
     * 供应商作为绑定
     * @return
     */
    private Supplier supplier;

    //编号 更新用
    private int t_quotationitem;

    //进料方式1
    private HandleCategory handleCategory;

    //包装方式多选
    private String packageTypeList;

    public String getPackageTypeList() {
        return packageTypeList;
    }

    public void setPackageTypeList(String packageTypeList) {
        this.packageTypeList = packageTypeList;
    }

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }

    public int getT_quotationitem() {
        return t_quotationitem;
    }

    public void setT_quotationitem(int t_quotationitem) {
        this.t_quotationitem = t_quotationitem;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Unit getUtil() {
        return util;
    }

    public void setUtil(Unit util) {
        this.util = util;
    }

    public PackageType getPackageType() {
        return packageType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    public TransportType getTransport() {
        return transport;
    }

    public void setTransport(TransportType transport) {
        this.transport = transport;
    }

    public int getQuotationItemId() {
        return quotationItemId;
    }

    public void setQuotationItemId(int quotationItemId) {
        this.quotationItemId = quotationItemId;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

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

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }

    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public float getContractAmount() {
        return contractAmount;
    }

    public void setContractAmount(float contractAmount) {
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

    public float getAsh() {
        return ash;
    }

    public void setAsh(float ash) {
        this.ash = ash;
    }

    public float getWaterContent() {
        return waterContent;
    }

    public void setWaterContent(float waterContent) {
        this.waterContent = waterContent;
    }

    public float getHeat() {
        return heat;
    }

    public void setHeat(float heat) {
        this.heat = heat;
    }

    public float getHalogenContent() {
        return halogenContent;
    }

    public void setHalogenContent(float halogenContent) {
        this.halogenContent = halogenContent;
    }

    public float getSulfurContent() {
        return sulfurContent;
    }

    public void setSulfurContent(float sulfurContent) {
        this.sulfurContent = sulfurContent;
    }

    public float getChlorineContent() {
        return chlorineContent;
    }

    public void setChlorineContent(float chlorineContent) {
        this.chlorineContent = chlorineContent;
    }

    public float getPhosphorusContent() {
        return phosphorusContent;
    }

    public void setPhosphorusContent(float phosphorusContent) {
        this.phosphorusContent = phosphorusContent;
    }

    public float getFluorineContent() {
        return fluorineContent;
    }

    public void setFluorineContent(float fluorineContent) {
        this.fluorineContent = fluorineContent;
    }

    public float getFlashPoint() {
        return flashPoint;
    }

    public void setFlashPoint(float flashPoint) {
        this.flashPoint = flashPoint;
    }

    @Override
    public String toString() {
        return "QuotationItem{" +
                "quotationItemId=" + quotationItemId +
                ", client=" + client +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", formType=" + formType +
                ", wastesName='" + wastesName + '\'' +
                ", wastesCode='" + wastesCode + '\'' +
                ", contractAmount=" + contractAmount +
                ", unitPriceTax=" + unitPriceTax +
                ", unitPrice=" + unitPrice +
                ", taxRate=" + taxRate +
                ", tax=" + tax +
                ", ph=" + ph +
                ", ash=" + ash +
                ", waterContent=" + waterContent +
                ", heat=" + heat +
                ", halogenContent=" + halogenContent +
                ", sulfurContent=" + sulfurContent +
                ", chlorineContent=" + chlorineContent +
                ", phosphorusContent=" + phosphorusContent +
                ", fluorineContent=" + fluorineContent +
                ", flashPoint=" + flashPoint +
                '}';
    }
}
