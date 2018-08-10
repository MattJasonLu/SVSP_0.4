package com.jdlink.service.impl;

import com.jdlink.domain.Wastes;
import com.jdlink.mapper.WastesMapper;
import com.jdlink.service.WastesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/8/10.
 * DoubleClickTo 666
 */
@Service
public class WastesServiceImpl implements WastesService {

    @Autowired
    WastesMapper wastesMapper;

    @Override
    public List<Wastes> list() {
        return wastesMapper.list();
    }
}
