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

    @Override
    public void cancelSewageTestAfter(String id) {
        sewageTestMapper.cancelSewageTestAfter(id);
    }

    @Override
    public void cancelSoftTestAfter(String id) {
        sewageTestMapper.cancelSoftTestAfter(id);
    }

    @Override
    public void cancelSecondaryTestAfter(String id) {
        sewageTestMapper.cancelSecondaryTestAfter(id);
    }

    @Override
    public List<SoftTest> searchSoftTest(SoftTest softTest) {
        return sewageTestMapper.searchSoftTest(softTest);
    }

    @Override
    public int searchSoftTestCount(SoftTest softTest) {
        return sewageTestMapper.searchSoftTestCount(softTest);
    }

    @Override
    public List<SewageTest> searchSewageTest(SewageTest sewageTest) {
        return sewageTestMapper.searchSewageTest(sewageTest);
    }

    @Override
    public int searchSewageTestCount(SewageTest sewageTest) {
        return sewageTestMapper.searchSewageTestCount(sewageTest);
    }

    @Override
    public List<SecondaryTest> searchSecondaryTest(SecondaryTest secondaryTest) {
        return sewageTestMapper.searchSecondaryTest(secondaryTest);
    }

    @Override
    public int searchSecondaryTestCount(SecondaryTest secondaryTest) {
        return sewageTestMapper.searchSecondaryTestCount(secondaryTest);
    }

    @Override
    public List<String> getAllRawSampleId() {
        return sewageTestMapper.getAllRawSampleId();
    }

    @Override
    public int CountById(String id) {
        return sewageTestMapper.CountById(id);
    }

    @Override
    public void addRawSample(RawSample rawSample) {
        sewageTestMapper.addRawSample(rawSample);
    }

    @Override
    public RawSampleItem getRawSampleItemById(String id) {
        return sewageTestMapper.getRawSampleItemById(id);
    }

    @Override
    public void addRawSampleItem(RawSampleItem rawSampleItem) {
        sewageTestMapper.addRawSampleItem(rawSampleItem);
    }

    @Override
    public List<RawSample> loadRawSampleList(Page page) {
        return sewageTestMapper.loadRawSampleList(page);
    }

    @Override
    public RawSample getRawSampleById(String id) {
        return sewageTestMapper.getRawSampleById(id);
    }

    @Override
    public void updateRawSample(RawSample rawSample) {
        sewageTestMapper.updateRawSample(rawSample);
    }

    @Override
    public void deleteRawSampleItem(String id) {
        sewageTestMapper.deleteRawSampleItem(id);
    }

    @Override
    public void cancelRawSample(String id) {
        sewageTestMapper.cancelRawSample(id);
    }

    @Override
    public void rejectRawSampleItemById(String id, String advice) {
        sewageTestMapper.rejectRawSampleItemById(id,advice);
    }

    @Override
    public List<RawSample> searchRawSample(RawSample rawSample) {
        return sewageTestMapper.searchRawSample(rawSample);
    }

    @Override
    public int searchRawSampleCount(RawSample rawSample) {
        return sewageTestMapper.searchRawSampleCount(rawSample);
    }

    @Override
    public int searchRawSampleTotal() {
        return sewageTestMapper.searchRawSampleTotal();
    }

    @Override
    public void addRawMaterialsTest(RawMaterialsTest rawMaterialsTest) {
        sewageTestMapper.addRawMaterialsTest(rawMaterialsTest);
    }

    @Override
    public List<String> getAllRawMaterialsTestId() {
        return sewageTestMapper.getAllRawMaterialsTestId();
    }

    @Override
    public List<RawMaterialsTest> loadRawMaterialsTestList(Page page) {
        return sewageTestMapper.loadRawMaterialsTestList(page);
    }

    @Override
    public RawMaterialsTest getRawMaterialsTestById(String id) {
        return sewageTestMapper.getRawMaterialsTestById(id);
    }

    @Override
    public void updateRawMaterialsTestById(RawMaterialsTest rawMaterialsTest) {
        sewageTestMapper.updateRawMaterialsTestById(rawMaterialsTest);
    }

    @Override
    public int rawMaterialsTestTotal() {
        return sewageTestMapper.rawMaterialsTestTotal();
    }

    @Override
    public void submitRawMaterialsTest(String id) {
        sewageTestMapper.submitRawMaterialsTest(id);
    }

    @Override
    public void confirmRawMaterialsTest(String id) {
        sewageTestMapper.confirmRawMaterialsTest(id);
    }

    @Override
    public void cancelRawMaterialsTest(String id) {
        sewageTestMapper.cancelRawMaterialsTest(id);
    }

    @Override
    public void cancelRawMaterialsTestAfter(String id) {
        sewageTestMapper.cancelRawMaterialsTestAfter(id);
    }

    @Override
    public List<RawMaterialsTest> searchRawMaterialsTest(RawMaterialsTest rawMaterialsTest) {
        return sewageTestMapper.searchRawMaterialsTest(rawMaterialsTest);
    }

    @Override
    public int searchRawMaterialsTestCount(RawMaterialsTest rawMaterialsTest) {
        return sewageTestMapper.searchRawMaterialsTestCount(rawMaterialsTest);
    }

    @Override
    public void confirmRawSampleById(String id, String laboratorySignatory) {
        sewageTestMapper.confirmRawSampleById(id, laboratorySignatory);
    }

    @Override
    public void confirmAllRawSampleisCheck(RawSample rawSample) {
        sewageTestMapper.confirmAllRawSampleisCheck(rawSample);
    }


}
