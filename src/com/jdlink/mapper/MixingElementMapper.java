package com.jdlink.mapper;

import com.jdlink.domain.MixingElement;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface MixingElementMapper {

    void add(MixingElement mixingElement);

    void delete(String id);

    MixingElement get(String id);

    void update(MixingElement mixingElement);

    List<MixingElement> list();

    int count();

}
