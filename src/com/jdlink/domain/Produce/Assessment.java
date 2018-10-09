package com.jdlink.domain.Produce;

import com.jdlink.domain.Contract;

import java.util.Date;
import java.util.List;

public class Assessment {
    /**
     * 月份
     */
    private String month;
    /**
     * 接运单总金额
     */
    private Float wayBillTotalPrice;
    /**
     * 接运单危废总数量
     */
    private float wayBillTotalWastesAmount;
    /**
     * 到账总金额
     */
    private Float accountTotalPrice;
    /**
     * 有效总金额
     */
    private Float effectiveTotalPrice;
    /**
     * 总提成
     */
    private Double totalCommission;
    /**
     * 当月发放总金额
     */
    private Float monthSendedTotalPrice;
    /**
     * 当月未发放总金额
     */
    private Float monthNotSendTotalPrice;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 业务员ID
     */
    private String salesmanId;
    /**
     * 业务员姓名
     */
    private String salesmanName;
    /**
     * 系数
     */
    private String coefficient;
    /**
     * 公司名
     */
    private String companyName;
    /**
     * 查询：开始年份
     */
    private Date startDate;
    /**
     * 查询：结束年份
     */
    private Date endDate;
    /**
     * 查询关键字
     */
    private String keywords;

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(String coefficient) {
        this.coefficient = coefficient;
    }

    public String getSalesmanId() {
        return salesmanId;
    }

    public void setSalesmanId(String salesmanId) {
        this.salesmanId = salesmanId;
    }

    public String getSalesmanName() {
        return salesmanName;
    }

    public void setSalesmanName(String salesmanName) {
        this.salesmanName = salesmanName;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Float getWayBillTotalPrice() {
        return wayBillTotalPrice;
    }

    public float getWayBillTotalWastesAmount() {
        return wayBillTotalWastesAmount;
    }

    public void setWayBillTotalWastesAmount(float wayBillTotalWastesAmount) {
        this.wayBillTotalWastesAmount = wayBillTotalWastesAmount;
    }

    public void setWayBillTotalPrice(Float wayBillTotalPrice) {
        this.wayBillTotalPrice = wayBillTotalPrice;
    }

    public Float getAccountTotalPrice() {
        return accountTotalPrice;
    }

    public void setAccountTotalPrice(Float accountTotalPrice) {
        this.accountTotalPrice = accountTotalPrice;
    }

    public Float getEffectiveTotalPrice() {
        return effectiveTotalPrice;
    }

    public void setEffectiveTotalPrice(Float effectiveTotalPrice) {
        this.effectiveTotalPrice = effectiveTotalPrice;
    }

    public Double getTotalCommission() {
        return totalCommission;
    }

    public void setTotalCommission(Double totalCommission) {
        this.totalCommission = totalCommission;
    }

    public Float getMonthSendedTotalPrice() {
        return monthSendedTotalPrice;
    }

    public void setMonthSendedTotalPrice(Float monthSendedTotalPrice) {
        this.monthSendedTotalPrice = monthSendedTotalPrice;
    }

    public Float getMonthNotSendTotalPrice() {
        return monthNotSendTotalPrice;
    }

    public void setMonthNotSendTotalPrice(Float monthNotSendTotalPrice) {
        this.monthNotSendTotalPrice = monthNotSendTotalPrice;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "Assessment{" +
                "month='" + month + '\'' +
                ", wayBillTotalPrice=" + wayBillTotalPrice +
                ", accountTotalPrice=" + accountTotalPrice +
                ", effectiveTotalPrice=" + effectiveTotalPrice +
                ", totalCommission=" + totalCommission +
                ", monthSendedTotalPrice=" + monthSendedTotalPrice +
                ", monthNotSendTotalPrice=" + monthNotSendTotalPrice +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}
