package com.jdlink.controller;

import com.jdlink.domain.Contract;
import com.jdlink.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * Created by matt on 2018/5/18.
 */
@Controller
public class ContractController {

    @Autowired
    ContractService contractService;

    @RequestMapping("listContract")
    public ModelAndView listContract() {
        ModelAndView mav = new ModelAndView();
        List<Contract> contractList = contractService.list();
        mav.addObject("contractList", contractList);
        mav.setViewName("contract");
        return mav;
    }

    @RequestMapping("addContract")
    public ModelAndView addContract() {
        ModelAndView mav = new ModelAndView();

        return mav;
    }

    @RequestMapping("deleteContract")
    public ModelAndView deleteContract(String contractId) {
        ModelAndView mav = new ModelAndView();

        return mav;
    }

    public ModelAndView showContract(String contractId) {
        ModelAndView mav = new ModelAndView();

        return mav;
    }
}
