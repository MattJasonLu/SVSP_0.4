package com.jdlink.service.impl;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Produce.SampleInformationItem;
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
    public int wastesCountById(String id){ return sampleInformationMapper.wastesCountById(id); }

    @Override
    public int countById(String id){ return sampleInformationMapper.countById(id);}

    @Override
    public List<SampleInformation> listPage(Page page){ return sampleInformationMapper.listPage(page); }

    @Override
    public SampleInformation getById(String sampleId){ return sampleInformationMapper.getById(sampleId); }

    @Override
    public void confirmCheck(SampleInformation sampleInformation){ sampleInformationMapper.confirmCheck(sampleInformation); }

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
    public List<Wastes> listWastes(){ return sampleInformationMapper.listWastes(); }

    @Override
    public List<Client> listClient(){ return sampleInformationMapper.listClient(); }

    @Override
    public List<SampleInformation> getSampleInfoByClientId(String id){ return sampleInformationMapper.getSampleInfoByClientId(id); }

    @Override
    public void deleteById(String id){ sampleInformationMapper.deleteById(id);}

    @Override
    public void rejectSampleInfoById(String sampleId,String advice){ sampleInformationMapper.rejectSampleInfoById(sampleId,advice);}

    @Override
    public int countItem(){ return sampleInformationMapper.countItem();}

    @Override
    public List<SampleInformationItem> listItemPage(Page page){ return sampleInformationMapper.listItemPage(page);}

    @Override
    public int searchItemCount(SampleInformationItem sampleInformationItem){ return sampleInformationMapper.searchItemCount(sampleInformationItem); }

    @Override
    public List<SampleInformationItem> searchItem(SampleInformationItem sampleInformationItem){ return sampleInformationMapper.searchItem(sampleInformationItem); }

}
