package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface IngredientsMapper {
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

    /**
     * 修改入库单外部数据
     * @param ingredientsIn
     */
    void updateDataIn(IngredientsIn ingredientsIn);

    /**
     * 新增库存物品
     * @param ingredients
     */
    void addInventoryItem(Ingredients ingredients);

    /**
     * 增加库存数量
     * @param ingredients
     */
    void addInventoryAmount(Ingredients ingredients);

    /**
     * 新增入库单库存条目并改变采购单条目状态为ToPick
     * @param ingredients
     */
    void addIngredientsInItem(Ingredients ingredients);

    /**
     * 更新入库单条目数据
     * @param ingredients
     */
    void updateIngredientInItem(Ingredients ingredients);

    /**
     * 删除入库单条目并更新采购单条目状态为ToInbound及更新库存数量
     * @param ingredients
     */
    void delIngredientInItem(Ingredients ingredients);

    /**
     * 删除旧库存
     * @param ingredients
     */
    void reduceOldInventory(Ingredients ingredients);

    List<Ingredients> getIngredientsInItemByRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("equipment")Equipment equipment);
    /**
     * 用于判断库存表中该物品在某仓库中是否存在库存
     * @param ingredients
     * @return
     */
    int getAmountItems(Ingredients ingredients);
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

    /**
     * 更新领料单外部数据
     * @param ingredientsReceive
     */
    void updateDataReceive(IngredientsReceive ingredientsReceive);

    /**
     * 增加领料单条目并更新库存数据
     * @param ingredients
     */
    void addIngredientsReceiveItem(Ingredients ingredients);
    /**
     * 更新领料单条目数据
     * @param ingredients
     */
    void updateIngredientsReceiveItem(Ingredients ingredients);
    /**
     * 增加库存数
     * @param ingredients
     */
    void plusInventoryAmount(Ingredients ingredients);
    /**
     * 减少库存数
     * @param ingredients
     */
    void reduceInventoryAmount(Ingredients ingredients);
    /**
     * 删除领料单条目并更新库存数据
     * @param ingredients
     */
    void delIngredientReceiveItem(Ingredients ingredients);

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
    void invalidOut(IngredientsOut ingredientsOut);
    void updateOut(IngredientsOut ingredientsOut);

    /**
     * 更新出库单外部数据
     * @param ingredientsOut
     */
    void updateDataOut(IngredientsOut ingredientsOut);

    /**
     *  新增出库单条目
     * @param ingredients
     */
    void addIngredientsOutItem(Ingredients ingredients);
    /**
     * 更新出库单条目数据
     * @param ingredients
     */
    void updateIngredientsOutItem(Ingredients ingredients);

    /**
     * 删除出库单条目
     * @param ingredients
     */
    void delIngredientsOutItem(Ingredients ingredients);

    List<Ingredients> getIngredientsOutItemByRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("equipment")Equipment equipment);
    int countOutItem();
    int searchOutItemCount(Ingredients ingredients);
    List<Ingredients> listPageOutItem(Page page);
    List<Ingredients> searchOutItem(Ingredients ingredients);

    ////////////辅料备件物品维护//
    List<Ingredients> getIngredientsList(Page page);

    int getCountIngredientsList();

    Ingredients getIngredientByNameAndSpecification(Ingredients ingredients);

    Ingredients getIngredientById(int id);

    void addIngredient(Ingredients ingredients);

    void updateIngredient(Ingredients ingredients);

    void deleteIngredient(int id);

    List<Ingredients> searchIngredient(Ingredients ingredients);

    int searchCountIngredient(Ingredients ingredients);

}
