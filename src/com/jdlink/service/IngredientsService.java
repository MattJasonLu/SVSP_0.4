package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Ingredients;
import com.jdlink.domain.Produce.IngredientsIn;
import com.jdlink.domain.Produce.IngredientsOut;
import com.jdlink.domain.Produce.IngredientsReceive;

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
    void invalidIn(String id);
    void updateIn(IngredientsIn ingredientsIn);

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
    List<Ingredients> getAmountAndReceive(Ingredients ingredients);

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
}
