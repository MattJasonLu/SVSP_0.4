package com.jdlink.service.impl;

import com.jdlink.domain.Map;
import com.jdlink.mapper.MapMapper;
import com.jdlink.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapServiceImpl implements MapService {
    @Autowired
    MapMapper mapMapper;
    @Override
    public List<Map> getMap() {
        return mapMapper.getMap();
    }
}
