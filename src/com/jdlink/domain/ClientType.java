package com.jdlink.domain;

/**
 * Created by matt on 2018/6/26.
 * 客户类型
 */
public enum ClientType {
    EnquiryClient("询价客户", 1),
    TemporaryClient("临时客户", 2),
    FormalClient("正式客户", 2),
    ;

    private String name;
    private int index;
    ClientType(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static ClientType get(int index) {
        for (ClientType c : ClientType.values()) {
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
