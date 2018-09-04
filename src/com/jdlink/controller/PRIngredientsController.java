package com.jdlink.controller;

import com.jdlink.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class PRIngredientsController {

    @Autowired
    IngredientsService ingredientsService;


}
