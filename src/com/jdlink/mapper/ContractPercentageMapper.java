package com.jdlink.mapper;

import com.jdlink.domain.Produce.ContractPercentage;

import java.util.List;

public interface ContractPercentageMapper {

    List<ContractPercentage> list();
    void deleteAll();
    void add(ContractPercentage contractPercentage);
}
