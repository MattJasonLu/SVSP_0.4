package com.jdlink.domain.Produce;

import com.jdlink.domain.FormType;

import java.util.Date;

public class Threshold {
    //序号
    private String thresholdId;
    //处理类别
    private HandleCategory handleCategory;
    //物质形态
    private FormType formType;
    //热值最大值
    private  float calorificMax;
    //热值最小值
    private  float calorificMin;
    //灰分最大值
    private float ashMax;
    //灰分最小值
    private float ashMin;
    //水分最大值
    private float waterMax;
    //水分最小值
    private float waterMin;
    //硫最大值
    private  float sMax;
    //硫最小值
    private  float sMin;
    //氯最大值
    private  float clMax;
    //氯最小值
    private  float clMin;
    //磷最大值
    private  float pMax;
    //磷最小炮值
    private  float pMin;
    //弗最大值
    private float fMax;
    //弗最小值
    private float fMin;
    //PH最大值
    private  float phMax;
    //PH最小值
    private  float phMin;
    //安全库存量
    private float safety;
    //起始日期
    private Date beginTime;
    //结束日期
    private Date endTime;

    public float getpMax() {
        return pMax;
    }

    public void setpMax(float pMax) {
        this.pMax = pMax;
    }

    public float getWaterMax() {
        return waterMax;
    }

    public void setWaterMax(float waterMax) {
        this.waterMax = waterMax;
    }

    public float getWaterMin() {
        return waterMin;
    }

    public void setWaterMin(float waterMin) {
        this.waterMin = waterMin;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getThresholdId() {
        return thresholdId;
    }

    public void setThresholdId(String thresholdId) {
        this.thresholdId = thresholdId;
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

    public float getCalorificMax() {
        return calorificMax;
    }

    public void setCalorificMax(float calorificMax) {
        this.calorificMax = calorificMax;
    }

    public float getCalorificMin() {
        return calorificMin;
    }

    public void setCalorificMin(float calorificMin) {
        this.calorificMin = calorificMin;
    }

    public float getAshMax() {
        return ashMax;
    }

    public void setAshMax(float ashMax) {
        this.ashMax = ashMax;
    }

    public float getAshMin() {
        return ashMin;
    }

    public void setAshMin(float ashMin) {
        this.ashMin = ashMin;
    }

    public float getsMax() {
        return sMax;
    }

    public void setsMax(float sMax) {
        this.sMax = sMax;
    }

    public float getsMin() {
        return sMin;
    }

    public void setsMin(float sMin) {
        this.sMin = sMin;
    }

    public float getClMax() {
        return clMax;
    }

    public void setClMax(float clMax) {
        this.clMax = clMax;
    }

    public float getClMin() {
        return clMin;
    }

    public void setClMin(float clMin) {
        this.clMin = clMin;
    }

    @Override
    public String toString() {
        return "Threshold{" +
                "thresholdId='" + thresholdId + '\'' +
                ", handleCategory=" + handleCategory +
                ", formType=" + formType +
                ", calorificMax=" + calorificMax +
                ", calorificMin=" + calorificMin +
                ", ashMax=" + ashMax +
                ", ashMin=" + ashMin +
                ", waterMax=" + waterMax +
                ", waterMin=" + waterMin +
                ", sMax=" + sMax +
                ", sMin=" + sMin +
                ", clMax=" + clMax +
                ", clMin=" + clMin +
                ", pMax=" + pMax +
                ", pMin=" + pMin +
                ", fMax=" + fMax +
                ", fMin=" + fMin +
                ", phMax=" + phMax +
                ", phMin=" + phMin +
                ", safety=" + safety +
                ", beginTime=" + beginTime +
                ", endTime=" + endTime +
                '}';
    }

    public float getpMin() {
        return pMin;
    }

    public void setpMin(float pMin) {
        this.pMin = pMin;
    }

    public float getfMax() {
        return fMax;
    }

    public void setfMax(float fMax) {
        this.fMax = fMax;
    }

    public float getfMin() {
        return fMin;
    }

    public void setfMin(float fMin) {
        this.fMin = fMin;
    }

    public float getPhMax() {
        return phMax;
    }

    public void setPhMax(float phMax) {
        this.phMax = phMax;
    }

    public float getPhMin() {
        return phMin;
    }

    public void setPhMin(float phMin) {
        this.phMin = phMin;
    }

    public float getSafety() {
        return safety;
    }

    public void setSafety(float safety) {
        this.safety = safety;
    }

    public Date getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(Date beginTime) {
        this.beginTime = beginTime;
    }
}
