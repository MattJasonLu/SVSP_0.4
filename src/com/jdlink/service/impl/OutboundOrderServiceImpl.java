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
}
