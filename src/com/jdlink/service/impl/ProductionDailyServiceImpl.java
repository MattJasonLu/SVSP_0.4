package com.jdlink.service.impl;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.mapper.ProductionDailyMapper;
import com.jdlink.service.ProductionDailyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProductionDailyServiceImpl implements ProductionDailyService
{
    @Autowired
    ProductionDailyMapper productionDailyMapper;

    @Override
    public int countSewage(){ return productionDailyMapper.countSewage();}

    @Override
    public int searchCountSewage(Sewage sewage){ return productionDailyMapper.searchCountSewage(sewage); }

    @Override
    public List<Sewage> searchSewage(Sewage sewage){ return productionDailyMapper.searchSewage(sewage); }

    @Override
    public List<Sewage> listPageSewage(Page page){ return productionDailyMapper.listPageSewage(page); }

    @Override
    public void addSewage(Sewage sewage){ productionDailyMapper.addSewage(sewage); }


    @Override
    public int countSoftWater(){ return productionDailyMapper.countSoftWater();}

    @Override
    public int searchCountSoftWater(SoftWater softWater){ return productionDailyMapper.searchCountSoftWater(softWater); }

    @Override
    public List<SoftWater> searchSoftWater(SoftWater softWater){ return productionDailyMapper.searchSoftWater(softWater); }

    @Override
    public List<SoftWater> listPageSoftWater(Page page){ return productionDailyMapper.listPageSoftWater(page); }

    @Override
    public void addSoftWater(SoftWater softWater){ productionDailyMapper.addSoftWater(softWater); }

    @Override
    public int getProductionDailyId() {
        return productionDailyMapper.getProductionDailyId() + 1;
    }

    @Override
    public int getProductionDailyCount() {
        return productionDailyMapper.getProductionDailyCount();
    }

    @Override
    public List<ProductionDaily> listProductionDailyByPage(Page page) {
        return productionDailyMapper.listProductionDailyByPage(page);
    }

    @Override
    public void addProductionDaily(ProductionDaily productionDaily) {
        productionDailyMapper.addProductionDaily(productionDaily);
    }

    @Override
    public ProductionDaily getProductionDailyById(int id) {
        return productionDailyMapper.getProductionDailyById(id);
    }

    @Override
    public List<ProductionDaily> getProductionDailyByDateRange(Date beginTime, Date endTime, Page page) {
        return productionDailyMapper.getProductionDailyByDateRange(beginTime, endTime, page);
    }

    @Override
    public int getProductionDailyByDateRangeCount(Date beginTime, Date endTime) {
        return productionDailyMapper.getProductionDailyByDateRangeCount(beginTime, endTime);
    }

    @Override
    public void setProductionDailyState(int id, CheckState checkState) {
        productionDailyMapper.setProductionDailyState(id, checkState);
    }

    @Override
    public void deleteProductionDaily(int id) {
        productionDailyMapper.deleteProductionDaily(id);
    }

    @Override
    public List<ProductionDaily> searchProductionDaily(ProductionDaily productionDaily) {
        return productionDailyMapper.searchProductionDaily(productionDaily);
    }

    @Override
    public int searchProductionDailyCount(ProductionDaily productionDaily) {
        return productionDailyMapper.searchProductionDailyCount(productionDaily);
    }

    @Override
    public void addSewaGeregistration(Sewageregistration sewageregistration) {
        productionDailyMapper.addSewaGeregistration(sewageregistration);
    }

    @Override
    public List<Integer> getNewestId() {
        return productionDailyMapper.getNewestId();
    }

    @Override
    public void addSewaGeregistrationItem(SewageregistrationItem sewageregistrationItem) {
        productionDailyMapper.addSewaGeregistrationItem(sewageregistrationItem);
    }

    @Override
    public void addSoftGeregistration(Sewageregistration sewageregistration) {
        productionDailyMapper.addSoftGeregistration(sewageregistration);
    }

    @Override
    public void addSoftGeregistrationItem(SewageregistrationItem sewageregistrationItem) {
        productionDailyMapper.addSoftGeregistrationItem(sewageregistrationItem);
    }

    @Override
    public List<Sewageregistration> sewageList(Page page) {
        return productionDailyMapper.sewageList(page);
    }

    @Override
    public List<Sewageregistration> softList(Page page) {
        return productionDailyMapper.softList(page);
    }

    @Override
    public Sewageregistration getSewaGeregistrationById(String id) {
        return productionDailyMapper.getSewaGeregistrationById(id);
    }

    @Override
    public void confirmSewaGeregistrationById(String id) {
        productionDailyMapper.confirmSewaGeregistrationById(id);
    }

    @Override
    public void rejectSewaGeregistrationById(String id, String advice) {
        productionDailyMapper.rejectSewaGeregistrationById(id,advice);
    }

    @Override
    public int countById(String id) {
        return productionDailyMapper.countById(id);
    }
}
