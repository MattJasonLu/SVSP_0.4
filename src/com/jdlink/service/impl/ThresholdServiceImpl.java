package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Threshold;
import com.jdlink.domain.Produce.ThresholdList;
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
    public  List<ThresholdList> listOut(Page page){ return thresholdMapper.listOut(page); }

    @Override
    public List<Threshold> list(String id) {
        return thresholdMapper.list(id);
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
    public  void add(ThresholdList thresholdList){ thresholdMapper.add(thresholdList); }

    @Override
    public void deleteAll(String id){ thresholdMapper.deleteAll(id); }

    @Override
    public int count() { return thresholdMapper.count(); }

    @Override
    public int countById(String id){ return thresholdMapper.countById(id); }

    @Override
    public int searchCount(ThresholdList thresholdList){ return thresholdMapper.searchCount(thresholdList); }

    @Override
    public List<ThresholdList> search(ThresholdList thresholdList){ return thresholdMapper.search(thresholdList); }

    @Override
    public ThresholdList getById(String id){ return thresholdMapper.getById(id); }

    @Override
    public void updateStateEnable(String id){ thresholdMapper.updateStateEnable(id); }

    @Override
    public void updateStateDisabled(String id){thresholdMapper.updateStateDisabled(id); }

    @Override
    public Threshold getThresholdByHandleCategoryAndFormType(String handleCategory, String formType) {
        return thresholdMapper.getThresholdByHandleCategoryAndFormType(handleCategory,formType);
    }
}
