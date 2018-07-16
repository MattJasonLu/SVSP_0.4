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
import java.util.HashSet;
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
     * 根据合同显示列表
     */
    @RequestMapping("listContractByName")
    @ResponseBody
    public String listContractByName(String name) {
        List<Contract> contractList = contractService.list1(name);
        JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
        return array.toString();
    }
@RequestMapping("saveEmContract")
@ResponseBody
public String saveEmContract(@RequestBody Contract contract){
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
        JSONObject res=JSONObject.fromBean(contract);
        contract.setCheckState(CheckState.ToSubmit);//待提交
        contract.setContractType(ContractType.Emergency);//设为应急合同
        contractService.addEm(contract);
        System.out.println(res);
     return res.toString();
}

    /**
     *获得合同名称的下拉选项
     */

    @RequestMapping("getContractList")
    @ResponseBody
    public String getContractNameList(String key) {
        JSONObject res = new JSONObject();
        JSONArray array1 = JSONArray.fromArray(ContractType.values());
        res.put("contractNameStrList", array1);
        JSONArray array2 = JSONArray.fromArray(Province.values());
        res.put("provinceStrList", array2);
        JSONArray array3 = JSONArray.fromArray(TicketRate1.values());
        res.put("ticketRateStrList1", array3);
        JSONArray array4 = JSONArray.fromArray(TicketRate2.values());
        res.put("ticketRateStrList2", array4);
        //查询客户list形式返回
              List client= clientService.list();
              JSONArray json=JSONArray.fromObject(client);
              res.put("companyNameList",json);
              //查询模板名称
        List modelName=contractService.modelName(key);
        List list1=  removeDuplicate(modelName);
       // HashSet h= new  HashSet(modelName);
       // modelName.clear();
       // modelName.addAll(h);
       // System.out.println(modelName);
        JSONArray json1=JSONArray.fromObject(list1);
        res.put("modelNameList",json1);
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
        System.out.println(provinceId);
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
        if(list.size()<=0){
           contract.setContractId("1");
        }
        if(list.size()>0) {
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
        }
        System.out.println("当前合同编号:"+contract.getContractId());
        contract.setCheckState(CheckState.ToSubmit);
        JSONObject res = JSONObject.fromBean(contract);
        System.out.println(res.toString());

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
    contract.setCheckState(CheckState.ToExamine);
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
    @RequestMapping("Secondary")
    @ResponseBody
    public ModelAndView Secondary(String contractId) {
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract contract=contractService.getByContractId(contractId);//获得相应的合同对象
        mav.addObject("contract", contract);
        mav.setViewName("jsp/secondary.jsp");
        return mav;
    }
    @RequestMapping("emergency")
    @ResponseBody
    public ModelAndView emergency(String contractId) {
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract emergency=contractService.getByContractId(contractId);//获得相应的合同对象
        mav.addObject("emergency",emergency);
        mav.setViewName("jsp/emergency.jsp");
        return mav;
    }
    @RequestMapping("emergency1")
    @ResponseBody
    public ModelAndView emergency1(String contractId) {
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract emergency=contractService.getByContractId(contractId);//获得相应的合同对象
        mav.addObject("emergency",emergency);
        mav.setViewName("jsp/emergency1.jsp");
        return mav;
    }
    @RequestMapping("logistics")
    @ResponseBody
    public ModelAndView logistics(String contractId) {
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract contract=contractService.getByContractId(contractId);//获得相应的合同对象
        mav.addObject("contract", contract);
        mav.setViewName("jsp/logistics.jsp");
        return mav;
    }
    @RequestMapping("showModel")
    @ResponseBody
    public ModelAndView showModel(String modelName) {
        System.out.println(modelName);
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract model=contractService.getModel(modelName);//获得相应的合同对象
        mav.addObject("model", model);
        mav.setViewName("jsp/model.jsp");
        return mav;
    }

    @RequestMapping("saveAdjustContract")
    @ResponseBody
    public String saveAdjustContract(@RequestBody Contract  contract) {
       //contract.setCheckState(CheckState.ToSubmit);//设置状态
       JSONObject res= JSONObject.fromBean(contract);
        //System.out.println("123"+contract.getContractId());
        //给予合同的状态
        try{
            contractService.update(contract);
            res.put("status", "success");
            res.put("message", "添加成功");
        }
        catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "创建合同失败，请完善信息!");
        }
        return res.toString();
    }
    @RequestMapping("getContractBymodelName")
    @ResponseBody
    public String getContractBymodelName(String contractId){
        Contract modelContract=contractService.getModel(contractId);
        JSONObject res=JSONObject.fromBean(modelContract);
        JSONArray array1 = JSONArray.fromArray(ContractType.values());
        res.put("contractNameStrList", array1);
        return res.toString();
    }

    @RequestMapping("isF")
    @ResponseBody
    public  String is(String isFreight,String id){
        System.out.println(isFreight+id);
        JSONObject res=new JSONObject();
        if(isFreight.equals("true")){
            contractService.updateFreight1(id);
        }

        if(isFreight.equals("false")){
            contractService.updateFreight2(id);
        }
        return res.toString();
    }
    @RequestMapping("saveAdjustEmContract")
    @ResponseBody
    public  String saveAdjustEmContract(@RequestBody Contract contract){
        JSONObject res= JSONObject.fromBean(contract);
        System.out.println(res+"AAA" );
        try{
            contractService.updateEm(contract);
            res.put("status", "success");
            res.put("message", "添加成功");
        }
        catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "创建合同失败，请完善信息!");
        }
        return res.toString();

    }
    /**
     *
     * 合同作废
     */
    @RequestMapping("cancelContract")
    @ResponseBody
    public String cancelContract(String contractId){
       JSONObject res=new JSONObject();
       try {
           contractService.cancel(contractId);
           res.put("state","success");
       }
       catch (Exception e){
           res.put("state","fail");
       }
     return res.toString();
    }
    /**
     *
     * 合同模板作废
     */
    @RequestMapping("cancelModel")
    @ResponseBody
    public String cancelModel(String contractId){
        JSONObject res=new JSONObject();
        try {
            contractService.cancel1(contractId);
            res.put("state","success");
        }
        catch (Exception e){
            res.put("state","fail");
        }
        return res.toString();
    }

    /**
     *
     *驳回功能
     */
    @RequestMapping("backContract")
    @ResponseBody
    public  String backContract(String contractId){
        JSONObject res=new JSONObject();
     try{
         contractService.back(contractId);
         res.put("state","success");
     }
     catch (Exception e){
         res.put("state","fail");
     }
        return res.toString();
    }
    /**
     *
     * 合同审批
     */
    @RequestMapping("approvalContract")
    @ResponseBody
    public String approvalContract(String contractId){
        JSONObject res=new JSONObject();
        try {
            contractService.approval(contractId);
            res.put("state","success");
        }
        catch (Exception e){
            res.put("state","fail");
        }
        return res.toString();
        }


    public static List removeDuplicate(List list){
        List listTemp = new ArrayList();
        for(int i=0;i<list.size();i++){
            if(!listTemp.contains(list.get(i))){
                listTemp.add(list.get(i));
            }
        }
        return listTemp;
    }
}


