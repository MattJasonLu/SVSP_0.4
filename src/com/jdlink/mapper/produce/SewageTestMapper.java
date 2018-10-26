package com.jdlink.mapper.produce;

import com.jdlink.domain.Produce.SewageTest;

public interface SewageTestMapper {
    /**
     * 添加污水化验单数据
     */
    void addSewageTest(SewageTest sewageTest);
    SewageTest getSewageTestById(String id);
    void updateSewageTestById(SewageTest sewageTest);
}
