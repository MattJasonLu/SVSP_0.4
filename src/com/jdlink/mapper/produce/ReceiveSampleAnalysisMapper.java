package com.jdlink.mapper.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ReceiveSampleAnalysis;
import com.jdlink.domain.Produce.SampleInfoAnalysis;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ReceiveSampleAnalysisMapper {
     /**
      * 获取市场部化验单的
      * @param page 分页数据
      * @param receiveSampleAnalysis 市场部化验单的查询参数
      * @return 查询所得数据
      */
     List<ReceiveSampleAnalysis> get(@Param("page") Page page, @Param("receiveSampleAnalysis") ReceiveSampleAnalysis receiveSampleAnalysis);

     /**
      * 获取市场部化验单的数量
      * @param receiveSampleAnalysis 市场部化验单的查询参数
      * @return 市场部化验单的数量
      */
     int count(ReceiveSampleAnalysis receiveSampleAnalysis);
}
