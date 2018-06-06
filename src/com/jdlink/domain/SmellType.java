package com.jdlink.domain;

/**
 * Created by matt on 2018/5/2.
 */
public enum SmellType {
    None("无味", 1),
    Fragrant("香味", 2),
    Odour("臭味", 3),
    ;

    private String name;
    private int index;
    SmellType(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static SmellType get(int index) {
        for (SmellType c : SmellType.values()) {
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
