package com.jdlink.service.impl;

import com.jdlink.domain.Produce.WastesSummary;
import com.jdlink.mapper.produce.SecondaryWastesSummaryMapper;
import com.jdlink.mapper.produce.WastesSummaryMapper;
import com.jdlink.service.SecondaryWastesSummaryService;
import com.jdlink.service.WastesSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecondaryWastesSummaryServiceImpl implements SecondaryWastesSummaryService {

    @Autowired
    SecondaryWastesSummaryMapper secondaryWastesSummaryMapper;


    @Override
    public List<WastesSummary> get(WastesSummary wastesSummary) {
        return secondaryWastesSummaryMapper.get(wastesSummary);
    }

    @Override
    public int count(WastesSummary wastesSummary) {
        return secondaryWastesSummaryMapper.count(wastesSummary);
    }
}
