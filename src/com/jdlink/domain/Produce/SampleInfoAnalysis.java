package com.jdlink.domain.Produce;

import com.jdlink.domain.Client;
import com.jdlink.domain.FormType;
import com.jdlink.domain.Page;

/**
 * 仓储部化验单
 */
public class SampleInfoAnalysis {
    /**
     * 编号
     */
    private String id;
    /**
     * 联单编号
     */
    private String transferDraftId;
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
     * 物质形态
     */
    private FormType formType;
    /**
     * PH
     */
    private float PH;
    /**
     * 灰分
     */
    private float ash;
    /**
     * 水分
     */
    private float water;
    /**
     * 热值
     */
    private float heat;
    /**
     * 硫
     */
    private float sulfur;
    /**
     * 氯
     */
    private float chlorine;
    /**
     * 氟
     */
    private float fluorine;
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
     * 签收人
     */
    private String signer;
    /**
     * 备注
     */
    private String remark;
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

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public float getPH() {
        return PH;
    }

    public void setPH(float PH) {
        this.PH = PH;
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

    public float getHeat() {
        return heat;
    }

    public void setHeat(float heat) {
        this.heat = heat;
    }

    public float getSulfur() {
        return sulfur;
    }

    public void setSulfur(float sulfur) {
        this.sulfur = sulfur;
    }

    public float getChlorine() {
        return chlorine;
    }

    public void setChlorine(float chlorine) {
        this.chlorine = chlorine;
    }

    public float getFluorine() {
        return fluorine;
    }

    public void setFluorine(float fluorine) {
        this.fluorine = fluorine;
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

    public String getSigner() {
        return signer;
    }

    public void setSigner(String signer) {
        this.signer = signer;
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
}
