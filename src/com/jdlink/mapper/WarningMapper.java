package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Warning;

import java.util.List;

public interface WarningMapper {

    void add(Warning warning);

    void updateWarning(Warning warning);

    float getThresholdById(int id);

    List<Warning> loadWarningList(Page page);

    List<Warning> searchWaring(Warning warning);

    void deleteWarning(int id);

    int totalWarningRecord();

    int searchWaringCount(Warning warning);
}
