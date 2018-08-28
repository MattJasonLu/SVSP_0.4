package com.jdlink.service;

import com.jdlink.domain.Inventory.OutboundOrder;

import java.util.List;

public interface OutboundOrderService {
    List<String> check();
    void updateMaterialRequisitionOrderCheck1(OutboundOrder outboundOrder);
}
