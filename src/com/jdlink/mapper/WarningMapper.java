package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Warning;
import org.apache.ibatis.annotations.Param;

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

    void reStartWarning(int id);

    List<Warning> getWarningDetailByAid(int id);

    void deleteRoleListByAid(int id);

    void deleteDetailByAid(int id);

    void addRoleIdList(Warning warning);

    void addDetailList(Warning warning);

    int getCountByRoleIdAndAid(@Param("aId")int aId, @Param("roleId")int roleId);

}
