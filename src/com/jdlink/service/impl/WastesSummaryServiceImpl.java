package com.jdlink.service.impl;

import com.jdlink.domain.Produce.WastesSummary;
import com.jdlink.mapper.produce.WastesSummaryMapper;
import com.jdlink.service.WastesSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WastesSummaryServiceImpl implements WastesSummaryService {

    @Autowired
    WastesSummaryMapper wastesSummaryMapper;


    @Override
    public List<WastesSummary> get(WastesSummary wastesSummary) {
        return wastesSummaryMapper.get(wastesSummary);
    }

    @Override
    public int count(WastesSummary wastesSummary) {
        return wastesSummaryMapper.count(wastesSummary);
    }
}
