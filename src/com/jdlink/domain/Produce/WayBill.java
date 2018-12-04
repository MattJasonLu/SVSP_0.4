package com.jdlink.domain.Produce;

import com.jdlink.domain.*;
import com.jdlink.domain.Dictionary.CheckStateItem;

import java.util.Date;
import java.util.List;

public class WayBill {
    /**
     * 接运单序列号/接运单号
     */
    private String id;
    /**
     * 产生单位/委托单位
     */
    private String produceCompanyName;
    /**
     * 关联的合同ID
     */
    private String contractId;
    /**
     * 委托单位ID
     */
    private String produceCompanyId;
    /**
     * 总额
     */
    private Float total;
    /**
     *总运费
     */
    private Float freight;
    /**
     * 接运单创建人
     */
    private String founder;
    /**
     * 接运单创建日期
     */
    private Date wayBillDate;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 危废产生单位经手人
     */
    private String produceCompanyOperator;
    /**
     * 接运单状态
     */
    private CheckState state;
    /**
     * 审批状态数据字典
     */
    private CheckStateItem checkStateItem;
    /**
     *审批意见
     */
    private String advice;
    /**
     * 分页
     */
    private Page page;
    /**
     * 单个接运单详细
     */
    private List<WayBillItem> wayBillItemList;
    /**
     * 模糊查询关键字
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

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

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

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public String getFounder() {
        return founder;
    }

    public void setFounder(String founder) {
        this.founder = founder;
    }

    public Date getWayBillDate() {
        return wayBillDate;
    }

    public void setWayBillDate(Date wayBillDate) {
        this.wayBillDate = wayBillDate;
    }

    public String getProduceCompanyId() {
        return produceCompanyId;
    }

    public void setProduceCompanyId(String produceCompanyId) {
        this.produceCompanyId = produceCompanyId;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getProduceCompanyOperator() {
        return produceCompanyOperator;
    }

    public void setProduceCompanyOperator(String produceCompanyOperator) {
        this.produceCompanyOperator = produceCompanyOperator;
    }

    public String getProduceCompanyName() {
        return produceCompanyName;
    }

    public void setProduceCompanyName(String produceCompanyName) {
        this.produceCompanyName = produceCompanyName;
    }

    public CheckState getState() {
        return state;
    }

    public void setState(CheckState state) {
        this.state = state;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public List<WayBillItem> getWayBillItemList() {
        return wayBillItemList;
    }

    public void setWayBillItemList(List<WayBillItem> wayBillItemList) {
        this.wayBillItemList = wayBillItemList;
    }

    public Float getFreight() {
        return freight;
    }

    public void setFreight(Float freight) {
        this.freight = freight;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    @Override
    public String toString() {
        return "WayBill{" +
                "id='" + id + '\'' +
                ", produceCompanyName='" + produceCompanyName + '\'' +
                ", total=" + total +
                ", freight=" + freight +
                ", founder='" + founder + '\'' +
                ", wayBillDate=" + wayBillDate +
                ", remarks='" + remarks + '\'' +
                ", produceCompanyOperator='" + produceCompanyOperator + '\'' +
                ", state=" + state +
                ", advice='" + advice + '\'' +
                ", page=" + page +
                ", wayBillItemList=" + wayBillItemList +
                '}';
    }
}

