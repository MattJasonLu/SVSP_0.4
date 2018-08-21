package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Pounds;

import java.util.List;

public interface PoundsService {
    int count();
    List<Pounds> listPage(Page page);
    Pounds getById(String id);
    String getCurrentPoundsId();
    void add(Pounds pounds);
    void update(Pounds pounds);
    int searchCount(Pounds pounds);
    List<Pounds> search(Pounds pounds);
    int countById(String id);
    String getClientIdByName(String name);
    void invalid(String id);
}
