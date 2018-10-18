package com.jdlink.domain;

import com.jdlink.util.CodeBaseEnum;

/**
 * Created by matt on 2018/4/23.
 */
public enum OperationMode implements CodeBaseEnum {
    Comprehensive("综合", 1),
    Collect("收集", 2),
    Production("生产", 3),;

    private String name;
    private int index;
    OperationMode(String name, int index) {
        this.name = name;
        this.index = index;
    }
    @Override
    public int code() {
        return index;
    }

    // 普通方法
    public static OperationMode get(int index) {
        for (OperationMode c : OperationMode.values()) {
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
