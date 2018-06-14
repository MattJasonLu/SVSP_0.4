package com.jdlink.controller;


import com.jdlink.domain.Contract;
import com.jdlink.service.ContractService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
    @ResponseBody
    public String listContract() {
        List<Contract> contractList = contractService.list();
        JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
        // 返回结果
        //System.out.println(array.toString());

        return array.toString();
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
