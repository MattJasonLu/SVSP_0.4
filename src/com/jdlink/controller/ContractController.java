package com.jdlink.controller;


import com.jdlink.domain.*;
import com.jdlink.service.CityService;
import com.jdlink.service.ClientService;
import com.jdlink.service.ContractService;
import com.sun.script.javascript.JSAdapter;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by matt on 2018/5/18.
 */
@Controller
public class ContractController {
    @Autowired
    CityService cityService;
    @Autowired
    ContractService contractService;
    @Autowired
    ClientService clientService;
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
        //查询客户list形式返回
              List client= clientService.list();
              JSONArray json=JSONArray.fromObject(client);
              res.put("companyNameList",json);
        return res.toString();
    }

    /**
     *获得相应城市的下拉选项
     */


    @RequestMapping("getCityList")
    @ResponseBody
    public String getCityList(String provinceId) {
        //System.out.println(provinceId instanceof String);
        //JSONObject res = new JSONObject();
       //根据provinceId找到相应的城市
      List<City> city= cityService.getCity(provinceId);
        JSONArray json=JSONArray.fromObject(city);
        return json.toString();
    }
    @RequestMapping("addContract")
    @ResponseBody
    public String addContract(@RequestBody Contract contract) {
        JSONObject res = new JSONObject();
        try {
            contractService.add(contract);
            res.put("status", "success");
            res.put("message", "保存成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "信息输入错误，请重试!");
        }
        return res.toString();
    }

    /**
     *保存合同
     */
    @RequestMapping("saveContract")
    @ResponseBody
    public String  saveContract(@RequestBody Contract contract) {
        //1.获取合同ID
        List<String> list= contractService.getContractIdList();//合同id集合
        List<Integer> list1 = new ArrayList<>();
        for (String s:list
             ) {
           int i=Integer.parseInt(s);
           list1.add(i);
        }
        Collections.sort(list1);
        for (Integer s1:list1
                ) {
            //System.out.println(s1);
        }
        String newId= String.valueOf((list1.get(list1.size()-1)+1)) ;//当前编号
        contract.setContractId(newId);
        System.out.println("当前合同编号:"+contract.getContractId());
        contract.setCheckState(CheckState.ToSubmit);
        JSONObject res = JSONObject.fromBean(contract);
       //给予合同的状态
        try{
            contractService.add(contract);
            res.put("status", "success");
            res.put("message", "添加成功");
        }
        catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "创建合同失败，请完善信息!");
        }
        return  res.toString();
    }

@RequestMapping("submitContract")
@ResponseBody
public String  submitContract(@RequestBody Contract contract) {
    //1.获取合同ID
    List<String> list= contractService.getContractIdList();//合同id集合
    List<Integer> list1 = new ArrayList<>();
    for (String s:list
            ) {
        int i=Integer.parseInt(s);
        list1.add(i);
    }
    Collections.sort(list1);
    for (Integer s1:list1
            ) {
        //System.out.println(s1);
    }
    String newId= String.valueOf((list1.get(list1.size()-1)+1)) ;//当前编号
    contract.setContractId(newId);
    System.out.println("当前合同编号:"+contract.getContractId());
    contract.setCheckState(CheckState.Examining);
    JSONObject res = JSONObject.fromBean(contract);
    //给予合同的状态
    try{
        contractService.add(contract);
        res.put("status", "success");
        res.put("message", "提交成功");
    }
    catch (Exception e) {
        e.printStackTrace();
        res.put("status", "fail");
        res.put("message", "提交合同失败，请完善信息!");
    }
    return  res.toString();
}

@RequestMapping("submitContract1")
@ResponseBody
public String  submitContract1( String id) {
//1修改状态
JSONObject res=new JSONObject();
contractService.toSubmit(id);
res.put("state","提交成功");
return  res.toString();
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
    @RequestMapping("getContractId")
    @ResponseBody
    public String getContractId(String contractId) {
       Contract contract=contractService.getByContractId(contractId);
        JSONObject res= JSONObject.fromBean(contract);
        return res.toString();
    }
    @RequestMapping("showContract")
    @ResponseBody
    public ModelAndView showClient(String contractId) {
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract contract=contractService.getByContractId(contractId);//获得相应的合同对象

        mav.addObject("contract", contract);
        mav.setViewName("jsp/showContract.jsp");
        return mav;
    }
}
