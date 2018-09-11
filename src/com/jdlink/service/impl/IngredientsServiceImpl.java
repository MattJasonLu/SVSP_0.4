package com.jdlink.service.impl;


import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.mapper.IngredientsMapper;
import com.jdlink.service.IngredientsService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class IngredientsServiceImpl implements IngredientsService {


    @Autowired
    IngredientsMapper ingredientsMapper;


    ///入库单///
    @Override
    public int countInById(String id){ return ingredientsMapper.countInById(id); }

    @Override
    public IngredientsIn getInById(String id){ return ingredientsMapper.getInById(id); }

    @Override
    public void addIn(IngredientsIn ingredientsIn){ ingredientsMapper.addIn(ingredientsIn); }

    @Override
    public List<IngredientsIn> listPageIn(Page page){ return ingredientsMapper.listPageIn(page); }

    @Override
    public int countIn(){ return ingredientsMapper.countIn(); }

    @Override
    public int searchInCount(IngredientsIn ingredientsIn){ return ingredientsMapper.searchInCount(ingredientsIn); }

    @Override
    public List<IngredientsIn> searchIn(IngredientsIn ingredientsIn){ return ingredientsMapper.searchIn(ingredientsIn); }

    @Override
    public void invalidIn(String id){ ingredientsMapper.invalidIn(id); }

    @Override
    public void updateIn(IngredientsIn ingredientsIn){ ingredientsMapper.updateIn(ingredientsIn); }

    @Override
    public int getAmountItems(Ingredients ingredients){ return ingredientsMapper.getAmountItems(ingredients); }

    /**
     * 根据日期范围获取入库单
     * @param startDate
     * @param endDate
     * @return
     */
    @Override
    public List<IngredientsIn> getIngredientsInItemByRange(Date startDate,Date endDate,Equipment equipment){ return ingredientsMapper.getIngredientsInItemByRange(startDate,endDate,equipment); }

    ///领料单///
    @Override
    public int countReceiveById(String id){ return ingredientsMapper.countReceiveById(id); }

    @Override
    public IngredientsReceive getReceiveById(String id){ return ingredientsMapper.getReceiveById(id); }

    @Override
    public void addReceive(IngredientsReceive ingredientsReceive){ ingredientsMapper.addReceive(ingredientsReceive); }

    @Override
    public void addAllReceive(IngredientsReceive ingredientsReceive){ ingredientsMapper.addAllReceive(ingredientsReceive); }

    @Override
    public List<IngredientsReceive> listPageReceive(Page page){ return ingredientsMapper.listPageReceive(page); }

    @Override
    public int countReceive(){ return ingredientsMapper.countReceive(); }

    @Override
    public int searchReceiveCount(IngredientsReceive ingredientsReceive){ return ingredientsMapper.searchReceiveCount(ingredientsReceive); }

    @Override
    public List<IngredientsReceive> searchReceive(IngredientsReceive ingredientsReceive){ return ingredientsMapper.searchReceive(ingredientsReceive); }

    @Override
    public void invalidReceive(String id){ ingredientsMapper.invalidReceive(id); }

    @Override
    public void updateReceive(IngredientsReceive ingredientsReceive){ ingredientsMapper.updateReceive(ingredientsReceive); }

    @Override
    public List<Ingredients> getAmountAndReceive(Ingredients ingredients){ return ingredientsMapper.getAmountAndReceive(ingredients); }

    @Override
    public List<Ingredients> getInventoryList(){ return ingredientsMapper.getInventoryList(); }

    @Override
    public  List<Ingredients> searchInventory(Ingredients ingredients){ return ingredientsMapper.searchInventory(ingredients); }

    @Override
    public void updateReceiveState(String id){ ingredientsMapper.updateReceiveState(id); }

    @Override
    public Ingredients getInventoryByNameAndWare(Ingredients ingredients){ return ingredientsMapper.getInventoryByNameAndWare(ingredients); }

    ///出库单///
    @Override
    public int countOutById(String id){ return ingredientsMapper.countOutById(id); }

    @Override
    public IngredientsOut getOutById(String id){ return ingredientsMapper.getOutById(id); }

    @Override
    public void addOut(IngredientsOut ingredientsOut){ ingredientsMapper.addOut(ingredientsOut); }

    @Override
    public List<IngredientsOut> listPageOut(Page page){ return ingredientsMapper.listPageOut(page); }

    @Override
    public int countOut(){ return ingredientsMapper.countOut(); }

    @Override
    public int searchOutCount(IngredientsOut ingredientsOut){ return ingredientsMapper.searchOutCount(ingredientsOut); }

    @Override
    public List<IngredientsOut> searchOut(IngredientsOut ingredientsOut){ return ingredientsMapper.searchOut(ingredientsOut); }

    @Override
    public void invalidOut(String id){ ingredientsMapper.invalidOut(id); }

    @Override
    public void updateOut(IngredientsOut ingredientsOut){ ingredientsMapper.updateOut(ingredientsOut); }

    /**
     * 根据日期范围获取出库单
     * @param startDate
     * @param endDate
     * @return
     */
    @Override
    public List<IngredientsOut> getIngredientsOutItemByRange(Date startDate, Date endDate,Equipment equipment){ return ingredientsMapper.getIngredientsOutItemByRange(startDate,endDate,equipment); }

}
