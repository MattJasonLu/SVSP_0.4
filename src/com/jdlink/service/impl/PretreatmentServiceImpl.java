package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Pretreatment;
import com.jdlink.domain.Wastes;
import com.jdlink.mapper.PretreatmentMapper;
import com.jdlink.service.PoundsService;
import com.jdlink.service.PretreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PretreatmentServiceImpl implements PretreatmentService {
    @Autowired
    PretreatmentMapper pretreatmentMapper;

    @Override
    public int count() {
        return pretreatmentMapper.count();
    }

    @Override
    public void add(Pretreatment pretreatment) {
        pretreatmentMapper.add(pretreatment);
    }

    @Override
    public List<Pretreatment> listPage(Page page) {
        return pretreatmentMapper.listPage(page);
    }

    @Override
    public Pretreatment getById(String id) {
        return pretreatmentMapper.getById(id);
    }

    @Override
    public List<Pretreatment> search(Pretreatment pretreatment) {
        return pretreatmentMapper.search(pretreatment);
    }

    @Override
    public int searchCount(Pretreatment pretreatment) {
        return pretreatmentMapper.searchCount(pretreatment);
    }

    @Override
    public int countById(String id) {
        return pretreatmentMapper.countById(id);
    }

    @Override
    public void invalid(String id) {
        pretreatmentMapper.invalid(id);
    }

    @Override
    public void adjust(Wastes wastes) {
        pretreatmentMapper.adjust(wastes);
    }
    
}
