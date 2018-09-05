package com.jdlink.service;

import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Inventory.WasteInventory;

import java.util.List;

public interface WasteInventoryService {
    List<WasteInventory> list();
    List<WasteInventory> getWasteInventoryByInboundOrderId(String InboundOrderId);
    List<String> getBatchingOrderIdList();
    void addBatchingOrder(BatchingOrder batchingOrder);
    int total();
    List<BatchingOrder>getBatchingOrderList();
    void  updateBatchingOrderOnId(BatchingOrder batchingOrder);
    List<WasteInventory>searchInventory(WasteInventory wasteInventory);
    void getWasteInventoryLeftNumber(String inboundOrderItemId,float number);
    float getLeftNumber(String inboundOrderId);
    void updateLeftNumber();
    void batchingNumber(WasteInventory wasteInventory);
    void updateBatching(BatchingOrder batchingOrder);
    List<BatchingOrder>getBatching();
}
