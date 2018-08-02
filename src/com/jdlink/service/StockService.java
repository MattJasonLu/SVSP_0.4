package com.jdlink.service;

import com.jdlink.domain.Produce.Stock;

import java.util.List;

public interface StockService {
    void add(Stock stock);
    List getStockIdList();
    List<Stock> list();
}
