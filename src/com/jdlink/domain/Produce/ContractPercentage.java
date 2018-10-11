package com.jdlink.domain.Produce;

/**
 * 合同提成比例
 */
public class ContractPercentage {
    /**
     * 编号
     */
    private int id;
    /**
     * 最大签约量
     */
    private float contractAmountMax;
    /**
     * 最小签约量
     */
    private float contractAmountMin;
    /**
     * 合约量
     */
    private float contractAmount;
    /**
     * 符合条件量
     */
    private float eligibleQuantity;
    /**
     * 提成比例
     */
    private float commissionRatio;
    /**
     * 加权平均提成比例
     */
    private float weightedAverageCommissionRatio;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public float getContractAmountMax() {
        return contractAmountMax;
    }

    public void setContractAmountMax(float contractAmountMax) {
        this.contractAmountMax = contractAmountMax;
    }

    public float getContractAmountMin() {
        return contractAmountMin;
    }

    public void setContractAmountMin(float contractAmountMin) {
        this.contractAmountMin = contractAmountMin;
    }

    public float getContractAmount() {
        return contractAmount;
    }

    public void setContractAmount(float contractAmount) {
        this.contractAmount = contractAmount;
    }

    public float getEligibleQuantity() {
        return eligibleQuantity;
    }

    public void setEligibleQuantity(float eligibleQuantity) {
        this.eligibleQuantity = eligibleQuantity;
    }

    public float getCommissionRatio() {
        return commissionRatio;
    }

    public void setCommissionRatio(float commissionRatio) {
        this.commissionRatio = commissionRatio;
    }

    public float getWeightedAverageCommissionRatio() {
        return weightedAverageCommissionRatio;
    }

    public void setWeightedAverageCommissionRatio(float weightedAverageCommissionRatio) {
        this.weightedAverageCommissionRatio = weightedAverageCommissionRatio;
    }
}
