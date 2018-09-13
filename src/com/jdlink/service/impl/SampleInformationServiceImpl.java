package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Sample;
import com.jdlink.domain.Wastes;
import com.jdlink.mapper.SampleInformationMapper;
import com.jdlink.service.SampleInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SampleInformationServiceImpl implements SampleInformationService {
    @Autowired
    SampleInformationMapper sampleInformationMapper;

    @Override
    public void add(SampleInformation sampleInformation){
        sampleInformationMapper.add(sampleInformation);
    }

    @Override
    public int count(){ return sampleInformationMapper.count(); }

    @Override
    public int wastesCount(){ return sampleInformationMapper.wastesCount(); }

    @Override
    public List<SampleInformation> listPage(Page page){ return sampleInformationMapper.listPage(page); }

    @Override
    public SampleInformation getById(String sampleId){ return sampleInformationMapper.getById(sampleId); }

    @Override
    public void confirmCheck(String sampleId){ sampleInformationMapper.confirmCheck(sampleId); }

    @Override
    public void update(SampleInformation sampleInformation){ sampleInformationMapper.update(sampleInformation); }

    @Override
    public List<SampleInformation> listByKeyword(String keyword){ return sampleInformationMapper.listByKeyword(keyword); }

    @Override
    public void updateSampleInfo(String sampleId){ sampleInformationMapper.updateSampleInfo(sampleId); }

    @Override
    public int searchCount(SampleInformation sampleInformation){ return sampleInformationMapper.searchCount(sampleInformation); }

    @Override
    public List<SampleInformation> search(SampleInformation sampleInformation){ return sampleInformationMapper.search(sampleInformation); }

    @Override
    public SampleInformation getBySampleInformationId(String id){ return sampleInformationMapper.getBySampleInformationId(id); }

    @Override
    public Wastes getByWastesId(String id){ return sampleInformationMapper.getByWastesId(id); }

    @Override
    public List<String> listWastesCode(){ return sampleInformationMapper.listWastesCode(); }

    @Override
    public List<String> listClientId(){ return sampleInformationMapper.listClientId(); }
}
