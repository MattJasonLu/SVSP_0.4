package com.jdlink.domain.Produce;


import java.util.Date;

public class EquipmentDate {
    /**
     * 编号
     */
    private int id;
    /**
     * 故障设备
     */
    private String Equipment;
    /**
     * 运行时间(h)
     */
    private float runningTime;
    /**
     * 停止时间(h)
     */
    private float stopTime;
    /**
     * 停止原因
     */
    private String stopResult;
    /**
     * 备注
     */
    private String note;
    /**
     * 当天时间
     */
    private Date dayTime;
    /**
     * 创建人
     */
    private String creator;
    /**
     * 创建日期
     */
    private String createDept;
    /**
     * 修改人
     */
    private String editor;
    /**
     * 修改日期
     */
    private Date editTime;

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getCreateDept() {
        return createDept;
    }

    public void setCreateDept(String createDept) {
        this.createDept = createDept;
    }

    public String getEditor() {
        return editor;
    }

    public void setEditor(String editor) {
        this.editor = editor;
    }

    public Date getEditTime() {
        return editTime;
    }

    public void setEditTime(Date editTime) {
        this.editTime = editTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDayTime() {
        return dayTime;
    }

    public void setDayTime(Date dayTime) {
        this.dayTime = dayTime;
    }

    public String getEquipment() {
        return Equipment;
    }

    public void setEquipment(String equipment) {
        Equipment = equipment;
    }

    public float getRunningTime() {
        return runningTime;
    }

    public void setRunningTime(float runningTime) {
        this.runningTime = runningTime;
    }

    public float getStopTime() {
        return stopTime;
    }

    public void setStopTime(float stopTime) {
        this.stopTime = stopTime;
    }

    public String getStopResult() {
        return stopResult;
    }

    public void setStopResult(String stopResult) {
        this.stopResult = stopResult;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "EquipmentDate{" +
                "id=" + id +
                ", Equipment='" + Equipment + '\'' +
                ", runningTime=" + runningTime +
                ", stopTime=" + stopTime +
                ", stopResult='" + stopResult + '\'' +
                ", note='" + note + '\'' +
                ", dayTime=" + dayTime +
                ", creator='" + creator + '\'' +
                ", createDept='" + createDept + '\'' +
                ", editor='" + editor + '\'' +
                ", editTime=" + editTime +
                '}';
    }
}
