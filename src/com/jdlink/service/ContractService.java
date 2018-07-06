package com.jdlink.service;

import com.jdlink.domain.Contract;

import java.util.List;

/**
 * Created by matt on 2018/5/18.
 */
public interface ContractService {

    void add(Contract contract);
    void delete(Contract contract);
    List<Contract> getByKeyword(String keyword);
    Contract getByContractId(String contractId);
    void update(Contract contract);
    void setCheckStateToExamine(Contract contract);
    void setCheckStateKeeping(Contract contract);
    void setCheckStateInvalid(Contract contract);
    List<Contract> list();
    List getContractIdList();
    void toSubmit(String id);
     void updateFreight1(String id);
    void updateFreight2(String id);
    List listRate1();
    List listRate2();
}
