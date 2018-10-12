package com.jdlink.domain;

public enum  Unit {
    Kg("千克", 1),
    T("吨",2),
    Catty("斤",3);
    private String name;
    private int index;

    // 普通方法
    public static Unit get(int index) {
        for (Unit c : Unit.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }


    public static Unit getUnit(String keyword) {
        for (Unit p : Unit.values()) {
            if(p.getName().contains(keyword)){
                return p;
            }
        }
        return null;
    }


    Unit(String name, int index) {
        this.name = name;
        this.index = index;
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

    @Override
    public String toString() {
        return "Unit{" +
                "name='" + name + '\'' +
                ", index=" + index +
                '}';
    }
}
