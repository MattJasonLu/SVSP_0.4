package com.jdlink.service;

import com.jdlink.domain.Produce.SewageTest;

public interface SewageTestService {
    void addSewageTest(SewageTest sewageTest);
    SewageTest getSewageTestById(String id);
    void updateSewageTestById(SewageTest sewageTest);
}
