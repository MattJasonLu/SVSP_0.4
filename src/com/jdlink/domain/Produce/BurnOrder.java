package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;

import java.util.Date;

public class BurnOrder {
    /**
     * 焚烧工单编号
     */
    private String id;
    /**
     * 焚烧工单创建日期
     */
    private Date creationDate;
    /**
     * 预处理单数据
     */
    private Pretreatment pretreatment;
    /**
     * 分页
     */
    private Page page;
    /**
     * 焚烧工单状态
     */
    private CheckState state;

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

    public Pretreatment getPretreatment() {
        return pretreatment;
    }

    public void setPretreatment(Pretreatment pretreatment) {
        this.pretreatment = pretreatment;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public CheckState getState() {
        return state;
    }

    public void setState(CheckState state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "BurnOrder{" +
                "id='" + id + '\'' +
                ", creationDate=" + creationDate +
                ", pretreatment=" + pretreatment +
                ", page=" + page +
                ", state=" + state +
                '}';
    }
}
