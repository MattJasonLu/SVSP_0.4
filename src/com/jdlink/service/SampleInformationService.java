package com.jdlink.service;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Produce.SampleInformationItem;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface SampleInformationService {
    void add(SampleInformation sampleInformation);
    int count();
    int wastesCountById(String id);
    int countById(String id);
    List<SampleInformation> listPage(Page page);
    SampleInformation getById(String sampleId);
    void confirmCheck(SampleInformation sampleInformation);
    void update(SampleInformation sampleInformation);
    List<SampleInformation> listByKeyword(String keyword);
    void updateSampleInfo(String sampleId,String newId);
    int searchCount(SampleInformation sampleInformation);
    List<SampleInformation> search(SampleInformation sampleInformation);
    SampleInformation getBySampleInformationId(String id);
    Wastes getByWastesId(String id);
    List<Wastes> listWastes();
    List<Client> listClient();
    List<SampleInformation> getSampleInfoByClientId(String id);
    void deleteById(String id);
    void rejectSampleInfoById(String sampleId,String advice);
    int countItem();
    List<SampleInformationItem> listItemPage(Page page);
    int searchItemCount(SampleInformationItem sampleInformationItem);
    List<SampleInformationItem> searchItem(SampleInformationItem sampleInformationItem);
}
