package com.jdlink.domain;

/**
 * Created by matt on 2018/5/2.
 * 物质形态
 */
public enum FormType {
    Gas("气体", 1),
    Liquid("液态", 2),
    Solid("固态", 3),
    HalfSolid("半固态", 4),
    Solid1AndHalfSolid("固态+半固态", 5),
    HalfSolidAndLiquid("半固态+液态",6),
    Solid1AndLiquid("固态+液态",7),
    ;

    private String name;
    private int index;
    FormType(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static FormType get(int index) {
        for (FormType c : FormType.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }
    public static FormType getFormType(String keyword) {
        for (FormType p : FormType.values()) {
            if(p.getName().contains(keyword)){
                return p;
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
