package com.jdlink.domain.Produce;

import com.jdlink.domain.ApplyState;
import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Page;

import java.util.ArrayList;
import java.util.List;

//污水/软水登记主表
public class Sewageregistration {

    private String laboratorySignatory;//化验室签收人

    private Client client;//公司

    private String sendingPerson;//送样人

    private boolean  water;//true 为污水，false 为软水

    private String address;//采样点

    private Page page;

    private int id;

    //登记状态
    private CheckState checkState;

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }


    private List<SewageregistrationItem> sewageregistrationItemList=new ArrayList<>();

    public List<SewageregistrationItem> getSewageregistrationItemList() {
        return sewageregistrationItemList;
    }

    public void setSewageregistrationItemList(List<SewageregistrationItem> sewageregistrationItemList) {
        this.sewageregistrationItemList = sewageregistrationItemList;
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
