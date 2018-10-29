package com.jdlink.service.produce.impl;

import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Page;
import com.jdlink.mapper.produce.BatchOrderMapper;
import com.jdlink.service.produce.BatchOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchOrderServiceImpl implements BatchOrderService{
    @Autowired
    BatchOrderMapper batchOrderMapper;

    @Override
    public void addBatchList(BatchingOrder batchingOrder) {
        batchOrderMapper.addBatchList(batchingOrder);
    }

    @Override
    public List<BatchingOrder> BatchList(Page page) {
        return batchOrderMapper.BatchList(page);
    }
}
