package com.jdlink.mapper;

import com.jdlink.domain.Produce.Threshold;

import java.util.List;

public interface ThresholdMapper {
    List<Threshold> list();
    Threshold getByHandleCategory(String handleCategory);
    //根据进料类别返回安全库存量
    float getSafety(String handleCategory);
}
