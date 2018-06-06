package com.jdlink.service;

import com.jdlink.domain.MixingElement;

import java.util.List;

/**
 * Created by matt on 2018/5/4.
 */
public interface MixingElementService {
    void add(MixingElement mixingElement);

    void delete(String id);

    MixingElement get(String id);

    void update(MixingElement mixingElement);

    List<MixingElement> list();

    int count();
}
