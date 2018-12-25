package com.jdlink.service.produce.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.WastesInfo;
import com.jdlink.mapper.produce.WastesMangerMapper;
import com.jdlink.service.produce.WastesMangerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WastesMangerServiceImpl implements WastesMangerService {
    @Autowired
    WastesMangerMapper wastesMangerMapper;

    @Override
    public List<WastesInfo> list(Page page) {
        return wastesMangerMapper.list(page);
    }

    @Override
    public int totalWastesMangerRecord() {
        return wastesMangerMapper.totalWastesMangerRecord();
    }
}
