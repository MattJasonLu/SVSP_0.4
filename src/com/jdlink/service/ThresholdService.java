package com.jdlink.service;

import com.jdlink.domain.Produce.Threshold;

import java.util.List;

public interface ThresholdService {
    List<Threshold> list();
    Threshold getByHandleCategory(String handleCategory);
    float getSafety(String handleCategory);
    void update(Threshold threshold);
    void add(Threshold threshold);
    void deleteAll();
    Threshold getThresholdByHandleCategoryAndFormType(String handleCategory,String formType);
}
