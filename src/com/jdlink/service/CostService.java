package com.jdlink.service;

import com.jdlink.domain.Cost;

import java.util.List;

/**
 * Created by matt on 2018/7/5.
 */
public interface CostService {

    void add(Cost cost);

    void update(Cost cost);

    List<Cost> list();

    int count();

    Cost getById(String costId);
}
