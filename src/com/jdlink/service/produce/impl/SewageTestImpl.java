package com.jdlink.service.produce.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
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

    @Override
    public void updateSecondarySample(SecondarySample secondarySample) {
        sewageTestMapper.updateSecondarySample(secondarySample);
    }

    @Override
    public void deleteSecondarySampleItem(String id) {
        sewageTestMapper.deleteSecondarySampleItem(id);
    }

    @Override
    public void updateSoftGeregistration(Sewageregistration sewageregistration) {
        sewageTestMapper.updateSoftGeregistration(sewageregistration);
    }

    @Override
    public void deleteSoftGeregistrationById(String id) {
        sewageTestMapper.deleteSoftGeregistrationById(id);
    }

    @Override
    public void submitSewageTest(String id) {
        sewageTestMapper.submitSewageTest(id);
    }

    @Override
    public void confirmSewageTest(String id) {
        sewageTestMapper.confirmSewageTest(id);
    }

    @Override
    public void cancelSewageTest(String id) {
        sewageTestMapper.cancelSewageTest(id);
    }

    @Override
    public void submitSoftTest(String id) {
        sewageTestMapper.submitSoftTest(id);
    }

    @Override
    public void confirmSoftTest(String id) {
        sewageTestMapper.confirmSoftTest(id);
    }

    @Override
    public void cancelSoftTest(String id) {
        sewageTestMapper.cancelSoftTest(id);
    }

    @Override
    public void submitSecondaryTest(String id) {
        sewageTestMapper.submitSecondaryTest(id);
    }

    @Override
    public void confirmSecondaryTest(String id) {
        sewageTestMapper.confirmSecondaryTest(id);
    }

    @Override
    public void cancelSecondaryTest(String id) {
        sewageTestMapper.cancelSecondaryTest(id);
    }

    @Override
    public List<String> getAllSewageId() {
        return sewageTestMapper.getAllSewageId();
    }

    @Override
    public List<String> getAllSoftId() {
        return sewageTestMapper.getAllSoftId();
    }

    @Override
    public List<String> getAllSecondaryId() {
        return sewageTestMapper.getAllSecondaryId();
    }

    @Override
    public List<String> getAllSewageTestId() {
        return sewageTestMapper.getAllSewageTestId();
    }

    @Override
    public List<String> getAllSoftTestId() {
        return sewageTestMapper.getAllSoftTestId();
    }

    @Override
    public List<String> getAllSecondaryTestId() {
        return sewageTestMapper.getAllSecondaryTestId();
    }

    @Override
    public void cancelSewaGeregistration(String id) {
        sewageTestMapper.cancelSewaGeregistration(id);
    }

    @Override
    public void cancelSoftGeregistration(String id) {
        sewageTestMapper.cancelSoftGeregistration(id);
    }

    @Override
    public void cancelSecondaryGeregistration(String id) {
        sewageTestMapper.cancelSecondaryGeregistration(id);
    }


}
