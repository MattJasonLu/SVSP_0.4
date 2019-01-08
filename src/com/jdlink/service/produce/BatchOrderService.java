package com.jdlink.service.produce;

import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Inventory.MaterialRequisitionOrder;
import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Inventory.WasteInventory;
import com.jdlink.domain.Page;

import java.util.List;

public interface BatchOrderService {
    void addBatchList(BatchingOrder batchingOrder);
    List<BatchingOrder> BatchList(Page page);
    List<WasteInventory>getWasteInventoryListBat();
    List<WasteInventory> getWasteInventoryByInboundOrderId(String id);
    List<String> getBatchingOrderIdList();
    void  addBatchingOrderBat(BatchingOrder batchingOrder);
    void deducNumber(String inboundOrderItemId,float actualCount);
    void addRequisition(MaterialRequisitionOrder materialRequisitionOrder);
    List<MaterialRequisitionOrder> getMaterialRequisitionList();
    void updateMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);

    MaterialRequisitionOrder getByMaterialRequisitionId(String id);
    void addOutBoundOrder(OutboundOrder outboundOrder);
    List<OutboundOrder>loadWastesOutBoundList(Page page);
    List<WasteInventory> getSecInventoryListBat(Page page);
    void addSecondary(OutboundOrder outboundOrder);
    List<OutboundOrder>loadSecOutBoundList(Page page);
    BatchingOrder getBatchById(String id);
    void updateBatchOrderState(String id);
    List<MaterialRequisitionOrder> getMaterialRequisitionOrderList(Page page);
    void updateMaterialRequisitionOrderCheck(String id);
    OutboundOrder getWastesOutBoundById(String id);
    List<WasteInventory>getWasteInventoryList(Page page);
    OutboundOrder getSecOutBoundById(String id);
    int getCountByTime(String prefix);
    float getCountByInboundOrderItemId(String inboundOrderItemId);
    void updateBatchingOrder(BatchingOrder batchingOrder);
    void updateWasteInventoryActualCount(String inboundOrderItemId,float actualCount);
    int getCountByBatchId(String prefix);
    void updateBatchOrderNumberAfterMater(String batchingOrderId,float recipientsNumber);
    float getCountByBatchingOrderId(String batchingOrderId);
    void adjustMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
    void updateCountByBatchingOrderId(String batchingOrderId,float batchingNumber);
    int getSecCountByTime(String prefix);
    void updateSecOutBound(OutboundOrder outboundOrder);
    void cancelBatchingOrder(BatchingOrder batchingOrder);
    void updateInventoryNumber(String inboundOrderItemId,float batchingNumber);
    void cancelMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
    void updateBatchOrderNumber(String batchingOrderId,float recipientsNumber);
    void cancelOutBoundOrder(OutboundOrder outboundOrder);
    void updateInventoryNumberAfterInvalid(String inboundOrderItemId,float inventoryNumber);
    void retireOutBoundOrder(OutboundOrder outboundOrder);
    List<OutboundOrder> loadOutBoundList(Page page);
    List<OutboundOrder> getSecInventoryListAdd();
}
