package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Inventory.BoundType;
import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.*;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/9/11.
 * DoubleClickTo 666
 */
@Controller
public class ProductionDailyController {

    @Autowired
    InboundService inboundService;
    @Autowired
    OutboundOrderService outboundOrderService;
    @Autowired
    MedicalWastesService medicalWastesService;
    @Autowired
    IngredientsService ingredientsService;
    @Autowired
    EquipmentService equipmentService;
    @Autowired
    ProductionDailyService productionDailyService;

    /**
     * 获取总记录数
     * @return 总记录数
     */
    @RequestMapping("getProductionDailyCount")
    @ResponseBody
    public int getProductionDailyCount(){
        try {
            return productionDailyService.getProductionDailyCount();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取日期范围数量
     * @param beginTime 起始日期
     * @param endTime 结束日期
     * @return 数量
     */
    @RequestMapping("getProductionDailyByDateRangeCount")
    @ResponseBody
    public int getProductionDailyByDateRangeCount(Date beginTime, Date endTime) {
        try {
            return productionDailyService.getProductionDailyByDateRangeCount(beginTime, endTime);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 设置日报的状态
     * @param id 编号
     * @param checkState 审批状态
     * @return 成功与否
     */
    @RequestMapping("setProductionDailyState")
    @ResponseBody
    public String setProductionDailyState(int id, CheckState checkState) {
        JSONObject res = new JSONObject();
        try {
            productionDailyService.setProductionDailyState(id, checkState);
            res.put("status", "success");
            res.put("message", "设置状态成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "设置状态失败");
        }
        return res.toString();
    }

    /**
     * 通过页数获取日报页数
     * @return 成功与否
     */
    @RequestMapping("listProductionDailyByPage")
    @ResponseBody
    public String listProductionDailyByPage(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<ProductionDaily> productionDailyList = productionDailyService.listProductionDailyByPage(page);
            JSONArray data = JSONArray.fromArray(productionDailyList.toArray(new ProductionDaily[productionDailyList.size()]));
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

    @RequestMapping("searchProductionDaily")
    @ResponseBody
    public String searchProductionDaily(@RequestBody ProductionDaily productionDaily) {
        JSONObject res = new JSONObject();
        try {
            List<ProductionDaily> productionDailyList = productionDailyService.searchProductionDaily(productionDaily);
            JSONArray data = JSONArray.fromArray(productionDailyList.toArray(new ProductionDaily[productionDailyList.size()]));
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
     * 查询生产日报数量
     * @param productionDaily 生产日报参数
     * @return 数量
     */
    @RequestMapping("searchProductionDailyCount")
    @ResponseBody
    public int searchProductionDailyCount(@RequestBody ProductionDaily productionDaily) {
        try {
            return productionDailyService.searchProductionDailyCount(productionDaily);
        } catch(Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 通过编号获取日报
     * @param id 编号
     * @return 日报
     */
    @RequestMapping("getProductionDailyById")
    @ResponseBody
    public String getProductionDailyById(String id) {
        JSONObject res = new JSONObject();
        try {
            ProductionDaily productionDaily = productionDailyService.getProductionDailyById(Integer.parseInt(id));
            JSONObject data = JSONObject.fromBean(productionDaily);
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
     * 生成当天日报
     * @return 生成的日报数据
     */
    @RequestMapping("generateProductionDaily")
    @ResponseBody
    public String generateProductionDaily() {
        JSONObject res = new JSONObject();
        // 获取当天日期
        Date now = new Date();
        // 创建一个新的生产日报
        ProductionDaily productionDaily = new ProductionDaily();
        // 设置编号
        productionDaily.setId(productionDailyService.getProductionDailyId());
        // 设置时间
        productionDaily.setDate(now);
        try {
            // 对日报进行计算
            calculateProductionDaily(now, productionDaily);
            productionDaily.setCheckState(CheckState.NewBuild);
            // 增加日报
            productionDailyService.addProductionDaily(productionDaily);
            // 回送数据
            JSONObject data = JSONObject.fromBean(productionDaily);
            res.put("status", "success");
            res.put("message", "生成日报成功");
            res.put("data", data);
        }
        catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "生成日报失败");
        }
        return  res.toString();
    }

    /**
     * 导入生产日报
     * @param excelFile
     * @return
     */
    @RequestMapping("importProductionDailyExcel")
    @ResponseBody
    public String importProductionDailyExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            // 获取危废入库的表格数据
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
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
     * 计算日报
     * @param id 日报编号
     * @return 计算成功与否
     */
    @RequestMapping("calculateProductionDaily")
    @ResponseBody
    public String calculate(int id) {
        JSONObject res = new JSONObject();
        try {
            ProductionDaily productionDaily = productionDailyService.getProductionDailyById(id);
            ProductionDaily newProductionDaily = new ProductionDaily();
            newProductionDaily.setId(productionDaily.getId());
            newProductionDaily.setDate(productionDaily.getDate());
            newProductionDaily.setCheckState(CheckState.NewBuild);
            calculateProductionDaily(productionDaily.getDate(), newProductionDaily);
            // 删除日报
            productionDailyService.deleteProductionDaily(id);
            // 增加日报
            productionDailyService.addProductionDaily(newProductionDaily);
            res.put("status", "success");
            res.put("message", "日报计算完成");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "日报计算失败");
        }
        return res.toString();
    }

    /**
     * 计算日报
     * @param now 时间
     * @param productionDaily 日报
     */
    private void calculateProductionDaily(Date now, ProductionDaily productionDaily) {
        // 获取当天的医废
        List<MedicalWastes> medicalWastesList = medicalWastesService.getMedicalWastesByRange(now, now);
        float todayDisposalMedicalWastes = 0f;
        float todayDisposalMedicalWastesDisposalDirect = 0f;
        float todayDisposalMedicalWastesCooking = 0f;
        float todayDisposalMedicalWastesAfterCooking = 0f;
        float todayDisposalMedicalWastesAfterCookingInbound = 0f;
        float todayDisposalMedicalWastesAfterCookingSend = 0f;
        for (MedicalWastes medicalWastes : medicalWastesList) {
            // 本日进厂医废
            todayDisposalMedicalWastes += medicalWastes.getThisMonthWastes();
            todayDisposalMedicalWastesDisposalDirect += medicalWastes.getDirectDisposal();
            todayDisposalMedicalWastesCooking += medicalWastes.getCookingWastes();
            todayDisposalMedicalWastesAfterCooking += medicalWastes.getAfterCookingNumber();
            todayDisposalMedicalWastesAfterCookingInbound += medicalWastes.getAfterCookingInbound();
            todayDisposalMedicalWastesAfterCookingSend += medicalWastes.getThisMonthSendCooking();
        }
        // 处置系统运行说明-医废信息
        productionDaily.setTodayDisposalMedicalWastes(todayDisposalMedicalWastes);
        productionDaily.setTodayDisposalMedicalWastesDisposalDirect(todayDisposalMedicalWastesDisposalDirect);
        productionDaily.setTodayDisposalMedicalWastesCooking(todayDisposalMedicalWastesCooking);
        productionDaily.setTodayDisposalMedicalWastesAfterCooking(todayDisposalMedicalWastesAfterCooking);
        productionDaily.setTodayDisposalMedicalWastesAfterCookingInbound(todayDisposalMedicalWastesAfterCookingInbound);
        productionDaily.setTodayDisposalMedicalWastesAfterCookingSend(todayDisposalMedicalWastesAfterCookingSend);
        productionDaily.setTodayDisposalMedicalWastesErrorNumber(todayDisposalMedicalWastes-todayDisposalMedicalWastesDisposalDirect-todayDisposalMedicalWastesCooking);
        productionDaily.setTodayDisposalMedicalWastesWetNumber(todayDisposalMedicalWastesCooking-todayDisposalMedicalWastesAfterCooking);
        // 危废废物进厂（产生）量
        productionDaily.setTodayInboundMedicalWastes(productionDaily.getTodayDisposalMedicalWastes());
        productionDaily.setTodayInboundMedicalWastesCooking(productionDaily.getTodayDisposalMedicalWastesCooking());
        productionDaily.setTodayInboundMedicalWastesErrorNumber(productionDaily.getTodayDisposalMedicalWastesErrorNumber());
        productionDaily.setTodayInboundMedicalWastesAfterCooking(productionDaily.getTodayDisposalMedicalWastesAfterCooking());
        productionDaily.setTodayInboundMedicalWastesAfterCookingInbound(productionDaily.getTodayDisposalMedicalWastesAfterCookingInbound());
        productionDaily.setTodayInboundMedicalWastesWetNumber(productionDaily.getTodayDisposalMedicalWastesWetNumber());
        // 危废废物处置（转移）量
        productionDaily.setTodayOutboundMedicalWastes(productionDaily.getTodayDisposalMedicalWastesDisposalDirect()+productionDaily.getTodayDisposalMedicalWastesCooking()+productionDaily.getTodayDisposalMedicalWastesErrorNumber());
        productionDaily.setTodayOutboundMedicalWastesDirectDisposal(productionDaily.getTodayDisposalMedicalWastesDisposalDirect());
        productionDaily.setTodayOutboundMedicalWastesCooking(productionDaily.getTodayInboundMedicalWastesCooking()+productionDaily.getTodayInboundMedicalWastesErrorNumber());
        productionDaily.setTodayOutboundMedicalWastesAfterCooking(productionDaily.getTodayDisposalMedicalWastesAfterCooking());

        // 工废处置系统
        float disposalBulk = 0f;
        float disposalCrushing = 0f;
        float disposalSludge = 0f;
        float disposalDistillation = 0f;
        float disposalSuspension = 0f;
        float disposalWasteLiquid = 0f;
        float disposalMedicalWastes = 0f;
        List<OutboundOrder> outboundA2OrderList = outboundOrderService.getOutBoundByDateAndEquipment(now, "A2");
        for (OutboundOrder outboundOrder : outboundA2OrderList) {
            if (!outboundOrder.getBoundType().equals(BoundType.WasteOutbound)) continue;
            HandleCategory handelCategory = outboundOrder.getHandelCategory();
            switch (handelCategory) {
                case Bulk:
                    disposalBulk += outboundOrder.getOutboundNumber();
                    break;
                case Crushing:
                    disposalCrushing += outboundOrder.getOutboundNumber();
                    break;
                case Sludge:
                    disposalSludge += outboundOrder.getOutboundNumber();
                    break;
                case Distillation:
                    disposalDistillation += outboundOrder.getOutboundNumber();
                    break;
                case Suspension:
                    disposalSuspension += outboundOrder.getOutboundNumber();
                    break;
                case WasteLiquid:
                    disposalWasteLiquid += outboundOrder.getOutboundNumber();
                    break;
            }
        }
        List<MedicalWastes> medicalWastesA2List = medicalWastesService.getMedicalWastesBySimpleDateAndEquipment(now, "A2");
        for (MedicalWastes medicalWastes : medicalWastesA2List) {
            disposalMedicalWastes += medicalWastes.getWastesAmount();
        }

        productionDaily.setTodayOutboundA2WastesBulk(disposalBulk);
        productionDaily.setTodayOutboundA2WastesCrushing(disposalCrushing);
        productionDaily.setTodayOutboundA2WastesSludge(disposalSludge);
        productionDaily.setTodayOutboundA2WastesDistillation(disposalDistillation);
        productionDaily.setTodayOutboundA2WastesSuspension(disposalSuspension);
        productionDaily.setTodayOutboundA2WastesWasteLiquid(disposalWasteLiquid);
        productionDaily.setTodayOutboundA2MedicalWastes(disposalMedicalWastes);


        // 备2
        disposalBulk = 0f;
        disposalCrushing = 0f;
        disposalSludge = 0f;
        disposalDistillation = 0f;
        disposalSuspension = 0f;
        disposalWasteLiquid = 0f;
        disposalMedicalWastes = 0f;

        List<OutboundOrder> outboundPrepare2OrderList = outboundOrderService.getOutBoundByDateAndEquipment(now, "Prepare2");
        for (OutboundOrder outboundOrder : outboundPrepare2OrderList) {
            if (!outboundOrder.getBoundType().equals(BoundType.WasteOutbound)) continue;
            HandleCategory handelCategory = outboundOrder.getHandelCategory();
            switch (handelCategory) {
                case Bulk:
                    disposalBulk += outboundOrder.getOutboundNumber();
                    break;
                case Crushing:
                    disposalCrushing += outboundOrder.getOutboundNumber();
                    break;
                case Sludge:
                    disposalSludge += outboundOrder.getOutboundNumber();
                    break;
                case Distillation:
                    disposalDistillation += outboundOrder.getOutboundNumber();
                    break;
                case Suspension:
                    disposalSuspension += outboundOrder.getOutboundNumber();
                    break;
                case WasteLiquid:
                    disposalWasteLiquid += outboundOrder.getOutboundNumber();
                    break;
            }
        }
        List<MedicalWastes> medicalWastesPrepare2List = medicalWastesService.getMedicalWastesBySimpleDateAndEquipment(now, "Prepare2");
        for (MedicalWastes medicalWastes : medicalWastesPrepare2List) {
            disposalMedicalWastes += medicalWastes.getWastesAmount();
        }

        productionDaily.setTodayOutboundPrepare2WastesBulk(disposalBulk);
        productionDaily.setTodayOutboundPrepare2WastesCrushing(disposalCrushing);
        productionDaily.setTodayOutboundPrepare2WastesSludge(disposalSludge);
        productionDaily.setTodayOutboundPrepare2WastesDistillation(disposalDistillation);
        productionDaily.setTodayOutboundPrepare2WastesSuspension(disposalSuspension);
        productionDaily.setTodayOutboundPrepare2WastesWasteLiquid(disposalWasteLiquid);
        productionDaily.setTodayOutboundPrepare2MedicalWastes(disposalMedicalWastes);

        // B2
        disposalBulk = 0f;
        disposalCrushing = 0f;
        disposalSludge = 0f;
        disposalDistillation = 0f;
        disposalSuspension = 0f;
        disposalWasteLiquid = 0f;
        disposalMedicalWastes = 0f;

        List<OutboundOrder> outboundB2OrderList = outboundOrderService.getOutBoundByDateAndEquipment(now, "B2");
        for (OutboundOrder outboundOrder : outboundB2OrderList) {
            if (!outboundOrder.getBoundType().equals(BoundType.WasteOutbound)) continue;
            HandleCategory handelCategory = outboundOrder.getHandelCategory();
            switch (handelCategory) {
                case Bulk:
                    disposalBulk += outboundOrder.getOutboundNumber();
                    break;
                case Crushing:
                    disposalCrushing += outboundOrder.getOutboundNumber();
                    break;
                case Sludge:
                    disposalSludge += outboundOrder.getOutboundNumber();
                    break;
                case Distillation:
                    disposalDistillation += outboundOrder.getOutboundNumber();
                    break;
                case Suspension:
                    disposalSuspension += outboundOrder.getOutboundNumber();
                    break;
                case WasteLiquid:
                    disposalWasteLiquid += outboundOrder.getOutboundNumber();
                    break;
            }
        }
        List<MedicalWastes> medicalWastesB2List = medicalWastesService.getMedicalWastesBySimpleDateAndEquipment(now, "B2");
        for (MedicalWastes medicalWastes : medicalWastesB2List) {
            disposalMedicalWastes += medicalWastes.getWastesAmount();
        }

        productionDaily.setTodayOutboundB2WastesBulk(disposalBulk);
        productionDaily.setTodayOutboundB2WastesCrushing(disposalCrushing);
        productionDaily.setTodayOutboundB2WastesSludge(disposalSludge);
        productionDaily.setTodayOutboundB2WastesDistillation(disposalDistillation);
        productionDaily.setTodayOutboundB2WastesSuspension(disposalSuspension);
        productionDaily.setTodayOutboundB2WastesWasteLiquid(disposalWasteLiquid);
        productionDaily.setTodayOutboundB2MedicalWastes(disposalMedicalWastes);

        // 三期
        disposalBulk = 0f;
        disposalCrushing = 0f;
        disposalSludge = 0f;
        disposalDistillation = 0f;
        disposalSuspension = 0f;
        disposalWasteLiquid = 0f;
        disposalMedicalWastes = 0f;

        List<OutboundOrder> outboundThirdOrderList = outboundOrderService.getOutBoundByDateAndEquipment(now, "ThirdPhasePretreatmentSystem");
        for (OutboundOrder outboundOrder : outboundThirdOrderList) {
            if (!outboundOrder.getBoundType().equals(BoundType.WasteOutbound)) continue;
            HandleCategory handelCategory = outboundOrder.getHandelCategory();
            switch (handelCategory) {
                case Bulk:
                    disposalBulk += outboundOrder.getOutboundNumber();
                    break;
                case Crushing:
                    disposalCrushing += outboundOrder.getOutboundNumber();
                    break;
                case Sludge:
                    disposalSludge += outboundOrder.getOutboundNumber();
                    break;
                case Distillation:
                    disposalDistillation += outboundOrder.getOutboundNumber();
                    break;
                case Suspension:
                    disposalSuspension += outboundOrder.getOutboundNumber();
                    break;
                case WasteLiquid:
                    disposalWasteLiquid += outboundOrder.getOutboundNumber();
                    break;
            }
        }
        List<MedicalWastes> medicalWastesThirdPhasePretreatmentSystemList = medicalWastesService.getMedicalWastesBySimpleDateAndEquipment(now, "ThirdPhasePretreatmentSystem");
        for (MedicalWastes medicalWastes : medicalWastesThirdPhasePretreatmentSystemList) {
            disposalMedicalWastes += medicalWastes.getWastesAmount();
        }

        productionDaily.setTodayOutboundThirdPretreatmentSystemWastesBulk(disposalBulk);
        productionDaily.setTodayOutboundThirdPretreatmentSystemWastesCrushing(disposalCrushing);
        productionDaily.setTodayOutboundThirdPretreatmentSystemWastesSludge(disposalSludge);
        productionDaily.setTodayOutboundThirdPretreatmentSystemWastesDistillation(disposalDistillation);
        productionDaily.setTodayOutboundThirdPretreatmentSystemWastesSuspension(disposalSuspension);
        productionDaily.setTodayOutboundThirdPretreatmentSystemWastesWasteLiquid(disposalWasteLiquid);
        productionDaily.setTodayOutboundThirdPretreatmentSystemMedicalWastes(disposalMedicalWastes);


        // 危废处置量
        productionDaily.setTodayOutboundWastesBulk(productionDaily.getTodayOutboundA2WastesBulk() +
                productionDaily.getTodayOutboundPrepare2WastesBulk() + productionDaily.getTodayOutboundB2WastesBulk() +
                productionDaily.getTodayOutboundThirdPretreatmentSystemWastesBulk());
        productionDaily.setTodayOutboundWastesCrushing(productionDaily.getTodayOutboundA2WastesCrushing() +
                productionDaily.getTodayOutboundPrepare2WastesCrushing() + productionDaily.getTodayOutboundB2WastesCrushing() +
                productionDaily.getTodayOutboundThirdPretreatmentSystemWastesCrushing());
        productionDaily.setTodayOutboundWastesSludge(productionDaily.getTodayOutboundA2WastesSludge() +
                productionDaily.getTodayOutboundPrepare2WastesSludge() + productionDaily.getTodayOutboundB2WastesSludge() +
                productionDaily.getTodayOutboundThirdPretreatmentSystemWastesSludge());
        productionDaily.setTodayOutboundWastesDistillation(productionDaily.getTodayOutboundA2WastesDistillation() +
                productionDaily.getTodayOutboundPrepare2WastesDistillation() + productionDaily.getTodayOutboundB2RateWastesDistillation() +
                productionDaily.getTodayOutboundThirdPretreatmentSystemWastesDistillation());
        productionDaily.setTodayOutboundWastesSuspension(productionDaily.getTodayOutboundA2WastesSuspension() + productionDaily.getTodayOutboundB2WastesSuspension() +
                productionDaily.getTodayOutboundPrepare2WastesSuspension() + productionDaily.getTodayOutboundThirdPretreatmentSystemWastesSuspension());
        productionDaily.setTodayOutboundWastesWasteLiquid(productionDaily.getTodayOutboundA2WastesWasteLiquid() + productionDaily.getTodayOutboundB2WastesWasteLiquid() +
                productionDaily.getTodayOutboundPrepare2WastesWasteLiquid() + productionDaily.getTodayOutboundThirdPretreatmentSystemWastesWasteLiquid());
        productionDaily.setTodayOutboundWastesTotal(productionDaily.getTodayOutboundWastesBulk() + productionDaily.getTodayOutboundWastesCrushing() +
                productionDaily.getTodayOutboundWastesSludge() + productionDaily.getTodayOutboundWastesDistillation() + productionDaily.getTodayOutboundWastesSuspension() +
                productionDaily.getTodayOutboundWastesWasteLiquid());

        // 辅料备件消耗
        // 医疗蒸煮
        float disposalNaclo = 0f;
        float disposalDeodorant = 0f;
        float disposalMedicalWastesBag = 0f;
        float disposalMedicalPackingPlasticBag = 0f;
        float disposalCollectionBox = 0f;
        float disposalSteam = 0f;
        float disposalIndustrialWater = 0f;
        float disposalElectricQuantity = 0f;
        List<Ingredients> ingredientsA2List = ingredientsService.getIngredientsOutItemByRange(now, now, Equipment.MedicalCookingSystem);
        for (Ingredients ingredients : ingredientsA2List) {
            switch (ingredients.getName()) {
                case "消毒液(NaCLO)":
                    disposalNaclo += ingredients.getReceiveAmount();
                    break;
                case "除臭剂":
                    disposalDeodorant += ingredients.getReceiveAmount();
                    break;
                case "医废吨袋":
                    disposalMedicalWastesBag += ingredients.getReceiveAmount();
                    break;
                case "医废包装塑料袋":
                    disposalMedicalPackingPlasticBag += ingredients.getReceiveAmount();
                    break;
                case "收集转运箱":
                    disposalCollectionBox += ingredients.getReceiveAmount();
                    break;
                case "蒸汽":
                    disposalSteam += ingredients.getReceiveAmount();
                    break;
                case "工业水量":
                    disposalIndustrialWater += ingredients.getReceiveAmount();
                    break;
                case "电量":
                    disposalElectricQuantity += ingredients.getReceiveAmount();
                    break;
                default:
                    break;
            }
        }
        productionDaily.setTodayDisposalMedicalAuxiliaryNaclo(disposalNaclo);
        productionDaily.setTodayDisposalMedicalAuxiliaryDeodorant(disposalDeodorant);
        productionDaily.setTodayDisposalMedicalAuxiliaryMedicalWastesBag(disposalMedicalWastesBag);
        productionDaily.setTodayDisposalMedicalAuxiliaryMedicalPackingPlasticBag(disposalMedicalPackingPlasticBag);
        productionDaily.setTodayDisposalMedicalAuxiliaryCollectionBox(disposalCollectionBox);
        productionDaily.setTodayDisposalMedicalAuxiliarySteam(disposalSteam);
        productionDaily.setTodayDisposalMedicalAuxiliaryIndustrialWater(disposalIndustrialWater);
        productionDaily.setTodayDisposalMedicalAuxiliaryElectricQuantity(disposalElectricQuantity);

        // 二期

        float disposalCalcareousLime = 0f;
        float disposalCommonActivatedCarbon = 0f;
        float disposalActivatedCarbon = 0f;
        float disposalLye = 0f;
        float disposalSalt = 0f;
        float disposalSlagBag = 0f;
        float disposalFlyAshBag = 0f;
        float disposalDieselOil = 0f;
        disposalIndustrialWater = 0f;
        disposalElectricQuantity = 0f;
        float disposalWoodenPallets = 0f;
        List<Ingredients> ingredientsSecondaryList = ingredientsService.getIngredientsOutItemByRange(now, now, Equipment.SecondaryTwoCombustionChamber);
        for (Ingredients ingredients : ingredientsSecondaryList) {
            switch (ingredients.getName()) {
                case "消石灰":
                    disposalCalcareousLime += ingredients.getReceiveAmount();
                    break;
                case "普通活性炭粉":
                    disposalCommonActivatedCarbon += ingredients.getReceiveAmount();
                    break;
                case "高活性碳粉":
                    disposalActivatedCarbon += ingredients.getReceiveAmount();
                    break;
                case "碱液":
                    disposalLye += ingredients.getReceiveAmount();
                    break;
                case "盐":
                    disposalSalt += ingredients.getReceiveAmount();
                    break;
                case "炉渣用吨袋":
                    disposalSlagBag += ingredients.getReceiveAmount();
                    break;
                case "飞灰用吨袋":
                    disposalFlyAshBag += ingredients.getReceiveAmount();
                    break;
                case "柴油":
                    disposalDieselOil += ingredients.getReceiveAmount();
                    break;
                case "电量":
                    disposalElectricQuantity += ingredients.getReceiveAmount();
                    break;
                case "工业水量":
                    disposalIndustrialWater += ingredients.getReceiveAmount();
                    break;
                case "木托盘":
                    disposalWoodenPallets += ingredients.getReceiveAmount();
                    break;
                default:
                    break;
            }
        }
        productionDaily.setTodayDisposalSecondaryAuxiliaryCalcareousLime(disposalCalcareousLime);
        productionDaily.setTodayDisposalSecondaryAuxiliaryCommonActivatedCarbon(disposalCommonActivatedCarbon);
        productionDaily.setTodayDisposalSecondaryAuxiliaryActivatedCarbon(disposalActivatedCarbon);
        productionDaily.setTodayDisposalSecondaryAuxiliaryLye(disposalLye);
        productionDaily.setTodayDisposalSecondaryAuxiliarySalt(disposalSalt);
        productionDaily.setTodayDisposalSecondaryAuxiliarySlagBag(disposalSlagBag);
        productionDaily.setTodayDisposalSecondaryAuxiliaryFlyAshBag(disposalFlyAshBag);
        productionDaily.setTodayDisposalSecondaryAuxiliaryDieselOil(disposalDieselOil);
        productionDaily.setTodayDisposalSecondaryAuxiliaryIndustrialWater(disposalIndustrialWater);
        productionDaily.setTodayDisposalSecondaryAuxiliaryElectricQuantity(disposalElectricQuantity);
        productionDaily.setTodayDisposalSecondaryAuxiliaryWoodenPallets(disposalWoodenPallets);

        // 三期
        disposalCalcareousLime = 0f;
        disposalCommonActivatedCarbon = 0f;
        disposalActivatedCarbon = 0f;
        float disposalActivatedCarbonParticles = 0f;
        disposalLye = 0f;
        float disposalCausticSoda = 0f;
        float disposalUrea = 0f;
        float disposalHydrochloricAcid = 0f;
        float disposalNahco3 = 0f;
        float disposalFlour = 0f;
        float disposalDefoamer = 0f;
        float disposalFlocculant = 0f;
        float disposalSoftWaterReducingAgent = 0f;
        float disposalSoftWaterScaleInhibitor = 0f;
        float disposalAmmonia = 0f;
        float disposalWaterReducingAgent = 0f;
        float disposalWaterScaleInhibitor = 0f;
        disposalNaclo = 0f;
        float disposalStandardBox = 0f;
        disposalWoodenPallets = 0f;
        float disposalStandardTray_1m = 0f;
        float disposalStandardTray_1_2m = 0f;
        float disposalAuxiliarySlagBag = 0f;
        disposalFlyAshBag = 0f;
        float disposalTonBox = 0f;
        disposalSteam = 0f;
        disposalDieselOil = 0f;
        float disposalNaturalGas = 0f;
        disposalIndustrialWater = 0f;
        disposalElectricQuantity = 0f;
        float disposalTapWaterQuantity = 0f;
        List<Ingredients> ingredientsThirdList = ingredientsService.getIngredientsOutItemByRange(now, now, Equipment.ThirdPhasePretreatmentSystem);
        for (Ingredients ingredients : ingredientsThirdList) {
            switch (ingredients.getName()) {
                case "消石灰":
                    disposalCalcareousLime += ingredients.getReceiveAmount();
                    break;
                case "普通活性炭粉":
                    disposalCommonActivatedCarbon += ingredients.getReceiveAmount();
                    break;
                case "高活性碳粉":
                    disposalActivatedCarbon += ingredients.getReceiveAmount();
                    break;
                case "活性炭颗粒":
                    disposalActivatedCarbonParticles += ingredients.getReceiveAmount();
                    break;
                case "碱液":
                    disposalLye += ingredients.getReceiveAmount();
                    break;
                case "片碱":
                    disposalCausticSoda += ingredients.getReceiveAmount();
                    break;
                case "尿素":
                    disposalUrea += ingredients.getReceiveAmount();
                    break;
                case "盐酸":
                    disposalHydrochloricAcid += ingredients.getReceiveAmount();
                    break;
                case "小苏打(NaHCO3)":
                    disposalNahco3 += ingredients.getReceiveAmount();
                    break;
                case "面粉":
                    disposalFlour += ingredients.getReceiveAmount();
                    break;
                case "消泡剂":
                    disposalDefoamer += ingredients.getReceiveAmount();
                    break;
                case "絮凝剂(聚丙烯酰胺)":
                    disposalFlocculant += ingredients.getReceiveAmount();
                    break;
                case "软水用还原剂":
                    disposalSoftWaterReducingAgent += ingredients.getReceiveAmount();
                    break;
                case "软水用阻垢剂":
                    disposalSoftWaterScaleInhibitor += ingredients.getReceiveAmount();
                    break;
                case "氨水(PH调节剂)":
                    disposalAmmonia += ingredients.getReceiveAmount();
                    break;
                case "污水用还原剂":
                    disposalWaterReducingAgent += ingredients.getReceiveAmount();
                    break;
                case "污水用阻垢剂":
                    disposalWaterScaleInhibitor += ingredients.getReceiveAmount();
                    break;
                case "消毒液(NaCLO)":
                    disposalNaclo += ingredients.getReceiveAmount();
                    break;
                case "标准箱":
                    disposalStandardBox += ingredients.getReceiveAmount();
                    break;
                case "木托盘":
                    disposalWoodenPallets += ingredients.getReceiveAmount();
                    break;
                case "1m标准托盘":
                    disposalStandardTray_1m += ingredients.getReceiveAmount();
                    break;
                case "1.2m标准托盘":
                    disposalStandardTray_1_2m += ingredients.getReceiveAmount();
                    break;
                case "炉渣用吨袋":
                    disposalAuxiliarySlagBag += ingredients.getReceiveAmount();
                    break;
                case "飞灰用吨袋":
                    disposalFlyAshBag += ingredients.getReceiveAmount();
                    break;
                case "吨箱":
                    disposalTonBox += ingredients.getReceiveAmount();
                    break;
                case "蒸汽":
                    disposalSteam += ingredients.getReceiveAmount();
                    break;
                case "柴油":
                    disposalDieselOil += ingredients.getReceiveAmount();
                    break;
                case "天然气":
                    disposalNaturalGas += ingredients.getReceiveAmount();
                    break;
                case "电量":
                    disposalElectricQuantity += ingredients.getReceiveAmount();
                    break;
                case "工业水量":
                    disposalIndustrialWater += ingredients.getReceiveAmount();
                    break;
                case "自来水量":
                    disposalTapWaterQuantity += ingredients.getReceiveAmount();
                    break;
                default:
                    break;
            }
        }
        productionDaily.setTodayDisposalThirdAuxiliaryCalcareousLime(disposalCalcareousLime);
        productionDaily.setTodayDisposalThirdAuxiliaryCommonActivatedCarbon(disposalCommonActivatedCarbon);
        productionDaily.setTodayDisposalThirdAuxiliaryActivatedCarbon(disposalActivatedCarbon);
        productionDaily.setTodayDisposalThirdAuxiliaryActivatedCarbonParticles(disposalActivatedCarbonParticles);
        productionDaily.setTodayDisposalThirdAuxiliaryLye(disposalLye);
        productionDaily.setTodayDisposalThirdAuxiliaryCausticSoda(disposalCausticSoda);
        productionDaily.setTodayDisposalThirdAuxiliaryUrea(disposalUrea);
        productionDaily.setTodayDisposalThirdAuxiliaryHydrochloricAcid(disposalHydrochloricAcid);
        productionDaily.setTodayDisposalThirdAuxiliaryNahco3(disposalNahco3);
        productionDaily.setTodayDisposalThirdAuxiliaryFlour(disposalFlour);
        productionDaily.setTodayDisposalThirdAuxiliaryDefoamer(disposalDefoamer);
        productionDaily.setTodayDisposalThirdAuxiliaryFlocculant(disposalFlocculant);
        productionDaily.setTodayDisposalThirdAuxiliarySoftWaterReducingAgent(disposalSoftWaterReducingAgent);
        productionDaily.setTodayDisposalThirdAuxiliarySoftWaterScaleInhibitor(disposalSoftWaterScaleInhibitor);
        productionDaily.setTodayDisposalThirdAuxiliaryAmmonia(disposalAmmonia);
        productionDaily.setTodayDisposalThirdAuxiliaryWaterReducingAgent(disposalWaterReducingAgent);
        productionDaily.setTodayDisposalThirdAuxiliaryWaterScaleInhibitor(disposalWaterScaleInhibitor);
        productionDaily.setTodayDisposalThirdAuxiliaryNaclo(disposalNaclo);
        productionDaily.setTodayDisposalThirdAuxiliaryStandardBox(disposalStandardBox);
        productionDaily.setTodayDisposalThirdAuxiliaryWoodenPallets(disposalWoodenPallets);
        productionDaily.setTodayDisposalThirdAuxiliaryStandardTray_1m(disposalStandardTray_1m);
        productionDaily.setTodayDisposalThirdAuxiliaryStandardTray_1_2m(disposalStandardTray_1_2m);
        productionDaily.setTodayDisposalThirdAuxiliarySlagBag(disposalAuxiliarySlagBag);
        productionDaily.setTodayDisposalThirdAuxiliaryFlyAshBag(disposalFlyAshBag);
        productionDaily.setTodayDisposalThirdAuxiliaryTonBox(disposalTonBox);
        productionDaily.setTodayDisposalThirdAuxiliarySteam(disposalSteam);
        productionDaily.setTodayDisposalThirdAuxiliaryDieselOil(disposalDieselOil);
        productionDaily.setTodayDisposalThirdAuxiliaryNaturalGas(disposalNaturalGas);
        productionDaily.setTodayDisposalThirdAuxiliaryIndustrialWater(disposalIndustrialWater);
        productionDaily.setTodayDisposalThirdAuxiliaryElectricQuantity(disposalElectricQuantity);
        productionDaily.setTodayDisposalThirdAuxiliaryTapWaterQuantity(disposalTapWaterQuantity);

        // 辅料备件消耗
        productionDaily.setTodayOutboundAuxiliaryCalcareousLime(productionDaily.getTodayDisposalSecondaryAuxiliaryCalcareousLime() + productionDaily.getTodayDisposalThirdAuxiliaryCalcareousLime());
        productionDaily.setTodayOutboundAuxiliaryCommonActivatedCarbon(productionDaily.getTodayDisposalSecondaryAuxiliaryCommonActivatedCarbon() + productionDaily.getTodayDisposalThirdAuxiliaryCommonActivatedCarbon());
        productionDaily.setTodayOutboundAuxiliaryActivatedCarbon(productionDaily.getTodayDisposalSecondaryAuxiliaryActivatedCarbon() + productionDaily.getTodayDisposalThirdAuxiliaryActivatedCarbon());
        productionDaily.setTodayOutboundAuxiliaryActivatedCarbonParticles(productionDaily.getTodayDisposalThirdAuxiliaryActivatedCarbonParticles());
        productionDaily.setTodayOutboundAuxiliaryLye(productionDaily.getTodayDisposalSecondaryAuxiliaryLye() + productionDaily.getTodayDisposalThirdAuxiliaryLye());
        productionDaily.setTodayOutboundAuxiliaryCausticSoda(productionDaily.getTodayDisposalThirdAuxiliaryCausticSoda());
        productionDaily.setTodayOutboundAuxiliaryUrea(productionDaily.getTodayDisposalThirdAuxiliaryUrea());
        productionDaily.setTodayOutboundAuxiliaryHydrochloricAcid(productionDaily.getTodayDisposalThirdAuxiliaryHydrochloricAcid());
        productionDaily.setTodayOutboundAuxiliaryNahco3(productionDaily.getTodayDisposalThirdAuxiliaryNahco3());
        productionDaily.setTodayOutboundAuxiliaryFlour(productionDaily.getTodayDisposalThirdAuxiliaryFlour());
        productionDaily.setTodayOutboundAuxiliaryDefoamer(productionDaily.getTodayDisposalThirdAuxiliaryDefoamer());
        productionDaily.setTodayOutboundAuxiliaryFlocculant(productionDaily.getTodayDisposalThirdAuxiliaryFlocculant());
        productionDaily.setTodayOutboundAuxiliarySoftWaterReducingAgent(productionDaily.getTodayDisposalThirdAuxiliarySoftWaterReducingAgent());
        productionDaily.setTodayOutboundAuxiliarySoftWaterScaleInhibitor(productionDaily.getTodayDisposalThirdAuxiliarySoftWaterScaleInhibitor());
        productionDaily.setTodayOutboundAuxiliaryAmmonia(productionDaily.getTodayDisposalThirdAuxiliaryAmmonia());
        productionDaily.setTodayOutboundAuxiliaryWaterReducingAgent(productionDaily.getTodayDisposalThirdAuxiliaryWaterReducingAgent());
        productionDaily.setTodayOutboundAuxiliaryWaterScaleInhibitor(productionDaily.getTodayDisposalThirdAuxiliaryWaterScaleInhibitor());
        productionDaily.setTodayOutboundAuxiliaryNaclo(productionDaily.getTodayDisposalMedicalAuxiliaryNaclo() + productionDaily.getTodayDisposalThirdAuxiliaryNaclo());
        productionDaily.setTodayOutboundAuxiliaryDeodorant(productionDaily.getTodayDisposalMedicalAuxiliaryDeodorant());
        productionDaily.setTodayOutboundAuxiliarySalt(productionDaily.getTodayDisposalSecondaryAuxiliarySalt());
        productionDaily.setTodayOutboundAuxiliarySlagBag(productionDaily.getTodayDisposalSecondaryAuxiliarySlagBag() + productionDaily.getTodayDisposalThirdAuxiliarySlagBag());
        productionDaily.setTodayOutboundAuxiliaryFlyAshBag(productionDaily.getTodayDisposalSecondaryAsh() + productionDaily.getTodayDisposalThirdAsh());
        productionDaily.setTodayOutboundAuxiliaryMedicalWastesBag(productionDaily.getTodayDisposalMedicalAuxiliaryMedicalWastesBag());
        productionDaily.setTodayOutboundAuxiliaryMedicalPackingPlasticBag(productionDaily.getTodayDisposalMedicalAuxiliaryMedicalPackingPlasticBag());
        productionDaily.setTodayOutboundAuxiliaryCollectionBox(productionDaily.getTodayDisposalMedicalAuxiliaryCollectionBox());
        productionDaily.setTodayOutboundAuxiliaryStandardBox(productionDaily.getTodayDisposalThirdAuxiliaryStandardBox());
        productionDaily.setTodayOutboundAuxiliaryWoodenPallets(productionDaily.getTodayDisposalSecondaryAuxiliaryWoodenPallets() + productionDaily.getTodayDisposalThirdAuxiliaryWoodenPallets());
        productionDaily.setTodayOutboundAuxiliaryStandardTray_1m(productionDaily.getTodayDisposalThirdAuxiliaryStandardTray_1m());
        productionDaily.setTodayOutboundAuxiliaryStandardTray_1_2m(productionDaily.getTodayDisposalThirdAuxiliaryStandardTray_1_2m());
        productionDaily.setTodayOutboundAuxiliaryTonBox(productionDaily.getTodayDisposalThirdAuxiliaryTonBox());
        productionDaily.setTodayOutboundAuxiliarySteam(productionDaily.getTodayDisposalMedicalAuxiliarySteam());
        productionDaily.setTodayOutboundAuxiliaryDieselOil(productionDaily.getTodayDisposalSecondaryAuxiliaryDieselOil() + productionDaily.getTodayDisposalMedicalWastesDisposalDirect());
        productionDaily.setTodayOutboundAuxiliaryNaturalGas(productionDaily.getTodayDisposalThirdAuxiliaryNaturalGas());
        productionDaily.setTodayOutboundAuxiliaryElectricQuantity(productionDaily.getTodayDisposalMedicalAuxiliaryElectricQuantity() + productionDaily.getTodayDisposalSecondaryAuxiliaryElectricQuantity() +
                productionDaily.getTodayDisposalThirdAuxiliaryElectricQuantity() + productionDaily.getTodayDisposalTowerElectricQuantity());

        // 运行情况统计
        float equipmentA2RunningTime = 0f;
        float equipmentB2RunningTime = 0f;
        float equipmentPrepare2RunningTime = 0f;
        float equipmentSecondRunningTime = 0f;
        float equipmentThirdRunningTime = 0f;
        List<EquipmentItem> equipmentDateList = equipmentService.getEquipmentDataByDate(now, now);
        for (EquipmentItem equipmentItem : equipmentDateList) {
            Equipment equipmentName = equipmentItem.getEquipment();
            switch (equipmentName.getName()) {
                case "A2":
                    equipmentA2RunningTime += equipmentItem.getRunningTime();
                    break;
                case "B2":
                    equipmentB2RunningTime += equipmentItem.getRunningTime();
                    break;
                case "Prepare2":
                    equipmentPrepare2RunningTime += equipmentItem.getRunningTime();
                    break;
                case "SecondaryTwoCombustionChamber":
                    equipmentSecondRunningTime += equipmentItem.getRunningTime();
                    break;
                case "ThirdPhasePretreatmentSystem":
                    equipmentThirdRunningTime += equipmentItem.getRunningTime();
                    break;
            }
        }
        // 运行时间和停止时间
        productionDaily.setTodayEquipmentA2RunningTime(equipmentA2RunningTime);
        productionDaily.setTodayEquipmentB2RunningTime(equipmentB2RunningTime);
        productionDaily.setTodayEquipmentPrepare2RunningTime(equipmentPrepare2RunningTime);
        productionDaily.setTodayEquipmentSecondaryRunningTime(equipmentSecondRunningTime);
        productionDaily.setTodayEquipmentThirdRunningTime(equipmentThirdRunningTime);

        productionDaily.setTodayEquipmentA2StopTime(24 - productionDaily.getTodayEquipmentA2RunningTime());
        productionDaily.setTodayEquipmentB2StopTime(24 - productionDaily.getTodayEquipmentB2RunningTime());
        productionDaily.setTodayEquipmentPrepare2StopTime(24 - productionDaily.getTodayEquipmentPrepare2StopTime());
        productionDaily.setTodayEquipmentSecondaryStopTime(24 - productionDaily.getTodayEquipmentSecondaryRunningTime());
        productionDaily.setTodayEquipmentThirdStopTime(24 - productionDaily.getTodayEquipmentThirdRunningTime());
        // 运转率
        productionDaily.setTodayEquipmentA2RunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getTodayEquipmentA2RunningTime(), productionDaily.getTodayEquipmentA2StopTime())));
        productionDaily.setTodayEquipmentB2RunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getTodayEquipmentB2RunningTime(), productionDaily.getTodayEquipmentB2StopTime())));
        productionDaily.setTodayEquipmentPrepare2RunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getTodayEquipmentPrepare2RunningTime(), productionDaily.getTodayEquipmentPrepare2StopTime())));
        productionDaily.setTodayEquipmentSecondaryRunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getTodayEquipmentSecondaryRunningTime(), productionDaily.getTodayEquipmentSecondaryStopTime())));
        productionDaily.setTodayEquipmentThirdRunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getTodayEquipmentThirdRunningTime(), productionDaily.getTodayEquipmentThirdStopTime())));

        // 获取当天的危废入库信息
        List<InboundOrderItem> inboundOrderItemList = inboundService.getInboundOrderItemByRange(now, now);
        productionDaily.setInboundOrderItemList(inboundOrderItemList);
        // 获取当天出库的危废
        List<OutboundOrder> outboundOrderA2List = outboundOrderService.getOutBoundByDateAndEquipment(now, "A2");
        productionDaily.setOutboundOrderA2List(outboundOrderA2List);
        List<OutboundOrder> outboundOrderB2List = outboundOrderService.getOutBoundByDateAndEquipment(now, "B2");
        productionDaily.setOutboundOrderB2List(outboundOrderB2List);
        List<OutboundOrder> outboundOrderPrepare2List = outboundOrderService.getOutBoundByDateAndEquipment(now, "Prepare2");
        productionDaily.setOutboundOrderPrepare2List(outboundOrderPrepare2List);
        List<OutboundOrder> outboundOrderThirdList = outboundOrderService.getOutBoundByDateAndEquipment(now, "ThirdPhasePretreatmentSystem");
        productionDaily.setOutboundOrderThirdList(outboundOrderThirdList);


        float secondSlag = 0f;
        float secondAsh = 0f;
        for (OutboundOrder outboundOrder : outboundThirdOrderList) {
            if (!outboundOrder.getBoundType().equals(BoundType.SecondaryOutbound)) continue;
            String wastesName = outboundOrder.getLaboratoryTest().getWastesName();
            switch (wastesName) {
                case "slag":
                    secondSlag += outboundOrder.getOutboundNumber();
                    break;
                case "ash":
                    secondAsh += outboundOrder.getOutboundNumber();
                    break;
                default:
                    break;
            }
        }
        productionDaily.setTodayDisposalThirdSlag(secondSlag);
        productionDaily.setTodayDisposalThirdAsh(secondAsh);

        secondSlag = 0f;
        secondAsh = 0f;
        List<OutboundOrder> outboundOrderList = outboundOrderService.getOutBoundByDateAndEquipment(now, "SecondaryTwoCombustionChamber");
        for (OutboundOrder outboundOrder : outboundOrderList) {
            if (!outboundOrder.getBoundType().equals(BoundType.SecondaryOutbound)) continue;
            if (outboundOrder.getLaboratoryTest() == null) continue;
            String wastesName = outboundOrder.getLaboratoryTest().getWastesName();
            switch (wastesName) {
                case "slag":
                    secondSlag += outboundOrder.getOutboundNumber();
                    break;
                case "ash":
                    secondAsh += outboundOrder.getOutboundNumber();
                    break;
                default:
                    break;
            }
        }
        productionDaily.setTodayDisposalSecondarySlag(secondSlag);
        productionDaily.setTodayDisposalSecondaryAsh(secondAsh);

        productionDaily.setTodayInboundSecondWastesSlag(productionDaily.getTodayDisposalSecondarySlag() + productionDaily.getTodayDisposalThirdSlag());
        productionDaily.setTodayInboundSecondWastesAsh(productionDaily.getTodayDisposalSecondaryAsh() + productionDaily.getTodayDisposalThirdAsh());

        // 获取三期消耗
        float todayOutboundThird = productionDaily.getTodayOutboundThirdPretreatmentSystemWastesBulk() + productionDaily.getTodayOutboundThirdPretreatmentSystemWastesCrushing() +
                productionDaily.getTodayOutboundThirdPretreatmentSystemWastesSludge() + productionDaily.getTodayOutboundThirdPretreatmentSystemWastesDistillation() +
                productionDaily.getTodayOutboundThirdPretreatmentSystemWastesSuspension() + productionDaily.getTodayOutboundThirdPretreatmentSystemWastesWasteLiquid();

        // 辅料备件日平均
        productionDaily.setTodayAverageDisposalMedicalAuxiliaryNaclo(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalMedicalAuxiliaryNaclo(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalMedicalAuxiliaryDeodorant(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalMedicalAuxiliaryDeodorant(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalMedicalAuxiliaryMedicalWastesBag(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalMedicalAuxiliaryMedicalWastesBag(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalMedicalAuxiliaryMedicalPackingPlasticBag(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalMedicalAuxiliaryCollectionBox(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalMedicalAuxiliaryCollectionBox(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalMedicalAuxiliarySteam(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalMedicalAuxiliarySteam(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalMedicalAuxiliaryIndustrialWater(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalMedicalAuxiliaryIndustrialWater(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalMedicalAuxiliaryElectricQuantity(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalMedicalAuxiliaryElectricQuantity(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliaryCalcareousLime(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliaryCalcareousLime(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliaryCommonActivatedCarbon(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliaryActivatedCarbon(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliaryActivatedCarbon(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliaryActivatedCarbonParticles(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliaryLye(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliaryLye(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliarySalt(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliarySalt(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliarySlagBag(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliarySlagBag(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliaryFlyAshBag(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliaryFlyAshBag(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliaryDieselOil(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliaryDieselOil(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliaryIndustrialWater(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliaryIndustrialWater(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliaryElectricQuantity(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliaryElectricQuantity(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalSecondaryAuxiliaryWoodenPallets(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalSecondaryAuxiliaryWoodenPallets(), productionDaily.getTodayOutboundMedicalWastes()));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryCalcareousLime(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryCalcareousLime(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryCommonActivatedCarbon(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryCommonActivatedCarbon(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryActivatedCarbon(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryActivatedCarbon(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryActivatedCarbonParticles(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryActivatedCarbonParticles(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryLye(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryLye(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryCausticSoda(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryCausticSoda(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryUrea(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryUrea(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryHydrochloricAcid(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryHydrochloricAcid(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryNahco3(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryNahco3(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryFlour(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryFlour(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryDefoamer(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryDefoamer(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryFlocculant(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryFlocculant(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliarySoftWaterReducingAgent(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliarySoftWaterReducingAgent(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliarySoftWaterScaleInhibitor(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryAmmonia(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryAmmonia(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryWaterReducingAgent(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryWaterReducingAgent(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryWaterScaleInhibitor(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryWaterScaleInhibitor(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryNaclo(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryNaclo(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryStandardBox(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryStandardBox(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryWoodenPallets(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryWoodenPallets(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryStandardTray_1m(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryStandardTray_1m(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryStandardTray_1_2m(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryStandardTray_1_2m(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliarySlagBag(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliarySlagBag(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryFlyAshBag(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryFlyAshBag(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryTonBox(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryTonBox(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliarySteam(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliarySteam(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryDieselOil(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryDieselOil(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryNaturalGas(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryNaturalGas(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryIndustrialWater(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryIndustrialWater(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryElectricQuantity(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryElectricQuantity(), todayOutboundThird));
        productionDaily.setTodayAverageDisposalThirdAuxiliaryTapWaterQuantity(RandomUtil.divideTwoNumber(productionDaily.getTodayDisposalThirdAuxiliaryTapWaterQuantity(), todayOutboundThird));

        // 年份
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");
        String year = yearFormat.format(now);
        Date yearFirstDay = DateUtil.getDateFromStr(year + "-01-01");
        Date yearEndDay = DateUtil.getDateFromStr(year + "-12-31");
        // 月份
        SimpleDateFormat monthFormat = new SimpleDateFormat("MM");
        String month = monthFormat.format(now);
        Date monthFirstDay = DateUtil.getDateFromStr(year + "-" + month + "-01");
        int endDay = DateUtil.getDaysOfMonth(monthFirstDay);
        Date monthEndDay = DateUtil.getDateFromStr(year + "-" + month + "-" + endDay);

        // 获取日报所在月份的所有日报
        List<ProductionDaily> productionDailyMonthList = productionDailyService.getProductionDailyByDateRange(monthFirstDay, monthEndDay, null);

        // 月份的初始数据
        float monthInboundMedicalWastes = 0f;
        float monthInboundMedicalWastesDirectDisposal = 0f;
        float monthInboundMedicalWastesCooking = 0f;
        float monthInboundMedicalWastesErrorNumber = 0f;
        float monthInboundMedicalWastesAfterCooking = 0f;
        float monthInboundMedicalWastesAfterCookingSend = 0f;
        float monthInboundMedicalWastesAfterCookingInbound = 0f;
        float monthInboundMedicalWastesWetNumber = 0f;
        float monthInboundWastesBulk = 0f;
        float monthInboundWastesCrushing = 0f;
        float monthInboundWastesSludge = 0f;
        float monthInboundWastesDistillation = 0f;
        float monthInboundWastesSuspension = 0f;
        float monthInboundWastesWasteLiquid = 0f;
        float monthInboundWastesTotal = 0f;
        float monthInboundSecondWastesSlag = 0f;
        float monthInboundSecondWastesAsh = 0f;
        float monthInboundSecondWastesBucket = 0f;
        float monthOutboundMedicalWastes = 0f;
        float monthOutboundMedicalWastesDirectDisposal = 0f;
        float monthOutboundMedicalWastesCooking = 0f;
        float monthOutboundMedicalWastesErrorNumber = 0f;
        float monthOutboundMedicalWastesAfterCooking = 0f;
        float monthOutboundMedicalWastesAfterCookingSend = 0f;
        float monthOutboundMedicalWastesAfterCookingInbound = 0f;
        float monthOutboundMedicalWastesWetNumber = 0f;
        float monthOutboundWastesBulk = 0f;
        float monthOutboundWastesCrushing = 0f;
        float monthOutboundWastesSludge = 0f;
        float monthOutboundWastesDistillation = 0f;
        float monthOutboundWastesSuspension = 0f;
        float monthOutboundWastesWasteLiquid = 0f;
        float monthOutboundWastesTotal = 0f;
        float monthOutboundSecondWastesSlag = 0f;
        float monthOutboundSecondWastesAsh = 0f;
        float monthOutboundSecondWastesBucket = 0f;
        // 本月辅料进场
        float monthInboundAuxiliaryCalcareousLime = 0f;
        float monthInboundAuxiliaryCommonActivatedCarbon = 0f;
        float monthInboundAuxiliaryActivatedCarbon = 0f;
        float monthInboundAuxiliaryActivatedCarbonParticles = 0f;
        float monthInboundAuxiliaryLye = 0f;
        float monthInboundAuxiliaryCausticSoda = 0f;
        float monthInboundAuxiliaryUrea = 0f;
        float monthInboundAuxiliaryHydrochloricAcid = 0f;
        float monthInboundAuxiliaryNahco3 = 0f;
        float monthInboundAuxiliaryFlour = 0f;
        float monthInboundAuxiliaryDefoamer = 0f;
        float monthInboundAuxiliaryFlocculant = 0f;
        float monthInboundAuxiliarySoftWaterReducingAgent = 0f;
        float monthInboundAuxiliarySoftWaterScaleInhibitor = 0f;
        float monthInboundAuxiliaryAmmonia = 0f;
        float monthInboundAuxiliaryWaterReducingAgent = 0f;
        float monthInboundAuxiliaryWaterScaleInhibitor = 0f;
        float monthInboundAuxiliaryNaclo = 0f;
        float monthInboundAuxiliaryDeodorant = 0f;
        float monthInboundAuxiliarySalt = 0f;
        float monthInboundAuxiliarySlagBag = 0f;
        float monthInboundAuxiliaryFlyAshBag = 0f;
        float monthInboundAuxiliaryMedicalWastesBag = 0f;
        float monthInboundAuxiliaryMedicalPackingPlasticBag = 0f;
        float monthInboundAuxiliaryCollectionBox = 0f;
        float monthInboundAuxiliaryStandardBox = 0f;
        float monthInboundAuxiliaryWoodenPallets = 0f;
        float monthInboundAuxiliaryStandardTray_1m = 0f;
        float monthInboundAuxiliaryStandardTray_1_2m = 0f;
        float monthInboundAuxiliaryTonBox = 0f;
        float monthInboundAuxiliarySteam = 0f;
        float monthInboundAuxiliaryDieselOil = 0f;
        float monthInboundAuxiliaryNaturalGas = 0f;
        float monthInboundAuxiliaryElectricQuantity = 0f;
        float monthInboundAuxiliaryIndustrialWater = 0f;
        float monthInboundAuxiliaryTapWaterQuantity = 0f;
        // 本月辅料备件出库
        float monthOutboundAuxiliaryCalcareousLime = 0f;
        float monthOutboundAuxiliaryCommonActivatedCarbon = 0f;
        float monthOutboundAuxiliaryActivatedCarbon = 0f;
        float monthOutboundAuxiliaryActivatedCarbonParticles = 0f;
        float monthOutboundAuxiliaryLye = 0f;
        float monthOutboundAuxiliaryCausticSoda = 0f;
        float monthOutboundAuxiliaryUrea = 0f;
        float monthOutboundAuxiliaryHydrochloricAcid = 0f;
        float monthOutboundAuxiliaryNahco3 = 0f;
        float monthOutboundAuxiliaryFlour = 0f;
        float monthOutboundAuxiliaryDefoamer = 0f;
        float monthOutboundAuxiliaryFlocculant = 0f;
        float monthOutboundAuxiliarySoftWaterReducingAgent = 0f;
        float monthOutboundAuxiliarySoftWaterScaleInhibitor = 0f;
        float monthOutboundAuxiliaryAmmonia = 0f;
        float monthOutboundAuxiliaryWaterReducingAgent = 0f;
        float monthOutboundAuxiliaryWaterScaleInhibitor = 0f;
        float monthOutboundAuxiliaryNaclo = 0f;
        float monthOutboundAuxiliaryDeodorant = 0f;
        float monthOutboundAuxiliarySalt = 0f;
        float monthOutboundAuxiliarySlagBag = 0f;
        float monthOutboundAuxiliaryFlyAshBag = 0f;
        float monthOutboundAuxiliaryMedicalWastesBag = 0f;
        float monthOutboundAuxiliaryMedicalPackingPlasticBag = 0f;
        float monthOutboundAuxiliaryCollectionBox = 0f;
        float monthOutboundAuxiliaryStandardBox = 0f;
        float monthOutboundAuxiliaryWoodenPallets = 0f;
        float monthOutboundAuxiliaryStandardTray_1m = 0f;
        float monthOutboundAuxiliaryStandardTray_1_2m = 0f;
        float monthOutboundAuxiliaryTonBox = 0f;
        float monthOutboundAuxiliarySteam = 0f;
        float monthOutboundAuxiliaryDieselOil = 0f;
        float monthOutboundAuxiliaryNaturalGas = 0f;
        float monthOutboundAuxiliaryElectricQuantity = 0f;
        float monthOutboundAuxiliaryIndustrialWater = 0f;
        float monthOutboundAuxiliaryTapWaterQuantity = 0f;
        // 月累计辅料消耗
        float monthDisposalMedicalAuxiliaryNaclo = 0f;
        float monthDisposalMedicalAuxiliaryDeodorant = 0f;
        float monthDisposalMedicalAuxiliaryMedicalWastesBag = 0f;
        float monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag = 0f;
        float monthDisposalMedicalAuxiliaryCollectionBox = 0f;
        float monthDisposalMedicalAuxiliarySteam = 0f;
        float monthDisposalMedicalAuxiliaryIndustrialWater = 0f;
        float monthDisposalMedicalAuxiliaryElectricQuantity = 0f;
        float monthDisposalSecondaryAuxiliaryCalcareousLime = 0f;
        float monthDisposalSecondaryAuxiliaryCommonActivatedCarbon = 0f;
        float monthDisposalSecondaryAuxiliaryActivatedCarbon = 0f;
        float monthDisposalSecondaryAuxiliaryActivatedCarbonParticles = 0f;
        float monthDisposalSecondaryAuxiliaryLye = 0f;
        float monthDisposalSecondaryAuxiliarySalt = 0f;
        float monthDisposalSecondaryAuxiliarySlagBag = 0f;
        float monthDisposalSecondaryAuxiliaryFlyAshBag = 0f;
        float monthDisposalSecondaryAuxiliaryDieselOil = 0f;
        float monthDisposalSecondaryAuxiliaryIndustrialWater = 0f;
        float monthDisposalSecondaryAuxiliaryElectricQuantity = 0f;
        float monthDisposalSecondaryAuxiliaryWoodenPallets = 0f;
        float monthDisposalThirdAuxiliaryCalcareousLime = 0f;
        float monthDisposalThirdAuxiliaryCommonActivatedCarbon = 0f;
        float monthDisposalThirdAuxiliaryActivatedCarbon = 0f;
        float monthDisposalThirdAuxiliaryActivatedCarbonParticles = 0f;
        float monthDisposalThirdAuxiliaryLye = 0f;
        float monthDisposalThirdAuxiliaryCausticSoda = 0f;
        float monthDisposalThirdAuxiliaryUrea = 0f;
        float monthDisposalThirdAuxiliaryHydrochloricAcid = 0f;
        float monthDisposalThirdAuxiliaryNahco3 = 0f;
        float monthDisposalThirdAuxiliaryFlour = 0f;
        float monthDisposalThirdAuxiliaryDefoamer = 0f;
        float monthDisposalThirdAuxiliaryFlocculant = 0f;
        float monthDisposalThirdAuxiliarySoftWaterReducingAgent = 0f;
        float monthDisposalThirdAuxiliarySoftWaterScaleInhibitor = 0f;
        float monthDisposalThirdAuxiliaryAmmonia = 0f;
        float monthDisposalThirdAuxiliaryWaterReducingAgent = 0f;
        float monthDisposalThirdAuxiliaryWaterScaleInhibitor = 0f;
        float monthDisposalThirdAuxiliaryNaclo = 0f;
        float monthDisposalThirdAuxiliaryStandardBox = 0f;
        float monthDisposalThirdAuxiliaryWoodenPallets = 0f;
        float monthDisposalThirdAuxiliaryStandardTray_1m = 0f;
        float monthDisposalThirdAuxiliaryStandardTray_1_2m = 0f;
        float monthDisposalThirdAuxiliarySlagBag = 0f;
        float monthDisposalThirdAuxiliaryFlyAshBag = 0f;
        float monthDisposalThirdAuxiliaryTonBox = 0f;
        float monthDisposalThirdAuxiliarySteam = 0f;
        float monthDisposalThirdAuxiliaryDieselOil = 0f;
        float monthDisposalThirdAuxiliaryNaturalGas = 0f;
        float monthDisposalThirdAuxiliaryIndustrialWater = 0f;
        float monthDisposalThirdAuxiliaryElectricQuantity = 0f;
        float monthDisposalThirdAuxiliaryTapWaterQuantity = 0f;
        float monthDisposalTowerElectricQuantity = 0f;

        // 工废处置
        float monthOutboundA2WastesBulk = 0f;
        float monthOutboundA2WastesCrushing = 0f;
        float monthOutboundA2WastesSludge = 0f;
        float monthOutboundA2WastesDistillation = 0f;
        float monthOutboundA2WastesSuspension = 0f;
        float monthOutboundA2WastesWasteLiquid = 0f;
        float monthOutboundA2MedicalWastes = 0f;

        float monthOutboundPrepare2WastesBulk = 0f;
        float monthOutboundPrepare2WastesCrushing = 0f;
        float monthOutboundPrepare2WastesSludge = 0f;
        float monthOutboundPrepare2WastesDistillation = 0f;
        float monthOutboundPrepare2WastesSuspension = 0f;
        float monthOutboundPrepare2WastesWasteLiquid = 0f;
        float monthOutboundPrepare2MedicalWastes = 0f;

        float monthOutboundB2WastesBulk = 0f;
        float monthOutboundB2WastesCrushing = 0f;
        float monthOutboundB2WastesSludge = 0f;
        float monthOutboundB2WastesDistillation = 0f;
        float monthOutboundB2WastesSuspension = 0f;
        float monthOutboundB2WastesWasteLiquid = 0f;
        float monthOutboundB2MedicalWastes = 0f;

        float monthOutboundThirdPretreatmentSystemWastesBulk = 0f;
        float monthOutboundThirdPretreatmentSystemWastesCrushing = 0f;
        float monthOutboundThirdPretreatmentSystemWastesSludge = 0f;
        float monthOutboundThirdPretreatmentSystemWastesDistillation = 0f;
        float monthOutboundThirdPretreatmentSystemWastesSuspension = 0f;
        float monthOutboundThirdPretreatmentSystemWastesWasteLiquid = 0f;
        float monthOutboundThirdPretreatmentSystemMedicalWastes = 0f;

        float monthEquipmentA2StopTime = 0f;
        float monthEquipmentB2StopTime = 0f;
        float monthEquipmentPrepare2StopTime = 0f;
        float monthEquipmentSecondaryStopTime = 0f;
        float monthEquipmentThirdStopTime = 0f;

        float monthEquipmentA2RunningTime = 0f;
        float monthEquipmentB2RunningTime = 0f;
        float monthEquipmentPrepare2RunningTime = 0f;
        float monthEquipmentSecondaryRunningTime = 0f;
        float monthEquipmentThirdRunningTime = 0f;

        float monthDisposalSecondarySlag = 0f;
        float monthDisposalSecondaryAsh = 0f;
        float monthDisposalThirdSlag = 0f;
        float monthDisposalThirdAsh = 0f;

        // 遍历月份信息
        for (ProductionDaily daily : productionDailyMonthList) {
            monthInboundMedicalWastes += daily.getTodayInboundMedicalWastes();
            monthInboundMedicalWastesDirectDisposal += daily.getTodayInboundMedicalWastesDirectDisposal();
            monthInboundMedicalWastesCooking += daily.getTodayInboundMedicalWastesCooking();
            monthInboundMedicalWastesErrorNumber += daily.getTodayInboundMedicalWastesCooking();
            monthInboundMedicalWastesAfterCooking += daily.getTodayInboundMedicalWastesAfterCooking();
            monthInboundMedicalWastesAfterCookingSend += daily.getTodayInboundMedicalWastesAfterCookingSend();
            monthInboundMedicalWastesAfterCookingInbound += daily.getTodayInboundMedicalWastesAfterCookingInbound();
            monthInboundMedicalWastesWetNumber += daily.getTodayInboundMedicalWastesWetNumber();
            monthInboundWastesBulk += daily.getTodayInboundWastesBulk();
            monthInboundWastesCrushing += daily.getTodayInboundWastesCrushing();
            monthInboundWastesSludge += daily.getTodayInboundWastesSludge();
            monthInboundWastesDistillation += daily.getTodayInboundWastesDistillation();
            monthInboundWastesSuspension += daily.getTodayInboundWastesSuspension();
            monthInboundWastesWasteLiquid += daily.getTodayInboundWastesWasteLiquid();
            monthInboundWastesTotal += daily.getTodayInboundWastesTotal();
            monthInboundSecondWastesSlag += daily.getTodayInboundSecondWastesSlag();
            monthInboundSecondWastesAsh += daily.getTodayInboundSecondWastesAsh();
            monthInboundSecondWastesBucket += daily.getTodayInboundSecondWastesBucket();
            monthOutboundMedicalWastes += daily.getTodayOutboundMedicalWastes();
            monthOutboundMedicalWastesDirectDisposal += daily.getTodayOutboundMedicalWastesDirectDisposal();
            monthOutboundMedicalWastesCooking += daily.getTodayOutboundMedicalWastesCooking();
            monthOutboundMedicalWastesErrorNumber += daily.getTodayOutboundMedicalWastesErrorNumber();
            monthOutboundMedicalWastesAfterCooking += daily.getTodayOutboundMedicalWastesAfterCooking();
            monthOutboundMedicalWastesAfterCookingSend += daily.getTodayOutboundMedicalWastesAfterCookingSend();
            monthOutboundMedicalWastesAfterCookingInbound += daily.getTodayOutboundMedicalWastesAfterCookingInbound();
            monthOutboundMedicalWastesWetNumber += daily.getTodayOutboundMedicalWastesWetNumber();
            monthOutboundWastesBulk += daily.getTodayOutboundWastesBulk();
            monthOutboundWastesCrushing += daily.getTodayOutboundWastesCrushing();
            monthOutboundWastesSludge += daily.getTodayOutboundWastesSludge();
            monthOutboundWastesDistillation += daily.getTodayOutboundWastesDistillation();
            monthOutboundWastesSuspension += daily.getTodayOutboundWastesSuspension();
            monthOutboundWastesWasteLiquid += daily.getTodayOutboundWastesWasteLiquid();
            monthOutboundWastesTotal += daily.getTodayOutboundWastesTotal();
            monthOutboundSecondWastesSlag += daily.getTodayOutboundSecondWastesSlag();
            monthOutboundSecondWastesAsh += daily.getTodayOutboundSecondWastesAsh();
            monthOutboundSecondWastesBucket += daily.getTodayOutboundSecondWastesBucket();
            monthInboundAuxiliaryCalcareousLime += daily.getTodayInboundAuxiliaryCalcareousLime();
            monthInboundAuxiliaryCommonActivatedCarbon += daily.getTodayInboundAuxiliaryCommonActivatedCarbon();
            monthInboundAuxiliaryActivatedCarbon += daily.getTodayInboundAuxiliaryActivatedCarbon();
            monthInboundAuxiliaryActivatedCarbonParticles += daily.getTodayInboundAuxiliaryActivatedCarbonParticles();
            monthInboundAuxiliaryNahco3 += daily.getTodayInboundAuxiliaryNahco3();
            monthInboundAuxiliaryFlour += daily.getTodayInboundAuxiliaryFlour();
            monthInboundAuxiliaryDefoamer += daily.getTodayInboundAuxiliaryDefoamer();
            monthInboundAuxiliaryFlocculant += daily.getTodayInboundAuxiliaryFlocculant();
            monthInboundAuxiliarySoftWaterReducingAgent += daily.getTodayInboundAuxiliarySoftWaterReducingAgent();
            monthInboundAuxiliarySoftWaterScaleInhibitor += daily.getTodayInboundAuxiliaryWaterScaleInhibitor();
            monthInboundAuxiliaryAmmonia += daily.getTodayInboundAuxiliaryAmmonia();
            monthInboundAuxiliaryWaterReducingAgent += daily.getTodayInboundAuxiliaryWaterReducingAgent();
            monthInboundAuxiliaryWaterScaleInhibitor += daily.getTodayInboundAuxiliaryWaterScaleInhibitor();
            monthInboundAuxiliaryNaclo += daily.getTodayInboundAuxiliaryNaclo();
            monthInboundAuxiliaryDeodorant += daily.getTodayInboundAuxiliaryDeodorant();
            monthInboundAuxiliarySalt += daily.getTodayInboundAuxiliarySalt();
            monthInboundAuxiliaryFlyAshBag += daily.getTodayInboundAuxiliaryFlyAshBag();
            monthInboundAuxiliaryMedicalWastesBag += daily.getTodayInboundAuxiliaryMedicalWastesBag();
            monthInboundAuxiliaryMedicalPackingPlasticBag += daily.getTodayInboundAuxiliaryMedicalPackingPlasticBag();
            monthInboundAuxiliaryCollectionBox += daily.getTodayInboundAuxiliaryCollectionBox();
            monthInboundAuxiliaryStandardBox += daily.getTodayInboundAuxiliaryWoodenPallets();
            monthInboundAuxiliaryStandardTray_1m += daily.getTodayInboundAuxiliaryStandardTray_1m();
            monthInboundAuxiliaryStandardTray_1_2m += daily.getTodayInboundAuxiliaryStandardTray_1_2m();
            monthInboundAuxiliaryTonBox += daily.getTodayInboundAuxiliaryTonBox();
            monthInboundAuxiliarySteam += daily.getTodayInboundAuxiliarySteam();
            monthInboundAuxiliaryDieselOil += daily.getTodayInboundAuxiliaryDieselOil();
            monthInboundAuxiliaryNaturalGas += daily.getTodayInboundAuxiliaryNaturalGas();
            monthInboundAuxiliaryElectricQuantity += daily.getTodayInboundAuxiliaryElectricQuantity();
            monthInboundAuxiliaryIndustrialWater += daily.getTodayInboundAuxiliaryIndustrialWater();
            monthInboundAuxiliaryTapWaterQuantity += daily.getTodayInboundAuxiliaryTapWaterQuantity();
            monthOutboundAuxiliaryCalcareousLime += daily.getTodayOutboundAuxiliaryCalcareousLime();
            monthOutboundAuxiliaryCommonActivatedCarbon += daily.getTodayOutboundAuxiliaryCommonActivatedCarbon();
            monthOutboundAuxiliaryActivatedCarbon += daily.getTodayOutboundAuxiliaryActivatedCarbon();
            monthOutboundAuxiliaryActivatedCarbonParticles += daily.getTodayOutboundAuxiliaryActivatedCarbonParticles();
            monthOutboundAuxiliaryLye += daily.getTodayOutboundAuxiliaryLye();
            monthOutboundAuxiliaryCausticSoda += daily.getTodayOutboundAuxiliaryCausticSoda();
            monthOutboundAuxiliaryUrea += daily.getTodayOutboundAuxiliaryUrea();
            monthOutboundAuxiliaryHydrochloricAcid += daily.getTodayOutboundAuxiliaryHydrochloricAcid();
            monthOutboundAuxiliaryNahco3 += daily.getTodayOutboundAuxiliaryNahco3();
            monthOutboundAuxiliaryFlour += daily.getTodayOutboundAuxiliaryFlour();
            monthOutboundAuxiliaryDefoamer += daily.getTodayOutboundAuxiliaryDefoamer();
            monthOutboundAuxiliaryFlocculant += daily.getTodayOutboundAuxiliaryFlocculant();
            monthOutboundAuxiliarySoftWaterReducingAgent += daily.getTodayOutboundAuxiliarySoftWaterReducingAgent();
            monthOutboundAuxiliarySoftWaterScaleInhibitor += daily.getTodayOutboundAuxiliarySoftWaterScaleInhibitor();
            monthOutboundAuxiliaryAmmonia += daily.getTodayOutboundAuxiliaryAmmonia();
            monthOutboundAuxiliaryWaterReducingAgent += daily.getTodayOutboundAuxiliaryWaterReducingAgent();
            monthOutboundAuxiliaryWaterScaleInhibitor += daily.getTodayOutboundAuxiliaryWaterScaleInhibitor();
            monthOutboundAuxiliaryNaclo += daily.getTodayOutboundAuxiliaryNaclo();
            monthOutboundAuxiliaryDeodorant += daily.getTodayOutboundAuxiliaryDeodorant();
            monthOutboundAuxiliarySalt += daily.getTodayOutboundAuxiliarySalt();
            monthOutboundAuxiliarySlagBag += daily.getTodayOutboundAuxiliarySlagBag();
            monthOutboundAuxiliaryFlyAshBag += daily.getTodayOutboundAuxiliaryFlyAshBag();
            monthOutboundAuxiliaryMedicalWastesBag += daily.getTodayOutboundAuxiliaryMedicalPackingPlasticBag();
            monthOutboundAuxiliaryCollectionBox += daily.getTodayOutboundAuxiliaryCollectionBox();
            monthOutboundAuxiliaryStandardBox += daily.getTodayOutboundAuxiliaryStandardBox();
            monthOutboundAuxiliaryWoodenPallets += daily.getTodayOutboundAuxiliaryWoodenPallets();
            monthOutboundAuxiliaryStandardTray_1m += daily.getTodayOutboundAuxiliaryStandardTray_1m();
            monthOutboundAuxiliaryStandardTray_1_2m += daily.getTodayOutboundAuxiliaryStandardTray_1_2m();
            monthOutboundAuxiliaryTonBox += daily.getTodayOutboundAuxiliaryTonBox();
            monthOutboundAuxiliarySteam += daily.getTodayOutboundAuxiliarySteam();
            monthOutboundAuxiliaryDieselOil += daily.getTodayOutboundAuxiliaryDieselOil();
            monthOutboundAuxiliaryNaturalGas += daily.getTodayOutboundAuxiliaryNaturalGas();
            monthOutboundAuxiliaryElectricQuantity += daily.getTodayOutboundAuxiliaryElectricQuantity();
            monthOutboundAuxiliaryIndustrialWater += daily.getTodayOutboundAuxiliaryIndustrialWater();
            monthOutboundAuxiliaryTapWaterQuantity += daily.getTodayOutboundAuxiliaryTapWaterQuantity();
            monthDisposalMedicalAuxiliaryNaclo += daily.getTodayDisposalMedicalAuxiliaryNaclo();
            monthDisposalMedicalAuxiliaryDeodorant += daily.getTodayDisposalMedicalAuxiliaryDeodorant();
            monthDisposalMedicalAuxiliaryMedicalWastesBag += daily.getTodayDisposalMedicalAuxiliaryMedicalWastesBag();
            monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag += daily.getTodayDisposalMedicalAuxiliaryMedicalPackingPlasticBag();
            monthDisposalMedicalAuxiliaryCollectionBox += daily.getTodayDisposalMedicalAuxiliaryCollectionBox();
            monthDisposalMedicalAuxiliarySteam += daily.getTodayDisposalMedicalAuxiliarySteam();
            monthDisposalMedicalAuxiliaryIndustrialWater += daily.getTodayDisposalMedicalAuxiliaryIndustrialWater();
            monthDisposalMedicalAuxiliaryElectricQuantity += daily.getTodayDisposalMedicalAuxiliaryElectricQuantity();
            monthDisposalSecondaryAuxiliaryCalcareousLime += daily.getTodayDisposalSecondaryAuxiliaryCalcareousLime();
            monthDisposalSecondaryAuxiliaryCommonActivatedCarbon += daily.getTodayDisposalSecondaryAuxiliaryCommonActivatedCarbon();
            monthDisposalSecondaryAuxiliaryActivatedCarbon += daily.getTodayDisposalSecondaryAuxiliaryActivatedCarbon();
            monthDisposalSecondaryAuxiliaryActivatedCarbonParticles += daily.getTodayDisposalSecondaryAuxiliaryActivatedCarbonParticles();
            monthDisposalSecondaryAuxiliaryLye += daily.getTodayDisposalSecondaryAuxiliaryLye();
            monthDisposalSecondaryAuxiliarySalt += daily.getTodayDisposalSecondaryAuxiliarySalt();
            monthDisposalSecondaryAuxiliarySlagBag += daily.getTodayDisposalSecondaryAuxiliarySlagBag();
            monthDisposalSecondaryAuxiliaryFlyAshBag += daily.getTodayDisposalSecondaryAuxiliaryFlyAshBag();
            monthDisposalSecondaryAuxiliaryDieselOil += daily.getTodayDisposalSecondaryAuxiliaryDieselOil();
            monthDisposalSecondaryAuxiliaryIndustrialWater += daily.getTodayDisposalSecondaryAuxiliaryIndustrialWater();
            monthDisposalSecondaryAuxiliaryElectricQuantity += daily.getTodayDisposalSecondaryAuxiliaryElectricQuantity();
            monthDisposalSecondaryAuxiliaryWoodenPallets += daily.getTodayDisposalSecondaryAuxiliaryWoodenPallets();
            monthDisposalThirdAuxiliaryCalcareousLime += daily.getTodayDisposalThirdAuxiliaryCalcareousLime();
            monthDisposalThirdAuxiliaryCommonActivatedCarbon += daily.getTodayDisposalThirdAuxiliaryCommonActivatedCarbon();
            monthDisposalThirdAuxiliaryActivatedCarbon += daily.getTodayDisposalThirdAuxiliaryActivatedCarbon();
            monthDisposalThirdAuxiliaryActivatedCarbonParticles += daily.getTodayDisposalThirdAuxiliaryActivatedCarbonParticles();
            monthDisposalThirdAuxiliaryLye += daily.getTodayDisposalThirdAuxiliaryLye();
            monthDisposalThirdAuxiliaryCausticSoda += daily.getTodayDisposalThirdAuxiliaryCausticSoda();
            monthDisposalThirdAuxiliaryUrea += daily.getTodayDisposalThirdAuxiliaryUrea();
            monthDisposalThirdAuxiliaryHydrochloricAcid += daily.getTodayDisposalThirdAuxiliaryHydrochloricAcid();
            monthDisposalThirdAuxiliaryNahco3 += daily.getTodayDisposalThirdAuxiliaryNahco3();
            monthDisposalThirdAuxiliaryFlour += daily.getTodayDisposalThirdAuxiliaryFlour();
            monthDisposalThirdAuxiliaryDefoamer += daily.getTodayDisposalThirdAuxiliaryDefoamer();
            monthDisposalThirdAuxiliaryFlocculant += daily.getTodayDisposalThirdAuxiliaryFlocculant();
            monthDisposalThirdAuxiliarySoftWaterReducingAgent += daily.getTodayDisposalThirdAuxiliarySoftWaterReducingAgent();
            monthDisposalThirdAuxiliarySoftWaterScaleInhibitor += daily.getTodayDisposalThirdAuxiliarySoftWaterScaleInhibitor();
            monthDisposalThirdAuxiliaryAmmonia += daily.getTodayDisposalThirdAuxiliaryAmmonia();
            monthDisposalThirdAuxiliaryWaterReducingAgent += daily.getTodayDisposalThirdAuxiliaryWaterReducingAgent();
            monthDisposalThirdAuxiliaryWaterScaleInhibitor += daily.getTodayDisposalThirdAuxiliaryWaterScaleInhibitor();
            monthDisposalThirdAuxiliaryNaclo += daily.getTodayDisposalThirdAuxiliaryNaclo();
            monthDisposalThirdAuxiliaryStandardBox += daily.getTodayDisposalThirdAuxiliaryStandardBox();
            monthDisposalThirdAuxiliaryWoodenPallets += daily.getTodayDisposalThirdAuxiliaryWoodenPallets();
            monthDisposalThirdAuxiliaryStandardTray_1m += daily.getTodayDisposalThirdAuxiliaryStandardTray_1m();
            monthDisposalThirdAuxiliaryStandardTray_1_2m += daily.getTodayDisposalThirdAuxiliaryStandardTray_1_2m();
            monthDisposalThirdAuxiliarySlagBag += daily.getTodayDisposalThirdAuxiliarySlagBag();
            monthDisposalThirdAuxiliaryFlyAshBag += daily.getTodayDisposalThirdAuxiliaryFlyAshBag();
            monthDisposalThirdAuxiliaryTonBox += daily.getTodayDisposalThirdAuxiliaryTonBox();
            monthDisposalThirdAuxiliarySteam += daily.getTodayDisposalThirdAuxiliarySteam();
            monthDisposalThirdAuxiliaryDieselOil += daily.getTodayDisposalThirdAuxiliaryDieselOil();
            monthDisposalThirdAuxiliaryNaturalGas += daily.getTodayDisposalThirdAuxiliaryNaturalGas();
            monthDisposalThirdAuxiliaryIndustrialWater += daily.getTodayDisposalThirdAuxiliaryIndustrialWater();
            monthDisposalThirdAuxiliaryElectricQuantity += daily.getTodayDisposalThirdAuxiliaryElectricQuantity();
            monthDisposalThirdAuxiliaryTapWaterQuantity += daily.getTodayDisposalThirdAuxiliaryTapWaterQuantity();
            monthDisposalTowerElectricQuantity += daily.getTodayDisposalTowerElectricQuantity();

            monthOutboundA2WastesBulk += daily.getTodayOutboundA2WastesBulk();
            monthOutboundA2WastesCrushing += daily.getTodayOutboundA2WastesCrushing();
            monthOutboundA2WastesSludge += daily.getTodayOutboundA2WastesSludge();
            monthOutboundA2WastesDistillation += daily.getTodayOutboundA2WastesDistillation();
            monthOutboundA2WastesSuspension += daily.getTodayOutboundA2WastesSuspension();
            monthOutboundA2WastesWasteLiquid += daily.getTodayOutboundA2WastesWasteLiquid();
            monthOutboundA2MedicalWastes += daily.getTodayOutboundA2MedicalWastes();

            monthOutboundPrepare2WastesBulk += daily.getTodayOutboundPrepare2WastesBulk();
            monthOutboundPrepare2WastesCrushing += daily.getTodayOutboundPrepare2WastesCrushing();
            monthOutboundPrepare2WastesSludge += daily.getTodayOutboundPrepare2WastesSludge();
            monthOutboundPrepare2WastesDistillation += daily.getTodayOutboundPrepare2WastesDistillation();
            monthOutboundPrepare2WastesSuspension += daily.getTodayOutboundPrepare2WastesSuspension();
            monthOutboundPrepare2WastesWasteLiquid += daily.getTodayOutboundPrepare2WastesWasteLiquid();
            monthOutboundPrepare2MedicalWastes += daily.getTodayOutboundPrepare2MedicalWastes();

            monthOutboundB2WastesBulk += daily.getTodayOutboundB2WastesBulk();
            monthOutboundB2WastesCrushing += daily.getTodayOutboundB2WastesCrushing();
            monthOutboundB2WastesSludge += daily.getTodayOutboundB2WastesSludge();
            monthOutboundB2WastesDistillation += daily.getTodayOutboundB2WastesDistillation();
            monthOutboundB2WastesSuspension += daily.getTodayOutboundB2WastesSuspension();
            monthOutboundB2WastesWasteLiquid += daily.getTodayOutboundB2WastesWasteLiquid();
            monthOutboundB2MedicalWastes += daily.getTodayOutboundB2MedicalWastes();

            monthOutboundThirdPretreatmentSystemWastesBulk += daily.getTodayOutboundThirdPretreatmentSystemWastesBulk();
            monthOutboundThirdPretreatmentSystemWastesCrushing += daily.getTodayOutboundThirdPretreatmentSystemWastesCrushing();
            monthOutboundThirdPretreatmentSystemWastesSludge += daily.getTodayOutboundThirdPretreatmentSystemWastesSludge();
            monthOutboundThirdPretreatmentSystemWastesDistillation += daily.getTodayOutboundThirdPretreatmentSystemWastesDistillation();
            monthOutboundThirdPretreatmentSystemWastesSuspension += daily.getTodayOutboundThirdPretreatmentSystemWastesSuspension();
            monthOutboundThirdPretreatmentSystemWastesWasteLiquid += daily.getTodayOutboundThirdPretreatmentSystemWastesWasteLiquid();
            monthOutboundThirdPretreatmentSystemMedicalWastes += daily.getTodayOutboundThirdPretreatmentSystemMedicalWastes();

            monthEquipmentA2StopTime += daily.getTodayEquipmentA2StopTime();
            monthEquipmentB2StopTime += daily.getTodayEquipmentB2StopTime();
            monthEquipmentPrepare2StopTime += daily.getTodayEquipmentPrepare2StopTime();
            monthEquipmentSecondaryStopTime += daily.getTodayEquipmentSecondaryStopTime();
            monthEquipmentThirdStopTime += daily.getTodayEquipmentThirdStopTime();

            monthEquipmentA2RunningTime += daily.getTodayEquipmentA2RunningTime();
            monthEquipmentB2RunningTime += daily.getTodayEquipmentB2RunningTime();
            monthEquipmentPrepare2RunningTime += daily.getTodayEquipmentPrepare2RunningTime();
            monthEquipmentSecondaryRunningTime += daily.getTodayEquipmentSecondaryRunningTime();
            monthEquipmentThirdRunningTime += daily.getTodayEquipmentThirdRunningTime();

            monthDisposalSecondarySlag += daily.getTodayDisposalSecondarySlag();
            monthDisposalSecondaryAsh += daily.getTodayDisposalSecondaryAsh();
            monthDisposalThirdSlag += daily.getTodayDisposalThirdSlag();
            monthDisposalThirdAsh += daily.getTodayDisposalThirdAsh();
        }
        // 设置月份的数值
        productionDaily.setMonthInboundMedicalWastes(monthInboundMedicalWastes);
        productionDaily.setMonthInboundMedicalWastesDirectDisposal(monthInboundMedicalWastesDirectDisposal);
        productionDaily.setMonthInboundMedicalWastesCooking(monthInboundMedicalWastesCooking);
        productionDaily.setMonthInboundMedicalWastesErrorNumber(monthInboundMedicalWastesErrorNumber);
        productionDaily.setMonthInboundMedicalWastesAfterCooking(monthInboundMedicalWastesAfterCooking);
        productionDaily.setMonthInboundMedicalWastesAfterCookingSend(monthInboundMedicalWastesAfterCookingSend);
        productionDaily.setMonthInboundMedicalWastesAfterCookingInbound(monthInboundMedicalWastesAfterCookingInbound);
        productionDaily.setMonthInboundMedicalWastesWetNumber(monthInboundMedicalWastesWetNumber);
        productionDaily.setMonthInboundWastesBulk(monthInboundWastesBulk);
        productionDaily.setMonthInboundWastesCrushing(monthInboundWastesCrushing);
        productionDaily.setMonthInboundWastesSludge(monthInboundWastesSludge);
        productionDaily.setMonthInboundWastesDistillation(monthInboundWastesDistillation);
        productionDaily.setMonthInboundWastesSuspension(monthInboundWastesSuspension);
        productionDaily.setMonthInboundWastesWasteLiquid(monthInboundWastesWasteLiquid);
        productionDaily.setMonthInboundWastesTotal(monthInboundWastesTotal);
        productionDaily.setMonthInboundSecondWastesSlag(monthInboundSecondWastesSlag);
        productionDaily.setMonthInboundSecondWastesAsh(monthInboundSecondWastesAsh);
        productionDaily.setMonthInboundSecondWastesBucket(monthInboundSecondWastesBucket);
        productionDaily.setMonthOutboundMedicalWastes(monthOutboundMedicalWastes);
        productionDaily.setMonthOutboundMedicalWastesDirectDisposal(monthOutboundMedicalWastesDirectDisposal);
        productionDaily.setMonthOutboundMedicalWastesCooking(monthOutboundMedicalWastesCooking);
        productionDaily.setMonthOutboundMedicalWastesErrorNumber(monthOutboundMedicalWastesErrorNumber);
        productionDaily.setMonthOutboundMedicalWastesAfterCooking(monthOutboundMedicalWastesAfterCooking);
        productionDaily.setMonthOutboundMedicalWastesAfterCookingSend(monthOutboundMedicalWastesAfterCookingSend);
        productionDaily.setMonthOutboundMedicalWastesAfterCookingInbound(monthOutboundMedicalWastesAfterCookingInbound);
        productionDaily.setMonthOutboundMedicalWastesWetNumber(monthOutboundMedicalWastesWetNumber);
        productionDaily.setMonthOutboundWastesBulk(monthOutboundWastesBulk);
        productionDaily.setMonthOutboundWastesCrushing(monthOutboundWastesCrushing);
        productionDaily.setMonthOutboundWastesSludge(monthOutboundWastesSludge);
        productionDaily.setMonthOutboundWastesDistillation(monthOutboundWastesDistillation);
        productionDaily.setMonthOutboundWastesSuspension(monthOutboundWastesSuspension);
        productionDaily.setMonthOutboundWastesWasteLiquid(monthOutboundWastesWasteLiquid);
        productionDaily.setMonthOutboundWastesTotal(monthOutboundWastesTotal);
        productionDaily.setMonthOutboundSecondWastesSlag(monthOutboundSecondWastesSlag);
        productionDaily.setMonthOutboundSecondWastesAsh(monthOutboundSecondWastesAsh);
        productionDaily.setMonthOutboundSecondWastesBucket(monthOutboundSecondWastesBucket);
        productionDaily.setMonthInboundAuxiliaryCalcareousLime(monthInboundAuxiliaryCalcareousLime);
        productionDaily.setMonthInboundAuxiliaryCommonActivatedCarbon(monthInboundAuxiliaryCommonActivatedCarbon);
        productionDaily.setMonthInboundAuxiliaryActivatedCarbon(monthInboundAuxiliaryActivatedCarbon);
        productionDaily.setMonthInboundAuxiliaryActivatedCarbonParticles(monthInboundAuxiliaryActivatedCarbonParticles);
        productionDaily.setMonthInboundAuxiliaryLye(monthInboundAuxiliaryLye);
        productionDaily.setMonthInboundAuxiliaryCausticSoda(monthInboundAuxiliaryCausticSoda);
        productionDaily.setMonthInboundAuxiliaryUrea(monthInboundAuxiliaryUrea);
        productionDaily.setMonthInboundAuxiliaryHydrochloricAcid(monthInboundAuxiliaryHydrochloricAcid);
        productionDaily.setMonthInboundAuxiliaryNahco3(monthInboundAuxiliaryNahco3);
        productionDaily.setMonthInboundAuxiliaryFlour(monthInboundAuxiliaryFlour);
        productionDaily.setMonthInboundAuxiliaryDefoamer(monthInboundAuxiliaryDefoamer);
        productionDaily.setMonthInboundAuxiliaryFlocculant(monthInboundAuxiliaryFlocculant);
        productionDaily.setMonthInboundAuxiliarySoftWaterReducingAgent(monthInboundAuxiliarySoftWaterReducingAgent);
        productionDaily.setMonthInboundAuxiliarySoftWaterScaleInhibitor(monthInboundAuxiliarySoftWaterScaleInhibitor);
        productionDaily.setMonthInboundAuxiliaryAmmonia(monthInboundAuxiliaryAmmonia);
        productionDaily.setMonthInboundAuxiliaryWaterReducingAgent(monthInboundAuxiliaryWaterReducingAgent);
        productionDaily.setMonthInboundAuxiliaryWaterScaleInhibitor(monthInboundAuxiliaryWaterScaleInhibitor);
        productionDaily.setMonthInboundAuxiliaryNaclo(monthInboundAuxiliaryNaclo);
        productionDaily.setMonthInboundAuxiliaryDeodorant(monthInboundAuxiliaryDeodorant);
        productionDaily.setMonthInboundAuxiliarySalt(monthInboundAuxiliarySalt);
        productionDaily.setMonthInboundAuxiliarySlagBag(monthInboundAuxiliarySlagBag);
        productionDaily.setMonthInboundAuxiliaryFlyAshBag(monthInboundAuxiliaryFlyAshBag);
        productionDaily.setMonthInboundAuxiliaryMedicalWastesBag(monthInboundAuxiliaryMedicalWastesBag);
        productionDaily.setMonthInboundAuxiliaryMedicalPackingPlasticBag(monthInboundAuxiliaryMedicalPackingPlasticBag);
        productionDaily.setMonthInboundAuxiliaryCollectionBox(monthInboundAuxiliaryCollectionBox);
        productionDaily.setMonthInboundAuxiliaryStandardBox(monthInboundAuxiliaryStandardBox);
        productionDaily.setMonthInboundAuxiliaryWoodenPallets(monthInboundAuxiliaryWoodenPallets);
        productionDaily.setMonthInboundAuxiliaryStandardTray_1m(monthInboundAuxiliaryStandardTray_1m);
        productionDaily.setMonthInboundAuxiliaryStandardTray_1_2m(monthInboundAuxiliaryStandardTray_1_2m);
        productionDaily.setMonthInboundAuxiliaryTonBox(monthInboundAuxiliaryTonBox);
        productionDaily.setMonthInboundAuxiliarySteam(monthInboundAuxiliarySteam);
        productionDaily.setMonthInboundAuxiliaryDieselOil(monthInboundAuxiliaryDieselOil);
        productionDaily.setMonthInboundAuxiliaryNaturalGas(monthInboundAuxiliaryNaturalGas);
        productionDaily.setMonthInboundAuxiliaryElectricQuantity(monthInboundAuxiliaryElectricQuantity);
        productionDaily.setMonthInboundAuxiliaryIndustrialWater(monthInboundAuxiliaryIndustrialWater);
        productionDaily.setMonthInboundAuxiliaryTapWaterQuantity(monthInboundAuxiliaryTapWaterQuantity);
        productionDaily.setMonthOutboundAuxiliaryCalcareousLime(monthOutboundAuxiliaryCalcareousLime);
        productionDaily.setMonthOutboundAuxiliaryCommonActivatedCarbon(monthOutboundAuxiliaryCommonActivatedCarbon);
        productionDaily.setMonthOutboundAuxiliaryActivatedCarbon(monthOutboundAuxiliaryActivatedCarbon);
        productionDaily.setMonthOutboundAuxiliaryActivatedCarbonParticles(monthOutboundAuxiliaryActivatedCarbonParticles);
        productionDaily.setMonthOutboundAuxiliaryLye(monthOutboundAuxiliaryLye);
        productionDaily.setMonthOutboundAuxiliaryCausticSoda(monthOutboundAuxiliaryCausticSoda);
        productionDaily.setMonthOutboundAuxiliaryUrea(monthOutboundAuxiliaryUrea);
        productionDaily.setMonthOutboundAuxiliaryHydrochloricAcid(monthOutboundAuxiliaryHydrochloricAcid);
        productionDaily.setMonthOutboundAuxiliaryNahco3(monthOutboundAuxiliaryNahco3);
        productionDaily.setMonthOutboundAuxiliaryFlour(monthOutboundAuxiliaryFlour);
        productionDaily.setMonthOutboundAuxiliaryDefoamer(monthOutboundAuxiliaryDefoamer);
        productionDaily.setMonthOutboundAuxiliaryFlocculant(monthOutboundAuxiliaryFlocculant);
        productionDaily.setMonthOutboundAuxiliarySoftWaterReducingAgent(monthOutboundAuxiliarySoftWaterReducingAgent);
        productionDaily.setMonthOutboundAuxiliarySoftWaterScaleInhibitor(monthOutboundAuxiliarySoftWaterScaleInhibitor);
        productionDaily.setMonthOutboundAuxiliaryAmmonia(monthOutboundAuxiliaryAmmonia);
        productionDaily.setMonthOutboundAuxiliaryWaterReducingAgent(monthOutboundAuxiliaryWaterReducingAgent);
        productionDaily.setMonthOutboundAuxiliaryWaterScaleInhibitor(monthOutboundAuxiliaryWaterScaleInhibitor);
        productionDaily.setMonthOutboundAuxiliaryNaclo(monthOutboundAuxiliaryNaclo);
        productionDaily.setMonthOutboundAuxiliaryDeodorant(monthOutboundAuxiliaryDeodorant);
        productionDaily.setMonthOutboundAuxiliarySalt(monthOutboundAuxiliarySalt);
        productionDaily.setMonthOutboundAuxiliarySlagBag(monthOutboundAuxiliarySlagBag);
        productionDaily.setMonthOutboundAuxiliaryFlyAshBag(monthOutboundAuxiliaryFlyAshBag);
        productionDaily.setMonthOutboundAuxiliaryMedicalWastesBag(monthOutboundAuxiliaryMedicalWastesBag);
        productionDaily.setMonthOutboundAuxiliaryMedicalPackingPlasticBag(monthOutboundAuxiliaryMedicalPackingPlasticBag);
        productionDaily.setMonthOutboundAuxiliaryWoodenPallets(monthOutboundAuxiliaryWoodenPallets);
        productionDaily.setMonthOutboundAuxiliaryStandardBox(monthOutboundAuxiliaryCollectionBox);
        productionDaily.setMonthOutboundAuxiliaryStandardBox(monthOutboundAuxiliaryStandardBox);
        productionDaily.setMonthOutboundAuxiliaryStandardTray_1m(monthOutboundAuxiliaryStandardTray_1m);
        productionDaily.setMonthOutboundAuxiliaryStandardTray_1_2m(monthOutboundAuxiliaryStandardTray_1_2m);
        productionDaily.setMonthOutboundAuxiliaryTonBox(monthOutboundAuxiliaryTonBox);
        productionDaily.setMonthOutboundAuxiliarySteam(monthOutboundAuxiliarySteam);
        productionDaily.setMonthOutboundAuxiliaryDieselOil(monthOutboundAuxiliaryDieselOil);
        productionDaily.setMonthOutboundAuxiliaryNaturalGas(monthOutboundAuxiliaryNaturalGas);
        productionDaily.setMonthOutboundAuxiliaryElectricQuantity(monthOutboundAuxiliaryElectricQuantity);
        productionDaily.setMonthOutboundAuxiliaryIndustrialWater(monthOutboundAuxiliaryIndustrialWater);
        productionDaily.setMonthOutboundAuxiliaryTapWaterQuantity(monthOutboundAuxiliaryTapWaterQuantity);
        productionDaily.setMonthDisposalMedicalAuxiliaryNaclo(monthDisposalMedicalAuxiliaryNaclo);
        productionDaily.setMonthDisposalMedicalAuxiliaryDeodorant(monthDisposalMedicalAuxiliaryDeodorant);
        productionDaily.setMonthDisposalMedicalAuxiliaryMedicalWastesBag(monthDisposalMedicalAuxiliaryMedicalWastesBag);
        productionDaily.setMonthDisposalMedicalAuxiliaryMedicalPackingPlasticBag(monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag);
        productionDaily.setMonthDisposalMedicalAuxiliaryCollectionBox(monthDisposalMedicalAuxiliaryCollectionBox);
        productionDaily.setMonthDisposalMedicalAuxiliarySteam(monthDisposalMedicalAuxiliarySteam);
        productionDaily.setMonthDisposalMedicalAuxiliaryIndustrialWater(monthDisposalMedicalAuxiliaryIndustrialWater);
        productionDaily.setMonthDisposalMedicalAuxiliaryElectricQuantity(monthDisposalMedicalAuxiliaryElectricQuantity);
        productionDaily.setMonthDisposalSecondaryAuxiliaryCalcareousLime(monthDisposalSecondaryAuxiliaryCalcareousLime);
        productionDaily.setMonthDisposalSecondaryAuxiliaryCommonActivatedCarbon(monthDisposalSecondaryAuxiliaryCommonActivatedCarbon);
        productionDaily.setMonthDisposalSecondaryAuxiliaryActivatedCarbon(monthDisposalSecondaryAuxiliaryActivatedCarbon);
        productionDaily.setMonthDisposalSecondaryAuxiliaryActivatedCarbonParticles(monthDisposalSecondaryAuxiliaryActivatedCarbonParticles);
        productionDaily.setMonthDisposalSecondaryAuxiliaryLye(monthDisposalSecondaryAuxiliaryLye);
        productionDaily.setMonthDisposalSecondaryAuxiliarySalt(monthDisposalSecondaryAuxiliarySalt);
        productionDaily.setMonthDisposalSecondaryAuxiliarySlagBag(monthDisposalSecondaryAuxiliarySlagBag);
        productionDaily.setMonthDisposalSecondaryAuxiliaryFlyAshBag(monthDisposalSecondaryAuxiliaryFlyAshBag);
        productionDaily.setMonthDisposalSecondaryAuxiliaryDieselOil(monthDisposalSecondaryAuxiliaryDieselOil);
        productionDaily.setMonthDisposalSecondaryAuxiliaryIndustrialWater(monthDisposalSecondaryAuxiliaryIndustrialWater);
        productionDaily.setMonthDisposalSecondaryAuxiliaryElectricQuantity(monthDisposalSecondaryAuxiliaryElectricQuantity);
        productionDaily.setMonthDisposalSecondaryAuxiliaryWoodenPallets(monthDisposalSecondaryAuxiliaryWoodenPallets);
        productionDaily.setMonthDisposalThirdAuxiliaryCalcareousLime(monthDisposalThirdAuxiliaryCalcareousLime);
        productionDaily.setMonthDisposalThirdAuxiliaryCommonActivatedCarbon(monthDisposalThirdAuxiliaryCommonActivatedCarbon);
        productionDaily.setMonthDisposalThirdAuxiliaryActivatedCarbon(monthDisposalThirdAuxiliaryActivatedCarbon);
        productionDaily.setMonthDisposalThirdAuxiliaryActivatedCarbonParticles(monthDisposalThirdAuxiliaryActivatedCarbonParticles);
        productionDaily.setMonthDisposalThirdAuxiliaryLye(monthDisposalThirdAuxiliaryLye);
        productionDaily.setMonthDisposalThirdAuxiliaryCausticSoda(monthDisposalThirdAuxiliaryCausticSoda);
        productionDaily.setMonthDisposalThirdAuxiliaryUrea(monthDisposalThirdAuxiliaryUrea);
        productionDaily.setMonthDisposalThirdAuxiliaryHydrochloricAcid(monthDisposalThirdAuxiliaryHydrochloricAcid);
        productionDaily.setMonthDisposalThirdAuxiliaryNahco3(monthDisposalThirdAuxiliaryNahco3);
        productionDaily.setMonthDisposalThirdAuxiliaryFlour(monthDisposalThirdAuxiliaryFlour);
        productionDaily.setMonthDisposalThirdAuxiliaryDefoamer(monthDisposalThirdAuxiliaryDefoamer);
        productionDaily.setMonthDisposalThirdAuxiliaryFlocculant(monthDisposalThirdAuxiliaryFlocculant);
        productionDaily.setMonthDisposalThirdAuxiliarySoftWaterReducingAgent(monthDisposalThirdAuxiliarySoftWaterReducingAgent);
        productionDaily.setMonthDisposalThirdAuxiliarySoftWaterScaleInhibitor(monthDisposalThirdAuxiliarySoftWaterScaleInhibitor);
        productionDaily.setMonthDisposalThirdAuxiliaryAmmonia(monthDisposalThirdAuxiliaryAmmonia);
        productionDaily.setMonthDisposalThirdAuxiliaryWaterReducingAgent(monthDisposalThirdAuxiliaryWaterReducingAgent);
        productionDaily.setMonthDisposalThirdAuxiliaryWaterScaleInhibitor(monthDisposalThirdAuxiliaryWaterScaleInhibitor);
        productionDaily.setMonthDisposalThirdAuxiliaryNaclo(monthDisposalThirdAuxiliaryNaclo);
        productionDaily.setMonthDisposalThirdAuxiliaryStandardBox(monthDisposalThirdAuxiliaryStandardBox);
        productionDaily.setMonthDisposalThirdAuxiliaryWoodenPallets(monthDisposalThirdAuxiliaryWoodenPallets);
        productionDaily.setMonthDisposalThirdAuxiliaryStandardTray_1m(monthDisposalThirdAuxiliaryStandardTray_1m);
        productionDaily.setMonthDisposalThirdAuxiliaryStandardTray_1_2m(monthDisposalThirdAuxiliaryStandardTray_1_2m);
        productionDaily.setMonthDisposalThirdAuxiliarySlagBag(monthDisposalThirdAuxiliarySlagBag);
        productionDaily.setMonthDisposalThirdAuxiliaryFlyAshBag(monthDisposalThirdAuxiliaryFlyAshBag);
        productionDaily.setMonthDisposalThirdAuxiliaryTonBox(monthDisposalThirdAuxiliaryTonBox);
        productionDaily.setMonthDisposalThirdAuxiliarySteam(monthDisposalThirdAuxiliarySteam);
        productionDaily.setMonthDisposalThirdAuxiliaryDieselOil(monthDisposalThirdAuxiliaryDieselOil);
        productionDaily.setMonthDisposalThirdAuxiliaryNaturalGas(monthDisposalThirdAuxiliaryNaturalGas);
        productionDaily.setMonthDisposalThirdAuxiliaryIndustrialWater(monthDisposalThirdAuxiliaryIndustrialWater);
        productionDaily.setMonthDisposalThirdAuxiliaryElectricQuantity(monthDisposalThirdAuxiliaryElectricQuantity);
        productionDaily.setMonthDisposalThirdAuxiliaryTapWaterQuantity(monthDisposalThirdAuxiliaryTapWaterQuantity);
        productionDaily.setMonthDisposalTowerElectricQuantity(monthDisposalTowerElectricQuantity);

        productionDaily.setMonthOutboundA2WastesBulk(monthOutboundA2WastesBulk);
        productionDaily.setMonthOutboundA2WastesCrushing(monthOutboundA2WastesCrushing);
        productionDaily.setMonthOutboundA2WastesSludge(monthOutboundA2WastesSludge);
        productionDaily.setMonthOutboundA2WastesDistillation(monthOutboundA2WastesDistillation);
        productionDaily.setMonthOutboundA2WastesSuspension(monthOutboundA2WastesSuspension);
        productionDaily.setMonthOutboundA2WastesWasteLiquid(monthOutboundA2WastesWasteLiquid);
        productionDaily.setMonthOutboundA2MedicalWastes(monthOutboundA2MedicalWastes);

        productionDaily.setMonthOutboundPrepare2WastesBulk(monthOutboundPrepare2WastesBulk);
        productionDaily.setMonthOutboundPrepare2WastesCrushing(monthOutboundPrepare2WastesCrushing);
        productionDaily.setMonthOutboundPrepare2WastesSludge(monthOutboundPrepare2WastesSludge);
        productionDaily.setMonthOutboundPrepare2WastesDistillation(monthOutboundPrepare2WastesDistillation);
        productionDaily.setMonthOutboundPrepare2WastesSuspension(monthOutboundPrepare2WastesSuspension);
        productionDaily.setMonthOutboundPrepare2WastesWasteLiquid(monthOutboundPrepare2WastesWasteLiquid);
        productionDaily.setMonthOutboundPrepare2MedicalWastes(monthOutboundPrepare2MedicalWastes);

        productionDaily.setMonthOutboundB2WastesBulk(monthOutboundB2WastesBulk);
        productionDaily.setMonthOutboundB2WastesCrushing(monthOutboundB2WastesCrushing);
        productionDaily.setMonthOutboundB2WastesSludge(monthOutboundB2WastesSludge);
        productionDaily.setMonthOutboundB2WastesDistillation(monthOutboundB2WastesDistillation);
        productionDaily.setMonthOutboundB2WastesSuspension(monthOutboundB2WastesSuspension);
        productionDaily.setMonthOutboundB2WastesWasteLiquid(monthOutboundB2WastesWasteLiquid);
        productionDaily.setMonthOutboundB2MedicalWastes(monthOutboundB2MedicalWastes);

        productionDaily.setMonthOutboundThirdPretreatmentSystemWastesBulk(monthOutboundThirdPretreatmentSystemWastesBulk);
        productionDaily.setMonthOutboundThirdPretreatmentSystemWastesCrushing(monthOutboundThirdPretreatmentSystemWastesCrushing);
        productionDaily.setMonthOutboundThirdPretreatmentSystemWastesSludge(monthOutboundThirdPretreatmentSystemWastesSludge);
        productionDaily.setMonthOutboundThirdPretreatmentSystemWastesDistillation(monthOutboundThirdPretreatmentSystemWastesDistillation);
        productionDaily.setMonthOutboundThirdPretreatmentSystemWastesSuspension(monthOutboundThirdPretreatmentSystemWastesSuspension);
        productionDaily.setMonthOutboundThirdPretreatmentSystemWastesWasteLiquid(monthOutboundThirdPretreatmentSystemWastesWasteLiquid);
        productionDaily.setMonthOutboundThirdPretreatmentSystemMedicalWastes(monthOutboundThirdPretreatmentSystemMedicalWastes);

        productionDaily.setMonthEquipmentA2StopTime(monthEquipmentA2StopTime);
        productionDaily.setMonthEquipmentB2StopTime(monthEquipmentB2StopTime);
        productionDaily.setMonthEquipmentPrepare2StopTime(monthEquipmentPrepare2StopTime);
        productionDaily.setMonthEquipmentSecondaryStopTime(monthEquipmentSecondaryStopTime);
        productionDaily.setMonthEquipmentThirdStopTime(monthEquipmentThirdStopTime);

        productionDaily.setMonthEquipmentA2RunningTime(monthEquipmentA2RunningTime);
        productionDaily.setMonthEquipmentB2RunningTime(monthEquipmentB2RunningTime);
        productionDaily.setMonthEquipmentPrepare2RunningTime(monthEquipmentPrepare2RunningTime);
        productionDaily.setMonthEquipmentSecondaryRunningTime(monthEquipmentSecondaryRunningTime);
        productionDaily.setMonthEquipmentThirdRunningTime(monthEquipmentThirdRunningTime);

        productionDaily.setMonthEquipmentA2RunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getMonthEquipmentA2RunningTime(), productionDaily.getMonthEquipmentA2StopTime())));
        productionDaily.setMonthEquipmentB2RunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getMonthEquipmentB2RunningTime(), productionDaily.getMonthEquipmentB2StopTime())));
        productionDaily.setMonthEquipmentPrepare2RunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getMonthEquipmentPrepare2RunningTime(), productionDaily.getMonthEquipmentPrepare2StopTime())));
        productionDaily.setMonthEquipmentSecondaryRunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getMonthEquipmentSecondaryRunningTime(), productionDaily.getMonthEquipmentSecondaryStopTime())));
        productionDaily.setMonthEquipmentThirdRunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getMonthEquipmentThirdRunningTime(), productionDaily.getMonthEquipmentThirdStopTime())));

        productionDaily.setMonthDisposalSecondarySlag(monthDisposalSecondarySlag);
        productionDaily.setMonthDisposalSecondaryAsh(monthDisposalSecondaryAsh);
        productionDaily.setMonthDisposalThirdSlag(monthDisposalThirdSlag);
        productionDaily.setMonthDisposalThirdAsh(monthDisposalThirdAsh);


        // 年份数据
        float yearInboundMedicalWastes = 0f;
        float yearInboundMedicalWastesDirectDisposal = 0f;
        float yearInboundMedicalWastesCooking = 0f;
        float yearInboundMedicalWastesErrorNumber = 0f;
        float yearInboundMedicalWastesAfterCooking = 0f;
        float yearInboundMedicalWastesAfterCookingSend = 0f;
        float yearInboundMedicalWastesAfterCookingInbound = 0f;
        float yearInboundMedicalWastesWetNumber = 0f;
        float yearInboundWastesBulk = 0f;
        float yearInboundWastesCrushing = 0f;
        float yearInboundWastesSludge = 0f;
        float yearInboundWastesDistillation = 0f;
        float yearInboundWastesSuspension = 0f;
        float yearInboundWastesWasteLiquid = 0f;
        float yearInboundWastesTotal = 0f;
        float yearInboundSecondWastesSlag = 0f;
        float yearInboundSecondWastesAsh = 0f;
        float yearInboundSecondWastesBucket = 0f;
        float yearOutboundMedicalWastes = 0f;
        float yearOutboundMedicalWastesDirectDisposal = 0f;
        float yearOutboundMedicalWastesCooking = 0f;
        float yearOutboundMedicalWastesErrorNumber = 0f;
        float yearOutboundMedicalWastesAfterCooking = 0f;
        float yearOutboundMedicalWastesAfterCookingSend = 0f;
        float yearOutboundMedicalWastesAfterCookingInbound = 0f;
        float yearOutboundMedicalWastesWetNumber = 0f;
        float yearOutboundWastesBulk = 0f;
        float yearOutboundWastesCrushing = 0f;
        float yearOutboundWastesSludge = 0f;
        float yearOutboundWastesDistillation = 0f;
        float yearOutboundWastesSuspension = 0f;
        float yearOutboundWastesWasteLiquid = 0f;
        float yearOutboundWastesTotal = 0f;
        float yearOutboundSecondWastesSlag = 0f;
        float yearOutboundSecondWastesAsh = 0f;
        float yearOutboundSecondWastesBucket = 0f;
        float yearInboundAuxiliaryCalcareousLime = 0f;
        float yearInboundAuxiliaryCommonActivatedCarbon = 0f;
        float yearInboundAuxiliaryActivatedCarbon = 0f;
        float yearInboundAuxiliaryActivatedCarbonParticles = 0f;
        float yearInboundAuxiliaryLye = 0f;
        float yearInboundAuxiliaryCausticSoda = 0f;
        float yearInboundAuxiliaryUrea = 0f;
        float yearInboundAuxiliaryHydrochloricAcid = 0f;
        float yearInboundAuxiliaryNahco3 = 0f;
        float yearInboundAuxiliaryFlour = 0f;
        float yearInboundAuxiliaryDefoamer = 0f;
        float yearInboundAuxiliaryFlocculant = 0f;
        float yearInboundAuxiliarySoftWaterReducingAgent = 0f;
        float yearInboundAuxiliarySoftWaterScaleInhibitor = 0f;
        float yearInboundAuxiliaryAmmonia = 0f;
        float yearInboundAuxiliaryWaterReducingAgent = 0f;
        float yearInboundAuxiliaryWaterScaleInhibitor = 0f;
        float yearInboundAuxiliaryNaclo = 0f;
        float yearInboundAuxiliaryDeodorant = 0f;
        float yearInboundAuxiliarySalt = 0f;
        float yearInboundAuxiliarySlagBag = 0f;
        float yearInboundAuxiliaryFlyAshBag = 0f;
        float yearInboundAuxiliaryMedicalWastesBag = 0f;
        float yearInboundAuxiliaryMedicalPackingPlasticBag = 0f;
        float yearInboundAuxiliaryCollectionBox = 0f;
        float yearInboundAuxiliaryStandardBox = 0f;
        float yearInboundAuxiliaryWoodenPallets = 0f;
        float yearInboundAuxiliaryStandardTray_1m = 0f;
        float yearInboundAuxiliaryStandardTray_1_2m = 0f;
        float yearInboundAuxiliaryTonBox = 0f;
        float yearInboundAuxiliarySteam = 0f;
        float yearInboundAuxiliaryDieselOil = 0f;
        float yearInboundAuxiliaryNaturalGas = 0f;
        float yearInboundAuxiliaryElectricQuantity = 0f;
        float yearInboundAuxiliaryIndustrialWater = 0f;
        float yearInboundAuxiliaryTapWaterQuantity = 0f;

        float yearOutboundAuxiliaryCalcareousLime = 0f;
        float yearOutboundAuxiliaryCommonActivatedCarbon = 0f;
        float yearOutboundAuxiliaryActivatedCarbon = 0f;
        float yearOutboundAuxiliaryActivatedCarbonParticles = 0f;
        float yearOutboundAuxiliaryLye = 0f;
        float yearOutboundAuxiliaryCausticSoda = 0f;
        float yearOutboundAuxiliaryUrea = 0f;
        float yearOutboundAuxiliaryHydrochloricAcid = 0f;
        float yearOutboundAuxiliaryNahco3 = 0f;
        float yearOutboundAuxiliaryFlour = 0f;
        float yearOutboundAuxiliaryDefoamer = 0f;
        float yearOutboundAuxiliaryFlocculant = 0f;
        float yearOutboundAuxiliarySoftWaterReducingAgent = 0f;
        float yearOutboundAuxiliarySoftWaterScaleInhibitor = 0f;
        float yearOutboundAuxiliaryAmmonia = 0f;
        float yearOutboundAuxiliaryWaterReducingAgent = 0f;
        float yearOutboundAuxiliaryWaterScaleInhibitor = 0f;
        float yearOutboundAuxiliaryNaclo = 0f;
        float yearOutboundAuxiliaryDeodorant = 0f;
        float yearOutboundAuxiliarySalt = 0f;
        float yearOutboundAuxiliarySlagBag = 0f;
        float yearOutboundAuxiliaryFlyAshBag = 0f;
        float yearOutboundAuxiliaryMedicalWastesBag = 0f;
        float yearOutboundAuxiliaryMedicalPackingPlasticBag = 0f;
        float yearOutboundAuxiliaryCollectionBox = 0f;
        float yearOutboundAuxiliaryStandardBox = 0f;
        float yearOutboundAuxiliaryWoodenPallets = 0f;
        float yearOutboundAuxiliaryStandardTray_1m = 0f;
        float yearOutboundAuxiliaryStandardTray_1_2m = 0f;
        float yearOutboundAuxiliaryTonBox = 0f;
        float yearOutboundAuxiliarySteam = 0f;
        float yearOutboundAuxiliaryDieselOil = 0f;
        float yearOutboundAuxiliaryNaturalGas = 0f;
        float yearOutboundAuxiliaryElectricQuantity = 0f;
        float yearOutboundAuxiliaryIndustrialWater = 0f;
        float yearOutboundAuxiliaryTapWaterQuantity = 0f;

        float yearDisposalMedicalAuxiliaryNaclo = 0f;
        float yearDisposalMedicalAuxiliaryDeodorant = 0f;
        float yearDisposalMedicalAuxiliaryMedicalWastesBag = 0f;
        float yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag = 0f;
        float yearDisposalMedicalAuxiliaryCollectionBox = 0f;
        float yearDisposalMedicalAuxiliarySteam = 0f;
        float yearDisposalMedicalAuxiliaryIndustrialWater = 0f;
        float yearDisposalMedicalAuxiliaryElectricQuantity = 0f;
        float yearDisposalSecondaryAuxiliaryCalcareousLime = 0f;
        float yearDisposalSecondaryAuxiliaryCommonActivatedCarbon = 0f;
        float yearDisposalSecondaryAuxiliaryActivatedCarbon = 0f;
        float yearDisposalSecondaryAuxiliaryActivatedCarbonParticles = 0f;
        float yearDisposalSecondaryAuxiliaryLye = 0f;
        float yearDisposalSecondaryAuxiliarySalt = 0f;
        float yearDisposalSecondaryAuxiliarySlagBag = 0f;
        float yearDisposalSecondaryAuxiliaryFlyAshBag = 0f;
        float yearDisposalSecondaryAuxiliaryDieselOil = 0f;
        float yearDisposalSecondaryAuxiliaryIndustrialWater = 0f;
        float yearDisposalSecondaryAuxiliaryElectricQuantity = 0f;
        float yearDisposalSecondaryAuxiliaryWoodenPallets = 0f;
        float yearDisposalThirdAuxiliaryCalcareousLime = 0f;
        float yearDisposalThirdAuxiliaryCommonActivatedCarbon = 0f;
        float yearDisposalThirdAuxiliaryActivatedCarbon = 0f;
        float yearDisposalThirdAuxiliaryActivatedCarbonParticles = 0f;
        float yearDisposalThirdAuxiliaryLye = 0f;
        float yearDisposalThirdAuxiliaryCausticSoda = 0f;
        float yearDisposalThirdAuxiliaryUrea = 0f;
        float yearDisposalThirdAuxiliaryHydrochloricAcid = 0f;
        float yearDisposalThirdAuxiliaryNahco3 = 0f;
        float yearDisposalThirdAuxiliaryFlour = 0f;
        float yearDisposalThirdAuxiliaryDefoamer = 0f;
        float yearDisposalThirdAuxiliaryFlocculant = 0f;
        float yearDisposalThirdAuxiliarySoftWaterReducingAgent = 0f;
        float yearDisposalThirdAuxiliarySoftWaterScaleInhibitor = 0f;
        float yearDisposalThirdAuxiliaryAmmonia = 0f;
        float yearDisposalThirdAuxiliaryWaterReducingAgent = 0f;
        float yearDisposalThirdAuxiliaryWaterScaleInhibitor = 0f;
        float yearDisposalThirdAuxiliaryNaclo = 0f;
        float yearDisposalThirdAuxiliaryStandardBox = 0f;
        float yearDisposalThirdAuxiliaryWoodenPallets = 0f;
        float yearDisposalThirdAuxiliaryStandardTray_1m = 0f;
        float yearDisposalThirdAuxiliaryStandardTray_1_2m = 0f;
        float yearDisposalThirdAuxiliarySlagBag = 0f;
        float yearDisposalThirdAuxiliaryFlyAshBag = 0f;
        float yearDisposalThirdAuxiliaryTonBox = 0f;
        float yearDisposalThirdAuxiliarySteam = 0f;
        float yearDisposalThirdAuxiliaryDieselOil = 0f;
        float yearDisposalThirdAuxiliaryNaturalGas = 0f;
        float yearDisposalThirdAuxiliaryIndustrialWater = 0f;
        float yearDisposalThirdAuxiliaryElectricQuantity = 0f;
        float yearDisposalThirdAuxiliaryTapWaterQuantity = 0f;
        float yearDisposalTowerElectricQuantity = 0f;

        float yearOutboundA2WastesBulk = 0f;
        float yearOutboundA2WastesCrushing = 0f;
        float yearOutboundA2WastesSludge = 0f;
        float yearOutboundA2WastesDistillation = 0f;
        float yearOutboundA2WastesSuspension = 0f;
        float yearOutboundA2WastesWasteLiquid = 0f;
        float yearOutboundA2MedicalWastes = 0f;
        float yearOutboundPrepare2WastesBulk = 0f;
        float yearOutboundPrepare2WastesCrushing = 0f;
        float yearOutboundPrepare2WastesSludge = 0f;
        float yearOutboundPrepare2WastesDistillation = 0f;
        float yearOutboundPrepare2WastesSuspension = 0f;
        float yearOutboundPrepare2WastesWasteLiquid = 0f;
        float yearOutboundPrepare2MedicalWastes = 0f;
        float yearOutboundB2WastesBulk = 0f;
        float yearOutboundB2WastesCrushing = 0f;
        float yearOutboundB2WastesSludge = 0f;
        float yearOutboundB2WastesDistillation = 0f;
        float yearOutboundB2WastesSuspension = 0f;
        float yearOutboundB2WastesWasteLiquid = 0f;
        float yearOutboundB2MedicalWastes = 0f;
        float yearOutboundSecondPretreatmentWastes = 0f;
        float yearOutboundThirdPretreatmentSystemWastesBulk = 0f;
        float yearOutboundThirdPretreatmentSystemWastesCrushing = 0f;
        float yearOutboundThirdPretreatmentSystemWastesSludge = 0f;
        float yearOutboundThirdPretreatmentSystemWastesDistillation = 0f;
        float yearOutboundThirdPretreatmentSystemWastesSuspension = 0f;
        float yearOutboundThirdPretreatmentSystemWastesWasteLiquid = 0f;
        float yearOutboundThirdPretreatmentSystemMedicalWastes = 0f;

        float yearEquipmentA2StopTime = 0f;
        float yearEquipmentB2StopTime = 0f;
        float yearEquipmentPrepare2StopTime = 0f;
        float yearEquipmentSecondaryStopTime = 0f;
        float yearEquipmentThirdStopTime = 0f;
        float yearEquipmentA2RunningTime = 0f;
        float yearEquipmentB2RunningTime = 0f;
        float yearEquipmentPrepare2RunningTime = 0f;
        float yearEquipmentSecondaryRunningTime = 0f;
        float yearEquipmentThirdRunningTime = 0f;

        float yearDisposalSecondarySlag = 0f;
        float yearDisposalSecondaryAsh = 0f;
        float yearDisposalThirdSlag = 0f;
        float yearDisposalThirdAsh = 0f;

        // 获取日报所在年份的所有日报
        List<ProductionDaily> productionDailyYearList = productionDailyService.getProductionDailyByDateRange(yearFirstDay, yearEndDay, null);
        for (ProductionDaily daily : productionDailyYearList) {
            yearInboundMedicalWastes += daily.getTodayInboundMedicalWastes();
            yearInboundMedicalWastesDirectDisposal += daily.getTodayInboundMedicalWastesDirectDisposal();
            yearInboundMedicalWastesCooking += daily.getTodayInboundMedicalWastesCooking();
            yearInboundMedicalWastesErrorNumber += daily.getTodayInboundMedicalWastesErrorNumber();
            yearInboundMedicalWastesAfterCooking += daily.getTodayInboundMedicalWastesAfterCooking();
            yearInboundMedicalWastesAfterCookingSend += daily.getTodayInboundMedicalWastesAfterCookingSend();
            yearInboundMedicalWastesAfterCookingInbound += daily.getTodayInboundMedicalWastesAfterCookingInbound();
            yearInboundMedicalWastesWetNumber += daily.getTodayInboundMedicalWastesWetNumber();
            yearInboundWastesBulk += daily.getTodayInboundWastesBulk();
            yearInboundWastesCrushing += daily.getTodayInboundWastesCrushing();
            yearInboundWastesSludge += daily.getTodayInboundWastesSludge();
            yearInboundWastesDistillation += daily.getTodayInboundWastesDistillation();
            yearInboundWastesSuspension += daily.getTodayInboundWastesSuspension();
            yearInboundWastesWasteLiquid += daily.getTodayInboundWastesWasteLiquid();
            yearInboundWastesTotal += daily.getTodayInboundWastesTotal();
            yearInboundSecondWastesSlag += daily.getTodayInboundSecondWastesSlag();
            yearInboundSecondWastesAsh += daily.getTodayInboundSecondWastesAsh();
            yearInboundSecondWastesBucket += daily.getTodayInboundSecondWastesBucket();
            yearOutboundMedicalWastes += daily.getTodayOutboundMedicalWastes();
            yearOutboundMedicalWastesDirectDisposal += daily.getTodayOutboundMedicalWastesDirectDisposal();
            yearOutboundMedicalWastesCooking += daily.getTodayOutboundMedicalWastesCooking();
            yearOutboundMedicalWastesErrorNumber += daily.getTodayOutboundMedicalWastesErrorNumber();
            yearOutboundMedicalWastesAfterCooking += daily.getTodayOutboundMedicalWastesAfterCooking();
            yearOutboundMedicalWastesAfterCookingSend += daily.getTodayOutboundMedicalWastesAfterCookingSend();
            yearOutboundMedicalWastesAfterCookingInbound += daily.getTodayOutboundMedicalWastesAfterCookingInbound();
            yearOutboundMedicalWastesWetNumber += daily.getTodayOutboundMedicalWastesWetNumber();
            yearOutboundWastesBulk += daily.getTodayOutboundWastesBulk();
            yearOutboundWastesCrushing += daily.getTodayOutboundWastesCrushing();
            yearOutboundWastesSludge += daily.getTodayOutboundWastesSludge();
            yearOutboundWastesDistillation += daily.getTodayOutboundWastesDistillation();
            yearOutboundWastesSuspension += daily.getTodayOutboundWastesSuspension();
            yearOutboundWastesWasteLiquid += daily.getTodayOutboundWastesWasteLiquid();
            yearOutboundWastesTotal += daily.getTodayOutboundWastesTotal();
            yearOutboundSecondWastesSlag += daily.getTodayOutboundSecondWastesSlag();
            yearOutboundSecondWastesAsh += daily.getTodayOutboundSecondWastesAsh();
            yearOutboundSecondWastesBucket += daily.getTodayOutboundSecondWastesBucket();
            yearInboundMedicalWastes += daily.getTodayInboundMedicalWastes();
            yearInboundMedicalWastesDirectDisposal += daily.getTodayInboundMedicalWastesDirectDisposal();
            yearInboundMedicalWastesCooking += daily.getTodayInboundMedicalWastesCooking();
            yearInboundMedicalWastesErrorNumber += daily.getTodayInboundMedicalWastesErrorNumber();
            yearInboundMedicalWastesAfterCooking += daily.getTodayInboundMedicalWastesAfterCooking();
            yearInboundMedicalWastesAfterCookingSend += daily.getTodayInboundMedicalWastesAfterCookingSend();
            yearInboundMedicalWastesAfterCookingInbound += daily.getTodayInboundMedicalWastesAfterCookingInbound();
            yearInboundMedicalWastesWetNumber += daily.getTodayInboundMedicalWastesWetNumber();
            yearInboundWastesBulk += daily.getTodayInboundWastesBulk();
            yearInboundWastesCrushing += daily.getTodayInboundWastesCrushing();
            yearInboundWastesSludge += daily.getTodayInboundWastesSludge();
            yearInboundWastesDistillation += daily.getTodayInboundWastesDistillation();
            yearInboundWastesSuspension += daily.getTodayInboundWastesSuspension();
            yearInboundWastesWasteLiquid += daily.getTodayInboundWastesWasteLiquid();
            yearInboundWastesTotal += daily.getTodayInboundWastesTotal();
            yearInboundSecondWastesSlag += daily.getTodayInboundSecondWastesSlag();
            yearInboundSecondWastesAsh += daily.getTodayInboundSecondWastesAsh();
            yearInboundSecondWastesBucket += daily.getTodayInboundSecondWastesBucket();
            yearOutboundMedicalWastes += daily.getTodayOutboundMedicalWastes();
            yearOutboundMedicalWastesDirectDisposal += daily.getTodayOutboundMedicalWastesDirectDisposal();
            yearOutboundMedicalWastesCooking += daily.getTodayOutboundMedicalWastesCooking();
            yearOutboundMedicalWastesErrorNumber += daily.getTodayOutboundMedicalWastesErrorNumber();
            yearOutboundMedicalWastesAfterCooking += daily.getTodayOutboundMedicalWastesAfterCooking();
            yearOutboundMedicalWastesAfterCookingSend += daily.getTodayOutboundMedicalWastesAfterCookingSend();
            yearOutboundMedicalWastesAfterCookingInbound += daily.getTodayOutboundMedicalWastesAfterCookingInbound();
            yearOutboundMedicalWastesWetNumber += daily.getTodayOutboundMedicalWastesWetNumber();
            yearOutboundWastesBulk += daily.getTodayOutboundWastesBulk();
            yearOutboundWastesCrushing += daily.getTodayOutboundWastesCrushing();
            yearOutboundWastesSludge += daily.getTodayOutboundWastesSludge();
            yearOutboundWastesDistillation += daily.getTodayOutboundWastesDistillation();
            yearOutboundWastesSuspension += daily.getTodayOutboundWastesSuspension();
            yearOutboundWastesWasteLiquid += daily.getTodayOutboundWastesWasteLiquid();
            yearOutboundWastesTotal += daily.getTodayOutboundWastesTotal();
            yearOutboundSecondWastesSlag += daily.getTodayOutboundSecondWastesSlag();
            yearOutboundSecondWastesAsh += daily.getTodayOutboundSecondWastesAsh();
            yearOutboundSecondWastesBucket += daily.getTodayOutboundSecondWastesBucket();

            yearInboundAuxiliaryCalcareousLime += daily.getTodayInboundAuxiliaryCalcareousLime();
            yearInboundAuxiliaryCommonActivatedCarbon += daily.getTodayInboundAuxiliaryCommonActivatedCarbon();
            yearInboundAuxiliaryActivatedCarbon += daily.getTodayInboundAuxiliaryActivatedCarbon();
            yearInboundAuxiliaryActivatedCarbonParticles += daily.getTodayInboundAuxiliaryActivatedCarbonParticles();
            yearInboundAuxiliaryLye += daily.getTodayInboundAuxiliaryLye();
            yearInboundAuxiliaryCausticSoda += daily.getTodayInboundAuxiliaryCausticSoda();
            yearInboundAuxiliaryUrea += daily.getTodayInboundAuxiliaryUrea();
            yearInboundAuxiliaryHydrochloricAcid += daily.getTodayInboundAuxiliaryHydrochloricAcid();
            yearInboundAuxiliaryNahco3 += daily.getTodayInboundAuxiliaryNahco3();
            yearInboundAuxiliaryFlour += daily.getTodayInboundAuxiliaryFlour();
            yearInboundAuxiliaryDefoamer += daily.getTodayInboundAuxiliaryDefoamer();
            yearInboundAuxiliaryFlocculant += daily.getTodayInboundAuxiliaryFlocculant();
            yearInboundAuxiliarySoftWaterReducingAgent += daily.getTodayInboundAuxiliarySoftWaterReducingAgent();
            yearInboundAuxiliarySoftWaterScaleInhibitor += daily.getTodayInboundAuxiliarySoftWaterScaleInhibitor();
            yearInboundAuxiliaryAmmonia += daily.getTodayInboundAuxiliaryAmmonia();
            yearInboundAuxiliaryWaterReducingAgent += daily.getTodayInboundAuxiliaryWaterReducingAgent();
            yearInboundAuxiliaryWaterScaleInhibitor += daily.getTodayInboundAuxiliaryWaterScaleInhibitor();
            yearInboundAuxiliaryNaclo += daily.getTodayInboundAuxiliaryNaclo();
            yearInboundAuxiliaryDeodorant += daily.getTodayInboundAuxiliaryDeodorant();
            yearInboundAuxiliarySalt += daily.getTodayInboundAuxiliarySalt();
            yearInboundAuxiliarySlagBag += daily.getTodayInboundAuxiliarySlagBag();
            yearInboundAuxiliaryFlyAshBag += daily.getTodayInboundAuxiliaryFlyAshBag();
            yearInboundAuxiliaryMedicalWastesBag += daily.getTodayInboundAuxiliaryMedicalWastesBag();
            yearInboundAuxiliaryMedicalPackingPlasticBag += daily.getTodayInboundAuxiliaryMedicalPackingPlasticBag();
            yearInboundAuxiliaryCollectionBox += daily.getTodayInboundAuxiliaryCollectionBox();
            yearInboundAuxiliaryStandardBox += daily.getTodayInboundAuxiliaryStandardBox();
            yearInboundAuxiliaryWoodenPallets += daily.getTodayInboundAuxiliaryWoodenPallets();
            yearInboundAuxiliaryStandardTray_1m += daily.getTodayInboundAuxiliaryStandardTray_1m();
            yearInboundAuxiliaryStandardTray_1_2m += daily.getTodayInboundAuxiliaryStandardTray_1_2m();
            yearInboundAuxiliaryTonBox += daily.getTodayInboundAuxiliaryTonBox();
            yearInboundAuxiliarySteam += daily.getTodayInboundAuxiliarySteam();
            yearInboundAuxiliaryDieselOil += daily.getTodayInboundAuxiliaryDieselOil();
            yearInboundAuxiliaryNaturalGas += daily.getTodayInboundAuxiliaryNaturalGas();
            yearInboundAuxiliaryElectricQuantity += daily.getTodayInboundAuxiliaryElectricQuantity();
            yearInboundAuxiliaryIndustrialWater += daily.getTodayInboundAuxiliaryIndustrialWater();
            yearInboundAuxiliaryTapWaterQuantity += daily.getTodayInboundAuxiliaryTapWaterQuantity();

            yearOutboundAuxiliaryCalcareousLime += daily.getTodayOutboundAuxiliaryCalcareousLime();
            yearOutboundAuxiliaryCommonActivatedCarbon += daily.getTodayOutboundAuxiliaryCommonActivatedCarbon();
            yearOutboundAuxiliaryActivatedCarbon += daily.getTodayOutboundAuxiliaryActivatedCarbon();
            yearOutboundAuxiliaryActivatedCarbonParticles += daily.getTodayOutboundAuxiliaryActivatedCarbonParticles();
            yearOutboundAuxiliaryLye += daily.getTodayOutboundAuxiliaryLye();
            yearOutboundAuxiliaryCausticSoda += daily.getTodayOutboundAuxiliaryCausticSoda();
            yearOutboundAuxiliaryUrea += daily.getTodayOutboundAuxiliaryUrea();
            yearOutboundAuxiliaryHydrochloricAcid += daily.getTodayOutboundAuxiliaryHydrochloricAcid();
            yearOutboundAuxiliaryNahco3 += daily.getTodayOutboundAuxiliaryNahco3();
            yearOutboundAuxiliaryFlour += daily.getTodayOutboundAuxiliaryFlour();
            yearOutboundAuxiliaryDefoamer += daily.getTodayOutboundAuxiliaryDefoamer();
            yearOutboundAuxiliaryFlocculant += daily.getTodayOutboundAuxiliaryFlocculant();
            yearOutboundAuxiliarySoftWaterReducingAgent += daily.getTodayOutboundAuxiliarySoftWaterReducingAgent();
            yearOutboundAuxiliarySoftWaterScaleInhibitor += daily.getTodayOutboundAuxiliarySoftWaterScaleInhibitor();
            yearOutboundAuxiliaryAmmonia += daily.getTodayOutboundAuxiliaryAmmonia();
            yearOutboundAuxiliaryWaterReducingAgent += daily.getTodayOutboundAuxiliaryWaterReducingAgent();
            yearOutboundAuxiliaryWaterScaleInhibitor += daily.getTodayOutboundAuxiliaryWaterScaleInhibitor();
            yearOutboundAuxiliaryNaclo += daily.getTodayOutboundAuxiliaryNaclo();
            yearOutboundAuxiliaryDeodorant += daily.getTodayOutboundAuxiliaryDeodorant();
            yearOutboundAuxiliarySalt += daily.getTodayOutboundAuxiliarySalt();
            yearOutboundAuxiliarySlagBag += daily.getTodayOutboundAuxiliarySlagBag();
            yearOutboundAuxiliaryFlyAshBag += daily.getTodayOutboundAuxiliaryFlyAshBag();
            yearOutboundAuxiliaryMedicalWastesBag += daily.getTodayOutboundAuxiliaryMedicalWastesBag();
            yearOutboundAuxiliaryMedicalPackingPlasticBag += daily.getTodayOutboundAuxiliaryMedicalPackingPlasticBag();
            yearOutboundAuxiliaryCollectionBox += daily.getTodayOutboundAuxiliaryCollectionBox();
            yearOutboundAuxiliaryStandardBox += daily.getTodayOutboundAuxiliaryStandardBox();
            yearOutboundAuxiliaryWoodenPallets += daily.getTodayOutboundAuxiliaryWoodenPallets();
            yearOutboundAuxiliaryStandardTray_1m += daily.getTodayOutboundAuxiliaryStandardTray_1m();
            yearOutboundAuxiliaryStandardTray_1_2m += daily.getTodayOutboundAuxiliaryStandardTray_1_2m();
            yearOutboundAuxiliaryTonBox += daily.getTodayOutboundAuxiliaryTonBox();
            yearOutboundAuxiliarySteam += daily.getTodayOutboundAuxiliarySteam();
            yearOutboundAuxiliaryDieselOil += daily.getTodayOutboundAuxiliaryDieselOil();
            yearOutboundAuxiliaryNaturalGas += daily.getTodayOutboundAuxiliaryNaturalGas();
            yearOutboundAuxiliaryElectricQuantity += daily.getTodayOutboundAuxiliaryElectricQuantity();
            yearOutboundAuxiliaryIndustrialWater += daily.getTodayOutboundAuxiliaryIndustrialWater();
            yearOutboundAuxiliaryTapWaterQuantity += daily.getTodayOutboundAuxiliaryTapWaterQuantity();

            yearDisposalMedicalAuxiliaryNaclo += daily.getTodayDisposalMedicalAuxiliaryNaclo();
            yearDisposalMedicalAuxiliaryDeodorant += daily.getTodayDisposalMedicalAuxiliaryDeodorant();
            yearDisposalMedicalAuxiliaryMedicalWastesBag += daily.getTodayDisposalMedicalAuxiliaryMedicalWastesBag();
            yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag += daily.getTodayDisposalMedicalAuxiliaryMedicalPackingPlasticBag();
            yearDisposalMedicalAuxiliaryCollectionBox += daily.getTodayDisposalMedicalAuxiliaryCollectionBox();
            yearDisposalMedicalAuxiliarySteam += daily.getTodayDisposalMedicalAuxiliarySteam();
            yearDisposalMedicalAuxiliaryIndustrialWater += daily.getTodayDisposalMedicalAuxiliaryIndustrialWater();
            yearDisposalMedicalAuxiliaryElectricQuantity += daily.getTodayDisposalMedicalAuxiliaryElectricQuantity();
            yearDisposalSecondaryAuxiliaryCalcareousLime += daily.getTodayDisposalSecondaryAuxiliaryCalcareousLime();
            yearDisposalSecondaryAuxiliaryCommonActivatedCarbon += daily.getTodayDisposalSecondaryAuxiliaryCommonActivatedCarbon();
            yearDisposalSecondaryAuxiliaryActivatedCarbon += daily.getTodayDisposalSecondaryAuxiliaryActivatedCarbon();
            yearDisposalSecondaryAuxiliaryActivatedCarbonParticles += daily.getTodayDisposalSecondaryAuxiliaryActivatedCarbonParticles();
            yearDisposalSecondaryAuxiliaryLye += daily.getTodayDisposalSecondaryAuxiliaryLye();
            yearDisposalSecondaryAuxiliarySalt += daily.getTodayDisposalSecondaryAuxiliarySalt();
            yearDisposalSecondaryAuxiliarySlagBag += daily.getTodayDisposalSecondaryAuxiliarySlagBag();
            yearDisposalSecondaryAuxiliaryFlyAshBag += daily.getTodayDisposalSecondaryAuxiliaryFlyAshBag();
            yearDisposalSecondaryAuxiliaryDieselOil += daily.getTodayDisposalSecondaryAuxiliaryDieselOil();
            yearDisposalSecondaryAuxiliaryIndustrialWater += daily.getTodayDisposalSecondaryAuxiliaryIndustrialWater();
            yearDisposalSecondaryAuxiliaryElectricQuantity += daily.getTodayDisposalSecondaryAuxiliaryElectricQuantity();
            yearDisposalSecondaryAuxiliaryWoodenPallets += daily.getTodayDisposalSecondaryAuxiliaryWoodenPallets();
            yearDisposalThirdAuxiliaryCalcareousLime += daily.getTodayDisposalThirdAuxiliaryCalcareousLime();
            yearDisposalThirdAuxiliaryCommonActivatedCarbon += daily.getTodayDisposalThirdAuxiliaryCommonActivatedCarbon();
            yearDisposalThirdAuxiliaryActivatedCarbon += daily.getTodayDisposalThirdAuxiliaryActivatedCarbon();
            yearDisposalThirdAuxiliaryActivatedCarbonParticles += daily.getTodayDisposalThirdAuxiliaryActivatedCarbonParticles();
            yearDisposalThirdAuxiliaryLye += daily.getTodayDisposalThirdAuxiliaryLye();
            yearDisposalThirdAuxiliaryCausticSoda += daily.getTodayDisposalThirdAuxiliaryCausticSoda();
            yearDisposalThirdAuxiliaryUrea += daily.getTodayDisposalThirdAuxiliaryUrea();
            yearDisposalThirdAuxiliaryHydrochloricAcid += daily.getTodayDisposalThirdAuxiliaryHydrochloricAcid();
            yearDisposalThirdAuxiliaryNahco3 += daily.getTodayDisposalThirdAuxiliaryNahco3();
            yearDisposalThirdAuxiliaryFlour += daily.getTodayDisposalThirdAuxiliaryFlour();
            yearDisposalThirdAuxiliaryDefoamer += daily.getTodayDisposalThirdAuxiliaryDefoamer();
            yearDisposalThirdAuxiliaryFlocculant += daily.getTodayDisposalThirdAuxiliaryFlocculant();
            yearDisposalThirdAuxiliarySoftWaterReducingAgent += daily.getTodayDisposalThirdAuxiliarySoftWaterReducingAgent();
            yearDisposalThirdAuxiliarySoftWaterScaleInhibitor += daily.getTodayDisposalThirdAuxiliarySoftWaterScaleInhibitor();
            yearDisposalThirdAuxiliaryAmmonia += daily.getTodayDisposalThirdAuxiliaryAmmonia();
            yearDisposalThirdAuxiliaryWaterReducingAgent += daily.getTodayDisposalThirdAuxiliaryWaterReducingAgent();
            yearDisposalThirdAuxiliaryWaterScaleInhibitor += daily.getTodayDisposalThirdAuxiliaryWaterScaleInhibitor();
            yearDisposalThirdAuxiliaryNaclo += daily.getTodayDisposalThirdAuxiliaryNaclo();
            yearDisposalThirdAuxiliaryStandardBox += daily.getTodayDisposalThirdAuxiliaryStandardBox();
            yearDisposalThirdAuxiliaryWoodenPallets += daily.getTodayDisposalThirdAuxiliaryWoodenPallets();
            yearDisposalThirdAuxiliaryStandardTray_1m += daily.getTodayDisposalThirdAuxiliaryStandardTray_1m();
            yearDisposalThirdAuxiliaryStandardTray_1_2m += daily.getTodayDisposalThirdAuxiliaryStandardTray_1_2m();
            yearDisposalThirdAuxiliarySlagBag += daily.getTodayDisposalThirdAuxiliarySlagBag();
            yearDisposalThirdAuxiliaryFlyAshBag += daily.getTodayDisposalThirdAuxiliaryFlyAshBag();
            yearDisposalThirdAuxiliaryTonBox += daily.getTodayDisposalThirdAuxiliaryTonBox();
            yearDisposalThirdAuxiliarySteam += daily.getTodayDisposalThirdAuxiliarySteam();
            yearDisposalThirdAuxiliaryDieselOil += daily.getTodayDisposalThirdAuxiliaryDieselOil();
            yearDisposalThirdAuxiliaryNaturalGas += daily.getTodayDisposalThirdAuxiliaryNaturalGas();
            yearDisposalThirdAuxiliaryIndustrialWater += daily.getTodayDisposalThirdAuxiliaryIndustrialWater();
            yearDisposalThirdAuxiliaryElectricQuantity += daily.getTodayDisposalThirdAuxiliaryElectricQuantity();
            yearDisposalThirdAuxiliaryTapWaterQuantity += daily.getTodayDisposalThirdAuxiliaryTapWaterQuantity();
            yearDisposalTowerElectricQuantity += daily.getTodayDisposalTowerElectricQuantity();

            yearOutboundA2WastesBulk += daily.getTodayOutboundA2WastesBulk();
            yearOutboundA2WastesCrushing += daily.getTodayOutboundA2WastesCrushing();
            yearOutboundA2WastesSludge += daily.getTodayOutboundA2WastesSludge();
            yearOutboundA2WastesDistillation += daily.getTodayOutboundA2WastesDistillation();
            yearOutboundA2WastesSuspension += daily.getTodayOutboundA2WastesSuspension();
            yearOutboundA2WastesWasteLiquid += daily.getTodayOutboundA2WastesWasteLiquid();
            yearOutboundA2MedicalWastes += daily.getTodayOutboundA2MedicalWastes();
            yearOutboundPrepare2WastesBulk += daily.getTodayOutboundPrepare2WastesBulk();
            yearOutboundPrepare2WastesCrushing += daily.getTodayOutboundPrepare2WastesCrushing();
            yearOutboundPrepare2WastesSludge += daily.getTodayOutboundPrepare2WastesSludge();
            yearOutboundPrepare2WastesDistillation += daily.getTodayOutboundPrepare2WastesDistillation();
            yearOutboundPrepare2WastesSuspension += daily.getTodayOutboundPrepare2WastesSuspension();
            yearOutboundPrepare2WastesWasteLiquid += daily.getTodayOutboundPrepare2WastesWasteLiquid();
            yearOutboundPrepare2MedicalWastes += daily.getTodayOutboundPrepare2MedicalWastes();
            yearOutboundB2WastesBulk += daily.getTodayOutboundB2WastesBulk();
            yearOutboundB2WastesCrushing += daily.getTodayOutboundB2WastesCrushing();
            yearOutboundB2WastesSludge += daily.getTodayOutboundB2WastesSludge();
            yearOutboundB2WastesDistillation += daily.getTodayOutboundB2WastesDistillation();
            yearOutboundB2WastesSuspension += daily.getTodayOutboundB2WastesSuspension();
            yearOutboundB2WastesWasteLiquid += daily.getTodayOutboundB2WastesWasteLiquid();
            yearOutboundB2MedicalWastes += daily.getTodayOutboundB2MedicalWastes();
            yearOutboundSecondPretreatmentWastes += daily.getTodayOutboundSecondPretreatmentWastes();
            yearOutboundThirdPretreatmentSystemWastesBulk += daily.getTodayOutboundThirdPretreatmentSystemWastesBulk();
            yearOutboundThirdPretreatmentSystemWastesCrushing += daily.getTodayOutboundThirdPretreatmentSystemWastesCrushing();
            yearOutboundThirdPretreatmentSystemWastesSludge += daily.getTodayOutboundThirdPretreatmentSystemWastesSludge();
            yearOutboundThirdPretreatmentSystemWastesDistillation += daily.getTodayOutboundThirdPretreatmentSystemWastesDistillation();
            yearOutboundThirdPretreatmentSystemWastesSuspension += daily.getTodayOutboundThirdPretreatmentSystemWastesSuspension();
            yearOutboundThirdPretreatmentSystemWastesWasteLiquid += daily.getTodayOutboundThirdPretreatmentSystemWastesWasteLiquid();
            yearOutboundThirdPretreatmentSystemMedicalWastes += daily.getTodayOutboundThirdPretreatmentSystemMedicalWastes();

            yearEquipmentA2StopTime += daily.getTodayEquipmentA2StopTime();
            yearEquipmentB2StopTime += daily.getTodayEquipmentB2StopTime();
            yearEquipmentPrepare2StopTime += daily.getTodayEquipmentPrepare2StopTime();
            yearEquipmentSecondaryStopTime += daily.getTodayEquipmentSecondaryStopTime();
            yearEquipmentThirdStopTime += daily.getTodayEquipmentThirdStopTime();
            yearEquipmentA2RunningTime += daily.getTodayEquipmentA2RunningTime();
            yearEquipmentB2RunningTime += daily.getTodayEquipmentB2RunningTime();
            yearEquipmentPrepare2RunningTime += daily.getTodayEquipmentPrepare2RunningTime();
            yearEquipmentSecondaryRunningTime += daily.getTodayEquipmentSecondaryRunningTime();
            yearEquipmentThirdRunningTime += daily.getTodayEquipmentThirdRunningTime();

            yearDisposalSecondarySlag += daily.getTodayDisposalSecondarySlag();
            yearDisposalSecondaryAsh += daily.getTodayDisposalSecondaryAsh();
            yearDisposalThirdSlag += daily.getTodayDisposalThirdSlag();
            yearDisposalThirdAsh += daily.getTodayDisposalThirdAsh();
        }

        productionDaily.setYearInboundMedicalWastes(yearInboundMedicalWastes);
        productionDaily.setYearInboundMedicalWastesDirectDisposal(yearInboundMedicalWastesDirectDisposal);
        productionDaily.setYearInboundMedicalWastesCooking(yearInboundMedicalWastesCooking);
        productionDaily.setYearInboundMedicalWastesErrorNumber(yearInboundMedicalWastesErrorNumber);
        productionDaily.setYearInboundMedicalWastesAfterCooking(yearInboundMedicalWastesAfterCooking);
        productionDaily.setYearInboundMedicalWastesAfterCookingSend(yearInboundMedicalWastesAfterCookingSend);
        productionDaily.setYearInboundMedicalWastesAfterCookingInbound(yearInboundMedicalWastesAfterCookingInbound);
        productionDaily.setYearInboundMedicalWastesWetNumber(yearInboundMedicalWastesWetNumber);
        productionDaily.setYearInboundWastesBulk(yearInboundWastesBulk);
        productionDaily.setYearInboundWastesCrushing(yearInboundWastesCrushing);
        productionDaily.setYearInboundWastesSludge(yearInboundWastesSludge);
        productionDaily.setYearInboundWastesDistillation(yearInboundWastesDistillation);
        productionDaily.setYearInboundWastesSuspension(yearInboundWastesSuspension);
        productionDaily.setYearInboundWastesWasteLiquid(yearInboundWastesWasteLiquid);
        productionDaily.setYearInboundWastesTotal(yearInboundWastesTotal);
        productionDaily.setYearInboundSecondWastesSlag(yearInboundSecondWastesSlag);
        productionDaily.setYearInboundSecondWastesAsh(yearInboundSecondWastesAsh);
        productionDaily.setYearInboundSecondWastesBucket(yearInboundSecondWastesBucket);
        productionDaily.setYearOutboundMedicalWastes(yearOutboundMedicalWastes);
        productionDaily.setYearOutboundMedicalWastesDirectDisposal(yearOutboundMedicalWastesDirectDisposal);
        productionDaily.setYearOutboundMedicalWastesCooking(yearOutboundMedicalWastesCooking);
        productionDaily.setYearOutboundMedicalWastesErrorNumber(yearOutboundMedicalWastesErrorNumber);
        productionDaily.setYearOutboundMedicalWastesAfterCooking(yearOutboundMedicalWastesAfterCooking);
        productionDaily.setYearOutboundMedicalWastesAfterCookingSend(yearOutboundMedicalWastesAfterCookingSend);
        productionDaily.setYearOutboundMedicalWastesAfterCookingInbound(yearOutboundMedicalWastesAfterCookingInbound);
        productionDaily.setYearOutboundMedicalWastesWetNumber(yearOutboundMedicalWastesWetNumber);
        productionDaily.setYearOutboundWastesBulk(yearOutboundWastesBulk);
        productionDaily.setYearOutboundWastesCrushing(yearOutboundWastesCrushing);
        productionDaily.setYearOutboundWastesSludge(yearOutboundWastesSludge);
        productionDaily.setYearOutboundWastesDistillation(yearOutboundWastesDistillation);
        productionDaily.setYearOutboundWastesSuspension(yearOutboundWastesSuspension);
        productionDaily.setYearOutboundWastesWasteLiquid(yearOutboundWastesWasteLiquid);
        productionDaily.setYearOutboundWastesTotal(yearOutboundWastesTotal);
        productionDaily.setYearOutboundSecondWastesSlag(yearOutboundSecondWastesSlag);
        productionDaily.setYearOutboundSecondWastesAsh(yearOutboundSecondWastesAsh);
        productionDaily.setYearOutboundSecondWastesBucket(yearOutboundSecondWastesBucket);

        productionDaily.setYearInboundAuxiliaryCalcareousLime(yearInboundAuxiliaryCalcareousLime);
        productionDaily.setYearInboundAuxiliaryCommonActivatedCarbon(yearInboundAuxiliaryCommonActivatedCarbon);
        productionDaily.setYearInboundAuxiliaryActivatedCarbon(yearInboundAuxiliaryActivatedCarbon);
        productionDaily.setYearInboundAuxiliaryActivatedCarbonParticles(yearInboundAuxiliaryActivatedCarbonParticles);
        productionDaily.setYearInboundAuxiliaryLye(yearInboundAuxiliaryLye);
        productionDaily.setYearInboundAuxiliaryCausticSoda(yearInboundAuxiliaryCausticSoda);
        productionDaily.setYearInboundAuxiliaryUrea(yearInboundAuxiliaryUrea);
        productionDaily.setYearInboundAuxiliaryHydrochloricAcid(yearInboundAuxiliaryHydrochloricAcid);
        productionDaily.setYearInboundAuxiliaryNahco3(yearInboundAuxiliaryNahco3);
        productionDaily.setYearInboundAuxiliaryFlour(yearInboundAuxiliaryFlour);
        productionDaily.setYearInboundAuxiliaryDefoamer(yearInboundAuxiliaryDefoamer);
        productionDaily.setYearInboundAuxiliaryFlocculant(yearInboundAuxiliaryFlocculant);
        productionDaily.setYearInboundAuxiliarySoftWaterReducingAgent(yearInboundAuxiliarySoftWaterReducingAgent);
        productionDaily.setYearInboundAuxiliarySoftWaterScaleInhibitor(yearInboundAuxiliarySoftWaterScaleInhibitor);
        productionDaily.setYearInboundAuxiliaryAmmonia(yearInboundAuxiliaryAmmonia);
        productionDaily.setYearInboundAuxiliaryWaterReducingAgent(yearInboundAuxiliaryWaterReducingAgent);
        productionDaily.setYearInboundAuxiliaryWaterScaleInhibitor(yearInboundAuxiliaryWaterScaleInhibitor);
        productionDaily.setYearInboundAuxiliaryNaclo(yearInboundAuxiliaryNaclo);
        productionDaily.setYearInboundAuxiliaryDeodorant(yearInboundAuxiliaryDeodorant);
        productionDaily.setYearInboundAuxiliarySalt(yearInboundAuxiliarySalt);
        productionDaily.setYearInboundAuxiliarySlagBag(yearInboundAuxiliarySlagBag);
        productionDaily.setYearInboundAuxiliaryFlyAshBag(yearInboundAuxiliaryFlyAshBag);
        productionDaily.setYearInboundAuxiliaryMedicalWastesBag(yearInboundAuxiliaryMedicalWastesBag);
        productionDaily.setYearInboundAuxiliaryMedicalPackingPlasticBag(yearInboundAuxiliaryMedicalPackingPlasticBag);
        productionDaily.setYearInboundAuxiliaryCollectionBox(yearInboundAuxiliaryCollectionBox);
        productionDaily.setYearInboundAuxiliaryStandardBox(yearInboundAuxiliaryStandardBox);
        productionDaily.setYearInboundAuxiliaryWoodenPallets(yearInboundAuxiliaryWoodenPallets);
        productionDaily.setYearInboundAuxiliaryStandardTray_1m(yearInboundAuxiliaryStandardTray_1m);
        productionDaily.setYearInboundAuxiliaryStandardTray_1_2m(yearInboundAuxiliaryStandardTray_1_2m);
        productionDaily.setYearInboundAuxiliaryTonBox(yearInboundAuxiliaryTonBox);
        productionDaily.setYearInboundAuxiliarySteam(yearInboundAuxiliarySteam);
        productionDaily.setYearInboundAuxiliaryDieselOil(yearInboundAuxiliaryDieselOil);
        productionDaily.setYearInboundAuxiliaryNaturalGas(yearInboundAuxiliaryNaturalGas);
        productionDaily.setYearInboundAuxiliaryElectricQuantity(yearInboundAuxiliaryElectricQuantity);
        productionDaily.setYearInboundAuxiliaryIndustrialWater(yearInboundAuxiliaryIndustrialWater);
        productionDaily.setYearInboundAuxiliaryTapWaterQuantity(yearInboundAuxiliaryTapWaterQuantity);

        productionDaily.setYearOutboundAuxiliaryCalcareousLime(yearOutboundAuxiliaryCalcareousLime);
        productionDaily.setYearOutboundAuxiliaryCommonActivatedCarbon(yearOutboundAuxiliaryCommonActivatedCarbon);
        productionDaily.setYearOutboundAuxiliaryActivatedCarbon(yearOutboundAuxiliaryActivatedCarbon);
        productionDaily.setYearOutboundAuxiliaryActivatedCarbonParticles(yearOutboundAuxiliaryActivatedCarbonParticles);
        productionDaily.setYearOutboundAuxiliaryLye(yearOutboundAuxiliaryLye);
        productionDaily.setYearOutboundAuxiliaryCausticSoda(yearOutboundAuxiliaryCausticSoda);
        productionDaily.setYearOutboundAuxiliaryUrea(yearOutboundAuxiliaryUrea);
        productionDaily.setYearOutboundAuxiliaryHydrochloricAcid(yearOutboundAuxiliaryHydrochloricAcid);
        productionDaily.setYearOutboundAuxiliaryNahco3(yearOutboundAuxiliaryNahco3);
        productionDaily.setYearOutboundAuxiliaryFlour(yearOutboundAuxiliaryFlour);
        productionDaily.setYearOutboundAuxiliaryDefoamer(yearOutboundAuxiliaryDefoamer);
        productionDaily.setYearOutboundAuxiliaryFlocculant(yearOutboundAuxiliaryFlocculant);
        productionDaily.setYearOutboundAuxiliarySoftWaterReducingAgent(yearOutboundAuxiliarySoftWaterReducingAgent);
        productionDaily.setYearOutboundAuxiliarySoftWaterScaleInhibitor(yearOutboundAuxiliarySoftWaterScaleInhibitor);
        productionDaily.setYearOutboundAuxiliaryAmmonia(yearOutboundAuxiliaryAmmonia);
        productionDaily.setYearOutboundAuxiliaryWaterReducingAgent(yearOutboundAuxiliaryWaterReducingAgent);
        productionDaily.setYearOutboundAuxiliaryWaterScaleInhibitor(yearOutboundAuxiliaryWaterScaleInhibitor);
        productionDaily.setYearOutboundAuxiliaryNaclo(yearOutboundAuxiliaryNaclo);
        productionDaily.setYearOutboundAuxiliaryDeodorant(yearOutboundAuxiliaryDeodorant);
        productionDaily.setYearOutboundAuxiliarySalt(yearOutboundAuxiliarySalt);
        productionDaily.setYearOutboundAuxiliarySlagBag(yearOutboundAuxiliarySlagBag);
        productionDaily.setYearOutboundAuxiliaryFlyAshBag(yearOutboundAuxiliaryFlyAshBag);
        productionDaily.setYearOutboundAuxiliaryMedicalWastesBag(yearOutboundAuxiliaryMedicalWastesBag);
        productionDaily.setYearOutboundAuxiliaryMedicalPackingPlasticBag(yearOutboundAuxiliaryMedicalPackingPlasticBag);
        productionDaily.setYearOutboundAuxiliaryCollectionBox(yearOutboundAuxiliaryCollectionBox);
        productionDaily.setYearOutboundAuxiliaryStandardBox(yearOutboundAuxiliaryStandardBox);
        productionDaily.setYearOutboundAuxiliaryWoodenPallets(yearOutboundAuxiliaryWoodenPallets);
        productionDaily.setYearOutboundAuxiliaryStandardTray_1m(yearOutboundAuxiliaryStandardTray_1m);
        productionDaily.setYearOutboundAuxiliaryStandardTray_1_2m(yearOutboundAuxiliaryStandardTray_1_2m);
        productionDaily.setYearOutboundAuxiliaryTonBox(yearOutboundAuxiliaryTonBox);
        productionDaily.setYearOutboundAuxiliarySteam(yearOutboundAuxiliarySteam);
        productionDaily.setYearOutboundAuxiliaryDieselOil(yearOutboundAuxiliaryDieselOil);
        productionDaily.setYearOutboundAuxiliaryNaturalGas(yearOutboundAuxiliaryNaturalGas);
        productionDaily.setYearOutboundAuxiliaryElectricQuantity(yearOutboundAuxiliaryElectricQuantity);
        productionDaily.setYearOutboundAuxiliaryIndustrialWater(yearOutboundAuxiliaryIndustrialWater);
        productionDaily.setYearOutboundAuxiliaryTapWaterQuantity(yearOutboundAuxiliaryTapWaterQuantity);
        productionDaily.setYearDisposalMedicalAuxiliaryNaclo(yearDisposalMedicalAuxiliaryNaclo);
        productionDaily.setYearDisposalMedicalAuxiliaryDeodorant(yearDisposalMedicalAuxiliaryDeodorant);
        productionDaily.setYearDisposalMedicalAuxiliaryMedicalWastesBag(yearDisposalMedicalAuxiliaryMedicalWastesBag);
        productionDaily.setYearDisposalMedicalAuxiliaryMedicalPackingPlasticBag(yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag);
        productionDaily.setYearDisposalMedicalAuxiliaryCollectionBox(yearDisposalMedicalAuxiliaryCollectionBox);
        productionDaily.setYearDisposalMedicalAuxiliarySteam(yearDisposalMedicalAuxiliarySteam);
        productionDaily.setYearDisposalMedicalAuxiliaryIndustrialWater(yearDisposalMedicalAuxiliaryIndustrialWater);
        productionDaily.setYearDisposalMedicalAuxiliaryElectricQuantity(yearDisposalMedicalAuxiliaryElectricQuantity);
        productionDaily.setYearDisposalSecondaryAuxiliaryCalcareousLime(yearDisposalSecondaryAuxiliaryCalcareousLime);
        productionDaily.setYearDisposalSecondaryAuxiliaryCommonActivatedCarbon(yearDisposalSecondaryAuxiliaryCommonActivatedCarbon);
        productionDaily.setYearDisposalSecondaryAuxiliaryActivatedCarbon(yearDisposalSecondaryAuxiliaryActivatedCarbon);
        productionDaily.setYearDisposalSecondaryAuxiliaryActivatedCarbonParticles(yearDisposalSecondaryAuxiliaryActivatedCarbonParticles);
        productionDaily.setYearDisposalSecondaryAuxiliaryLye(yearDisposalSecondaryAuxiliaryLye);
        productionDaily.setYearDisposalSecondaryAuxiliarySalt(yearDisposalSecondaryAuxiliarySalt);
        productionDaily.setYearDisposalSecondaryAuxiliarySlagBag(yearDisposalSecondaryAuxiliarySlagBag);
        productionDaily.setYearDisposalSecondaryAuxiliaryFlyAshBag(yearDisposalSecondaryAuxiliaryFlyAshBag);
        productionDaily.setYearDisposalSecondaryAuxiliaryDieselOil(yearDisposalSecondaryAuxiliaryDieselOil);
        productionDaily.setYearDisposalSecondaryAuxiliaryIndustrialWater(yearDisposalSecondaryAuxiliaryIndustrialWater);
        productionDaily.setYearDisposalSecondaryAuxiliaryElectricQuantity(yearDisposalSecondaryAuxiliaryElectricQuantity);
        productionDaily.setYearDisposalSecondaryAuxiliaryWoodenPallets(yearDisposalSecondaryAuxiliaryWoodenPallets);
        productionDaily.setYearDisposalThirdAuxiliaryCalcareousLime(yearDisposalThirdAuxiliaryCalcareousLime);
        productionDaily.setYearDisposalThirdAuxiliaryCommonActivatedCarbon(yearDisposalThirdAuxiliaryCommonActivatedCarbon);
        productionDaily.setYearDisposalThirdAuxiliaryActivatedCarbon(yearDisposalThirdAuxiliaryActivatedCarbon);
        productionDaily.setYearDisposalThirdAuxiliaryActivatedCarbonParticles(yearDisposalThirdAuxiliaryActivatedCarbonParticles);
        productionDaily.setYearDisposalThirdAuxiliaryLye(yearDisposalThirdAuxiliaryLye);
        productionDaily.setYearDisposalThirdAuxiliaryCausticSoda(yearDisposalThirdAuxiliaryCausticSoda);
        productionDaily.setYearDisposalThirdAuxiliaryUrea(yearDisposalThirdAuxiliaryUrea);
        productionDaily.setYearDisposalThirdAuxiliaryHydrochloricAcid(yearDisposalThirdAuxiliaryHydrochloricAcid);
        productionDaily.setYearDisposalThirdAuxiliaryNahco3(yearDisposalThirdAuxiliaryNahco3);
        productionDaily.setYearDisposalThirdAuxiliaryFlour(yearDisposalThirdAuxiliaryFlour);
        productionDaily.setYearDisposalThirdAuxiliaryDefoamer(yearDisposalThirdAuxiliaryDefoamer);
        productionDaily.setYearDisposalThirdAuxiliaryFlocculant(yearDisposalThirdAuxiliaryFlocculant);
        productionDaily.setYearDisposalThirdAuxiliarySoftWaterReducingAgent(yearDisposalThirdAuxiliarySoftWaterReducingAgent);
        productionDaily.setYearDisposalThirdAuxiliarySoftWaterScaleInhibitor(yearDisposalThirdAuxiliarySoftWaterScaleInhibitor);
        productionDaily.setYearDisposalThirdAuxiliaryAmmonia(yearDisposalThirdAuxiliaryAmmonia);
        productionDaily.setYearDisposalThirdAuxiliaryWaterReducingAgent(yearDisposalThirdAuxiliaryWaterReducingAgent);
        productionDaily.setYearDisposalThirdAuxiliaryWaterScaleInhibitor(yearDisposalThirdAuxiliaryWaterScaleInhibitor);
        productionDaily.setYearDisposalThirdAuxiliaryNaclo(yearDisposalThirdAuxiliaryNaclo);
        productionDaily.setYearDisposalThirdAuxiliaryStandardBox(yearDisposalThirdAuxiliaryStandardBox);
        productionDaily.setYearDisposalThirdAuxiliaryWoodenPallets(yearDisposalThirdAuxiliaryWoodenPallets);
        productionDaily.setYearDisposalThirdAuxiliaryStandardTray_1m(yearDisposalThirdAuxiliaryStandardTray_1m);
        productionDaily.setYearDisposalThirdAuxiliaryStandardTray_1_2m(yearDisposalThirdAuxiliaryStandardTray_1_2m);
        productionDaily.setYearDisposalThirdAuxiliarySlagBag(yearDisposalThirdAuxiliarySlagBag);
        productionDaily.setYearDisposalThirdAuxiliaryFlyAshBag(yearDisposalThirdAuxiliaryFlyAshBag);
        productionDaily.setYearDisposalThirdAuxiliaryTonBox(yearDisposalThirdAuxiliaryTonBox);
        productionDaily.setYearDisposalThirdAuxiliarySteam(yearDisposalThirdAuxiliarySteam);
        productionDaily.setYearDisposalThirdAuxiliaryDieselOil(yearDisposalThirdAuxiliaryDieselOil);
        productionDaily.setYearDisposalThirdAuxiliaryNaturalGas(yearDisposalThirdAuxiliaryNaturalGas);
        productionDaily.setYearDisposalThirdAuxiliaryIndustrialWater(yearDisposalThirdAuxiliaryIndustrialWater);
        productionDaily.setYearDisposalThirdAuxiliaryElectricQuantity(yearDisposalThirdAuxiliaryElectricQuantity);
        productionDaily.setYearDisposalThirdAuxiliaryTapWaterQuantity(yearDisposalThirdAuxiliaryTapWaterQuantity);
        productionDaily.setYearDisposalTowerElectricQuantity(yearDisposalTowerElectricQuantity);

        productionDaily.setYearOutboundA2WastesBulk(yearOutboundA2WastesBulk);
        productionDaily.setYearOutboundA2WastesCrushing(yearOutboundA2WastesCrushing);
        productionDaily.setYearOutboundA2WastesSludge(yearOutboundA2WastesSludge);
        productionDaily.setYearOutboundA2WastesDistillation(yearOutboundA2WastesDistillation);
        productionDaily.setYearOutboundA2WastesSuspension(yearOutboundA2WastesSuspension);
        productionDaily.setYearOutboundA2WastesWasteLiquid(yearOutboundA2WastesWasteLiquid);
        productionDaily.setYearOutboundA2MedicalWastes(yearOutboundA2MedicalWastes);
        productionDaily.setYearOutboundPrepare2WastesBulk(yearOutboundPrepare2WastesBulk);
        productionDaily.setYearOutboundPrepare2WastesCrushing(yearOutboundPrepare2WastesCrushing);
        productionDaily.setYearOutboundPrepare2WastesSludge(yearOutboundPrepare2WastesSludge);
        productionDaily.setYearOutboundPrepare2WastesDistillation(yearOutboundPrepare2WastesDistillation);
        productionDaily.setYearOutboundPrepare2WastesSuspension(yearOutboundPrepare2WastesSuspension);
        productionDaily.setYearOutboundPrepare2WastesWasteLiquid(yearOutboundPrepare2WastesWasteLiquid);
        productionDaily.setYearOutboundPrepare2MedicalWastes(yearOutboundPrepare2MedicalWastes);
        productionDaily.setYearOutboundB2WastesBulk(yearOutboundB2WastesBulk);
        productionDaily.setYearOutboundB2WastesCrushing(yearOutboundB2WastesCrushing);
        productionDaily.setYearOutboundB2WastesSludge(yearOutboundB2WastesSludge);
        productionDaily.setYearOutboundB2WastesDistillation(yearOutboundB2WastesDistillation);
        productionDaily.setYearOutboundB2WastesSuspension(yearOutboundB2WastesSuspension);
        productionDaily.setYearOutboundB2WastesWasteLiquid(yearOutboundB2WastesWasteLiquid);
        productionDaily.setYearOutboundB2MedicalWastes(yearOutboundB2MedicalWastes);
        productionDaily.setYearOutboundSecondPretreatmentWastes(yearOutboundSecondPretreatmentWastes);
        productionDaily.setYearOutboundThirdPretreatmentSystemWastesBulk(yearOutboundThirdPretreatmentSystemWastesBulk);
        productionDaily.setYearOutboundThirdPretreatmentSystemWastesCrushing(yearOutboundThirdPretreatmentSystemWastesCrushing);
        productionDaily.setYearOutboundThirdPretreatmentSystemWastesSludge(yearOutboundThirdPretreatmentSystemWastesSludge);
        productionDaily.setYearOutboundThirdPretreatmentSystemWastesDistillation(yearOutboundThirdPretreatmentSystemWastesDistillation);
        productionDaily.setYearOutboundThirdPretreatmentSystemWastesSuspension(yearOutboundThirdPretreatmentSystemWastesSuspension);
        productionDaily.setYearOutboundThirdPretreatmentSystemWastesWasteLiquid(yearOutboundThirdPretreatmentSystemWastesWasteLiquid);
        productionDaily.setYearOutboundThirdPretreatmentSystemMedicalWastes(yearOutboundThirdPretreatmentSystemMedicalWastes);

        productionDaily.setYearEquipmentA2StopTime(yearEquipmentA2StopTime);
        productionDaily.setYearEquipmentB2StopTime(yearEquipmentB2StopTime);
        productionDaily.setYearEquipmentPrepare2StopTime(yearEquipmentPrepare2StopTime);
        productionDaily.setYearEquipmentSecondaryStopTime(yearEquipmentSecondaryStopTime);
        productionDaily.setYearEquipmentThirdStopTime(yearEquipmentThirdStopTime);
        productionDaily.setYearEquipmentA2RunningTime(yearEquipmentA2RunningTime);
        productionDaily.setYearEquipmentB2RunningTime(yearEquipmentB2RunningTime);
        productionDaily.setYearEquipmentPrepare2RunningTime(yearEquipmentPrepare2RunningTime);
        productionDaily.setYearEquipmentSecondaryRunningTime(yearEquipmentSecondaryRunningTime);
        productionDaily.setYearEquipmentThirdRunningTime(yearEquipmentThirdRunningTime);

        productionDaily.setYearEquipmentA2RunningRate(Float.parseFloat(RandomUtil.getPercentage(yearEquipmentA2RunningTime, 8760)));
        productionDaily.setYearEquipmentB2RunningRate(Float.parseFloat(RandomUtil.getPercentage(yearEquipmentB2RunningTime, 8760)));
        productionDaily.setYearEquipmentPrepare2RunningRate(Float.parseFloat(RandomUtil.getPercentage(yearEquipmentPrepare2RunningTime, 8760)));
        productionDaily.setYearEquipmentSecondaryRunningRate(Float.parseFloat(RandomUtil.getPercentage(yearEquipmentSecondaryRunningTime, 8760)));
        productionDaily.setYearEquipmentThirdRunningRate(Float.parseFloat(RandomUtil.getPercentage(yearEquipmentThirdRunningTime, 8760)));

        productionDaily.setYearDisposalSecondarySlag(yearDisposalSecondarySlag);
        productionDaily.setYearDisposalSecondaryAsh(yearDisposalSecondaryAsh);
        productionDaily.setYearDisposalThirdSlag(yearDisposalThirdSlag);
        productionDaily.setYearDisposalThirdAsh(yearDisposalThirdAsh);
    }

}

//
//   █████▒█    ██  ▄████▄   ██ ▄█▀       ██████╗ ██╗   ██╗ ██████╗
// ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒        ██╔══██╗██║   ██║██╔════╝
// ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░        ██████╔╝██║   ██║██║  ███╗
// ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄        ██╔══██╗██║   ██║██║   ██║
// ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄       ██████╔╝╚██████╔╝╚██████╔╝
//  ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒       ╚═════╝  ╚═════╝  ╚═════╝
//  ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
//  ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
//           ░     ░ ░      ░  ░
//                 ░
