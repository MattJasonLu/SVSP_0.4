package com.jdlink.service.impl;

import com.jdlink.mapper.MaterialRequireMapper;
import com.jdlink.service.MaterialRequireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaterialRequireServiceImpl implements MaterialRequireService {
    @Autowired
    MaterialRequireMapper materialRequireMapper;
    @Override
    public int total() {
        return materialRequireMapper.total();
    }
}
