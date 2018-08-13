package com.jdlink.mapper;

import com.jdlink.domain.Produce.Threshold;

import java.util.List;

public interface ThresholdMapper {
    List<Threshold> list();
    Threshold getByHandleCategory(String handleCategory);
}
