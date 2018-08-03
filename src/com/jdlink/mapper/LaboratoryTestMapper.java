package com.jdlink.mapper;

import com.jdlink.domain.Produce.LaboratoryTest;

import java.util.List;

public interface LaboratoryTestMapper {
     LaboratoryTest getLaboratoryTestById(String laboratoryTestNumber) ;

     void setInvalid(String laboratoryTestNumber);

     void setTested(String laboratoryTestNumber);

     void submit(String laboratoryTestNumber);

     void confirm(String laboratoryTestNumber);

}
