package com.jdlink.mapper;

import com.jdlink.domain.Produce.Organization;

import java.util.List;

public interface MenuManageMapper {

    List<Organization> list();
    int count();
    int countById(int id);
    Organization getMenuById(int id);
    void add(Organization organization);
    void updateName(Organization organization);
    void delete(Organization organization);

}
