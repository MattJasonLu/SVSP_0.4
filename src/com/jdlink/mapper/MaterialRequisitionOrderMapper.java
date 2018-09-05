package com.jdlink.mapper;

import com.jdlink.domain.Inventory.MaterialRequisitionOrder;
import com.jdlink.domain.Inventory.OutboundOrder;

import java.util.List;

public interface MaterialRequisitionOrderMapper {
    int total();
    List<String> getMaterialRequisitionOrderList();
    void addMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
    List<MaterialRequisitionOrder> list();
  void  updateMaterialRequisitionOrderOnId(MaterialRequisitionOrder materialRequisitionOrder);
  void updateBatchingOrderCheck(MaterialRequisitionOrder materialRequisitionOrder);
    void  updateMaterialRequisitionId(String materialRequisitionId,String batchingOrderId);
    void  updateMaterialRequisitionId1(MaterialRequisitionOrder materialRequisitionOrder);
    void  updateMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
    void updateMaterialRequisitionOrderCheck(MaterialRequisitionOrder materialRequisitionOrder);
    MaterialRequisitionOrder getByMaterialRequisitionId(String materialRequisitionId);
   void addOutboundOrder(OutboundOrder outboundOrder);
    List<MaterialRequisitionOrder>getNew();
    void updateMaterialRequisitionOrder1(MaterialRequisitionOrder materialRequisitionOrder);
}
