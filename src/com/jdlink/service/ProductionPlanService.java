package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ProductionPlan;

import java.util.List;

public interface ProductionPlanService {
    /**
     * 总记录数
     * @return
     */
    int count();

    /**
     * 符合搜索内容的总记录数
     * @param productionPlan
     * @return
     */
    int searchCount(ProductionPlan productionPlan);

    /**
     * 搜索分页数据
     * @param page
     * @return
     */
    List<ProductionPlan> listPage(Page page);

    /**
     * 搜索功能
     * @param productionPlan
     * @return
     */
    List<ProductionPlan> search(ProductionPlan productionPlan);

    /**
     * 审批通过
     * @param productionPlan
     */
    void approval(ProductionPlan productionPlan);

    /**
     * 审批驳回
     * @param productionPlan
     */
    void reject(ProductionPlan productionPlan);

    /**
     * 提交
     * @param id
     */
    void submit(String id);

    /**
     * 作废
     * @param id
     */
    void invalid(String id);

    /**
     * 确认
     * @param id
     */
    void confirm(String id);

    /**
     * 根据ID获取数据
     * @param id
     * @return
     */
    ProductionPlan getById(String id);

    /**
     * 删除
     * @param id
     */
    void delete(String id);

    /**
     * 新增数据
     * @param productionPlan
     */
    void add(ProductionPlan productionPlan);

    /**
     * 获取当天记录数
     * @param id
     * @return
     */
    int countById(String id);

    void update(ProductionPlan productionPlan);

}
