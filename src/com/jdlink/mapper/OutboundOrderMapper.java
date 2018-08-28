package com.jdlink.mapper;

import com.jdlink.domain.Inventory.OutboundOrder;

import java.util.List;

public interface OutboundOrderMapper {
   List<String> check();
   void updateMaterialRequisitionOrderCheck1(OutboundOrder outboundOrder);
   List<OutboundOrder>loadOutBoundList();
   int total();


}
