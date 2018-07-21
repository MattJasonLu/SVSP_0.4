package com.jdlink.service;

import com.jdlink.domain.Cost;

import java.util.List;

/**
 * Created by matt on 2018/7/5.
 */
public interface CostService {

    void add(Cost cost);

    void update(Cost cost);

    void levelUp(Cost cost);

    List<Cost> list();

    List<Cost> getByKeyword(String keyword);

    int count();

    Cost getById(String costId);

    void setStateDisabled(String costId);

    void changeEndDate(Cost cost);
}
