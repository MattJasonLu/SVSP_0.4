package com.jdlink.mapper.produce;

import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Page;

import java.util.List;

public interface BatchOrderMapper {
    void addBatchList(BatchingOrder batchingOrder);
    List<BatchingOrder> BatchList(Page page);
}
