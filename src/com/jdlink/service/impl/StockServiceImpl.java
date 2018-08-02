package com.jdlink.service.impl;

import com.jdlink.domain.Produce.Stock;
import com.jdlink.mapper.StockMapper;
import com.jdlink.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockServiceImpl implements StockService {
    @Autowired
    StockMapper stockMapper;
    @Override
    public void add(Stock stock) {
        stockMapper.add(stock);
    }
}
