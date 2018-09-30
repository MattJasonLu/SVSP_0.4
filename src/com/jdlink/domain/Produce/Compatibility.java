package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.FormType;
import com.jdlink.domain.Wastes;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 配伍周计划
 */
public class Compatibility {
    //配伍主键
    private String compatibilityId;


   //配伍单明细

    private List<CompatibilityItem> compatibilityItemList=new ArrayList<>();

    //每日配比量合计

    private float totalDailyAmount;


    //周需求合计

    private  float  weeklyDemandTotalAggregate;

    //热值平均

    private  float calorificAvg;

    //灰分平均

    private  float  ashAvg;

    //水分平均

    private  float  waterAvg;

    //氯平均

    private float   clAvg;

    //硫平均

    private float  sAvg;

    //磷平均

    private float pAvg;

    //氟平均

    private float fAvg;

    //酸碱度平均

    private float phAvg;

    //状态
    private CheckState checkState;

    //导入时间

    private Date importDate;

    //审批意见
    private String approvalContent;


    //驳回意见
    private String backContent;


    public String getApprovalContent() {
        return approvalContent;
    }

    public String getBackContent() {
        return backContent;
    }

    public void setBackContent(String backContent) {
        this.backContent = backContent;
    }

    public void setApprovalContent(String approvalContent) {
        this.approvalContent = approvalContent;
    }

    public float getTotalDailyAmount() {
        return totalDailyAmount;
    }

    public void setTotalDailyAmount(float totalDailyAmount) {
        this.totalDailyAmount = totalDailyAmount;
    }

    public float getpAvg() {
        return pAvg;
    }

    public void setpAvg(float pAvg) {
        this.pAvg = pAvg;
    }

    public float getfAvg() {
        return fAvg;
    }

    public void setfAvg(float fAvg) {
        this.fAvg = fAvg;
    }

    public String getCompatibilityId() {
        return compatibilityId;
    }

    public void setCompatibilityId(String compatibilityId) {
        this.compatibilityId = compatibilityId;
    }

    public List<CompatibilityItem> getCompatibilityItemList() {
        return compatibilityItemList;
    }

    public void setCompatibilityItemList(List<CompatibilityItem> compatibilityItemList) {
        this.compatibilityItemList = compatibilityItemList;
    }

    public float getWeeklyDemandTotalAggregate() {
        return weeklyDemandTotalAggregate;
    }

    public void setWeeklyDemandTotalAggregate(float weeklyDemandTotalAggregate) {
        this.weeklyDemandTotalAggregate = weeklyDemandTotalAggregate;
    }

    public float getCalorificAvg() {
        return calorificAvg;
    }

    public void setCalorificAvg(float calorificAvg) {
        this.calorificAvg = calorificAvg;
    }

    public float getAshAvg() {
        return ashAvg;
    }

    public void setAshAvg(float ashAvg) {
        this.ashAvg = ashAvg;
    }

    public float getWaterAvg() {
        return waterAvg;
    }

    public void setWaterAvg(float waterAvg) {
        this.waterAvg = waterAvg;
    }

    public float getClAvg() {
        return clAvg;
    }

    public void setClAvg(float clAvg) {
        this.clAvg = clAvg;
    }

    public float getsAvg() {
        return sAvg;
    }

    public void setsAvg(float sAvg) {
        this.sAvg = sAvg;
    }

    public float getPhAvg() {
        return phAvg;
    }

    public void setPhAvg(float phAvg) {
        this.phAvg = phAvg;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public Date getImportDate() {
        return importDate;
    }

    public void setImportDate(Date importDate) {
        this.importDate = importDate;
    }

    @Override
    public String toString() {
        return "Compatibility{" +
                "compatibilityId='" + compatibilityId + '\'' +
                ", compatibilityItemList=" + compatibilityItemList +
                ", totalDailyAmount=" + totalDailyAmount +
                ", weeklyDemandTotalAggregate=" + weeklyDemandTotalAggregate +
                ", calorificAvg=" + calorificAvg +
                ", ashAvg=" + ashAvg +
                ", waterAvg=" + waterAvg +
                ", clAvg=" + clAvg +
                ", sAvg=" + sAvg +
                ", phAvg=" + phAvg +
                ", checkState=" + checkState +
                ", importDate=" + importDate +
                '}';
    }
}
