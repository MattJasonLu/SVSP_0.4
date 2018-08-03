package com.jdlink.mapper;

import com.jdlink.domain.Produce.Stock;
import com.jdlink.domain.Wastes;

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
    /**
     * 获取库存信息
     *
     */
    List<Stock> list();
    /**
     * 根据编号获取ID
     *
     */
    Stock getById(String stockId);
    //库存信息更新
    void updateStock(Stock stock);
//更新危废表
    void updateWastes(Wastes wastes);
}
