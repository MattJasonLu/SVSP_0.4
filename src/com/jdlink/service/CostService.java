package com.jdlink.service;

import com.jdlink.domain.Cost;
import com.jdlink.domain.Page;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * Created by matt on 2018/7/5.
 */
public interface CostService {

    void add(Cost cost);

    void update(Cost cost);

    void levelUp(Cost cost);

    List<Cost> list();

    List<Cost> listPage(Page page);

    List<Cost> list(String state);

    List<Cost> listNotInvalid();

    List<Cost> getByKeyword(String keyword);

    int count();

    Cost getById(String costId);

    void setStateDisabled(String costId);

    void changeEndDate(Cost cost);
    List<Cost> searchCost(Cost cost);
}
