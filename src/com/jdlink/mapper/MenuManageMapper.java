package com.jdlink.mapper;

import com.jdlink.domain.Produce.Organization;

import java.util.List;

public interface MenuManageMapper {

    List<Organization> list();
    List<Organization> listMenuPage();
    int count();
    int countById(int id);
    Organization getMenuById(int id);
    void add(Organization organization);
    void updateName(Organization organization);
    void updateMenuUrl(Organization organization);
    void delete(Organization organization);

}
