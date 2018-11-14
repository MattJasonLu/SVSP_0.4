package com.jdlink.service.produce.impl;

import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Inventory.MaterialRequisitionOrder;
import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Inventory.WasteInventory;
import com.jdlink.domain.Page;
import com.jdlink.mapper.produce.BatchOrderMapper;
import com.jdlink.service.produce.BatchOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchOrderServiceImpl implements BatchOrderService


{
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

    @Override
    public List<WasteInventory> getWasteInventoryListBat() {
        return batchOrderMapper.getWasteInventoryListBat();
    }

    @Override
    public List<WasteInventory> getWasteInventoryByInboundOrderId(String id) {
        return batchOrderMapper.getWasteInventoryByInboundOrderId(id);
    }

    @Override
    public List<String> getBatchingOrderIdList() {
        return batchOrderMapper.getBatchingOrderIdList();
    }

    @Override
    public void addBatchingOrderBat(BatchingOrder batchingOrder) {
        batchOrderMapper.addBatchingOrderBat(batchingOrder);
    }

    @Override
    public void deducNumber(String inboundOrderItemId, float actualCount) {
        batchOrderMapper.deducNumber(inboundOrderItemId,actualCount);
    }

    @Override
    public void addRequisition(MaterialRequisitionOrder materialRequisitionOrder) {
        batchOrderMapper.addRequisition(materialRequisitionOrder);
    }

    @Override
    public List<MaterialRequisitionOrder> getMaterialRequisitionList() {
        return batchOrderMapper.getMaterialRequisitionList();
    }

    @Override
    public void updateMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder) {
        batchOrderMapper.updateMaterialRequisitionOrder(materialRequisitionOrder);
    }

    @Override
    public MaterialRequisitionOrder getByMaterialRequisitionId(String id) {
        return batchOrderMapper.getByMaterialRequisitionId(id);
    }

    @Override
    public void addOutBoundOrder(OutboundOrder outboundOrder) {
        batchOrderMapper.addOutBoundOrder(outboundOrder);
    }

    @Override
    public List<OutboundOrder> loadWastesOutBoundList(Page page) {
        return batchOrderMapper.loadWastesOutBoundList(page);
    }



    @Override
    public List<WasteInventory> getSecInventoryListBat(Page page) {
        return batchOrderMapper.getSecInventoryListBat(page);
    }

    @Override
    public void addSecondary(OutboundOrder outboundOrder) {
        batchOrderMapper.addSecondary(outboundOrder);
    }

    @Override
    public List<OutboundOrder> loadSecOutBoundList(Page page) {
        return batchOrderMapper.loadSecOutBoundList(page);
    }

    @Override
    public BatchingOrder getBatchById(String id) {
        return batchOrderMapper.getBatchById(id);
    }

    @Override
    public void updateBatchOrderState(String id) {
        batchOrderMapper.updateBatchOrderState(id);
    }

    @Override
    public List<MaterialRequisitionOrder> getMaterialRequisitionOrderList(Page page) {
        return batchOrderMapper.getMaterialRequisitionOrderList(page);
    }

    @Override
    public void updateMaterialRequisitionOrderCheck(String id) {
        batchOrderMapper.updateMaterialRequisitionOrderCheck(id);
    }

    @Override
    public OutboundOrder getWastesOutBoundById(String id) {
        return batchOrderMapper.getWastesOutBoundById(id);
    }

    @Override
    public List<WasteInventory> getWasteInventoryList(Page page) {
        return batchOrderMapper.getWasteInventoryList(page);
    }

    @Override
    public OutboundOrder getSecOutBoundById(String id) {
        return batchOrderMapper.getSecOutBoundById(id);
    }

    @Override
    public int getCountByTime(String prefix) {
        return batchOrderMapper.getCountByTime(prefix);
    }

    @Override
    public float getCountByInboundOrderItemId(String inboundOrderItemId) {
        return batchOrderMapper.getCountByInboundOrderItemId(inboundOrderItemId);
    }

    @Override
    public void updateBatchingOrder(BatchingOrder batchingOrder) {
        batchOrderMapper.updateBatchingOrder(batchingOrder);
    }

    @Override
    public void updateWasteInventoryActualCount(String inboundOrderItemId, float actualCount) {
        batchOrderMapper.updateWasteInventoryActualCount(inboundOrderItemId, actualCount);
    }

    @Override
    public int getCountByBatchId(String prefix) {
        return batchOrderMapper.getCountByBatchId(prefix);
    }

    @Override
    public void updateBatchOrderNumberAfterMater(String batchingOrderId, float recipientsNumber) {
        batchOrderMapper.updateBatchOrderNumberAfterMater(batchingOrderId, recipientsNumber);
    }

    @Override
    public float getCountByBatchingOrderId(String batchingOrderId) {
        return batchOrderMapper.getCountByBatchingOrderId(batchingOrderId);
    }

    @Override
    public void adjustMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder) {
        batchOrderMapper.adjustMaterialRequisitionOrder(materialRequisitionOrder);
    }

    @Override
    public void updateCountByBatchingOrderId(String batchingOrderId, float batchingNumber) {
        batchOrderMapper.updateCountByBatchingOrderId(batchingOrderId,batchingNumber);
    }

    @Override
    public int getSecCountByTime(String prefix) {
        return batchOrderMapper.getSecCountByTime(prefix);
    }

    @Override
    public void updateSecOutBound(OutboundOrder outboundOrder) {
        batchOrderMapper.updateSecOutBound(outboundOrder);
    }

    @Override
    public void cancelBatchingOrder(BatchingOrder batchingOrder) {
        batchOrderMapper.cancelBatchingOrder(batchingOrder);;
    }

    @Override
    public void updateInventoryNumber(String inboundOrderItemId, float batchingNumber) {
        batchOrderMapper.updateInventoryNumber(inboundOrderItemId, batchingNumber);
    }

    @Override
    public void cancelMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder) {
        batchOrderMapper.cancelMaterialRequisitionOrder(materialRequisitionOrder);
    }

    @Override
    public void updateBatchOrderNumber(String batchingOrderId, float recipientsNumber) {
        batchOrderMapper.updateBatchOrderNumber(batchingOrderId,recipientsNumber);
    }

    @Override
    public void cancelOutBoundOrder(OutboundOrder outboundOrder) {
        batchOrderMapper.cancelOutBoundOrder(outboundOrder);
    }

    @Override
    public void updateInventoryNumberAfterInvalid(String inboundOrderItemId, float inventoryNumber) {
        batchOrderMapper.updateInventoryNumberAfterInvalid(inboundOrderItemId, inventoryNumber);
    }

    @Override
    public void retireOutBoundOrder(OutboundOrder outboundOrder) {
        batchOrderMapper.retireOutBoundOrder(outboundOrder);
    }

    @Override
    public List<OutboundOrder> loadOutBoundList(Page page){ return batchOrderMapper.loadOutBoundList(page);}

}
