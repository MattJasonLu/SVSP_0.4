package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Page;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SecondarySample {

    private String laboratorySignatory;//化验室签收人

    private Client client;//公司

    private String sendingPerson;//送样人


    private String address;//采样点

    private Page page;

    private String id;

    //登记状态
    private CheckState checkState;

    //原因
    private String advice;

    private List<SecondarySampleItem> secondarySampleItemList=new ArrayList<>();
    /**
     * 送样日期
     */
    private Date creationDate;

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public List<SecondarySampleItem> getSecondarySampleItemList() {
        return secondarySampleItemList;
    }

    public void setSecondarySampleItemList(List<SecondarySampleItem> secondarySampleItemList) {
        this.secondarySampleItemList = secondarySampleItemList;
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



    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    @Override
    public String toString() {
        return "SecondarySample{" +
                "laboratorySignatory='" + laboratorySignatory + '\'' +
                ", client=" + client +
                ", sendingPerson='" + sendingPerson + '\'' +
                ", address='" + address + '\'' +
                ", page=" + page +
                ", id=" + id +
                ", checkState=" + checkState +
                ", advice='" + advice + '\'' +
                '}';
    }
}
