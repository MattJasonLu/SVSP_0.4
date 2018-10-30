package com.jdlink.service.produce;

import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Page;

import java.util.List;

public interface BatchOrderService {
    void addBatchList(BatchingOrder batchingOrder);
    List<BatchingOrder> BatchList(Page page);
}
