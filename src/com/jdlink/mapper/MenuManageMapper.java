package com.jdlink.mapper;

import com.jdlink.domain.Produce.Organization;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MenuManageMapper {

    List<Organization> list();
    List<Organization> listMenuPage();
    List<Organization> loadFirstMenuIconList();
    int count();
    int countById(int id);
    Organization getMenuById(int id);
    Organization getMenuByName(@Param("name") String name,@Param("id") int id);
    List<Organization> getChildrenMenuByName(Organization organization);
    Organization getMenuByUrlAndPName(Organization organization);
    List<Integer> getMenuIdListByPId(int pId);
    List<Organization> getMenuByCUrl(String url);
    void updateMenuOrder(Organization organization);
    void add(Organization organization);
    void updateName(Organization organization);
    void updateMenuUrl(Organization organization);
    void updateMenuIcon(Organization organization);
    void delete(Organization organization);

}
