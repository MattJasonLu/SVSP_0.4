package com.jdlink.service;

import com.jdlink.domain.Contract;

import java.util.List;

/**
 * Created by matt on 2018/5/18.
 */
public interface ContractService {
    void updateEm(Contract contract);
    void add(Contract contract);
    void delete(Contract contract);
    List<Contract> getByKeyword(String keyword,String nameBykey);
    Contract getByContractId(String contractId);
    void update(Contract contract);
    void setCheckStateToExamine(Contract contract);
    void setCheckStateKeeping(Contract contract);
    void setCheckStateInvalid(Contract contract);
    List<Contract> list();
    List<Contract> list1(String name);
    List<Contract> list2(String name,String index2);
    List getContractIdList();
    void toSubmit(String id);
     void updateFreight1(String id);
    void updateFreight2(String id);
    List listRate1();
    List listRate2();
    Contract getModel(String contractId);
    Contract getModel2(String modelName);
    void addEm(Contract contract);
    void cancel(String contractId,String nowTime);
    void cancel1(String modelName);
    void approval(String contractId);
    List<String> modelName(String key);
    void back(String contractId,String backContent,String nowTime);
    void opinion(String contractId,String opinion,String nowTime);
}
