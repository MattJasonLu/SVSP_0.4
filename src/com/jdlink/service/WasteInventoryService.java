package com.jdlink.service;

import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Inventory.WasteInventory;
import com.jdlink.domain.Page;

import java.util.Date;
import java.util.List;

public interface WasteInventoryService {
    List<WasteInventory> list(Page page);
    List<WasteInventory> list1();
    List<WasteInventory> list2(Page page);
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
    List<BatchingOrder>getBatching(Page page);
    int countInventory();
    List<BatchingOrder> searchBatchingOrder(BatchingOrder batchingOrder);
    int searchBatchingTotal(BatchingOrder batchingOrder);
    List<WasteInventory> getByInboundOrderItemId(String inboundOrderItemId);
    List<Date> getNewestInBoundDate();
    int  total1();
    List<Date> getNewestInBoundDateSec();
    void  updateInventoryCount(Float count,String inboundOrderItemId );
    List<WasteInventory> list3();
}
