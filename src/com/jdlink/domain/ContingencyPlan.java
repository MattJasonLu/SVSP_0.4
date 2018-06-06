package com.jdlink.domain;

import com.jdlink.util.CodeBaseEnum;

/**
 * Created by matt on 2018/4/23.
 */
public enum ContingencyPlan implements CodeBaseEnum{
    Identify("制定并确定了应急协调人", 1),
    Developed("已制定", 2),
    Undeveloped("未制定", 3),;

    private String name;
    private int index;
    ContingencyPlan(String name, int index) {
        this.name = name;
        this.index = index;
    }

    @Override
    public int code() {
        return index;
    }

    // 普通方法
    public static ContingencyPlan get(int index) {
        for (ContingencyPlan c : ContingencyPlan.values()) {
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
