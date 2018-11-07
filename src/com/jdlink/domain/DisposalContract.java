package com.jdlink.domain;

import java.util.Date;

public class DisposalContract {

    private int id;//编号

    private String hw1;//类别1

    private String  hw2;//类别2

    private String hw3;//类别3


    private float n1;//数量1;

    private float n2;//数量2

    private float n3;//数量3

    private String totalPrice;//总金额

    private String address;//地区

    private Page page;

    private Date nowTime;

    public Date getNowTime() {
        return nowTime;
    }

    public void setNowTime(Date nowTime) {
        this.nowTime = nowTime;
    }

    public Page getPage() {

        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHw1() {
        return hw1;
    }

    public void setHw1(String hw1) {
        this.hw1 = hw1;
    }

    public String getHw2() {
        return hw2;
    }

    public void setHw2(String hw2) {
        this.hw2 = hw2;
    }

    public String getHw3() {
        return hw3;
    }

    public void setHw3(String hw3) {
        this.hw3 = hw3;
    }

    public float getN1() {
        return n1;
    }

    public void setN1(float n1) {
        this.n1 = n1;
    }

    public float getN2() {
        return n2;
    }

    public void setN2(float n2) {
        this.n2 = n2;
    }

    public float getN3() {
        return n3;
    }

    public void setN3(float n3) {
        this.n3 = n3;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "DisposalContract{" +
                "id=" + id +
                ", hw1='" + hw1 + '\'' +
                ", hw2='" + hw2 + '\'' +
                ", hw3='" + hw3 + '\'' +
                ", n1=" + n1 +
                ", n2=" + n2 +
                ", n3=" + n3 +
                ", totalPrice=" + totalPrice +
                ", address='" + address + '\'' +
                '}';
    }
}
