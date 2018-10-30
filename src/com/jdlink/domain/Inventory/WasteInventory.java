package com.jdlink.domain.Inventory;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.LaboratoryTest;

import java.util.Date;

/**
 *危废库存
 */
public class WasteInventory {
    /**
     * 入库单号
     */
    private String inboundOrderId;

    /**
     * 库存编号
     */
    private String wasteInventoryId;

    /**
     * 入库日期
     */
    private Date inboundDate;

    /**
     * 产废单位
     */
    private Client produceCompany;

    /**
     * 危废数量
     */
    private float actualCount;

    /**
     * 仓库名称
     */
    private WareHouse wareHouse;


    /**
     * 入库类别
     */
    private BoundType boundType;

    /**
     * 危废名称
     */
    private String wastesName;

    /**
     * 计量单位
     *
     */
    private String unit;


    /*转移联单*/
    private String transferDraftId;

    /**
     * 含税单价
     */
    private float unitPriceTax;
    /**
     * 危废类别
     */
  
    private String  wastesCategory;

    /**
     * 进料方式
     */
    private HandleCategory handleCategory;

    /**
     * 分页
     */
    private Page page;

    /**
     *创建人
     */
    private String creatorId;
    /**
     *创建时间
     */
    private Date creatorDate;

    /***************************以下数据结构暂时不用****************/

    /**
     * 危废信息(危废名称、危废代码、危废类别、危废数量、单价、总价，计量单位，数量,各种元素)
     */
    private Wastes wastes;


    /**
     *部门
     */
    private String department;

    /**
     * 剩余数量
     */
    private float  leftNumeber;
    /**
     * 报价单明细
     */
    private QuotationItem quotationItem;
    /**
     * 化验单对象
     */
    private LaboratoryTest laboratoryTest;



    private String inboundOrderItemId;
    /**
     * 类别（危废、次生）
     */
    private int category;


    private String remarks;

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    /**
     * 可用状态
     */
    private RecordState recordState;


    public RecordState getRecordState() {
        return recordState;
    }

    public void setRecordState(RecordState recordState) {
        this.recordState = recordState;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public String getInboundOrderItemId() {
        return inboundOrderItemId;
    }

    public void setInboundOrderItemId(String inboundOrderItemId) {
        this.inboundOrderItemId = inboundOrderItemId;
    }

    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }

    public String getTransferDraftId() {
        return transferDraftId;
    }

    public void setTransferDraftId(String transferDraftId) {
        this.transferDraftId = transferDraftId;
    }

    public float getUnitPriceTax() {
        return unitPriceTax;
    }

    public void setUnitPriceTax(float unitPriceTax) {
        this.unitPriceTax = unitPriceTax;
    }

    public QuotationItem getQuotationItem() {
        return quotationItem;
    }

    public void setQuotationItem(QuotationItem quotationItem) {
        this.quotationItem = quotationItem;
    }

    public LaboratoryTest getLaboratoryTest() {
        return laboratoryTest;
    }

    public void setLaboratoryTest(LaboratoryTest laboratoryTest) {
        this.laboratoryTest = laboratoryTest;
    }

    public float getLeftNumeber() {
        return leftNumeber;
    }

    public void setLeftNumeber(float leftNumeber) {
        this.leftNumeber = leftNumeber;
    }

    public String getInboundOrderId() {
        return inboundOrderId;
    }

    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
    }

    public void setInboundOrderId(String inboundOrderId) {
        this.inboundOrderId = inboundOrderId;
    }

    public String getWasteInventoryId() {
        return wasteInventoryId;
    }

    public void setWasteInventoryId(String wasteInventoryId) {
        this.wasteInventoryId = wasteInventoryId;
    }

    public Date getInboundDate() {
        return inboundDate;
    }

    public void setInboundDate(Date inboundDate) {
        this.inboundDate = inboundDate;
    }

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
    }

    public float getActualCount() {
        return actualCount;
    }

    public void setActualCount(float actualCount) {
        this.actualCount = actualCount;
    }

    public WareHouse getWareHouse() {
        return wareHouse;
    }

    public void setWareHouse(WareHouse wareHouse) {
        this.wareHouse = wareHouse;
    }

    public BoundType getBoundType() {
        return boundType;
    }

    public void setBoundType(BoundType boundType) {
        this.boundType = boundType;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public Date getCreatorDate() {
        return creatorDate;
    }

    public void setCreatorDate(Date creatorDate) {
        this.creatorDate = creatorDate;
    }

    @Override
    public String toString() {
        return "WasteInventory{" +
                "inboundOrderId='" + inboundOrderId + '\'' +
                ", wasteInventoryId='" + wasteInventoryId + '\'' +
                ", inboundDate=" + inboundDate +
                ", produceCompany=" + produceCompany +
                ", wastes=" + wastes +
                ", actualCount=" + actualCount +
                ", wareHouse=" + wareHouse +
                ", boundType=" + boundType +
                ", department='" + department + '\'' +
                ", creatorId='" + creatorId + '\'' +
                ", creatorDate=" + creatorDate +
                '}';
    }
}
