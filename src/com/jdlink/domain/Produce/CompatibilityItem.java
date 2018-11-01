package com.jdlink.domain.Produce;

import com.jdlink.domain.FormType;
import com.jdlink.domain.Page;

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

    //热值阈值
    private float calorificThreshold;

    //灰分
    private float  ash;

    //灰分阈值
    private float  ashThreshold;


    //水分
    private float water;

    //水分阈值
    private float waterThreshold;

    //氯
    private float cl;

    //氯阈值
    private float clThreshold;

    //硫
    private float s;

    //硫阈值
    private float sThreshold;

    //磷
    private float p;

    //磷阈值
    private float pThreshold ;

    //氟
    private float f;

    //氟阈值
    private float fThreshold ;

    //酸碱度

    private float ph;

    //酸碱度阈值
    private float phThreshold ;

    //明细主键 用来做更新操作



    private int id;

    //分页
    private Page page;

    //热值范围

    private float calorificBeg;

    private float calorificEnd;

    //F范围
    private float fBeg;

    private float fEnd;

    //CL范围
    private float clBeg;

    private float clEnd;

    //S范围
    private float sBeg;

    private float sEnd;

    public float getCalorificThreshold() {
        return calorificThreshold;
    }

    public void setCalorificThreshold(float calorificThreshold) {
        this.calorificThreshold = calorificThreshold;
    }

    public float getAshThreshold() {
        return ashThreshold;
    }

    public void setAshThreshold(float ashThreshold) {
        this.ashThreshold = ashThreshold;
    }

    public float getWaterThreshold() {
        return waterThreshold;
    }

    public void setWaterThreshold(float waterThreshold) {
        this.waterThreshold = waterThreshold;
    }

    public float getClThreshold() {
        return clThreshold;
    }

    public void setClThreshold(float clThreshold) {
        this.clThreshold = clThreshold;
    }

    public float getsThreshold() {
        return sThreshold;
    }

    public void setsThreshold(float sThreshold) {
        this.sThreshold = sThreshold;
    }

    public float getpThreshold() {
        return pThreshold;
    }

    public void setpThreshold(float pThreshold) {
        this.pThreshold = pThreshold;
    }

    public float getfThreshold() {
        return fThreshold;
    }

    public void setfThreshold(float fThreshold) {
        this.fThreshold = fThreshold;
    }

    public float getPhThreshold() {
        return phThreshold;
    }

    public void setPhThreshold(float phThreshold) {
        this.phThreshold = phThreshold;
    }

    public float getCalorificBeg() {
        return calorificBeg;
    }

    public void setCalorificBeg(float calorificBeg) {
        this.calorificBeg = calorificBeg;
    }

    public float getCalorificEnd() {
        return calorificEnd;
    }

    public void setCalorificEnd(float calorificEnd) {
        this.calorificEnd = calorificEnd;
    }

    public float getfBeg() {
        return fBeg;
    }

    public void setfBeg(float fBeg) {
        this.fBeg = fBeg;
    }

    public float getfEnd() {
        return fEnd;
    }

    public void setfEnd(float fEnd) {
        this.fEnd = fEnd;
    }

    public float getClBeg() {
        return clBeg;
    }

    public void setClBeg(float clBeg) {
        this.clBeg = clBeg;
    }

    public float getClEnd() {
        return clEnd;
    }

    public void setClEnd(float clEnd) {
        this.clEnd = clEnd;
    }

    public float getsBeg() {
        return sBeg;
    }

    public void setsBeg(float sBeg) {
        this.sBeg = sBeg;
    }

    public float getsEnd() {
        return sEnd;
    }

    public void setsEnd(float sEnd) {
        this.sEnd = sEnd;
    }

    public Page getPage() {

        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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
                "compatibilityId='" + compatibilityId + '\'' +
                ", handleCategory=" + handleCategory +
                ", formType=" + formType +
                ", proportion=" + proportion +
                ", dailyRatio=" + dailyRatio +
                ", weeklyDemandTotal=" + weeklyDemandTotal +
                ", calorific=" + calorific +
                ", calorificThreshold=" + calorificThreshold +
                ", ash=" + ash +
                ", ashThreshold=" + ashThreshold +
                ", water=" + water +
                ", waterThreshold=" + waterThreshold +
                ", cl=" + cl +
                ", clThreshold=" + clThreshold +
                ", s=" + s +
                ", sThreshold=" + sThreshold +
                ", p=" + p +
                ", pThreshold=" + pThreshold +
                ", f=" + f +
                ", fThreshold=" + fThreshold +
                ", ph=" + ph +
                ", phThreshold=" + phThreshold +
                ", id=" + id +
                ", page=" + page +
                ", calorificBeg=" + calorificBeg +
                ", calorificEnd=" + calorificEnd +
                ", fBeg=" + fBeg +
                ", fEnd=" + fEnd +
                ", clBeg=" + clBeg +
                ", clEnd=" + clEnd +
                ", sBeg=" + sBeg +
                ", sEnd=" + sEnd +
                '}';
    }
}
