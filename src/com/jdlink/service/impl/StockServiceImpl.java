package com.jdlink.service.impl;

import com.jdlink.domain.Produce.Stock;
import com.jdlink.mapper.StockMapper;
import com.jdlink.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockServiceImpl implements StockService {
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
    public Stock getById(String stockId) {
        return stockMapper.getById(stockId);
    }

    @Override
    public void updateStock(Stock stock) {
        stockMapper.updateStock(stock);
    }
}
