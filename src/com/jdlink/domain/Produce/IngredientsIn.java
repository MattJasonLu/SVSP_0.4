package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * 辅料、备件入库
 */
public class IngredientsIn {
    /**
     * 入库单编号
     */
    private String id;
    /**
     * 采购单编号列表
     */
    private List<String> procurementItemIdList;
    /**
     * 公司名
     */
    private String companyName;
    /**
     * 入库单创建日期(用作入库日期)
     */
    private Date creationDate;
    /**
     * 入库日期(数据库暂无)
     */
    private Date inDate;
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
     * 验收员
     */
    private String acceptor;
    /**
     * 经手人
     */
    private String handlers;
    /**
     * 入库单状态
     */
    private CheckState state;
    /**
     * 分页
     */
    private Page page;
    /**
     * 模糊搜索关键字
     */
    private String keywords;
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

    public List<String> getProcurementItemIdList() {
        return procurementItemIdList;
    }

    public void setProcurementItemIdList(List<String> procurementItemIdList) {
        this.procurementItemIdList = procurementItemIdList;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getInDate() {
        return inDate;
    }

    public void setInDate(Date inDate) {
        this.inDate = inDate;
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

    public CheckState getState() {
        return state;
    }

    public void setState(CheckState state) {
        this.state = state;
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

    public String getAcceptor() {
        return acceptor;
    }

    public void setAcceptor(String acceptor) {
        this.acceptor = acceptor;
    }

    public String getHandlers() {
        return handlers;
    }

    public void setHandlers(String handlers) {
        this.handlers = handlers;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    @Override
    public String toString() {
        return "IngredientsIn{" +
                "id='" + id + '\'' +
                ", companyName='" + companyName + '\'' +
                ", creationDate=" + creationDate +
                ", date='" + date + '\'' +
                ", fileId='" + fileId + '\'' +
                ", ingredientsList=" + ingredientsList +
                ", totalPrice=" + totalPrice +
                ", bookkeeper='" + bookkeeper + '\'' +
                ", approver='" + approver + '\'' +
                ", keeper='" + keeper + '\'' +
                ", acceptor='" + acceptor + '\'' +
                ", handlers='" + handlers + '\'' +
                ", page=" + page +
                '}';
    }
}
