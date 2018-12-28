package com.jdlink.domain.Produce;

import com.jdlink.domain.Client;
import com.jdlink.domain.Dictionary.FormTypeItem;
import com.jdlink.domain.Dictionary.HandleCategoryItem;
import com.jdlink.domain.Dictionary.PackageTypeItem;
import com.jdlink.domain.Dictionary.ProcessWayItem;
import com.jdlink.domain.FormType;
import com.jdlink.domain.PackageType;
import com.jdlink.domain.Wastes;

import java.util.Date;

/**
 * Created by matt on 2018/8/9.
 * DoubleClickTo 666
 * 运输计划条目
 */
public class TransportPlanItem {
    /**
     * 条目编号
     */
    private String id;
    /**
     * 产废单位
     */
    private Client produceCompany;
    /**
     * 处置类别
     */
    private HandleCategory handleCategory;
    /**
     * 处置类别
     */
    private HandleCategoryItem handleCategoryItem;
    /**
     * 入场时间
     */
    private Date approachTime;
    /**
     * 转移联单编号
     */
    private String transferDraftId;
//    /**
//     * 危废信息(不用)
//     */
//    private Wastes wastes;
    /**
     * 危废名称
     */
    private String wastesName;
    /**
     * 危废代码
     */
    private String wastesCode;
    /**
     * 危废数量
     */
    private float wastesAmount;
    /**
     * 计量单位
     */
    private String unit;
    /**
     * 物质形态
     */
    private FormType formType;
    /**
     * 物质形态数据字典
     */
    private FormTypeItem formTypeItem;
    /**
     * 包装类型
     */
    private PackageType packageType;
    /**
     * 包装类型数据字典
     */
    private PackageTypeItem packageTypeItem;
    /**
     * 热值
     */
    private float heat;
    /**
     * ph
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
     * 氯含量
     */
    private float chlorineContent;
    /**
     * 硫含量
     */
    private float sulfurContent;
    /**
     * 磷含量
     */
    private float phosphorusContent;
    /**
     * 氟含量
     */
    private float fluorineContent;
    /**
     * 处理方式
     */
    private ProcessWay processWay;
    /**
     * 处理方式数据字典
     */
    private ProcessWayItem processWayItem;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
    }

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }

    public Date getApproachTime() {
        return approachTime;
    }

    public void setApproachTime(Date approachTime) {
        this.approachTime = approachTime;
    }

    public String getTransferDraftId() {
        return transferDraftId;
    }

    public void setTransferDraftId(String transferDraftId) {
        this.transferDraftId = transferDraftId;
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

    public float getWastesAmount() {
        return wastesAmount;
    }

    public void setWastesAmount(float wastesAmount) {
        this.wastesAmount = wastesAmount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
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

    public float getHeat() {
        return heat;
    }

    public void setHeat(float heat) {
        this.heat = heat;
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

    public float getChlorineContent() {
        return chlorineContent;
    }

    public void setChlorineContent(float chlorineContent) {
        this.chlorineContent = chlorineContent;
    }

    public float getSulfurContent() {
        return sulfurContent;
    }

    public void setSulfurContent(float sulfurContent) {
        this.sulfurContent = sulfurContent;
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

    public ProcessWay getProcessWay() {
        return processWay;
    }

    public void setProcessWay(ProcessWay processWay) {
        this.processWay = processWay;
    }

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

    public ProcessWayItem getProcessWayItem() {
        return processWayItem;
    }

    public void setProcessWayItem(ProcessWayItem processWayItem) {
        this.processWayItem = processWayItem;
    }
}
