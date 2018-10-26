package com.jdlink.service.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ReceiveSampleAnalysis;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ReceiveSampleAnalysisService {

    /**
     * 获取市场部化验单的
     * @param page 分页数据
     * @param receiveSampleAnalysis 市场部化验单的查询参数
     * @return 查询所得数据
     */
    List<ReceiveSampleAnalysis> get(@Param("page") Page page, @Param("sampleInfoAnalysis") ReceiveSampleAnalysis receiveSampleAnalysis);

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
}
