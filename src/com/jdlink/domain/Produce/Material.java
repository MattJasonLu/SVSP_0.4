package com.jdlink.domain.Produce;

/**
 * 物资需求清单
 */
public class Material {
    /**
     * 物资主键
     */
    private int id;

    /**
     * 物资名称(应急同)
     */
    private String suppliesName;

     /**
     * 规格型号(应急同)
     */
    private String specifications;
    /**
     * 单位(应急同)
     */
    private String unit;
    /**
     * 库存量(应急同)
     */
    private float inventory;
    /**
     * 备注
     */
    private String note;

    /**
     * 采购数量
     */
    private float purchaseQuantity;
    /**
     * 需求数量
     */
    private float demandQuantity;

    /**
     *
     * 采购主键
     */
    private String receiptNumber;

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public float getPurchaseQuantity() {

        return purchaseQuantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setPurchaseQuantity(float purchaseQuantity) {
        this.purchaseQuantity = purchaseQuantity;
    }

    public float getDemandQuantity() {
        return demandQuantity;
    }

    public void setDemandQuantity(float demandQuantity) {
        this.demandQuantity = demandQuantity;
    }

    public String getSuppliesName() {
        return suppliesName;
    }

    public void setSuppliesName(String suppliesName) {
        this.suppliesName = suppliesName;
    }

    public String getSpecifications() {
        return specifications;
    }

    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public float getInventory() {
        return inventory;
    }

    public void setInventory(float inventory) {
        this.inventory = inventory;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "Material{" +
                "suppliesName='" + suppliesName + '\'' +
                ", specifications='" + specifications + '\'' +
                ", unit='" + unit + '\'' +
                ", inventory='" + inventory + '\'' +
                ", note='" + note + '\'' +
                ", purchaseQuantity=" + purchaseQuantity +
                ", demandQuantity=" + demandQuantity +
                '}';
    }
}
