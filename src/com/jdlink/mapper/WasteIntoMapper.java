package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SecondarySample;
import com.jdlink.domain.Produce.SecondarySampleItem;
import com.jdlink.domain.Produce.WasteInto;

import java.util.List;

public interface WasteIntoMapper {
   List<WasteInto> WasteIntoList(Page page);
   List<WasteInto> SecondIntoList(Page page);
   void updateWasteInto();
   int countWaste();
   int countSec();
   int countById(String id);
   int wastesCountById(String id);
   SecondarySample getSecondarysampleById(String id);
   void addSecondarySample(SecondarySample secondarySample);
   void addSecondarySampleItem(SecondarySampleItem secondarySampleItem);
   List<String> getNewestId();

   List<SecondarySample> getSecondarysample(Page page);

   void confirmSecondarySampleById(String id);
   void rejectSecondarySampleById(String id,String advice);

   SecondarySampleItem getByWastesId(String id);

}
