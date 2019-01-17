package com.jdlink.mapper;

import com.jdlink.domain.Inventory.WareHouseDistributionList;

import java.util.List;

public interface WareHouseDistributionMapper {

    void deleteByRoleId(int roleId);

    void addAll(WareHouseDistributionList wareHouseDistributionList);

    List<Integer> getWareHouseIdListByRoleId(int roleId);
}
