package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Dictionary.EquipmentDataItem;
import com.jdlink.domain.Dictionary.UnitDataItem;
import com.jdlink.domain.Page;

import java.util.Date;

/**
 * 医废出入库
 */
public class MedicalWastes {
    /**
     * 登记单号
     */
    private String medicalWastesId;
    /**
     * 登记部门
     */
    private String department;
    /**
     * 登记人
     */
    private String departmentName;
    /**
     * 修改人
     */
    private String adjustName;
    /**
     * 修改时间
     */
    private Date adjustDate;
    /**
     * 登记时间
     */
    private Date dateTime;
    /**
     * 本日进厂危废
     */
    private float thisMonthWastes;
    /**
     * 本日直接转外处置量
     */
    private float directDisposal;
    /**
     * 本日蒸煮医废(过磅)
     */
    private float cookingWastes;
    /**
     * 蒸煮后重量
     */
    private  float afterCookingNumber;
    /**
     * 蒸煮后入库量
     */
    private  float  afterCookingInbound;
    /**
     * 本日蒸煮后外送量
     */
    private float thisMonthSendCooking;
    /**
     * 误差量
     */
    private float errorNumber;
    /**
     * 水分含量
     */
    private float wetNumber;
    /**
     * 设备
     */
    private Equipment equipment;
    /**
     * 危废数量
     */
    private float wastesAmount;
    /**
     * 状态
     */
    private CheckState checkState;

    /**
     * 焚烧量
     */
    private float incineration;

    /**
     * 处置设备数据字典
     */
    private EquipmentDataItem equipmentDataItem;

    /**
     * 状态数据字典
     */
    private CheckStateItem checkStateItem;
    /**
     * 计量单位
     */
    private UnitDataItem unitDataItem;

    /**
     * 期初量
     */
    private float earlyNumber;

    /**
     * 关键字
     */
    private String keyword;

    /**
     * 起始日期
     * @return
     */
    private Date beginTime;

    /**
     * 结束日期
     * @return
     */
    private Date endTime;

    /**
     * 分页
     * @return
     */
    private Page page;

    /*本日进场危废合计*/
    private float thisMonthWastesTotal;

    /*本日直接转外处置量合计*/
    private float directDisposalTotal;

    /*本日蒸煮医废(过磅)合计*/
    private float cookingWastesTotal;

    /*蒸煮后重量合计*/
    private float afterCookingNumberTotal;

    /*蒸煮后入库量合计*/
    private float afterCookingInboundTotal;

    /*本日蒸煮后外送量合计*/
    private float thisMonthSendCookingTotal;

    /*误差量合计*/
    private float errorNumberTotal;

    /*水分含量合计*/
    private float wetNumberTotal;

    /*焚烧量合计*/
    private float incinerationTotal;

    public float getIncinerationTotal() {
        return incinerationTotal;
    }

    public void setIncinerationTotal(float incinerationTotal) {
        this.incinerationTotal = incinerationTotal;
    }

    public float getThisMonthWastesTotal() {
        return thisMonthWastesTotal;
    }

    public void setThisMonthWastesTotal(float thisMonthWastesTotal) {
        this.thisMonthWastesTotal = thisMonthWastesTotal;
    }

    public float getDirectDisposalTotal() {
        return directDisposalTotal;
    }

    public void setDirectDisposalTotal(float directDisposalTotal) {
        this.directDisposalTotal = directDisposalTotal;
    }

    public float getCookingWastesTotal() {
        return cookingWastesTotal;
    }

    public void setCookingWastesTotal(float cookingWastesTotal) {
        this.cookingWastesTotal = cookingWastesTotal;
    }

    public float getAfterCookingNumberTotal() {
        return afterCookingNumberTotal;
    }

    public void setAfterCookingNumberTotal(float afterCookingNumberTotal) {
        this.afterCookingNumberTotal = afterCookingNumberTotal;
    }

    public float getAfterCookingInboundTotal() {
        return afterCookingInboundTotal;
    }

    public void setAfterCookingInboundTotal(float afterCookingInboundTotal) {
        this.afterCookingInboundTotal = afterCookingInboundTotal;
    }

    public float getThisMonthSendCookingTotal() {
        return thisMonthSendCookingTotal;
    }

    public void setThisMonthSendCookingTotal(float thisMonthSendCookingTotal) {
        this.thisMonthSendCookingTotal = thisMonthSendCookingTotal;
    }

    public float getErrorNumberTotal() {
        return errorNumberTotal;
    }

    public void setErrorNumberTotal(float errorNumberTotal) {
        this.errorNumberTotal = errorNumberTotal;
    }

