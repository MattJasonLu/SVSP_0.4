package com.jdlink.domain;

/**
 * Created by matt on 2018/5/2.
 */
public enum ChemicalType {
    Chlorine("氯", 1),
    Fluorine("氟", 2),
    Bromine("溴", 3),
    Iodine("碘", 4),
    Sulphur("硫", 5),
    Phosphorus("磷", 6),
    Nitrogen("氮", 7),
    ;

    private String name;
    private int index;
    ChemicalType(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static ChemicalType get(int index) {
        for (ChemicalType c : ChemicalType.values()) {
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
