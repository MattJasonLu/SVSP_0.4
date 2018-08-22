package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.LaboratoryTest;

import java.util.List;

public interface LaboratoryTestService {

    int count();

    void add(LaboratoryTest laboratoryTest);

    List<LaboratoryTest> list(Page page);

    LaboratoryTest getLaboratoryTestById(String laboratoryTestNumber);

    List<LaboratoryTest> search(LaboratoryTest laboratoryTest);

    int searchCount(LaboratoryTest laboratoryTest);

    void setInvalid(String laboratoryTestNumber);

    void setTested(String laboratoryTestNumber);

    void submit(String laboratoryTestNumber);

    void confirm(String laboratoryTestNumber);

    String getCurrentId();

    /**
     * 根据客户编号获取化验室单号
     * @param clientId 客户编号
     * @return 化验室单号
     */
    LaboratoryTest getRecentLaboratoryTestByClientId(String clientId);
}
