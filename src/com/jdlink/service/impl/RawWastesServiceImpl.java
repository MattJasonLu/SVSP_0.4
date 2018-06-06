package com.jdlink.service.impl;

import com.jdlink.domain.RawWastes;
import com.jdlink.mapper.RawWastesMapper;
import com.jdlink.service.RawWastesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/5/3.
 */
@Service
public class RawWastesServiceImpl implements RawWastesService {

    @Autowired
    RawWastesMapper rawWastesMapper;

    @Override
    public void add(RawWastes rawWastes) {
        rawWastesMapper.add(rawWastes);
    }

    @Override
    public void delete(String materialId) {
        rawWastesMapper.delete(materialId);
    }

    @Override
    public RawWastes get(String materialId) {
        return rawWastesMapper.get(materialId);
    }

    @Override
    public List<RawWastes> getByQuestionnaireId(String questionnaireId) {
        return rawWastesMapper.getByQuestionnaireId(questionnaireId);
    }

    @Override
    public void update(RawWastes rawWastes) {
        rawWastesMapper.update(rawWastes);
    }

    @Override
    public List<RawWastes> list() {
        return rawWastesMapper.list();
    }

    @Override
    public int count() {
        return rawWastesMapper.count();
    }
}
