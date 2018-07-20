package com.jdlink.service.impl;

import com.jdlink.domain.Cost;
import com.jdlink.mapper.CostMapper;
import com.jdlink.service.CostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/7/5.
 */
@Service
public class CostServiceImpl implements CostService {
    @Autowired
    CostMapper costMapper;

    @Override
    public void add(Cost cost) {
        costMapper.add(cost);
    }

    @Override
    public void update(Cost cost) {
        costMapper.update(cost);
    }

    @Override
    public List<Cost> list() {
        return costMapper.list();
    }

    @Override
    public int count() {
        return costMapper.count();
    }

    @Override
    public Cost getById(String costId) {
        return costMapper.getById(costId);
    }

    @Override
    public void setStateDisabled(String costId) {
        costMapper.setStateDisabled(costId);
    }

    @Override
    public void changeEndDate(Cost cost) {
        costMapper.changeEndDate(cost);
    }

    @Override
    public List<Cost> getByKeyword(String keyword) {
        return costMapper.getByKeyword(keyword);
    }
}
