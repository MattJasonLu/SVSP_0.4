package com.jdlink.domain.Produce;


import com.jdlink.domain.Page;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
    private List<EquipmentItem> equipmentItemList=new ArrayList<>();
    /**
     * 搜索关键字
     */
    private String keyword;
    /**
     * 分页
     */
    private Page page;

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

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public List<EquipmentItem> getEquipmentItemList() {
        return equipmentItemList;
    }

    public void setEquipmentItemList(List<EquipmentItem> equipmentItemList) {
        this.equipmentItemList = equipmentItemList;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
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
