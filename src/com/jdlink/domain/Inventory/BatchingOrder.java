package com.jdlink.domain.Inventory;

import java.util.Date;

/*配料单*/
public class BatchingOrder {
    /*配料单号*/
    private String batchingOrderId;
    /*配料日期*/
    private Date  batchigDate;
    /*创建人*/
    private String founder;
    /*创建日期*/
    Date founderDate;
    /*备注*/
    private String remarks;
    /*仓库*/
    private WareHouse wareHouse;

    public WareHouse getWareHouse() {
        return wareHouse;
    }

    public void setWareHouse(WareHouse wareHouse) {
        this.wareHouse = wareHouse;
    }

    /*明细*/
    public String getBatchingOrderId() {
        return batchingOrderId;
    }

    public void setBatchingOrderId(String batchingOrderId) {
        this.batchingOrderId = batchingOrderId;
    }

    public Date getBatchigDate() {
        return batchigDate;
    }

    public void setBatchigDate(Date batchigDate) {
        this.batchigDate = batchigDate;
    }

    public String getFounder() {
        return founder;
    }

    public void setFounder(String founder) {
        this.founder = founder;
    }

    public Date getFounderDate() {
        return founderDate;
    }

    public void setFounderDate(Date founderDate) {
        this.founderDate = founderDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    @Override
    public String toString() {
        return "BatchingOrder{" +
                "batchingOrderId='" + batchingOrderId + '\'' +
                ", batchigDate=" + batchigDate +
                ", founder='" + founder + '\'' +
                ", founderDate=" + founderDate +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}
