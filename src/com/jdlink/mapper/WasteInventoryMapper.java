package com.jdlink.mapper;

import com.jdlink.domain.Inventory.WasteInventory;

import java.util.List;

public interface WasteInventoryMapper {
   List<WasteInventory> list();
   List<WasteInventory> getWasteInventoryByInboundOrderId(String InboundOrderId);
}
