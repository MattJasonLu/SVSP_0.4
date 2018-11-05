package com.jdlink.service.impl;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Produce.SampleInformationItem;
import com.jdlink.domain.Wastes;
import com.jdlink.mapper.SampleInfoWareHouseMapper;
import com.jdlink.service.SampleInfoWareHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SampleInfoWareHouseServiceImpl  implements SampleInfoWareHouseService {
    @Autowired
    SampleInfoWareHouseMapper sampleInfoWareHouseMapper;

    @Override
    public void add(SampleInformation sampleInformation){
        sampleInfoWareHouseMapper.add(sampleInformation);
    }

    @Override
    public int count(){ return sampleInfoWareHouseMapper.count(); }

    @Override
    public int wastesCountById(String id){ return sampleInfoWareHouseMapper.wastesCountById(id); }

    @Override
    public int countById(String id){ return sampleInfoWareHouseMapper.countById(id);}

    @Override
    public List<SampleInformation> listPage(Page page){ return sampleInfoWareHouseMapper.listPage(page); }

    @Override
    public SampleInformation getById(String sampleId){ return sampleInfoWareHouseMapper.getById(sampleId); }

    @Override
    public void confirmCheck(String sampleId,String laboratorySigner){ sampleInfoWareHouseMapper.confirmCheck(sampleId,laboratorySigner); }

    @Override
    public void update(SampleInformation sampleInformation){ sampleInfoWareHouseMapper.update(sampleInformation); }

    @Override
    public List<SampleInformation> listByKeyword(String keyword){ return sampleInfoWareHouseMapper.listByKeyword(keyword); }

    @Override
    public void updateSampleInfo(String sampleId){ sampleInfoWareHouseMapper.updateSampleInfo(sampleId); }

    @Override
    public int searchCount(SampleInformation sampleInformation){ return sampleInfoWareHouseMapper.searchCount(sampleInformation); }

    @Override
    public List<SampleInformation> search(SampleInformation sampleInformation){ return sampleInfoWareHouseMapper.search(sampleInformation); }

    @Override
    public SampleInformation getBySampleInformationId(String id){ return sampleInfoWareHouseMapper.getBySampleInformationId(id); }

    @Override
    public Wastes getByWastesId(String id){ return sampleInfoWareHouseMapper.getByWastesId(id); }

    @Override
    public List<Wastes> listWastes(){ return sampleInfoWareHouseMapper.listWastes(); }

    @Override
    public List<Client> listClient(){ return sampleInfoWareHouseMapper.listClient(); }

    @Override
    public List<SampleInformation> getSampleInfoByClientId(String id){ return sampleInfoWareHouseMapper.getSampleInfoByClientId(id); }

    @Override
    public void deleteById(String id){ sampleInfoWareHouseMapper.deleteById(id);}

    @Override
    public void rejectSampleInfoById(String sampleId,String advice){ sampleInfoWareHouseMapper.rejectSampleInfoById(sampleId,advice);}

    @Override
    public int countItem(){ return sampleInfoWareHouseMapper.countItem();}

    @Override
    public int searchItemCount(SampleInformationItem sampleInformationItem){ return sampleInfoWareHouseMapper.searchItemCount(sampleInformationItem);  }

    @Override
    public List<SampleInformationItem> listItemPage(Page page){ return sampleInfoWareHouseMapper.listItemPage(page); }

    @Override
    public List<SampleInformationItem> searchItem(SampleInformationItem sampleInformationItem){ return sampleInfoWareHouseMapper.searchItem(sampleInformationItem);}

}
