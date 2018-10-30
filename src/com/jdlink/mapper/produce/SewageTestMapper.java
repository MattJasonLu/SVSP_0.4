package com.jdlink.mapper.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SecondaryTest;
import com.jdlink.domain.Produce.SewageTest;
import com.jdlink.domain.Produce.Sewageregistration;
import com.jdlink.domain.Produce.SoftTest;

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
   void deleteSewaGeregistrationById(String id);
     SecondaryTest getSecondaryTestById(String id);
     void updateSecondaryTestById(SecondaryTest secondaryTest);
     void addSecondaryTest(SecondaryTest secondaryTest);
    List<SecondaryTest> loadPageSecondaryTestResultsList(Page page);
    int totalSecondaryTestRecord();
}
