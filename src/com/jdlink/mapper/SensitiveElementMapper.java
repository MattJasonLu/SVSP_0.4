package com.jdlink.mapper;

import com.jdlink.domain.SensitiveElement;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface SensitiveElementMapper {

    void add(SensitiveElement sensitiveElement);

    void delete(String id);

    SensitiveElement get(String id);

    void update(SensitiveElement sensitiveElement);

    List<SensitiveElement> list();

    int count();

}
