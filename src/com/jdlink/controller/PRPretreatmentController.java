package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Inventory.RecordState;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.PretreatmentService;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PRPretreatmentController {

    @Autowired
    PretreatmentService pretreatmentService;

    @RequestMapping("addPretreatment")
    @ResponseBody
    public String addPretreatment(@RequestBody Pretreatment pretreatment) {
        JSONObject res = new JSONObject();
        try {
            pretreatmentService.add(pretreatment);
            res.put("status", "success");
            res.put("message", "添加成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败！");
        }
        return res.toString();
    }


    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalPretreatmentRecord")
    @ResponseBody
    public int totalPretreatmentRecord() {
        try {
            return pretreatmentService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPagePretreatmentList")
    @ResponseBody
    public String loadPagePretreatmentList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<Pretreatment> pretreatmentList = pretreatmentService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(pretreatmentList.toArray(new Pretreatment[pretreatmentList.size()]));
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

    @RequestMapping("getPretreatmentById")
    @ResponseBody
    public String getPretreatmentById(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            Pretreatment pretreatment = pretreatmentService.getById(id);
            //新建一个对象并给它赋值
            JSONObject data = JSONObject.fromBean(pretreatment);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /**
     * 获取目前的预处理单号
     *
     * @return
     */
    @RequestMapping("getCurrentPretreatmentId")
    @ResponseBody
    public String getCurrentPretreatmentId() {
        String id = pretreatmentService.getCurrentPretreatmentId();
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importPretreatmentExcel")
    @ResponseBody
    public String importPretreatmentExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile);
            {
                System.out.println("数据如下：");
                for (int i = 1; i < data.length; i++) {
                    for (int j = 0; j < data[0].length; j++) {
                        System.out.print(data[i][j].toString());
                        System.out.print(",");
                    }
                    System.out.println();
                }
            }
            Map<String, Pretreatment> map = new HashMap<>();
            //累加数据初始化
            float weightTotal = 0;
            float calorificTotal = 0;
            float ashPercentageTotal = 0;
            float wetPercentageTotal = 0;
            float volatileNumberTotal = 0;
            float chlorinePercentageTotal = 0;
            float sulfurPercentageTotal = 0;
            float phTotal = 0;
            float phosphorusPercentageTotal = 0;
            float fluorinePercentageTotal = 0;
            float distillationProportion = 0;
            float wasteLiquidProportion = 0;
            float sludgeProportion = 0;
            float bulkProportion = 0;
            float crushingProportion = 0;
            float suspensionProportion = 0;
            int serialNumber = 0;
            List<PretreatmentItem> pretreatmentItemList = new ArrayList<>();
            System.out.println("长度" + data.length);
            for (int i = 1; i < data.length; i++) {
                //map内不存在即添加公共数据，存在即添加List内数据
                if (!map.keySet().contains(data[i][0].toString())) {
                    map.put(data[i][0].toString(), new Pretreatment());
                    map.get(data[i][0].toString()).setId(data[i][0].toString());
                    map.get(data[i][0].toString()).setRemarks(data[i][1].toString());
                    //新存储一个id对象时，将累计数据清零
                    pretreatmentItemList = new ArrayList<>();
                    weightTotal = 0;
                    calorificTotal = 0;
                    ashPercentageTotal = 0;
                    wetPercentageTotal = 0;
                    volatileNumberTotal = 0;
                    chlorinePercentageTotal = 0;
                    sulfurPercentageTotal = 0;
                    phTotal = 0;
                    phosphorusPercentageTotal = 0;
                    fluorinePercentageTotal = 0;
                    distillationProportion = 0;
                    wasteLiquidProportion = 0;
                    sludgeProportion = 0;
                    bulkProportion = 0;
                    crushingProportion = 0;
                    suspensionProportion = 0;
                    serialNumber = 0;
                }
                PretreatmentItem pretreatmentItem = new PretreatmentItem();
                pretreatmentItem.setPretreatmentId(data[i][0].toString());
                int itemId = pretreatmentService.getCurrentItemId();
                itemId += i - 1;
                serialNumber += 1;
                pretreatmentItem.setSerialNumber(serialNumber);
                pretreatmentItem.setItemId(itemId);
                pretreatmentItem.setProduceCompanyName(data[i][2].toString());
                pretreatmentItem.setRequirements(data[i][4].toString());
                pretreatmentItem.setProportion(Float.parseFloat(data[i][7].toString()));
                System.out.println("proportion" + Float.parseFloat(data[i][7].toString()));
                Wastes wastes = new Wastes();
                wastes.setName(data[i][3].toString());
                wastes.setHandleCategory(HandleCategory.getHandleCategory(data[i][5].toString()));
                wastes.setProcessWay(ProcessWay.getProcessWay(data[i][6].toString()));
                wastes.setWeight(Float.parseFloat(data[i][8].toString()));
                wastes.setVolatileNumber(Float.parseFloat(data[i][9].toString()));
                wastes.setCalorific(Float.parseFloat(data[i][10].toString()));
                wastes.setAshPercentage(Float.parseFloat(data[i][11].toString()));
                wastes.setWetPercentage(Float.parseFloat(data[i][12].toString()));
                wastes.setChlorinePercentage(Float.parseFloat(data[i][13].toString()));
                wastes.setSulfurPercentage(Float.parseFloat(data[i][14].toString()));
                wastes.setPh(Float.parseFloat(data[i][15].toString()));
                wastes.setPhosphorusPercentage(Float.parseFloat(data[i][16].toString()));
                wastes.setFluorinePercentage(Float.parseFloat(data[i][17].toString()));
                wastes.setRemarks(data[i][18].toString());
                pretreatmentItem.setWastes(wastes);
                pretreatmentItemList.add(pretreatmentItem);
                map.get(data[i][0].toString()).setPretreatmentItemList(pretreatmentItemList);
                weightTotal += Float.parseFloat(data[i][8].toString());
                volatileNumberTotal += Float.parseFloat(data[i][9].toString());
                calorificTotal += Float.parseFloat(data[i][10].toString());
                ashPercentageTotal += Float.parseFloat(data[i][11].toString());
                wetPercentageTotal += Float.parseFloat(data[i][12].toString());
                chlorinePercentageTotal += Float.parseFloat(data[i][13].toString());
                sulfurPercentageTotal += Float.parseFloat(data[i][14].toString());
                phTotal += Float.parseFloat(data[i][15].toString());
                phosphorusPercentageTotal += Float.parseFloat(data[i][16].toString());
                fluorinePercentageTotal += Float.parseFloat(data[i][17].toString());
                if (data[i][5].toString().equals("精馏残渣") || data[i][5].toString().equals("Distillation"))
                    distillationProportion += Float.parseFloat(data[i][7].toString());
                if (data[i][5].toString().equals("废液") || data[i][5].toString().equals("WasteLiquid"))
                    wasteLiquidProportion += Float.parseFloat(data[i][7].toString());
                if (data[i][5].toString().equals("污泥") || data[i][5].toString().equals("Sludge"))
                    sludgeProportion += Float.parseFloat(data[i][7].toString());
                if (data[i][5].toString().equals("散装料") || data[i][5].toString().equals("Bulk"))
                    bulkProportion += Float.parseFloat(data[i][7].toString());
                if (data[i][5].toString().equals("破碎料") || data[i][5].toString().equals("Crushing"))
                    crushingProportion += Float.parseFloat(data[i][7].toString());
                if (data[i][5].toString().equals("悬挂连") || data[i][5].toString().equals("Suspension"))
                    suspensionProportion += Float.parseFloat(data[i][7].toString());
                map.get(data[i][0].toString()).setWeightTotal(weightTotal);
                map.get(data[i][0].toString()).setVolatileNumberTotal(volatileNumberTotal);
                map.get(data[i][0].toString()).setCalorificTotal(calorificTotal);
                map.get(data[i][0].toString()).setAshPercentageTotal(ashPercentageTotal);
                map.get(data[i][0].toString()).setWetPercentageTotal(wetPercentageTotal);
                map.get(data[i][0].toString()).setChlorinePercentageTotal(chlorinePercentageTotal);
                map.get(data[i][0].toString()).setSulfurPercentageTotal(sulfurPercentageTotal);
                map.get(data[i][0].toString()).setPhTotal(phTotal);
                map.get(data[i][0].toString()).setPhosphorusPercentageTotal(phosphorusPercentageTotal);
                map.get(data[i][0].toString()).setFluorinePercentageTotal(fluorinePercentageTotal);
                map.get(data[i][0].toString()).setDistillationProportion(distillationProportion);
                map.get(data[i][0].toString()).setWasteLiquidProportion(wasteLiquidProportion);
                map.get(data[i][0].toString()).setSludgeProportion(sludgeProportion);
                map.get(data[i][0].toString()).setBulkProportion(bulkProportion);
                map.get(data[i][0].toString()).setCrushingProportion(crushingProportion);
                map.get(data[i][0].toString()).setSuspensionProportion(suspensionProportion);
            }
            for (String key : map.keySet()) {
                Pretreatment pretreatment1 = pretreatmentService.getById(map.get(key).getId());
                Pretreatment pretreatment = map.get(key);
                if (pretreatment1 == null) {
                    //插入新数据
                    pretreatmentService.add(pretreatment);
                } else {
                    //根据id更新数据
                    pretreatmentService.update(pretreatment);
                }
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();
    }

    /**
     * 获取预处理单状态列表
     *
     * @return
     */
    @RequestMapping("getPretreatmentStateList")
    @ResponseBody
    public String getPretreatmentStateList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        CheckState[] states = new CheckState[]{CheckState.NewBuild, CheckState.Confirm, CheckState.Invalid};
        JSONArray stateList = JSONArray.fromArray(states);
        res.put("stateList", stateList);
        return res.toString();
    }

    /**
     * 获取处置方式、进料方式列表
     *
     * @param
     * @return
     */
    @RequestMapping("getPretreatmentSelectedList")
    @ResponseBody
    public String getPretreatmentSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        ProcessWay[] processWays = new ProcessWay[]{ProcessWay.Burning, ProcessWay.Landfill};
        JSONArray processWaysList = JSONArray.fromArray(processWays);
        HandleCategory[] handleCategories = new HandleCategory[]{HandleCategory.Sludge, HandleCategory.WasteLiquid, HandleCategory.Bulk, HandleCategory.Crushing, HandleCategory.Distillation, HandleCategory.Suspension};
        JSONArray handleCategoryList = JSONArray.fromArray(handleCategories);
        res.put("handleCategoryList", handleCategoryList);
        res.put("processWayList", processWaysList);
        return res.toString();
    }

    /**
     * 搜索计总
     *
     * @param pretreatment
     * @return
     */
    @RequestMapping("searchPretreatmentTotal")
    @ResponseBody
    public int searchPretreatmentTotal(@RequestBody Pretreatment pretreatment) {
        try {
            return pretreatmentService.searchCount(pretreatment);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param
     * @return
     */
    @RequestMapping("searchPretreatment")
    @ResponseBody
    public String searchPretreatment(@RequestBody Pretreatment pretreatment) {
        JSONObject res = new JSONObject();
        try {
            List<Pretreatment> pretreatmentList = pretreatmentService.search(pretreatment);
            JSONArray data = JSONArray.fromArray(pretreatmentList.toArray(new Pretreatment[pretreatmentList.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    /**
     * 作废功能
     *
     * @param id
     * @return
     */
    @RequestMapping("invalidPretreatment")
    @ResponseBody
    public String invalidPretreatment(String id) {
        JSONObject res = new JSONObject();
        try {
            pretreatmentService.invalid(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }

    @RequestMapping("adjustPretreatment")
    @ResponseBody
    public String adjustPretreatment(@RequestBody Pretreatment pretreatment) {
        JSONObject res = new JSONObject();
        try {
            //重新计算比例
            float sludgeProportion = 0;
            float wasteLiquidProportion = 0;
            float bulkProportion = 0;
            float crushingProportion = 0;
            float distillationProportion = 0;
            float suspensionProportion = 0;
            for(PretreatmentItem pretreatmentItem : pretreatment.getPretreatmentItemList()){
               HandleCategory handleCategory = pretreatmentItem.getWastes().getHandleCategory();
                if(handleCategory.getName() == "污泥" || handleCategory.getIndex() == 1)
                    sludgeProportion += pretreatmentItem.getProportion();
                if(handleCategory.getName() == "废液" || handleCategory.getIndex() == 2)
                    wasteLiquidProportion += pretreatmentItem.getProportion();
                if(handleCategory.getName() == "散装料" || handleCategory.getIndex() == 3)
                    bulkProportion += pretreatmentItem.getProportion();
                if(handleCategory.getName() == "破碎料" || handleCategory.getIndex() == 4)
                    crushingProportion += pretreatmentItem.getProportion();
                if(handleCategory.getName() == "精馏残渣" || handleCategory.getIndex() == 5)
                    distillationProportion += pretreatmentItem.getProportion();
                if(handleCategory.getName() == "悬挂连" || handleCategory.getIndex() == 6)
                    suspensionProportion += pretreatmentItem.getProportion();
            }
            pretreatment.setSludgeProportion(sludgeProportion);
            pretreatment.setWasteLiquidProportion(wasteLiquidProportion);
            pretreatment.setBulkProportion(bulkProportion);
            pretreatment.setCrushingProportion(crushingProportion);
            pretreatment.setDistillationProportion(distillationProportion);
            pretreatment.setSuspensionProportion(suspensionProportion);
            pretreatmentService.adjust(pretreatment);
            res.put("status", "success");
            res.put("message", "属性调整成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "属性调整失败");
        }
        return res.toString();
    }

    @RequestMapping("loadPretreatmentList")
    @ResponseBody
    public String loadPretreatmentList() {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<Pretreatment> pretreatmentList = pretreatmentService.list();
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(pretreatmentList.toArray(new Pretreatment[pretreatmentList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "预处理单列表获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "预处理单列表获取失败！");
        }
        // 返回结果
        return res.toString();
    }
    /**
     * 获取记录状态、单据状态列表
     *
     * @param
     * @return
     */
    @RequestMapping("setOutBoundOrderSeniorSelectedList")
    @ResponseBody
    public String setOutBoundOrderSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        CheckState[] checkState = new CheckState[]{CheckState.NewBuild,CheckState.ToPick,CheckState.Picked,CheckState.Invalid};
        JSONArray checkStateList = JSONArray.fromArray(checkState);
        RecordState[] recordState = new RecordState[]{RecordState.Delete, RecordState.Usable, RecordState.Disabled};
        JSONArray recordStateList = JSONArray.fromArray(recordState);
        res.put("checkStateList", checkStateList);
        res.put("recordStateList", recordStateList);
        return res.toString();
    }



}
