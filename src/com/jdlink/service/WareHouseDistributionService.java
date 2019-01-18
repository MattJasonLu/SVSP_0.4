package com.jdlink.service;

import com.jdlink.domain.Inventory.WareHouseDistributionList;

import java.util.List;

public interface WareHouseDistributionService {

    void deleteByRoleId(int roleId);

    void addAll(WareHouseDistributionList wareHouseDistributionList);

    List<Integer> getWareHouseIdListByRoleId(int roleId);
}