    public float getWetNumberTotal() {
        return wetNumberTotal;
    }

    public void setWetNumberTotal(float wetNumberTotal) {
        this.wetNumberTotal = wetNumberTotal;
    }

    /*消毒剂*/
    private float disinfectant;

    /*消毒剂*/
    private float deodorant;

    /*吨袋*/
    private float bag;

    public float getDisinfectant() {
        return disinfectant;
    }

    public void setDisinfectant(float disinfectant) {
        this.disinfectant = disinfectant;
    }

    public float getDeodorant() {
        return deodorant;
    }

    public void setDeodorant(float deodorant) {
        this.deodorant = deodorant;
    }

    public float getBag() {
        return bag;
    }

    public void setBag(float bag) {
        this.bag = bag;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public Date getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(Date beginTime) {
        this.beginTime = beginTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public float getEarlyNumber() {
        return earlyNumber;
    }

    public void setEarlyNumber(float earlyNumber) {
        this.earlyNumber = earlyNumber;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    public EquipmentDataItem getEquipmentDataItem() {
        return equipmentDataItem;
    }

    public void setEquipmentDataItem(EquipmentDataItem equipmentDataItem) {
        this.equipmentDataItem = equipmentDataItem;
    }

    public float getIncineration() {
        return incineration;
    }

    public void setIncineration(float incineration) {
        this.incineration = incineration;
    }

    public CheckState getCheckState() {

        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public float getWastesAmount() {
        return wastesAmount;
    }

    public void setWastesAmount(float wastesAmount) {
        this.wastesAmount = wastesAmount;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getAdjustName() {
        return adjustName;
    }

    public void setAdjustName(String adjustName) {
        this.adjustName = adjustName;
    }

    public Date getAdjustDate() {
        return adjustDate;
    }

    public void setAdjustDate(Date adjustDate) {
        this.adjustDate = adjustDate;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public float getThisMonthWastes() {
        return thisMonthWastes;
    }

    public void setThisMonthWastes(float thisMonthWastes) {
        this.thisMonthWastes = thisMonthWastes;
    }

    public float getDirectDisposal() {
        return directDisposal;
    }

    public void setDirectDisposal(float directDisposal) {
        this.directDisposal = directDisposal;
    }

    public float getCookingWastes() {
        return cookingWastes;
    }

    public void setCookingWastes(float cookingWastes) {
        this.cookingWastes = cookingWastes;
    }

    public float getAfterCookingNumber() {
        return afterCookingNumber;
    }

    public void setAfterCookingNumber(float afterCookingNumber) {
        this.afterCookingNumber = afterCookingNumber;
    }

    public float getAfterCookingInbound() {
        return afterCookingInbound;
    }

    public void setAfterCookingInbound(float afterCookingInbound) {
        this.afterCookingInbound = afterCookingInbound;
    }

    public float getThisMonthSendCooking() {
        return thisMonthSendCooking;
    }

    public void setThisMonthSendCooking(float thisMonthSendCooking) {
        this.thisMonthSendCooking = thisMonthSendCooking;
    }

    public float getErrorNumber() {
        return errorNumber;
    }

    public void setErrorNumber(float errorNumber) {
        this.errorNumber = errorNumber;
    }

    public float getWetNumber() {
        return wetNumber;
    }

    public void setWetNumber(float wetNumber) {
        this.wetNumber = wetNumber;
    }

    public String getMedicalWastesId() {
        return medicalWastesId;
    }

    public void setMedicalWastesId(String medicalWastesId) {
        this.medicalWastesId = medicalWastesId;
    }

    public String getDepartment() {
        return department;
    }

    public UnitDataItem getUnitDataItem() {
        return unitDataItem;
    }

    public void setUnitDataItem(UnitDataItem unitDataItem) {
        this.unitDataItem = unitDataItem;
    }

    @Override
    public String toString() {
        return "MedicalWastes{" +
                "medicalWastesId='" + medicalWastesId + '\'' +
                ", department='" + department + '\'' +
                ", departmentName='" + departmentName + '\'' +
                ", adjustName='" + adjustName + '\'' +
                ", adjustDate=" + adjustDate +
                ", dateTime=" + dateTime +
                ", thisMonthWastes=" + thisMonthWastes +
                ", directDisposal=" + directDisposal +
                ", cookingWastes=" + cookingWastes +
                ", afterCookingNumber=" + afterCookingNumber +
                ", afterCookingInbound=" + afterCookingInbound +
                ", thisMonthSendCooking=" + thisMonthSendCooking +
                ", errorNumber=" + errorNumber +
                ", wetNumber=" + wetNumber +
                '}';
    }
}
