package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Stock;
import com.jdlink.domain.Wastes;
import com.jdlink.mapper.StockMapper;
import com.jdlink.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockServiceImpl implements StockService  {
    @Autowired
    StockMapper stockMapper;
    @Override
    public void add(Stock stock) {
        stockMapper.add(stock);
    }

    @Override
    public List getStockIdList() {
        return stockMapper.getStockIdList();
    }

    @Override
    public List<Stock> list() {
        return stockMapper.list();
    }

    @Override
    public List<Stock> list(Page page) {
        return stockMapper.list(page);
    }

    @Override
    public Stock getById(String stockId) {
        return stockMapper.getById(stockId);
    }

    @Override
    public void updateStock(Stock stock) {
        stockMapper.updateStock(stock);
    }

    @Override
    public void updateWastes(Wastes wastes) {
        stockMapper.updateWastes(wastes);
    }

    @Override
    public void submitStock(String stockId) {
        stockMapper.submitStock(stockId);
    }

    @Override
    public void cancelStock(String stockId) {
        stockMapper.cancelStock(stockId);
    }

    @Override
    public List<Stock> search(Stock stock) {
        return stockMapper.search(stock);
    }

    @Override
    public int total() {
        return stockMapper.total();
    }

    @Override
    public int searchCount(Stock stock) {
        return stockMapper.searchCount(stock);
    }

    @Override
    public void opinion(String stockId, String opinion) {
        stockMapper.opinion(stockId,opinion);
    }

    @Override
    public void back(String stockId, String opinion) {
        stockMapper.back(stockId,opinion);
    }

    @Override
    public void delete(Stock stock) {
        stockMapper.delete(stock);
    }

    @Override
    public void addList(Stock stock) {
        stockMapper.addList(stock);
    }

    @Override
    public void time1(Stock stock) {
        stockMapper.time1( stock);
    }


}
