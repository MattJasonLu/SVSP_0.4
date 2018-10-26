package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SewageTest;
import com.jdlink.domain.Produce.SoftTest;

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
}
