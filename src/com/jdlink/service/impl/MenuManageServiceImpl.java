package com.jdlink.service.impl;

import com.jdlink.domain.Produce.Organization;
import com.jdlink.mapper.MenuManageMapper;
import com.jdlink.service.MenuManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuManageServiceImpl implements MenuManageService {
    @Autowired
    MenuManageMapper menuManageMapper;

    @Override
    public List<Organization> list(){ return menuManageMapper.list();}

    @Override
    public List<Organization> listMenuPage(){ return menuManageMapper.listMenuPage(); }

    @Override
    public List<Organization> listFirstMenu(){ return menuManageMapper.listFirstMenu();}

    @Override
    public List<Organization> loadFirstMenuIconList(){ return menuManageMapper.loadFirstMenuIconList();}

    @Override
    public int count(){return menuManageMapper.count();}

    @Override
    public int countById(int id){ return menuManageMapper.countById(id); }

    @Override
    public  int getFunctionCountById(int id){ return menuManageMapper.getFunctionCountById(id);}

    @Override
    public Organization getMenuById(int id){ return menuManageMapper.getMenuById(id);}

    @Override
    public Organization getMenuByName(String name,int id){ return menuManageMapper.getMenuByName(name,id);}

    @Override
    public List<Integer> getMenuIdListByPId(int pId){ return menuManageMapper.getMenuIdListByPId(pId);}

    @Override
    public List<Organization> getChildrenMenuByName(Organization organization){ return menuManageMapper.getChildrenMenuByName(organization);}

    @Override
    public List<Organization> getPageFunctionByUrl(String url){ return menuManageMapper.getPageFunctionByUrl(url); }

    @Override
    public Organization getMenuByUrlAndPName(Organization organization){return menuManageMapper.getMenuByUrlAndPName(organization);}

    @Override
    public List<Organization> getMenuByCUrl(String url){ return menuManageMapper.getMenuByCUrl(url); }

    @Override
    public void updateMenuOrder(Organization organization){ menuManageMapper.updateMenuOrder(organization);}

    @Override
    public void add(Organization organization){ menuManageMapper.add(organization);}

    @Override
    public void addFunctionTree(Organization organization){ menuManageMapper.addFunctionTree(organization);}

    @Override
    public void updateName(Organization organization){ menuManageMapper.updateName(organization); }

    @Override
    public void updateMenuUrl(Organization organization){ menuManageMapper.updateMenuUrl(organization);}

    @Override
    public void updateMenuIcon(Organization organization){ menuManageMapper.updateMenuIcon(organization);}

    @Override
    public void delete(Organization organization){ menuManageMapper.delete(organization);}

    @Override
    public void deleteFunction(){ menuManageMapper.deleteFunction();}

    @Override
    public void deleteFunctionByPId(int id){ menuManageMapper.deleteFunctionByPId(id);}

}
