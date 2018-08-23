package com.jdlink.service.impl;

import com.jdlink.domain.Inventory.MaterialRequisitionOrder;
import com.jdlink.mapper.MaterialRequisitionOrderMapper;
import com.jdlink.service.MaterialRequisitionOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialRequisitionOrderServiceImpl implements MaterialRequisitionOrderService {
@Autowired MaterialRequisitionOrderMapper materialRequisitionOrderMapper;

    @Override
    public int total() {
        return materialRequisitionOrderMapper.total();
    }

    @Override
    public List<String> getMaterialRequisitionOrderList() {
        return materialRequisitionOrderMapper.getMaterialRequisitionOrderList();
    }

    @Override
    public void addMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder) {
        materialRequisitionOrderMapper.addMaterialRequisitionOrder(materialRequisitionOrder);
    }
}
