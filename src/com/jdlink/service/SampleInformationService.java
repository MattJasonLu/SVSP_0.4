package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;

import java.util.List;

public interface SampleInformationService {
    void add(SampleInformation sampleInformation);
    int count();
    List<SampleInformation> listPage(Page page);
    SampleInformation getByCode(String companyCode);
    void addCheck(String companyCode);
    void update(SampleInformation sampleInformation);
    List<SampleInformation> listByKeyword(String keyword);
    void updateSampleInfo(String companyCode);
    int searchCount(SampleInformation sampleInformation);
    List<SampleInformation> search(SampleInformation sampleInformation);
}
