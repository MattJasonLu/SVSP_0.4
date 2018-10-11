package com.jdlink.service.impl;

import com.jdlink.domain.Produce.Threshold;
import com.jdlink.mapper.ThresholdMapper;
import com.jdlink.service.ThresholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThresholdServiceImpl implements ThresholdService {
    @Autowired
    ThresholdMapper thresholdMapper;
    @Override
    public List<Threshold> list() {
        return thresholdMapper.list();
    }

    @Override
    public Threshold getByHandleCategory(String handleCategory) {
        return thresholdMapper.getByHandleCategory(handleCategory);
    }

    @Override
    public float getSafety(String handleCategory) {
        return thresholdMapper.getSafety(handleCategory);
    }

    @Override
    public void update(Threshold threshold){ thresholdMapper.update(threshold); }

    @Override
    public  void add(Threshold threshold){ thresholdMapper.add(threshold); }

    @Override
    public void deleteAll(){ thresholdMapper.deleteAll(); }

    @Override
    public Threshold getThresholdByHandleCategoryAndFormType(String handleCategory, String formType) {
        return thresholdMapper.getThresholdByHandleCategoryAndFormType(handleCategory,formType);
    }
}
