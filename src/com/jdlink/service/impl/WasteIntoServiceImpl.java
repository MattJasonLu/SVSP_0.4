package com.jdlink.service.impl;


import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SecondarySample;
import com.jdlink.domain.Produce.SecondarySampleItem;
import com.jdlink.domain.Produce.WasteInto;
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
    public List<String> getNewestId() {
        return wasteIntoMapper.getNewestId();
    }

    @Override
    public List<SecondarySample> getSecondarysample(Page page) {
        return wasteIntoMapper.getSecondarysample(page);
    }

    @Override
    public void confirmSecondarySampleById(String id) {
        wasteIntoMapper.confirmSecondarySampleById(id);
    }

    @Override
    public void rejectSecondarySampleById(String id, String advice) {
        wasteIntoMapper.rejectSecondarySampleById(id,advice);
    }
}
