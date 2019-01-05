package com.jdlink.mapper.produce;

import com.jdlink.domain.CheckState;
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
      * 通过编号获取化验单
      * @param id 编号
      * @return 化验单
      */
     ReceiveSampleAnalysis getById(String id);

     /**
      * 获取市场部化验单的数量
      * @param receiveSampleAnalysis 市场部化验单的查询参数
      * @return 市场部化验单的数量
      */
     int count(ReceiveSampleAnalysis receiveSampleAnalysis);

     /**
      * 增加市场部化验单
      * @param receiveSampleAnalysis 化验单
      */
     void add(ReceiveSampleAnalysis receiveSampleAnalysis);

     /**
      * 设置状态
      * @param id 编号
      * @param newId 新编号
      */
     void setState(@Param("id") String id, @Param("checkState") CheckState checkState, @Param("newId") String newId);

     /**
      * 更新
      * @param receiveSampleAnalysis
      */
     void update(ReceiveSampleAnalysis receiveSampleAnalysis);



}
