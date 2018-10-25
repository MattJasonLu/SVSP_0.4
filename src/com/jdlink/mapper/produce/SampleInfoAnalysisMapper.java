package com.jdlink.mapper.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInfoAnalysis;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SampleInfoAnalysisMapper {
     /**
      * 获取仓储部化验单的
      * @param page 分页数据
      * @param sampleInfoAnalysis 仓储部化验单的查询参数
      * @return 查询所得数据
      */
     List<SampleInfoAnalysis> get(@Param("page") Page page, @Param("sampleInfoAnalysis") SampleInfoAnalysis sampleInfoAnalysis);

     /**
      * 获取仓储部化验单的数量
      * @param sampleInfoAnalysis 仓储部化验单的查询参数
      * @return 仓储部化验单的数量
      */
     int count(SampleInfoAnalysis sampleInfoAnalysis);
}
