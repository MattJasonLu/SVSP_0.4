package com.jdlink.domain.Inventory;
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
                '}';
    }
}
