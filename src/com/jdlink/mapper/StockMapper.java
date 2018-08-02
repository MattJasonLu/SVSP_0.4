package com.jdlink.mapper;

import com.jdlink.domain.Produce.Stock;

import java.util.List;

public interface StockMapper {
    /**
     * 添加申报信息
     */
    void add(Stock stock);
    /**
     * 获取申报Id
     */
    List getStockIdList();
}
