package com.jdlink.service;

import com.jdlink.domain.SensitiveElement;

import java.util.List;

/**
 * Created by matt on 2018/5/4.
 */
public interface SensitiveElementService {
    void add(SensitiveElement sensitiveElement);

    void delete(String id);

    SensitiveElement get(String id);

    void update(SensitiveElement sensitiveElement);

    List<SensitiveElement> list();

    int count();
}
