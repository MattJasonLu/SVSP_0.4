package com.jdlink.controller;

import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.MedicalWastes;
import com.jdlink.domain.Produce.ProductionDaily;
import com.jdlink.service.InboundService;
import com.jdlink.service.MedicalWastesService;
import com.jdlink.service.OutboundOrderService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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


            // 获取当天的危废入库信息
            List<InboundOrderItem> inboundOrderItemList = inboundService.getInboundOrderItemByRange(now, now);

            // 获取当天的次生入库信息
            List<InboundOrderItem> secondInboundOrderItemList = inboundService.getSecondInboundOrderItemByRange(now, now);

            res.put("status", "success");
            res.put("message", "生成日报成功");
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
