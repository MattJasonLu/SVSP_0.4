package com.jdlink.domain.Produce;

import com.jdlink.domain.Client;
import com.jdlink.domain.Wastes;

import java.util.Date;

/**
 * Created by matt on 2018/8/9.
 * DoubleClickTo 666
 * 运输计划条目
 */
public class TransportPlanItem {
    /**
     * 条目编号
     */
    private String id;
    /**
     * 产废单位
     */
    private Client produceCompany;
    /**
     * 处置类别
     */
    private HandleCategory handleCategory;
    /**
     * 入场时间
     */
    private Date approachTime;
    /**
     * 危废信息
     */
    private Wastes wastes;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
    }

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }

    public Date getApproachTime() {
        return approachTime;
    }

    public void setApproachTime(Date approachTime) {
        this.approachTime = approachTime;
    }

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
    }
}
