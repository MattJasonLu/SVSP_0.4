package com.jdlink.domain.生产;

import com.jdlink.domain.Wastes;

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
     private String proTelepgone;
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
   private List<Wastes> wastes;

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

    public String getProTelepgone() {
        return proTelepgone;
    }

    public void setProTelepgone(String proTelepgone) {
        this.proTelepgone = proTelepgone;
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

    public List<Wastes> getWastes() {
        return wastes;
    }

    public void setWastes(List<Wastes> wastes) {
        this.wastes = wastes;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "stockId='" + stockId + '\'' +
                ", proContactName='" + proContactName + '\'' +
                ", proTelepgone='" + proTelepgone + '\'' +
                ", transport='" + transport + '\'' +
                ", transportTelephone='" + transportTelephone + '\'' +
                ", plateNumber='" + plateNumber + '\'' +
                ", wastes=" + wastes +
                '}';
    }
}
