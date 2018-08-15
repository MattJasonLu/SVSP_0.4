package com.jdlink.mapper;

import com.jdlink.domain.Produce.TransportPlan;

/**
 * Created by matt on 2018/8/9.
 */
public interface TransportPlanMapper {

    void add(TransportPlan transportPlan);

    void update(TransportPlan transportPlan);

    TransportPlan getRecent();

    TransportPlan getById(String id);

    void setStateConfirm(String id);

    void setStateSubmit(String id);

    void setStateExamined(String id);

    void setStateInvalid(String id);

}
