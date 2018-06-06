package com.jdlink.domain;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by matt on 2018/4/24.
 */
public class Salesman {
    /**
     * 业务员编号
     */
    private String salesmanId;
    /**
     * 业务员名字
     */
    private String name;
    /**
     * 年龄
     */
    private Integer age;
    /**
     * 编号
     */
    private boolean sex;
    /**
     * 客户编号
     */
    private String clientId;
    /**
     * 客户名称
     */
    private String companyName;
    /**
     * 注册时间
     */
    private Date time;

    public String getSalesmanId() {
        return salesmanId;
    }

    public void setSalesmanId(String salesmanId) {
        this.salesmanId = salesmanId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public boolean isSex() {
        return sex;
    }

    public void setSex(boolean sex) {
        this.sex = sex;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCommonTime() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return simpleDateFormat.format(time);
    }

    @Override
    public String toString() {
        return "Salesman{" +
                "salesmanId='" + salesmanId + '\'' +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", sex=" + sex +
                ", clientId='" + clientId + '\'' +
                ", time=" + time +
                '}';
    }
}
