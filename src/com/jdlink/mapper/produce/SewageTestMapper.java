package com.jdlink.mapper.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SewageTest;

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
}
