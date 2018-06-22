package com.jdlink.service.impl;

import com.jdlink.domain.City;
import com.jdlink.mapper.CityMapper;
import com.jdlink.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CityServiceImpl implements CityService {
    @Autowired
    CityMapper cityMapper;
    @Override
    public List<City> getCity(String provinceId) {
        return cityMapper.getCity(provinceId);
    }
}
