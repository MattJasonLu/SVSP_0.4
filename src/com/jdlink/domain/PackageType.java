package com.jdlink.domain;

import com.jdlink.util.CodeBaseEnum;

/**
 * Created by matt on 2018/5/8.
 */
public enum PackageType implements CodeBaseEnum {
    Bag("吨袋", 1),
    Box("箱装", 2),
    ;

    @Override
    public int code() {
        return index;
    }

    private String name;
    private int index;
    PackageType(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static PackageType get(int index) {
        for (PackageType c : PackageType.values()) {
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
