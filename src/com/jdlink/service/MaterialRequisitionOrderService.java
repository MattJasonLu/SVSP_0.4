package com.jdlink.service;

import com.jdlink.domain.Inventory.MaterialRequisitionOrder;

import java.util.List;

public interface MaterialRequisitionOrderService {
    int total();
    List<String> getMaterialRequisitionOrderList();
    void addMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
    List<MaterialRequisitionOrder> list();
}
