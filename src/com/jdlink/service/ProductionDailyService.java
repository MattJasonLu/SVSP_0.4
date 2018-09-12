package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ProductionDaily;
import com.jdlink.domain.Produce.Sewage;
import com.jdlink.domain.Produce.SoftWater;

import java.util.List;

public interface ProductionDailyService {

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
     * 增加日报
     * @param productionDaily 日报对象
     */
    void addProductionDaily(ProductionDaily productionDaily);
}
