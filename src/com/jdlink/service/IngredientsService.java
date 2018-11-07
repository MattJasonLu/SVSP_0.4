package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface IngredientsService {

    ///入库单///
    int countInById(String id);
    IngredientsIn getInById(String id);
    void addIn(IngredientsIn ingredientsIn);
    List<IngredientsIn> listPageIn(Page page);
    int countIn();
    int searchInCount(IngredientsIn ingredientsIn);
    List<IngredientsIn> searchIn(IngredientsIn ingredientsIn);
    void invalidIn(IngredientsIn ingredientsIn);
    void updateIn(IngredientsIn ingredientsIn);
    void updateDataIn(IngredientsIn ingredientsIn);
    int getAmountItems(Ingredients ingredients);
    List<Ingredients> getIngredientsInItemByRange(Date startDate,Date endDate,Equipment equipment);
    int countInItem();
    int searchInItemCount(Ingredients ingredients);
    List<Ingredients> listPageInItem(Page page);
    List<Ingredients> searchInItem(Ingredients ingredients);


    /////领料单///////
    int countReceiveById(String id);
    IngredientsReceive getReceiveById(String id);
    void addReceive(IngredientsReceive ingredientsReceive);
    void addAllReceive(IngredientsReceive ingredientsReceive);
    List<IngredientsReceive> listPageReceive(Page page);
    int countReceive();
    int searchReceiveCount(IngredientsReceive ingredientsReceive);
    List<IngredientsReceive> searchReceive(IngredientsReceive ingredientsReceive);
    void invalidReceive(String id);
    void updateReceive(IngredientsReceive ingredientsReceive);
    Ingredients getAmountAndReceive(Ingredients ingredients);
    List<Ingredients> getInventoryList(Page page);
    int searchInventoryCount(Ingredients ingredients);
    int countInventory();
    List<Ingredients> searchInventory(Ingredients ingredients);
    void updateReceiveState(String id);
    Ingredients getInventoryByNameAndWare(Ingredients ingredients);
    int countReceiveItem();
    int searchReceiveItemCount(Ingredients ingredients);
    List<Ingredients> listPageReceiveItem(Page page);
    List<Ingredients> searchReceiveItem(Ingredients ingredients);


    ///出库单///
    int countOutById(String id);
    IngredientsOut getOutById(String id);
    void addOut(IngredientsOut ingredientsOut);
    List<IngredientsOut> listPageOut(Page page);
    int countOut();
    int searchOutCount(IngredientsOut ingredientsOut);
    List<IngredientsOut> searchOut(IngredientsOut ingredientsOut);
    void invalidOut(String id);
    void updateOut(IngredientsOut ingredientsOut);
    List<Ingredients> getIngredientsOutItemByRange(Date startDate, Date endDate,Equipment equipment);
    int countOutItem();
    int searchOutItemCount(Ingredients ingredients);
    List<Ingredients> listPageOutItem(Page page);
    List<Ingredients> searchOutItem(Ingredients ingredients);

}
