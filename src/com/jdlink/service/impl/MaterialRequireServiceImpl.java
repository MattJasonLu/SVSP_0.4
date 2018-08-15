package com.jdlink.service.impl;

import com.jdlink.domain.MixingElement;
import com.jdlink.domain.Produce.MaterialRequire;
import com.jdlink.domain.Wastes;
import com.jdlink.mapper.MaterialRequireMapper;
import com.jdlink.service.MaterialRequireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialRequireServiceImpl implements MaterialRequireService  {
    @Autowired
    MaterialRequireMapper materialRequireMapper;
    @Override
    public int total() {
        return materialRequireMapper.total();
    }

    @Override
    public void addMix(MaterialRequire materialRequire) {
        materialRequireMapper.addMix(materialRequire);
    }

    @Override
    public List<String> check() {
        return materialRequireMapper.check();
    }

    @Override
    public List<MaterialRequire> list(String materialRequireId) {
        return materialRequireMapper.list(materialRequireId);
    }

    @Override
    public MaterialRequire getByMrId(String materialRequireId) {
        return materialRequireMapper.getByMrId(materialRequireId);
    }

    @Override
    public void approval(String id, String remarks) {
        materialRequireMapper.approval(id,remarks);
    }

    @Override
    public void submit(String id) {
        materialRequireMapper.submit(id);
    }

    @Override
    public void cancel(String id) {
        materialRequireMapper.cancel(id);
    }

    @Override
    public void back(String id, String remarks) {
        materialRequireMapper.back(id,remarks);
    }


}
