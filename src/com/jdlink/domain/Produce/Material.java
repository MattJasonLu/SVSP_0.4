package com.jdlink.domain.Produce;

import com.jdlink.domain.Inventory.WareHouse;
import com.jdlink.domain.Unit;

import java.util.List;

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
    private Unit unit;
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
     * 采购主键
     */
    private String receiptNumber;
    /**
     * 未入库的数量
     */
    private float outWareHouseAmount;
    /**
     * 已入库的数量和存储的仓库(一个辅料对应若干个仓库)
     */
    private float inWareHouseAmount;
    /**
     * 入库仓库名
     */
    private String wareHouseName;
    /**
     * 入库状态
     */
    private IngredientState ingredientState;


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

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
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

    public float getOutWareHouseAmount() {
        return outWareHouseAmount;
    }

    public void setOutWareHouseAmount(float outWareHouseAmount) {
        this.outWareHouseAmount = outWareHouseAmount;
    }

    public float getInWareHouseAmount() {
        return inWareHouseAmount;
    }

    public void setInWareHouseAmount(float inWareHouseAmount) {
        this.inWareHouseAmount = inWareHouseAmount;
    }

    public String getWareHouseName() {
        return wareHouseName;
    }

    public void setWareHouseName(String wareHouseName) {
        this.wareHouseName = wareHouseName;
    }

    public IngredientState getIngredientState() {
        return ingredientState;
    }

    public void setIngredientState(IngredientState ingredientState) {
        this.ingredientState = ingredientState;
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
