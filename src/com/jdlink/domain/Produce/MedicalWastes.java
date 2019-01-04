package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Dictionary.EquipmentDataItem;
import com.jdlink.domain.Dictionary.UnitDataItem;

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
     * 本日蒸煮医废
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
