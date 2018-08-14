package com.jdlink.domain.Produce;

import java.util.ArrayList;
import java.util.List;


/**
 * Created by matt on 2018/8/9.
 * DoubleClickTo 666
 * 运输计划
 */
public class TransportPlan {
    /**
     * 计划编号
     */
    private String id;
    /**
     * 运输计划条目列表
     */
    private List<TransportPlanItem> transportPlanItemList = new ArrayList<>();
    /**
     * 制表人
     */
    private String author;
    /**
     * 部门主管
     */
    private String departmentDirector;
    /**
     * 生产负责人
     */
    private String productionDirector;
    /**
     * 组别
     */
    private String group;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<TransportPlanItem> getTransportPlanItemList() {
        return transportPlanItemList;
    }

    public void setTransportPlanItemList(List<TransportPlanItem> transportPlanItemList) {
        this.transportPlanItemList = transportPlanItemList;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDepartmentDirector() {
        return departmentDirector;
    }

    public void setDepartmentDirector(String departmentDirector) {
        this.departmentDirector = departmentDirector;
    }

    public String getProductionDirector() {
        return productionDirector;
    }

    public void setProductionDirector(String productionDirector) {
        this.productionDirector = productionDirector;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }
}


