package com.jdlink.domain.Produce;

import com.jdlink.domain.Page;

import java.util.Date;

public class Sewage {
    /**
     * 污水编号(主键)
     */
    private int id;
    /**
     * 污水接收日期
     */
    private Date receiveDate;
    /**
     * 日期模糊查询用
     */
    private String date;
    /**
     * 污水名称
     */
    private String name;
    /**
     * 污水备注
     */
    private String remarks;
    /**
     * 关键字查询
     */
    private String keywords;
    /**
     * COD 化学需氧量
     */
    private float cod;
    /**
     * BOD5 生化需氧量5
     */
    private float bod5;
    /**
     * 氧
     */
    private float oxygen;
    /**
     * 氮
     */
    private float nitrogen;
    /**
     * 碱液
     */
    private float lye;
    /**
     * PH
     */
    private float ph;
    /**
     * 分页
     */
    private Page page;
    /**
     * 日期查询 起始时间
     */
    private Date startDate;
    /**
     * 日期查询 终止时间
     */
    private Date endDate;

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getReceiveDate() {
        return receiveDate;
    }

    public void setReceiveDate(Date receiveDate) {
        this.receiveDate = receiveDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public float getCod() {
        return cod;
    }

    public void setCod(float cod) {
        this.cod = cod;
    }

    public float getBod5() {
        return bod5;
    }

    public void setBod5(float bod5) {
        this.bod5 = bod5;
    }

    public float getOxygen() {
        return oxygen;
    }

    public void setOxygen(float oxygen) {
        this.oxygen = oxygen;
    }

    public float getNitrogen() {
        return nitrogen;
    }

    public void setNitrogen(float nitrogen) {
        this.nitrogen = nitrogen;
    }

    public float getLye() {
        return lye;
    }

    public void setLye(float lye) {
        this.lye = lye;
    }

    public float getPh() {
        return ph;
    }

    public void setPh(float ph) {
        this.ph = ph;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    @Override
    public String toString() {
        return "Sewage{" +
                "id=" + id +
                ", receiveDate=" + receiveDate +
                ", name='" + name + '\'' +
                ", remarks='" + remarks + '\'' +
                ", keywords='" + keywords + '\'' +
                ", cod=" + cod +
                ", bod5=" + bod5 +
                ", oxygen=" + oxygen +
                ", nitrogen=" + nitrogen +
                ", lye=" + lye +
                ", ph=" + ph +
                '}';
    }
}
