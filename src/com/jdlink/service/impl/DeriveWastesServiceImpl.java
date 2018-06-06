package com.jdlink.service.impl;

import com.jdlink.domain.DeriveWastes;
import com.jdlink.mapper.DeriveWastesMapper;
import com.jdlink.service.DeriveWastesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/5/4.
 */
@Service
public class DeriveWastesServiceImpl implements DeriveWastesService {
    @Autowired
    DeriveWastesMapper deriveWastesMapper;

    @Override
    public void add(DeriveWastes deriveWastes) {
        deriveWastesMapper.add(deriveWastes);
    }

    @Override
    public void delete(String id) {
        deriveWastesMapper.delete(id);
    }

    @Override
    public DeriveWastes getById(String id) {
        return deriveWastesMapper.getById(id);
    }

    @Override
    public List<DeriveWastes> getByQuestionnaireId(String questionnaireId) {
        return deriveWastesMapper.getByQuestionnaireId(questionnaireId);
    }

    @Override
    public void update(DeriveWastes deriveWastes) {
        deriveWastesMapper.update(deriveWastes);
    }

    @Override
    public List<DeriveWastes> list() {
        return deriveWastesMapper.list();
    }

    @Override
    public int count() {
        return deriveWastesMapper.count();
    }
}
