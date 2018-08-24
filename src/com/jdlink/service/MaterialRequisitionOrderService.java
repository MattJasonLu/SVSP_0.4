package com.jdlink.service;

import com.jdlink.domain.Inventory.MaterialRequisitionOrder;
import com.jdlink.domain.Produce.MaterialRequire;

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
    void updateMaterialRequisitionOrderCheck(MaterialRequisitionOrder materialRequisitionOrder);
    void  updateMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
    MaterialRequisitionOrder getByMaterialRequisitionId(String materialRequisitionId);
}
