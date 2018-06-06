package com.jdlink.domain;

/**
 * Created by matt on 2018/5/17.
 */
public class EmergencyContract extends Contract {
    /**
     * 预约处置费
     */
    private float appointmentBookingFee;
    /**
     * 是否包含运费
     */
    private boolean isContainFreight;
    /**
     * 开户行名称
     */
    private String bankName;
    /**
     * 开户行账号
     */
    private String bankAccount;
    /**
     * 代理人
     */
    private String agentName;
    /**
     * 代理人电话
     */
    private String agentTel;

    public float getAppointmentBookingFee() {
        return appointmentBookingFee;
    }

    public void setAppointmentBookingFee(float appointmentBookingFee) {
        this.appointmentBookingFee = appointmentBookingFee;
    }

    public boolean getIsContainFreight() {
        return isContainFreight;
    }

    public void setIsContainFreight(boolean containFreight) {
        isContainFreight = containFreight;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public String getAgentTel() {
        return agentTel;
    }

    public void setAgentTel(String agentTel) {
        this.agentTel = agentTel;
    }
}
