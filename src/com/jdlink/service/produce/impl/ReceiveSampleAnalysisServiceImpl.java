package com.jdlink.service.produce.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ReceiveSampleAnalysis;
import com.jdlink.mapper.produce.ReceiveSampleAnalysisMapper;
import com.jdlink.service.produce.ReceiveSampleAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceiveSampleAnalysisServiceImpl implements ReceiveSampleAnalysisService {

    @Autowired
    ReceiveSampleAnalysisMapper receiveSampleAnalysisMapper;

    @Override
    public List<ReceiveSampleAnalysis> get(Page page, ReceiveSampleAnalysis receiveSampleAnalysis) {
        return receiveSampleAnalysisMapper.get(page, receiveSampleAnalysis);
    }

    @Override
    public int count(ReceiveSampleAnalysis receiveSampleAnalysis) {
        return receiveSampleAnalysisMapper.count(receiveSampleAnalysis);
    }

    @Override
    public void add(ReceiveSampleAnalysis receiveSampleAnalysis) {
        receiveSampleAnalysisMapper.add(receiveSampleAnalysis);
    }
}
