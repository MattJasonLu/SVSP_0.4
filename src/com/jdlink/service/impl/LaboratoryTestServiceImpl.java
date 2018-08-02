package com.jdlink.service.impl;

import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.mapper.LaboratoryTestMapper;
import com.jdlink.service.LaboratoryTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Leon on 2018/8/2.
 */
@Service
public class LaboratoryTestServiceImpl implements LaboratoryTestService {

    @Autowired
    LaboratoryTestMapper laboratoryTestMapper;

    @Override
    public LaboratoryTest getLaboratoryTestById(String laboratoryTestNumber) {
        return laboratoryTestMapper.getLaboratoryTestById(laboratoryTestNumber);
    }

    @Override
    public void setInvalid(String laboratoryTestNumber) {
        laboratoryTestMapper.setInvalid(laboratoryTestNumber);
    }

    @Override
    public void setTested(String laboratoryTestNumber) {
        laboratoryTestMapper.setTested(laboratoryTestNumber);
    }

    @Override
    public void submit(String laboratoryTestNumber) {
        laboratoryTestMapper.submit(laboratoryTestNumber);
    }

    @Override
    public void confirm(String laboratoryTestNumber) {
        laboratoryTestMapper.confirm(laboratoryTestNumber);
    }
}
