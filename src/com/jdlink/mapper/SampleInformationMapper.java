package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;

import java.util.List;

public interface SampleInformationMapper {
    void add(SampleInformation sampleInformation);
    int count();
    List<SampleInformation> listPage(Page page);
    SampleInformation getByCode(String companyCode);
    void addCheck(String companyCode);
    void update(SampleInformation sampleInformation);
}
