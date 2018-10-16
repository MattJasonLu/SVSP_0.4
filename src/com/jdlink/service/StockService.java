package com.jdlink.service;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Stock;
import com.jdlink.domain.Produce.StockItem;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface StockService {
    void add(Stock stock);
    List getStockIdList();
    List<Stock> list();
    List<Stock> list(Page page);
    Stock getById(String stockId);
    void updateStock(Stock stock);
    void updateWastes(Wastes wastes);
    void submitStock(String stockId);
    void cancelStock(String stockId);
    List<Stock> search(Stock stock);
    int total();
    int searchCount(Stock stock);
    void opinion(String stockId,String opinion);
    void back(String stockId,String opinion);
    void delete(Stock stock);
    void addList(Stock stock);
    void time1(Stock stock);
    void addStockItem(StockItem stockItem);
    void updateStockItem(StockItem stockItem);
    void deleteStockItem(String stockId);
}
