package com.jdlink.controller;

import com.jdlink.service.WarningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class WarningController {
    @Autowired
    WarningService warningService;

}
