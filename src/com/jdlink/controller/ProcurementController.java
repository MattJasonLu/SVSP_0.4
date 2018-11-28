package com.jdlink.controller;

import com.jdlink.domain.Dictionary.UnitDataItem;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Material;
import com.jdlink.domain.Produce.Procurement;
import com.jdlink.domain.Produce.ProcurementPlan;
import com.jdlink.domain.Produce.ProcurementPlanItem;
import com.jdlink.domain.Unit;
import com.jdlink.service.ProcurementService;
import com.jdlink.service.dictionary.DictionaryService;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.jdlink.util.NumberToDate.double2Date;

/**
 * 采购控制器
 * create By JackYang on 2018/9/1
 */
@Controller
public class ProcurementController {
    @Autowired
    ProcurementService procurementService;
    @Autowired
    DictionaryService dictionaryService;

    /**
     * 添加购物对象
     */
    @RequestMapping("addProcurement")
    @ResponseBody
    public String addProcurement(@RequestBody Procurement procurement) {
        JSONObject res = new JSONObject();
        try {
            //1首先寻找最新的采购编号
            List<String> receiptNumberList = procurementService.getNewestId();
            //设定初始编号为'0001'
            String receiptNumber = "0001";
            if (receiptNumberList.size() == 0) {
                receiptNumber = "0001";
            }
            if (receiptNumberList.size() > 0) {
                receiptNumber = get4(receiptNumberList.get(0));
            }
            procurement.setReceiptNumber(receiptNumber);
            procurementService.add(procurement);
            res.put("status", "success");
            res.put("message", "添加采购信息成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加采购信息失败");
        }
        return res.toString();
    }

    /**
     * 添加物料信息
     */
    @RequestMapping("addMaterial")
    @ResponseBody
    public String addMaterial(@RequestBody Material material) {
        JSONObject res = new JSONObject();
        try {
            //1首先寻找最新的采购编号然后进行设置注入
            List<String> receiptNumberList = procurementService.getNewestId();
            material.setReceiptNumber(receiptNumberList.get(0));
            procurementService.addMaterial(material);
            res.put("status", "success");
            res.put("message", "添加物料需求成功");

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加物料需求失败");
        }
        return res.toString();
    }

    /**
     * 加载月季采购列表
     */
    @RequestMapping("getProcurementList")
    @ResponseBody
    public String getProcurementList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<Procurement> procurements = procurementService.getProcurementList(page);
            JSONArray array = JSONArray.fromObject(procurements);
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


    /**
     * 加载月季物品明细采购列表
     */
    @RequestMapping("getProcurementItemList")
    @ResponseBody
    public String getProcurementItemList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<Material> materialList = procurementService.getProcurementItemList(page);
            JSONArray array = JSONArray.fromObject(materialList);
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

