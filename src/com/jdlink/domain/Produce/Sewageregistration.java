package com.jdlink.domain.Produce;

import com.jdlink.domain.ApplyState;
import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Dictionary.SewagePointItem;
import com.jdlink.domain.Dictionary.SoftPointItem;
import com.jdlink.domain.Page;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//污水/软水登记主表
public class Sewageregistration {

    private String laboratorySignatory;//化验室签收人

    private Client client;//公司

    private String sendingPerson;//送样人

    private boolean  water;//true 为污水，false 为软水

    private String address;//采样点

    private Page page;

    private String id;

    //登记状态
    private CheckState checkState;

    //原因
    private String advice;

    private List<SewageregistrationItem> sewageregistrationItemList=new ArrayList<>();
    /**
     * 送样日期
     */
    private Date creationDate;

    //关键字
    private String keywords;


    //修改后的ID
    private String newId;

    //
    private Date createTime;

    //状态数据字典
    private CheckStateItem checkStateItem;

    //污水采样点数据字典
    private SewagePointItem sewagePointItem;

    //软水采样点数字字典
    private SoftPointItem softPointItem;


    /*采样时间*/
    private String sampleTime;

    public String getSampleTime() {
        return sampleTime;
    }

    public void setSampleTime(String sampleTime) {
        this.sampleTime = sampleTime;
    }

    /**
     * 一键签收预约单编号数组
     */
    private List<String> sampleIdList;

    public List<String> getSampleIdList() {
        return sampleIdList;
    }

    public void setSampleIdList(List<String> sampleIdList) {
        this.sampleIdList = sampleIdList;
    }

    public SewagePointItem getSewagePointItem() {
        return sewagePointItem;
    }

    public void setSewagePointItem(SewagePointItem sewagePointItem) {
        this.sewagePointItem = sewagePointItem;
    }

    public SoftPointItem getSoftPointItem() {
        return softPointItem;
    }

    public void setSoftPointItem(SoftPointItem softPointItem) {
        this.softPointItem = softPointItem;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getNewId() {
        return newId;
    }

    public void setNewId(String newId) {
        this.newId = newId;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public List<SewageregistrationItem> getSewageregistrationItemList() {
        return sewageregistrationItemList;
    }

    public void setSewageregistrationItemList(List<SewageregistrationItem> sewageregistrationItemList) {
        this.sewageregistrationItemList = sewageregistrationItemList;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
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

    public boolean isWater() {
        return water;
    }

    public void setWater(boolean water) {
        this.water = water;
    }

    public String getLaboratorySignatory() {
        return laboratorySignatory;
    }

    public void setLaboratorySignatory(String laboratorySignatory) {
        this.laboratorySignatory = laboratorySignatory;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getSendingPerson() {
        return sendingPerson;
    }

    public void setSendingPerson(String sendingPerson) {
        this.sendingPerson = sendingPerson;
    }

    @Override
    public String toString() {
        return "Sewageregistration{" +
                "laboratorySignatory='" + laboratorySignatory + '\'' +
                ", client=" + client +
                ", sendingPerson='" + sendingPerson + '\'' +
                '}';
    }
}
