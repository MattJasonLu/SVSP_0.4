package com.jdlink.service.impl;

import com.jdlink.domain.Inventory.WasteInventory;
import com.jdlink.mapper.WasteInventoryMapper;
import com.jdlink.service.WasteInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WasteInventoryServiceImpl implements WasteInventoryService {
    @Autowired
    WasteInventoryMapper wasteInventoryMapper;

    @Override
    public List<WasteInventory> list() {
        return wasteInventoryMapper.list();
    }

    @Override
    public List<WasteInventory> getWasteInventoryByInboundOrderId(String InboundOrderId) {
        return wasteInventoryMapper.getWasteInventoryByInboundOrderId(InboundOrderId);
    }


}
