package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Pounds;

import java.util.List;

public interface PoundsMapper {

    int count();

    List<Pounds> listPage(Page page);

    Pounds getById(String id);

    void add(Pounds pounds);

    void update(Pounds pounds);

    int searchCount(Pounds pounds);

    List<Pounds> search(Pounds pounds);

    int countById(String id);

    String getClientIdByName(String name);

    void invalid(String id);
}
