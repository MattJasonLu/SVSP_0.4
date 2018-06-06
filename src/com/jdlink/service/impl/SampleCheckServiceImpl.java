package com.jdlink.service.impl;

import com.jdlink.domain.SampleCheck;
import com.jdlink.mapper.SampleCheckMapper;
import com.jdlink.service.SampleCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/5/15.
 */
@Service
public class SampleCheckServiceImpl implements SampleCheckService {
    @Autowired
    SampleCheckMapper sampleCheckMapper;

    @Override
    public void add(SampleCheck sampleCheck) {
        sampleCheckMapper.add(sampleCheck);
    }

    @Override
    public void delete(String checkId) {
        sampleCheckMapper.delete(checkId);
    }

    @Override
    public SampleCheck getById(String checkId) {
        return sampleCheckMapper.getById(checkId);
    }

    @Override
    public List<SampleCheck> list() {
        return sampleCheckMapper.list();
    }
}
