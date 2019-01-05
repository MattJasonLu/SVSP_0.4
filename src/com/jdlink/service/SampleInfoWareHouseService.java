package com.jdlink.service;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Produce.SampleInformationItem;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface SampleInfoWareHouseService {
    void add(SampleInformation sampleInformation);
    int count();
    int wastesCountById(String id);
    int countById(String id);
    List<SampleInformation> listPage(Page page);
    SampleInformation getById(String sampleId);
    void confirmCheck(String sampleId,String laboratorySigner);
    void confirmAllCheck(SampleInformation sampleInformation);
    void update(SampleInformation sampleInformation);
    List<SampleInformation> listByKeyword(String keyword);
    void updateSampleInfo(String sampleId,String newId);
    int searchCount(SampleInformation sampleInformation);
    int getCountByTransferId(String transferId);
    List<SampleInformation> search(SampleInformation sampleInformation);
    SampleInformation getBySampleInformationId(String id);
    Wastes getByWastesId(String id);
    List<Wastes> listWastes();
    List<Client> listClient();
    List<SampleInformation> getSampleInfoByClientId(String id);
    void deleteById(String id);
    void rejectSampleInfoById(String sampleId,String advice);
    int countItem();
    int searchItemCount(SampleInformationItem sampleInformationItem);
    List<SampleInformationItem> listItemPage(Page page);
    List<SampleInformationItem> searchItem(SampleInformationItem sampleInformationItem);
}
