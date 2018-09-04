package com.jdlink.domain.Produce;

import java.util.Arrays;
import java.util.Date;

public class Ingredients {
    /**
     * 辅料、备件ID
     */
    private int itemId;
    /**
     * 入库单序号/编号
     */
    private String serialNumberIn;
    /**
     * 入库单序号/编号
     */
    private String serialNumberReceive;
    /**
     * 入库单序号/编号
     */
    private String serialNumberOut;
    /**
     * 外键ID
     */
    private String id;
    /**
     * 辅料、备件名称
     */
    private String name;
    /**
     * 规格
     */
    private String specification;
    /**
     * 单位
     */
    private String unit;
    /**
     * 数量（入库数量）
     */
    private float amount;
    /**
     * 单价
     */
    private float unitPrice;
    /**
     * 总额（十万、万、千、百、十、元、角，分）
     */
    private float totalPrice;
    /**
     * 过账信息（输入）
     */
    private String post;
    /**
     * 附注（备注）
     */
    private String remarks;
    /**
     * 仓库名
     */
    private String wareHouseName;
    /**
     * 已领料数量(已出库)
     */
    private float receiveAmount;
    /**
     * 未领料数量（未出库、剩余数量）
     */
    private float notReceiveAmount;
    /**
     * 辅料/备件状态
     */
    private IngredientState ingredientState;

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSerialNumberIn() {
        return serialNumberIn;
    }

    public void setSerialNumberIn(String serialNumberIn) {
        this.serialNumberIn = serialNumberIn;
    }

    public String getSerialNumberReceive() {
        return serialNumberReceive;
    }

    public void setSerialNumberReceive(String serialNumberReceive) {
        this.serialNumberReceive = serialNumberReceive;
    }

    public String getSerialNumberOut() {
        return serialNumberOut;
    }

    public void setSerialNumberOut(String serialNumberOut) {
        this.serialNumberOut = serialNumberOut;
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

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getWareHouseName() {
        return wareHouseName;
    }

    public void setWareHouseName(String wareHouseName) {
        this.wareHouseName = wareHouseName;
    }

    public float getReceiveAmount() {
        return receiveAmount;
    }

    public void setReceiveAmount(float receiveAmount) {
        this.receiveAmount = receiveAmount;
    }

    public float getNotReceiveAmount() {
        return notReceiveAmount;
    }

    public void setNotReceiveAmount(float notReceiveAmount) {
        this.notReceiveAmount = notReceiveAmount;
    }

    public IngredientState getIngredientState() {
        return ingredientState;
    }

    public void setIngredientState(IngredientState ingredientState) {
        this.ingredientState = ingredientState;
    }

    @Override
    public String toString() {
        return "Ingredients{" +
                "itemId=" + itemId +
                ", serialNumberIn='" + serialNumberIn + '\'' +
                ", serialNumberReceive='" + serialNumberReceive + '\'' +
                ", serialNumberOut='" + serialNumberOut + '\'' +
                ", id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", specification='" + specification + '\'' +
                ", unit='" + unit + '\'' +
                ", amount=" + amount +
                ", unitPrice=" + unitPrice +
                ", totalPrice=" + totalPrice +
                ", post='" + post + '\'' +
                ", remarks='" + remarks + '\'' +
                ", wareHouseName='" + wareHouseName + '\'' +
                ", receiveAmount=" + receiveAmount +
                ", notReceiveAmount=" + notReceiveAmount +
                ", ingredientState=" + ingredientState +
                '}';
    }
}
