package com.jdlink.domain.Produce;

import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Dictionary.RawMaterialsItem;
import com.jdlink.domain.Page;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*原辅材料送样*/
public class RawSample {

    /*预约单号*/
    private String id;

    /*化验室签收人*/
    private String laboratorySignatory;

    /*送样人*/
    private String sendingPerson;

    /*状态数据字典*/
    private CheckStateItem checkStateItem;

    /**
     * 一键签收预约单编号数组
     */
    private List<String> sampleIdList;

    /*分页*/
    private Page page;

    /*关键字*/
    private String keywords;

    /*修改后的ID*/
    private String newId;

    /*创建日期*/
    private Date createTime;

    /*原辅材料类别数据字典*/
    private RawMaterialsItem rawMaterialsItem;

    /*检测项目(字表)*/
    private List<RawSampleItem> rawSampleItemList=new ArrayList<>();

    /*拒收原因*/
    private String advice;

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLaboratorySignatory() {
        return laboratorySignatory;
    }

    public void setLaboratorySignatory(String laboratorySignatory) {
        this.laboratorySignatory = laboratorySignatory;
    }

    public String getSendingPerson() {
        return sendingPerson;
    }

    public void setSendingPerson(String sendingPerson) {
        this.sendingPerson = sendingPerson;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    public List<String> getSampleIdList() {
        return sampleIdList;
    }

    public void setSampleIdList(List<String> sampleIdList) {
        this.sampleIdList = sampleIdList;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getNewId() {
        return newId;
    }

    public void setNewId(String newId) {
        this.newId = newId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public RawMaterialsItem getRawMaterialsItem() {
        return rawMaterialsItem;
    }

    public void setRawMaterialsItem(RawMaterialsItem rawMaterialsItem) {
        this.rawMaterialsItem = rawMaterialsItem;
    }

    public List<RawSampleItem> getRawSampleItemList() {
        return rawSampleItemList;
    }

    public void setRawSampleItemList(List<RawSampleItem> rawSampleItemList) {
        this.rawSampleItemList = rawSampleItemList;
    }

    @Override
    public String toString() {
        return "RawSample{" +
                "id='" + id + '\'' +
                ", laboratorySignatory='" + laboratorySignatory + '\'' +
                ", sendingPerson='" + sendingPerson + '\'' +
                ", checkStateItem=" + checkStateItem +
                ", sampleIdList=" + sampleIdList +
                ", page=" + page +
                ", keywords='" + keywords + '\'' +
                ", newId='" + newId + '\'' +
                ", createTime=" + createTime +
                ", rawMaterialsItem=" + rawMaterialsItem +
                ", rawSampleItemList=" + rawSampleItemList +
                '}';
    }
}
