package com.jdlink.domain.Produce;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EquipmentDate {
    /**
     * 编号
     */
    private int id;
    /**
     * 单据号
     */
    private String documentNumber;
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
     * 创建部门
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
    /**
     * 明细列表
     */
    List<EquipmentItem> equipmentItemList=new ArrayList<>();

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
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
                ", documentNumber='" + documentNumber + '\'' +
                ", note='" + note + '\'' +
                ", dayTime=" + dayTime +
                ", creator='" + creator + '\'' +
                ", createDept='" + createDept + '\'' +
                ", editor='" + editor + '\'' +
                ", editTime=" + editTime +
                ", equipmentItemList=" + equipmentItemList +
                '}';
    }
}
