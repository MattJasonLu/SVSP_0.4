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
public class MaterialRequireServiceImpl implements MaterialRequireService {
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
}
