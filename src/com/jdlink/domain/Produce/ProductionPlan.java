package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;

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
}
