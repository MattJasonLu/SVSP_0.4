package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface SampleInformationService {
    void add(SampleInformation sampleInformation);
    int count();
    int wastesCount();
    List<SampleInformation> listPage(Page page);
    SampleInformation getById(String sampleId);
    void confirmCheck(String sampleId);
    void update(SampleInformation sampleInformation);
    List<SampleInformation> listByKeyword(String keyword);
    void updateSampleInfo(String sampleId);
    int searchCount(SampleInformation sampleInformation);
    List<SampleInformation> search(SampleInformation sampleInformation);
    SampleInformation getBySampleInformationId(String id);
    Wastes getByWastesId(String id);
    List<String> listWastesCode();
    List<String> listClientId();
}
