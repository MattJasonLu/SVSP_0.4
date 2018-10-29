package com.jdlink.domain.Inventory;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.domain.Produce.ProcessWay;

import java.util.Date;
import java.util.List;

/**
 * 配料单
 */
public class BatchingOrder {

    /*配料单号*/
    private String batchingOrderId;

    /*配料日期*/
    private Date  batchingDate;

    /*配料人*/
    private String creator;

    /*创建日期*/
    private Date createDate;

    /*备注*/
    private String remarks;

    /*仓库*/
    private WareHouse wareHouse;

    /*产废单位*/
    private Client produceCompany;

    /*接收单位*/
    private Client acceptCompany;

    /*联单号*/
    private  String transferDraftId;

    /*创建部门*/
    private String departmentId;

    /*创建公司*/
    private String companyId;

    /*修改人*/
    private String modifierId;

    /*业务员 来自产废单位的业务员*/
//    private Salesman salesman;
    private Wastes wastes;

    private String inboundOrderItemId;

    private PackageType packageType;

    private FormType formType;

    private String time;

    /*状态*/
    private CheckState checkState;

    /*记录状态*/
    private  RecordState recordState;
    /*危废库存*/
//    private WasteInventory wasteInventory;
    /*入库单对象*/
    private InboundOrder inboundOrder;
    /**
     * 页码
     */
    private Page page;

    /*配料数量*/
    private HandleCategory handelCategory;

    private ProcessWay processWay;

    private float batchingNumber;

    private LaboratoryTest laboratoryTest;

    //废物名称
    private String wastesName;

    //类别
    private String wasteCategory;

    //1号入库量
    private float storage1;

    //2号入库量
    private float storage2;

    //智能库入库量
    private float intelligent;

    //1号库配料量
    private float storage1Batch;

    //2号库配料量
    private float storage2Batch;

    //智能库配料量
    private float intelligentBatch;

    //余量
    private float allowance;

    //入库日期
    private Date inboundOrderDate;

    public Date getInboundOrderDate() {
        return inboundOrderDate;
    }

    public void setInboundOrderDate(Date inboundOrderDate) {
        this.inboundOrderDate = inboundOrderDate;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }


    public String getWasteCategory() {
        return wasteCategory;
    }

    public void setWasteCategory(String wasteCategory) {
        this.wasteCategory = wasteCategory;
    }

    public float getStorage1() {
        return storage1;
    }

    public void setStorage1(float storage1) {
        this.storage1 = storage1;
    }

    public float getStorage2() {
        return storage2;
    }

    public void setStorage2(float storage2) {
        this.storage2 = storage2;
    }

    public float getIntelligent() {
        return intelligent;
    }

    public void setIntelligent(float intelligent) {
        this.intelligent = intelligent;
    }

    public float getStorage1Batch() {
        return storage1Batch;
    }

    public void setStorage1Batch(float storage1Batch) {
        this.storage1Batch = storage1Batch;
    }

    public float getStorage2Batch() {
        return storage2Batch;
    }

    public void setStorage2Batch(float storage2Batch) {
        this.storage2Batch = storage2Batch;
    }

    public float getIntelligentBatch() {
        return intelligentBatch;
    }

    public void setIntelligentBatch(float intelligentBatch) {
        this.intelligentBatch = intelligentBatch;
    }

    public float getAllowance() {
        return allowance;
    }

    public void setAllowance(float allowance) {
        this.allowance = allowance;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public PackageType getPackageType() {
        return packageType;
    }

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    public String getInboundOrderItemId() {
        return inboundOrderItemId;
    }

    public void setInboundOrderItemId(String inboundOrderItemId) {
        this.inboundOrderItemId = inboundOrderItemId;
    }

    public HandleCategory getHandelCategory() {
        return handelCategory;
    }

    public void setHandelCategory(HandleCategory handelCategory) {
        this.handelCategory = handelCategory;
    }

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
    }

//    public Salesman getSalesman() {
//        return salesman;
//    }
//
//    public void setSalesman(Salesman salesman) {
//        this.salesman = salesman;
//    }

    public InboundOrder getInboundOrder() {
        return inboundOrder;
    }

    public void setInboundOrder(InboundOrder inboundOrder) {
        this.inboundOrder = inboundOrder;
    }

