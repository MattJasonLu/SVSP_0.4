package com.jdlink.mapper.produce;

import com.jdlink.domain.Produce.WastesSummary;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface WastesSummaryMapper {

     /**
      * 获取危废汇总信息
      * @param wastesSummary 查询参数
      * @return 汇总信息
      */
     List<WastesSummary> get(WastesSummary wastesSummary);

     List<WastesSummary> getWarningWastesInfo();

     /**
      * 计算危废汇总信息的数量
      * @param wastesSummary 危废汇总对象
      * @return 数量
      */
     int count(WastesSummary wastesSummary);

}
