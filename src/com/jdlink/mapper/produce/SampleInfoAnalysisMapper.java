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
      * 通过编号获取化验单
      * @param id 编号
      * @return 化验单
      */
     SampleInfoAnalysis getById(String id);

     /**
      * 更新化验单
      * @param sampleInfoAnalysis 新化验单
      */
     void update(SampleInfoAnalysis sampleInfoAnalysis);

     /**
      * 获取仓储部化验单的数量
      * @param sampleInfoAnalysis 仓储部化验单的查询参数
      * @return 仓储部化验单的数量
      */
     int count(SampleInfoAnalysis sampleInfoAnalysis);

     /**
      * 增加仓储部化验单
      * @param sampleInfoAnalysis 仓储部化验单
      */
     void add(SampleInfoAnalysis sampleInfoAnalysis);
}
