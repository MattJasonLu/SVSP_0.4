package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;

import java.util.Date;

public class SoftTest {
    private String id;//软水验单编号

    private String address;//采样点

    private String remarks;//备注

    private String sampleId;//预约单号

    //分页
    private Page page;

    private float turbidity;//浊度

    private String  hardness;//硬度

    private float  PH;

    private float electricalConductivity;//电导率

    private float basicity;//全碱度

    private  float phenolphthalein;//酚酞碱度

    private CheckState checkState;

    //创建日期
    private Date dateTime;

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getSampleId() {
        return sampleId;
    }

    public void setSampleId(String sampleId) {
        this.sampleId = sampleId;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public float getTurbidity() {
        return turbidity;
    }

    public void setTurbidity(float turbidity) {
        this.turbidity = turbidity;
    }

    public String getHardness() {
        return hardness;
    }

    public void setHardness(String hardness) {
        this.hardness = hardness;
    }

    public float getPH() {
        return PH;
    }

    public void setPH(float PH) {
        this.PH = PH;
    }

    public float getElectricalConductivity() {
        return electricalConductivity;
    }

    public void setElectricalConductivity(float electricalConductivity) {
        this.electricalConductivity = electricalConductivity;
    }

    public float getBasicity() {
        return basicity;
    }

    public void setBasicity(float basicity) {
        this.basicity = basicity;
    }

    public float getPhenolphthalein() {
        return phenolphthalein;
    }

    public void setPhenolphthalein(float phenolphthalein) {
        this.phenolphthalein = phenolphthalein;
    }

    @Override
    public String toString() {
        return "SoftTest{" +
                "id='" + id + '\'' +
                ", address='" + address + '\'' +
                ", remarks='" + remarks + '\'' +
                ", sampleId='" + sampleId + '\'' +
                ", page=" + page +
                ", turbidity=" + turbidity +
                ", hardness=" + hardness +
                ", PH=" + PH +
                ", electricalConductivity=" + electricalConductivity +
                ", basicity=" + basicity +
                ", phenolphthalein=" + phenolphthalein +
                '}';
    }
}
