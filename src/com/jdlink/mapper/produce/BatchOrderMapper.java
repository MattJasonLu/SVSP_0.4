package com.jdlink.mapper.produce;

import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Inventory.MaterialRequisitionOrder;
import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Inventory.WasteInventory;
import com.jdlink.domain.Page;
import com.jdlink.domain.Sample;

import java.util.List;

public interface BatchOrderMapper {
    void addBatchList(BatchingOrder batchingOrder);
    List<BatchingOrder> BatchList(Page page);
    List<WasteInventory>getWasteInventoryListBat();
    List<WasteInventory> getWasteInventoryByInboundOrderId(String id);
    List<WasteInventory> getSecInventoryListBat(Page page);
    List<String> getBatchingOrderIdList();
    void  addBatchingOrderBat(BatchingOrder batchingOrder);
    void deducNumber(String inboundOrderItemId,float actualCount);
    void addRequisition(MaterialRequisitionOrder materialRequisitionOrder);
   List<MaterialRequisitionOrder> getMaterialRequisitionList();
   void updateMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
    MaterialRequisitionOrder getByMaterialRequisitionId(String id);
    void addOutBoundOrder(OutboundOrder outboundOrder);
    void addSecondary(OutboundOrder outboundOrder);

    List<OutboundOrder>loadWastesOutBoundList(Page page);
    List<OutboundOrder>loadSecOutBoundList(Page page);
    BatchingOrder getBatchById(String id);
    void updateBatchOrderState(String id);
    List<MaterialRequisitionOrder> getMaterialRequisitionOrderList(Page page);
    void updateMaterialRequisitionOrderCheck(String id);
    OutboundOrder getWastesOutBoundById(String id);
    List<WasteInventory>getWasteInventoryList(Page page);
    OutboundOrder getSecOutBoundById(String id);
    int getCountByTime(String prefix);
    int getSecCountByTime(String prefix);
    float getCountByInboundOrderItemId(String inboundOrderItemId);
    void updateBatchingOrder(BatchingOrder batchingOrder);
    void updateWasteInventoryActualCount(String inboundOrderItemId,float actualCount);
    int getCountByBatchId(String prefix);
    void updateBatchOrderNumberAfterMater(String batchingOrderId,float recipientsNumber);
    float getCountByBatchingOrderId(String batchingOrderId);
   void adjustMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
   void updateCountByBatchingOrderId(String batchingOrderId,float batchingNumber);
   void updateSecOutBound(OutboundOrder outboundOrder);
   void cancelBatchingOrder(BatchingOrder batchingOrder);
   void updateInventoryNumber(String inboundOrderItemId,float batchingNumber);
   void cancelMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
   void updateBatchOrderNumber(String batchingOrderId,float recipientsNumber);
   void cancelOutBoundOrder(OutboundOrder outboundOrder);
   void updateInventoryNumberAfterInvalid(String inboundOrderItemId,float inventoryNumber);
   void retireOutBoundOrder(OutboundOrder outboundOrder);
    List<OutboundOrder> loadOutBoundList(Page page);

    List<WasteInventory> getSecInventoryListAdd();

    List<WasteInventory>getSecInventoryByDate(int secondaryCategoryId,int wareHouseId);

    void   lessThanOutBoundNumber(String wasteInventoryId);

    void moreThanOutBoundNumber(String wasteInventoryId,float count);

    float getCountByWareHouseAndName(int wareHouseId,int secondaryCategoryId);

    WasteInventory  getSecInventoryByDateDesc(int secondaryCategoryId,int wareHouseId);

    void AddWasteInventory(float actualCount,String wasteInventoryId);

    void confirmSettled(String outboundOrderId);
    List<String> getDateBbySettled();
    List<String> getDateBbySettledWastes();
    List<WasteInventory> searchWastesInventory(WasteInventory wasteInventory);
    int searchWastesInventoryCount(WasteInventory wasteInventory);

    List<OutboundOrder>searchSecOutbound(OutboundOrder outboundOrder);

    int searchSecOutboundCount(OutboundOrder outboundOrder);
}
