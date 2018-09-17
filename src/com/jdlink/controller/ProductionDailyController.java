package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Inventory.BoundType;
import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.*;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
    public String searchProductionDaily(Date beginTime, Date endTime, Page page) {
        JSONObject res = new JSONObject();
        try {
            List<ProductionDaily> productionDailyList = productionDailyService.getProductionDailyByDateRange(beginTime, endTime, page);
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
