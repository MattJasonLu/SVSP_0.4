package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.FormType;

public class Compatibility {
    //序号
    private String pwId;
    //处理类别
    private HandleCategory handleCategory;
    //形态
    private FormType formType;
    //比例
    private float proportion;
    //每日配比量
    private  float dailyProportions;
    //每周需求总量
    private float  weeklyDemand;
    //热值
    private float calorific;
    //灰分
    private float ash;
    //水分
    private float water;
    //氯
    private  float CL;
    //硫
    private  float S;
    //磷
    private  float P;
    //弗
    private  float F;
    //PH
    private  float PH;
    //每日配比量合计
    private  float dailyProportionsTotal;
    //周需求总量
    private float weeklyDemandTotal;
    //热值总量
    private float calorificTotal;
//审核状态
    private CheckState checkState;

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    @Override
    public String toString() {
        return "Compatibility{" +
                "pwId='" + pwId + '\'' +
                ", handleCategory=" + handleCategory +
                ", formType=" + formType +
                ", proportion=" + proportion +
                ", dailyProportions=" + dailyProportions +
                ", weeklyDemand=" + weeklyDemand +
                ", calorific=" + calorific +
                ", ash=" + ash +
                ", water=" + water +
                ", CL=" + CL +
                ", S=" + S +
                ", P=" + P +
                ", F=" + F +
                ", PH=" + PH +
                ", dailyProportionsTotal=" + dailyProportionsTotal +
                ", weeklyDemandTotal=" + weeklyDemandTotal +
                ", calorificTotal=" + calorificTotal +
                '}';
    }

    public String getPwId() {
        return pwId;
    }

    public void setPwId(String pwId) {
        this.pwId = pwId;
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

    public float getDailyProportions() {
        return dailyProportions;
    }

    public void setDailyProportions(float dailyProportions) {
        this.dailyProportions = dailyProportions;
    }

    public float getWeeklyDemand() {
        return weeklyDemand;
    }

    public void setWeeklyDemand(float weeklyDemand) {
        this.weeklyDemand = weeklyDemand;
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

    public float getCL() {
        return CL;
    }

    public void setCL(float CL) {
        this.CL = CL;
    }

    public float getS() {
        return S;
    }

    public void setS(float s) {
        S = s;
    }

    public float getP() {
        return P;
    }

    public void setP(float p) {
        P = p;
    }

    public float getF() {
        return F;
    }

    public void setF(float f) {
        F = f;
    }

    public float getPH() {
        return PH;
    }

    public void setPH(float PH) {
        this.PH = PH;
    }

    public float getDailyProportionsTotal() {
        return dailyProportionsTotal;
    }

    public void setDailyProportionsTotal(float dailyProportionsTotal) {
        this.dailyProportionsTotal = dailyProportionsTotal;
    }

    public float getWeeklyDemandTotal() {
        return weeklyDemandTotal;
    }

    public void setWeeklyDemandTotal(float weeklyDemandTotal) {
        this.weeklyDemandTotal = weeklyDemandTotal;
    }

    public float getCalorificTotal() {
        return calorificTotal;
    }

    public void setCalorificTotal(float calorificTotal) {
        this.calorificTotal = calorificTotal;
    }
}
