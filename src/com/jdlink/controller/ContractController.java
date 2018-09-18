package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.domain.Produce.WayBillItem;
import com.jdlink.service.*;
import com.jdlink.util.RandomUtil;
import com.jdlink.util.UpdateVersion;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.jdlink.util.DateUtil.getDateStr;

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
    @Autowired
    SupplierService supplierService;
    @Autowired
    LaboratoryTestService laboratoryTestService;
    @Autowired
    WayBillService wayBillService;

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
    /**
     * 根据合同和状态显示列表
     */
    @RequestMapping("listContractByName1")
    @ResponseBody
    public String listContractByName1(String name,String index) {
        if(CheckState.get(Integer.parseInt(index))==null){
            List<Contract> contractList = contractService.list1(name);
            JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            return array.toString();
        }
        else {
            String state=CheckState.get(Integer.parseInt(index)).toString();
            List<Contract> contractList = contractService.list2(name,state);
            JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            return array.toString();
        }
    }
    @RequestMapping("saveEmContract")
    @ResponseBody
    public String saveEmContract(@RequestBody Contract contract){
        System.out.println(JSONObject.fromBean(contract).toString());
    //    JSONObject res=JSONObject.fromBean(contract);
    //    System.out.println(res.toString()+"PPP");
    //    List<Hazardous> Hazardous=  contract.getHazardous();
    //    System.out.println(Hazardous+"132");
        JSONObject res = new JSONObject();
      //  1.获取合同ID
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
           contract.setContractId(newId);//设置个合同的ID
           contract.setCheckState(CheckState.ToSubmit);//待提交
           contract.setContractType(ContractType.Emergency);//设为应急合同
        // 设置每个危废的编码,唯一
        for (Hazardous hazardous : contract.getHazardousList()) {
            hazardous.setId(RandomUtil.getRandomEightNumber());
            System.out.println(JSONObject.fromBean(hazardous).toString());
        }
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat  SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime=SimpleDateFormat.format(current_date);
        contract.setNowTime(nowTime);
        try{
            contractService.addEm(contract);
            res.put("state","success");
        }
        catch (Exception e){
            res.put("state","fail");
        }
         return res.toString();
    }
    /**
     * 提交应急合同
     */
    @RequestMapping("submitEmContract")
    @ResponseBody
    public String submitEmContract(@RequestBody Contract contract) {
        JSONObject res = new JSONObject();
        //  1.获取合同ID
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
        contract.setContractId(newId);//设置个合同的ID
        contract.setCheckState(CheckState.Examining);//待提交
        contract.setContractType(ContractType.Emergency);//设为应急合同
        // 设置每个危废的编码,唯一
        for (Hazardous hazardous : contract.getHazardousList()) {
            hazardous.setId(RandomUtil.getRandomEightNumber());
            System.out.println(JSONObject.fromBean(hazardous).toString());
        }
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat  SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime=SimpleDateFormat.format(current_date);
        contract.setNowTime(nowTime);
        try{
            contractService.addEm(contract);
            res.put("state","success");
        }
        catch (Exception e){
            res.put("state","fail");
        }
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
//        JSONArray array4 = JSONArray.fromArray(TicketRate2.values());
//        res.put("ticketRateStrList2", array4);
        //查询客户list形式返回
              List client= clientService.list();
              JSONArray json=JSONArray.fromObject(client);
              res.put("companyNameList",json);
        //查询供应闪list形式返回
        List supplier=supplierService.list();
        JSONArray json2=JSONArray.fromObject(supplier);
        res.put("supplierNameList",json2);
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
        JSONObject res1=new JSONObject();
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
        contract.setCheckState(CheckState.ToSubmit);//设置为待提交
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat  SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime=SimpleDateFormat.format(current_date);
        contract.setNowTime(nowTime);
        System.out.println(nowTime+"fff");
        //System.out.println(contract.getModelName()+"BBB");
        if(contract.getModelName()!=null){
            contract.setModelVersion("V1.0");
            System.out.println(contract.getModelVersion()+"CCC");
        }
        JSONObject res = JSONObject.fromBean(contract);
        //给予合同的状态
        try{
            contractService.add(contract);
            res1.put("status", "success");
            res1.put("message", "添加成功");
        }
        catch (Exception e) {
            e.printStackTrace();
            res1.put("status", "fail");
            res1.put("message", "创建合同失败，请完善信息!");
        }
        return  res1.toString();
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
        contract.setCheckState(CheckState.ToExamine);//待审核
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat  SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime=SimpleDateFormat.format(current_date);
        contract.setNowTime(nowTime);
        // 通过客户名称搜索到客户id
        String companyName = contract.getCompany1();
        Client client = clientService.getByName(companyName);
        if (client != null) contract.setClientId(client.getClientId());
        // 将合同对象做成json
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
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat  SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime=SimpleDateFormat.format(current_date);
        Contract contract=contractService.getByContractId(id);
        //contract.setNowTime(nowTime);
        contractService.toSubmit(id);
      res.put("state","提交成功");
      return  res.toString();
    }

    @RequestMapping("deleteContract")
    public ModelAndView deleteContract(String contractId) {
        ModelAndView mav = new ModelAndView();
        return mav;
    }

    @RequestMapping("getContractId")
    @ResponseBody
    public String getContractId(String contractId) {
        Date date=new Date();
        System.out.println(date+"eee");
        Contract contract=contractService.getByContractId(contractId);
        JSONObject res= JSONObject.fromBean(contract);
        return res.toString();
    }

    @RequestMapping("getContractId1")
    @ResponseBody
    public String getContractId1(String contractId,String key) {
        JSONObject res = new JSONObject();
        JSONArray array1 = JSONArray.fromArray(ContractType.values());
        res.put("contractNameStrList", array1);
        JSONArray array2 = JSONArray.fromArray(Province.values());
        res.put("provinceStrList", array2);
        JSONArray array3 = JSONArray.fromArray(TicketRate1.values());
        res.put("ticketRateStrList1", array3);
        //查询客户list形式返回
        List client= clientService.list();
        JSONArray json=JSONArray.fromObject(client);
        res.put("companyNameList",json);

        List supplier=supplierService.list();
        JSONArray json3=JSONArray.fromObject(supplier);
        res.put("supplierNameList",json3);
        //查询模板名称
        List modelName=contractService.modelName(key);
        List list1=  removeDuplicate(modelName);
        JSONArray json1=JSONArray.fromObject(list1);
        res.put("modelNameList",json1);
        //查询合同
        Contract contract=contractService.getByContractId(contractId);
        JSONObject json2=JSONObject.fromObject(contract);
        res.put("contract",json2);
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
    @RequestMapping("getEmContractById")
    @ResponseBody
    public String  getEmContractById(String contractId){
       Contract contract= contractService.getByContractId(contractId);
        JSONObject res=JSONObject.fromBean(contract);
        return res.toString();
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
        //取出合同版本
       String modelVersion= contract.getModelVersion();
      if(modelVersion!=null){
          String remove="V";
          String modelVersion1= modelVersion.replace(remove,"");
          if(modelVersion1!=null){
              String  modelVersion2=UpdateVersion.updateVersionID(modelVersion1);
              contract.setModelVersion(modelVersion2);//升级模板号，同时作废前一个模板 相当于添加一个新的模板

              System.out.print(modelVersion1+"AAA");

          }
      }
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat  SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime=SimpleDateFormat.format(current_date);
        contract.setNowTime(nowTime);
        // 通过客户名称搜索到客户id
        String companyName = contract.getCompany1();
        Client client = clientService.getByName(companyName);
        if (client != null) contract.setClientId(client.getClientId());
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
    @RequestMapping("getContractBymodelName1")
    @ResponseBody
    public String getContractBymodelName1(String modelName){
        Contract modelContract=contractService.getModel2(modelName);
        JSONObject res=JSONObject.fromBean(modelContract);
//        JSONArray array1 = JSONArray.fromArray(ContractType.values());
//        res.put("contractNameStrList", array1);
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
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat  SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime=SimpleDateFormat.format(current_date);
        Contract contract=contractService.getByContractId(contractId);
        contract.setNowTime(nowTime);

        try {
           contractService.cancel(contractId,nowTime);
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
    public  String backContract(String contractId,String backContent){
        JSONObject res=new JSONObject();
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat  SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime=SimpleDateFormat.format(current_date);
        Contract contract=contractService.getByContractId(contractId);
        contract.setNowTime(nowTime);
        try{
         contractService.back(contractId,backContent,nowTime);
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
    public String approvalContract(String contractId ,String opinion){
        System.out.println(contractId+opinion+"aaa");
        JSONObject res=new JSONObject();
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat  SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime=SimpleDateFormat.format(current_date);
        Contract contract=contractService.getByContractId(contractId);
        contract.setNowTime(nowTime);
        try {
           //contractService.approval(contractId);
            contractService.opinion(contractId,opinion,nowTime);//这个方法审批和添加合同信息一起做一起做
            res.put("state","success");
        }
        catch (Exception e){
            res.put("state","fail");
        }
        return res.toString();
        }
        //设置高级检索下拉框数据
    @RequestMapping("getSeniorSelectedList")
    @ResponseBody
    public  String getSeniorSelectedList(){
        JSONObject res = new JSONObject();
        try{
            JSONArray checkStateList = JSONArray.fromArray(CheckState.values());
            res.put("checkStateList", checkStateList);
            res.put("status", "success");
            res.put("message", "获取成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }
    //设置合同模板高级检索下拉数据
    @RequestMapping("getModelSelectedList")
    @ResponseBody
    public String getModelSelectedList(){
        JSONObject res=new JSONObject();
        try{
            JSONArray checkStateList = JSONArray.fromArray(CheckState.values());
            JSONArray contractTypeList=JSONArray.fromArray(ContractType.values());
            res.put("checkStateList",checkStateList);
            res.put("contractTypeList",contractTypeList);
            res.put("status", "success");
            res.put("message", "查询成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }
    //高级检索合同列表
    @RequestMapping("searchContract")
    @ResponseBody
    public String searchContract(@RequestBody Contract contract){
            //找出合同类型
//        if(ContractType.getContract(nameBykey)!=null) {
//            nameBykey=ContractType.getContract(nameBykey).toString();
//        }
//        System.out.println(nameBykey+"mmm");
//         //首先检查枚举(省会)
//       if(Province.getProvince(keyword)!=null) {
//           keyword=Province.getProvince(keyword).toString();
//       }
//       //枚举的还有状态 合同类型
//        if(CheckState.getCheckState(keyword)!=null) {
//            keyword=CheckState.getCheckState(keyword).toString();
//        }
//        if(ContractType.getContract(keyword)!=null) {
//            keyword=ContractType.getContract(keyword).toString();
//        }
        JSONObject res=new JSONObject();
        try{

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
       //contract.setContractType(ContractType.getContract( contract.getContractType().toString()));
       Date beginTime=contract.getBeginTime();
        if(beginTime!=null){
            String time=getDateStr(beginTime);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd" );
            try {
                Date date = sdf.parse(time);
                contract.setBeginTime(date);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        System.out.println(beginTime+"666");
        List<Contract> contractList= contractService.search(contract);
        JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
        // 返回结果
        res.put("data",array);
        return res.toString();
          }
          //高级检索合同模板
    @RequestMapping("searchModel")
    @ResponseBody
    public String searchModel(@RequestBody Contract contract){
        JSONObject res=new JSONObject();
        try{
            List<Contract> contractList=contractService.searchModel(contract);
            JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            res.put("data",array);
            res.put("status", "success");
            res.put("message", "查询成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
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

    /**
     * 获取总记录数
     * @return
     */
    @RequestMapping("totalContractTemplateRecord")
    @ResponseBody
    public int totalContractTemplateRecord(){
        try {
            return contractService.countTemplate();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageContractTemplateList")
    @ResponseBody
    public  String loadPageContractTemplateList(@RequestBody Page page){
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<Contract> contractList = contractService.listPageTemplate(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }

    /**
     * 获取总记录数
     * @return
     */
    @RequestMapping("totalContractManageRecord")
    @ResponseBody
    public int totalContractManageRecord(String contractIndex){
        try {
            return contractService.countManage(Integer.parseInt(contractIndex));
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("totalContractRecord")
    @ResponseBody
    public int totalContractRecord() {
        try {
            return contractService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageContractManageList")
    @ResponseBody
    public  String loadPageContractManageList(@RequestBody Page page){
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<Contract> contractList = contractService.listPageManege(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }
    @RequestMapping("getContent")
    @ResponseBody
    public String getContent(String contractId){
        String content=contractService.getContent(contractId).trim();
        System.out.println(content);
        JSONObject res=JSONObject.fromBean(content);
        return  res.toString();
    }

    // 业务员合同部分
    /**
     * 根据合同中客户编号获取业务员信息
     * @return 业务员列表
     */
    @RequestMapping("listSalesmanByContract")
    @ResponseBody
    public String listSalesmanByContract(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<Salesman> salesmanList = contractService.listSalesmanByContract(page);
            JSONArray data = JSONArray.fromArray(salesmanList.toArray(new Salesman[salesmanList.size()]));
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

    /**
     * 根据合同中的客户信息筛选出业务员列表，获取其业务员数量
     * @return 业务员数量
     */
    @RequestMapping("countSalesmanByContract")
    @ResponseBody
    public int countSalesmanByContract() {
        int count = 0;
        try {
            count = contractService.countSalesmanByContract();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return count;
    }

    //根据客户编号获取编号
    @RequestMapping("getClientListById")
    @ResponseBody
    public String getClientListById(String clientId){
        JSONObject res=new JSONObject();
        try {
            Client client = contractService.getByClientId(clientId);//获得用户
            res.put("client",client);
            res.put("status", "success");
            res.put("message", "查询客户成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询客户失败");
        }
        return  res.toString();
    }
    //添加报价单明细
    @RequestMapping("addQuotationItem")
    @ResponseBody
    public String addQuotationItem(@RequestBody QuotationItem quotationItem){
        JSONObject res=new JSONObject();
        try{
            //首先查询最新的非模板合同编号
            List<String> contractIdList=contractService.getNewestContractId();
            quotationItem.setContractId(contractIdList.get(0));
            contractService.addQuotationItem(quotationItem);
            res.put("status", "success");
            res.put("message", "合同报价单明细添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "合同报价单明细添加失败");

        }
        return  res.toString();
    }

    //根据供应商编号获取
    @RequestMapping("getSupplierListById")
    @ResponseBody
    public String getSupplierListById(String supplierId){
        JSONObject res=new JSONObject();
        try {
            Supplier supplier=contractService.getSupplierListById(supplierId);
            res.put("status", "success");
            res.put("message", "供应商查询成功");
            res.put("supplier", supplier);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "供应商查询失败");
        }
        return  res.toString();


    }
}


