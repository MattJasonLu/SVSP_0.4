package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WastesSummary;
import com.jdlink.domain.Warning;
import com.jdlink.mapper.WarningMapper;
import com.jdlink.mapper.produce.WastesSummaryMapper;
import com.jdlink.service.WarningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WarningServiceImpl implements WarningService {
    @Autowired
    WarningMapper warningMapper;
    @Autowired
    WastesSummaryMapper wastesSummaryMapper;

    @Override
    public void add(Warning warning) {
        warningMapper.add(warning);
    }

    @Override
    public void updateWarning(Warning warning) {
        warningMapper.updateWarning(warning);
    }

    @Override
    public float getThresholdById(int id) {
        return warningMapper.getThresholdById(id);
    }

    @Override
    public List<Warning> loadWarningList(Page page) {
        return warningMapper.loadWarningList(page);
    }

    @Override
    public List<Warning> searchWaring(Warning warning) {
        return warningMapper.searchWaring(warning);
    }

    @Override
    public void deleteWarning(int id) {
        warningMapper.deleteWarning(id);
    }

    @Override
    public int totalWarningRecord() {
        return warningMapper.totalWarningRecord();
    }

    @Override
    public int searchWaringCount(Warning warning) {
        return warningMapper.searchWaringCount(warning);
    }

    @Override
    public void reStartWarning(int id) {
        warningMapper.reStartWarning(id);
    }

    @Override
    public List<Warning> getWarningDetailByAid(int id) {
        return warningMapper.getWarningDetailByAid(id);
    }

    @Override
    public void updateWarningRoleIdList(Warning warning) {
        warningMapper.deleteRoleListByAid(warning.getId());  // 删除旧数据
        warningMapper.addRoleIdList(warning);   // 新增数据
    }

    @Override
    public void updateWarningDetail(Warning warning) {
        warningMapper.deleteDetailByAid(warning.getId());   // 删除旧数据
        warningMapper.addDetailList(warning);      // 新增数据
    }

    @Override
    public List<String> getWarningInfoByRole(int id) {
        List<String> warningList = new ArrayList<>();
        if (warningMapper.getCountByRoleIdAndAid(2, id) == 1) {   // 具有该权限
            List<WastesSummary> wastesSummaries = wastesSummaryMapper.getWarningWastesInfo();   // 获取库存量大于0的危废信息
            List<Warning> warnings = warningMapper.getWarningDetailByAid(2);   // 获取库存期限预警的信息
            for (WastesSummary wastesSummary : wastesSummaries) {  // 循环数据
                for (Warning warning : warnings) {
                    String code = wastesSummary.getWastesCode();
                    if (warning.getWarningName().equals("HW" + code.substring(code.length() - 2, code.length()))) { // 获取名称相同的阈值
                        Date now = new Date();
                        long day = (now.getTime() - wastesSummary.getInboundDate().getTime()) / (24 * 60 * 60 * 1000);  // 计算当前与入库日期相差值
                        if (day > warning.getWarningThreshold()) {  // 超过期限值
                            String warnInfo = "危废超期提醒：入库单" + wastesSummary.getInboundOrderId() + "中" + wastesSummary.getWastesCode() + "已存储" + day + "天，请及时处理！";        // 设置危废信息
                            warningList.add(warnInfo);   // 添加危废信息
                        }
                    }
                }
            }
        }
        return warningList;
    }


}
