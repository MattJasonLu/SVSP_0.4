package com.jdlink.domain.Inventory;

/*仓库*/
public class WareHouse {
    /*仓库代码*/
    private String wareHouseId;
    /*仓库名称*/
    private String wareHouseName;

    public String getWareHouseId() {
        return wareHouseId;
    }

    public void setWareHouseId(String wareHouseId) {
        this.wareHouseId = wareHouseId;
    }

    public String getWareHouseName() {
        return wareHouseName;
    }

    public void setWareHouseName(String wareHouseName) {
        this.wareHouseName = wareHouseName;
    }

    @Override
    public String toString() {
        return "WareHouse{" +
                "wareHouseId='" + wareHouseId + '\'' +
                ", wareHouseName='" + wareHouseName + '\'' +
                '}';
    }
}
