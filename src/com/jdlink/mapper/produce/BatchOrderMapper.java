package com.jdlink.mapper.produce;

import com.jdlink.domain.Inventory.BatchingOrder;
import com.jdlink.domain.Inventory.MaterialRequisitionOrder;
import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Inventory.WasteInventory;
import com.jdlink.domain.Page;

import java.util.List;

public interface BatchOrderMapper {
    void addBatchList(BatchingOrder batchingOrder);
    List<BatchingOrder> BatchList(Page page);
    List<WasteInventory>getWasteInventoryListBat();
    List<WasteInventory> getWasteInventoryByInboundOrderId(String id);
    List<WasteInventory> getSecInventoryListBat();
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

}
