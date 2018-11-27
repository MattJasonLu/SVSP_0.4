package com.jdlink.domain.Produce;


import java.util.Date;

public class EquipmentItem {
    /**
     * 主键
     */
    private String itemID;
    /**
     * 外键：单据号
     */
    private String documentNumber;
    /**
     * 故障设备
     */
    private Equipment equipment;
    /**
     * 运行时间(h)
     */
    private float runningTime;
    /**
     * 停止时间(h)
     */
    private float stopTime;
    /**
     * 停止原因
     */
    private String stopResult;

    public String getItemID() {
        return itemID;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public float getRunningTime() {
        return runningTime;
    }

    public void setRunningTime(float runningTime) {
        this.runningTime = runningTime;
    }

    public float getStopTime() {
        return stopTime;
    }

    public void setStopTime(float stopTime) {
        this.stopTime = stopTime;
    }

    public String getStopResult() {
        return stopResult;
    }

    public void setStopResult(String stopResult) {
        this.stopResult = stopResult;
    }

    @Override
    public String toString() {
        return "EquipmentDataItem{" +
                "documentNumber='" + documentNumber + '\'' +
                ", equipment='" + equipment + '\'' +
                ", runningTime=" + runningTime +
                ", stopTime=" + stopTime +
                ", stopResult='" + stopResult + '\'' +
                '}';
    }
}
