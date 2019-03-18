package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.TransportPlan;

import java.util.List;

/**
 * Created by matt on 2018/8/9.
 * DoubleClickTo 666
 */
public interface TransportPlanService {

    void add(TransportPlan transportPlan);

    void update(TransportPlan transportPlan);

    TransportPlan getRecent();

    TransportPlan getById(String id);

    void setStateConfirm(String id);

    void setStateSubmit(String id);

    void setStateExamined(String id);

    void setStateInvalid(String id);

    /**
     * 获取运输计划的分页数据
     * @param page 页码
     * @return 运输计划单
     */
    List<TransportPlan> list(Page page);

    /**
     * 获取运输计划单的数量
     * @return 数量
     */
    int count();

    /**
     * 查询运输计划
     * @param transportPlan 运输计划
     * @return 查询到的运输计划列表
     */
    List<TransportPlan> search(TransportPlan transportPlan);

    /**
     * 查询数量
     * @param transportPlan 运输计划
     * @return 查询数量
     */
    int searchCount(TransportPlan transportPlan);


    void setStateBack(String id);
}
