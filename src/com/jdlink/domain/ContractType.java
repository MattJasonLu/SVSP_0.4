package com.jdlink.domain;

/**
 * Created by matt on 2018/5/18.
 */
public enum ContractType {
    Wastes("危废合同", 1),
    Emergency("应急处置合同", 2),
    Derive("次生合同", 3),
    Purchase("采购合同", 4),
    ;

    private String name;
    private int index;
    ContractType(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static ContractType get(int index) {
        for (ContractType c : ContractType.values()) {
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
