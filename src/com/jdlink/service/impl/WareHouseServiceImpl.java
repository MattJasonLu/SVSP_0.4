package com.jdlink.service.impl;

import com.jdlink.domain.Inventory.WareHouse;
import com.jdlink.mapper.WareHouseMapper;
import com.jdlink.service.WareHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;

@Service
public class WareHouseServiceImpl implements WareHouseService {

    @Autowired
    WareHouseMapper wareHouseMapper;

    @Override
    public String getCurrentId() {
        //得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(3);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(3);
        // 获取最新编号
        String id;
        int index = count();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (getWareHouseById(id) != null);
        return id;
    }

    @Override
    public void add(WareHouse wareHouse) {
        wareHouseMapper.add(wareHouse);
    }

    @Override
    public WareHouse getWareHouseByName(String name) {
        return wareHouseMapper.getWareHouseByName(name);
    }

    @Override
    public WareHouse getWareHouseById(String id) {
        return wareHouseMapper.getWareHouseById(id);
    }

    @Override
    public int count() {
        return wareHouseMapper.count();
    }


}
