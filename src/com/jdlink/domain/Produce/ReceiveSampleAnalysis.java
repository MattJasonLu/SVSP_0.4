package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.FormType;
import com.jdlink.domain.Page;

import java.util.Date;

/**
 * 市场部化验单
 */
public class ReceiveSampleAnalysis {
    /**
     * 编号
     */
    private String id;
    /**
     * 联单编号
     */
    private String transferDraftId;
    /**
     * 送样单编号
     */
    private String sampleId;
    /**
     * 完成日期
     */
    private Date finishDate;
    /**
     * 产废单位
     */
    private Client produceCompany;
    /**
     * 危废名称
     */
    private String wastesName;
    /**
     * 危废代码
     */
    private String wastesCode;
    /**
     * 危废类别
     */
    private String wastesCategory;
    /**
     * 进料方式
     */
    private HandleCategory handleCategory;
    /**
     * 物质形态
     */
    private FormType formType;
    /**
     * 送样人
     */
    private String sender;
    /**
     * PH
     */
    private float PH;
    /**
     * 热值
     */
    private float heat;
    /**
     * 灰分
     */
    private float ash;
    /**
     * 水分
     */
    private float water;
    /**
     * 氟
     */
    private float fluorine;
    /**
     * 氯
     */
    private float chlorine;
    /**
     * 硫
     */
    private float sulfur;
    /**
     * 磷
     */
    private float phosphorus;
    /**
     * 闪点
     */
    private float flashPoint;
    /**
     * 粘度
     */
    private float viscosity;
    /**
     * 热熔试验
     */
    private String hotMelt;
    /**
     * 备注
     */
    private String remark;
    /**
     * 校验状态
     */
    private CheckState checkState;
    /**
     * 分页
     */
    private Page page;
    /**
     * 关键字
     */
    private String keyword;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTransferDraftId() {
        return transferDraftId;
    }

    public void setTransferDraftId(String transferDraftId) {
        this.transferDraftId = transferDraftId;
    }

    public String getSampleId() {
        return sampleId;
    }

    public void setSampleId(String sampleId) {
        this.sampleId = sampleId;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
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

    public String getWastesCategory() {
        return wastesCategory;
    }

    public void setWastesCategory(String wastesCategory) {
        this.wastesCategory = wastesCategory;
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

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public float getPH() {
        return PH;
    }

    public void setPH(float PH) {
        this.PH = PH;
    }

    public float getHeat() {
        return heat;
    }

    public void setHeat(float heat) {
        this.heat = heat;
    }

    public float getAsh() {
        return ash;
    }

    public void setAsh(float ash) {
        this.ash = ash;
    }

    public float getWater() {
        return water;
    }

    public void setWater(float water) {
        this.water = water;
    }

    public float getFluorine() {
        return fluorine;
    }

    public void setFluorine(float fluorine) {
        this.fluorine = fluorine;
    }

    public float getChlorine() {
        return chlorine;
    }

    public void setChlorine(float chlorine) {
        this.chlorine = chlorine;
    }

    public float getSulfur() {
        return sulfur;
    }

    public void setSulfur(float sulfur) {
        this.sulfur = sulfur;
    }

    public float getPhosphorus() {
        return phosphorus;
    }

    public void setPhosphorus(float phosphorus) {
        this.phosphorus = phosphorus;
    }

    public float getFlashPoint() {
        return flashPoint;
    }

    public void setFlashPoint(float flashPoint) {
        this.flashPoint = flashPoint;
    }

    public float getViscosity() {
        return viscosity;
    }

    public void setViscosity(float viscosity) {
        this.viscosity = viscosity;
    }

    public String getHotMelt() {
        return hotMelt;
    }

    public void setHotMelt(String hotMelt) {
        this.hotMelt = hotMelt;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
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

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }
}
