package com.jdlink.domain.Produce;

public class Secondary {
    /**
     * 预约单号
     */
    private String ReservationNumber;
    /**
     * 检测项目
     */
    private boolean project;
    /**
     * 送样人
     */
    private String deliver;
    /**
     * 签收人
     */
    private String signer;
    /**
     * 备注
     */
    private String note;
    /**
     * 热灼减率
     * @return boolean
     */
    private boolean clinkerIgnitionLoss;

    /**
     * 水分
     * @return
     */
    private boolean moisture;

    public String getReservationNumber() {
        return ReservationNumber;
    }

    public void setReservationNumber(String reservationNumber) {
        ReservationNumber = reservationNumber;
    }

    public boolean isProject() {
        return project;
    }

    public void setProject(boolean project) {
        this.project = project;
    }

    public String getDeliver() {
        return deliver;
    }

    public void setDeliver(String deliver) {
        this.deliver = deliver;
    }

    public String getSigner() {
        return signer;
    }

    public void setSigner(String signer) {
        this.signer = signer;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public boolean isClinkerIgnitionLoss() {
        return clinkerIgnitionLoss;
    }

    public void setClinkerIgnitionLoss(boolean clinkerIgnitionLoss) {
        this.clinkerIgnitionLoss = clinkerIgnitionLoss;
    }

    public boolean isMoisture() {
        return moisture;
    }

    public void setMoisture(boolean moisture) {
        this.moisture = moisture;
    }

    @Override
    public String toString() {
        return "Secondary{" +
                "ReservationNumber='" + ReservationNumber + '\'' +
                ", project=" + project +
                ", deliver='" + deliver + '\'' +
                ", signer='" + signer + '\'' +
                ", note='" + note + '\'' +
                ", clinkerIgnitionLoss=" + clinkerIgnitionLoss +
                ", moisture=" + moisture +
                '}';
    }
}
