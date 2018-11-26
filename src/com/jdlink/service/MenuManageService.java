package com.jdlink.service;

import com.jdlink.domain.Produce.Organization;

import java.util.List;

public interface MenuManageService {

    List<Organization> list();
    List<Organization> listMenuPage();
    int count();
    int countById(int id);
    Organization getMenuById(int id);
    Organization getMenuByName(String name,int id);
    List<Organization> getChildrenMenuByName(Organization organization);
    List<Integer> getMenuIdListByPId(int pId);
    void updateMenuOrder(Organization organization);
    void add(Organization organization);
    void updateName(Organization organization);
    void updateMenuUrl(Organization organization);
    void updateMenuIcon(Organization organization);
    void delete(Organization organization);
}
