package com.jdlink.domain.Inventory;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.domain.Produce.ProcessWay;


import java.util.Date;

/**
 * 领料单
 */
public class MaterialRequisitionOrder {
    /*领料单号*/
    private String materialRequisitionId;

    /*领料日期*/
    private Date pickerDate;

    /*联单号*/
    private  String transferDraftId;


    /*配料单对象*/
    private BatchingOrder batchingOrder;

    /*产废单位*/
    private Client client;

    /*废物名称*/
    private String wastesName;

    /*废物类别*/
    private String wasteCategory;

    /*配料数量*/
    private float batchCount;

    /*领用数量*/
    private float recipientsNumber;

    /*进料方式*/
    private HandleCategory handelCategory;

    private String inboundOrderItemId;


    /**
     * 单价
     */
    private float unitPriceTax;

    /*状态*/
    private CheckState checkState;

    /*单位*/
    private  String unit;

    /*仓库*/
    private WareHouse wareHouse;


    /*规格*/
    private  String specification;


    /*附注*/
    private String remarks;


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


    private Page page;


    public String getInboundOrderItemId() {
        return inboundOrderItemId;
    }

    public void setInboundOrderItemId(String inboundOrderItemId) {
        this.inboundOrderItemId = inboundOrderItemId;
    }

    public String getTransferDraftId() {
        return transferDraftId;
    }

    public void setTransferDraftId(String transferDraftId) {
        this.transferDraftId = transferDraftId;
    }

    private ProcessWay processWay;

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }

    public float getBatchCount() {
        return batchCount;
    }

    public void setBatchCount(float batchCount) {
        this.batchCount = batchCount;
    }

    public float getUnitPriceTax() {
        return unitPriceTax;
    }

    public void setUnitPriceTax(float unitPriceTax) {
        this.unitPriceTax = unitPriceTax;
    }

    /**************以下数据结构暂时不用************************/



    /*危废信息
    *
    * 这里为了好拿数据，不用再xml进行多次迭代
    * 2018-09-28 15:12:52 我觉得不好拿
    * */
    private Wastes wastes;

    private RecordState recordState;
    private PackageType packageType;
    private FormType formType;

    private LaboratoryTest laboratoryTest;



    private QuotationItem quotationItem;

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public PackageType getPackageType() {
        return packageType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public RecordState getRecordState() {
        return recordState;
    }

    public void setRecordState(RecordState recordState) {
        this.recordState = recordState;
    }

    public QuotationItem getQuotationItem() {
        return quotationItem;
    }

    public void setQuotationItem(QuotationItem quotationItem) {
        this.quotationItem = quotationItem;
    }

    public HandleCategory getHandelCategory() {
        return handelCategory;
    }

    public void setHandelCategory(HandleCategory handelCategory) {
        this.handelCategory = handelCategory;
    }

    public ProcessWay getProcessWay() {
        return processWay;
    }

    public void setProcessWay(ProcessWay processWay) {
        this.processWay = processWay;
    }

    public String getWasteCategory() {
        return wasteCategory;
    }

    public void setWasteCategory(String wasteCategory) {
        this.wasteCategory = wasteCategory;
    }

    public LaboratoryTest getLaboratoryTest() {
        return laboratoryTest;
    }

    public void setLaboratoryTest(LaboratoryTest laboratoryTest) {
        this.laboratoryTest = laboratoryTest;
    }

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
