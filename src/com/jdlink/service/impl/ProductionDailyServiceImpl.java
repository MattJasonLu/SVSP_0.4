package com.jdlink.service.impl;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.mapper.ProductionDailyMapper;
import com.jdlink.service.ProductionDailyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
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
    public int searchCountSewage(Sewageregistration sewageregistration){ return productionDailyMapper.searchCountSewage(sewageregistration); }

    @Override
    public List<Sewageregistration> searchSewage(Sewageregistration sewageregistration){ return productionDailyMapper.searchSewage(sewageregistration); }

    @Override
    public List<Sewage> listPageSewage(Page page){ return productionDailyMapper.listPageSewage(page); }

    @Override
    public void addSewage(Sewage sewage){ productionDailyMapper.addSewage(sewage); }

    @Override
    public void confirmAllSoftWaterCheck(Sewageregistration sewageregistration) { productionDailyMapper.confirmAllSoftWaterCheck(sewageregistration); }

    @Override
    public void confirmAllSewageAnalysisCheck(Sewageregistration sewageregistration){ productionDailyMapper.confirmAllSewageAnalysisCheck(sewageregistration);}

    @Override
    public int countSoftWater(){ return productionDailyMapper.countSoftWater();}

    @Override
    public int searchCountSoftWater(Sewageregistration sewageregistration){ return productionDailyMapper.searchCountSoftWater(sewageregistration); }

    @Override
    public List<Sewageregistration> searchSoftWater(Sewageregistration sewageregistration){ return productionDailyMapper.searchSoftWater(sewageregistration); }

    @Override
    public List<SoftWater> listPageSoftWater(Page page){ return productionDailyMapper.listPageSoftWater(page); }

    @Override
    public void addSoftWater(SoftWater softWater){ productionDailyMapper.addSoftWater(softWater); }

    @Override
    public int getProductionDailyId() {
        int index = getProductionDailyCount();
        // 获取唯一的编号
        do {
            index += 1;
        } while (getProductionDailyById(index) != null);
        return index;
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
    public void setProductionDailyState(ProductionDaily productionDaily) {
        productionDailyMapper.setProductionDailyState(productionDaily);
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
    public List<String> getNewestId() {
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
    public void confirmSewaGeregistrationById(String id,String laboratorySignatory) {
        productionDailyMapper.confirmSewaGeregistrationById(id,laboratorySignatory);
    }

    @Override
    public void rejectSewaGeregistrationById(String id, String advice) {
        productionDailyMapper.rejectSewaGeregistrationById(id,advice);
    }

    @Override
    public int countById(String id) {
        return productionDailyMapper.countById(id);
    }

    @Override
    public int countByIdSew(String id) {
        return productionDailyMapper.countByIdSew(id);
    }

    @Override
    public int wastesCountById(String id) {
        return productionDailyMapper.wastesCountById(id);
    }

    @Override
    public SewageregistrationItem getByWastesId(String id) {
        return productionDailyMapper.getByWastesId(id);
    }

    @Override
    public int wastesCountByIdSoft(String id) {
        return productionDailyMapper.wastesCountByIdSoft(id);
    }

    @Override
    public void confirmSoftGeregistrationById(String id, String laboratorySignatory) {
        productionDailyMapper.confirmSoftGeregistrationById(id, laboratorySignatory);
    }

    @Override
    public void rejectSoftGeregistrationById(String id, String advice) {
        productionDailyMapper.rejectSoftGeregistrationById(id, advice);

    }

    @Override
    public Sewageregistration getSoftGeregistrationById(String id) {
        return productionDailyMapper.getSoftGeregistrationById(id);
    }

    @Override
    public void sampleTest(String id, String address) {
        productionDailyMapper.sampleTest(id, address);
    }

    @Override
    public void updateSampleTest(SewageTest sewageTest) {
        productionDailyMapper.updateSampleTest(sewageTest);
    }

    @Override
    public void sampleTestSoft(String id,String address) {
        productionDailyMapper.sampleTestSoft(id, address);
    }

    @Override
    public void updateSampleSoftTest(SoftTest softTest) {
        productionDailyMapper.updateSampleSoftTest(softTest);
    }
}
