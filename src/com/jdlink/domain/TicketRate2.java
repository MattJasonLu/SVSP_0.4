package com.jdlink.domain;

/**
 * Created by matt on 2018/5/18.
 */
public enum TicketRate2 {
    Rate1("3%",1),
    Rate2("5%",2),
    Rate3("6%",3),
    Rate4("7%",4),
    Rate5("17%",5),
    Rate6("20%",6);
    private String name;
    private int index;
    TicketRate2(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static TicketRate2 get(int index) {
        for (TicketRate2 c : TicketRate2.values()) {
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
