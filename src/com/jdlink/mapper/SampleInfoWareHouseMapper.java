package com.jdlink.mapper;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.domain.Produce.SampleInformationItem;
import com.jdlink.domain.Wastes;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SampleInfoWareHouseMapper {
    void add(SampleInformation sampleInformation);
    int count();
    int wastesCountById(String id);
    int countById(String id);
    List<SampleInformation> listPage(Page page);
    SampleInformation getById(String sampleId);
    void confirmCheck(@Param("sampleId") String sampleId, @Param("laboratorySigner") String laboratorySigner);
    void update(SampleInformation sampleInformation);
    List<SampleInformation> listByKeyword(@Param(value="keyword") String keyword);
    void updateSampleInfo(@Param("sampleId") String sampleId,@Param("newId") String newId);
    int searchCount(SampleInformation sampleInformation);
    List<SampleInformation> search(SampleInformation sampleInformation);
    SampleInformation getBySampleInformationId(String id);
    Wastes getByWastesId(String id);
    List<Wastes> listWastes();
    List<Client> listClient();
    List<SampleInformation> getSampleInfoByClientId(String id);
    void deleteById(String id);
    void rejectSampleInfoById(@Param("sampleId")String sampleId,@Param("advice")String advice);
    int countItem();
    int searchItemCount(SampleInformationItem sampleInformationItem);
    List<SampleInformationItem> listItemPage(Page page);
    List<SampleInformationItem> searchItem(SampleInformationItem sampleInformationItem);
}
