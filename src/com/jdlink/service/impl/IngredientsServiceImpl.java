package com.jdlink.service.impl;


import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.IngredientsIn;
import com.jdlink.mapper.IngredientsMapper;
import com.jdlink.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
