package com.jdlink.mapper;

import com.jdlink.domain.Inventory.WareHouse;
import com.jdlink.domain.WastesInfo;

import java.util.List;

public interface WastesInfoMapper {
    List<WareHouse>getWareHouseList();
    List<WastesInfo> list();
   String getWastesNameByCode(String code);
}
