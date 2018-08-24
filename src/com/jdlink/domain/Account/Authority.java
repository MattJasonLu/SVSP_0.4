package com.jdlink.domain.Account;

/**
 * Created by matt on 2018/8/23.
 * DoubleClickTo 666
 * 权限
 */
public class Authority {
    /**
     * 编号
     */
    private int id;
    /**
     * 可操作的角色
     */
    private Role role;
    /**
     * 功能
     */
    private Function function;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Function getFunction() {
        return function;
    }

    public void setFunction(Function function) {
        this.function = function;
    }

    @Override
    public String toString() {
        return "Authority{" +
                "id=" + id +
                ", role=" + role +
                ", function=" + function +
                '}';
    }
}
