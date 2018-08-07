package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Leon on 2018/8/1.
 * 化验单类
 */
public class LaboratoryTest {
    /**
     * 化验单号
     */
    private String laboratoryTestNumber;
    /**
     * 查询号
     */
    private String queryNumber;
    /**
     * 客户对象(企业名称、地址、联系人、联系电话、所属行业、主要产品，共六个属性)
     */
    private Client client;
    /**
     * 填报人
     */
    private String record;
    /**
     * 填报日期
     */
    private Date recordDate;
    /**
     * 化验人
     */
    private String laboratory;
    /**
     * 化验公司
     */
    private String laboratoryCompany;
    /**
     * 化验时间
     */
    private Date laboratoryDate;

    /**
     * 单据状态
     */
    private CheckState checkState;
    /**
     * 样品列表
     */
    private List<SampleInformation> sampleInformationList = new ArrayList<>();


    public String getLaboratoryTestNumber() {
        return laboratoryTestNumber;
    }

    public void setLaboratoryTestNumber(String laboratoryTestNumber) {
        this.laboratoryTestNumber = laboratoryTestNumber;
    }

    public String getQueryNumber() {
        return queryNumber;
    }

    public void setQueryNumber(String queryNumber) {
        this.queryNumber = queryNumber;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getRecord() {
        return record;
    }

    public void setRecord(String record) {
        this.record = record;
    }

    public Date getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(Date recordDate) {
        this.recordDate = recordDate;
    }

    public String getLaboratory() {
        return laboratory;
    }

    public void setLaboratory(String laboratory) {
        this.laboratory = laboratory;
    }

    public String getLaboratoryCompany() {
        return laboratoryCompany;
    }

    public void setLaboratoryCompany(String laboratoryCompany) {
        this.laboratoryCompany = laboratoryCompany;
    }

    public Date getLaboratoryDate() {
        return laboratoryDate;
    }

    public void setLaboratoryDate(Date laboratoryDate) {
        this.laboratoryDate = laboratoryDate;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public List<SampleInformation> getSampleInformationList() {
        return sampleInformationList;
    }

    public void setSampleInformationList(List<SampleInformation> sampleInformationList) {
        this.sampleInformationList = sampleInformationList;
    }

    @Override
    public String toString() {
        return "LaboratoryTest{" +
                "laboratoryTestNumber='" + laboratoryTestNumber + '\'' +
                ", queryNumber='" + queryNumber + '\'' +
                ", client=" + client +
                ", record='" + record + '\'' +
                ", recordDate=" + recordDate +
                ", laboratory='" + laboratory + '\'' +
                ", laboratoryCompany='" + laboratoryCompany + '\'' +
                ", laboratoryDate=" + laboratoryDate +
                ", checkState=" + checkState +
                ", sampleInformationList=" + sampleInformationList +
                '}';
    }
}
