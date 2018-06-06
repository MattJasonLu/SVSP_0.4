package com.jdlink.domain;

/**
 * Created by matt on 2018/5/2.
 */
public enum Solubility {
    Not("不溶", 1),
    Few("微溶", 2),
    All("溶水", 3),
    ;

    private String name;
    private int index;
    Solubility(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static Solubility get(int index) {
        for (Solubility c : Solubility.values()) {
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
