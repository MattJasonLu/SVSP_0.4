package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ProductionDaily;
import com.jdlink.domain.Produce.Sewage;
import com.jdlink.domain.Produce.SoftWater;

import java.util.List;

public interface ProductionDailyMapper {

    int countSewage();
    int searchCountSewage(Sewage sewage);
    List<Sewage> searchSewage(Sewage sewage);
    List<Sewage> listPageSewage(Page page);
    void addSewage(Sewage sewage);

    int countSoftWater();
    int searchCountSoftWater(SoftWater softWater);
    List<SoftWater> searchSoftWater(SoftWater softWater);
    List<SoftWater> listPageSoftWater(Page page);
    void addSoftWater(SoftWater softWater);
    /**
     * 获取生产日报的编号
     * @return 编号
     */
    int getProductionDailyId();

    /**
     * 获取日报的数量
     * @return 数量
     */
    int getProductionDailyCount();

    /**
     * 获取日报分页的数据
     * @param page 页数
     * @return 日报数据
     */
    List<ProductionDaily> listProductionDailyByPage(Page page);

    /**
     * 增加日报
     * @param productionDaily 日报对象
     */
    void addProductionDaily(ProductionDaily productionDaily);

    /**
     * 通过编号获取日报
     * @param id 编号
     * @return 日报
     */
    ProductionDaily getProductionDailyById(int id);
}
