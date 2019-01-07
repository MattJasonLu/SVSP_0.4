package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.*;
import com.jdlink.util.DBUtil;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import com.jdlink.util.UpdateVersion;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.jdlink.util.DateUtil.getDateStr;
import static com.jdlink.util.UppercaseToNumber.transformation;


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
    public String listContractByName1(String name, String index) {
        if (CheckState.get(Integer.parseInt(index)) == null) {
            List<Contract> contractList = contractService.list1(name);
            JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            return array.toString();
        } else {
            String state = CheckState.get(Integer.parseInt(index)).toString();
            List<Contract> contractList = contractService.list2(name, state);
            JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            return array.toString();
        }
    }

    @RequestMapping("saveEmContract")
    @ResponseBody
    public String saveEmContract(@RequestBody Contract contract) {
        System.out.println(JSONObject.fromBean(contract).toString());
        //    JSONObject res=JSONObject.fromBean(contract);
        //    System.out.println(res.toString()+"PPP");
        //    List<Hazardous> Hazardous=  contract.getHazardous();
        //    System.out.println(Hazardous+"132");
        JSONObject res = new JSONObject();
        //  1.获取合同ID
        List<String> list = contractService.getContractIdList();//合同id集合
        List<Integer> list1 = new ArrayList<>();
        for (String s : list
                ) {
            int i = Integer.parseInt(s);
            list1.add(i);
        }
        Collections.sort(list1);
        for (Integer s1 : list1
                ) {
            //System.out.println(s1);
        }
        String newId = String.valueOf((list1.get(list1.size() - 1) + 1));//当前编号
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
        SimpleDateFormat SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime = SimpleDateFormat.format(current_date);
        contract.setNowTime(nowTime);
        try {
            contractService.addEm(contract);
            res.put("state", "success");
        } catch (Exception e) {
            res.put("state", "fail");
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
        List<String> list = contractService.getContractIdList();//合同id集合
        List<Integer> list1 = new ArrayList<>();
        for (String s : list
                ) {
            int i = Integer.parseInt(s);
            list1.add(i);
        }
        Collections.sort(list1);
        for (Integer s1 : list1
                ) {
            //System.out.println(s1);
        }
        String newId = String.valueOf((list1.get(list1.size() - 1) + 1));//当前编号
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
        SimpleDateFormat SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime = SimpleDateFormat.format(current_date);
        contract.setNowTime(nowTime);
        try {
            contractService.addEm(contract);
            res.put("state", "success");
        } catch (Exception e) {
            res.put("state", "fail");
        }
        return res.toString();
    }

    /**
     * 获得合同名称的下拉选项
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
        //查询客户list形式返回
        List client = clientService.list();
        JSONArray json = JSONArray.fromObject(client);
        res.put("companyNameList", json);
        //查询供应闪list形式返回
        List supplier = supplierService.list();
        JSONArray json2 = JSONArray.fromObject(supplier);
        res.put("supplierNameList", json2);
        //查询模板名称
        List modelName = contractService.modelName(key);
        List list1 = removeDuplicate(modelName);

        //查询最新的合同编号

        res.put("contractId", contractService.getNewestContractId1()+ 1);
        JSONArray json1 = JSONArray.fromObject(list1);
        res.put("modelNameList", json1);
        return res.toString();
    }

    /**
     * 获得相应城市的下拉选项
     */
    @RequestMapping("getCityList")
    @ResponseBody
    public String getCityList(String provinceId) {
        //System.out.println(provinceId instanceof String);
        //JSONObject res = new JSONObject();
        //根据provinceId找到相应的城市
        System.out.println(provinceId);
        List<City> city = cityService.getCity(provinceId);
        JSONArray json = JSONArray.fromObject(city);
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
     * 保存合同
     */
    @RequestMapping("saveContract")
    @ResponseBody
    public String saveContract(@RequestBody Contract contract) {
        JSONObject res1 = new JSONObject();

        //System.out.println(contract.getModelName()+"BBB");
        if (contract.getModelName() != null) {
            contract.setModelVersion("V1.0");
            System.out.println(contract.getModelVersion() + "CCC");
        }
        JSONObject res = JSONObject.fromBean(contract);
        //给予合同的状态
        try {
            contractService.add(contract);
            res1.put("status", "success");
            res1.put("message", "添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res1.put("status", "fail");
            res1.put("error", e);
            res1.put("message", "创建合同失败，请完善信息!");
        }
        return res1.toString();
    }

    @RequestMapping("submitContract")
    @ResponseBody
    public String submitContract(@RequestBody Contract contract) {
        //1.获取合同ID
        List<String> list = contractService.getContractIdList();//合同id集合
        List<Integer> list1 = new ArrayList<>();
        for (String s : list
                ) {
            int i = Integer.parseInt(s);
            list1.add(i);
        }
        Collections.sort(list1);
        for (Integer s1 : list1
                ) {
            //System.out.println(s1);
        }
        String newId = String.valueOf((list1.get(list1.size() - 1) + 1));//当前编号
        contract.setContractId(newId);
        System.out.println("当前合同编号:" + contract.getContractId());
        contract.setCheckState(CheckState.ToExamine);//待审核
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime = SimpleDateFormat.format(current_date);
        contract.setNowTime(nowTime);
        // 通过客户名称搜索到客户id
        String companyName = contract.getCompany1();
        Client client = clientService.getByName(companyName);
        if (client != null) contract.setClientId(client.getClientId());
        // 将合同对象做成json
        JSONObject res = JSONObject.fromBean(contract);
        //给予合同的状态
        try {
            contractService.add(contract);
            res.put("status", "success");
            res.put("message", "提交成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交合同失败，请完善信息!");
        }
        return res.toString();
    }

    @RequestMapping("submitContract1")
    @ResponseBody
    public String submitContract1(String id) {
        //1修改状态
        JSONObject res = new JSONObject();
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime = SimpleDateFormat.format(current_date);
        Contract contract = contractService.getByContractId(id);
        //contract.setNowTime(nowTime);
        contractService.toSubmit(id);
        res.put("state", "提交成功");
        return res.toString();
    }

    @RequestMapping("deleteContract")
    public ModelAndView deleteContract(String contractId) {
        ModelAndView mav = new ModelAndView();
        return mav;
    }

    @RequestMapping("getContractId")
    @ResponseBody
    public String getContractId(String contractId) {
        Date date = new Date();
        System.out.println(date + "eee");
        Contract contract = contractService.getByContractId(contractId);
        JSONObject res = JSONObject.fromBean(contract);
        return res.toString();
    }

    @RequestMapping("getContractId1")
    @ResponseBody
    public String getContractId1(String contractId, String key) {
        JSONObject res = new JSONObject();
        JSONArray array1 = JSONArray.fromArray(ContractType.values());
        res.put("contractNameStrList", array1);
        JSONArray array2 = JSONArray.fromArray(Province.values());
        res.put("provinceStrList", array2);
        JSONArray array3 = JSONArray.fromArray(TicketRate1.values());
        res.put("ticketRateStrList1", array3);
        //查询客户list形式返回
        List client = clientService.list();
        JSONArray json = JSONArray.fromObject(client);
        res.put("companyNameList", json);

        List supplier = supplierService.list();
        JSONArray json3 = JSONArray.fromObject(supplier);
        res.put("supplierNameList", json3);
        //查询模板名称
        List modelName = contractService.modelName(key);
        List list1 = removeDuplicate(modelName);
        JSONArray json1 = JSONArray.fromObject(list1);
        res.put("modelNameList", json1);
        //查询合同
        Contract contract = contractService.getByContractId(contractId);
        JSONObject json2 = JSONObject.fromObject(contract);
        res.put("contract", json2);
        return res.toString();
    }

    @RequestMapping("showContract")
    @ResponseBody
    public ModelAndView showClient(String contractId) {
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract contract = contractService.getByContractId(contractId);//获得相应的合同对象

        mav.addObject("contract", contract);
        mav.setViewName("jsp/showContract.jsp");
        return mav;
    }

    @RequestMapping("getEmContractById")
    @ResponseBody
    public String getEmContractById(String contractId) {
        Contract contract = contractService.getByContractId(contractId);
        JSONObject res = JSONObject.fromBean(contract);
        return res.toString();
    }

    @RequestMapping("Secondary")
    @ResponseBody
    public ModelAndView Secondary(String contractId) {
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract contract = contractService.getByContractId(contractId);//获得相应的合同对象
        mav.addObject("contract", contract);
        mav.setViewName("jsp/secondary.jsp");
        return mav;
    }

    @RequestMapping("emergency")
    @ResponseBody
    public ModelAndView emergency(String contractId) {
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract emergency = contractService.getByContractId(contractId);//获得相应的合同对象
        mav.addObject("emergency", emergency);
        mav.setViewName("jsp/emergency.jsp");
        return mav;
    }

    @RequestMapping("emergency1")
    @ResponseBody
    public ModelAndView emergency1(String contractId) {
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract emergency = contractService.getByContractId(contractId);//获得相应的合同对象
        mav.addObject("emergency", emergency);
        mav.setViewName("jsp/emergency1.jsp");
        return mav;
    }

    @RequestMapping("logistics")
    @ResponseBody
    public ModelAndView logistics(String contractId) {
        ModelAndView mav = new ModelAndView();
        //获得当前合同
        Contract contract = contractService.getByContractId(contractId);//获得相应的合同对象
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
        Contract model = contractService.getModel(modelName);//获得相应的合同对象
        mav.addObject("model", model);
        mav.setViewName("jsp/model.jsp");
        return mav;
    }

    @RequestMapping("saveAdjustContract")
    @ResponseBody
    public String saveAdjustContract(@RequestBody Contract contract) {
        //contract.setCheckState(CheckState.ToSubmit);//设置状态
        JSONObject res = JSONObject.fromBean(contract);
        //System.out.println("123"+contract.getContractId());
        //给予合同的状态
        //取出合同版本
        String modelVersion = contract.getModelVersion();
//      if(modelVersion!=null){
//          String remove="V";
//          String modelVersion1= modelVersion.replace(remove,"");
//          if(modelVersion1!=null){
//              String  modelVersion2=UpdateVersion.updateVersionID(modelVersion1);
//              contract.setModelVersion(modelVersion2);//升级模板号，同时作废前一个模板 相当于添加一个新的模板
//
//              System.out.print(modelVersion1+"AAA");
//
//          }
//      }
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime = SimpleDateFormat.format(current_date);
        contract.setNowTime(nowTime);
        // 通过客户名称搜索到客户id
        String companyName = contract.getCompany1();
        Client client = clientService.getByName(companyName);
        if (client != null) contract.setClientId(client.getClientId());
        try {
            contractService.update(contract);
            res.put("status", "success");
            res.put("message", "添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "创建合同失败，请完善信息!");
        }
        return res.toString();
    }

    @RequestMapping("getContractBymodelName")
    @ResponseBody
    public String getContractBymodelName(String contractId) {
        Contract modelContract = contractService.getModel(contractId);
        JSONObject res = JSONObject.fromBean(modelContract);
        JSONArray array1 = JSONArray.fromArray(ContractType.values());
        res.put("contractNameStrList", array1);
        return res.toString();
    }

    @RequestMapping("getContractBymodelName1")
    @ResponseBody
    public String getContractBymodelName1(String modelName) {
        Contract modelContract = contractService.getModel2(modelName);
        JSONObject res = JSONObject.fromBean(modelContract);
//        JSONArray array1 = JSONArray.fromArray(ContractType.values());
//        res.put("contractNameStrList", array1);
        return res.toString();
    }

    @RequestMapping("isF")
    @ResponseBody
    public String is(String isFreight, String id) {
        System.out.println(isFreight + id);
        JSONObject res = new JSONObject();
        if (isFreight.equals("true")) {
            contractService.updateFreight1(id);
        }

        if (isFreight.equals("false")) {
            contractService.updateFreight2(id);
        }
        return res.toString();
    }

    @RequestMapping("saveAdjustEmContract")
    @ResponseBody
    public String saveAdjustEmContract(@RequestBody Contract contract) {
        JSONObject res = JSONObject.fromBean(contract);
        System.out.println(res + "AAA");
        try {
            contractService.updateEm(contract);
            res.put("status", "success");
            res.put("message", "添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "创建合同失败，请完善信息!");
        }
        return res.toString();

    }

    /**
     * 合同作废
     */
    @RequestMapping("cancelContract")
    @ResponseBody
    public String cancelContract(String contractId) {
        JSONObject res = new JSONObject();
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime = SimpleDateFormat.format(current_date);
        Contract contract = contractService.getByContractId(contractId);
        contract.setNowTime(nowTime);

        try {
            contractService.cancel(contractId, nowTime);
            res.put("state", "success");
        } catch (Exception e) {
            res.put("state", "fail");
        }
        return res.toString();
    }

    /**
     * 合同模板作废
     */
    @RequestMapping("cancelModel")
    @ResponseBody
    public String cancelModel(String contractId) {
        JSONObject res = new JSONObject();
        try {
            contractService.cancel1(contractId);
            res.put("state", "success");
        } catch (Exception e) {
            res.put("state", "fail");
        }
        return res.toString();
    }

    /**
     * 驳回功能
     */
    @RequestMapping("backContract")
    @ResponseBody
    public String backContract(String contractId, String backContent) {
        JSONObject res = new JSONObject();
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime = SimpleDateFormat.format(current_date);
        Contract contract = contractService.getByContractId(contractId);
        contract.setNowTime(nowTime);
        try {
            contractService.back(contractId, backContent, nowTime);
            res.put("state", "success");
        } catch (Exception e) {
            res.put("state", "fail");
        }
        return res.toString();
    }

    /**
     * 合同审批
     */
    @RequestMapping("approvalContract")
    @ResponseBody
    public String approvalContract(String contractId, String opinion) {
        System.out.println(contractId + opinion + "aaa");
        JSONObject res = new JSONObject();
        //设置时间
        //生成日期对象
        Date current_date = new Date();
        //设置日期格式化样式为：yyyy-MM-dd
        SimpleDateFormat SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //格式化当前日期
        String nowTime = SimpleDateFormat.format(current_date);
        Contract contract = contractService.getByContractId(contractId);
        contract.setNowTime(nowTime);
        try {
            //contractService.approval(contractId);
            contractService.opinion(contractId, opinion, nowTime);//这个方法审批和添加合同信息一起做一起做
            res.put("state", "success");
        } catch (Exception e) {
            res.put("state", "fail");
        }
        return res.toString();
    }

    //设置高级检索下拉框数据
    @RequestMapping("getSeniorSelectedList")
    @ResponseBody
    public String getSeniorSelectedList() {
        JSONObject res = new JSONObject();
        try {
            JSONArray checkStateList = JSONArray.fromArray(CheckState.values());
            res.put("checkStateList", checkStateList);
            res.put("status", "success");
            res.put("message", "获取成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

    //设置合同模板高级检索下拉数据
    @RequestMapping("getModelSelectedList")
    @ResponseBody
    public String getModelSelectedList() {
        JSONObject res = new JSONObject();
        try {
            JSONArray checkStateList = JSONArray.fromArray(CheckState.values());
            JSONArray contractTypeList = JSONArray.fromArray(ContractType.values());
            res.put("checkStateList", checkStateList);
            res.put("contractTypeList", contractTypeList);
            res.put("status", "success");
            res.put("message", "查询成功");

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }

    //高级检索合同列表
    @RequestMapping("searchContract")
    @ResponseBody
    public String searchContract(@RequestBody Contract contract) {
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
        JSONObject res = new JSONObject();
        try {

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        //contract.setContractType(ContractType.getContract( contract.getContractType().toString()));
        Date beginTime = contract.getBeginTime();
        if (beginTime != null) {
            String time = getDateStr(beginTime);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            try {
                Date date = sdf.parse(time);
                contract.setBeginTime(date);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        System.out.println(beginTime + "666");
        List<Contract> contractList = contractService.search(contract);
        JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
        // 返回结果
        res.put("data", array);
        return res.toString();
    }

    //高级检索合同模板
    @RequestMapping("searchModel")
    @ResponseBody
    public String searchModel(@RequestBody Contract contract) {
        JSONObject res = new JSONObject();
        try {
            List<Contract> contractList = contractService.searchModel(contract);
            JSONArray array = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "查询成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();
    }

    public static List removeDuplicate(List list) {
        List listTemp = new ArrayList();
        for (int i = 0; i < list.size(); i++) {
            if (!listTemp.contains(list.get(i))) {
                listTemp.add(list.get(i));
            }
        }
        return listTemp;
    }

    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalContractTemplateRecord")
    @ResponseBody
    public int totalContractTemplateRecord() {
        try {
            return contractService.countTemplate();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageContractTemplateList")
    @ResponseBody
    public String loadPageContractTemplateList(@RequestBody Page page) {
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
     *
     * @return
     */
    @RequestMapping("totalContractManageRecord")
    @ResponseBody
    public int totalContractManageRecord(String contractIndex) {
        try {
            return contractService.countManage(Integer.parseInt(contractIndex));
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("totalContractRecord")
    @ResponseBody
    public int totalContractRecord() {
        try {
            return contractService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageContractManageList")
    @ResponseBody
    public String loadPageContractManageList(@RequestBody Page page) {
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
    public String getContent(String contractId) {
        String content = contractService.getContent(contractId).trim();
        System.out.println(content);
        JSONObject res = JSONObject.fromBean(content);
        return res.toString();
    }

    // 业务员合同部分

    /**
     * 根据合同中客户编号获取业务员信息
     *
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
     *
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
    public String getClientListById(String clientId) {
        JSONObject res = new JSONObject();
        try {
            Client client = clientService.getByClientId(clientId);//获得用户
            res.put("client", client);
            res.put("status", "success");
            res.put("message", "查询客户成功");

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询客户失败");
        }
        return res.toString();
    }

    /**
     * 根据业务员ID获取其合同
     *
     * @return 业务员数量
     */
    @RequestMapping("getAllContractCountBySalesmanId")
    @ResponseBody
    public int getAllContractCountBySalesmanId(String salesmanId) {
        int count = 0;
        try {
            count = contractService.getAllContractCountBySalesmanId(salesmanId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return count;
    }
    /**
     * 根据业务员的编号筛选出历年所有的合同
     *
     * @param
     * @return 合同列表
     */
    @RequestMapping("getAllContractBySalesmanId")
    @ResponseBody
    public String getAllContractBySalesmanId(@RequestBody Contract contract1) {
        JSONObject res = new JSONObject();
        try {
            Integer serialNumber = 0;
            // 获取该业务员名下所有合同
            List<Contract> contractList = contractService.getAllContractBySalesmanId(contract1);
            // 危废信息
            Map<Integer, List<LaboratoryTest>> map = new HashMap<>();
            // 客户联系信息
            Map<Integer, String> map2 = new HashMap<>();
            // 遍历合同列表，获取每个合同对应信息
            for (Contract contract : contractList) {
                String clientId = contract.getClientId();
                //获取并设置业务员ID和姓名
                Client client = clientService.getByClientId(clientId);
                String salesmanId1 = client.getSalesman().getSalesmanId();
                String salesmanName = client.getSalesman().getName();
                contract.setSalesmanId(salesmanId1);
                contract.setSalesmanName(salesmanName);
                // 设置map2
                String contactInfo = client.getContactName() + "-" + client.getPhone();
                map2.put(serialNumber, contactInfo);
                // 设置map3
                List<QuotationItem> quotationItemList = contract.getQuotationItemList();
                List<LaboratoryTest> laboratoryTestList = new ArrayList<>();
                for (QuotationItem quotationItem : quotationItemList) {
                    String code = quotationItem.getWastesCode();
                    if (code != null) {
                        // 获取化验单
                        LaboratoryTest laboratoryTest = laboratoryTestService.getLaboratoryTestByWastesCodeAndClientId(code, clientId);
                        laboratoryTestList.add(laboratoryTest);
                    }
                }
                // 设置map
                map.put(serialNumber, laboratoryTestList);
                serialNumber++;
            }
            // map转json
            JSONObject jMap = JSONObject.fromMap(map);
            JSONObject jMap2 = JSONObject.fromMap(map2);
            JSONArray data = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            // 赋值
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("contractInfo", data);
            res.put("laboratoryTestInfo", jMap);
            res.put("contactInfo", jMap2);                // 联系人信息
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

    //添加报价单明细
    @RequestMapping("addQuotationItem")
    @ResponseBody
    public String addQuotationItem(@RequestBody QuotationItem quotationItem) {
        JSONObject res = new JSONObject();
        try {
            //首先查询最新的非模板合同编号
//            List<String> contractIdList = contractService.getNewestContractId();
//            quotationItem.setContractId(contractIdList.get(0));
            contractService.addQuotationItem(quotationItem);
            res.put("status", "success");
            res.put("message", "合同报价单明细添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "合同报价单明细添加失败");

        }
        return res.toString();
    }

    //根据供应商编号获取
    @RequestMapping("getSupplierListById")
    @ResponseBody
    public String getSupplierListById(String supplierId) {
        JSONObject res = new JSONObject();
        try {
            Supplier supplier = supplierService.getBySupplierId(supplierId);
            res.put("status", "success");
            res.put("message", "供应商查询成功");
            res.put("supplier", supplier);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "供应商查询失败");
        }
        return res.toString();


    }

    //更新合同
    @RequestMapping("updateContract")
    @ResponseBody
    public String updateContract(@RequestBody Contract contract) {
        JSONObject res = new JSONObject();
        try {
            //更新主表
            contractService.updateContract(contract);
            //同时删除字表的明细
            contractService.deleteQuotationItem(contract.getContractId());
            res.put("status", "success");
            res.put("message", "更新合同主表成功");
            res.put("message", "删除合同子表成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新合同主表失败");
            res.put("message", "删除合同子表失败");
        }

        return res.toString();
    }

    //更新合同明细
    @RequestMapping("updateQuotationItem")
    @ResponseBody
    public String updateQuotationItem(@RequestBody QuotationItem quotationItem) {
        JSONObject res = new JSONObject();
        try {
            contractService.addQuotationItem(quotationItem);
            res.put("status", "success");
            res.put("message", "子表更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "子表更新失败");
        }
        return res.toString();
    }

    //升级合同模板
    @RequestMapping("upgradeContractModel")
    @ResponseBody
    public String upgradeContractModel(@RequestBody Contract contract) {
        JSONObject res = new JSONObject();
        try {
            String modelVersion = contract.getModelVersion();
            String remove = "V";
            String modelVersion1 = modelVersion.replace(remove, "");
            if (modelVersion1 != null) {
                String modelVersion2 = UpdateVersion.updateVersionID(modelVersion1);
                contract.setModelVersion(modelVersion2);//升级模板号，同时作废前一个模板 相当于添加一个新的模板
            }
            contractService.update(contract);
            res.put("status", "success");
            res.put("message", "更新成功");

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }


        return res.toString();
    }

    //根据合同编号获取合同信息
    @RequestMapping("getByContractId")
    @ResponseBody
    public String getByContractId(String contractId) {
        JSONObject res = new JSONObject();
        try {

            Contract contract = contractService.getByContractId(contractId);
            JSONArray array3 = JSONArray.fromArray(TicketRate1.values());
            res.put("ticketRateStrList1", array3);
            //查询客户list形式返回
            List client = clientService.list();
            JSONArray json = JSONArray.fromObject(client);
            res.put("companyNameList", json);
            List supplier = supplierService.list();
            JSONArray json3 = JSONArray.fromObject(supplier);
            res.put("supplierNameList", json3);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("contract", contract);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }


        return res.toString();

    }

    //根据合同类型查找模板
    @RequestMapping("getModelByContractId")
    @ResponseBody
    public String getModelByContractId(String key) {
        JSONObject res = new JSONObject();
        try {

            List modelName = contractService.modelName(key);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("modelNameList", modelName);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");


        }


        return res.toString();


    }

    //导入费用明细
    @RequestMapping("importQuotationItemExcel")
    @ResponseBody
    public String importQuotationItemExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
        try {
            List<QuotationItem> quotationItemList = new ArrayList<>();
            for (int i = 1; i < data.length; i++) {
                //创建报价单的明细
                QuotationItem quotationItem = new QuotationItem();
                //1危废名称
                quotationItem.setWastesName(data[i][1].toString());
                //包装
                quotationItem.setPackageType(PackageType.getPackageType(data[i][2].toString()));
                //进料方式
                quotationItem.setHandleCategory(HandleCategory.getHandleCategory(data[i][3].toString()));
                //代码
                quotationItem.setWastesCode(data[i][4].toString());
                //合约量
                quotationItem.setContractAmount(transformation(data[i][5].toString()));
                quotationItemList.add(quotationItem);
            }
            res.put("status", "success");
            res.put("message", "费用明细导入成功");
            res.put("data", quotationItemList);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "费用明细失败");


        }
        return res.toString();
    }

    /**
     * 根据公司名和接运单日期获取合同内报价单里的危废明细
     * @param companyName
     * @return
     */
    @RequestMapping("getWastesInfoByCompanyName")
    @ResponseBody
    public String getWastesInfoByCompanyName(String companyName,Date creationDate) {
        JSONObject res = new JSONObject();
        try {
            Contract contract = contractService.getWastesInfoByCompanyName(companyName,creationDate);   // 获取合同
            JSONObject data = JSONObject.fromBean(contract);
            res.put("status", "success");
            res.put("message", "明细数据获取成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "明细数据获取失败");
        }
        return res.toString();
    }


/**
 * 根据公司名获取合同
 * @param companyName
 * @return
 */
    @RequestMapping("getContractByCompanyName")
    @ResponseBody
    public String getContractByCompanyName(String companyName) {
        JSONObject res = new JSONObject();
        try {
            List<Contract> contractList = contractService.getContractByCompanyName(companyName);   // 获取合同
            JSONArray data = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            res.put("status", "success");
            res.put("message", "获取成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取失败");
        }
        return res.toString();
    }

    /*合约量统计加载页面**/
    @RequestMapping("loadContractVolumeList")
    @ResponseBody
    public String loadContractVolumeList(@RequestBody Page page){
        JSONObject res=new JSONObject();

        try {
            List<QuotationItem> contractList1=new ArrayList<>();
            List<QuotationItem> contractList=contractService.ContractList(page);
            for(int i=0;i<contractList.size();i++){
                if(contractList.get(i)!=null){
                    contractList1.add(contractList.get(i));
                }
            }

            res.put("status", "success");
            res.put("message", "合同查询成功");
            res.put("data", contractList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "合同查询失败");
        }



        return res.toString();


    }


    /**
     *
     *
     * 合约量统计总数
     */
    @RequestMapping("totalContractVolume")
    @ResponseBody
    public int contractVolume(){
        return contractService.contractVolume();
    }


    /**
     * 上传图片文件
     */
    @RequestMapping("savePictureFiles")
    @ResponseBody
    public String savePictureFiles(String wastesCode,String wastesName,String contractId, MultipartFile pictureFile){
        JSONObject res = new JSONObject();


        try {
            QuotationItem quotationItem = new QuotationItem();
            quotationItem.setContractId(contractId);
            quotationItem.setWastesCode(wastesCode);
            quotationItem.setWastesName(wastesName);

            if (pictureFile != null) {
                String materialPath = "Files/Contract"; //设置服务器路径
                File materialDir = new File(materialPath);
                if (!materialDir.exists()) {
                    materialDir.mkdirs();
                }
                String materialName = contractId + "-" +  pictureFile.getOriginalFilename();//设置文件名称
                String materialFilePath = materialPath + "/" + materialName;//本地路径
                File materialFile = new File(materialFilePath);
                pictureFile.transferTo(materialFile);
                quotationItem.setPicture(materialFilePath);
            }
          contractService.setFilePath(quotationItem);
        }
        catch (Exception e){

        }


        return res.toString();

    }


    @RequestMapping("saveContractAppendices")
    @ResponseBody
    public String saveContractAppendices(String contractId,MultipartFile contractAppendices){
        JSONObject res = new JSONObject();

        try {

            Contract contract = new Contract();
            contract.setContractId(contractId);
            if (contractAppendices != null) {
                String materialPath = "Files/Contract"; //设置服务器路径
                File materialDir = new File(materialPath);
                if (!materialDir.exists()) {
                    materialDir.mkdirs();
                }
                String materialName = contractId + "-" +  contractAppendices.getOriginalFilename();//设置文件名称
                String materialFilePath = materialPath + "/" + materialName;//本地路径
                File materialFile = new File(materialFilePath);
                contractAppendices.transferTo(materialFile);
                contract.setContractAppendicesUrl(materialFilePath);
            }
            contractService.setContractFilePath(contract);
            res.put("status", "success");
            res.put("message", "文件上传成功");

        }

        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "文件上传失败");

        }


        return res.toString();
    }


    //更新图片路径
    @RequestMapping("updatePictureUrl")
    @ResponseBody
    public String updatePictureUrl(String wastesCode,String wastesName,String contractId,String picture ){
        JSONObject res=new JSONObject();


        try{
    contractService.updatePictureUrl(wastesCode, wastesName, contractId, picture);
            res.put("status", "success");
            res.put("message", "图片更新成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "图片更新失败");
        }
        return res.toString();
    }

   //更新合同附件路径
    @RequestMapping("updateContractAppendicesUrl")
    @ResponseBody
    public String  updateContractAppendicesUrl(String contractId,String contractAppendicesUrl){
        JSONObject res=new JSONObject();

        try {

        }
        catch (Exception e){

        }

        return res.toString();

    }

   //合同合约量页面查询
    @RequestMapping("searchContractVolume")
    @ResponseBody
    public String searchContractVolume(@RequestBody QuotationItem quotationItem){
        JSONObject res=new JSONObject();

        try {
            List<QuotationItem> quotationItemList1=new ArrayList<>() ;
            List<QuotationItem> quotationItemList=contractService.searchContractVolume(quotationItem) ;
//            for(int i=0;i<quotationItemList.size();i++){
//                Contract contract=quotationItemList.get(i).getContract();
//                if(contract!=null){
//                    if(contract.getContractType()!=null&&contract.getPeriod().length()==0&&contract.getContractContent().length()==0&&contract.getModelVersion().length()==0){
//                        quotationItemList1.add(quotationItemList.get(i));
//                    }
//                }
//            }

            res.put("message", "查询成功");
            res.put("status", "success");
            res.put("data", quotationItemList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }


    //合约量导出
    @RequestMapping("exportContractVolume")
    @ResponseBody
    public String exportContractVolume(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "产废单位/危废名称/危废代码/合约量/处置金额/签订日期/截止日期";
            name = "合约量统计";   //重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");

        }


        return res.toString();
    }

    /**
     * 合同模板审批
     */
    @RequestMapping("approvalModel")
    @ResponseBody
    public String  approvalModel(String contractId){
        JSONObject res=new JSONObject();

        try {
      contractService.approvalModel(contractId);
            res.put("status", "success");
            res.put("message", "审批成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审批失败");
        }

        return res.toString();
    }

    //签订合同
    @RequestMapping("signContract")
    @ResponseBody
    public String signContract(String contractId){
        JSONObject res=new JSONObject();

        try {
            contractService.signContract(contractId);
            res.put("status", "success");
            res.put("message", "合同签订成功");
        }
        catch (Exception e){
            e.printStackTrace();

            res.put("status", "fail");

            res.put("message", "合同签订失败");

        }
        return res.toString();
    }

    //合同编号校验
    @RequestMapping("Verification")
    @ResponseBody
    public String Verification(String contractId){
        JSONObject res=new JSONObject();

        try {
            List<String> stringList=contractService.getAllContractId();
            Boolean flag=stringList.contains(contractId);
            res.put("status", "success");
            res.put("message", "更新成功");
            res.put("flag", flag);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");

        }

        return res.toString();
    }

    //加载危废合同
    @RequestMapping("loadPageWastesContractList")
    @ResponseBody
    public String loadPageWastesContractList(@RequestBody Page page){
        JSONObject res=new JSONObject();

        try {
            List<Contract> contractList=contractService.loadPageWastesContractList(page);
            res.put("status", "success");
            res.put("message", "危废合同查询成功");
            res.put("data", contractList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "危废合同查询失败");

        }
        return  res.toString();
    }

    /*危废合同总数
    * */
    @RequestMapping("loadPageWastesContractListCount")
    @ResponseBody
    public int loadPageWastesContractListCount(){

        return contractService.loadPageWastesContractListCount();
    }

    /*危废合同查询*/
    @RequestMapping("searchWasteContract")
    @ResponseBody
    public String searchWasteContract(@RequestBody Contract contract){
        JSONObject res=new JSONObject();
             try {
           List<Contract> contractList=contractService.searchWasteContract(contract);
                 res.put("status", "success");
                 res.put("message", "查询成功");
                 res.put("data", contractList);
             }
             catch (Exception e){

                 e.printStackTrace();
                 res.put("status", "fail");
                 res.put("message", "更新失败");
             }

        return res.toString();
    }

    /*危废合同查询计数*/
    @RequestMapping("searchWasteContractCount")
    @ResponseBody
    public int searchWasteContractCount(@RequestBody Contract contract){

        return  contractService.searchWasteContractCount(contract);


    }
}




