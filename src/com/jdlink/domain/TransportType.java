package com.jdlink.domain;

public enum TransportType {
    Railway("铁路",1),
    Highway("公路",2),
    Waterway("水路",3),
    Aviation("航空",4);
    private String name;
    private int index;
    TransportType(String name, int index) {
        this.name = name;
        this.index = index;
    }
    // 普通方法
    public static TransportType get(int index) {
        for (TransportType c : TransportType.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }
    public static TransportType getContract(String keyword) {
        for (TransportType p : TransportType.values()) {
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

    @Override
    public String toString() {
        return "TransportType{" +
                "name='" + name + '\'' +
                ", index=" + index +
                '}';
    }
}
