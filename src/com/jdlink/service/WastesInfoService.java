package com.jdlink.service;


import com.jdlink.domain.Inventory.WareHouse;
import com.jdlink.domain.WastesInfo;

import java.util.List;


public interface WastesInfoService {
   List<WastesInfo> list();//查询全部数据
   List<WareHouse>getWareHouseList();
}
