package com.jdlink.domain.Produce;

import com.jdlink.domain.ApplyState;
import com.jdlink.domain.FormType;
import com.jdlink.domain.Page;

public class SampleInformationItem {
    /**
     * ID
     */
    private String id;
    /**
     * 预约单号
     */
    private String sampleId;
    /**
     * 转移联单号
     */
    private String transferId;
    /**
     * 状态
     */
    private ApplyState applyState;
    /**
     * 危废名称
     */
    private String name;
    /**
     * 危废类别（HW01）
     */
    private String category;
    /**
     * 危废类别(8位)
     */
    private String code;
    /**
     * 危废形态
     */
    private FormType formType;
    /**
     * 产废单位
     */
    private String companyName;
    /**
     * 送样人
     */
    private String sendingPerson;
    /**
     * 化验室签收人
     */
    private String laboratorySigner;
    /**
     * 关键字
     */
    private String keywords;
    /**
     * 分页
     */
    private Page page;

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

    private boolean isHotMelt;   // 热融试验

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

    public boolean getIsHotMelt() {
        return isHotMelt;
    }

    public void setIsHotMelt(boolean HotMelt) {
        isHotMelt = HotMelt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSampleId() {
        return sampleId;
    }

    public void setSampleId(String sampleId) {
        this.sampleId = sampleId;
    }

    public String getTransferId() {
        return transferId;
    }

    public void setTransferId(String transferId) {
        this.transferId = transferId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getSendingPerson() {
        return sendingPerson;
    }

    public void setSendingPerson(String sendingPerson) {
        this.sendingPerson = sendingPerson;
    }

    public String getLaboratorySigner() {
        return laboratorySigner;
    }

    public void setLaboratorySigner(String laboratorySigner) {
        this.laboratorySigner = laboratorySigner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ApplyState getApplyState() {
        return applyState;
    }

    public void setApplyState(ApplyState applyState) {
        this.applyState = applyState;
    }
}
