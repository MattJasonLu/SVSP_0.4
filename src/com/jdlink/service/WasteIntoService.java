package com.jdlink.service;

import com.jdlink.domain.Produce.WasteInto;

import java.util.List;

public interface WasteIntoService {
    List<WasteInto> WasteIntoList();
    void updateWasteInto();
    int countWaste();
    List<WasteInto> SecondIntoList();
}
