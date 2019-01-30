package com.jdlink.mapper.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import org.springframework.web.bind.annotation.RequestBody;

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
    void cancelSewaGeregistration(String id);
    void cancelSoftGeregistration(String id);
    void cancelSecondaryGeregistration(String id);
    void cancelSewageTestAfter(String id);
    void cancelSoftTestAfter(String id);
    void cancelSecondaryTestAfter(String id);

    List<SoftTest> searchSoftTest( SoftTest softTest);

    int searchSoftTestCount( SoftTest softTest);

    List<SewageTest> searchSewageTest(SewageTest sewageTest);

    int searchSewageTestCount(SewageTest sewageTest);

    List<SecondaryTest>  searchSecondaryTest(SecondaryTest secondaryTest);

    int searchSecondaryTestCount(SecondaryTest secondaryTest);

    List<String>getAllRawSampleId();

    int CountById(String id);

    void addRawSample(RawSample rawSample);

    RawSampleItem  getRawSampleItemById(String id);

    void addRawSampleItem(RawSampleItem rawSampleItem);

    List<RawSample>loadRawSampleList(Page page);

    RawSample  getRawSampleById(String id);

    void updateRawSample(RawSample rawSample);

    void deleteRawSampleItem(String id);

    void cancelRawSample(String id);

    void rejectRawSampleItemById(String id ,String advice);

     List<RawSample> searchRawSample(RawSample rawSample);

     int searchRawSampleCount(RawSample rawSample);

     int searchRawSampleTotal();

     void addRawMaterialsTest(RawMaterialsTest rawMaterialsTest);

     List<String> getAllRawMaterialsTestId();

     List<RawMaterialsTest>loadRawMaterialsTestList(Page page);

    RawMaterialsTest getRawMaterialsTestById(String id);

    void updateRawMaterialsTestById(RawMaterialsTest rawMaterialsTest);

    int rawMaterialsTestTotal();

    void submitRawMaterialsTest(String id);

    void confirmRawMaterialsTest(String id);

    void cancelRawMaterialsTest(String id);

    void cancelRawMaterialsTestAfter(String id);

    List<RawMaterialsTest>searchRawMaterialsTest(RawMaterialsTest rawMaterialsTest);

    int searchRawMaterialsTestCount(RawMaterialsTest rawMaterialsTest);

    void confirmRawSampleById(String id,String laboratorySignatory);

    void confirmAllRawSampleisCheck(RawSample rawSample);
  }
