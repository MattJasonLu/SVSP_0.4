package com.jdlink.service;

import com.jdlink.domain.Produce.Organization;

import java.util.List;

public interface MenuManageService {

    List<Organization> list();
    List<Organization> listMenuPage();
    List<Organization> listFirstMenu();
    List<Organization> loadFirstMenuIconList();
    int count();
    int countById(int id);
    int getFunctionCountById(int id);
    Organization getMenuById(int id);
    Organization getMenuByName(String name,int id);
    Organization getMenuByUrlAndPName(Organization organization);
    List<Organization> getMenuByCUrl(String url);
    List<Organization> getChildrenMenuByName(Organization organization);
    List<Organization> getPageFunctionByUrl(String url);
    List<Integer> getMenuIdListByPId(int pId);
    void updateMenuOrder(Organization organization);
    void add(Organization organization);
    void addFunctionTree(Organization organization);
    void updateName(Organization organization);
    void updateMenuUrl(Organization organization);
    void updateMenuIcon(Organization organization);
    void delete(Organization organization);
    void deleteFunction();
    void deleteFunctionByPId(int id);

}
