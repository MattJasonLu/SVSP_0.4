package com.jdlink.service.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface SewageTestService {
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
    void deleteSewaGeregistrationById(String id);
    SecondaryTest getSecondaryTestById(String id);
    void updateSecondaryTestById(SecondaryTest secondaryTest);
    void addSecondaryTest(SecondaryTest secondaryTest);
    List<SecondaryTest> loadPageSecondaryTestResultsList(Page page);
    int totalSecondaryTestRecord();
    void updateSecondarySample(SecondarySample secondarySample);
    void deleteSecondarySampleItem(String id);
    void updateSoftGeregistration(Sewageregistration sewageregistration);
    void deleteSoftGeregistrationById(String id);
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

    List<SoftTest> searchSoftTest (SoftTest softTest);

    int searchSoftTestCount( SoftTest softTest);

    List<SewageTest> searchSewageTest(SewageTest sewageTest);

    int searchSewageTestCount(SewageTest sewageTest);

    List<SecondaryTest>  searchSecondaryTest(SecondaryTest secondaryTest);

    int searchSecondaryTestCount(SecondaryTest secondaryTest);
}
