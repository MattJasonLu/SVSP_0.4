package com.jdlink.controller;

import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Produce.MedicalWastes;
import com.jdlink.domain.Produce.ProductionDaily;
import com.jdlink.service.InboundService;
import com.jdlink.service.MedicalWastesService;
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
