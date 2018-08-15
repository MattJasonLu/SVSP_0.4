package com.jdlink.service.impl;

import com.jdlink.domain.Produce.TransportPlan;
import com.jdlink.mapper.TransportPlanMapper;
import com.jdlink.service.TransportPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by matt on 2018/8/9.
 * DoubleClickTo 666
 */
@Service
public class TransportPlanServiceImpl implements TransportPlanService {
    @Autowired
    TransportPlanMapper transportPlanMapper;

    @Override
    public void add(TransportPlan transportPlan) {
        transportPlanMapper.add(transportPlan);
    }

    @Override
    public TransportPlan getRecent() {
        return transportPlanMapper.getRecent();
    }

    @Override
    public void setStateConfirm(String id) {
        transportPlanMapper.setStateConfirm(id);
    }

    @Override
    public void setStateSubmit(String id) {
        transportPlanMapper.setStateSubmit(id);
    }

    @Override
    public void setStateExamined(String id) {
        transportPlanMapper.setStateExamined(id);
    }

    @Override
    public void setStateInvalid(String id) {
        transportPlanMapper.setStateInvalid(id);
    }
}
