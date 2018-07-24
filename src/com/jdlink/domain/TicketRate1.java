package com.jdlink.domain;

/**
 * Created by matt on 2018/5/18.
 */
public enum TicketRate1 {
    Rate1("增值税专用发票16%",1),
    Rate2("增值税专用发票3%",2);
    private String name;
    private int index;
    TicketRate1(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static TicketRate1 get(int index) {
        for (TicketRate1 c : TicketRate1.values()) {
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
