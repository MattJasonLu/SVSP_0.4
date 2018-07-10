package com.jdlink.service.impl;

import com.jdlink.domain.WastesInfo;
import com.jdlink.mapper.WastesInfoMapper;
import com.jdlink.service.WastesInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WastesInfoServiceImpl implements WastesInfoService {
    @Autowired
    WastesInfoMapper wastesInfoMapper;

    @Override
    public List<WastesInfo> list() {
        return wastesInfoMapper.list();
    }
}
