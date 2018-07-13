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
public class ContractServiceImpl implements ContractService  {
    @Autowired
    ContractMapper contractMapper;

    @Override
    public void updateEm(Contract contract) {
        contractMapper.updateEm(contract);
    }

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

    @Override
    public List<Contract> list1(String name) {
        return contractMapper.list1(name);
    }

    @Override
    public List getContractIdList() {
        return contractMapper.getContractIdList();
    }

    @Override
    public void toSubmit(String id) {
        contractMapper.toSubmit(id);
    }

    @Override
    public void updateFreight1(String id) {
        contractMapper.updateFreight1(id);
    }

    @Override public void updateFreight2(String id) {
contractMapper.updateFreight2(id);
    }

    @Override
    public List listRate1() {
        return contractMapper.listRate1();
    }

    @Override
    public List listRate2() {
        return contractMapper.listRate2();
    }

    @Override
    public Contract getModel(String contractId) {
        return contractMapper.getModel(contractId);
    }

    @Override
    public void addEm(Contract contract) {
        contractMapper.addEm(contract);
    }

    @Override
    public void cancel(String contractId) {
        contractMapper.cancel(contractId);
    }

    @Override
    public void cancel1(String modelName) {
        contractMapper.cancel1(modelName);
    }

    @Override
    public void approval(String contractId) {
        contractMapper.approval(contractId);
    }

    @Override
    public List<String> modelName(String key) {
        return contractMapper.modelName(key);
    }

    @Override
    public void back(String contractId) {
        contractMapper.back(contractId);
    }
}
