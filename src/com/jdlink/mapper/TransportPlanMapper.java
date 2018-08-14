package com.jdlink.mapper;

import com.jdlink.domain.Produce.TransportPlan;

/**
 * Created by matt on 2018/8/9.
 */
public interface TransportPlanMapper {

    void add(TransportPlan transportPlan);

    TransportPlan getRecent();

}
