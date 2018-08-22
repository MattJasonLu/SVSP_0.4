package com.jdlink.service;

import com.jdlink.domain.Inventory.WasteInventory;

import java.util.List;

public interface WasteInventoryService {
    List<WasteInventory> list();
    List<WasteInventory> getWasteInventoryByInboundOrderId(String InboundOrderId);
}
