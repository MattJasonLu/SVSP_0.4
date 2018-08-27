package com.jdlink.service.impl;

import com.jdlink.domain.Inventory.MaterialRequisitionOrder;
import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.mapper.MaterialRequisitionOrderMapper;
import com.jdlink.service.MaterialRequisitionOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialRequisitionOrderServiceImpl implements MaterialRequisitionOrderService  {
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

    @Override
    public List<MaterialRequisitionOrder> list() {
        return materialRequisitionOrderMapper.list();
    }

    @Override
    public void updateMaterialRequisitionOrderOnId(MaterialRequisitionOrder materialRequisitionOrder) {
        materialRequisitionOrderMapper.updateMaterialRequisitionOrderOnId(materialRequisitionOrder);
    }

    @Override
    public void updateBatchingOrderCheck(MaterialRequisitionOrder materialRequisitionOrder) {
        materialRequisitionOrderMapper.updateBatchingOrderCheck(materialRequisitionOrder);
    }

    @Override
    public void updateMaterialRequisitionId(String materialRequisitionId, String batchingOrderId) {
        materialRequisitionOrderMapper.updateMaterialRequisitionId(materialRequisitionId,batchingOrderId);

    }

    @Override
    public void updateMaterialRequisitionId1(MaterialRequisitionOrder materialRequisitionOrder) {
        materialRequisitionOrderMapper.updateMaterialRequisitionId1(materialRequisitionOrder);
    }

    @Override
    public void updateMaterialRequisitionOrderCheck(MaterialRequisitionOrder materialRequisitionOrder) {
        materialRequisitionOrderMapper.updateMaterialRequisitionOrderCheck(materialRequisitionOrder);
    }

    @Override
    public void updateMaterialRequisitionOrder(MaterialRequisitionOrder materialRequisitionOrder) {
        materialRequisitionOrderMapper.updateMaterialRequisitionOrder(materialRequisitionOrder);

    }

    @Override
    public MaterialRequisitionOrder  getByMaterialRequisitionId(String materialRequisitionId) {
        return materialRequisitionOrderMapper.getByMaterialRequisitionId(materialRequisitionId);
    }

    @Override
    public void addOutboundOrder(OutboundOrder outboundOrder) {
        materialRequisitionOrderMapper.addOutboundOrder(outboundOrder);

    }


}
