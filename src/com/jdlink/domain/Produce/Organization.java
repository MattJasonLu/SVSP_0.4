package com.jdlink.domain.Produce;

public class Organization {
    /**
     * 主节点
     */
    private int id;
    /**
     * 父节点
     */
    private int pId;
    /**
     * 名称
     */
    private String name;
    /**
     * 公司名
     */
    private String companyName;
    /**
     * 部门
     */
    private String department;
    /**
     * 项目组
     */
    private String team;
    /**
     * 员工
     */
    private String employees;
    /**
     * 上一级ID（新增用）
     */
    private int oldId;
    /**
     * 页面链接(菜单)
     */
    private String url;
    /**
     * 图标(菜单)
     */
    private String picture;

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getOldId() {
        return oldId;
    }

    public void setOldId(int oldId) {
        this.oldId = oldId;
    }

    public String getEmployees() {
        return employees;
    }

    public void setEmployees(String employees) {
        this.employees = employees;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getpId() {
        return pId;
    }

    public void setpId(int pId) {
        this.pId = pId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }
}
