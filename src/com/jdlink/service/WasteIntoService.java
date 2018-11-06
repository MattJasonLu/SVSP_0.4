package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SecondarySample;
import com.jdlink.domain.Produce.SecondarySampleItem;
import com.jdlink.domain.Produce.WasteInto;

import java.util.List;

public interface WasteIntoService {
    List<WasteInto> WasteIntoList(Page page);
    void updateWasteInto();
    int countWaste();
    List<WasteInto> SecondIntoList(Page page);
    int countSec();
    int countById(String id);
    SecondarySample getSecondarysampleById(String id);
    void addSecondarySample(SecondarySample secondarySample);
    void addSecondarySampleItem(SecondarySampleItem secondarySampleItem);
    List<String> getNewestId();
    List<SecondarySample> getSecondarysample(Page page);
    void confirmSecondarySampleById(String id,String laboratorySignatory);
    void rejectSecondarySampleById(String id,String advice);
    int wastesCountById(String id);
    SecondarySampleItem getByWastesId(String id);
    List<SecondarySample>searchSecondary(SecondarySample secondarySample);
    int searchSecondaryCount(SecondarySample secondarySample);
}
