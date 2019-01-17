package com.jdlink.service.produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ReceiveSampleAnalysis;
import com.jdlink.domain.Produce.SampleInfoAnalysis;
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
     */
    void setState(String id, CheckState checkState);

    /**
     * 更新
     * @param receiveSampleAnalysis 市场部化验单
     */
    void update(ReceiveSampleAnalysis receiveSampleAnalysis);

    /**
     * 通过对应参数获取
     * @param clientId
     * @param wastesCode
     * @param wastesName
     * @return
     */
    List<ReceiveSampleAnalysis>  getByMoreFactor(String clientId,String wastesCode,String wastesName);

}
