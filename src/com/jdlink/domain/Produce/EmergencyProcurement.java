package com.jdlink.domain.Produce;

import java.util.Date;

public class EmergencyProcurement {
    //申请日期
    private Date applyDate;
    //采购数量
    private float purchaseQuantity;
    //应急备注
    private String emergencyNote;
    //数据类别
    private boolean emergency;

    public Date getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(Date applyDate) {
        this.applyDate = applyDate;
    }

    public float getPurchaseQuantity() {
        return purchaseQuantity;
    }

    public void setPurchaseQuantity(float purchaseQuantity) {
        this.purchaseQuantity = purchaseQuantity;
    }

    public String getEmergencyNote() {
        return emergencyNote;
    }

    public void setEmergencyNote(String emergencyNote) {
        this.emergencyNote = emergencyNote;
    }

    public boolean isEmergency() {
        return emergency;
    }

    public void setEmergency(boolean emergency) {
        this.emergency = emergency;
    }

    @Override
    public String toString() {
        return "EmergencyProcurement{" +
                "applyDate=" + applyDate +
                ", purchaseQuantity=" + purchaseQuantity +
                ", emergencyNote='" + emergencyNote + '\'' +
                ", emergency=" + emergency +
                '}';
    }
}