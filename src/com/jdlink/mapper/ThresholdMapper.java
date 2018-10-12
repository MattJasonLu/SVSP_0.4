package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Threshold;
import com.jdlink.domain.Produce.ThresholdList;

import java.util.List;

public interface ThresholdMapper {
    List<Threshold> list(String id);
    List<ThresholdList> listOut(Page page);
    Threshold getByHandleCategory(String handleCategory);
    //根据进料类别返回安全库存量
    float getSafety(String handleCategory);
    void update(Threshold threshold);
    void add(ThresholdList thresholds);
    void deleteAll(String id);
    int count();
    int countById(String id);
    int searchCount(ThresholdList thresholdList);
    List<ThresholdList> search(ThresholdList thresholdList);
    ThresholdList getById(String id);
    void updateStateEnable(String id);
    void updateStateDisabled(String id);
    Threshold getThresholdByHandleCategoryAndFormType(String handleCategory,String formType);
}
