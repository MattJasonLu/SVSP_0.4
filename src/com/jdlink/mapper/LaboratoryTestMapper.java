package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.LaboratoryTest;

import java.util.List;

public interface LaboratoryTestMapper {

     int count();

     List<LaboratoryTest> list(Page page);

     LaboratoryTest getLaboratoryTestById(String laboratoryTestNumber);

     List<LaboratoryTest> search(LaboratoryTest laboratoryTest);

     int searchCount(LaboratoryTest laboratoryTest);

     void setInvalid(String laboratoryTestNumber);

     void setTested(String laboratoryTestNumber);

     void submit(String laboratoryTestNumber);

     void confirm(String laboratoryTestNumber);

}
