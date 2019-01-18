package com.jdlink.service.impl;

import com.jdlink.domain.Inventory.WareHouseDistributionList;
import com.jdlink.mapper.WareHouseDistributionMapper;
import com.jdlink.service.WareHouseDistributionService;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WareHouseDistributionServiceImpl implements WareHouseDistributionService {

    @Autowired
    WareHouseDistributionMapper wareHouseDistributionMapper;

    @Override
    public void deleteByRoleId(int roleId){ wareHouseDistributionMapper.deleteByRoleId(roleId);}

    @Override
    public void addAll(WareHouseDistributionList wareHouseDistributionList) { wareHouseDistributionMapper.addAll(wareHouseDistributionList);}

    @Override
    public List<Integer> getWareHouseIdListByRoleId(int roleId) { return wareHouseDistributionMapper.getWareHouseIdListByRoleId(roleId); }
}
