package com.jdlink.domain.Produce;

import com.jdlink.domain.ApplyState;
import com.jdlink.domain.CheckState;

import java.util.Date;

public class SampleInformation {
    /**
     * 公司代码
     */
    private String companyCode;
    /**
     * 危废代码
     */
    private String wastesCode;
    /**
     * 化验室签收人
     */
    private String laboratorySigner;
    /**
     * 样品预约状态
     */
    private ApplyState applyState;

    private String wastesName;

    private Date samplingDate;

    private String samplingNumber;

    private boolean isProductionLine;

    private boolean isStorageArea;

    private boolean isPH; // PH值

    private boolean isAsh;  // 灰分

    private boolean isWater;  // 水分

    private boolean isHeat;   // 热值

    private boolean isSulfur;  // 硫

    private boolean isChlorine;  // 氯

    private boolean isFluorine;  // 氟

    private boolean isPhosphorus;  // 磷

    private boolean isFlashPoint;  // 闪点

    private boolean isViscosity;  // 粘度

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

    public boolean isProductionLine() {
        return isProductionLine;
    }

    public void setProductionLine(boolean productionLine) {
        isProductionLine = productionLine;
    }

    public boolean isStorageArea() {
        return isStorageArea;
    }

    public void setStorageArea(boolean storageArea) {
        isStorageArea = storageArea;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public String getLaboratorySigner() {
        return laboratorySigner;
    }

    public void setLaboratorySigner(String laboratorySigner) {
        this.laboratorySigner = laboratorySigner;
    }

    public ApplyState getApplyState() { return applyState;
    }

    public void setApplyState(ApplyState applyState) { this.applyState = applyState;
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

    @Override
    public String toString() {
        return "SampleInformation{" +
                "companyCode='" + companyCode + '\'' +
                ", wastesCode='" + wastesCode + '\'' +
                ", laboratorySigner='" + laboratorySigner + '\'' +
                ", applyState=" + applyState +
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
