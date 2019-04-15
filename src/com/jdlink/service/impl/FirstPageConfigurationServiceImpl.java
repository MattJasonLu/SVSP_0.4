package com.jdlink.service.impl;

import com.jdlink.domain.Produce.Organization;
import com.jdlink.mapper.FirstPageConfigurationMapper;
import com.jdlink.service.FirstPageConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FirstPageConfigurationServiceImpl implements FirstPageConfigurationService {
    @Autowired
    FirstPageConfigurationMapper firstPageConfigurationMapper;

    @Override
    public void addPage(Organization organization) {
        firstPageConfigurationMapper.deleteByRoleIdAndMenuName(organization.getId(),organization.getName());
        int id = firstPageConfigurationMapper.getCountId() + 1;
        while (firstPageConfigurationMapper.getById(id) != null){  // 如果主键存在则+1
            id ++;
        }
        organization.setpId(id);   // 设置主键
        firstPageConfigurationMapper.addConfiguration(organization);   // 新增首页显示配置
        for(Organization organization1 : organization.getOrganizationList()) {   // 新增各个配置的页面
            organization1.setpId(id);   // 设置外键
            firstPageConfigurationMapper.addConfigurationItem(organization1);
        }
    }

    @Override
    public List<Integer> getByMenuNameAndRoleId(Organization organization) {
        return firstPageConfigurationMapper.getByMenuNameAndRoleId(organization);
    }

}
