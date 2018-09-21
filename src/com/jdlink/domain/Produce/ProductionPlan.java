package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;

import java.util.Date;

public class ProductionPlan {
    /**
     * 产量计划单编号
     */
    private String id;
    /**
     * 创建人
     */
    private String founder;
    /**
     * 创建日期
     */
    private Date creationDate;
    /**
     * 计划单状态
     */
    private CheckState state;
    /**
     * 计划运转率
     */
    private Float transportRate;
    /**
     * 计划数量
     */
    private Float planQuantity;
    /**
     *计划辅助消耗
     */
    private AuxiliaryConsumption auxiliaryConsumption;
    /**
     * 审核意见
     */
    private String advice;
    /**
     *分页
     */
    private Page page;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public CheckState getState() {
        return state;
    }

    public void setState(CheckState state) {
        this.state = state;
    }

    public Float getTransportRate() {
        return transportRate;
    }

    public void setTransportRate(Float transportRate) {
        this.transportRate = transportRate;
    }

    public Float getPlanQuantity() {
        return planQuantity;
    }

    public void setPlanQuantity(Float planQuantity) {
        this.planQuantity = planQuantity;
    }

    public AuxiliaryConsumption getAuxiliaryConsumption() {
        return auxiliaryConsumption;
    }

    public void setAuxiliaryConsumption(AuxiliaryConsumption auxiliaryConsumption) {
        this.auxiliaryConsumption = auxiliaryConsumption;
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

    @Override
    public String toString() {
        return "ProductionPlan{" +
                "id='" + id + '\'' +
                ", founder='" + founder + '\'' +
                ", creationDate=" + creationDate +
                ", state=" + state +
                ", transportRate=" + transportRate +
                ", planQuantity=" + planQuantity +
                ", auxiliaryConsumption=" + auxiliaryConsumption +
                ", advice='" + advice + '\'' +
                ", page=" + page +
                '}';
    }
}
