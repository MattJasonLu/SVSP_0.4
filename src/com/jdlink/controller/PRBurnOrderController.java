package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.BurnOrderService;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class PRBurnOrderController {
    @Autowired
    BurnOrderService burnOrderService;

    /**
     * 获取当前焚烧单编号
     *
     * @return
     */
    @RequestMapping("getCurrentBurnOrderId")
    @ResponseBody
    public String getCurrentBurnOrderId() {
        // 生成焚烧工单号 yyyyMM00000
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMM");
        String prefix = simpleDateFormat.format(date);
        int count = burnOrderService.countById(prefix) + 1;
        String suffix;
        if (count <= 9) suffix = "0000" + count;
        else if (count > 9 && count <= 99) suffix = "000" + count;
        else if (count > 99 && count <= 999) suffix = "00" + count;
        else if (count > 999 && count <= 9999) suffix = "0" + count;
        else suffix = "" + count;
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (burnOrderService.getById(id) != null) {
            System.out.println("查询的数据为：");
            System.out.println(burnOrderService.getById(id).getId());
            int index = Integer.parseInt(suffix);
            index += 1;
            if (index <= 9) suffix = "0000" + index;
            else if (index > 9 && index <= 99) suffix = "000" + index;
            else if (index > 99 && index <= 999) suffix = "00" + index;
            else if (index > 999 && index <= 9999) suffix = "0" + index;
            else suffix = "" + index;
            id = RandomUtil.getAppointId(prefix, suffix);
            System.out.println(id);
        }
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    /**
     * 根据Id获取对象数据
     *
     * @param id
     * @return
     */
    @RequestMapping("getBurnOrderById")
    @ResponseBody
    public String getBurnOrderById(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            BurnOrder burnOrder = burnOrderService.getById(id);
            //新建一个对象并给它赋值
            JSONObject data = JSONObject.fromBean(burnOrder);
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

    @RequestMapping("updateTemporaryAddressById")
    @ResponseBody
    public String updateTemporaryAddressById(@RequestBody Pretreatment pretreatment) {
        JSONObject res = new JSONObject();
        try {
            burnOrderService.updateTemporaryAddressById(pretreatment);
            res.put("status", "success");
            res.put("message", "暂存点更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "暂存点更新失败");
        }
        return res.toString();
    }

    @RequestMapping("insertNewBurnOrder")
    @ResponseBody
    public String updateNewBurnOrder(@RequestBody BurnOrder burnOrder) {
        JSONObject res = new JSONObject();
        try {
            burnOrderService.add(burnOrder);
            res.put("status", "success");
            res.put("message", "新建焚烧单数据更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "新建焚烧单数据更新失败");
        }
        return res.toString();
    }

    /////////////////////////////焚烧单列表页面///////////////////////
    @RequestMapping("loadPageBurnOrderList")
    @ResponseBody
    public String loadPageBurnOrderList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<BurnOrder> burnOrderList = burnOrderService.listPage(page);
            JSONArray data = JSONArray.fromArray(burnOrderList.toArray(new BurnOrder[burnOrderList.size()]));
            res.put("data", data);
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
    @RequestMapping("totalBurnOrderRecord")
    @ResponseBody
    public int totalBurnOrderRecord() {
        try {
            return burnOrderService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importBurnOrderExcel")
    @ResponseBody
    public String importBurnOrderExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            System.out.println("数据如下：");
            for (int i = 1; i < data.length; i++) {
                for (int j = 0; j < data[0].length; j++) {
                    System.out.print(data[i][j].toString());
                    System.out.print(",");
                }
                System.out.println();
            }
        Map<String, BurnOrder> map = new HashMap<>();
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
        for (int i = 1; i < data.length; i++) {
            //map内不存在即添加公共数据，存在即添加List内数据
            if (!map.keySet().contains(data[i][0].toString())) {
                map.put(data[i][0].toString(), new BurnOrder());
                map.get(data[i][0].toString()).setId(data[i][0].toString());
                map.get(data[i][0].toString()).setPretreatmentId("导入数据");
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
            int itemId = burnOrderService.getCurrentItemId();
            itemId += i - 1;
            serialNumber += 1;
            pretreatmentItem.setSerialNumber(serialNumber);
            pretreatmentItem.setItemId(itemId);
            pretreatmentItem.setProduceCompanyName(data[i][2].toString());
            pretreatmentItem.setRequirements(data[i][4].toString());
            pretreatmentItem.setProportion(Float.parseFloat(data[i][7].toString()));
            pretreatmentItem.setTemporaryAddress(data[i][19].toString());
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
            BurnOrder burnOrder1 = burnOrderService.getById(map.get(key).getId());
            BurnOrder burnOrder = map.get(key);
            if (burnOrder1 == null) {
                //插入新数据
                burnOrderService.add(burnOrder);
            } else {
                //根据id更新数据
                burnOrderService.update(burnOrder);
            }
        }
        res.put("status", "success");
        res.put("message", "导入成功");
    } catch(
    Exception e)

    {
        e.printStackTrace();
        res.put("status", "fail");
        res.put("message", "导入失败，请重试！");
    }
        return res.toString();
}

    /**
     * 获取查询总数
     *
     * @param burnOrder
     * @return
     */
    @RequestMapping("searchBurnOrderTotal")
    @ResponseBody
    public int searchWayBillTotal(@RequestBody BurnOrder burnOrder) {
        try {
            return burnOrderService.searchCount(burnOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param burnOrder
     * @return
     */
    @RequestMapping("searchBurnOrder")
    @ResponseBody
    public String search(@RequestBody BurnOrder burnOrder) {
        JSONObject res = new JSONObject();
        try {
            System.out.println(burnOrder.getPretreatmentId());
            List<BurnOrder> burnOrderList = burnOrderService.search(burnOrder);
            JSONArray data = JSONArray.fromArray(burnOrderList.toArray(new BurnOrder[burnOrderList.size()]));
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
    @RequestMapping("invalidBurnOrder")
    @ResponseBody
    public String invalidBurnOrder(String id) {
        JSONObject res = new JSONObject();
        try {
            burnOrderService.invalid(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }

}
