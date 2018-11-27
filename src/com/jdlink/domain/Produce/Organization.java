package com.jdlink.domain.Produce;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    private String name = "";
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
     * 上一级ID（新增用,菜单调换顺序用,被调换顺序的ID）
     */
    private int oldId;
    /**
     * 页面链接(菜单)
     */
    private String url;
    /**
     * 图标(菜单)
     */
    private String icon;
    /**
     * 创建人（菜单）
     */
    private String founder;
    /**
     * 创建日期（菜单）
     */
    private Date creationDate;
    /**
     * 菜单层级（菜单）
     */
    private int level;
    /**
     * 子节点
     */
    private List<Organization> organizationList = new ArrayList<>();

    public List<Organization> getOrganizationList() {
        return organizationList;
    }

    public void setOrganizationList(List<Organization> organizationList) {
        this.organizationList = organizationList;
    }

    public String getFounder() {
        return founder;
    }

    public void setFounder(String founder) {
        this.founder = founder;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
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
