package com.jdlink.service.produce.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SecondaryTest;
import com.jdlink.domain.Produce.SewageTest;
import com.jdlink.domain.Produce.Sewageregistration;
import com.jdlink.domain.Produce.SoftTest;
import com.jdlink.mapper.produce.SewageTestMapper;
import com.jdlink.service.produce.SewageTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 水质化验的实现类
 */
@Service
public class SewageTestImpl implements SewageTestService{
    @Autowired
    SewageTestMapper sewageTestMapper;

    @Override
    public void addSewageTest(SewageTest sewageTest) {
        sewageTestMapper.addSewageTest(sewageTest);
    }

    @Override
    public SewageTest getSewageTestById(String id) {
        return sewageTestMapper.getSewageTestById(id);
    }

    @Override
    public void updateSewageTestById(SewageTest sewageTest) {
        sewageTestMapper.updateSewageTestById(sewageTest);
    }

    @Override
    public List<SewageTest> loadSewageTestResultsList(Page page) {
        return sewageTestMapper.loadSewageTestResultsList(page);
    }

    @Override
    public int totalSewageTestRecord() {
        return sewageTestMapper.totalSewageTestRecord();
    }

    @Override
    public void addSoftTest(SoftTest softTest) {
        sewageTestMapper.addSoftTest(softTest);
    }

    @Override
    public void updateSoftTest(SoftTest softTest) {
        sewageTestMapper.updateSoftTest(softTest);
    }

    @Override
    public SoftTest getSoftTestById(String id) {
        return sewageTestMapper.getSoftTestById(id);
    }

    @Override
    public int totalSoftTestRecord() {
        return sewageTestMapper.totalSoftTestRecord();
    }

    @Override
    public List<SoftTest> loadSoftTestResultsList(Page page) {
        return sewageTestMapper.loadSoftTestResultsList(page);
    }

    @Override
    public void updateSewaGeregistration(Sewageregistration sewageregistration) {
        sewageTestMapper.updateSewaGeregistration(sewageregistration);
    }

    @Override
    public void deleteSewaGeregistrationById(String id) {
        sewageTestMapper.deleteSewaGeregistrationById(id);
    }

    @Override
    public SecondaryTest getSecondaryTestById(String id) {
        return sewageTestMapper.getSecondaryTestById(id);
    }

    @Override
    public void updateSecondaryTestById(SecondaryTest secondaryTest) {
        sewageTestMapper.updateSecondaryTestById(secondaryTest);
    }

    @Override
    public void addSecondaryTest(SecondaryTest secondaryTest) {
        sewageTestMapper.addSecondaryTest(secondaryTest);
    }

    @Override
    public List<SecondaryTest> loadPageSecondaryTestResultsList(Page page) {
        return sewageTestMapper.loadPageSecondaryTestResultsList(page);
    }

    @Override
    public int totalSecondaryTestRecord() {
        return sewageTestMapper.totalSecondaryTestRecord();
    }
}
