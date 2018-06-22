package com.jdlink.controller;


import com.jdlink.domain.*;
import com.jdlink.service.CityService;
import com.jdlink.service.ContractService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
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
    CityService cityService;
    @RequestMapping("listContract")
    @ResponseBody
    public String listContract() {
        List<Contract> contractList = contractService.list();
        JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
        return array.toString();
    }
    /**
     *获得合同名称的下拉选项
     */

    @RequestMapping("getContractList")
    @ResponseBody
    public String getContractNameList() {
        JSONObject res = new JSONObject();
        JSONArray array1 = JSONArray.fromArray(ContractType.values());
        res.put("contractNameStrList", array1);
        JSONArray array2 = JSONArray.fromArray(Province.values());
        res.put("provinceStrList", array2);
        return res.toString();
    }

    /**
     *获得相应城市的下拉选项
     */

    @RequestMapping("getCityList")
    @ResponseBody
    public String getCityList( @RequestBody String provinceId) {
        System.out.println(provinceId);
        System.out.println("123");
        JSONObject res = new JSONObject();
       //根据provinceId找到相应的城市
//      List<City> city= cityService.getCity(provinceId);
//        for ( City c:city) {
//            System.out.print(c+" ");
//        }
        return res.toString();
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
