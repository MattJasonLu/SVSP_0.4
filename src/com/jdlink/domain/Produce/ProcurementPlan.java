package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Dictionary.MaterialCategoryItem;
import com.jdlink.domain.Page;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*
* 采购计划数据结构
* */
public class ProcurementPlan {

    //主键
    private String procurementPlanId;

    //创建人
    private String createName;

    //创建日期
    private Date createDate;

    //创建日期开始
    private Date createDateStart;

    //创建日期结束
    private Date createDateEnd;

    //申请年月
    private String applyMouth;


    //修改人
    private String adjustName;

    //修改日期
    private Date adjustDate;

    //修改日起开始
    private Date adjustDateStart;

    //修改日起结束
    private Date adjustDateEnd;

    //审批人
    private String approvalName;

    //状态
    private CheckState checkState;

    //明细列表
    private List<ProcurementPlanItem> procurementPlanItemList=new ArrayList<>();

    //分页
    private Page page;

    //粗查询
    private String keywords;

    //意见
    private String advice;

    //状态数据字典
    private CheckStateItem checkStateItem;

    //物资类别数据字典
    private MaterialCategoryItem materialCategoryItem;

    public String getApplyMouth() {
        return applyMouth;
    }

    public void setApplyMouth(String applyMouth) {
        this.applyMouth = applyMouth;
    }

    public MaterialCategoryItem getMaterialCategoryItem() {
        return materialCategoryItem;
    }

    public void setMaterialCategoryItem(MaterialCategoryItem materialCategoryItem) {
        this.materialCategoryItem = materialCategoryItem;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    public Date getCreateDateStart() {
        return createDateStart;
    }

    public void setCreateDateStart(Date createDateStart) {
        this.createDateStart = createDateStart;
    }

    public Date getCreateDateEnd() {
        return createDateEnd;
    }

    public void setCreateDateEnd(Date createDateEnd) {
        this.createDateEnd = createDateEnd;
    }

    public Date getAdjustDateStart() {
        return adjustDateStart;
    }

    public void setAdjustDateStart(Date adjustDateStart) {
        this.adjustDateStart = adjustDateStart;
    }

    public Date getAdjustDateEnd() {
        return adjustDateEnd;
    }

    public void setAdjustDateEnd(Date adjustDateEnd) {
        this.adjustDateEnd = adjustDateEnd;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }



    public List<ProcurementPlanItem> getProcurementPlanItemList() {
        return procurementPlanItemList;
    }

    public void setProcurementPlanItemList(List<ProcurementPlanItem> procurementPlanItemList) {
        this.procurementPlanItemList = procurementPlanItemList;
    }

    public String getProcurementPlanId() {
        return procurementPlanId;
    }

    public void setProcurementPlanId(String procurementPlanId) {
        this.procurementPlanId = procurementPlanId;
    }

    public String getCreateName() {
        return createName;
    }

    public void setCreateName(String createName) {
        this.createName = createName;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getAdjustName() {
        return adjustName;
    }

    public void setAdjustName(String adjustName) {
        this.adjustName = adjustName;
    }

    public Date getAdjustDate() {
        return adjustDate;
    }

    public void setAdjustDate(Date adjustDate) {
        this.adjustDate = adjustDate;
    }

    public String getApprovalName() {
        return approvalName;
    }

    public void setApprovalName(String approvalName) {
        this.approvalName = approvalName;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    @Override
    public String toString() {
        return "ProcurementPlan{" +
                "procurementPlanId='" + procurementPlanId + '\'' +
                ", createName='" + createName + '\'' +
                ", createDate=" + createDate +
                ", adjustName='" + adjustName + '\'' +
                ", adjustDate=" + adjustDate +
                ", approvalName='" + approvalName + '\'' +
                ", checkState=" + checkState +
                '}';
    }
}
