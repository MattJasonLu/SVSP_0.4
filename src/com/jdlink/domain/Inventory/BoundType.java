package com.jdlink.domain.Inventory;

import sun.org.mozilla.javascript.internal.ast.StringLiteral;

/*出库类别*/
public enum  BoundType {
    NormalOutbound("正常出库",1),
    OtherOutbound("其它出库",2);
    private String name;
    private int index;
    BoundType(String name, int index) {
        this.name = name;
        this.index = index;
    }
    // 普通方法
    public static BoundType get(int index) {
        for (BoundType c : BoundType.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }
    public static BoundType getBoundType(String keyword) {
        for (BoundType p : BoundType.values()) {
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
        return "BoundType{" +
                "name='" + name + '\'' +
                ", index=" + index +
                '}';
    }
}
