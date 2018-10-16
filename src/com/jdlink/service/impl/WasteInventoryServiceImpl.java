package com.jdlink.service.impl;

import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Inventory.WasteInventory;
import com.jdlink.domain.Page;
import com.jdlink.mapper.WasteInventoryMapper;
import com.jdlink.service.WasteInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class WasteInventoryServiceImpl implements WasteInventoryService {
    @Autowired
    WasteInventoryMapper wasteInventoryMapper;

    @Override
    public List<WasteInventory> list(Page page) {
        return wasteInventoryMapper.list(page);
    }

    @Override
    public List<WasteInventory> list1() {
        return wasteInventoryMapper.list1();
    }

    @Override
    public List<WasteInventory> list2(Page page) {
        return wasteInventoryMapper.list2(page);
    }

    @Override
    public List<WasteInventory> getWasteInventoryByInboundOrderId(String InboundOrderId) {
        return wasteInventoryMapper.getWasteInventoryByInboundOrderId(InboundOrderId);
    }

    @Override
    public List<String> getBatchingOrderIdList() {
        return wasteInventoryMapper.getBatchingOrderIdList();
    }

    @Override
    public void addBatchingOrder(BatchingOrder batchingOrder) {
        wasteInventoryMapper.addBatchingOrder(batchingOrder);
    }

    @Override
    public int total() {
        return wasteInventoryMapper.total();
    }

    @Override
    public List<BatchingOrder> getBatchingOrderList() {
        return wasteInventoryMapper.getBatchingOrderList();
    }

    @Override
    public void updateBatchingOrderOnId(BatchingOrder batchingOrder) {
        wasteInventoryMapper.updateBatchingOrderOnId(batchingOrder);
    }

    @Override
    public List<WasteInventory> searchInventory(WasteInventory wasteInventory) {
        return wasteInventoryMapper.searchInventory(wasteInventory);
    }

    @Override
    public void getWasteInventoryLeftNumber(String inboundOrderItemId, float number) {
        wasteInventoryMapper.getWasteInventoryLeftNumber(inboundOrderItemId,number);
    }


    @Override
    public float getLeftNumber(String inboundOrderId) {
        return wasteInventoryMapper.getLeftNumber(inboundOrderId);
    }

    @Override
    public void updateLeftNumber() {
        wasteInventoryMapper.updateLeftNumber();
    }

    @Override
    public void batchingNumber(WasteInventory wasteInventory) {
        wasteInventoryMapper.batchingNumber(wasteInventory);
    }

    @Override
    public void updateBatching(BatchingOrder batchingOrder) {
        wasteInventoryMapper.updateBatching(batchingOrder);
    }

    @Override
    public List<BatchingOrder> getBatching(Page page) {
        return wasteInventoryMapper.getBatching(page);
    }

    @Override
    public int countInventory() {
        return wasteInventoryMapper.countInventory();
    }

    @Override
    public List<BatchingOrder> searchBatchingOrder(BatchingOrder batchingOrder) {
       return wasteInventoryMapper.searchBatchingOrder(batchingOrder);

    }

    @Override
    public int searchBatchingTotal(BatchingOrder batchingOrder) {
        return wasteInventoryMapper.searchBatchingTotal(batchingOrder);
    }

    @Override
    public List<WasteInventory> getByInboundOrderItemId(String inboundOrderItemId) {
        return wasteInventoryMapper.getByInboundOrderItemId(inboundOrderItemId);
    }

    @Override
    public List<Date> getNewestInBoundDate() {
        return wasteInventoryMapper.getNewestInBoundDate();
    }

    @Override
    public int total1() {
        return wasteInventoryMapper.total1();
    }

    @Override
    public List<Date> getNewestInBoundDateSec() {
        return wasteInventoryMapper.getNewestInBoundDateSec();

    }

    @Override
    public void updateInventoryCount(Float count, String inboundOrderItemId) {
        wasteInventoryMapper.updateInventoryCount(count,inboundOrderItemId);
    }

    @Override
    public List<WasteInventory> list3() {
        return wasteInventoryMapper.list3();
    }


}
