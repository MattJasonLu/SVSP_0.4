package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Warning;
import org.springframework.stereotype.Service;

import java.util.List;


public interface WarningService {

    void add(Warning warning);

    void updateWarning(Warning warning);

    float getThresholdById(int id);

    List<Warning> loadWarningList(Page page);

    List<Warning> searchWaring(Warning warning);

    void deleteWarning(int id);

    int totalWarningRecord();

    int searchWaringCount(Warning warning);

    void reStartWarning(int id);

    List<Warning> getWarningDetailByAid(int id);

    void updateWarningRoleIdList(Warning warning);

    void updateWarningDetail(Warning warning);

    List<String> getWarningInfoByRole(int id);
}
