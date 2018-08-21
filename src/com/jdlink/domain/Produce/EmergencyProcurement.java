package com.jdlink.domain.Produce;

import java.util.Date;

public class EmergencyProcurement {
    //申请日期
    private Date applyDate;
    //采购数量
    private Date purchaseQuantity;
    //应急备注
    private Date emergencyNote;

    public Date getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(Date applyDate) {
        this.applyDate = applyDate;
    }

    public Date getPurchaseQuantity() {
        return purchaseQuantity;
    }

    public void setPurchaseQuantity(Date purchaseQuantity) {
        this.purchaseQuantity = purchaseQuantity;
    }

    public Date getEmergencyNote() {
        return emergencyNote;
    }

    public void setEmergencyNote(Date emergencyNote) {
        this.emergencyNote = emergencyNote;
    }

    @Override
    public String toString() {
        return "EmergencyProcurement{" +
                "applyDate=" + applyDate +
                ", purchaseQuantity=" + purchaseQuantity +
                ", emergencyNote=" + emergencyNote +
                '}';
    }
}