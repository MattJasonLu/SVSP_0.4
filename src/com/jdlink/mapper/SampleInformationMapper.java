package com.jdlink.mapper;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Wastes;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SampleInformationMapper {
    void add(SampleInformation sampleInformation);
    int count();
    int wastesCount();
    List<SampleInformation> listPage(Page page);
    SampleInformation getById(String sampleId);
    void confirmCheck(String sampleId);
    void update(SampleInformation sampleInformation);
    List<SampleInformation> listByKeyword(@Param(value="keyword") String keyword);
    void updateSampleInfo(String sampleId);
    int searchCount(SampleInformation sampleInformation);
    List<SampleInformation> search(SampleInformation sampleInformation);
    SampleInformation getBySampleInformationId(String id);
    Wastes getByWastesId(String id);
    List<Wastes> listWastes();
    List<Client> listClient();
    List<SampleInformation> getSampleInfoByClientId(String id);
}
