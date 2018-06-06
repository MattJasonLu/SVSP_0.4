package com.jdlink.domain;

/**
 * Created by matt on 2018/5/2.
 * 混合物成分
 */
public class MixingElement {

    private String id;

    private String name;
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
}
