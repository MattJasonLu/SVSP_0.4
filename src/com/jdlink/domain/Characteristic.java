package com.jdlink.domain;

/**
 * 危废特性
 */
public class Characteristic {

    //主键
    private String code;

    //特性名称
    private String name;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Characteristic{" +
                "code='" + code + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
