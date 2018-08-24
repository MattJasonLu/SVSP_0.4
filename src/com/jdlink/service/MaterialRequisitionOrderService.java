package com.jdlink.service;

import com.jdlink.domain.Inventory.MaterialRequisitionOrder;

import java.util.List;

public interface MaterialRequisitionOrderService {
    int total();
    List<String> getMaterialRequisitionOrderList();
    void addMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
    List<MaterialRequisitionOrder> list();
    void  updateMaterialRequisitionOrderOnId(MaterialRequisitionOrder materialRequisitionOrder);
    void updateBatchingOrderCheck(MaterialRequisitionOrder materialRequisitionOrder);
    void  updateMaterialRequisitionId(String materialRequisitionId,String batchingOrderId);
    void  updateMaterialRequisitionId1(MaterialRequisitionOrder materialRequisitionOrder);
}
