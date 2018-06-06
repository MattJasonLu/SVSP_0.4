package com.jdlink.service.impl;

import com.jdlink.domain.WasteProcess;
import com.jdlink.mapper.WasteProcessMapper;
import com.jdlink.service.WasteProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/5/3.
 */
@Service
public class WasteProcessServiceImpl implements WasteProcessService {

    @Autowired
    WasteProcessMapper wasteProcessMapper;

    @Override
    public void add(WasteProcess wasteProcess) {
        wasteProcessMapper.add(wasteProcess);
    }

    @Override
    public void delete(String processId) {
        wasteProcessMapper.delete(processId);
    }

    @Override
    public WasteProcess get(String processId) {
        return wasteProcessMapper.get(processId);
    }

    @Override
    public void update(WasteProcess wasteProcess) {
        wasteProcessMapper.update(wasteProcess);
    }

    @Override
    public List<WasteProcess> getByQuestionnaireId(String questionnaireId) {
        return wasteProcessMapper.getByQuestionnaireId(questionnaireId);
    }

    @Override
    public List<WasteProcess> list() {
        return wasteProcessMapper.list();
    }

    @Override
    public int count() {
        return wasteProcessMapper.count();
    }
}
