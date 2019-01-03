package com.jdlink.domain.Inventory;

/**
 * 仓库
 */
public class WareHouse {
    /**
     * 主键
     */
    private int wareHouseId;
    /**
     * 仓库名称
     */
    private String wareHouseName;
    /**
     * 仓库编码
     */
    private String wareHouseCode;
    /**
     * 前缀缩写
     */
    private String prefix;

    public int getWareHouseId() {
        return wareHouseId;
    }

    public void setWareHouseId(int wareHouseId) {
        this.wareHouseId = wareHouseId;
    }

    public String getWareHouseName() {
        return wareHouseName;
    }

    public void setWareHouseName(String wareHouseName) {
        this.wareHouseName = wareHouseName;
    }

    public String getWareHouseCode() {
        return wareHouseCode;
    }

    public void setWareHouseCode(String wareHouseCode) {
        this.wareHouseCode = wareHouseCode;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    @Override
    public String toString() {
        return "WareHouse{" +
                "wareHouseId=" + wareHouseId +
                ", wareHouseName='" + wareHouseName + '\'' +
                ", wareHouseCode='" + wareHouseCode + '\'' +
                '}';
    }
}
