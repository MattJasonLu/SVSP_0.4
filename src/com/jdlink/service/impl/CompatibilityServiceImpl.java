package com.jdlink.service.impl;

import com.jdlink.domain.Produce.Compatibility;
import com.jdlink.domain.Produce.CompatibilityItem;
import com.jdlink.mapper.CompatibilityMapper;
import com.jdlink.service.CompatibilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompatibilityServiceImpl implements CompatibilityService {
    @Autowired
    CompatibilityMapper compatibilityMapper;
    @Override
    public int total() {
        return compatibilityMapper.total() ;
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
    public void updateCompatibility(String compatibilityId, String id, String id2) {
        compatibilityMapper.updateCompatibility(compatibilityId,id,id2);
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
    public List<Compatibility> getWeekPlanList() {
        return compatibilityMapper.getWeekPlanList();
    }

    @Override
    public List<CompatibilityItem> getWeekById(String compatibilityId) {
        return compatibilityMapper.getWeekById(compatibilityId);
    }
}
