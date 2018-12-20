package com.jdlink.controller;

import com.jdlink.service.WarningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * 预警模块控制器
 */
@Controller
public class WarningController {
    @Autowired
    WarningService warningService;

}
