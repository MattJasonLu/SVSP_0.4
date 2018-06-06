package com.jdlink.domain;

/**
 * Created by matt on 2018/5/17.
 */
public enum TaxRate {
    Appointed("已预约", 4),
    SampleTaked("已取样", 5),
    Canceld("预约取消", 6),
    ;

    private String name;
    private int index;
    TaxRate(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static TaxRate get(int index) {
        for (TaxRate c : TaxRate.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}
