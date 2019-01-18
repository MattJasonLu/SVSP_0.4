package com.jdlink.service.impl;


import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.mapper.WasteIntoMapper;
import com.jdlink.service.WasteIntoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WasteIntoServiceImpl implements WasteIntoService {
    @Autowired
    WasteIntoMapper wasteIntoMapper;

    @Override
    public List<WasteInto> WasteIntoList(Page page) {
        return wasteIntoMapper.WasteIntoList(page);
    }

    @Override
    public void updateWasteInto() {
        wasteIntoMapper.updateWasteInto();
    }

    @Override
    public int countWaste() {
        return wasteIntoMapper.countWaste();
    }

    @Override
    public List<WasteInto> SecondIntoList(Page page) {
        return wasteIntoMapper.SecondIntoList(page);
    }

    @Override
    public int countSec() {
        return wasteIntoMapper.countSec();
    }

    @Override
    public int countById(String id) {
        return wasteIntoMapper.countById(id);
    }

    @Override
    public SecondarySample getSecondarysampleById(String id) {
        return wasteIntoMapper.getSecondarysampleById(id);
    }

    @Override
    public void addSecondarySample(SecondarySample secondarySample) {
        wasteIntoMapper.addSecondarySample(secondarySample);
    }

    @Override
    public void addSecondarySampleItem(SecondarySampleItem secondarySampleItem) {
        wasteIntoMapper.addSecondarySampleItem(secondarySampleItem);
    }

    @Override
    public void updateSecondarySampleAnalysis(SecondarySample secondarySample){ wasteIntoMapper.updateSecondarySampleAnalysis(secondarySample);}

    @Override
    public void deleteSecondarySampleItemById(String id) { wasteIntoMapper.deleteSecondarySampleItemById(id);}

    @Override
    public List<String> getNewestId() {
        return wasteIntoMapper.getNewestId();
    }

    @Override
    public List<SecondarySample> getSecondarysample(Page page) {
        return wasteIntoMapper.getSecondarysample(page);
    }

    @Override
    public void confirmSecondarySampleById(String id,String laboratorySignatory) {
        wasteIntoMapper.confirmSecondarySampleById(id,laboratorySignatory);
    }

    @Override
    public void confirmAllSecondAnalysisCheck(SecondarySample secondarySample) { wasteIntoMapper.confirmAllSecondAnalysisCheck(secondarySample);}

    @Override
    public void rejectSecondarySampleById(String id, String advice) {
        wasteIntoMapper.rejectSecondarySampleById(id,advice);
    }

    @Override
    public int wastesCountById(String id) {
        return wasteIntoMapper.wastesCountById(id);
    }

    @Override
    public SecondarySampleItem getByWastesId(String id) {
        return wasteIntoMapper.getByWastesId(id);
    }

    @Override
    public List<SecondarySample> searchSecondary(SecondarySample secondarySample) {
        return wasteIntoMapper.searchSecondary(secondarySample);
    }

    @Override
    public int searchSecondaryCount(SecondarySample secondarySample) {
        return wasteIntoMapper.searchSecondaryCount(secondarySample);
    }

    @Override
    public void SecondarySample(String id,String wastesName) {
        wasteIntoMapper.SecondarySample(id,wastesName);
    }

    @Override
    public void updateSecondarySample(SecondaryTest secondaryTest) {
        wasteIntoMapper.updateSecondarySample(secondaryTest);
    }

    @Override
    public List<SampleInfoAnalysis> searchWastesDaily(SampleInfoAnalysis sampleInfoAnalysis) {
        return wasteIntoMapper.searchWastesDaily(sampleInfoAnalysis);
    }

    @Override
    public int searchWastesDailyCount(SampleInfoAnalysis sampleInfoAnalysis) {
        return wasteIntoMapper.searchWastesDailyCount(sampleInfoAnalysis);
    }

    @Override
    public List<SecondaryTest> searchSecondaryDaily(SecondaryTest secondaryTest) {
        return wasteIntoMapper.searchSecondaryDaily(secondaryTest);
    }

    @Override
    public int searchSecondaryDailyCount(SecondaryTest secondaryTest) {
        return wasteIntoMapper.searchSecondaryDailyCount(secondaryTest);
    }
}