    /**
     * 获取物料明细总数
     * @return
     */
    @RequestMapping("countProcurementItemList")
    @ResponseBody
    public int countProcurementItemList() {
        try {
            return procurementService.countProcurementItemList();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取查询物料明细总数
     * @return
     */
    @RequestMapping("searchMaterialTotal")
    @ResponseBody
    public int searchMaterialTotal(@RequestBody Material material) {
        try {
            return procurementService.searchMaterialTotal(material);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询月季采购列表
     */
    @RequestMapping("searchMaterial")
    @ResponseBody
    public String searchMaterial(@RequestBody Material material) {
        JSONObject res = new JSONObject();
        try {
            List<Material> materialList = procurementService.searchMaterial(material);
            JSONArray array = JSONArray.fromObject(materialList);
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

    /**
     * 加载应急采购列表
     */
    @RequestMapping("getEmergencyProcurementList")
    @ResponseBody
    public String getEmergencyProcurementList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<Procurement> procurements = procurementService.getEmergencyProcurementList(page);
            JSONArray array = JSONArray.fromObject(procurements);
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


/**
 * 根据编号获取信息
 */
    @RequestMapping("getProcurementItemListById")
    @ResponseBody
    public String getProcurementItemListById(String id) {
        JSONObject res = new JSONObject();
        try {
            Material material = procurementService.getMaterialById(id);
            res.put("data", material);
            res.put("status", "success");
            res.put("message", "查询成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    /**
     * 根据编号获取信息
     */
    @RequestMapping("getProcurementListById")
    @ResponseBody
    public String getProcurementListById(String receiptNumber) {
        JSONObject res = new JSONObject();
        try {
            List<Procurement> procurementList = procurementService.getProcurementListById(receiptNumber);
            res.put("data", procurementList);
            res.put("status", "success");
            res.put("message", "查询成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }
    /**
     * 获取四位的编号
     */
    /**
     * 高级查询
     *
     * @param
     * @return
     */
    @RequestMapping("searchProcurement")
    @ResponseBody
    public String searchProcurement(@RequestBody Procurement procurement) {
        JSONObject res = new JSONObject();
        try {
            List<Procurement> procurementList = procurementService.searchProcurement(procurement);
            JSONArray array = JSONArray.fromObject(procurementList);
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

    public String get4(String s) {
        int i = Integer.parseInt(s);
        int i1 = i + 1;
        String s1 = String.valueOf(i1);
        while (s1.length() != 4) {
            s1 = "0" + s1;
        }
        return s1;
    }

    /**
     * 获得辅料物品列表
     */
    @RequestMapping("getIngredientsList")
    @ResponseBody
    public String getIngredientsList() {
        JSONObject res = new JSONObject();
        try {
            List<String> stringList = procurementService.getIngredientsList();
            res.put("stringList", stringList);
            res.put("status", "success");
            res.put("message", "更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }


        return res.toString();
    }

    /**
     * 作废
     */
    @RequestMapping("setProcurementListCancel")
    @ResponseBody
    public String setProcurementListCancel(String receiptNumber) {
        JSONObject res = new JSONObject();
        try {
            procurementService.setProcurementListCancel(receiptNumber);
            res.put("status", "success");
            res.put("message", "作废成功");

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();

    }

    /**
     * 提交
     */
    @RequestMapping("setProcurementListSubmit")
    @ResponseBody
    public String setProcurementListSubmit(String receiptNumber) {
        JSONObject res = new JSONObject();
        try {
            procurementService.setProcurementListSubmit(receiptNumber);
            res.put("status", "success");
            res.put("message", "提交成功");

        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");
        }
        return res.toString();

    }

    /**
     * 获取月季采购总数
     */
    @RequestMapping("totalMouthProcumentRecord")
    @ResponseBody
    public int totalMouthProcumentRecord() {
        try {
            return procurementService.totalMouth();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取应急采购总数
     */
    @RequestMapping("totalEmcRecord")
    @ResponseBody
    public int totalEmcRecord() {
        try {
            return procurementService.totalEmc();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 导入月度采购
     */
    @RequestMapping("importMonthProcurementExcel")
    @ResponseBody
    public String importMonthProcurementExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        List<Object[][]> data = ImportUtil.getInstance().getExcelFileData(excelFile);
        //data 带表页数现在一页一页的进行导入即可
        try {
            for (int i = 0; i < data.size(); i++) {//一页的遍历
                //创建采购对象
                Procurement procurement = new Procurement();

                //找出最新的编号
                //1首先寻找最新的采购编号
                List<String> receiptNumberList = procurementService.getNewestId();
                //设定初始编号为'0001'
                String receiptNumber = "0001";
                if (receiptNumberList.size() == 0) {
                    receiptNumber = "0001";
                }
                if (receiptNumberList.size() > 0) {
                    receiptNumber = get4(receiptNumberList.get(0));
                }
                procurement.setReceiptNumber(receiptNumber);//注入
                procurement.setProcurementCategory(true);

                if (String.valueOf(data.get(i)[3][2]) != "null") {
                    procurement.setApplyMouth(String.valueOf(data.get(i)[3][2]));//申请月份
                }

                if (String.valueOf(data.get(i)[3][2]) == "null") {
                    procurement.setApplyMouth(" ");//申请月份
                }

                if (String.valueOf(data.get(i)[3][7]) != "null") {
                    if (data.get(i)[3][7].toString().indexOf("-") != -1) {
                        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                        Date date = simpleDateFormat.parse(data.get(i)[3][7].toString().replace("/", "-"));
                        procurement.setDemandTime(date);//需求时间
                    }
                    if (data.get(i)[3][7].toString().indexOf("-") == -1) {
                        Date t = double2Date(Double.parseDouble(data.get(i)[3][7].toString()));
                        procurement.setDemandTime(t);//需求时间
                    }

                }
                if (String.valueOf(data.get(i)[3][7]) == "null") {
                    procurement.setDemandTime(null);//需求时间
                }
                if (String.valueOf(data.get(i)[3][13]) != "null") {
                    procurement.setApplyDepartment(String.valueOf(data.get(i)[3][13]));//申请部门
                }
                if (String.valueOf(data.get(i)[3][13]) == "null") {
                    procurement.setApplyDepartment(" ");//申请部门
                }
                if (String.valueOf(data.get(i)[4][2]) != "null") {
                    procurement.setProposer(String.valueOf(data.get(i)[4][2]));//申购部门负责人
                }
                if (String.valueOf(data.get(i)[4][2]) == "null") {
                    procurement.setProposer(" ");//申购部门负责人
                }
                if (String.valueOf(data.get(i)[4][7]) != "null") {
                    procurement.setDivisionHead(String.valueOf(data.get(i)[4][7]));//申购部门分管领导
                }
                if (String.valueOf(data.get(i)[4][7]) == "null") {
                    procurement.setDivisionHead(" ");//申购部门分管领导
                }
                if (String.valueOf(data.get(i)[4][11]) != "null") {
                    procurement.setPurchasingDirector(String.valueOf(data.get(i)[4][11]));//采购部门负责人
                }
                if (String.valueOf(data.get(i)[4][11]) == "null") {
                    procurement.setPurchasingDirector(" ");//采购部门负责人
                }
                if (String.valueOf(data.get(i)[4][13]) != "null") {
                    procurement.setPurchasingHead(String.valueOf(data.get(i)[4][13]));//采购部门分管领导
                }
                if (String.valueOf(data.get(i)[4][13]) == "null") {
                    procurement.setPurchasingHead(" ");//采购部门分管领导
                }
                if (String.valueOf(data.get(i)[4][15]) != "null") {
                    procurement.setGeneralManager(String.valueOf(data.get(i)[4][15]));//总经理
                }
                if (String.valueOf(data.get(i)[4][15]) == "null") {
                    procurement.setGeneralManager(" ");//总经理
                }
                for (int j = 7; j < data.get(i).length - 3; j++) {

                    if (data.get(i)[j][1] != "null" && data.get(i)[j][1] != null) {

                        System.out.println(data.get(i)[j][1] + "第二列");
                        //创建物资对象
                        Material material = new Material();
                        material.setReceiptNumber(receiptNumber);//设置申请单编号
                        if (String.valueOf(data.get(i)[j][1]) != "null") {
                            material.setSuppliesName(String.valueOf(data.get(i)[j][1]));
                        }
                        if (String.valueOf(data.get(i)[j][1]) == "null") {
                            material.setSuppliesName(" ");
                        }//设置物资名称

                        if (String.valueOf(data.get(i)[j][6]) != "null") {
                            material.setSpecifications(String.valueOf(data.get(i)[j][6]));
                        }
                        if (String.valueOf(data.get(i)[j][6]) == "null") {
                            material.setSpecifications(" ");
                        }//设置规格型号

                        //单位
                        if (String.valueOf(data.get(i)[j][11]) != "null") {
                            UnitDataItem unitDataItem=new UnitDataItem();
                            unitDataItem.setDataDictionaryItemId(dictionaryService.getdatadictionaryitemIdByName(String.valueOf(data.get(i)[j][11]),25));
                            material.setUnitDataItem(unitDataItem);


                        }
                        if (String.valueOf(data.get(i)[j][11]) == "null") {
                            material.setUnitDataItem(null);
                        }//设置单位

                        if (String.valueOf(data.get(i)[j][12]) != "null") {
                            material.setInventory(Float.parseFloat(data.get(i)[j][12].toString()));
                        }
                        if (String.valueOf(data.get(i)[j][12]) == "null") {
                            material.setInventory(0);
                        }//设置库存量

                        if (String.valueOf(data.get(i)[j][13]) != "null") {
                            material.setDemandQuantity(Float.parseFloat(data.get(i)[j][13].toString()));
                        }
                        if (String.valueOf(data.get(i)[j][13]) == "null") {
                            material.setDemandQuantity(0);
                        }//设置需求数量

                        if (String.valueOf(data.get(i)[j][14]) != "null") {
                            material.setNote(String.valueOf(data.get(i)[j][14]));
                        }
                        if (String.valueOf(data.get(i)[j][14]) == "null") {
                            material.setNote(" ");
                        }
                        //设置备注
                        //首先添加主表
                        //再添加字表
                        procurementService.addMaterial(material);
                    }

                }
                //进行添加
                procurementService.add(procurement);
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败");

        }
        return res.toString();


    }

    /**
     * 导入应急采购
     */
    @RequestMapping("importEmergencyProcurementExcel")
    @ResponseBody
    public String importEmergencyProcurementExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        List<Object[][]> data = ImportUtil.getInstance().getExcelFileData(excelFile);
        try {
            for (int i = 0; i < data.size(); i++) {//一页的遍历
                //创建采购对象
                Procurement procurement = new Procurement();
                //找出最新的编号
                //1首先寻找最新的采购编号
                List<String> receiptNumberList = procurementService.getNewestId();
                //设定初始编号为'0001'
                String receiptNumber = "0001";
                if (receiptNumberList.size() == 0) {
                    receiptNumber = "0001";
                }
                if (receiptNumberList.size() > 0) {
                    receiptNumber = get4(receiptNumberList.get(0));
                }
                procurement.setReceiptNumber(receiptNumber);//注入
                procurement.setProcurementCategory(false);
                if (String.valueOf(data.get(i)[2][0]) != "null") {
                    procurement.setApplyDate(new Date());

                }

                if (String.valueOf(data.get(i)[2][0]) == "null") {
                    procurement.setApplyDate(null);
                }
                if (String.valueOf(data.get(i)[3][2]) != "null") {
                    procurement.setSuppliesCategory(String.valueOf(data.get(i)[3][2]));
                }
                if (String.valueOf(data.get(i)[3][2]) == "null") {
                    procurement.setSuppliesCategory("");//物资类别
                }
                if (String.valueOf(data.get(i)[3][10]) != "null") {
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                    Date date = simpleDateFormat.parse(data.get(i)[3][10].toString().replace("/", "-"));
                    procurement.setDemandTime(date);
                }
                if (String.valueOf(data.get(i)[3][10]) == "null") {
                    procurement.setDemandTime(null);
                }

                if (String.valueOf(data.get(i)[data.get(i).length - 4][3]) != "null") {
                    procurement.setApplyDepartment(String.valueOf(data.get(i)[data.get(i).length - 4][3]));//申请部门
                }
                if (String.valueOf(data.get(i)[data.get(i).length - 4][3]) == "null") {
                    procurement.setApplyDepartment(" ");//申请部门
                }
                if (String.valueOf(data.get(i)[data.get(i).length - 4][11]) != "null") {
                    procurement.setProposer(String.valueOf(data.get(i)[data.get(i).length - 4][11]));//申购部门负责人
                }
                if (String.valueOf(data.get(i)[data.get(i).length - 4][11]) == "null") {
                    procurement.setProposer(" ");//申购部门负责人
                }
                if (String.valueOf(data.get(i)[data.get(i).length - 3][3]) != "null") {
                    procurement.setDivisionHead(String.valueOf(data.get(i)[data.get(i).length - 3][3]));//生产部门分管领导
                }
                if (String.valueOf(data.get(i)[data.get(i).length - 3][3]) == "null") {
                    procurement.setDivisionHead(" ");//生产部门分管领导
                }
                if (String.valueOf(data.get(i)[data.get(i).length - 2][3]) != "null") {
                    procurement.setPurchasingDirector(String.valueOf(data.get(i)[data.get(i).length - 2][3]));//采购部门负责人
                }
                if (String.valueOf(data.get(i)[data.get(i).length - 2][3]) == "null") {
                    procurement.setPurchasingDirector(" ");//采购部门负责人
                }
                if (String.valueOf(data.get(i)[data.get(i).length - 1][3]) != "null") {
                    procurement.setGeneralManager(String.valueOf(data.get(i)[data.get(i).length - 1][3]));//总经理
                }
                if (String.valueOf(data.get(i)[data.get(i).length - 1][3]) == "null") {
                    procurement.setGeneralManager(" ");//总经理
                }


                for (int j = 10; j <= data.get(i).length - 5; j++) {
                    System.out.println("物品名称:" + String.valueOf(data.get(i)[j][1]));
                    if (String.valueOf(data.get(i)[j][1]) != "null") { //当物品名称不为空
                        //创建物资对象
                        Material material = new Material();
                        material.setReceiptNumber(receiptNumber);//设置申请单编号
                        if (String.valueOf(data.get(i)[j][1]) != "null") {
                            material.setSuppliesName(String.valueOf(data.get(i)[j][1]));
                        }
                        if (String.valueOf(data.get(i)[j][1]) == "null") {
                            material.setSuppliesName(" ");
                        }//设置物品名称
                        if (String.valueOf(data.get(i)[j][4]) != "null") {
                            material.setSpecifications(String.valueOf(data.get(i)[j][4]));
                        }
                        if (String.valueOf(data.get(i)[j][4]) == "null") {
                            material.setSpecifications(" ");
                        }//设置规格型号
                        if (String.valueOf(data.get(i)[j][6]) != "null") {
                                  UnitDataItem unitDataItem=new UnitDataItem();
                                  unitDataItem.setDataDictionaryItemId(dictionaryService.getdatadictionaryitemIdByName(String.valueOf(data.get(i)[j][6]),25));
                                     material.setUnitDataItem(unitDataItem);
                                  material.setUnit(Unit.getUnit(String.valueOf(data.get(i)[j][6])));
                        }
                        if (String.valueOf(data.get(i)[j][6]) == "null") {
                            material.setUnitDataItem(null);
                        }//设置单位
                        if (String.valueOf(data.get(i)[j][8]) != "null") {
                            material.setInventory(Float.parseFloat(data.get(i)[j][8].toString()));
                        }
                        if (String.valueOf(data.get(i)[j][8]) == "null") {
                            material.setInventory(0);
                        }//设置库存量
                        if (String.valueOf(data.get(i)[j][9]) != "null") {
                            material.setDemandQuantity(Float.parseFloat(data.get(i)[j][9].toString()));
                        }
                        if (String.valueOf(data.get(i)[j][9]) == "null") {
                            material.setDemandQuantity(0);
                        }//设置需求数量

                        if (String.valueOf(data.get(i)[j][13]) != "null") {
                            material.setNote(String.valueOf(data.get(i)[j][13]));
                        }
                        if (String.valueOf(data.get(i)[j][13]) == "null") {
                            material.setNote(" ");
                        }//设置备注

                        if (String.valueOf(data.get(i)[j][12]) != "null") {
                            material.setPurchaseQuantity(Float.parseFloat(data.get(i)[j][12].toString()));
                        }
                        if (String.valueOf(data.get(i)[j][12]) == "null") {
                            material.setPurchaseQuantity(0);
                        }//设置采购数量
                        procurementService.addMaterial(material);
                    }

                }
                procurementService.add(procurement);

            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败");

        }


        return res.toString();

    }


    /**
     * 获得最早的创建日期 月季
     */
    @RequestMapping("getNewestMouth")
    @ResponseBody
    public String getNewestMouth() {
        JSONObject res = new JSONObject();
        try {
            List<Date> dateList = procurementService.getNewestMouth();
            res.put("status", "success");
            res.put("message", "查询最早创建时间成功");
            res.put("dateList", dateList);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询最早创建时间失败");
        }
        return res.toString();
    }

    /**
     * 获得最早的申请日期 应急
     */
    @RequestMapping("getNewestEm")
    @ResponseBody
    public String getNewestEm() {
        JSONObject res = new JSONObject();
        try {
            List<Date> dateList = procurementService.getNewestEm();
            res.put("status", "success");
            res.put("message", "查询最早创建时间成功");
            res.put("dateList", dateList);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询最早创建时间失败");
        }
        return res.toString();
    }

    //提交采购单
    @RequestMapping("submitProcurementListById")
    @ResponseBody
    public String submitProcurementListById(String receiptNumber){
        JSONObject res=new JSONObject();

        try{
           procurementService.submitProcurementListById(receiptNumber);
            res.put("status", "success");
            res.put("message", "提交成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");
        }
        return res.toString();

    }

    //更新采购明细
    @RequestMapping("updateMaterial")
    @ResponseBody
    public String updateMaterial(@RequestBody Material material){
        JSONObject res=new JSONObject();

        try {
   procurementService.updateMaterial(material);
            res.put("status", "success");
            res.put("message", "更新成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");

        }        return res.toString();

    }

    //获取采购单明细
    @RequestMapping("getProcurement")
    @ResponseBody
    public String getProcurement(){
        JSONObject res=new JSONObject();

        try {
        List<Material> materialList=procurementService.getProcurement();
            res.put("status", "success");
            res.put("message", "采购明细获取成功");
            res.put("data", materialList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "采购明细获取失败");

        }

        return res.toString();
    }


    //采购计划单新增列表高级查询时间
    @RequestMapping("searchNewProcurementPlan")
    @ResponseBody
    public String searchNewProcurementPlan(@RequestBody Material material){
        JSONObject res=new JSONObject();

        try {
            List<Material> materialList=procurementService.searchNewProcurementPlan(material);
            res.put("status", "success");
            res.put("message", "时间查询成功");
            res.put("data", materialList);

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "时间查询失败");
        }

        return res.toString();
    }

    //采购计划单新增页面赋值采购计划单号
    @RequestMapping("getNewestProcurementPlanId")
    @ResponseBody
    public String getNewestProcurementPlanId(){
        Date date=new Date();
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyyMM");
        String prefix=simpleDateFormat.format(date);
       int count=procurementService.getPrefixCount(prefix)+1;

       String number=String.valueOf(count);
       while (number.length()<=3){
           number="0"+number;
       }
       String procurementPlanId=prefix+number;



        return procurementPlanId;
    }


    //添加采购计划单主表
    @RequestMapping("addProcurementPlan")
    @ResponseBody
    public String addProcurementPlan(@RequestBody ProcurementPlan procurementPlan){
        JSONObject res=new JSONObject();

        try {
            procurementService.addProcurementPlan(procurementPlan);
            res.put("status", "success");
            res.put("message", "添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败");
        }

        return res.toString();
    }


    //添加采购计划单字表==>传进来的是采购物资明细为了拿出申购部门
    @RequestMapping("addProcurementPlanItem")
    @ResponseBody
    public String addProcurementPlanItem(@RequestBody Material material){
        JSONObject res=new JSONObject();

        try {
            ProcurementPlanItem procurementPlanItem=new ProcurementPlanItem();
            String receiptNumber=material.getReceiptNumber();

            //更新采购申请的状态为生效中
           // procurementService.updateProcurementState(receiptNumber);
            //根据主键查出申购部门
            String proposer=procurementService.getApplyDepartmentByReceiptNumber(receiptNumber);

            procurementPlanItem.setProcurementPlanId(material.getWareHouseName());//外键
            procurementPlanItem.setProposer(proposer);//申请部门
            procurementPlanItem.setSuppliesName(material.getSuppliesName());//物资名称
            procurementPlanItem.setSpecifications(material.getSpecifications());//规格
            procurementPlanItem.setUnit(material.getUnit());//单位
            procurementPlanItem.setDemandQuantity((int)material.getDemandQuantity());//需求数量
            procurementPlanItem.setRemarks(material.getNote());//备注
            procurementService.addProcurementPlanItem(procurementPlanItem);

            //物资的状态更新为失效
            procurementService.updateMaterialState(material.getId());
            res.put("status", "success");
            res.put("message", "添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败");
        }
        return res.toString();
    }

    //加载采购计划表
    @RequestMapping("getProcurementPlanList")
    @ResponseBody
    public String getProcurementPlanList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            List<ProcurementPlan> procurementPlanList=procurementService.getProcurementPlanList(page);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", procurementPlanList);
        }
        catch (Exception e){

            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
      return res.toString();
    }

    //根据计划单号查询
    @RequestMapping("getProcurementPlanById")
    @ResponseBody
    public String getProcurementPlanById(String procurementPlanId){
        JSONObject res=new JSONObject();

        try {
            List<ProcurementPlan> procurementPlanList=procurementService.getProcurementPlanById(procurementPlanId);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", procurementPlanList.get(0));
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }

        return res.toString();

    }

    //修改采购计划单主表
    @RequestMapping("adjustProcurementPlan")
    @ResponseBody
    public String adjustProcurementPlan(@RequestBody ProcurementPlan procurementPlan){
        JSONObject res=new JSONObject();


        try {
            procurementService.adjustProcurementPlan(procurementPlan);
            res.put("status", "success");
            res.put("message", "修改成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改失败");
        }
        return res.toString();
    }


    //修改采购计划单明细
    @RequestMapping("adjustProcurementPlanItem")
    @ResponseBody
    public String adjustProcurementPlanItem (@RequestBody ProcurementPlanItem procurementPlanItem ){
        JSONObject res=new JSONObject();

        try {
   procurementService.adjustProcurementPlanItem(procurementPlanItem);
            res.put("status", "success");
            res.put("message", "更新成功");
        }
        catch (Exception e){

            e.printStackTrace();

            res.put("status", "fail");

            res.put("message", "更新失败");
        }
     return res.toString();
    }


    //提交采购计划单
    @RequestMapping("submitProcurementPlan")
    @ResponseBody
    public String submitProcurementPlan(String procurementPlanId){
        JSONObject res=new JSONObject();

          try {
              procurementService.submitProcurementPlan(procurementPlanId);
              res.put("status", "success");
              res.put("message", "提交成功");
          }
          catch (Exception e){
              e.printStackTrace();
              res.put("status", "fail");
              res.put("message", "提交失败");

          }
             return res.toString();
    }

    //审批采购单
    @RequestMapping("approvalProcurementPlan")
    @ResponseBody
    public String approvalProcurementPlan(String procurementPlanId,String approvalName,String advice){
        JSONObject res=new JSONObject();


             try {
                   procurementService.approvalProcurementPlan(procurementPlanId, approvalName, advice);
                 res.put("status", "success");
                 res.put("message", "审批通过");
             }
             catch (Exception e){
                 e.printStackTrace();
                 res.put("status", "fail");
                 res.put("message", "审批失败");
             }
           return res.toString();
    }

    //驳回采购计划单
    @RequestMapping("backProcurementPlan")
    @ResponseBody
    public String backProcurementPlan(String procurementPlanId,String advice){
        JSONObject res=new JSONObject();


        try {
            procurementService.backProcurementPlan(procurementPlanId, advice);
            res.put("status", "success");
            res.put("message", "驳回成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
       return res.toString();
    }

    //作废采购计划单
    @RequestMapping("cancelProcurementPlanById")
    @ResponseBody
    public String cancelProcurementPlanById(String procurementPlanId){
        JSONObject res=new JSONObject();

                      try {
                   procurementService.cancelProcurementPlanById(procurementPlanId);
                          res.put("status", "success");
                          res.put("message", "作废成功");
                      }
                      catch (Exception e){
                          e.printStackTrace();
                          res.put("status", "fail");
                          res.put("message", "作废失败");

                      }
          return res.toString();
    }

    //计算采购计划表总数
    @RequestMapping("totalProcurementPlanRecord")
    @ResponseBody
    public int  totalProcurementPlanRecord(){
        return procurementService.totalProcurementPlanRecord();

    }

    //采购计划查询
    @RequestMapping("searchProcurementPlan")
    @ResponseBody
    public String searchProcurementPlan(@RequestBody ProcurementPlan procurementPlan){
        JSONObject res=new JSONObject();

        try {
            List<ProcurementPlan> procurementPlanList=procurementService.searchProcurementPlan(procurementPlan);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", procurementPlanList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }



        return res.toString();
    }

    //采购计划查询计数
    @RequestMapping("searchProcurementPlanCount")
    @ResponseBody
    public int searchProcurementPlanCount(@RequestBody ProcurementPlan procurementPlan){

        return procurementService.searchProcurementPlanCount(procurementPlan);
    }


//    //作废急需物资购置申请表
//    @RequestMapping("cancelEmergencyProcurementById")
//    @ResponseBody
//    public String cancelEmergencyProcurementById(String){
//
//    }
}
