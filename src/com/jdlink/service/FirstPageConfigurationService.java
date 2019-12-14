package com.jdlink.service;

import com.jdlink.domain.Produce.Organization;

import java.util.List;

public interface FirstPageConfigurationService {

    void addPage(Organization organization);

    List<Integer> getByMenuNameAndRoleId(Organization organization);

    /**
     * 根据角色获取当前角色各一级菜单的自定义首页数据
     * @param id 角色ID
     * @return  一级菜单列表及其首页数据
     */
    List<Organization> getPageConfigurationTreeByRoleId(int id);
}
