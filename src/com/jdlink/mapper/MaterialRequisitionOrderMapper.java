package com.jdlink.mapper;

import com.jdlink.domain.Inventory.MaterialRequisitionOrder;

import java.util.List;

public interface MaterialRequisitionOrderMapper {
    int total();
    List<String> getMaterialRequisitionOrderList();
    void addMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder);
    List<MaterialRequisitionOrder> list();
}
