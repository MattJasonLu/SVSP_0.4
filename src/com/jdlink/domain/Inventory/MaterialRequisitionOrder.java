package com.jdlink.domain.Inventory;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Wastes;
import com.sun.security.ntlm.Client;

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
    /*部门*/
    private String departmentName;
    /*主管副总经理:*/
   private  String deputyGeneral;
    /*仓库部门主管*/
    private String warehouseManager;
    /*领料部门主管*/
    private String materialManager;
    /*领料人*/
    private String picker;
    /*领料日期*/
    private Date pickerDate;
    /*领用数量*/
    private float recipientsNumber;
   /*状态*/
    private CheckState checkState;
    /*危废信息
    *
    * 这里为了好拿数据，不用再xml进行多次迭代
    * */
    private Wastes wastes;
    /*产废单位*/
    private Client client;

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
    }

    public float getRecipientsNumber() {
        return recipientsNumber;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public void setRecipientsNumber(float recipientsNumber) {
        this.recipientsNumber = recipientsNumber;
    }

    public Date getPickerDate() {
        return pickerDate;
    }

    public void setPickerDate(Date pickerDate) {
        this.pickerDate = pickerDate;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDeputyGeneral() {
        return deputyGeneral;
    }

    public void setDeputyGeneral(String deputyGeneral) {
        this.deputyGeneral = deputyGeneral;
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
                ", departmentName='" + departmentName + '\'' +
                ", deputyGeneral='" + deputyGeneral + '\'' +
                ", warehouseManager='" + warehouseManager + '\'' +
                ", materialManager='" + materialManager + '\'' +
                ", picker='" + picker + '\'' +
                ", pickerDate=" + pickerDate +
                ", recipientsNumber=" + recipientsNumber +
                ", checkState=" + checkState +
                ", wastes=" + wastes +
                ", client=" + client +
                '}';
    }
}
