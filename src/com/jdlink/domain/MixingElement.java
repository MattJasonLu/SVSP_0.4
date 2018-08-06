package com.jdlink.domain;

import com.jdlink.domain.Produce.HeavyMetal;
import com.jdlink.domain.Produce.Parameter;

import java.util.Date;

/**
 * Created by matt on 2018/5/2.
 * 混合物成分
 */
public class MixingElement {

    private String id;

    private String name;

    private Parameter parameter;

    private HeavyMetal heavyMetal;
    /**
     * 最低预估含量(%)
     */
    private float minimum;
    /**
     * 平均预估含量(%)
     */
    private float average;
    /**
     * 最高预估含量(%)
     */
    private float maximum;
    /**
     * 当前时间
     */
    private Date nowTime;

    public Parameter getParameter() {
        return parameter;
    }

    public void setParameter(Parameter parameter) {
        this.parameter = parameter;
    }

    public HeavyMetal getHeavyMetal() {
        return heavyMetal;
    }

    public void setHeavyMetal(HeavyMetal heavyMetal) {
        this.heavyMetal = heavyMetal;
    }

    public Date getNowTime() {
        return nowTime;
    }

    public void setNowTime(Date nowTime) {
        this.nowTime = nowTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getMinimum() {
        return minimum;
    }

    public void setMinimum(float minimum) {
        this.minimum = minimum;
    }

    public float getAverage() {
        return average;
    }

    public void setAverage(float average) {
        this.average = average;
    }

    public float getMaximum() {
        return maximum;
    }

    public void setMaximum(float maximum) {
        this.maximum = maximum;
    }

    @Override
    public String toString() {
        return "MixingElement{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", parameter=" + parameter +
                ", heavyMetal=" + heavyMetal +
                ", minimum=" + minimum +
                ", average=" + average +
                ", maximum=" + maximum +
                ", nowTime=" + nowTime +
                '}';
    }

}
