package com.jdlink.domain.Produce;

/**
 * Created by Leon on 2018/8/1.
 */
public enum Parameter {
    Viscosity("粘度", 1),
    Density("密度",2),
    PH("酸碱度",3),
    Heat("热值",4),
    Ash("灰分",5),
    FlashPoint("闪点",6),
    MeltingPoint("熔点",7),
    BoilingPoint("沸点",8),
    WaterContent("含水率",9),
    SolidSubstanceContent("固体物质含量",10),
    SulfurContent("硫含量",11),
    ChlorineContent("氯含量",12),
    FluorineContent("氟含量",13),
    PhosphorusContent("磷含量", 14)
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
