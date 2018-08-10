package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.FormType;
import com.jdlink.domain.Wastes;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    //配伍编号
    //审批内容
    private String approvalContent;
    //驳回内容
    private String backContent;
    //关键字
    private  String keyword;
//开始日期
    private  Date beginTime;
    //结束日期
    private  Date endTime;
//当前时间
    private  Date nowTime;
//危废信息
    private List<Wastes> wastesList=new ArrayList<>();

    public List<Wastes> getWastesList() {
        return wastesList;
    }

    public void setWastesList(List<Wastes> wastesList) {
        this.wastesList = wastesList;
    }

    public Date getNowTime() {
        return nowTime;
    }

    public void setNowTime(Date nowTime) {
        this.nowTime = nowTime;
    }

    public Date getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(Date beginTime) {
        this.beginTime = beginTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getApprovalContent() {
        return approvalContent;
    }

    public void setApprovalContent(String approvalContent) {
        this.approvalContent = approvalContent;
    }

    public String getBackContent() {
        return backContent;
    }

    public void setBackContent(String backContent) {
        this.backContent = backContent;
    }

    public String getCompatibilityId() {
        return compatibilityId;
    }

    public void setCompatibilityId(String compatibilityId) {
        this.compatibilityId = compatibilityId;
    }

    private String compatibilityId;
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
