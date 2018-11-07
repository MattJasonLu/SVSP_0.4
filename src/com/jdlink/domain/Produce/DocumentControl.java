package com.jdlink.domain.Produce;

import com.jdlink.domain.Page;

import java.util.Date;

public class DocumentControl {
    /**
     * 序号
     */
    private int ID;
    /**
     * 文档编号
     */
    private String fileNO;
    /**
     * 文档名称
     */
    private String fileName;
    /**
     * 系统关联代码
     */
    private String SYSCode;
    /**
     * 所属公司
     */
    private String company;
    /**
     * 创建人
     */
    private String createdName;
    /**
     * 创建日期
     */
    private Date createdDate;
    /**
     * 修改人
     */
    private String editName;
    /**
     * 修改日期
     */
    private Date editDate;
    /**
     * 生效否
     */
    private Boolean isEffective;
    /**
     * 备注
     */
    private String note;
    /**
     * 页码
     */
    private Page page;
    /**
     * 关键字
     */
    private String keyword;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getFileNO() {
        return fileNO;
    }

    public void setFileNO(String fileNO) {
        this.fileNO = fileNO;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getSYSCode() {
        return SYSCode;
    }

    public void setSYSCode(String SYSCode) {
        this.SYSCode = SYSCode;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCreatedName() {
        return createdName;
    }

    public void setCreatedName(String createdName) {
        this.createdName = createdName;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getEditName() {
        return editName;
    }

    public void setEditName(String editName) {
        this.editName = editName;
    }

    public Date getEditDate() {
        return editDate;
    }

    public void setEditDate(Date editDate) {
        this.editDate = editDate;
    }

    public Boolean getEffective() {
        return isEffective;
    }

    public void setEffective(Boolean effective) {
        isEffective = effective;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    @Override
    public String toString() {
        return "documentControl{" +
                "ID=" + ID +
                ", fileNO='" + fileNO + '\'' +
                ", fileName='" + fileName + '\'' +
                ", SYSCode='" + SYSCode + '\'' +
                ", company='" + company + '\'' +
                ", createdName='" + createdName + '\'' +
                ", createdDate=" + createdDate +
                ", editName='" + editName + '\'' +
                ", editDate=" + editDate +
                ", isEffective=" + isEffective +
                ", note='" + note + '\'' +
                '}';
    }
}
