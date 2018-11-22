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
    public int count(){return menuManageMapper.count();}

    @Override
    public int countById(int id){ return menuManageMapper.countById(id); }

    @Override
    public Organization getMenuById(int id){ return menuManageMapper.getMenuById(id);}

    @Override
    public void add(Organization organization){ menuManageMapper.add(organization);}

    @Override
    public void updateName(Organization organization){ menuManageMapper.updateName(organization); }

    @Override
    public void delete(Organization organization){ menuManageMapper.delete(organization);}

}
