package com.jdlink.domain;

/**
 * 危险废物名称及数量
 */
public class Hazardous{
    /**
     * 废物名称
     */
    private  String name;
    /**
    废物数量
     */
    private String num;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }
}
