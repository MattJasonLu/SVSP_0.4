package com.jdlink.service.impl;


import com.jdlink.mapper.IngredientsMapper;
import com.jdlink.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IngredientsServiceImpl implements IngredientsService {


    @Autowired
    IngredientsMapper ingredientsMapper;
}
