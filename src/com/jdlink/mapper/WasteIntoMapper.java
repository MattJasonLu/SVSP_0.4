package com.jdlink.mapper;

import com.jdlink.domain.Produce.WasteInto;

import java.util.List;

public interface WasteIntoMapper {
   List<WasteInto> WasteIntoList();
   void updateWasteInto();
   int countWaste();
}
