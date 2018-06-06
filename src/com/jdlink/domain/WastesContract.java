package com.jdlink.domain;

/**
 * Created by matt on 2018/5/17.
 */
public class WastesContract extends Contract {
    /**
     * 预约处置费
     */
    private float appointmentBookingFee;
    /**
     * 是否包含运费
     */
    private boolean isContainFreight;

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
}
