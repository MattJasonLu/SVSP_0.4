package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Wastes;

import java.util.ArrayList;
import java.util.List;

/**
 *库存申报
 */

public class Stock {
    /**
     *库存申报ID
     */
    private  String stockId;
    /**
     *产废联系人
     */
     private String proContactName;
    /**
     *产废联系电话
     */
     private String proTelephone;
    /**
     *运输公司
     */
     private  String transport;
    /**
     *运输公司联系电话
     */
    private  String transportTelephone;
    /**
     *车牌号
     */
    private  String plateNumber;
    /**
    * 危废列表
     */
   private List<Wastes> wastesList=new ArrayList<>();

    public List<Wastes> getWastesList() {
        return wastesList;
    }

    public void setWastesList(List<Wastes> wastesList) {
        this.wastesList = wastesList;
    }

    /**
     * 是否自营
     */
    private boolean selfEmployed;
   //是否需要添加
    private String addType;
    /**
     * 状态
     */
    private CheckState checkState;


    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public String getAddType() {
        return addType;
    }

    public void setAddType(String addType) {
        this.addType = addType;
    }

    public boolean isSelfEmployed() {
        return selfEmployed;
    }

    public void setSelfEmployed(boolean selfEmployed) {
        this.selfEmployed = selfEmployed;
    }

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
    }

    public String getProContactName() {
        return proContactName;
    }

    public void setProContactName(String proContactName) {
        this.proContactName = proContactName;
    }

    public String getProTelephone() {
        return proTelephone;
    }

    public void setProTelephone(String proTelephone) {
        this.proTelephone = proTelephone;
    }

    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }

    public String getTransportTelephone() {
        return transportTelephone;
    }

    public void setTransportTelephone(String transportTelephone) {
        this.transportTelephone = transportTelephone;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }


    @Override
    public String toString() {
        return "Stock{" +
                "stockId='" + stockId + '\'' +
                ", proContactName='" + proContactName + '\'' +
                ", proTelepgone='" + proTelephone + '\'' +
                ", transport='" + transport + '\'' +
                ", transportTelephone='" + transportTelephone + '\'' +
                ", plateNumber='" + plateNumber + '\'' +
                ", wastes=" + wastesList +
                '}';
    }
}
