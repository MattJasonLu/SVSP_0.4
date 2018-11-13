package com.jdlink.mapper.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;

import java.util.List;

public interface SewageTestMapper {
    /**
     * 添加污水化验单数据
     */
    void addSewageTest(SewageTest sewageTest);
    SewageTest getSewageTestById(String id);
    void updateSewageTestById(SewageTest sewageTest);
    List<SewageTest> loadSewageTestResultsList(Page page);
    int totalSewageTestRecord();
    void addSoftTest(SoftTest softTest);
    void updateSoftTest(SoftTest softTest);
    SoftTest getSoftTestById(String id);
    int totalSoftTestRecord();
   List<SoftTest> loadSoftTestResultsList(Page page);
   void updateSewaGeregistration(Sewageregistration sewageregistration);
   void updateSoftGeregistration(Sewageregistration sewageregistration);
   void deleteSewaGeregistrationById(String id);
    void deleteSoftGeregistrationById(String id);
     SecondaryTest getSecondaryTestById(String id);
     void updateSecondaryTestById(SecondaryTest secondaryTest);
     void addSecondaryTest(SecondaryTest secondaryTest);
    List<SecondaryTest> loadPageSecondaryTestResultsList(Page page);
    int totalSecondaryTestRecord();
    void updateSecondarySample(SecondarySample secondarySample);
    void deleteSecondarySampleItem(String id);
    void submitSewageTest(String id);
    void confirmSewageTest(String id);
    void cancelSewageTest(String id);
    void submitSoftTest(String id);
    void  confirmSoftTest(String id);
    void cancelSoftTest(String id);
    void submitSecondaryTest(String id);
    void confirmSecondaryTest(String id);
    void cancelSecondaryTest(String id);
    List<String> getAllSewageId();
    List<String>  getAllSoftId();
    List<String>  getAllSecondaryId();
    List<String> getAllSewageTestId();
    List<String> getAllSoftTestId();
    List<String> getAllSecondaryTestId();

}
