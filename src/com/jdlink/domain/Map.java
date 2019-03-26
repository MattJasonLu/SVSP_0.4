package com.jdlink.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Map {

    /*主键*/
    private int id;

    /*客户信息*/
    private List<Client> clientList=new ArrayList<>();

    /*创建时间*/
    private Date createTime;

    /*修改时间*/
    private Date ModifyTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Client> getClientList() {
        return clientList;
    }

    public void setClientList(List<Client> clientList) {
        this.clientList = clientList;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getModifyTime() {
        return ModifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        ModifyTime = modifyTime;
    }

    @Override
    public String toString() {
        return "Map{" +
                "id=" + id +
                ", createTime=" + createTime +
                ", ModifyTime=" + ModifyTime +
                '}';
    }
}
