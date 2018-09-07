package com.jdlink.mapper;

import com.jdlink.domain.Produce.WasteInto;

import java.util.List;

public interface WasteIntoMapper {
   List<WasteInto> WasteIntoList();
   List<WasteInto> SecondIntoList();
   void updateWasteInto();
   int countWaste();
}
