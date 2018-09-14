package com.jdlink.domain;

/**
 * 危险废物名称及数量
 */
public class Hazardous{
    private String id;
    /**
     * 废物名称
     */
    private  String name;
    /**
    废物数量
     */
    private String num;
    /**
     * 危废代码(8位)
     */
    private String code;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


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
