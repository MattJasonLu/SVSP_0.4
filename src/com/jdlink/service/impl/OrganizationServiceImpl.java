package com.jdlink.service.impl;

import com.jdlink.domain.Produce.Organization;
import com.jdlink.mapper.OrganizationMapper;
import com.jdlink.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    OrganizationMapper organizationMapper;

    @Override
    public List<Organization> list(){
        List<Organization> organizationList = new ArrayList<>();
        List<Organization> organizationList1 = organizationMapper.listCompany(); // 获取公司
        List<Organization> organizationList2 = organizationMapper.listDepartment();// 获取部门
        List<Organization> organizationList3 = organizationMapper.listTeam(); // 获取项目组
        for(Organization organization : organizationList1){
            organizationList.add(organization);
        }
        for(Organization organization : organizationList2){
            organizationList.add(organization);
        }
        for(Organization organization : organizationList3){
            organizationList.add(organization);
        }
        return organizationList;
    }

    @Override
    public void addCompanyName(Organization organization){ organizationMapper.addCompanyName(organization);}

    @Override
    public void addDepartment(Organization organization){ organizationMapper.addDepartment(organization);}

    @Override
    public void addTeam(Organization organization){ organizationMapper.addTeam(organization);}

    @Override
    public void updateCompanyName(Organization organization){ organizationMapper.updateCompanyName(organization);}

    @Override
    public void updateDepartment(Organization organization){ organizationMapper.updateDepartment(organization);}

    @Override
    public void updateTeam(Organization organization){ organizationMapper.updateTeam(organization);}

    @Override
    public void deleteCompanyName(Organization organization){ organizationMapper.deleteCompanyName(organization);}

    @Override
    public void deleteDepartment(Organization organization){ organizationMapper.deleteDepartment(organization);}

    @Override
    public void deleteTeam(Organization organization){ organizationMapper.deleteTeam(organization);}

    @Override
    public int countDepartment(int id){ return organizationMapper.countDepartment(id);}

    @Override
    public int countTeam(int id){ return organizationMapper.countTeam(id);}

    @Override
    public Organization getDepartmentById(int id){ return organizationMapper.getDepartmentById(id);}

    @Override
    public Organization getTeamById(int id){ return organizationMapper.getTeamById(id);}
}
