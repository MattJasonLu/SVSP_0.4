package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Dictionary.EquipmentDataItem;
import com.jdlink.domain.Dictionary.IngredientStateItem;
import com.jdlink.domain.Dictionary.UnitDataItem;
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
     * 物品编码
     */
    private String code;
    /**
     * 规格
     */
    private String specification;
    /**
     * 计量单位
     */
    private String unit;
    /**
     * 数量（入库数量）(库存表中用于表示库存量)
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
    /**
     * 旧领料数
     */
    private float oldReceiveAmount;
    /**
     * 单位数据字典
     * @return
     */
    private UnitDataItem unitDataItem;
    /**
     *状态数据字典
     * @return
     */
    private CheckStateItem checkStateItem;

    /**
     * 处置设备数据字典
     * @return
     */
    private EquipmentDataItem equipmentDataItem;

    /**
     * 辅料/备件状态数据字典
     */
    private IngredientStateItem ingredientStateItem;
    /**
     * 入库单号
     */
    private String inId;
    /**
     * 入库单明细ID
     */
    private int inItemId;
    /**
     * 领料单号
     */
    private String receiveId;
    /**
     * 领料单明细ID
     */
    private int receiveItemId;
    /**
     * 入库数量
     */
    private float inAmount;
    /**
     * 入库单价
     */
    private float inPrice;
    /**
     * 领料单价
     */
    private float receivePrice;
    /**
     * 出库单编号
     */
    private String outId;
    /**
     * 出库单明细ID
     */
    private int outItemId;
    /**
     * 出库数量
     */
    private float outAmount;
    /**
     * 出库单价
     */
    private float outPrice;

    public String getInId() {
        return inId;
    }

    public void setInId(String inId) {
        this.inId = inId;
    }

    public int getInItemId() {
        return inItemId;
    }

    public void setInItemId(int inItemId) {
        this.inItemId = inItemId;
    }

    public String getReceiveId() {
        return receiveId;
    }

    public void setReceiveId(String receiveId) {
        this.receiveId = receiveId;
    }

    public int getReceiveItemId() {
        return receiveItemId;
    }

    public void setReceiveItemId(int receiveItemId) {
        this.receiveItemId = receiveItemId;
    }

    public float getInAmount() {
        return inAmount;
    }

    public void setInAmount(float inAmount) {
        this.inAmount = inAmount;
    }

    public float getInPrice() {
        return inPrice;
    }

    public void setInPrice(float inPrice) {
        this.inPrice = inPrice;
    }

    public float getReceivePrice() {
        return receivePrice;
    }

    public void setReceivePrice(float receivePrice) {
        this.receivePrice = receivePrice;
    }

    public String getOutId() {
        return outId;
    }

    public void setOutId(String outId) {
        this.outId = outId;
    }

    public int getOutItemId() {
        return outItemId;
    }

    public void setOutItemId(int outItemId) {
        this.outItemId = outItemId;
    }

    public float getOutAmount() {
        return outAmount;
    }

    public void setOutAmount(float outAmount) {
        this.outAmount = outAmount;
    }

    public float getOutPrice() {
        return outPrice;
    }

    public void setOutPrice(float outPrice) {
        this.outPrice = outPrice;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public IngredientStateItem getIngredientStateItem() {
        return ingredientStateItem;
    }

    public void setIngredientStateItem(IngredientStateItem ingredientStateItem) {
        this.ingredientStateItem = ingredientStateItem;
    }

    public EquipmentDataItem getEquipmentDataItem() {
        return equipmentDataItem;
    }

    public void setEquipmentDataItem(EquipmentDataItem equipmentDataItem) {
        this.equipmentDataItem = equipmentDataItem;
    }


    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    public UnitDataItem getUnitDataItem() {
        return unitDataItem;
    }

    public void setUnitDataItem(UnitDataItem unitDataItem) {
        this.unitDataItem = unitDataItem;
    }

    public float getOldReceiveAmount() {
        return oldReceiveAmount;
    }

    public void setOldReceiveAmount(float oldReceiveAmount) {
        this.oldReceiveAmount = oldReceiveAmount;
    }

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
