package com.jdlink.domain;

/**
 * 危废类别
 */
public class Category {

    //编码(大类)
    private String code;

    //类别名称
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
        return "Category{" +
                "code='" + code + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
