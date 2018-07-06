package com.jdlink.mapper;

import com.jdlink.domain.Cost;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface CostMapper {

    void add(Cost cost);

    void update(Cost cost);

    List<Cost> list();

    int count();

    Cost getById(String costId);
}