    public ProcessWay getProcessWay() {
        return processWay;
    }

    public void setProcessWay(ProcessWay processWay) {
        this.processWay = processWay;
    }

    public LaboratoryTest getLaboratoryTest() {
        return laboratoryTest;
    }

    public void setLaboratoryTest(LaboratoryTest laboratoryTest) {
        this.laboratoryTest = laboratoryTest;
    }

//    public InboundOrder getInboundOrder() {
//        return inboundOrder;
//    }
//
//    public void setInboundOrder(InboundOrder inboundOrder) {
//        this.inboundOrder = inboundOrder;
//    }

    public float getBatchingNumber() {
        return batchingNumber;
    }

    public void setBatchingNumber(float batchingNumber) {
        this.batchingNumber = batchingNumber;
    }

//    public WasteInventory getWasteInventory() {
//        return wasteInventory;
//    }
//
//    public void setWasteInventory(WasteInventory wasteInventory) {
//        this.wasteInventory = wasteInventory;
//    }

    /*领料单对象
    * 1:N
    * */
//    private List<MaterialRequisitionOrder> materialRequisitionOrderList;
    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
    }

    public Client getAcceptCompany() {
        return acceptCompany;
    }

    public void setAcceptCompany(Client acceptCompany) {
        this.acceptCompany = acceptCompany;
    }

    public String getTransferDraftId() {
        return transferDraftId;
    }

    public void setTransferDraftId(String transferDraftId) {
        this.transferDraftId = transferDraftId;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getModifierId() {
        return modifierId;
    }

    public void setModifierId(String modifierId) {
        this.modifierId = modifierId;
    }
    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public RecordState getRecordState() {
        return recordState;
    }

    public void setRecordState(RecordState recordState) {
        this.recordState = recordState;
    }

    public WareHouse getWareHouse() {
        return wareHouse;
    }

    public void setWareHouse(WareHouse wareHouse) {
        this.wareHouse = wareHouse;
    }


    public String getBatchingOrderId() {
        return batchingOrderId;
    }

    public void setBatchingOrderId(String batchingOrderId) {
        this.batchingOrderId = batchingOrderId;
    }

    public Date getBatchingDate() {
        return batchingDate;
    }

    public void setBatchingDate(Date batchingDate) {
        this.batchingDate = batchingDate;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

//    public List<MaterialRequisitionOrder> getMaterialRequisitionOrderList() {
//        return materialRequisitionOrderList;
//    }
//
//    public void setMaterialRequisitionOrderList(List<MaterialRequisitionOrder> materialRequisitionOrderList) {
//        this.materialRequisitionOrderList = materialRequisitionOrderList;
//    }

    @Override
    public String toString() {
        return "BatchingOrder{" +
                "batchingOrderId='" + batchingOrderId + '\'' +
                ", batchingDate=" + batchingDate +
                ", creator='" + creator + '\'' +
                ", createDate=" + createDate +
                ", remarks='" + remarks + '\'' +
                ", wareHouse=" + wareHouse +
                ", produceCompany=" + produceCompany +
                ", acceptCompany=" + acceptCompany +
                ", transferDraftId='" + transferDraftId + '\'' +
                ", departmentId='" + departmentId + '\'' +
                ", companyId='" + companyId + '\'' +
                ", modifierId='" + modifierId + '\'' +
                ", wastes=" + wastes +
                ", inboundOrderItemId='" + inboundOrderItemId + '\'' +
                ", packageType=" + packageType +
                ", formType=" + formType +
                ", time='" + time + '\'' +
                ", checkState=" + checkState +
                ", recordState=" + recordState +
                ", inboundOrder=" + inboundOrder +
                ", page=" + page +
                ", handelCategory=" + handelCategory +
                ", processWay=" + processWay +
                ", batchingNumber=" + batchingNumber +
                ", laboratoryTest=" + laboratoryTest +
                ", wastesName='" + wastesName + '\'' +
                ", wasteCategory='" + wasteCategory + '\'' +
                ", storage1=" + storage1 +
                ", storage2=" + storage2 +
                ", intelligent=" + intelligent +
                ", storage1Batch=" + storage1Batch +
                ", storage2Batch=" + storage2Batch +
                ", intelligentBatch=" + intelligentBatch +
                ", allowance=" + allowance +
                '}';
    }
}
