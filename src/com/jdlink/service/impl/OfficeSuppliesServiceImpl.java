package com.jdlink.service.impl;

import com.jdlink.domain.City;
import com.jdlink.mapper.CityMapper;
import com.jdlink.mapper.OfficeSuppliesMapper;
import com.jdlink.service.CityService;
import com.jdlink.service.OfficeSuppliesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfficeSuppliesServiceImpl implements OfficeSuppliesService {
    @Autowired
    OfficeSuppliesMapper officeSuppliesMapper;


}
