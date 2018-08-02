package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.MixingElement;

import java.util.ArrayList;
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
     * 客户对象
     */
    private Client client;
    /**
     * 填报人
     */
    private String record;
    /**
     * 填报日期
     */
    private String recordDate;
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
    private String laboratoryDate;

    /**
     * 单据状态
     */
    private CheckState checkState;
    /**
     * 样品列表
     */
    private List<SampleInformation> sampleInformationList = new ArrayList<>();
    /**
     * 参数列表
     */
    private List<MixingElement> parameterList = new ArrayList<>();
    /**
     * 重金属列表
     */
    private  List<MixingElement> heavyMetalList = new ArrayList<>();




    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<SampleInformation> getSampleInformationList() {
        return sampleInformationList;
    }

    public void setSampleInformationList(List<SampleInformation> sampleInformationList) {
        this.sampleInformationList = sampleInformationList;
    }

    public List<MixingElement> getParameterList() {
        return parameterList;
    }

    public void setParameterList(List<MixingElement> parameterList) {
        this.parameterList = parameterList;
    }

    public List<MixingElement> getHeavyMetalList() {
        return heavyMetalList;
    }

    public void setHeavyMetalList(List<MixingElement> heavyMetalList) {
        this.heavyMetalList = heavyMetalList;
    }


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

    public String getRecord() {
        return record;
    }

    public void setRecord(String record) {
        this.record = record;
    }

    public String getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(String recordDate) {
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

    public String getLaboratoryDate() {
        return laboratoryDate;
    }

    public void setLaboratoryDate(String laboratoryDate) {
        this.laboratoryDate = laboratoryDate;
    }

    @Override
    public String toString() {
        return "LaboratoryTest{" +
                "laboratoryTestNumber='" + laboratoryTestNumber + '\'' +
                ", queryNumber='" + queryNumber + '\'' +
                ", client=" + client +
                ", record='" + record + '\'' +
                ", recordDate='" + recordDate + '\'' +
                ", laboratory='" + laboratory + '\'' +
                ", laboratoryCompany='" + laboratoryCompany + '\'' +
                ", laboratoryDate='" + laboratoryDate + '\'' +
                ", checkState=" + checkState +
                ", sampleInformationList=" + sampleInformationList +
                ", parameterList=" + parameterList +
                ", heavyMetalList=" + heavyMetalList +
                '}';
    }
}
