package com.jdlink.service.impl;

import com.jdlink.domain.Produce.ContractPercentage;
import com.jdlink.mapper.ContractPercentageMapper;
import com.jdlink.service.ContractPercentageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractPercentageServiceImpl implements ContractPercentageService {
    @Autowired
    ContractPercentageMapper contractPercentageMapper;


    @Override
    public List<ContractPercentage> list(){ return contractPercentageMapper.list(); }

    @Override
    public void deleteAll(){ contractPercentageMapper.deleteAll(); }

    @Override
    public void add(ContractPercentage contractPercentage){ contractPercentageMapper.add(contractPercentage); }
}
