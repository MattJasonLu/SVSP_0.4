package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WasteInto;

import java.util.List;

public interface WasteIntoService {
    List<WasteInto> WasteIntoList(Page page);
    void updateWasteInto();
    int countWaste();
    List<WasteInto> SecondIntoList(Page page);
    int countSec();
}
