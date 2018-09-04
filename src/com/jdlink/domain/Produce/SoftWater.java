package com.jdlink.domain.Produce;

import com.jdlink.domain.Page;
import com.jdlink.util.DateUtil;

import java.util.Date;

public class SoftWater {
    /**
     * 软水编号（主键）
     */
    private int id;
    /**
     * 软水接收日期
     */
    private Date receiveDate;
    /**
     * 日期模糊查询用
     */
    private String date;
    /**
     * 软水名称
     */
    private String name;
    /**
     * 软水备注
     */
    private String remarks;
    /**
     * 关键字查询
     */
    private String keywords;
    /**
     * 相对碱度
     */
    private float relativeAlkalinity;
    /**
     * 溶解固形物
     */
    private float dissolvedSolidForm;
    /**
     * PH
     */
    private float ph;
    /**
     * 碱度
     */
    private float alkalinity;
    /**
     * 硬度
     */
    private float hardness;
    /**
     * 电导率
     */
    private float electricalConductivity;
    /**
     * 分页
     */
    private Page page;

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

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public float getRelativeAlkalinity() {
        return relativeAlkalinity;
    }

    public void setRelativeAlkalinity(float relativeAlkalinity) {
        this.relativeAlkalinity = relativeAlkalinity;
    }

    public float getDissolvedSolidForm() {
        return dissolvedSolidForm;
    }

    public void setDissolvedSolidForm(float dissolvedSolidForm) {
        this.dissolvedSolidForm = dissolvedSolidForm;
    }

    public float getPh() {
        return ph;
    }

    public void setPh(float ph) {
        this.ph = ph;
    }

    public float getAlkalinity() {
        return alkalinity;
    }

    public void setAlkalinity(float alkalinity) {
        this.alkalinity = alkalinity;
    }

    public float getHardness() {
        return hardness;
    }

    public void setHardness(float hardness) {
        this.hardness = hardness;
    }

    public float getElectricalConductivity() {
        return electricalConductivity;
    }

    public void setElectricalConductivity(float electricalConductivity) {
        this.electricalConductivity = electricalConductivity;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "SoftWater{" +
                "id=" + id +
                ", receiveDate=" + receiveDate +
                ", date='" + date + '\'' +
                ", name='" + name + '\'' +
                ", remarks='" + remarks + '\'' +
                ", keywords='" + keywords + '\'' +
                ", relativeAlkalinity=" + relativeAlkalinity +
                ", dissolvedSolidForm=" + dissolvedSolidForm +
                ", ph=" + ph +
                ", alkalinity=" + alkalinity +
                ", hardness=" + hardness +
                ", electricalConductivity=" + electricalConductivity +
                ", page=" + page +
                '}';
    }
}
