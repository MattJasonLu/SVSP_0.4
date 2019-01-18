package com.jdlink.domain.Inventory;

import java.util.List;

/**
 * 仓库分配集合
 */
public class WareHouseDistributionList {
    /**
     * 仓库分配集合
     */
    private List<WareHouseDistribution> wareHouseDistributionList;
    /**
     * 角色ID
     */
    private int roleId;

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public List<WareHouseDistribution> getWareHouseDistributionList() {
        return wareHouseDistributionList;
    }

    public void setWareHouseDistributionList(List<WareHouseDistribution> wareHouseDistributionList) {
        this.wareHouseDistributionList = wareHouseDistributionList;
    }
}
