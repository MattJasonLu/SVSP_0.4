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
    public int countInById(String id) {
        return ingredientsMapper.countInById(id);
    }

    @Override
    public IngredientsIn getInById(String id) {
        return ingredientsMapper.getInById(id);
    }

    @Override
    public void addIn(IngredientsIn ingredientsIn) {
        ingredientsMapper.addIn(ingredientsIn);
    }

    @Override
    public List<IngredientsIn> listPageIn(Page page) {
        return ingredientsMapper.listPageIn(page);
    }

    @Override
    public int countIn() {
        return ingredientsMapper.countIn();
    }

    @Override
    public int searchInCount(IngredientsIn ingredientsIn) {
        return ingredientsMapper.searchInCount(ingredientsIn);
    }

    @Override
    public List<IngredientsIn> searchIn(IngredientsIn ingredientsIn) {
        return ingredientsMapper.searchIn(ingredientsIn);
    }

    @Override
    public void invalidIn(IngredientsIn ingredientsIn) {
        ingredientsMapper.invalidIn(ingredientsIn);
    }

    @Override
    public void updateIn(IngredientsIn ingredientsIn) {
        ingredientsMapper.updateIn(ingredientsIn);
    }

    /**
     * 修改入库单数据
     *
     * @param ingredientsIn
     */
    @Override
    public void updateDataIn(IngredientsIn ingredientsIn) {
        ingredientsMapper.updateDataIn(ingredientsIn);  // 更新入库单外部数据
        if (ingredientsIn.getIngredientsList() != null && ingredientsIn.getIngredientsList().size() > 0)
            for (Ingredients ingredients : ingredientsIn.getIngredientsList()) {
                if (ingredients.getSerialNumberA().equals("add")) {
                    ingredientsMapper.addIngredientsInItem(ingredients);// 如果是新增的物品则新增入库单明细条目
//                    if (ingredients.getAid().equals("notExist")) {// 仓库内该物品不存在则在库存新增该物品
//                        ingredientsMapper.addInventoryItem(ingredients);
//                    } else if (ingredients.getAid().equals("exist")) {// 仓库内存在该物品则叠加库存量
//                        ingredientsMapper.addInventoryAmount(ingredients);
//                    }
                } else if (ingredients.getSerialNumberA().equals("update")) {
                    ingredientsMapper.updateIngredientInItem(ingredients);//更新入库单条目数据
//                    if(!ingredients.getOldWareHouseName().equals(ingredients.getWareHouseName())){ // 如果仓库发生变化需要更新库存
//                        ingredientsMapper.reduceOldInventory(ingredients); // 删除旧库存
//                        if(ingredientsMapper.getAmountItems(ingredients) > 0) { // 如果新仓库中存在该物品则增加库存量
//                            ingredientsMapper.addInventoryAmount(ingredients);
//                        }else{                                                  // 新仓库不存在该物品则增加条目
//                            ingredientsMapper.addInventoryItem(ingredients);
//                        }
//                    }
                } else if (ingredients.getSerialNumberA().equals("del")) {
                    ingredientsMapper.delIngredientInItem(ingredients);// 删除入库单条目并将数据回退
                }
            }
    }

    @Override
    public int getAmountItems(Ingredients ingredients) {
        return ingredientsMapper.getAmountItems(ingredients);
    }

    @Override
    public void addInventoryItem(Ingredients ingredients) { ingredientsMapper.addInventoryItem(ingredients);}

    @Override
    public void deleteInventory() { ingredientsMapper.deleteInventory();}
    /**
     * 根据日期范围获取入库单
     *
     * @param startDate
     * @param endDate
     * @return
     */
    @Override
    public List<Ingredients> getIngredientsInItemByRange(Date startDate, Date endDate, Equipment equipment) {
        return ingredientsMapper.getIngredientsInItemByRange(startDate, endDate, equipment);
    }

    @Override
    public List<Ingredients> getIngredientsInItemAmountByRange(Date startDate,Date endDate) {
        return ingredientsMapper.getIngredientsInItemAmountByRange(startDate, endDate); }

    @Override
    public int countInItem() {
        return ingredientsMapper.countInItem();
    }

    @Override
    public int searchInItemCount(Ingredients ingredients) {
        return ingredientsMapper.searchInItemCount(ingredients);
    }

    @Override
    public List<Ingredients> listPageInItem(Page page) {
        return ingredientsMapper.listPageInItem(page);
    }

    @Override
    public List<Ingredients> searchInItem(Ingredients ingredients) {
        return ingredientsMapper.searchInItem(ingredients);
    }

    ///领料单///
    @Override
    public int countReceiveById(String id) {
        return ingredientsMapper.countReceiveById(id);
    }

    @Override
    public IngredientsReceive getReceiveById(String id) {
        return ingredientsMapper.getReceiveById(id);
    }

    @Override
    public void addReceive(IngredientsReceive ingredientsReceive) {
        ingredientsMapper.addReceive(ingredientsReceive);
    }

    @Override
    public void addAllReceive(IngredientsReceive ingredientsReceive) {
        ingredientsMapper.addAllReceive(ingredientsReceive);
    }

    @Override
    public List<IngredientsReceive> listPageReceive(Page page) {
        return ingredientsMapper.listPageReceive(page);
    }

    @Override
    public int countReceive() {
        return ingredientsMapper.countReceive();
    }

    @Override
    public int searchReceiveCount(IngredientsReceive ingredientsReceive) {
        return ingredientsMapper.searchReceiveCount(ingredientsReceive);
    }

    @Override
    public List<IngredientsReceive> searchReceive(IngredientsReceive ingredientsReceive) {
        return ingredientsMapper.searchReceive(ingredientsReceive);
    }

    @Override
    public void invalidReceive(IngredientsReceive ingredientsReceive) {
        ingredientsMapper.invalidReceive(ingredientsReceive);
    }

    @Override
    public void updateReceive(IngredientsReceive ingredientsReceive) {
        ingredientsMapper.updateReceive(ingredientsReceive);
    }

    @Override
    public void updateDataReceive(IngredientsReceive ingredientsReceive) {
        ingredientsMapper.updateDataReceive(ingredientsReceive);  // 修改领用单外部数据
        if(ingredientsReceive.getIngredientsList() != null && ingredientsReceive.getIngredientsList().size() > 0){
            for(Ingredients ingredients : ingredientsReceive.getIngredientsList()){
                if(ingredients.getSerialNumberA().equals("add")){
                    ingredientsMapper.addIngredientsReceiveItem(ingredients);// 新增领料单条目并更新库存
                }else if(ingredients.getSerialNumberA().equals("update")){
                    ingredientsMapper.updateIngredientsReceiveItem(ingredients);// 更新领料单条目数据
                    if(ingredients.getReceiveAmount() < ingredients.getOldReceiveAmount()){
                        ingredientsMapper.plusInventoryAmount(ingredients); // 如果领料数比以前少则需加回库存
                    }else if(ingredients.getReceiveAmount() > ingredients.getOldReceiveAmount()){
                        ingredientsMapper.reduceInventoryAmount(ingredients);// 如果领料数比以前多则需减少库存
                    }
                }else if(ingredients.getKeywords().equals("del")){
                    ingredientsMapper.delIngredientReceiveItem(ingredients);// 删除领料单条目并回退库存数据
                }
            }
        }
    }

    @Override
    public Ingredients getAmountAndReceive(Ingredients ingredients) {
        return ingredientsMapper.getAmountAndReceive(ingredients);
    }

    @Override
    public List<Ingredients> getInventoryList(Page page) {
        return ingredientsMapper.getInventoryList(page);
    }

    @Override
    public Ingredients getSumByIngredient(Ingredients ingredients) { return ingredientsMapper.getSumByIngredient(ingredients); }

    @Override
    public int searchInventoryCount(Ingredients ingredients) {
        return ingredientsMapper.searchInventoryCount(ingredients);
    }

    @Override
    public int countInventory() {
        return ingredientsMapper.countInventory();
    }

    @Override
    public List<Ingredients> searchInventory(Ingredients ingredients) {
        return ingredientsMapper.searchInventory(ingredients);
    }

    @Override
    public void updateReceiveState(String id) {
        ingredientsMapper.updateReceiveState(id);
    }

    @Override
    public Ingredients getInventoryByNameAndWare(Ingredients ingredients) {
        return ingredientsMapper.getInventoryByNameAndWare(ingredients);
    }

    @Override
    public int countReceiveItem() {
        return ingredientsMapper.countReceiveItem();
    }

    @Override
    public int searchReceiveItemCount(Ingredients ingredients) {
        return ingredientsMapper.searchReceiveItemCount(ingredients);
    }

    @Override
    public List<Ingredients> listPageReceiveItem(Page page) {
        return ingredientsMapper.listPageReceiveItem(page);
    }

    @Override
    public List<Ingredients> searchReceiveItem(Ingredients ingredients) {
        return ingredientsMapper.searchReceiveItem(ingredients);
    }

    ///出库单///
    @Override
    public int countOutById(String id) {
        return ingredientsMapper.countOutById(id);
    }

    @Override
    public IngredientsOut getOutById(String id) {
        return ingredientsMapper.getOutById(id);
    }

    @Override
    public void addOut(IngredientsOut ingredientsOut) {
        ingredientsMapper.addOut(ingredientsOut);
    }

    @Override
    public List<IngredientsOut> listPageOut(Page page) {
        return ingredientsMapper.listPageOut(page);
    }

    @Override
    public int countOut() {
        return ingredientsMapper.countOut();
    }

    @Override
    public int searchOutCount(IngredientsOut ingredientsOut) {
        return ingredientsMapper.searchOutCount(ingredientsOut);
    }

    @Override
    public List<IngredientsOut> searchOut(IngredientsOut ingredientsOut) {
        return ingredientsMapper.searchOut(ingredientsOut);
    }

    @Override
    public void invalidOut(IngredientsOut ingredientsOut) {
        ingredientsMapper.invalidOut(ingredientsOut);
    }

    @Override
    public void updateOut(IngredientsOut ingredientsOut) {
        ingredientsMapper.updateOut(ingredientsOut);
    }

    @Override
    public void updateDataOut(IngredientsOut ingredientsOut) {
        ingredientsMapper.updateDataOut(ingredientsOut);// 更新出库单外部数据
        if(ingredientsOut.getIngredientsList() != null && ingredientsOut.getIngredientsList().size() > 0){
            for(Ingredients ingredients : ingredientsOut.getIngredientsList()){
                if(ingredients.getSerialNumberA().equals("add")){
                    ingredientsMapper.addIngredientsOutItem(ingredients); // 新增出库单条目并更新领料单状态
                }else if(ingredients.getSerialNumberA().equals("update")){
                    ingredientsMapper.updateIngredientsOutItem(ingredients); // 更新出库单条目数据
                }else if(ingredients.getSerialNumberA().equals("del")){
                    ingredientsMapper.delIngredientsOutItem(ingredients); // 删除出库单条目并更新领料单状态及其条目状态
                }
            }
        }
    }

    /**
     * 根据日期范围获取出库单
     *
     * @param startDate
     * @param endDate
     * @return
     */
    @Override
    public List<Ingredients> getIngredientsOutItemByRange(Date startDate, Date endDate, Equipment equipment) {
        return ingredientsMapper.getIngredientsOutItemByRange(startDate, endDate, equipment);
    }

    @Override
    public List<Ingredients> getIngredientsOutItemAmountByRange(Date startDate, Date endDate) { return ingredientsMapper.getIngredientsOutItemAmountByRange(startDate, endDate); }

    @Override
    public int countOutItem() {
        return ingredientsMapper.countOutItem();
    }

    @Override
    public int searchOutItemCount(Ingredients ingredients) {
        return ingredientsMapper.searchOutItemCount(ingredients);
    }

    @Override
    public List<Ingredients> listPageOutItem(Page page) {
        return ingredientsMapper.listPageOutItem(page);
    }

    @Override
    public List<Ingredients> searchOutItem(Ingredients ingredients) {
        return ingredientsMapper.searchOutItem(ingredients);
    }

    /**
     * 结账功能
     * @param ingredientsOut
     */
    @Override
    public void outSettled(IngredientsOut ingredientsOut) { ingredientsMapper.outSettled(ingredientsOut);}

    /**
     * 获取结账的出库单的年月份集合
     * @return
     */
    @Override
    public List<String> getDateBbySettled() { return ingredientsMapper.getDateBbySettled(); }

    ////////////辅料备件物品维护//
    public List<Ingredients> getIngredientsList(Page page) { return ingredientsMapper.getIngredientsList(page);}

    public int getCountIngredientsList() { return ingredientsMapper.getCountIngredientsList();}

    public Ingredients getIngredientByNameAndSpecification(Ingredients ingredients) { return ingredientsMapper.getIngredientByNameAndSpecification(ingredients);}

    public Ingredients getIngredientById(int id){  return ingredientsMapper.getIngredientById(id); }

    public void addIngredient(Ingredients ingredients) { ingredientsMapper.addIngredient(ingredients);}

    public void updateIngredient(Ingredients ingredients) { ingredientsMapper.updateIngredient(ingredients);}

    public void deleteIngredient(int id) { ingredientsMapper.deleteIngredient(id);}

    public List<Ingredients> searchIngredient(Ingredients ingredients) { return ingredientsMapper.searchIngredient(ingredients); }

    public int searchCountIngredient(Ingredients ingredients) { return ingredientsMapper.searchCountIngredient(ingredients); }

    public int getCountByCode(String code) { return ingredientsMapper.getCountByCode(code); }

    public int getCountByType(String type) { return ingredientsMapper.getCountByType(type); }


}
