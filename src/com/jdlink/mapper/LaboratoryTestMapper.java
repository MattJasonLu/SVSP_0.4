package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.LaboratoryTest;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LaboratoryTestMapper {

     int count();

     void add(LaboratoryTest laboratoryTest);

     List<LaboratoryTest> list(Page page);

     LaboratoryTest getLaboratoryTestById(String laboratoryTestNumber);

    /**
     * 通过危废编码和客户编号获取化验单
     * @param wastesCode 危废代码
     * @param clientId 客户编码
     * @return 化验单
     */
     LaboratoryTest getLaboratoryTestByWastesCodeAndClientId(@Param("wastesCode") String wastesCode, @Param("clientId") String clientId);

     List<LaboratoryTest> search(LaboratoryTest laboratoryTest);

     int searchCount(LaboratoryTest laboratoryTest);

     void setInvalid(String laboratoryTestNumber);

     void setTested(String laboratoryTestNumber);

     void submit(String laboratoryTestNumber);

     void confirm(String laboratoryTestNumber);

    /**
     * 根据客户编号获取化验室单号
     * @param clientId 客户编号
     * @return 化验室单号
     */
     String getRecentLaboratoryTestNumberByClientId(String clientId);

}
