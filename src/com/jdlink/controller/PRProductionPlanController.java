package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ProductionPlan;
import com.jdlink.service.ProductionPlanService;
import com.jdlink.util.DBUtil;
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

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class PRProductionPlanController {
    @Autowired
    ProductionPlanService productionPlanService;

    @RequestMapping("totalProductionPlanRecord")
    @ResponseBody
    public int totalProductionPlanRecord() {
        try {
            return productionPlanService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("searchProductionPlanTotal")
    @ResponseBody
    public int searchProductionPlanTotal(ProductionPlan productionPlan) {
        try {
            return productionPlanService.searchCount(productionPlan);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageProductionPlanList")
    @ResponseBody
    public String loadPageProductionPlanList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<ProductionPlan> productionPlanList = productionPlanService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(productionPlanList.toArray(new ProductionPlan[productionPlanList.size()]));
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
     * 查询功能
     *
     * @param
     * @return
     */
    @RequestMapping("searchProductionPlan")
    @ResponseBody
    public String searchSampleInfo(@RequestBody ProductionPlan productionPlan) {
        JSONObject res = new JSONObject();
        try {
            List<ProductionPlan> productionPlanList = productionPlanService.search(productionPlan);
            JSONArray data = JSONArray.fromArray(productionPlanList.toArray(new ProductionPlan[productionPlanList.size()]));
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

    @RequestMapping("getProductionPlanSeniorSelectedList")
    @ResponseBody
    public String getProductionPlanSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        CheckState[] states = new CheckState[]{CheckState.NewBuild, CheckState.ToExamine, CheckState.Examining, CheckState.Approval, CheckState.Backed, CheckState.Invalid};
        JSONArray stateList = JSONArray.fromArray(states);
        res.put("stateList", stateList);
        return res.toString();
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importProductionPlanExcel")
    @ResponseBody
    public String importProductionPlanExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile);
            ProductionPlan productionPlan = new ProductionPlan();
            for (int i = 1; i < data.length; i++) {
                productionPlan.setId(data[i][0].toString());
               // System.out.println(data[i][0].toString());
                for (int j = 1; j < data[0].length; j++) {
                    productionPlan.setFounder(data[i][j].toString());
                    productionPlan.getAuxiliaryConsumption().setCalcareousLime(Float.parseFloat(data[i][j + 1].toString()));
                    productionPlan.getAuxiliaryConsumption().setWaterReducingAgent(Float.parseFloat(data[i][j + 2].toString()));
                    productionPlan.getAuxiliaryConsumption().setCommonActivatedCarbon(Float.parseFloat(data[i][j + 3].toString()));
                    productionPlan.getAuxiliaryConsumption().setNaclo(Float.parseFloat(data[i][j + 4].toString()));
                    productionPlan.getAuxiliaryConsumption().setActivatedCarbon(Float.parseFloat(data[i][j + 5].toString()));
                    productionPlan.getAuxiliaryConsumption().setStandardBox(Float.parseFloat(data[i][j + 6].toString()));
                    productionPlan.getAuxiliaryConsumption().setActivatedCarbonParticles(Float.parseFloat(data[i][j + 7].toString()));
                    productionPlan.getAuxiliaryConsumption().setWoodenPallets(Float.parseFloat(data[i][j + 8].toString()));
                    productionPlan.getAuxiliaryConsumption().setLye(Float.parseFloat(data[i][j + 9].toString()));
                    productionPlan.getAuxiliaryConsumption().setStandardTray_1m(Float.parseFloat(data[i][j + 10].toString()));
                    productionPlan.getAuxiliaryConsumption().setCausticSoda(Float.parseFloat(data[i][j + 11].toString()));
                    productionPlan.getAuxiliaryConsumption().setStandardTray_1_2m(Float.parseFloat(data[i][j + 12].toString()));
                    productionPlan.getAuxiliaryConsumption().setUrea(Float.parseFloat(data[i][j + 13].toString()));
                    productionPlan.getAuxiliaryConsumption().setSlagBag(Float.parseFloat(data[i][j + 14].toString()));
                    productionPlan.getAuxiliaryConsumption().setHydrochloricAcid(Float.parseFloat(data[i][j + 15].toString()));
                    productionPlan.getAuxiliaryConsumption().setFlyAshBag(Float.parseFloat(data[i][j + 16].toString()));
                    productionPlan.getAuxiliaryConsumption().setNahco3(Float.parseFloat(data[i][j + 17].toString()));
                    productionPlan.getAuxiliaryConsumption().setTonBox(Float.parseFloat(data[i][j + 18].toString()));
                    productionPlan.getAuxiliaryConsumption().setFlour(Float.parseFloat(data[i][j + 29].toString()));
                    productionPlan.getAuxiliaryConsumption().setSteam(Float.parseFloat(data[i][j + 20].toString()));
                    productionPlan.getAuxiliaryConsumption().setDefoamer(Float.parseFloat(data[i][j + 21].toString()));
                    productionPlan.getAuxiliaryConsumption().setDieselOil(Float.parseFloat(data[i][j + 22].toString()));
                    productionPlan.getAuxiliaryConsumption().setFlocculant(Float.parseFloat(data[i][j + 23].toString()));
                    productionPlan.getAuxiliaryConsumption().setNaturalGas(Float.parseFloat(data[i][j + 24].toString()));
                    productionPlan.getAuxiliaryConsumption().setSoftWaterReducingAgent(Float.parseFloat(data[i][j + 25].toString()));
                    productionPlan.getAuxiliaryConsumption().setElectricQuantity(Float.parseFloat(data[i][j + 26].toString()));
                    productionPlan.getAuxiliaryConsumption().setSoftWaterScaleInhibitor(Float.parseFloat(data[i][j + 27].toString()));
                    productionPlan.getAuxiliaryConsumption().setIndustrialWater(Float.parseFloat(data[i][j + 28].toString()));
                    productionPlan.getAuxiliaryConsumption().setpH(Float.parseFloat(data[i][j + 29].toString()));
                    productionPlan.getAuxiliaryConsumption().setTapWaterQuantity(Float.parseFloat(data[i][j + 30].toString()));
                    productionPlan.getAuxiliaryConsumption().setWaterReducingAgent(Float.parseFloat(data[i][j + 31].toString()));
                    productionPlan.setTransportRate(Float.parseFloat(data[i][j + 32].toString()));
                    productionPlan.setPlanQuantity(Float.parseFloat(data[i][j + 33].toString()));
                }
                ProductionPlan productionPlan1 = productionPlanService.getById(productionPlan.getId());
                if (productionPlan1 == null) {
                    //插入新数据
                    productionPlanService.add(productionPlan);
                } else {
                    //根据id更新数据
                    productionPlanService.update(productionPlan);
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
     * 审核通过
     *
     * @param
     * @return
     */
    @RequestMapping("approvalProductionPlan")
    @ResponseBody
    public String approvalProductionPlan(@RequestBody ProductionPlan productionPlan) {
        JSONObject res = new JSONObject();
        try {
            productionPlanService.approval(productionPlan);
            res.put("status", "success");
            res.put("message", "审核通过成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审核通过失败！");
        }
        return res.toString();
    }

    /**
     * 驳回
     *
     * @param
     * @return
     */
    @RequestMapping("rejectProductionPlan")
    @ResponseBody
    public String rejectWayBill(@RequestBody ProductionPlan productionPlan) {
        JSONObject res = new JSONObject();
        try {
            productionPlanService.reject(productionPlan);
            res.put("status", "success");
            res.put("message", "审核驳回成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审核驳回失败！");
        }
        return res.toString();
    }

    /**
     * 提交
     *
     * @param id
     * @return
     */
    @RequestMapping("submitProductionPlan")
    @ResponseBody
    public String submitProductionPlan(String id) {
        JSONObject res = new JSONObject();
        try {
            productionPlanService.submit(id);
            res.put("status", "success");
            res.put("message", "提交成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败！");
        }
        return res.toString();
    }

    /**
     * 作废
     *
     * @param id
     * @return
     */
    @RequestMapping("invalidProductionPlan")
    @ResponseBody
    public String invalidProductionPlan(String id) {
        JSONObject res = new JSONObject();
        try {
            productionPlanService.invalid(id);
            res.put("status", "success");
            res.put("message", "作废成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败！");
        }
        return res.toString();
    }

    /**
     * 确认
     *
     * @param id
     * @return
     */
    @RequestMapping("confirmProductionPlan")
    @ResponseBody
    public String confirmProductionPlan(String id) {
        JSONObject res = new JSONObject();
        try {
            productionPlanService.confirm(id);
            res.put("status", "success");
            res.put("message", "确认成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "确认失败！");
        }
        return res.toString();
    }

    @RequestMapping("getProductionPlan")
    @ResponseBody
    public String getProductionPlan(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            ProductionPlan productionPlan = productionPlanService.getById(id);
            //新建一个对象并给它赋值
            JSONObject data = JSONObject.fromBean(productionPlan);
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
     * 删除
     *
     * @param id
     * @return
     */
    @RequestMapping("deleteProductionPlan")
    @ResponseBody
    public String deleteProductionPlan(String id) {
        JSONObject res = new JSONObject();
        try {
            productionPlanService.delete(id);
            res.put("status", "success");
            res.put("message", "删除成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "删除失败！");
        }
        return res.toString();
    }

    @RequestMapping("addProductionPlan")
    @ResponseBody
    public String addProductionPlan(@RequestBody ProductionPlan productionPlan) {
        JSONObject res = new JSONObject();
        try {
            productionPlanService.add(productionPlan);
            res.put("status", "success");
            res.put("message", "保存成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "保存失败！");
        }
        return res.toString();
    }

    /**
     * 获取目前的产量计划单号
     *
     * @return
     */
    @RequestMapping("getCurrentProductionPlanId")
    @ResponseBody
    public String getCurrentProductionPlanId() {
        JSONObject res = new JSONObject();
        try {
            // 生成预约号
            Date date = new Date();   //获取当前时间
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
            String prefix = simpleDateFormat.format(date);
            int count = productionPlanService.countById(prefix) + 1;
            String suffix;
            if (count <= 9) suffix = "0" + count;
            else suffix = count + "";
            String id = RandomUtil.getAppointId(prefix, suffix);
            // 确保编号唯一
            while (productionPlanService.getById(id) != null) {
                int index = Integer.parseInt(id);
                index += 1;
                id = index + "";
            }
            res.put("id", id);
        } catch (Exception e) {
            e.printStackTrace();

        }
        return res.toString();
    }

    @RequestMapping("updateProductionPlan")
    @ResponseBody
    public String updateProductionPlan(@RequestBody ProductionPlan productionPlan) {
        JSONObject res = new JSONObject();
        try {
            productionPlanService.update(productionPlan);
            res.put("status", "success");
            res.put("message", "修改成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改失败！");
        }
        return res.toString();
    }
}

