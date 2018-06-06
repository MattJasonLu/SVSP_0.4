package com.jdlink.domain;

/**
 * Created by matt on 2018/5/17.
 */
public enum SupplierType {
    DeriveDisposal("次生处置供方", 1),
    Transport("运输类供方", 2),
    Purchase("采购供方", 3),
    Others("其他供方", 4),
    ;

    private String name;
    private int index;
    SupplierType(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static SupplierType get(int index) {
        for (SupplierType c : SupplierType.values()) {
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
