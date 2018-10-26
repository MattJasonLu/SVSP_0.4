package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * 辅料备件出库
 */
public class IngredientsOut {
    /**
     * 出库单编号
     */
    private String id;
    /**
     * 公司名
     */
    private String companyName;
    /**
     * 部门
     */
    private String departmentName;
    /**
     * 出库单创建日期
     */
    private Date creationDate;
    /**
     * 日期模糊查询
     */
    private String date;
    /**
     * 文件编号
     */
    private String fileId;
    /**
     * 辅料/备件 列表
     */
    private List<Ingredients> ingredientsList;
    /**
     * 总出库数量
     */
    private float totalAmount;
    /**
     * 所有辅料/备件 总额
     */
    private float totalPrice;
    /**
     * 记账员
     */
    private String bookkeeper;
    /**
     * 审批员
     */
    private String approver;
    /**
     * 保管员
     */
    private String keeper;
    /**
     * 经手人
     */
    private String handlers;
    /**
     * 出库单状态
     */
    private CheckState state;
    /**
     * 分页
     */
    private Page page;
    /**
     * 模糊查询关键字
     */
    private String keywords;
    /**
     * 领料单Id数组
     */
    private List<String> receiveIdList;
    /**
     * 日期查询 起始时间
     */
    private Date startDate;
    /**
     * 日期查询 终止时间
     */
    private Date endDate;

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<String> getReceiveIdList() {
        return receiveIdList;
    }

    public void setReceiveIdList(List<String> receiveIdList) {
        this.receiveIdList = receiveIdList;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public CheckState getState() {
        return state;
    }

    public void setState(CheckState state) {
        this.state = state;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public List<Ingredients> getIngredientsList() {
        return ingredientsList;
    }

    public void setIngredientsList(List<Ingredients> ingredientsList) {
        this.ingredientsList = ingredientsList;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getBookkeeper() {
        return bookkeeper;
    }

    public void setBookkeeper(String bookkeeper) {
        this.bookkeeper = bookkeeper;
    }

    public String getApprover() {
        return approver;
    }

    public void setApprover(String approver) {
        this.approver = approver;
    }

    public String getKeeper() {
        return keeper;
    }

    public void setKeeper(String keeper) {
        this.keeper = keeper;
    }

    public String getHandlers() {
        return handlers;
    }

    public void setHandlers(String handlers) {
        this.handlers = handlers;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    @Override
    public String toString() {
        return "IngredientsOut{" +
                "id='" + id + '\'' +
                ", companyName='" + companyName + '\'' +
                ", creationDate=" + creationDate +
                ", date='" + date + '\'' +
                ", fileId='" + fileId + '\'' +
                ", ingredientsList=" + ingredientsList +
                ", totalAmount=" + totalAmount +
                ", totalPrice=" + totalPrice +
                ", bookkeeper='" + bookkeeper + '\'' +
                ", approver='" + approver + '\'' +
                ", keeper='" + keeper + '\'' +
                ", handlers='" + handlers + '\'' +
                ", state=" + state +
                ", page=" + page +
                ", keywords='" + keywords + '\'' +
                '}';
    }
}
