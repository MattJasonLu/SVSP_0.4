package com.jdlink.service.impl;

import com.jdlink.domain.DisposalContract;
import com.jdlink.domain.Page;
import com.jdlink.mapper.DisposalContractMapper;
import com.jdlink.service.DisposalContractSrevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisposalContractSreviceImpl implements DisposalContractSrevice {
    @Autowired
    DisposalContractMapper disposalContractMapper;

    @Override
    public void addWastesContract(DisposalContract disposalContract) {
        disposalContractMapper.addWastesContract(disposalContract);
    }

    @Override
    public List<DisposalContract> loadWastesContractList(Page page) {
        return disposalContractMapper.loadWastesContractList(page);
    }

    @Override
    public DisposalContract getWastesContractListById(String id) {
        return disposalContractMapper.getWastesContractListById(id);
    }

    @Override
    public void updateWastesContract(DisposalContract disposalContract) {
        disposalContractMapper.updateWastesContract(disposalContract);
    }

    @Override
    public void signDisposalContract(int id) {
        disposalContractMapper.signDisposalContract(id);
    }

    @Override
    public void cancelDisposalContract(int id) {
        disposalContractMapper.cancelDisposalContract(id);
    }

    @Override
    public List<DisposalContract> searchDisposalContract(DisposalContract disposalContract) {
        return disposalContractMapper.searchDisposalContract(disposalContract);
    }

    @Override
    public int searchDisposalContractCount(DisposalContract disposalContract) {
        return disposalContractMapper.searchDisposalContractCount(disposalContract);
    }
}
