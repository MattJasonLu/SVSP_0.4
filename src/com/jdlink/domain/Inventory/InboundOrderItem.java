package com.jdlink.domain.Inventory;

import com.jdlink.domain.Client;
import com.jdlink.domain.FormType;
import com.jdlink.domain.PackageType;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.domain.Produce.ProcessWay;
import com.jdlink.domain.Wastes;

/**
 * Created by matt on 2018/8/20.
 * DoubleClickTo 666
 */
public class InboundOrderItem {
    /**
     * 联单编号
     */
    private String transferDraftId;
    /**
     * 入库单明细编号
     */
    private String inboundOrderItemId;
    /**
     * 入库单号
     */
    private String inboundOrderId;
    /**
     * 入库计划单号
     */
    private String inboundPlanOrderId;
    /**
     * 产废单位
     */
    private Client produceCompany;
    /**
     * 危废(危废名称、危废代码、危废类别)
     */
    private Wastes wastes;
    /**
     * 危废数量
     */
    private float wastesAmount;
    /**
     * 单价
     */
    private float unitPriceTax;
    /**
     * 总价金额
     */
    private float totalPrice;
    /**
     * 处理方式
     */
    private ProcessWay processWay;
    /**
     * 进料方式
     */
    private HandleCategory handleCategory;
    /**
     * 物质形态
     */
    private FormType formType;
    /**
     * 包装方式
     */
    private PackageType packageType;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 库区
     */
    private String warehouseArea;
    /**
     * 记录状态
     */
    private RecordState recordState;
    /**
     * 化验单
     */
    private LaboratoryTest laboratoryTest;
    /**
     * 化验结果是否合格
     */
    private boolean isQualified;

    public String getTransferDraftId() {
        return transferDraftId;
    }

    public void setTransferDraftId(String transferDraftId) {
        this.transferDraftId = transferDraftId;
    }

    public String getInboundOrderItemId() {
        return inboundOrderItemId;
    }

    public void setInboundOrderItemId(String inboundOrderItemId) {
        this.inboundOrderItemId = inboundOrderItemId;
    }

    public String getInboundOrderId() {
        return inboundOrderId;
    }

    public void setInboundOrderId(String inboundOrderId) {
        this.inboundOrderId = inboundOrderId;
    }

    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
    }

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
    }

    public ProcessWay getProcessWay() {
        return processWay;
    }

    public void setProcessWay(ProcessWay processWay) {
        this.processWay = processWay;
    }

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getWarehouseArea() {
        return warehouseArea;
    }

    public void setWarehouseArea(String warehouseArea) {
        this.warehouseArea = warehouseArea;
    }

    public RecordState getRecordState() {
        return recordState;
    }

    public void setRecordState(RecordState recordState) {
        this.recordState = recordState;
    }

    public boolean getIsQualified() {
        return isQualified;
    }

    public void setIsQualified(boolean qualified) {
        isQualified = qualified;
    }

    public String getInboundPlanOrderId() {
        return inboundPlanOrderId;
    }

    public void setInboundPlanOrderId(String inboundPlanOrderId) {
        this.inboundPlanOrderId = inboundPlanOrderId;
    }

    public float getWastesAmount() {
        return wastesAmount;
    }

    public void setWastesAmount(float wastesAmount) {
        this.wastesAmount = wastesAmount;
    }

    public float getUnitPriceTax() {
        return unitPriceTax;
    }

    public void setUnitPriceTax(float unitPriceTax) {
        this.unitPriceTax = unitPriceTax;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LaboratoryTest getLaboratoryTest() {
        return laboratoryTest;
    }

    public void setLaboratoryTest(LaboratoryTest laboratoryTest) {
        this.laboratoryTest = laboratoryTest;
    }

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public PackageType getPackageType() {
        return packageType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    @Override
    public String toString() {
        return "InboundOrderItem{" +
                "inboundOrderItemId='" + inboundOrderItemId + '\'' +
                ", inboundOrderId='" + inboundOrderId + '\'' +
                ", inboundPlanOrderId='" + inboundPlanOrderId + '\'' +
                ", produceCompany=" + produceCompany +
                ", wastes=" + wastes +
                ", wastesAmount=" + wastesAmount +
                ", unitPriceTax=" + unitPriceTax +
                ", totalPrice=" + totalPrice +
                ", processWay=" + processWay +
                ", handleCategory=" + handleCategory +
                ", remarks='" + remarks + '\'' +
                ", warehouseArea='" + warehouseArea + '\'' +
                ", recordState=" + recordState +
                ", isQualified=" + isQualified +
                '}';
    }
}
