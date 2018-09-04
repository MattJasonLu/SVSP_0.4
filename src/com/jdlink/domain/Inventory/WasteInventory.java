package com.jdlink.domain.Inventory;

import com.jdlink.domain.Client;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.domain.Quotation;
import com.jdlink.domain.QuotationItem;
import com.jdlink.domain.Wastes;

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
     * 危废信息(危废名称、危废代码、危废类别、危废数量、单价、总价，计量单位，数量,各种元素)
     */
    private Wastes wastes;
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
     *部门
     */
    private String department;
    /**
     *创建人
     */
    private String creatorId;
    /**
     *创建时间
     */
    private Date creatorDate;
    /**
     * 剩余数量
     */
    private float  leftNumeber;

    /**
     * 化验单对象
     * @return
     */
    /**
     * 报价单明细
     */
    private QuotationItem quotationItem;
    private LaboratoryTest laboratoryTest;
    /**
     * 含税单价
     */
    private float unitPriceTax;
    /**
     * 进料方式
     */
    /**
     * 危废类别
     */
    private String   wastesCategory;
    private HandleCategory handleCategory;

    public String getWastesCategory() {
        return wastesCategory;
    }

    public void setWastesCategory(String wastesCategory) {
        this.wastesCategory = wastesCategory;
    }

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }

    private String transferDraftId;

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
