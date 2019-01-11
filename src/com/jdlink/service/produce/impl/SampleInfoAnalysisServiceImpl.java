package com.jdlink.service.produce.impl;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ReceiveSampleAnalysis;
import com.jdlink.domain.Produce.SampleInfoAnalysis;
import com.jdlink.mapper.produce.SampleInfoAnalysisMapper;
import com.jdlink.service.produce.SampleInfoAnalysisService;
import com.jdlink.util.RandomUtil;
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
        // 为零则设置为-9999
        if (sampleInfoAnalysis.getPH() == 0) sampleInfoAnalysis.setPH(-9999);
        if (sampleInfoAnalysis.getAsh() == 0) sampleInfoAnalysis.setAsh(-9999);
        if (sampleInfoAnalysis.getWater() == 0) sampleInfoAnalysis.setWater(-9999);
        if (sampleInfoAnalysis.getHeat() == 0) sampleInfoAnalysis.setHeat(-9999);
        if (sampleInfoAnalysis.getSulfur() == 0) sampleInfoAnalysis.setSulfur(-9999);
        if (sampleInfoAnalysis.getChlorine() == 0) sampleInfoAnalysis.setChlorine(-9999);
        if (sampleInfoAnalysis.getFluorine() == 0) sampleInfoAnalysis.setFluorine(-9999);
        if (sampleInfoAnalysis.getPhosphorus() == 0) sampleInfoAnalysis.setPhosphorus(-9999);
        if (sampleInfoAnalysis.getFlashPoint() == 0) sampleInfoAnalysis.setFlashPoint(-9999);
        sampleInfoAnalysisMapper.add(sampleInfoAnalysis);
    }

    @Override
    public void setState(String id, CheckState checkState) {
        String newId = RandomUtil.getRandomEightNumber();
        sampleInfoAnalysisMapper.setState(id, checkState, newId);
    }

    @Override
    public List<ReceiveSampleAnalysis> getByMoreFactor(String clientId, String wastesCode, String wastesName) {
        return sampleInfoAnalysisMapper.getByMoreFactor(clientId, wastesCode, wastesName);
    }


}
