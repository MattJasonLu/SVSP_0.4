package com.jdlink.service.impl;

import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.mapper.OutboundOrderMapper;
import com.jdlink.service.OutboundOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
    public void updateOutBoundOrder(String outboundOrderId) {
        outboundOrderMapper.updateOutBoundOrder(outboundOrderId);
    }

    @Override
    public List<OutboundOrder> getOutBoundOrderList() {
        return outboundOrderMapper.getOutBoundOrderList();
    }

    @Override
    public List<OutboundOrder> getById(String id){ return outboundOrderMapper.getById(id); }

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

    @Override
    public HandleCategory getHandelCategoryById(String outboundNumber) {
        return outboundOrderMapper.getHandelCategoryById(outboundNumber);
    }

    @Override
    public void upHandelCategoryById(String outboundOrderId, String handelCategory) {
        outboundOrderMapper.upHandelCategoryById(outboundOrderId,handelCategory);
    }

    @Override
    public void updateSecondart(OutboundOrder outboundOrder) {
        outboundOrderMapper.updateSecondart(outboundOrder);
    }

    @Override
    public List<OutboundOrder> getOutBoundByRange(Date startDate, Date endDate) {
        return outboundOrderMapper.getOutBoundByRange(startDate, endDate);
    }

    @Override
    public List<OutboundOrder> getOutBoundByDate(Date date) {
        return outboundOrderMapper.getOutBoundByRange(date,date);
    }

    @Override
    public List<OutboundOrder> getOutBoundByDateRangeAndEquipment(Date startDate, Date endDate, String equipment) {
        return outboundOrderMapper.getOutBoundByDateRangeAndEquipment(startDate,endDate,equipment);
    }

    @Override
    public List<OutboundOrder> getOutBoundByDateAndEquipment(Date date, String equipment) {
        return outboundOrderMapper.getOutBoundByDateRangeAndEquipment(date,date,equipment);
    }


    @Override
    public int searchCount(OutboundOrder outboundOrder){ return outboundOrderMapper.searchCount(outboundOrder); }

    @Override
    public List<OutboundOrder> search(OutboundOrder outboundOrder){ return outboundOrderMapper.search(outboundOrder); }
}
