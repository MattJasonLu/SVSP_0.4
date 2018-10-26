package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SewageTest;

import java.util.List;

public interface SewageTestService {
    void addSewageTest(SewageTest sewageTest);
    SewageTest getSewageTestById(String id);
    void updateSewageTestById(SewageTest sewageTest);
    List<SewageTest> loadSewageTestResultsList(Page page);
    int totalSewageTestRecord();
}
