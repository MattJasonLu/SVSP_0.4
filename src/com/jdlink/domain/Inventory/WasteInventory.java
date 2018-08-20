package com.jdlink.domain.Inventory;

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

    public String getInboundOrderId() {
        return inboundOrderId;
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
