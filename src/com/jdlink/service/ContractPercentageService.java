package com.jdlink.service;

import com.jdlink.domain.Produce.ContractPercentage;

import java.util.List;

public interface ContractPercentageService {

    List<ContractPercentage> list();
    void deleteAll();
    void add(ContractPercentage contractPercentage);
}
