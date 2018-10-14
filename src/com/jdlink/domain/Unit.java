package com.jdlink.domain;

public enum  Unit {
    Kg("公斤", 1),
    T("吨",2),
    Catty("斤",3),
    Set("套",4),
    Platform("台",5),
    Root("根",6),
    Box("盒",7),
    Chest("箱",8),
    Spread("张",9),
    Only("只",10),
    Hold("把",11),
    Metre("米",12),
    Bucket("桶",13),
    Package("包",14),
    Individual("个",15),
    Volume("卷",16),
    Square("平方",17),
    Disc("盘",18);
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
