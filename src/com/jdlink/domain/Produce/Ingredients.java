package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;

import java.util.Arrays;
import java.util.Date;

/**
 * 辅料备件数据结构
 */
public class Ingredients {
    /**
     * 辅料、备件ID
     */
    private int itemId;
    /**
     * 序号/编号
     */
    private String serialNumber;
    /**
     * 外键ID
     */
    private String id;
    /**
     * 采购申请单ID
     */
    private String procurementId;
    /**
     * 采购申请单物料明细ID
     */
    private String procurementItemId;
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
     * 已领料数量(已出库数量)
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
    /**
     * 用于储存第二外键Id/用于判断库存中同种物品同仓库中是否存在
     */
    private String aid;
    /**
     * 用于储存第二序号
     */
    private String serialNumberA;
    /**
     * 模糊查询关键字
     */
    private String keywords;
    /**
     * 处置设备
     */
    private Equipment equipment;
    /**
     * 分页
     */
    private Page page;
    /**
     * 单位名
     */
    private String companyName;
    /**
     * 部门
     */
    private String department;
    /**
     * 入库日期/创建日期
     */
    private Date creationDate;
    /**
     * 单据状态
     */
    private CheckState state;
    /**
     * 日期查询 起始时间
     */
    private Date startDate;
    /**
     * 日期查询 终止时间
     */
    private Date endDate;
    /**
     * 旧仓库名（用于修改入库单仓库）
     */
    private String oldWareHouseName;

    public String getOldWareHouseName() {
        return oldWareHouseName;
    }

    public void setOldWareHouseName(String oldWareHouseName) {
        this.oldWareHouseName = oldWareHouseName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getProcurementId() {
        return procurementId;
    }

    public void setProcurementId(String procurementId) {
        this.procurementId = procurementId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getProcurementItemId() {
        return procurementItemId;
    }

    public void setProcurementItemId(String procurementItemId) {
        this.procurementItemId = procurementItemId;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public CheckState getState() {
        return state;
    }

    public void setState(CheckState state) {
        this.state = state;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

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

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
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

    public String getAid() {
        return aid;
    }

    public void setAid(String aid) {
        this.aid = aid;
    }

    public String getSerialNumberA() {
        return serialNumberA;
    }

    public void setSerialNumberA(String serialNumberA) {
        this.serialNumberA = serialNumberA;
    }

    @Override
    public String toString() {
        return "Ingredients{" +
                "itemId=" + itemId +
                ", serialNumber='" + serialNumber + '\'' +
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
