package com.jdlink.domain.Produce;

/**
 * Created by Leon on 2018/8/1.
 */
public enum Parameter {
    Viscosity("粘度", 1),
    Density("密度",2),
    PHvalue("酸碱度",2),
//    Density("热值",2),
//    Density("密度",2),
//    Density("密度",2),
//    Density("密度",2),
//    Density("密度",2),
//    Density("密度",2),
//    Density("密度",2),
//    Density("密度",2),
//    Density("密度",2),
//    Density("密度",2),
    ;

    private String name;
    private int index;
    Parameter(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static Parameter get(int index) {
        for (Parameter c : Parameter.values()) {
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
