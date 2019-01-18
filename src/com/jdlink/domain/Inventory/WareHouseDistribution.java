package com.jdlink.domain.Inventory;

/**
 * 角色仓库分配
 */
public class WareHouseDistribution {
    /**
     * 主键
     */
    private int id;
    /**
     * 角色ID
     */
    private int roleId;
    /**
     * 仓库ID
     */
    private int wareHouseId;
    /**
     * 是否分配（true 是）
     */
    private boolean selected;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public int getWareHouseId() {
        return wareHouseId;
    }

    public void setWareHouseId(int wareHouseId) {
        this.wareHouseId = wareHouseId;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }

    @Override
    public String toString() {
        return "WareHouseDistribution{" +
                "id=" + id +
                ", roleId=" + roleId +
                ", wareHouseId=" + wareHouseId +
                ", selected=" + selected +
                '}';
    }
}
