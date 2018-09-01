package com.jdlink.domain.Produce;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Procurement {
    /**
     * 物资类别(应急同)
     */
    private String suppliesCategory;
    /**
     * 申请单编号
     */
    private String receiptNumber;
    /**
     * 申请月份
     */
    private String applyMouth;

    /**
     * 需求时间(应急同)
     */
    private Date demandTime;
    /**
     * 申请部门
     */
    private String applyDepartment;
//    /**
//     * 需求数量(应急同)
//     */
//    private float demandQuantity;
    /**
     * 申购部门负责人
     */
    private String proposer;
    /**
     * 申购部门分管领导
     */
    private String divisionHead;
    /**
     * 采购部门负责人
     */
    private String purchasingDirector;
    /**
     * 采购部门分管领导
     */
    private String purchasingHead;
    /**
     * 总经理
     */
    private String generalManager;
    /**
     * 编号
     */
    private String Id1;
    /**
     * 序号
     */
    private float Id2;
    /**
     *物资需求清单列表
     *
     */
    List<Material> materialList=new ArrayList<>();

    public List<Material> getMaterialList() {
        return materialList;
    }

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public void setDemandTime(Date demandTime) {
        this.demandTime = demandTime;
    }

    public void setMaterialList(List<Material> materialList) {
        this.materialList = materialList;
    }

    public Date getDemandTime() {
        return demandTime;
    }
    //    /**
//     * 物资名称(应急同)
//     */
//    private String suppliesName;
//    /**
//     * 规格型号(应急同)
//     */
//    private String specifications;
//    /**
//     * 单位(应急同)
//     */
//    private String unit;
//    /**
//     * 库存量(应急同)
//     */
//    private String inventory;
//    /**
//     * 备注
//     */
//    private String note;
    /**
     * 采购类别(true 为月季采购，false为应急采购)
     */
    private boolean procurementCategory;

    public String getSuppliesCategory() {
        return suppliesCategory;
    }

    public void setSuppliesCategory(String suppliesCategory) {
        this.suppliesCategory = suppliesCategory;
    }

    public String getApplyMouth() {
        return applyMouth;
    }

    public void setApplyMouth(String applyMouth) {
        this.applyMouth = applyMouth;
    }

    public String getApplyDepartment() {
        return applyDepartment;
    }

    public void setApplyDepartment(String applyDepartment) {
        this.applyDepartment = applyDepartment;
    }



    public String getProposer() {
        return proposer;
    }

    public void setProposer(String proposer) {
        this.proposer = proposer;
    }

    public String getDivisionHead() {
        return divisionHead;
    }

    public void setDivisionHead(String divisionHead) {
        this.divisionHead = divisionHead;
    }

    public String getPurchasingDirector() {
        return purchasingDirector;
    }

    public void setPurchasingDirector(String purchasingDirector) {
        this.purchasingDirector = purchasingDirector;
    }

    public String getPurchasingHead() {
        return purchasingHead;
    }

    public void setPurchasingHead(String purchasingHead) {
        this.purchasingHead = purchasingHead;
    }

    public String getGeneralManager() {
        return generalManager;
    }

    public void setGeneralManager(String generalManager) {
        this.generalManager = generalManager;
    }

    public String getId1() {
        return Id1;
    }

    public void setId1(String id1) {
        Id1 = id1;
    }

    public float getId2() {
        return Id2;
    }

    public void setId2(float id2) {
        Id2 = id2;
    }

//    public String getSuppliesName() {
//        return suppliesName;
//    }
//
//    public void setSuppliesName(String suppliesName) {
//        this.suppliesName = suppliesName;
//    }
//
//    public String getSpecifications() {
//        return specifications;
//    }
//
//    public void setSpecifications(String specifications) {
//        this.specifications = specifications;
//    }
//
//    public String getUnit() {
//        return unit;
//    }
//
//    public void setUnit(String unit) {
//        this.unit = unit;
//    }
//
//    public String getInventory() {
//        return inventory;
//    }
//
//    public void setInventory(String inventory) {
//        this.inventory = inventory;
//    }
//
//    public String getNote() {
//        return note;
//    }
//
//    public void setNote(String note) {
//        this.note = note;
//    }


    public boolean isProcurementCategory() {
        return procurementCategory;
    }

    public void setProcurementCategory(boolean procurementCategory) {
        this.procurementCategory = procurementCategory;
    }

    @Override
    public String toString() {
        return "Procurement{" +
                "suppliesCategory='" + suppliesCategory + '\'' +
                ", receiptNumber='" + receiptNumber + '\'' +
                ", applyMouth='" + applyMouth + '\'' +
                ", demandTime=" + demandTime +
                ", applyDepartment='" + applyDepartment + '\'' +
                ", proposer='" + proposer + '\'' +
                ", divisionHead='" + divisionHead + '\'' +
                ", purchasingDirector='" + purchasingDirector + '\'' +
                ", purchasingHead='" + purchasingHead + '\'' +
                ", generalManager='" + generalManager + '\'' +
                ", Id1='" + Id1 + '\'' +
                ", Id2=" + Id2 +
                ", materialList=" + materialList +
                ", procurementCategory=" + procurementCategory +
                '}';
    }
}
