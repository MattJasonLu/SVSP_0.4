package com.jdlink.service.impl;

import com.jdlink.domain.Contract;
import com.jdlink.mapper.ContractMapper;
import com.jdlink.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/5/18.
 */
@Service
public class ContractServiceImpl implements ContractService {
    @Autowired
    ContractMapper contractMapper;

    @Override
    public void add(Contract contract) {
        contractMapper.add(contract);
    }

    @Override
    public void delete(Contract contract) {
        contractMapper.delete(contract);
    }

    @Override
    public List<Contract> getByKeyword(String keyword) {
        return contractMapper.getByKeyword(keyword);
    }

    @Override
    public Contract getByContractId(String contractId) {
        return contractMapper.getByContractId(contractId);
    }

    @Override
    public void update(Contract contract) {
        contractMapper.update(contract);
    }

    @Override
    public void setCheckStateToExamine(Contract contract) {
        contractMapper.setCheckStateToExamine(contract);
    }

    @Override
    public void setCheckStateKeeping(Contract contract) {
        contractMapper.setCheckStateKeeping(contract);
    }

    @Override
    public void setCheckStateInvalid(Contract contract) {
        contractMapper.setCheckStateInvalid(contract);
    }

    @Override
    public List<Contract> list() {
        return contractMapper.list();
    }
}
