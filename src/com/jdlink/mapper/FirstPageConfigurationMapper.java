package com.jdlink.mapper;

import com.jdlink.domain.Produce.Organization;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FirstPageConfigurationMapper {

    int getCountId();

    Organization getById(int id);

    void deleteByRoleIdAndMenuName(@Param("id") int id, @Param("name") String name);

    void addConfiguration(Organization organization);

    void addConfigurationItem(Organization organization);

    List<Integer> getByMenuNameAndRoleId(Organization organization);
}
