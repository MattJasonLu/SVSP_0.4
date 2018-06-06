package com.jdlink.mapper;

import com.jdlink.domain.Contract;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface ContractMapper {

    void add(Contract contract);
    void delete(Contract contract);
    List<Contract> getByKeyword(String keyword);
    Contract getByContractId(String contractId);
    void update(Contract contract);
    void setCheckStateToExamine(Contract contract);
    void setCheckStateKeeping(Contract contract);
    void setCheckStateInvalid(Contract contract);
    List<Contract> list();

}
