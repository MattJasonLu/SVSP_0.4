package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Page;

import java.util.Date;
import java.util.List;

/**
 * 处置类别阈值表
 */
public class ThresholdList {
    /**
     * 编号
     */
    private String id;
    /**
     * 创建日期
     */
    private Date creationDate;
    /**
     *  状态
     */
    private CheckState state;
    /**
     * 处置类别阈值表数据
     */
    private List<Threshold> thresholdList;
    /**
     * 搜索关键字
     */
    private String keywords;
    /**
     * 起始日期
     */
    private Date startDate;
    /**
     * 终止日期
     */
    private Date endDate;
    /**
     * 分页
     */
    private Page page;

    /**
     *
     * 状态数据字典
     */
    private CheckStateItem checkStateItem;

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    public CheckState getState() {
        return state;
    }

    public void setState(CheckState state) {
        this.state = state;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
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

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public List<Threshold> getThresholdList() {
        return thresholdList;
    }

    public void setThresholdList(List<Threshold> thresholdList) {
        this.thresholdList = thresholdList;
    }
}
