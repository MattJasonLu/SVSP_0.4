package com.jdlink.service.produce.impl;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ReceiveSampleAnalysis;
import com.jdlink.mapper.produce.ReceiveSampleAnalysisMapper;
import com.jdlink.service.produce.ReceiveSampleAnalysisService;
import com.jdlink.util.RandomUtil;
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
    public ReceiveSampleAnalysis getById(String id) {
        return receiveSampleAnalysisMapper.getById(id);
    }

    @Override
    public int count(ReceiveSampleAnalysis receiveSampleAnalysis) {
        return receiveSampleAnalysisMapper.count(receiveSampleAnalysis);
    }

    @Override
    public void add(ReceiveSampleAnalysis receiveSampleAnalysis) {
        receiveSampleAnalysisMapper.add(receiveSampleAnalysis);
    }

    @Override
    public void setState(String id, CheckState checkState) {
        String newId = RandomUtil.getRandomEightNumber();
        receiveSampleAnalysisMapper.setState(id, checkState, newId);
    }
}
