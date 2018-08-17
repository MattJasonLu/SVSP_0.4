package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ProductionPlan;
import com.jdlink.mapper.ProductionPlanMapper;
import com.jdlink.service.ProductionPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionPlanServiceImpl implements ProductionPlanService {
   @Autowired
    ProductionPlanMapper productionPlanMapper;

   @Override
    public int count(){ return productionPlanMapper.count(); }

    @Override
    public int searchCount(ProductionPlan productionPlan){ return productionPlanMapper.searchCount(productionPlan); }

    @Override
    public List<ProductionPlan> listPage(Page page){ return productionPlanMapper.listPage(page); }

    @Override
    public List<ProductionPlan> search(ProductionPlan productionPlan){ return productionPlanMapper.search(productionPlan); }
    /**
     * 审批通过
     * @param productionPlan
     */
    @Override
    public void approval(ProductionPlan productionPlan){ productionPlanMapper.approval(productionPlan); }

    /**
     * 审批驳回
     * @param productionPlan
     */
    public void reject(ProductionPlan productionPlan){ productionPlanMapper.reject(productionPlan); }

    /**
     * 提交
     * @param id
     */
    public void submit(String id){ productionPlanMapper.submit(id); }

    /**
     * 作废
     * @param id
     */
    public void invalid(String id){ productionPlanMapper.invalid(id); }

    /**
     * 确认
     * @param id
     */
    public void confirm(String id){ productionPlanMapper.confirm(id); }

    /**
     * 根据ID获取数据
     * @param id
     * @return
     */
    public ProductionPlan getById(String id){ return productionPlanMapper.getById(id); }

    /**
     * 删除
     * @param id
     */
    public void delete(String id){ productionPlanMapper.delete(id); }

    public void add(ProductionPlan productionPlan){ productionPlanMapper.add(productionPlan); }

    public int countById(String id){ return productionPlanMapper.countById(id); }

    public void update(ProductionPlan productionPlan){ productionPlanMapper.update(productionPlan); }
}
