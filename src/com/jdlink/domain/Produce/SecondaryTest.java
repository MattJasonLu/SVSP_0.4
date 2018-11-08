package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;

import java.util.Date;

public class SecondaryTest {

    //编号
    private String id;

    //收样日期
    private Date dateTime;

    //废物名称
    private String wastesName;


    //热灼减率
    private float scorchingRate;

    //水分
    private float water;

    //备注
    private String remarks;

    private CheckState checkState;

    public CheckState getCheckState() {

        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }

    public float getScorchingRate() {
        return scorchingRate;
    }

    public void setScorchingRate(float scorchingRate) {
        this.scorchingRate = scorchingRate;
    }

    public float getWater() {
        return water;
    }

    public void setWater(float water) {
        this.water = water;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "SecondaryTest{" +
                "id='" + id + '\'' +
                ", dateTime=" + dateTime +
                ", wastesName='" + wastesName + '\'' +
                ", scorchingRate=" + scorchingRate +
                ", water=" + water +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}
