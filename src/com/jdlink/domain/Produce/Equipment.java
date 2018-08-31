package com.jdlink.domain.Produce;

public enum Equipment {
    A2("A2设备",1),
    B2("B2设备",2),
    Equipment2("备2",3);
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
