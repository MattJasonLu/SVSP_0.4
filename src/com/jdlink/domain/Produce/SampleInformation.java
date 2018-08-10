package com.jdlink.domain.Produce;

import com.jdlink.domain.ApplyState;
import com.jdlink.domain.Page;
import com.jdlink.domain.Wastes;

import java.util.Date;
import java.util.List;

public class SampleInformation {

    private String id;
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

    /**
     *查询关键字
     */
    private String keyword;

    /**
     * 危废名称
     */
    private String wastesName;

    /**
     * 取样日期
     */
    private Date samplingDate;
    /**
     * 危废列表
     */
    private  List<Wastes> wastesList;

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

    private Page page;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Wastes> getWastesList() {
        return wastesList;
    }

    public void setWastesList(List<Wastes> wastesList) {
        this.wastesList = wastesList;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
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

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Date getSamplingDate() {
        return samplingDate;
    }

    public void setSamplingDate(Date samplingDate) {
        this.samplingDate = samplingDate;
    }

    @Override
    public String toString() {
        return "SampleInformation{" +
                "id='" + id + '\'' +
                ", companyCode='" + companyCode + '\'' +
                ", wastesCode='" + wastesCode + '\'' +
                ", laboratorySigner='" + laboratorySigner + '\'' +
                ", applyState=" + applyState +
                ", keyword='" + keyword + '\'' +
                ", wastesName='" + wastesName + '\'' +
                ", wastesList=" + wastesList +
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
                ", page=" + page +
                '}';
    }
}
