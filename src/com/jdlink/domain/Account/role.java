package com.jdlink.domain.Account;

/**
 * Created by matt on 2018/8/23.
 * DoubleClickTo 666
 * 角色
 */
public class Role {
    /**
     * 编号
     */
    private int id;
    /**
     * 角色名称
     */
    private String roleName;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", roleName='" + roleName + '\'' +
                '}';
    }
}
