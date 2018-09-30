package com.jdlink.domain.Produce;

import com.jdlink.domain.FormType;

/**
 * 配伍周计划明细
 */
public class CompatibilityItem {
    //主表用来取主键

     private String compatibilityId;

    //处置类别
    private HandleCategory handleCategory;

    //形态
    private FormType formType;

    //比例
    private float proportion;

    //每日配比量
    private float dailyRatio;

    //周需求总量
    private  float weeklyDemandTotal;

    //热值
    private float calorific;

    //灰分
    private float  ash;

    //水分
    private float water;

    //氯
    private float cl;

    //硫
    private float s;

    //磷
    private float p;

    //氟
    private float f;

    //酸碱度

    private float ph;

    public String getCompatibilityId() {
        return compatibilityId;
    }

    public void setCompatibilityId(String compatibilityId) {
        this.compatibilityId = compatibilityId;
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

    public float getProportion() {
        return proportion;
    }

    public void setProportion(float proportion) {
        this.proportion = proportion;
    }

    public float getDailyRatio() {
        return dailyRatio;
    }

    public void setDailyRatio(float dailyRatio) {
        this.dailyRatio = dailyRatio;
    }

    public float getWeeklyDemandTotal() {
        return weeklyDemandTotal;
    }

    public void setWeeklyDemandTotal(float weeklyDemandTotal) {
        this.weeklyDemandTotal = weeklyDemandTotal;
    }

    public float getCalorific() {
        return calorific;
    }

    public void setCalorific(float calorific) {
        this.calorific = calorific;
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

    public float getCl() {
        return cl;
    }

    public void setCl(float cl) {
        this.cl = cl;
    }

    public float getS() {
        return s;
    }

    public void setS(float s) {
        this.s = s;
    }

    public float getP() {
        return p;
    }

    public void setP(float p) {
        this.p = p;
    }

    public float getF() {
        return f;
    }

    public void setF(float f) {
        this.f = f;
    }

    public float getPh() {
        return ph;
    }

    public void setPh(float ph) {
        this.ph = ph;
    }

    @Override
    public String toString() {
        return "CompatibilityItem{" +
                "compatibilityId=" + compatibilityId +
                ", handleCategory=" + handleCategory +
                ", formType=" + formType +
                ", proportion=" + proportion +
                ", dailyRatio=" + dailyRatio +
                ", weeklyDemandTotal=" + weeklyDemandTotal +
                ", calorific=" + calorific +
                ", ash=" + ash +
                ", water=" + water +
                ", cl=" + cl +
                ", s=" + s +
                ", p=" + p +
                ", f=" + f +
                ", ph=" + ph +
                '}';
    }
}
