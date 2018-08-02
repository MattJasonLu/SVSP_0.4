package com.jdlink.domain.Produce;

import com.jdlink.domain.Client;
import com.jdlink.domain.MixingElement;
import com.jdlink.domain.Produce.SampleInformation;

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

    private List<SampleInformation> sampleInformationList = new ArrayList<>();

    private List<MixingElement> parameterList = new ArrayList<>();

    private  List<MixingElement> heavyMetalList = new ArrayList<>();

//    /**
//     * 单据状态
//     */
//    private CheckState checkState;
//    /**
//     * 取样日期
//     */
//    private Date samplingDate;
//    /**
//     * 取样号
//     */
//    private String samplingNumber;

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
//
//    public Date getSamplingDate() {
//        return samplingDate;
//    }
//
//    public void setSamplingDate(Date samplingDate) {
//        this.samplingDate = samplingDate;
//    }
//
//    public String getSamplingNumber() {
//        return samplingNumber;
//    }
//
//    public void setSamplingNumber(String samplingNumber) {
//        this.samplingNumber = samplingNumber;
//    }

    @Override
    public String toString() {
        return "LaboratoryTest{" +
                "laboratoryTestNumber='" + laboratoryTestNumber + '\'' +
                ", queryNumber='" + queryNumber + '\'' +
                ", record='" + record + '\'' +
                ", recordDate='" + recordDate + '\'' +
                ", laboratory='" + laboratory + '\'' +
                ", laboratoryCompany='" + laboratoryCompany + '\'' +
                ", laboratoryDate='" + laboratoryDate + '\'' +
                ", sampleInformationList=" + sampleInformationList +
                ", parameterList=" + parameterList +
                '}';
    }
}
