package com.jdlink.domain.Inventory;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.domain.Produce.ProcessWay;

import java.util.Date;
import java.util.List;

/*配料单*/
   public class BatchingOrder {
    /*配料单号*/
    private String batchingOrderId;
    /*配料日期*/
    private Date  batchingDate;
    /*创建人*/
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    /**
     * 页码
     * @return
     */
    private Page page;


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

    /*领料状态*/
    private CheckState checkState;
    /*记录状态*/
    private  RecordState recordState;
    /*危废库存*/
//    private WasteInventory wasteInventory;
    /*入库单对象*/
    private InboundOrder inboundOrder;

    public InboundOrder getInboundOrder() {
        return inboundOrder;
    }

    public void setInboundOrder(InboundOrder inboundOrder) {
        this.inboundOrder = inboundOrder;
    }

    /*配料数量*/
    private HandleCategory handelCategory;
    private ProcessWay processWay;
    private float batchingNumber;
    private LaboratoryTest laboratoryTest;




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
                ", checkState=" + checkState +
                ", recordState=" + recordState +
                ", batchingNumber=" + batchingNumber +
                '}';
    }
}
