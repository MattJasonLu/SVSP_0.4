package com.jdlink.service.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;

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
}
