package com.jdlink.service.produce.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInfoAnalysis;
import com.jdlink.mapper.produce.SampleInfoAnalysisMapper;
import com.jdlink.service.produce.SampleInfoAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SampleInfoAnalysisServiceImpl implements SampleInfoAnalysisService {

    @Autowired
    SampleInfoAnalysisMapper sampleInfoAnalysisMapper;

    @Override
    public List<SampleInfoAnalysis> get(Page page, SampleInfoAnalysis sampleInfoAnalysis) {
        return sampleInfoAnalysisMapper.get(page, sampleInfoAnalysis);
    }

    @Override
    public SampleInfoAnalysis getById(String id) {
        return sampleInfoAnalysisMapper.getById(id);
    }

    @Override
    public void update(SampleInfoAnalysis sampleInfoAnalysis) {
        sampleInfoAnalysisMapper.update(sampleInfoAnalysis);
    }

    @Override
    public int count(SampleInfoAnalysis sampleInfoAnalysis) {
        return sampleInfoAnalysisMapper.count(sampleInfoAnalysis);
    }

    @Override
    public void add(SampleInfoAnalysis sampleInfoAnalysis) {
        sampleInfoAnalysisMapper.add(sampleInfoAnalysis);
    }
}
