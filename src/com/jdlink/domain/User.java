package com.jdlink.domain;

import com.jdlink.domain.Account.Role;

import java.util.Date;

/**
 * Created by matt on 2018/4/23.
 */
public class User {
    /**
     * 用户编号
     */
    private int id;
    /**
     * 用户名
     */
    private String username;
    /**
     * 密码
     */
    private String password;
    /**
     * 客户编号
     */
    private String clientId;
    /**
     * 是否是客户账户
     */
//    private boolean isClient;
    /**
     * 部门
     */
    private String department;
    /**
     * 姓名
     */
    private String name;
    /**
     * 年龄
     */
    private int age;
    /**
     * 性别
     */
    private boolean sex;
    /**
     * 岗位
     */
    private String job;
    /**
     * 级别
     */
    private int level;
    /**
     * 能否分配账户
     */
    private boolean canAllocate;
    /**
     * 角色
     */
    private Role  role;
    /**
     * 所属公司
     */
    private Role  company;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean getSex() {
        return sex;
    }

    public void setSex(boolean sex) {
        this.sex = sex;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public boolean getCanAllocate() {
        return canAllocate;
    }

    public void setCanAllocate(boolean canAllocate) {
        this.canAllocate = canAllocate;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Role getCompany() {
        return company;
    }

    public void setCompany(Role company) {
        this.company = company;
    }
}
