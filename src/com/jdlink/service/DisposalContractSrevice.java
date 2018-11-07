package com.jdlink.service;

import com.jdlink.domain.DisposalContract;
import com.jdlink.domain.Page;

import java.util.List;

public interface DisposalContractSrevice {

    void addWastesContract(DisposalContract disposalContract);

    List<DisposalContract> loadWastesContractList(Page page);

    DisposalContract getWastesContractListById(String id);

    void   updateWastesContract(DisposalContract disposalContract);
}
