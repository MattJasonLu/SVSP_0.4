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
    List<Ingredients> getIngredientsInItemAmountByRange(Date startDate,Date endDate);
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
    void invalidReceive(IngredientsReceive ingredientsReceive);
    void updateReceive(IngredientsReceive ingredientsReceive);
    void updateDataReceive(IngredientsReceive ingredientsReceive);
    Ingredients getAmountAndReceive(Ingredients ingredients);
    List<Ingredients> getInventoryList(Page page);
    Ingredients getSumByIngredient(Ingredients ingredients);
    int searchInventoryCount(Ingredients ingredients);
    int countInventory();
    List<Ingredients> searchInventory(Ingredients ingredients);
    void updateReceiveState(String id);
    Ingredients getInventoryByNameAndWare(Ingredients ingredients);
    int countReceiveItem();
    int searchReceiveItemCount(Ingredients ingredients);
    List<Ingredients> listPageReceiveItem(Page page);
    List<Ingredients> searchReceiveItem(Ingredients ingredients);
    void addInventoryItem(Ingredients ingredients);
    void deleteInventory();
    ///出库单///
    int countOutById(String id);
    IngredientsOut getOutById(String id);
    void addOut(IngredientsOut ingredientsOut);
    List<IngredientsOut> listPageOut(Page page);
    int countOut();
    int searchOutCount(IngredientsOut ingredientsOut);
    List<IngredientsOut> searchOut(IngredientsOut ingredientsOut);
    void invalidOut(IngredientsOut ingredientsOut);
    void updateOut(IngredientsOut ingredientsOut);
    void updateDataOut(IngredientsOut ingredientsOut);
    List<Ingredients> getIngredientsOutItemByRange(Date startDate, Date endDate,Equipment equipment);
    List<Ingredients> getIngredientsOutItemAmountByRange(Date startDate, Date endDate);
    int countOutItem();
    int searchOutItemCount(Ingredients ingredients);
    List<Ingredients> listPageOutItem(Page page);
    List<Ingredients> searchOutItem(Ingredients ingredients);
    void outSettled(IngredientsOut ingredientsOut);
    List<String> getDateBbySettled();

    ////////////辅料备件物品维护//
    List<Ingredients> getIngredientsList(Page page);

    int getCountIngredientsList();

    Ingredients getIngredientByNameAndSpecification(Ingredients ingredients);

    Ingredients getIngredientById(int id);

    void addIngredient(Ingredients ingredients);

    void updateIngredient(Ingredients ingredients);

    void updateCodeByIngredient(Ingredients ingredients);

    void deleteIngredient(int id);

    List<Ingredients> searchIngredient(Ingredients ingredients);

    int searchCountIngredient(Ingredients ingredients);

    int getCountByCode(String code);

    int getCountByType(String type);

    ///////////////////辅料备件管理树状结构///////
    void addIngredientsTree(IngredientsTree ingredientsTree);

    void updateIngredientTree(IngredientsTree ingredientsTree);

    int maxByPId(int pId);

    int countTreeByPId(int pId);

    List<IngredientsTree> listIngredientsTree();

    IngredientsTree getIngredientsTreeById(int id);

    void updatePartIngredientTreeBuId(IngredientsTree ingredientsTree);

    void deleteById(int id);

    List<IngredientsTree> getChildrenIngredientsTreeById(int id);

}
