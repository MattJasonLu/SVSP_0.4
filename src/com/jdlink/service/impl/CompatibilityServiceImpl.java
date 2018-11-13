package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Compatibility;
import com.jdlink.domain.Produce.CompatibilityItem;
import com.jdlink.domain.Produce.MaterialRequire;
import com.jdlink.domain.Produce.MaterialRequireItem;
import com.jdlink.mapper.CompatibilityMapper;
import com.jdlink.service.CompatibilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompatibilityServiceImpl implements CompatibilityService

{
    @Autowired
    CompatibilityMapper compatibilityMapper;


    @Override
    public int total() {
        return compatibilityMapper.total();
    }

    @Override
    public Compatibility getByCompatibilityId(String pwId) {
        return compatibilityMapper.getByCompatibilityId(pwId);
    }

    @Override
    public int getLastId() {
        return compatibilityMapper.getLastId();
    }

    @Override
    public List<String> check() {
        return compatibilityMapper.check();
    }

    @Override
    public List<String> check1() {
        return compatibilityMapper.check1();
    }

    @Override
    public List<Compatibility> list(String compatibilityId) {
        return compatibilityMapper.list(compatibilityId);
    }

    @Override
    public Compatibility getByPwId1(String pwId) {
        return compatibilityMapper.getByPwId1(pwId);
    }

    @Override
    public void approval(String pwId, String opinion) {
        compatibilityMapper.approval(pwId,opinion);
    }

    @Override
    public void back(String pwId, String opinion) {
        compatibilityMapper.back(pwId,opinion);
    }

    @Override
    public void cancel(String pwId) {
        compatibilityMapper.cancel(pwId);
    }

    @Override
    public List<Compatibility> search(Compatibility compatibility) {
        return compatibilityMapper.search(compatibility);
    }

    @Override
    public void add(Compatibility compatibility) {
        compatibilityMapper.add(compatibility);
    }

    @Override
    public void addCompatibility(Compatibility compatibility) {
        compatibilityMapper.addCompatibility(compatibility);
    }

    @Override
    public void addCompatibilityItem(CompatibilityItem compatibilityItem) {
        compatibilityMapper.addCompatibilityItem(compatibilityItem);
    }

    @Override
    public List<Compatibility> getWeekPlanList(Page page) {
        return compatibilityMapper.getWeekPlanList(page);
    }

    @Override
    public List<CompatibilityItem> getWeekById(String compatibilityId) {
        return compatibilityMapper.getWeekById(compatibilityId);
    }

    @Override
    public void submit(String compatibilityId) {
        compatibilityMapper.submit(compatibilityId);
    }

    @Override
    public void approvalCompatibility(String compatibilityId,String opinion) {
        compatibilityMapper.approvalCompatibility(compatibilityId,opinion);
    }

    @Override
    public void updateCompatibilityItem(CompatibilityItem compatibilityItem) {
        compatibilityMapper.updateCompatibilityItem(compatibilityItem);
    }

    @Override
    public void updateCompatibility(Compatibility compatibility) {
        compatibilityMapper.updateCompatibility(compatibility);
    }

    @Override
    public List<Compatibility> searchCompatibility(Compatibility compatibility) {
        return compatibilityMapper.searchCompatibility(compatibility);
    }


    @Override
    public int totalCompatibilityRecord() {
        return compatibilityMapper.totalCompatibilityRecord();
    }

    @Override
    public List<java.lang.String> searchCompatibilityItem(CompatibilityItem compatibilityItem) {
        return compatibilityMapper.searchCompatibilityItem(compatibilityItem);
    }

    @Override
    public int searchCount(Compatibility compatibility) {
        return compatibilityMapper.searchCount(compatibility);
    }

    @Override
    public int count(Compatibility compatibility) {
        return compatibilityMapper.count(compatibility);
    }

    @Override
    public List<CompatibilityItem> getCompatibilityItemById(String compatibilityId) {
        return compatibilityMapper.getCompatibilityItemById(compatibilityId);
    }

    @Override
    public List<String> getNewestMaterialRequireId() {
        return compatibilityMapper.getNewestMaterialRequireId();
    }

    @Override
    public void addMaterialRequireItem(MaterialRequireItem materialRequireItem) {
        compatibilityMapper.addMaterialRequireItem(materialRequireItem);
    }

    @Override
    public void addMaterialRequire(MaterialRequire materialRequire) {
        compatibilityMapper.addMaterialRequire(materialRequire);
    }

    @Override
    public void disabledMaterialRequire(String compatibilityId) {
        compatibilityMapper.disabledMaterialRequire(compatibilityId);
    }

    @Override
    public void deleteCompatibility(String compatibilityId) {
        compatibilityMapper.deleteCompatibility(compatibilityId);
    }
}
