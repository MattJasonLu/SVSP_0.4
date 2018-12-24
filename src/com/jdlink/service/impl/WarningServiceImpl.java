package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Warning;
import com.jdlink.mapper.WarningMapper;
import com.jdlink.service.WarningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarningServiceImpl implements WarningService {
    @Autowired
    WarningMapper warningMapper;
    @Override
    public void add(Warning warning) {
        warningMapper.add(warning);
    }

    @Override
    public void updateWarning(Warning warning) {
        warningMapper.updateWarning(warning);
    }

    @Override
    public float getThresholdById(int id) {
        return warningMapper.getThresholdById(id);
    }

    @Override
    public List<Warning> loadWarningList(Page page) {
        return warningMapper.loadWarningList(page);
    }

    @Override
    public List<Warning> searchWaring(Warning warning) {
        return warningMapper.searchWaring(warning);
    }

    @Override
    public void deleteWarning(int id) {
        warningMapper.deleteWarning(id);
    }

    @Override
    public int totalWarningRecord() {
        return warningMapper.totalWarningRecord();
    }

    @Override
    public int searchWaringCount(Warning warning) {
        return warningMapper.searchWaringCount(warning);
    }
}
