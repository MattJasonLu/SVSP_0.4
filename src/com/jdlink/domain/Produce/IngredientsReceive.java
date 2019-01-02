package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Page;

import java.util.Date;
import java.util.List;

public class IngredientsReceive {
    /**
     * 领料单编号
     */
    private String id;
    /**
     * 部门
     */
    private String department;
    /**
     * 领料单创建日期
     */
    private Date creationDate;
    /**
     * 日期模糊查询
     */
    private String date;
    /**
     * 文件编号
     */
    private String fileId;
    /**
     * 辅料/备件 列表
     */
    private List<Ingredients> ingredientsList;
    /**
     * 总领料数量
     */
    private float totalAmount;
    /**
     * 总金额
     */
    private float totalPrice;
    /**
     * 主管副总经理
     */
    private String vicePresident;
    /**
     * 仓库部门主管
     */
    private String warehouseSupervisor;
    /**
     * 保管员
     */
    private String keeper;
    /**
     * 领料部门主管
     */
    private String pickingSupervisor;
    /**
     * 领料人
     */
    private String pickingMan;
    /**
     * 入库单状态
     */
    private CheckState state;
    /**
     * 分页
     */
    private Page page;
    /**
     * 模糊查询关键字
     */
     private String keywords;

    /**
     * 日期查询 起始时间
     */
    private Date startDate;
    /**
     * 日期查询 终止时间
     */
    private Date endDate;

    /**
     * 状态数据字典
     * @return
     */
    private CheckStateItem checkStateItem;

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public List<Ingredients> getIngredientsList() {
        return ingredientsList;
    }

    public void setIngredientsList(List<Ingredients> ingredientsList) {
        this.ingredientsList = ingredientsList;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }


    public String getKeeper() {
        return keeper;
    }

    public CheckState getState() {
        return state;
    }

    public void setState(CheckState state) {
        this.state = state;
    }

    public void setKeeper(String keeper) {
        this.keeper = keeper;
    }

    public String getVicePresident() {
        return vicePresident;
    }

    public void setVicePresident(String vicePresident) {
        this.vicePresident = vicePresident;
    }

    public String getWarehouseSupervisor() {
        return warehouseSupervisor;
    }

    public void setWarehouseSupervisor(String warehouseSupervisor) {
        this.warehouseSupervisor = warehouseSupervisor;
    }

    public String getPickingSupervisor() {
        return pickingSupervisor;
    }

    public void setPickingSupervisor(String pickingSupervisor) {
        this.pickingSupervisor = pickingSupervisor;
    }

    public String getPickingMan() {
        return pickingMan;
    }

    public void setPickingMan(String pickingMan) {
        this.pickingMan = pickingMan;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    @Override
    public String toString() {
        return "IngredientsReceive{" +
                "id='" + id + '\'' +
                ", department='" + department + '\'' +
                ", creationDate=" + creationDate +
                ", date='" + date + '\'' +
                ", fileId='" + fileId + '\'' +
                ", ingredientsList=" + ingredientsList +
                ", totalAmount=" + totalAmount +
                ", vicePresident='" + vicePresident + '\'' +
                ", warehouseSupervisor='" + warehouseSupervisor + '\'' +
                ", keeper='" + keeper + '\'' +
                ", pickingSupervisor='" + pickingSupervisor + '\'' +
                ", pickingMan='" + pickingMan + '\'' +
                ", state=" + state +
                ", page=" + page +
                ", keywords='" + keywords + '\'' +
                '}';
    }
}
