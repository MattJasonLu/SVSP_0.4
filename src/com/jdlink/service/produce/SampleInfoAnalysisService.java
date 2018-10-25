package com.jdlink.service.produce;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.SampleInfoAnalysis;

import java.util.List;

public interface SampleInfoAnalysisService {

    /**
     * 获取仓储部化验单的
     * @param page 分页数据
     * @param sampleInfoAnalysis 仓储部化验单的查询参数
     * @return 查询所得数据
     */
    List<SampleInfoAnalysis> get(Page page, SampleInfoAnalysis sampleInfoAnalysis);

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
