package com.jdlink.domain.Produce;

import com.jdlink.domain.ApplyState;
import com.jdlink.domain.FormType;
import com.jdlink.domain.Page;
import com.jdlink.domain.Wastes;

import java.util.Date;
import java.util.List;

/**
 * 送样登记单
 */
public class SampleInformation {
    /**
     * 送样登记单ID
     */
    private String id;
    /**
     * 入库计划单ID
     */
    private String inboundPlanOrderId;
    /**
     * 签收单ID
     */
    private String signOrderId;
    /**
     * 公司代码
     */
    private String companyCode;
    /**
     * 公司名称
     */
    private String companyName;
    /**
     * 送样人
     */
    private String sendingPerson;
    /**
     * 危废代码
     */
    private String wastesCode;
    /**
     * 危废形态
     */
    private FormType wastesFormType;
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
    private String keywords;
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
    /**
     * 创建日期
     */
    private Date creationDate;
    /**
     * 拒收理由
     */
    private String advice;

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

    private boolean isHotMelt;   // 热融试验

    private boolean isCOD;

    private boolean isBOD5;

    private boolean isO2;

    private boolean isLye;

    private  boolean isN2;

    /**
     * 分页
     */
    private Page page;
    /**
     * 新预约单号（送样登记修改用）/化验单单号
     */
    private String newId;

    public String getNewId() {
        return newId;
    }

    public void setNewId(String newId) {
        this.newId = newId;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public FormType getWastesFormType() {
        return wastesFormType;
    }

    public void setWastesFormType(FormType wastesFormType) {
        this.wastesFormType = wastesFormType;
    }

    public boolean getIsHotMelt() {
        return isHotMelt;
    }

    public void setIsHotMelt(boolean HotMelt) {
        isHotMelt = HotMelt;
    }

    public boolean getIsN2() {
        return isN2;
    }

    public void setIsN2(boolean N2) {
        isN2 = N2;
    }

    public boolean getIsCOD() {
        return isCOD;
    }

    public void setIsCOD(boolean COD) {
        isCOD = COD;
    }

    public boolean getIsBOD5() {
        return isBOD5;
    }

    public void setIsBOD5(boolean BOD5) {
        isBOD5 = BOD5;
    }

    public boolean getIsO2() {
        return isO2;
    }

    public void setIsO2(boolean O2) {
        isO2 = O2;
    }

    public boolean getIsLye() {
        return isLye;
    }

    public void setIsLye(boolean Lye) {
        isLye = Lye;
    }

    public String getInboundPlanOrderId() {
        return inboundPlanOrderId;
    }

    public void setInboundPlanOrderId(String inboundPlanOrderId) {
        this.inboundPlanOrderId = inboundPlanOrderId;
    }

    public String getSignOrderId() {
        return signOrderId;
    }

    public void setSignOrderId(String signOrderId) {
        this.signOrderId = signOrderId;
    }

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

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
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

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public Date getSamplingDate() {
        return samplingDate;
    }

    public void setSamplingDate(Date samplingDate) {
        this.samplingDate = samplingDate;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getSendingPerson() {
        return sendingPerson;
    }

    public void setSendingPerson(String sendingPerson) {
        this.sendingPerson = sendingPerson;
    }

    @Override
    public String toString() {
        return "SampleInformation{" +
                "id='" + id + '\'' +
                ", companyCode='" + companyCode + '\'' +
                ", wastesCode='" + wastesCode + '\'' +
                ", laboratorySigner='" + laboratorySigner + '\'' +
                ", applyState=" + applyState +
                ", keywords='" + keywords + '\'' +
                ", wastesName='" + wastesName + '\'' +
                ", samplingDate=" + samplingDate +
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
