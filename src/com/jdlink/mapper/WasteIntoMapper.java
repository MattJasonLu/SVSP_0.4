package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WasteInto;

import java.util.List;

public interface WasteIntoMapper {
   List<WasteInto> WasteIntoList(Page page);
   List<WasteInto> SecondIntoList(Page page);
   void updateWasteInto();
   int countWaste();
   int countSec();
}
