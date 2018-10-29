package com.jdlink.service;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
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

    /**
     * 通过日期范围来获取生产日报的集合
     * @param beginTime 起始日期
     * @param endTime 结束日期
     * @return 生产日报的集合
     */
    List<ProductionDaily> getProductionDailyByDateRange(Date beginTime, Date endTime, Page page);

    /**
     * 通过起始日期和结束日期获取生产日报
     * @param beginTime 起始日期
     * @param endTime 结束日期
     * @return 生产日报集合
     */
    int getProductionDailyByDateRangeCount(Date beginTime, Date endTime);

    /**
     * 设置生产日报的状态
     * @param id 编号
     * @param checkState 校验状态
     */
    void setProductionDailyState(int id, CheckState checkState);

    /**
     * 删除日报
     * @param id 日报编号
     */
    void deleteProductionDaily(int id);

    /**
     * 搜索日报
     * @param productionDaily 参数
     * @return 搜索到的日报
     */
    List<ProductionDaily> searchProductionDaily(ProductionDaily productionDaily);

    /**
     * 搜索日报的数量
     * @param productionDaily 参数
     * @return 数量
     */
    int searchProductionDailyCount(ProductionDaily productionDaily);

    void addSewaGeregistration(Sewageregistration sewageregistration);

    List<String> getNewestId();

    void addSewaGeregistrationItem(SewageregistrationItem sewageregistrationItem);

    void addSoftGeregistration(Sewageregistration sewageregistration);

    void addSoftGeregistrationItem(SewageregistrationItem sewageregistrationItem);

    List<Sewageregistration> sewageList(Page page);

    List<Sewageregistration> softList(Page page);

    Sewageregistration  getSewaGeregistrationById(String id);

    void confirmSewaGeregistrationById(String id);

    void rejectSewaGeregistrationById(String id,String advice);

    int countById(String id);

    int countByIdSew(String id);

    int wastesCountById(String id);

    SewageregistrationItem getByWastesId(String id);
}
