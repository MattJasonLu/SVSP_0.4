package com.jdlink.domain.Produce;

import com.jdlink.util.CodeBaseEnum;

public enum Equipment implements CodeBaseEnum {
    MedicalCookingSystem("医疗蒸煮系统", 1),
    A2("A2", 2),
    B2("B2", 3),
    SecondaryTwoCombustionChamber("二期二燃室", 4),
    ThirdPhasePretreatmentSystem("三期预处理系统", 5),
    Prepare2("备2",6)
    ;

    @Override
    public int code() {
        return index;
    }

    private String name;
    private int index;
    Equipment(String name, int index) {
        this.name = name;
        this.index = index;
    }
    // 普通方法
    public static Equipment get(int index) {
        for (Equipment h : Equipment.values()) {
            if (h.getIndex() == index) {
                return h;
            }
        }
        return null;
    }
    public static Equipment getEquipment(String keyword) {
        for (Equipment p : Equipment.values()) {
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
