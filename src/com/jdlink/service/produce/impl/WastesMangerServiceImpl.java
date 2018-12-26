package com.jdlink.service.produce.impl;

import com.jdlink.domain.Category;
import com.jdlink.domain.Characteristic;
import com.jdlink.domain.Page;
import com.jdlink.domain.WastesInfo;
import com.jdlink.mapper.produce.WastesMangerMapper;
import com.jdlink.service.produce.WastesMangerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WastesMangerServiceImpl implements WastesMangerService {
    @Autowired
    WastesMangerMapper wastesMangerMapper;

    @Override
    public List<WastesInfo> list(Page page) {
        return wastesMangerMapper.list(page);
    }

    @Override
    public int totalWastesMangerRecord() {
        return wastesMangerMapper.totalWastesMangerRecord();
    }

    @Override
    public List<Category> getWastesCategoryList() {
        return wastesMangerMapper.getWastesCategoryList();
    }

    @Override
    public List<Characteristic> getWastesCharacteristicList() {
        return wastesMangerMapper.getWastesCharacteristicList();
    }

    @Override
    public void addWastesManger(WastesInfo wastesInfo) {
        wastesMangerMapper.addWastesManger(wastesInfo);
    }

    @Override
    public void removeWastesManger(int id) {
        wastesMangerMapper.removeWastesManger(id);
    }

    @Override
    public WastesInfo getWastesMangerById(int id) {
        return wastesMangerMapper.getWastesMangerById(id);
    }

    @Override
    public void updateWastesManger(WastesInfo wastesInfo) {
        wastesMangerMapper.updateWastesManger(wastesInfo);
    }

    @Override
    public List<WastesInfo> searchWastesManger(WastesInfo wastesInfo) {
        return wastesMangerMapper.searchWastesManger(wastesInfo);
    }

    @Override
    public int searchWastesMangerCount(WastesInfo wastesInfo) {
        return wastesMangerMapper.searchWastesMangerCount(wastesInfo);
    }
}
