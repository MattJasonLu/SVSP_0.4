package com.jdlink.domain.Inventory;

import java.util.Date;

/*领料单*/
public class MaterialRequisitionOrder {
    /*配料单对象*/
    private BatchingOrder batchingOrder;
    /*领料单号*/
    private String materialRequisitionId;
    /*规格*/
    private  String specification;
    /*单位*/
    private  String unit;
    /*附注*/
    private String remarks;
    /*仓库*/
    private WareHouse wareHouse;
    /*保管员*/
    private String  guardian;
    /*仓库部门主管*/
    private String warehouseManager;
    /*领料部门主管*/
    private String materialManager;
    /*领料人*/
    private String picker;
    /*领料日期*/
    private Date pickerDate;

    public Date getPickerDate() {
        return pickerDate;
    }

    public void setPickerDate(Date pickerDate) {
        this.pickerDate = pickerDate;
    }

    @Override
    public String toString() {
        return "MaterialRequisitionOrder{" +
                "batchingOrder=" + batchingOrder +
                ", materialRequisitionId='" + materialRequisitionId + '\'' +
                ", specification='" + specification + '\'' +
                ", unit='" + unit + '\'' +
                ", remarks='" + remarks + '\'' +
                ", wareHouse=" + wareHouse +
                ", guardian='" + guardian + '\'' +
                ", warehouseManager='" + warehouseManager + '\'' +
                ", materialManager='" + materialManager + '\'' +
                ", picker='" + picker + '\'' +
                ", pickerDate=" + pickerDate +
                '}';
    }

    public String getGuardian() {
        return guardian;
    }

    public void setGuardian(String guardian) {
        this.guardian = guardian;
    }

    public String getWarehouseManager() {
        return warehouseManager;
    }

    public void setWarehouseManager(String warehouseManager) {
        this.warehouseManager = warehouseManager;
    }

    public String getMaterialManager() {
        return materialManager;
    }

    public void setMaterialManager(String materialManager) {
        this.materialManager = materialManager;
    }

    public String getPicker() {
        return picker;
    }

    public void setPicker(String picker) {
        this.picker = picker;
    }

    public WareHouse getWareHouse() {
        return wareHouse;
    }

    public void setWareHouse(WareHouse wareHouse) {
        this.wareHouse = wareHouse;
    }
    public BatchingOrder getBatchingOrder() {
        return batchingOrder;
    }

    public void setBatchingOrder(BatchingOrder batchingOrder) {
        this.batchingOrder = batchingOrder;
    }

    public String getMaterialRequisitionId() {
        return materialRequisitionId;
    }

    public void setMaterialRequisitionId(String materialRequisitionId) {
        this.materialRequisitionId = materialRequisitionId;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

}
