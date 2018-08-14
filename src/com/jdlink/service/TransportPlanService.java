package com.jdlink.service;

import com.jdlink.domain.Produce.TransportPlan;

/**
 * Created by matt on 2018/8/9.
 * DoubleClickTo 666
 */
public interface TransportPlanService {
    void add(TransportPlan transportPlan);

    TransportPlan getRecent();
}
