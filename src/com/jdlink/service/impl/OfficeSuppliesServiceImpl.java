package com.jdlink.service.impl;

import com.jdlink.domain.City;
import com.jdlink.domain.OfficeSuppliesInbound;
import com.jdlink.domain.OfficeSuppliesItem;
import com.jdlink.domain.OfficeSuppliesOutbound;
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


    @Override
    public List<OfficeSuppliesInbound> listOfficeSuppliesInbound(OfficeSuppliesItem officeSuppliesItem) {
        return officeSuppliesMapper.listOfficeSuppliesInbound(officeSuppliesItem);
    }

    @Override
    public void addOfficeSuppliesInbound(OfficeSuppliesInbound officeSuppliesInbound) {
        officeSuppliesMapper.addOfficeSuppliesInbound(officeSuppliesInbound);
    }

    @Override
    public List<OfficeSuppliesOutbound> listOfficeSuppliesOutbound(OfficeSuppliesItem officeSuppliesItem) {
        return officeSuppliesMapper.listOfficeSuppliesOutbound(officeSuppliesItem);
    }

    @Override
    public void addOfficeSuppliesOutbound(OfficeSuppliesOutbound officeSuppliesOutbound) {
        officeSuppliesMapper.addOfficeSuppliesOutbound(officeSuppliesOutbound);
    }
}
