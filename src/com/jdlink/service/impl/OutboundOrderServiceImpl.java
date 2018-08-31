package com.jdlink.service.impl;

import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.mapper.OutboundOrderMapper;
import com.jdlink.service.OutboundOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OutboundOrderServiceImpl implements OutboundOrderService{
    @Autowired
    OutboundOrderMapper outboundOrderMapper;
    @Override
    public List<String> check() {
        return outboundOrderMapper.check();
    }

    @Override
    public void updateMaterialRequisitionOrderCheck1(OutboundOrder outboundOrder) {
        outboundOrderMapper.updateMaterialRequisitionOrderCheck1(outboundOrder);
    }

    @Override
    public List<OutboundOrder> loadOutBoundList() {
        return outboundOrderMapper.loadOutBoundList();
    }

    @Override
    public int total() {
        return outboundOrderMapper.total();
    }

    @Override
    public List<OutboundOrder> getByOutBoundOrderId(String outboundOrderId) {
        return outboundOrderMapper.getByOutBoundOrderId(outboundOrderId);
    }

    @Override
    public void updateOutBoundOrder(OutboundOrder outboundOrder) {
        outboundOrderMapper.updateOutBoundOrder(outboundOrder);
    }

    @Override
    public List<OutboundOrder> getOutBoundOrderList() {
        return outboundOrderMapper.getOutBoundOrderList();
    }

    @Override
    public OutboundOrder getOutBoundByMId(String materialRequisitionId) {
        return outboundOrderMapper.getOutBoundByMId(materialRequisitionId);
    }

    @Override
    public void addSecondary(OutboundOrder outboundOrder) {
        outboundOrderMapper.addSecondary(outboundOrder);
    }

    @Override
    public OutboundOrder getOutBoundByInId(String inboundOrderId) {
        return outboundOrderMapper.getOutBoundByInId(inboundOrderId);
    }

    @Override
    public void updateSecOutBoundOrder(OutboundOrder outboundOrder) {
        outboundOrderMapper.updateSecOutBoundOrder(outboundOrder);
    }

    @Override
    public void upWastesInventoryNumber(OutboundOrder outboundOrder) {
        outboundOrderMapper.upWastesInventoryNumber(outboundOrder);
    }
}
