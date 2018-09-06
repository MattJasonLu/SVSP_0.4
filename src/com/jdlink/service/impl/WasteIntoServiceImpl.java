package com.jdlink.service.impl;


import com.jdlink.domain.Produce.WasteInto;
import com.jdlink.mapper.WasteIntoMapper;
import com.jdlink.service.WasteIntoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WasteIntoServiceImpl implements WasteIntoService {
    @Autowired
    WasteIntoMapper wasteIntoMapper;

    @Override
    public List<WasteInto> WasteIntoList() {
        return wasteIntoMapper.WasteIntoList();
    }

    @Override
    public void updateWasteInto() {
        wasteIntoMapper.updateWasteInto();
    }

    @Override
    public int countWaste() {
        return wasteIntoMapper.countWaste();
    }

    @Override
    public List<WasteInto> SecondIntoList() {
        return wasteIntoMapper.SecondIntoList();
    }
}
