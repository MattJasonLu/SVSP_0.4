package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
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
import org.apache.poi.ss.util.CellAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import sun.plugin2.os.windows.FLASHWINFO;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

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
    @Autowired
    ClientService clientService;

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
    public String generateProductionDaily(String dateStr, String dateStrStart, String dateStrEnd) {
        JSONObject res = new JSONObject();

        // update by ljc: 2018-10-29 14:10:25 修改为获取用户输入的时间
        Date now = DateUtil.getDateFromStr(dateStr);
        Date start = DateUtil.getDateFromStr(dateStrStart);
        Date end = DateUtil.getDateFromStr(dateStrEnd);
//        Date now = new Date(); // 获取当天日期

        // 创建一个新的生产日报
        ProductionDaily productionDaily = new ProductionDaily();
        // 设置公司为常州北控
        Client client = clientService.getByClientId("0038");
        productionDaily.setClient(client);
        // 设置编号
        productionDaily.setId(productionDailyService.getProductionDailyId());
        // 设置时间
        productionDaily.setDate(now);
        // 设置起始和结束时间
        productionDaily.setStartDate(start);
        productionDaily.setEndDate(end);
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
     * @param excelFile 日报文件
     * @return 导入生产日报
     */
    @RequestMapping("importProductionDailyExcel")
    @ResponseBody
    public String importProductionDailyExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            // 获取危废入库的表格数据
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            // TODO: 生产日报导入问题 2018-09-29 13:16:44
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
        float todayInboundWastesBulk = 0f;
        float todayInboundWastesCrushing = 0f;
        float todayInboundWastesSludge = 0f;
        float todayInboundWastesDistillation = 0f;
        float todayInboundWastesSuspension = 0f;
        float todayInboundWastesWasteLiquid = 0f;
        float todayInboundWastesTotal = 0f;         // 工费合计

        List<InboundOrderItem> inboundOrderItemTodayList = inboundService.getInboundOrderItemByRange(now, now);
        for (InboundOrderItem inboundOrderItem : inboundOrderItemTodayList) {
            if (inboundOrderItem.getHandleCategory() == null) continue;
            switch (inboundOrderItem.getHandleCategory()) {
                case Sludge:
                    todayInboundWastesSludge += inboundOrderItem.getWastesAmount();
                    todayInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
                case WasteLiquid:
                    todayInboundWastesWasteLiquid += inboundOrderItem.getWastesAmount();
                    todayInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
                case Bulk:
                    todayInboundWastesBulk += inboundOrderItem.getWastesAmount();
                    todayInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
                case Crushing:
                    todayInboundWastesCrushing += inboundOrderItem.getWastesAmount();
                    todayInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
                case Distillation:
                    todayInboundWastesDistillation += inboundOrderItem.getWastesAmount();
                    todayInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
                case Suspension:
                    todayInboundWastesSuspension += inboundOrderItem.getWastesAmount();
                    todayInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
            }
        }
        productionDaily.setTodayInboundWastesBulk(todayInboundWastesBulk);
        productionDaily.setTodayInboundWastesCrushing(todayInboundWastesCrushing);
        productionDaily.setTodayInboundWastesSludge(todayInboundWastesSludge);
        productionDaily.setTodayInboundWastesDistillation(todayInboundWastesDistillation);
        productionDaily.setTodayInboundWastesSuspension(todayInboundWastesSuspension);
        productionDaily.setTodayInboundWastesWasteLiquid(todayInboundWastesWasteLiquid);
        productionDaily.setTodayInboundWastesTotal(todayInboundWastesTotal);
        productionDaily.setInboundOrderItemList(inboundOrderItemTodayList);

        // 危废出库信息
        float todayOutboundWastesBulk = 0f;
        float todayOutboundWastesCrushing = 0f;
        float todayOutboundWastesSludge = 0f;
        float todayOutboundWastesDistillation = 0f;
        float todayOutboundWastesSuspension = 0f;
        float todayOutboundWastesWasteLiquid = 0f;
        float todayOutboundWastesTotal = 0f;         // 工费合计
        float todayOutboundWastesA2Bulk = 0f;
        float todayOutboundWastesA2Crushing = 0f;
        float todayOutboundWastesA2Sludge = 0f;
        float todayOutboundWastesA2Distillation = 0f;
        float todayOutboundWastesA2Suspension = 0f;
        float todayOutboundWastesA2WasteLiquid = 0f;
        float todayOutboundWastesB2Bulk = 0f;
        float todayOutboundWastesB2Crushing = 0f;
        float todayOutboundWastesB2Sludge = 0f;
        float todayOutboundWastesB2Distillation = 0f;
        float todayOutboundWastesB2Suspension = 0f;
        float todayOutboundWastesB2WasteLiquid = 0f;
        float todayOutboundWastesPrepare2Bulk = 0f;
        float todayOutboundWastesPrepare2Crushing = 0f;
        float todayOutboundWastesPrepare2Sludge = 0f;
        float todayOutboundWastesPrepare2Distillation = 0f;
        float todayOutboundWastesPrepare2Suspension = 0f;
        float todayOutboundWastesPrepare2WasteLiquid = 0f;
        float todayOutboundWastesThirdBulk = 0f;
        float todayOutboundWastesThirdCrushing = 0f;
        float todayOutboundWastesThirdSludge = 0f;
        float todayOutboundWastesThirdDistillation = 0f;
        float todayOutboundWastesThirdSuspension = 0f;
        float todayOutboundWastesThirdWasteLiquid = 0f;

        List<OutboundOrder> outboundOrderTodayList = outboundOrderService.getOutBoundByDate(now);
        List<OutboundOrder> outboundOrderTodayA2List = new ArrayList<>();
        List<OutboundOrder> outboundOrderTodayB2List = new ArrayList<>();
        List<OutboundOrder> outboundOrderTodayPrepare2List = new ArrayList<>();
        List<OutboundOrder> outboundOrderTodayThirdList = new ArrayList<>();
        for (OutboundOrder outboundOrder : outboundOrderTodayList) {
            if (outboundOrder.getBoundType().equals(BoundType.WasteOutbound)) {
                switch (outboundOrder.getHandelCategory()) {
                    case Sludge:
                        todayOutboundWastesSludge += outboundOrder.getOutboundNumber();
                        todayOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                todayOutboundWastesA2Sludge += outboundOrder.getOutboundNumber();
                                outboundOrderTodayA2List.add(outboundOrder);
                                break;
                            case B2:
                                todayOutboundWastesB2Sludge += outboundOrder.getOutboundNumber();
                                outboundOrderTodayB2List.add(outboundOrder);
                                break;
                            case Prepare2:
                                todayOutboundWastesPrepare2Sludge += outboundOrder.getOutboundNumber();
                                outboundOrderTodayPrepare2List.add(outboundOrder);
                                break;
                            case ThirdPhasePretreatmentSystem:
                                todayOutboundWastesThirdSludge += outboundOrder.getOutboundNumber();
                                outboundOrderTodayThirdList.add(outboundOrder);
                                break;
                            default:
                                break;
                        }
                        break;
                    case WasteLiquid:
                        todayOutboundWastesWasteLiquid += outboundOrder.getOutboundNumber();
                        todayOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                todayOutboundWastesA2WasteLiquid += outboundOrder.getOutboundNumber();
                                outboundOrderTodayA2List.add(outboundOrder);
                                break;
                            case B2:
                                todayOutboundWastesB2WasteLiquid += outboundOrder.getOutboundNumber();
                                outboundOrderTodayB2List.add(outboundOrder);
                                break;
                            case Prepare2:
                                todayOutboundWastesPrepare2WasteLiquid += outboundOrder.getOutboundNumber();
                                outboundOrderTodayPrepare2List.add(outboundOrder);
                                break;
                            case ThirdPhasePretreatmentSystem:
                                todayOutboundWastesThirdWasteLiquid += outboundOrder.getOutboundNumber();
                                outboundOrderTodayThirdList.add(outboundOrder);
                                break;
                            default:
                                break;
                        }
                        break;
                    case Bulk:
                        todayOutboundWastesBulk += outboundOrder.getOutboundNumber();
                        todayOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                todayOutboundWastesA2Bulk += outboundOrder.getOutboundNumber();
                                outboundOrderTodayA2List.add(outboundOrder);
                                break;
                            case B2:
                                todayOutboundWastesB2Bulk += outboundOrder.getOutboundNumber();
                                outboundOrderTodayB2List.add(outboundOrder);
                                break;
                            case Prepare2:
                                todayOutboundWastesPrepare2Bulk += outboundOrder.getOutboundNumber();
                                outboundOrderTodayPrepare2List.add(outboundOrder);
                                break;
                            case ThirdPhasePretreatmentSystem:
                                todayOutboundWastesThirdBulk += outboundOrder.getOutboundNumber();
                                outboundOrderTodayThirdList.add(outboundOrder);
                                break;
                            default:
                                break;
                        }
                        break;
                    case Crushing:
                        todayOutboundWastesCrushing += outboundOrder.getOutboundNumber();
                        todayOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                todayOutboundWastesA2Crushing += outboundOrder.getOutboundNumber();
                                outboundOrderTodayA2List.add(outboundOrder);
                                break;
                            case B2:
                                todayOutboundWastesB2Crushing += outboundOrder.getOutboundNumber();
                                outboundOrderTodayB2List.add(outboundOrder);
                                break;
                            case Prepare2:
                                todayOutboundWastesPrepare2Crushing += outboundOrder.getOutboundNumber();
                                outboundOrderTodayPrepare2List.add(outboundOrder);
                                break;
                            case ThirdPhasePretreatmentSystem:
                                todayOutboundWastesThirdCrushing += outboundOrder.getOutboundNumber();
                                outboundOrderTodayThirdList.add(outboundOrder);
                                break;
                            default:
                                break;
                        }
                        break;
                    case Distillation:
                        todayOutboundWastesDistillation += outboundOrder.getOutboundNumber();
                        todayOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                todayOutboundWastesA2Distillation += outboundOrder.getOutboundNumber();
                                outboundOrderTodayA2List.add(outboundOrder);
                                break;
                            case B2:
                                todayOutboundWastesB2Distillation += outboundOrder.getOutboundNumber();
                                outboundOrderTodayB2List.add(outboundOrder);
                                break;
                            case Prepare2:
                                todayOutboundWastesPrepare2Distillation += outboundOrder.getOutboundNumber();
                                outboundOrderTodayPrepare2List.add(outboundOrder);
                                break;
                            case ThirdPhasePretreatmentSystem:
                                todayOutboundWastesThirdDistillation += outboundOrder.getOutboundNumber();
                                outboundOrderTodayThirdList.add(outboundOrder);
                                break;
                            default:
                                break;
                        }
                        break;
                    case Suspension:
                        todayOutboundWastesSuspension += outboundOrder.getOutboundNumber();
                        todayOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                todayOutboundWastesA2Suspension += outboundOrder.getOutboundNumber();
                                outboundOrderTodayA2List.add(outboundOrder);
                                break;
                            case B2:
                                todayOutboundWastesB2Suspension += outboundOrder.getOutboundNumber();
                                outboundOrderTodayB2List.add(outboundOrder);
                                break;
                            case Prepare2:
                                todayOutboundWastesPrepare2Suspension += outboundOrder.getOutboundNumber();
                                outboundOrderTodayPrepare2List.add(outboundOrder);
                                break;
                            case ThirdPhasePretreatmentSystem:
                                todayOutboundWastesThirdSuspension += outboundOrder.getOutboundNumber();
                                outboundOrderTodayThirdList.add(outboundOrder);
                                break;
                            default:
                                break;
                        }
                        break;
                }
            }
        }
        productionDaily.setTodayOutboundWastesBulk(todayOutboundWastesBulk);
        productionDaily.setTodayOutboundWastesCrushing(todayOutboundWastesCrushing);
        productionDaily.setTodayOutboundWastesSludge(todayOutboundWastesSludge);
        productionDaily.setTodayOutboundWastesDistillation(todayOutboundWastesDistillation);
        productionDaily.setTodayOutboundWastesSuspension(todayOutboundWastesSuspension);
        productionDaily.setTodayOutboundWastesWasteLiquid(todayOutboundWastesWasteLiquid);
        productionDaily.setTodayOutboundWastesTotal(todayOutboundWastesTotal);
        productionDaily.setTodayOutboundA2WastesBulk(todayOutboundWastesA2Bulk);
        productionDaily.setTodayOutboundA2WastesCrushing(todayOutboundWastesA2Crushing);
        productionDaily.setTodayOutboundA2WastesSludge(todayOutboundWastesA2Sludge);
        productionDaily.setTodayOutboundA2WastesDistillation(todayOutboundWastesA2Distillation);
        productionDaily.setTodayOutboundA2WastesSuspension(todayOutboundWastesA2Suspension);
        productionDaily.setTodayOutboundA2WastesWasteLiquid(todayOutboundWastesA2WasteLiquid);
        productionDaily.setTodayOutboundB2WastesBulk(todayOutboundWastesB2Bulk);
        productionDaily.setTodayOutboundB2WastesCrushing(todayOutboundWastesB2Crushing);
        productionDaily.setTodayOutboundB2WastesSludge(todayOutboundWastesB2Sludge);
        productionDaily.setTodayOutboundB2WastesDistillation(todayOutboundWastesB2Distillation);
        productionDaily.setTodayOutboundB2WastesSuspension(todayOutboundWastesB2Suspension);
        productionDaily.setTodayOutboundB2WastesWasteLiquid(todayOutboundWastesB2WasteLiquid);
        productionDaily.setTodayOutboundPrepare2WastesBulk(todayOutboundWastesPrepare2Bulk);
        productionDaily.setTodayOutboundPrepare2WastesCrushing(todayOutboundWastesPrepare2Crushing);
        productionDaily.setTodayOutboundPrepare2WastesSludge(todayOutboundWastesPrepare2Sludge);
        productionDaily.setTodayOutboundPrepare2WastesDistillation(todayOutboundWastesPrepare2Distillation);
        productionDaily.setTodayOutboundPrepare2WastesSuspension(todayOutboundWastesPrepare2Suspension);
        productionDaily.setTodayOutboundPrepare2WastesWasteLiquid(todayOutboundWastesPrepare2WasteLiquid);
        productionDaily.setTodayOutboundPrepare2WastesBulk(todayOutboundWastesThirdBulk);
        productionDaily.setTodayOutboundPrepare2WastesCrushing(todayOutboundWastesThirdCrushing);
        productionDaily.setTodayOutboundPrepare2WastesSludge(todayOutboundWastesThirdSludge);
        productionDaily.setTodayOutboundPrepare2WastesDistillation(todayOutboundWastesThirdDistillation);
        productionDaily.setTodayOutboundPrepare2WastesSuspension(todayOutboundWastesThirdSuspension);
        productionDaily.setTodayOutboundPrepare2WastesWasteLiquid(todayOutboundWastesThirdWasteLiquid);
        productionDaily.setOutboundOrderA2List(outboundOrderTodayA2List);
        productionDaily.setOutboundOrderB2List(outboundOrderTodayB2List);
        productionDaily.setOutboundOrderPrepare2List(outboundOrderTodayPrepare2List);
        productionDaily.setOutboundOrderThirdList(outboundOrderTodayThirdList);

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

        // 辅材、能源入库
        List<Ingredients> ingredientsList = ingredientsService.getIngredientsInItemByRange(now,now,null);
        float todayInboundAuxiliaryCalcareousLime = 0f;
        float todayInboundAuxiliaryCommonActivatedCarbon = 0f;
        float todayInboundAuxiliaryActivatedCarbon = 0f;
        float todayInboundAuxiliaryActivatedCarbonParticles = 0f;
        float todayInboundAuxiliaryLye = 0f;
        float todayInboundAuxiliaryCausticSoda = 0f;
        float todayInboundAuxiliaryUrea = 0f;
        float todayInboundAuxiliaryHydrochloricAcid = 0f;
        float todayInboundAuxiliaryNahco3 = 0f;
        float todayInboundAuxiliaryFlour = 0f;
        float todayInboundAuxiliaryDefoamer = 0f;
        float todayInboundAuxiliaryFlocculant = 0f;
        float todayInboundAuxiliarySoftWaterReducingAgent = 0f;
        float todayInboundAuxiliarySoftWaterScaleInhibitor = 0f;
        float todayInboundAuxiliaryAmmonia = 0f;
        float todayInboundAuxiliaryWaterReducingAgent = 0f;
        float todayInboundAuxiliaryWaterScaleInhibitor = 0f;
        float todayInboundAuxiliaryNaclo = 0f;
        float todayInboundAuxiliaryDeodorant = 0f;
        float todayInboundAuxiliarySalt = 0f;
        float todayInboundAuxiliarySlagBag = 0f;
        float todayInboundAuxiliaryFlyAshBag = 0f;
        float todayInboundAuxiliaryMedicalWastesBag = 0f;
        float todayInboundAuxiliaryMedicalPackingPlasticBag = 0f;
        float todayInboundAuxiliaryCollectionBox = 0f;
        float todayInboundAuxiliaryStandardBox = 0f;
        float todayInboundAuxiliaryWoodenPallets = 0f;
        float todayInboundAuxiliaryStandardTray_1m = 0f;
        float todayInboundAuxiliaryStandardTray_1_2m = 0f;
        float todayInboundAuxiliaryTonBox = 0f;
        float todayInboundAuxiliarySteam = 0f;
        float todayInboundAuxiliaryDieselOil = 0f;
        float todayInboundAuxiliaryNaturalGas = 0f;
        float todayInboundAuxiliaryElectricQuantity = 0f;
        float todayInboundAuxiliaryIndustrialWater = 0f;
        float todayInboundAuxiliaryTapWaterQuantity = 0f;
        for(Ingredients ingredients : ingredientsList){
            switch(ingredients.getName()){
                case "消石灰": todayInboundAuxiliaryCalcareousLime += ingredients.getAmount();break;
                case "普通活性碳粉": todayInboundAuxiliaryCommonActivatedCarbon += ingredients.getAmount();break;
                case "高活性碳粉": todayInboundAuxiliaryActivatedCarbon += ingredients.getAmount();break;
                case "活性炭颗粒": todayInboundAuxiliaryActivatedCarbonParticles += ingredients.getAmount();break;
                case "碱液": todayInboundAuxiliaryLye += ingredients.getAmount();break;
                case "片碱": todayInboundAuxiliaryCausticSoda += ingredients.getAmount();break;
                case "尿素": todayInboundAuxiliaryUrea += ingredients.getAmount();break;
                case "盐酸": todayInboundAuxiliaryHydrochloricAcid += ingredients.getAmount();break;
                case "小苏打(NaHCO3)": todayInboundAuxiliaryNahco3 += ingredients.getAmount();break;
                case "面粉": todayInboundAuxiliaryFlour += ingredients.getAmount();break;
                case "消泡剂": todayInboundAuxiliaryDefoamer += ingredients.getAmount();break;
                case "絮凝剂(聚丙烯酰胺)": todayInboundAuxiliaryFlocculant += ingredients.getAmount();break;
                case "软水用还原剂": todayInboundAuxiliarySoftWaterReducingAgent += ingredients.getAmount();break;
                case "软水用阻垢剂": todayInboundAuxiliarySoftWaterScaleInhibitor += ingredients.getAmount();break;
                case "氨水(PH调节剂)": todayInboundAuxiliaryAmmonia += ingredients.getAmount();break;
                case "污水用还原剂": todayInboundAuxiliaryWaterReducingAgent += ingredients.getAmount();break;
                case "污水用阻垢剂": todayInboundAuxiliaryWaterScaleInhibitor += ingredients.getAmount();break;
                case "消毒液": todayInboundAuxiliaryNaclo += ingredients.getAmount();break;
                case "除臭剂": todayInboundAuxiliaryDeodorant += ingredients.getAmount();break;
                case "盐": todayInboundAuxiliarySalt += ingredients.getAmount();break;
                case "炉渣用吨袋": todayInboundAuxiliarySlagBag += ingredients.getAmount();break;
                case "飞灰用吨袋": todayInboundAuxiliaryFlyAshBag += ingredients.getAmount();break;
                case "医废用吨袋": todayInboundAuxiliaryMedicalWastesBag += ingredients.getAmount();break;
                case "医废包装塑料袋": todayInboundAuxiliaryMedicalPackingPlasticBag += ingredients.getAmount();break;
                case "收集转运箱": todayInboundAuxiliaryCollectionBox += ingredients.getAmount();break;
                case "标准箱": todayInboundAuxiliaryStandardBox += ingredients.getAmount();break;
                case "木托盘": todayInboundAuxiliaryWoodenPallets += ingredients.getAmount();break;
                case "1m标准托盘": todayInboundAuxiliaryStandardTray_1m += ingredients.getAmount();break;
                case "1.2m标准托盘": todayInboundAuxiliaryStandardTray_1_2m += ingredients.getAmount();break;
                case "吨箱": todayInboundAuxiliaryTonBox += ingredients.getAmount();break;
                case "蒸汽": todayInboundAuxiliarySteam += ingredients.getAmount();break;
                case "柴油": todayInboundAuxiliaryDieselOil += ingredients.getAmount();break;
                case "天然气": todayInboundAuxiliaryNaturalGas += ingredients.getAmount();break;
                case "电量": todayInboundAuxiliaryElectricQuantity += ingredients.getAmount();break;
                case "工业水量": todayInboundAuxiliaryIndustrialWater += ingredients.getAmount();break;
                case "自来水量": todayInboundAuxiliaryTapWaterQuantity += ingredients.getAmount();break;
            }
        }
        productionDaily.setTodayInboundAuxiliaryCalcareousLime(todayInboundAuxiliaryCalcareousLime);
        productionDaily.setTodayInboundAuxiliaryCommonActivatedCarbon(todayInboundAuxiliaryCommonActivatedCarbon);
        productionDaily.setTodayInboundAuxiliaryActivatedCarbon(todayInboundAuxiliaryActivatedCarbon);
        productionDaily.setTodayInboundAuxiliaryActivatedCarbonParticles(todayInboundAuxiliaryActivatedCarbonParticles);
        productionDaily.setTodayInboundAuxiliaryLye(todayInboundAuxiliaryLye);
        productionDaily.setTodayInboundAuxiliaryCausticSoda(todayInboundAuxiliaryCausticSoda);
        productionDaily.setTodayInboundAuxiliaryUrea(todayInboundAuxiliaryUrea);
        productionDaily.setTodayInboundAuxiliaryHydrochloricAcid(todayInboundAuxiliaryHydrochloricAcid);
        productionDaily.setTodayInboundAuxiliaryNahco3(todayInboundAuxiliaryNahco3);
        productionDaily.setTodayInboundAuxiliaryFlour(todayInboundAuxiliaryFlour);
        productionDaily.setTodayInboundAuxiliaryDefoamer(todayInboundAuxiliaryDefoamer);
        productionDaily.setTodayInboundAuxiliaryFlocculant(todayInboundAuxiliaryFlocculant);
        productionDaily.setTodayInboundAuxiliarySoftWaterReducingAgent(todayInboundAuxiliarySoftWaterReducingAgent);
        productionDaily.setTodayInboundAuxiliarySoftWaterScaleInhibitor(todayInboundAuxiliarySoftWaterScaleInhibitor);
        productionDaily.setTodayInboundAuxiliaryAmmonia(todayInboundAuxiliaryAmmonia);
        productionDaily.setTodayInboundAuxiliaryWaterReducingAgent(todayInboundAuxiliaryWaterReducingAgent);
        productionDaily.setTodayInboundAuxiliaryWaterScaleInhibitor(todayInboundAuxiliaryWaterScaleInhibitor);
        productionDaily.setTodayInboundAuxiliaryNaclo(todayInboundAuxiliaryNaclo);
        productionDaily.setTodayInboundAuxiliaryDeodorant(todayInboundAuxiliaryDeodorant);
        productionDaily.setTodayInboundAuxiliarySalt(todayInboundAuxiliarySalt);
        productionDaily.setTodayInboundAuxiliarySlagBag(todayInboundAuxiliarySlagBag);
        productionDaily.setTodayInboundAuxiliaryFlyAshBag(todayInboundAuxiliaryFlyAshBag);
        productionDaily.setTodayInboundAuxiliaryMedicalWastesBag(todayInboundAuxiliaryMedicalWastesBag);
        productionDaily.setTodayInboundAuxiliaryMedicalPackingPlasticBag(todayInboundAuxiliaryMedicalPackingPlasticBag);
        productionDaily.setTodayInboundAuxiliaryCollectionBox(todayInboundAuxiliaryCollectionBox);
        productionDaily.setTodayInboundAuxiliaryStandardBox(todayInboundAuxiliaryStandardBox);
        productionDaily.setTodayInboundAuxiliaryWoodenPallets(todayInboundAuxiliaryWoodenPallets);
        productionDaily.setTodayInboundAuxiliaryStandardTray_1m(todayInboundAuxiliaryStandardTray_1m);
        productionDaily.setTodayInboundAuxiliaryStandardTray_1_2m(todayInboundAuxiliaryStandardTray_1_2m);
        productionDaily.setTodayInboundAuxiliaryTonBox(todayInboundAuxiliaryTonBox);
        productionDaily.setTodayInboundAuxiliarySteam(todayInboundAuxiliarySteam);
        productionDaily.setTodayInboundAuxiliaryDieselOil(todayInboundAuxiliaryDieselOil);
        productionDaily.setTodayInboundAuxiliaryNaturalGas(todayInboundAuxiliaryNaturalGas);
        productionDaily.setTodayInboundAuxiliaryElectricQuantity(todayInboundAuxiliaryElectricQuantity);
        productionDaily.setTodayInboundAuxiliaryIndustrialWater(todayInboundAuxiliaryIndustrialWater);
        productionDaily.setTodayInboundAuxiliaryTapWaterQuantity(todayInboundAuxiliaryTapWaterQuantity);

        List<OutboundOrder> outboundThirdOrderList = outboundOrderService.getOutBoundByDateRangeAndEquipment(now, now, "ThirdPhasePretreatmentSystem");

        // 4. 次生
        // 入库
        float todaySecondInSlag = 0f;
        float todaySecondInAsh = 0f;
        float todaySecondInBucket = 0f;
        List<InboundOrderItem> todaySecondInboundOrderList = inboundService.getSecondInboundOrderItemByRange(now, now);
        for (InboundOrderItem inboundOrderItem : todaySecondInboundOrderList) {
            if (inboundOrderItem.getWastes() != null)
            if (inboundOrderItem.getWastes().getName().contains("飞灰")) {
                todaySecondInAsh += inboundOrderItem.getWastesAmount();
            } else if (inboundOrderItem.getWastes().getName().contains("炉渣")) {
                todaySecondInSlag += inboundOrderItem.getWastesAmount();
            } else if (inboundOrderItem.getWastes().getName().contains("桶")) {
                todaySecondInBucket += inboundOrderItem.getWastesAmount();
            }
        }
        productionDaily.setTodayInboundSecondWastesAsh(todaySecondInAsh);
        productionDaily.setTodayInboundSecondWastesSlag(todaySecondInSlag);
        productionDaily.setTodayInboundSecondWastesBucket(todaySecondInBucket);
        // 出库
        float todaySecondOutSlag = 0f;
        float todaySecondOutAsh = 0f;
        float todaySecondOutBucket = 0f;
        float todaySecondOutSecondSlag = 0f;
        float todaySecondOutSecondAsh = 0f;
        float todaySecondOutThirdSlag = 0f;
        float todaySecondOutThirdAsh = 0f;
        List<OutboundOrder> todaySecondOutboundOrderList = outboundOrderService.getOutBoundByDate(now);
        for (OutboundOrder outboundOrder : todaySecondOutboundOrderList) {
            if (outboundOrder.getWastes() != null)
                if (outboundOrder.getWastes().getName().contains("飞灰")) {
                    todaySecondOutAsh += outboundOrder.getOutboundNumber();
                    switch (outboundOrder.getEquipment()) {
                        case SecondaryTwoCombustionChamber:
                            todaySecondOutSecondAsh += outboundOrder.getOutboundNumber();
                            break;
                        case ThirdPhasePretreatmentSystem:
                            todaySecondOutThirdAsh += outboundOrder.getOutboundNumber();
                            break;
                        default:
                            break;
                    }
                } else if (outboundOrder.getWastes().getName().contains("炉渣")) {
                    todaySecondOutSlag += outboundOrder.getOutboundNumber();
                    switch (outboundOrder.getEquipment()) {
                        case SecondaryTwoCombustionChamber:
                            todaySecondOutSecondAsh += outboundOrder.getOutboundNumber();
                            break;
                        case ThirdPhasePretreatmentSystem:
                            todaySecondOutThirdSlag += outboundOrder.getOutboundNumber();
                            break;
                        default:
                            break;
                    }
                } else if (outboundOrder.getWastes().getName().contains("桶")) {
                    todaySecondOutBucket += outboundOrder.getOutboundNumber();
                }
        }
        productionDaily.setTodayOutboundSecondWastesAsh(todaySecondOutAsh);
        productionDaily.setTodayOutboundSecondWastesSlag(todaySecondOutSlag);
        productionDaily.setTodayOutboundSecondWastesBucket(todaySecondOutBucket);
        productionDaily.setTodayDisposalSecondarySlag(todaySecondOutSecondSlag);
        productionDaily.setTodayDisposalSecondaryAsh(todaySecondOutSecondAsh);
        productionDaily.setTodayDisposalThirdAsh(todaySecondOutThirdAsh);
        productionDaily.setTodayDisposalThirdSlag(todaySecondOutThirdSlag);


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

        // 月份 update: 2018-10-30 09:34:19 修改月份数据计算
        Date monthFirstDay = productionDaily.getStartDate();
        Date monthEndDay = productionDaily.getEndDate();

        // 获取日报所在月份的所有日报
        List<MedicalWastes> monthMedicalWastesList = medicalWastesService.getMedicalWastesByRange(monthFirstDay, monthEndDay);
        // 月份的初始数据
        // 1. 医废
        float monthDisposalMedicalWastes = 0f;
        float monthDisposalMedicalWastesDisposalDirect = 0f;
        float monthDisposalMedicalWastesCooking = 0f;
        float monthDisposalMedicalWastesAfterCooking = 0f;
        float monthDisposalMedicalWastesAfterCookingInbound = 0f;
        float monthDisposalMedicalWastesAfterCookingSend = 0f;
        for (MedicalWastes medicalWastes : medicalWastesList) {
            // 本日进厂医废
            monthDisposalMedicalWastes += medicalWastes.getThisMonthWastes();
            monthDisposalMedicalWastesDisposalDirect += medicalWastes.getDirectDisposal();
            monthDisposalMedicalWastesCooking += medicalWastes.getCookingWastes();
            monthDisposalMedicalWastesAfterCooking += medicalWastes.getAfterCookingNumber();
            monthDisposalMedicalWastesAfterCookingInbound += medicalWastes.getAfterCookingInbound();
            monthDisposalMedicalWastesAfterCookingSend += medicalWastes.getThisMonthSendCooking();
        }
        // 危废废物进厂（产生）量
        productionDaily.setMonthInboundMedicalWastes(monthDisposalMedicalWastes);
        productionDaily.setMonthInboundMedicalWastesCooking(monthDisposalMedicalWastesCooking);
        productionDaily.setMonthInboundMedicalWastesErrorNumber(monthDisposalMedicalWastes-monthDisposalMedicalWastesDisposalDirect-monthDisposalMedicalWastesCooking);
        productionDaily.setMonthInboundMedicalWastesAfterCooking(monthDisposalMedicalWastesAfterCooking);
        productionDaily.setMonthInboundMedicalWastesAfterCookingInbound(monthDisposalMedicalWastesAfterCookingInbound);
        productionDaily.setMonthInboundMedicalWastesWetNumber(monthDisposalMedicalWastesCooking-monthDisposalMedicalWastesAfterCooking);
        // 危废废物处置（转移）量
        productionDaily.setMonthOutboundMedicalWastes(monthDisposalMedicalWastesDisposalDirect + monthDisposalMedicalWastesCooking + productionDaily.getMonthInboundMedicalWastesErrorNumber());
        productionDaily.setMonthOutboundMedicalWastesDirectDisposal(monthDisposalMedicalWastesDisposalDirect);
        productionDaily.setMonthOutboundMedicalWastesCooking(monthDisposalMedicalWastesCooking + productionDaily.getMonthInboundMedicalWastesErrorNumber());
        productionDaily.setMonthOutboundMedicalWastesAfterCooking(monthDisposalMedicalWastesAfterCooking);

        // 2. 危废

        // 入库
        float monthInboundWastesBulk = 0f;
        float monthInboundWastesCrushing = 0f;
        float monthInboundWastesSludge = 0f;
        float monthInboundWastesDistillation = 0f;
        float monthInboundWastesSuspension = 0f;
        float monthInboundWastesWasteLiquid = 0f;
        float monthInboundWastesTotal = 0f;         // 工费合计

        List<InboundOrderItem> inboundOrderItemMonthList = inboundService.getInboundOrderItemByRange(monthFirstDay, monthEndDay);
        for (InboundOrderItem inboundOrderItem : inboundOrderItemMonthList) {
            if (inboundOrderItem.getHandleCategory() == null) continue;
            switch (inboundOrderItem.getHandleCategory()) {
                case Sludge:
                    monthInboundWastesSludge += inboundOrderItem.getWastesAmount();
                    monthInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
                case WasteLiquid:
                    monthInboundWastesWasteLiquid += inboundOrderItem.getWastesAmount();
                    monthInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
                case Bulk:
                    monthInboundWastesBulk += inboundOrderItem.getWastesAmount();
                    monthInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
                case Crushing:
                    monthInboundWastesCrushing += inboundOrderItem.getWastesAmount();
                    monthInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
                case Distillation:
                    monthInboundWastesDistillation += inboundOrderItem.getWastesAmount();
                    monthInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
                case Suspension:
                    monthInboundWastesSuspension += inboundOrderItem.getWastesAmount();
                    monthInboundWastesTotal += inboundOrderItem.getWastesAmount();
                    break;
            }
        }
        productionDaily.setMonthInboundWastesBulk(monthInboundWastesBulk);
        productionDaily.setMonthInboundWastesCrushing(monthInboundWastesCrushing);
        productionDaily.setMonthInboundWastesSludge(monthInboundWastesSludge);
        productionDaily.setMonthInboundWastesDistillation(monthInboundWastesDistillation);
        productionDaily.setMonthInboundWastesSuspension(monthInboundWastesSuspension);
        productionDaily.setMonthInboundWastesWasteLiquid(monthInboundWastesWasteLiquid);
        productionDaily.setMonthInboundWastesTotal(monthInboundWastesTotal);

        // 危废出库信息
        float monthOutboundWastesBulk = 0f;
        float monthOutboundWastesCrushing = 0f;
        float monthOutboundWastesSludge = 0f;
        float monthOutboundWastesDistillation = 0f;
        float monthOutboundWastesSuspension = 0f;
        float monthOutboundWastesWasteLiquid = 0f;
        float monthOutboundWastesTotal = 0f;         // 工费合计
        float monthOutboundWastesA2Bulk = 0f;
        float monthOutboundWastesA2Crushing = 0f;
        float monthOutboundWastesA2Sludge = 0f;
        float monthOutboundWastesA2Distillation = 0f;
        float monthOutboundWastesA2Suspension = 0f;
        float monthOutboundWastesA2WasteLiquid = 0f;
        float monthOutboundWastesB2Bulk = 0f;
        float monthOutboundWastesB2Crushing = 0f;
        float monthOutboundWastesB2Sludge = 0f;
        float monthOutboundWastesB2Distillation = 0f;
        float monthOutboundWastesB2Suspension = 0f;
        float monthOutboundWastesB2WasteLiquid = 0f;
        float monthOutboundWastesPrepare2Bulk = 0f;
        float monthOutboundWastesPrepare2Crushing = 0f;
        float monthOutboundWastesPrepare2Sludge = 0f;
        float monthOutboundWastesPrepare2Distillation = 0f;
        float monthOutboundWastesPrepare2Suspension = 0f;
        float monthOutboundWastesPrepare2WasteLiquid = 0f;
        float monthOutboundWastesThirdBulk = 0f;
        float monthOutboundWastesThirdCrushing = 0f;
        float monthOutboundWastesThirdSludge = 0f;
        float monthOutboundWastesThirdDistillation = 0f;
        float monthOutboundWastesThirdSuspension = 0f;
        float monthOutboundWastesThirdWasteLiquid = 0f;

        List<OutboundOrder> outboundOrderMonthList = outboundOrderService.getOutBoundByRange(monthFirstDay, monthEndDay);
        for (OutboundOrder outboundOrder : outboundOrderMonthList) {
            if (outboundOrder.getBoundType() != null && outboundOrder.getBoundType().equals(BoundType.WasteOutbound)) {
                if (outboundOrder.getHandelCategory() != null)
                switch (outboundOrder.getHandelCategory()) {
                    case Sludge:
                        monthOutboundWastesSludge += outboundOrder.getOutboundNumber();
                        monthOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                monthOutboundWastesA2Sludge += outboundOrder.getOutboundNumber();
                            case B2:
                                monthOutboundWastesB2Sludge += outboundOrder.getOutboundNumber();
                            case Prepare2:
                                monthOutboundWastesPrepare2Sludge += outboundOrder.getOutboundNumber();
                            case ThirdPhasePretreatmentSystem:
                                monthOutboundWastesThirdSludge += outboundOrder.getOutboundNumber();
                            default:
                                break;
                        }
                        break;
                    case WasteLiquid:
                        monthOutboundWastesWasteLiquid += outboundOrder.getOutboundNumber();
                        monthOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                monthOutboundWastesA2WasteLiquid += outboundOrder.getOutboundNumber();
                            case B2:
                                monthOutboundWastesB2WasteLiquid += outboundOrder.getOutboundNumber();
                            case Prepare2:
                                monthOutboundWastesPrepare2WasteLiquid += outboundOrder.getOutboundNumber();
                            case ThirdPhasePretreatmentSystem:
                                monthOutboundWastesThirdWasteLiquid += outboundOrder.getOutboundNumber();
                            default:
                                break;
                        }
                        break;
                    case Bulk:
                        monthOutboundWastesBulk += outboundOrder.getOutboundNumber();
                        monthOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                monthOutboundWastesA2Bulk += outboundOrder.getOutboundNumber();
                            case B2:
                                monthOutboundWastesB2Bulk += outboundOrder.getOutboundNumber();
                            case Prepare2:
                                monthOutboundWastesPrepare2Bulk += outboundOrder.getOutboundNumber();
                            case ThirdPhasePretreatmentSystem:
                                monthOutboundWastesThirdBulk += outboundOrder.getOutboundNumber();
                            default:
                                break;
                        }
                        break;
                    case Crushing:
                        monthOutboundWastesCrushing += outboundOrder.getOutboundNumber();
                        monthOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                monthOutboundWastesA2Crushing += outboundOrder.getOutboundNumber();
                            case B2:
                                monthOutboundWastesB2Crushing += outboundOrder.getOutboundNumber();
                            case Prepare2:
                                monthOutboundWastesPrepare2Crushing += outboundOrder.getOutboundNumber();
                            case ThirdPhasePretreatmentSystem:
                                monthOutboundWastesThirdCrushing += outboundOrder.getOutboundNumber();
                            default:
                                break;
                        }
                        break;
                    case Distillation:
                        monthOutboundWastesDistillation += outboundOrder.getOutboundNumber();
                        monthOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                monthOutboundWastesA2Distillation += outboundOrder.getOutboundNumber();
                            case B2:
                                monthOutboundWastesB2Distillation += outboundOrder.getOutboundNumber();
                            case Prepare2:
                                monthOutboundWastesPrepare2Distillation += outboundOrder.getOutboundNumber();
                            case ThirdPhasePretreatmentSystem:
                                monthOutboundWastesThirdDistillation += outboundOrder.getOutboundNumber();
                            default:
                                break;
                        }
                        break;
                    case Suspension:
                        monthOutboundWastesSuspension += outboundOrder.getOutboundNumber();
                        monthOutboundWastesTotal += outboundOrder.getOutboundNumber();
                        switch (outboundOrder.getEquipment()) {
                            case A2:
                                monthOutboundWastesA2Suspension += outboundOrder.getOutboundNumber();
                            case B2:
                                monthOutboundWastesB2Suspension += outboundOrder.getOutboundNumber();
                            case Prepare2:
                                monthOutboundWastesPrepare2Suspension += outboundOrder.getOutboundNumber();
                            case ThirdPhasePretreatmentSystem:
                                monthOutboundWastesThirdSuspension += outboundOrder.getOutboundNumber();
                            default:
                                break;
                        }
                        break;
                }
            }
        }
        productionDaily.setMonthOutboundWastesBulk(monthOutboundWastesBulk);
        productionDaily.setMonthOutboundWastesCrushing(monthOutboundWastesCrushing);
        productionDaily.setMonthOutboundWastesSludge(monthOutboundWastesSludge);
        productionDaily.setMonthOutboundWastesDistillation(monthOutboundWastesDistillation);
        productionDaily.setMonthOutboundWastesSuspension(monthOutboundWastesSuspension);
        productionDaily.setMonthOutboundWastesWasteLiquid(monthOutboundWastesWasteLiquid);
        productionDaily.setMonthOutboundWastesTotal(monthOutboundWastesTotal);
        productionDaily.setMonthOutboundA2WastesBulk(monthOutboundWastesA2Bulk);
        productionDaily.setMonthOutboundA2WastesCrushing(monthOutboundWastesA2Crushing);
        productionDaily.setMonthOutboundA2WastesSludge(monthOutboundWastesA2Sludge);
        productionDaily.setMonthOutboundA2WastesDistillation(monthOutboundWastesA2Distillation);
        productionDaily.setMonthOutboundA2WastesSuspension(monthOutboundWastesA2Suspension);
        productionDaily.setMonthOutboundA2WastesWasteLiquid(monthOutboundWastesA2WasteLiquid);
        productionDaily.setMonthOutboundB2WastesBulk(monthOutboundWastesB2Bulk);
        productionDaily.setMonthOutboundB2WastesCrushing(monthOutboundWastesB2Crushing);
        productionDaily.setMonthOutboundB2WastesSludge(monthOutboundWastesB2Sludge);
        productionDaily.setMonthOutboundB2WastesDistillation(monthOutboundWastesB2Distillation);
        productionDaily.setMonthOutboundB2WastesSuspension(monthOutboundWastesB2Suspension);
        productionDaily.setMonthOutboundB2WastesWasteLiquid(monthOutboundWastesB2WasteLiquid);
        productionDaily.setMonthOutboundPrepare2WastesBulk(monthOutboundWastesPrepare2Bulk);
        productionDaily.setMonthOutboundPrepare2WastesCrushing(monthOutboundWastesPrepare2Crushing);
        productionDaily.setMonthOutboundPrepare2WastesSludge(monthOutboundWastesPrepare2Sludge);
        productionDaily.setMonthOutboundPrepare2WastesDistillation(monthOutboundWastesPrepare2Distillation);
        productionDaily.setMonthOutboundPrepare2WastesSuspension(monthOutboundWastesPrepare2Suspension);
        productionDaily.setMonthOutboundPrepare2WastesWasteLiquid(monthOutboundWastesPrepare2WasteLiquid);
        productionDaily.setMonthOutboundPrepare2WastesBulk(monthOutboundWastesThirdBulk);
        productionDaily.setMonthOutboundPrepare2WastesCrushing(monthOutboundWastesThirdCrushing);
        productionDaily.setMonthOutboundPrepare2WastesSludge(monthOutboundWastesThirdSludge);
        productionDaily.setMonthOutboundPrepare2WastesDistillation(monthOutboundWastesThirdDistillation);
        productionDaily.setMonthOutboundPrepare2WastesSuspension(monthOutboundWastesThirdSuspension);
        productionDaily.setMonthOutboundPrepare2WastesWasteLiquid(monthOutboundWastesThirdWasteLiquid);

        // 3. 辅料能源
        // 辅材、能源入库
        List<Ingredients> ingredientsInMonthList = ingredientsService.getIngredientsInItemByRange(monthFirstDay, monthEndDay, null);
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
        for(Ingredients ingredients : ingredientsInMonthList) {
            switch(ingredients.getName()) {
                case "消石灰": monthInboundAuxiliaryCalcareousLime += ingredients.getAmount();break;
                case "普通活性碳粉": monthInboundAuxiliaryCommonActivatedCarbon += ingredients.getAmount();break;
                case "高活性碳粉": monthInboundAuxiliaryActivatedCarbon += ingredients.getAmount();break;
                case "活性炭颗粒": monthInboundAuxiliaryActivatedCarbonParticles += ingredients.getAmount();break;
                case "碱液": monthInboundAuxiliaryLye += ingredients.getAmount();break;
                case "片碱": monthInboundAuxiliaryCausticSoda += ingredients.getAmount();break;
                case "尿素": monthInboundAuxiliaryUrea += ingredients.getAmount();break;
                case "盐酸": monthInboundAuxiliaryHydrochloricAcid += ingredients.getAmount();break;
                case "小苏打(NaHCO3)": monthInboundAuxiliaryNahco3 += ingredients.getAmount();break;
                case "面粉": monthInboundAuxiliaryFlour += ingredients.getAmount();break;
                case "消泡剂": monthInboundAuxiliaryDefoamer += ingredients.getAmount();break;
                case "絮凝剂(聚丙烯酰胺)": monthInboundAuxiliaryFlocculant += ingredients.getAmount();break;
                case "软水用还原剂": monthInboundAuxiliarySoftWaterReducingAgent += ingredients.getAmount();break;
                case "软水用阻垢剂": monthInboundAuxiliarySoftWaterScaleInhibitor += ingredients.getAmount();break;
                case "氨水(PH调节剂)": monthInboundAuxiliaryAmmonia += ingredients.getAmount();break;
                case "污水用还原剂": monthInboundAuxiliaryWaterReducingAgent += ingredients.getAmount();break;
                case "污水用阻垢剂": monthInboundAuxiliaryWaterScaleInhibitor += ingredients.getAmount();break;
                case "消毒液": monthInboundAuxiliaryNaclo += ingredients.getAmount();break;
                case "除臭剂": monthInboundAuxiliaryDeodorant += ingredients.getAmount();break;
                case "盐": monthInboundAuxiliarySalt += ingredients.getAmount();break;
                case "炉渣用吨袋": monthInboundAuxiliarySlagBag += ingredients.getAmount();break;
                case "飞灰用吨袋": monthInboundAuxiliaryFlyAshBag += ingredients.getAmount();break;
                case "医废用吨袋": monthInboundAuxiliaryMedicalWastesBag += ingredients.getAmount();break;
                case "医废包装塑料袋": monthInboundAuxiliaryMedicalPackingPlasticBag += ingredients.getAmount();break;
                case "收集转运箱": monthInboundAuxiliaryCollectionBox += ingredients.getAmount();break;
                case "标准箱": monthInboundAuxiliaryStandardBox += ingredients.getAmount();break;
                case "木托盘": monthInboundAuxiliaryWoodenPallets += ingredients.getAmount();break;
                case "1m标准托盘": monthInboundAuxiliaryStandardTray_1m += ingredients.getAmount();break;
                case "1.2m标准托盘": monthInboundAuxiliaryStandardTray_1_2m += ingredients.getAmount();break;
                case "吨箱": monthInboundAuxiliaryTonBox += ingredients.getAmount();break;
                case "蒸汽": monthInboundAuxiliarySteam += ingredients.getAmount();break;
                case "柴油": monthInboundAuxiliaryDieselOil += ingredients.getAmount();break;
                case "天然气": monthInboundAuxiliaryNaturalGas += ingredients.getAmount();break;
                case "电量": monthInboundAuxiliaryElectricQuantity += ingredients.getAmount();break;
                case "工业水量": monthInboundAuxiliaryIndustrialWater += ingredients.getAmount();break;
                case "自来水量": monthInboundAuxiliaryTapWaterQuantity += ingredients.getAmount();break;
            }
        }

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

        // 辅料能源消耗明细月累计
        float disposalMonthNaclo = 0f;
        float disposalMonthDeodorant = 0f;
        float disposalMonthMedicalWastesBag = 0f;
        float disposalMonthMedicalPackingPlasticBag = 0f;
        float disposalMonthCollectionBox = 0f;
        float disposalMonthSteam = 0f;
        float disposalMonthIndustrialWater = 0f;
        float disposalMonthElectricQuantity = 0f;
        List<Ingredients> ingredientsMedicalMonthList = ingredientsService.getIngredientsOutItemByRange(monthFirstDay, monthEndDay, Equipment.MedicalCookingSystem);
        for (Ingredients ingredients : ingredientsMedicalMonthList) {
            switch (ingredients.getName()) {
                case "消毒液(NaCLO)":
                    disposalMonthNaclo += ingredients.getReceiveAmount();
                    break;
                case "除臭剂":
                    disposalMonthDeodorant += ingredients.getReceiveAmount();
                    break;
                case "医废吨袋":
                    disposalMonthMedicalWastesBag += ingredients.getReceiveAmount();
                    break;
                case "医废包装塑料袋":
                    disposalMonthMedicalPackingPlasticBag += ingredients.getReceiveAmount();
                    break;
                case "收集转运箱":
                    disposalMonthCollectionBox += ingredients.getReceiveAmount();
                    break;
                case "蒸汽":
                    disposalMonthSteam += ingredients.getReceiveAmount();
                    break;
                case "工业水量":
                    disposalMonthIndustrialWater += ingredients.getReceiveAmount();
                    break;
                case "电量":
                    disposalMonthElectricQuantity += ingredients.getReceiveAmount();
                    break;
                default:
                    break;
            }
        }
        productionDaily.setMonthDisposalMedicalAuxiliaryNaclo(disposalMonthNaclo);
        productionDaily.setMonthDisposalMedicalAuxiliaryDeodorant(disposalMonthDeodorant);
        productionDaily.setMonthDisposalMedicalAuxiliaryMedicalWastesBag(disposalMonthMedicalWastesBag);
        productionDaily.setMonthDisposalMedicalAuxiliaryMedicalPackingPlasticBag(disposalMonthMedicalPackingPlasticBag);
        productionDaily.setMonthDisposalMedicalAuxiliaryCollectionBox(disposalMonthCollectionBox);
        productionDaily.setMonthDisposalMedicalAuxiliarySteam(disposalMonthSteam);
        productionDaily.setMonthDisposalMedicalAuxiliaryIndustrialWater(disposalMonthIndustrialWater);
        productionDaily.setMonthDisposalMedicalAuxiliaryElectricQuantity(disposalMonthElectricQuantity);

        // 二期
        float disposalMonthCalcareousLime = 0f;
        float disposalMonthCommonActivatedCarbon = 0f;
        float disposalMonthActivatedCarbon = 0f;
        float disposalMonthLye = 0f;
        float disposalMonthSalt = 0f;
        float disposalMonthSlagBag = 0f;
        float disposalMonthFlyAshBag = 0f;
        float disposalMonthDieselOil = 0f;
        disposalMonthIndustrialWater = 0f;
        disposalMonthElectricQuantity = 0f;
        float disposalMonthWoodenPallets = 0f;

        List<Ingredients> ingredientsMonthSecondaryList = ingredientsService.getIngredientsOutItemByRange(monthFirstDay, monthEndDay, Equipment.SecondaryTwoCombustionChamber);
        for (Ingredients ingredients : ingredientsMonthSecondaryList) {
            switch (ingredients.getName()) {
                case "消石灰":
                    disposalMonthCalcareousLime += ingredients.getReceiveAmount();
                    break;
                case "普通活性炭粉":
                    disposalMonthCommonActivatedCarbon += ingredients.getReceiveAmount();
                    break;
                case "高活性碳粉":
                    disposalMonthActivatedCarbon += ingredients.getReceiveAmount();
                    break;
                case "碱液":
                    disposalMonthLye += ingredients.getReceiveAmount();
                    break;
                case "盐":
                    disposalMonthSalt += ingredients.getReceiveAmount();
                    break;
                case "炉渣用吨袋":
                    disposalMonthSlagBag += ingredients.getReceiveAmount();
                    break;
                case "飞灰用吨袋":
                    disposalMonthFlyAshBag += ingredients.getReceiveAmount();
                    break;
                case "柴油":
                    disposalMonthDieselOil += ingredients.getReceiveAmount();
                    break;
                case "电量":
                    disposalMonthElectricQuantity += ingredients.getReceiveAmount();
                    break;
                case "工业水量":
                    disposalMonthIndustrialWater += ingredients.getReceiveAmount();
                    break;
                case "木托盘":
                    disposalMonthWoodenPallets += ingredients.getReceiveAmount();
                    break;
                default:
                    break;
            }
        }
        productionDaily.setMonthDisposalSecondaryAuxiliaryCalcareousLime(disposalMonthCalcareousLime);
        productionDaily.setMonthDisposalSecondaryAuxiliaryCommonActivatedCarbon(disposalMonthCommonActivatedCarbon);
        productionDaily.setMonthDisposalSecondaryAuxiliaryActivatedCarbon(disposalMonthActivatedCarbon);
        productionDaily.setMonthDisposalSecondaryAuxiliaryLye(disposalMonthLye);
        productionDaily.setMonthDisposalSecondaryAuxiliarySalt(disposalMonthSalt);
        productionDaily.setMonthDisposalSecondaryAuxiliarySlagBag(disposalMonthSlagBag);
        productionDaily.setMonthDisposalSecondaryAuxiliaryFlyAshBag(disposalMonthFlyAshBag);
        productionDaily.setMonthDisposalSecondaryAuxiliaryDieselOil(disposalMonthDieselOil);
        productionDaily.setMonthDisposalSecondaryAuxiliaryIndustrialWater(disposalMonthIndustrialWater);
        productionDaily.setMonthDisposalSecondaryAuxiliaryElectricQuantity(disposalMonthElectricQuantity);
        productionDaily.setMonthDisposalSecondaryAuxiliaryWoodenPallets(disposalMonthWoodenPallets);

        // 三期
        disposalMonthCalcareousLime = 0f;
        disposalMonthCommonActivatedCarbon = 0f;
        disposalMonthActivatedCarbon = 0f;
        float disposalMonthActivatedCarbonParticles = 0f;
        disposalMonthLye = 0f;
        float disposalMonthCausticSoda = 0f;
        float disposalMonthUrea = 0f;
        float disposalMonthHydrochloricAcid = 0f;
        float disposalMonthNahco3 = 0f;
        float disposalMonthFlour = 0f;
        float disposalMonthDefoamer = 0f;
        float disposalMonthFlocculant = 0f;
        float disposalMonthSoftWaterReducingAgent = 0f;
        float disposalMonthSoftWaterScaleInhibitor = 0f;
        float disposalMonthAmmonia = 0f;
        float disposalMonthWaterReducingAgent = 0f;
        float disposalMonthWaterScaleInhibitor = 0f;
        disposalMonthNaclo = 0f;
        float disposalMonthStandardBox = 0f;
        disposalMonthWoodenPallets = 0f;
        float disposalMonthStandardTray_1m = 0f;
        float disposalMonthStandardTray_1_2m = 0f;
        float disposalMonthAuxiliarySlagBag = 0f;
        disposalMonthFlyAshBag = 0f;
        float disposalMonthTonBox = 0f;
        disposalMonthSteam = 0f;
        disposalMonthDieselOil = 0f;
        float disposalMonthNaturalGas = 0f;
        disposalMonthIndustrialWater = 0f;
        disposalMonthElectricQuantity = 0f;
        float disposalMonthTapWaterQuantity = 0f;
        List<Ingredients> ingredientsMonthThirdList = ingredientsService.getIngredientsOutItemByRange(monthFirstDay, monthEndDay, Equipment.ThirdPhasePretreatmentSystem);
        for (Ingredients ingredients : ingredientsMonthThirdList) {
            switch (ingredients.getName()) {
                case "消石灰":
                    disposalMonthCalcareousLime += ingredients.getReceiveAmount();
                    break;
                case "普通活性炭粉":
                    disposalMonthCommonActivatedCarbon += ingredients.getReceiveAmount();
                    break;
                case "高活性碳粉":
                    disposalMonthActivatedCarbon += ingredients.getReceiveAmount();
                    break;
                case "活性炭颗粒":
                    disposalMonthActivatedCarbonParticles += ingredients.getReceiveAmount();
                    break;
                case "碱液":
                    disposalMonthLye += ingredients.getReceiveAmount();
                    break;
                case "片碱":
                    disposalMonthCausticSoda += ingredients.getReceiveAmount();
                    break;
                case "尿素":
                    disposalMonthUrea += ingredients.getReceiveAmount();
                    break;
                case "盐酸":
                    disposalMonthHydrochloricAcid += ingredients.getReceiveAmount();
                    break;
                case "小苏打(NaHCO3)":
                    disposalMonthNahco3 += ingredients.getReceiveAmount();
                    break;
                case "面粉":
                    disposalMonthFlour += ingredients.getReceiveAmount();
                    break;
                case "消泡剂":
                    disposalMonthDefoamer += ingredients.getReceiveAmount();
                    break;
                case "絮凝剂(聚丙烯酰胺)":
                    disposalMonthFlocculant += ingredients.getReceiveAmount();
                    break;
                case "软水用还原剂":
                    disposalMonthSoftWaterReducingAgent += ingredients.getReceiveAmount();
                    break;
                case "软水用阻垢剂":
                    disposalMonthSoftWaterScaleInhibitor += ingredients.getReceiveAmount();
                    break;
                case "氨水(PH调节剂)":
                    disposalMonthAmmonia += ingredients.getReceiveAmount();
                    break;
                case "污水用还原剂":
                    disposalMonthWaterReducingAgent += ingredients.getReceiveAmount();
                    break;
                case "污水用阻垢剂":
                    disposalMonthWaterScaleInhibitor += ingredients.getReceiveAmount();
                    break;
                case "消毒液(NaCLO)":
                    disposalMonthNaclo += ingredients.getReceiveAmount();
                    break;
                case "标准箱":
                    disposalMonthStandardBox += ingredients.getReceiveAmount();
                    break;
                case "木托盘":
                    disposalMonthWoodenPallets += ingredients.getReceiveAmount();
                    break;
                case "1m标准托盘":
                    disposalMonthStandardTray_1m += ingredients.getReceiveAmount();
                    break;
                case "1.2m标准托盘":
                    disposalMonthStandardTray_1_2m += ingredients.getReceiveAmount();
                    break;
                case "炉渣用吨袋":
                    disposalMonthAuxiliarySlagBag += ingredients.getReceiveAmount();
                    break;
                case "飞灰用吨袋":
                    disposalMonthFlyAshBag += ingredients.getReceiveAmount();
                    break;
                case "吨箱":
                    disposalMonthTonBox += ingredients.getReceiveAmount();
                    break;
                case "蒸汽":
                    disposalMonthSteam += ingredients.getReceiveAmount();
                    break;
                case "柴油":
                    disposalMonthDieselOil += ingredients.getReceiveAmount();
                    break;
                case "天然气":
                    disposalMonthNaturalGas += ingredients.getReceiveAmount();
                    break;
                case "电量":
                    disposalMonthElectricQuantity += ingredients.getReceiveAmount();
                    break;
                case "工业水量":
                    disposalMonthIndustrialWater += ingredients.getReceiveAmount();
                    break;
                case "自来水量":
                    disposalMonthTapWaterQuantity += ingredients.getReceiveAmount();
                    break;
                default:
                    break;
            }
        }
        productionDaily.setMonthDisposalThirdAuxiliaryCalcareousLime(disposalMonthCalcareousLime);
        productionDaily.setMonthDisposalThirdAuxiliaryCommonActivatedCarbon(disposalMonthCommonActivatedCarbon);
        productionDaily.setMonthDisposalThirdAuxiliaryActivatedCarbon(disposalMonthActivatedCarbon);
        productionDaily.setMonthDisposalThirdAuxiliaryActivatedCarbonParticles(disposalMonthActivatedCarbonParticles);
        productionDaily.setMonthDisposalThirdAuxiliaryLye(disposalMonthLye);
        productionDaily.setMonthDisposalThirdAuxiliaryCausticSoda(disposalMonthCausticSoda);
        productionDaily.setMonthDisposalThirdAuxiliaryUrea(disposalMonthUrea);
        productionDaily.setMonthDisposalThirdAuxiliaryHydrochloricAcid(disposalMonthHydrochloricAcid);
        productionDaily.setMonthDisposalThirdAuxiliaryNahco3(disposalMonthNahco3);
        productionDaily.setMonthDisposalThirdAuxiliaryFlour(disposalMonthFlour);
        productionDaily.setMonthDisposalThirdAuxiliaryDefoamer(disposalMonthDefoamer);
        productionDaily.setMonthDisposalThirdAuxiliaryFlocculant(disposalMonthFlocculant);
        productionDaily.setMonthDisposalThirdAuxiliarySoftWaterReducingAgent(disposalMonthSoftWaterReducingAgent);
        productionDaily.setMonthDisposalThirdAuxiliarySoftWaterScaleInhibitor(disposalMonthSoftWaterScaleInhibitor);
        productionDaily.setMonthDisposalThirdAuxiliaryAmmonia(disposalMonthAmmonia);
        productionDaily.setMonthDisposalThirdAuxiliaryWaterReducingAgent(disposalMonthWaterReducingAgent);
        productionDaily.setMonthDisposalThirdAuxiliaryWaterScaleInhibitor(disposalMonthWaterScaleInhibitor);
        productionDaily.setMonthDisposalThirdAuxiliaryNaclo(disposalMonthNaclo);
        productionDaily.setMonthDisposalThirdAuxiliaryStandardBox(disposalMonthStandardBox);
        productionDaily.setMonthDisposalThirdAuxiliaryWoodenPallets(disposalMonthWoodenPallets);
        productionDaily.setMonthDisposalThirdAuxiliaryStandardTray_1m(disposalMonthStandardTray_1m);
        productionDaily.setMonthDisposalThirdAuxiliaryStandardTray_1_2m(disposalMonthStandardTray_1_2m);
        productionDaily.setMonthDisposalThirdAuxiliarySlagBag(disposalMonthAuxiliarySlagBag);
        productionDaily.setMonthDisposalThirdAuxiliaryFlyAshBag(disposalMonthFlyAshBag);
        productionDaily.setMonthDisposalThirdAuxiliaryTonBox(disposalMonthTonBox);
        productionDaily.setMonthDisposalThirdAuxiliarySteam(disposalMonthSteam);
        productionDaily.setMonthDisposalThirdAuxiliaryDieselOil(disposalMonthDieselOil);
        productionDaily.setMonthDisposalThirdAuxiliaryNaturalGas(disposalMonthNaturalGas);
        productionDaily.setMonthDisposalThirdAuxiliaryIndustrialWater(disposalMonthIndustrialWater);
        productionDaily.setMonthDisposalThirdAuxiliaryElectricQuantity(disposalMonthElectricQuantity);
        productionDaily.setMonthDisposalThirdAuxiliaryTapWaterQuantity(disposalMonthTapWaterQuantity);

        // 辅料备件消耗
        List<Ingredients> ingredientsOutMonthList = ingredientsService.getIngredientsOutItemByRange(monthFirstDay, monthEndDay, null);
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
        for(Ingredients ingredients : ingredientsOutMonthList) {
            switch(ingredients.getName()) {
                case "消石灰": monthOutboundAuxiliaryCalcareousLime += ingredients.getAmount();break;
                case "普通活性碳粉": monthOutboundAuxiliaryCommonActivatedCarbon += ingredients.getAmount();break;
                case "高活性碳粉": monthOutboundAuxiliaryActivatedCarbon += ingredients.getAmount();break;
                case "活性炭颗粒": monthOutboundAuxiliaryActivatedCarbonParticles += ingredients.getAmount();break;
                case "碱液": monthOutboundAuxiliaryLye += ingredients.getAmount();break;
                case "片碱": monthOutboundAuxiliaryCausticSoda += ingredients.getAmount();break;
                case "尿素": monthOutboundAuxiliaryUrea += ingredients.getAmount();break;
                case "盐酸": monthOutboundAuxiliaryHydrochloricAcid += ingredients.getAmount();break;
                case "小苏打(NaHCO3)": monthOutboundAuxiliaryNahco3 += ingredients.getAmount();break;
                case "面粉": monthOutboundAuxiliaryFlour += ingredients.getAmount();break;
                case "消泡剂": monthOutboundAuxiliaryDefoamer += ingredients.getAmount();break;
                case "絮凝剂(聚丙烯酰胺)": monthOutboundAuxiliaryFlocculant += ingredients.getAmount();break;
                case "软水用还原剂": monthOutboundAuxiliarySoftWaterReducingAgent += ingredients.getAmount();break;
                case "软水用阻垢剂": monthOutboundAuxiliarySoftWaterScaleInhibitor += ingredients.getAmount();break;
                case "氨水(PH调节剂)": monthOutboundAuxiliaryAmmonia += ingredients.getAmount();break;
                case "污水用还原剂": monthOutboundAuxiliaryWaterReducingAgent += ingredients.getAmount();break;
                case "污水用阻垢剂": monthOutboundAuxiliaryWaterScaleInhibitor += ingredients.getAmount();break;
                case "消毒液": monthOutboundAuxiliaryNaclo += ingredients.getAmount();break;
                case "除臭剂": monthOutboundAuxiliaryDeodorant += ingredients.getAmount();break;
                case "盐": monthOutboundAuxiliarySalt += ingredients.getAmount();break;
                case "炉渣用吨袋": monthOutboundAuxiliarySlagBag += ingredients.getAmount();break;
                case "飞灰用吨袋": monthOutboundAuxiliaryFlyAshBag += ingredients.getAmount();break;
                case "医废用吨袋": monthOutboundAuxiliaryMedicalWastesBag += ingredients.getAmount();break;
                case "医废包装塑料袋": monthOutboundAuxiliaryMedicalPackingPlasticBag += ingredients.getAmount();break;
                case "收集转运箱": monthOutboundAuxiliaryCollectionBox += ingredients.getAmount();break;
                case "标准箱": monthOutboundAuxiliaryStandardBox += ingredients.getAmount();break;
                case "木托盘": monthOutboundAuxiliaryWoodenPallets += ingredients.getAmount();break;
                case "1m标准托盘": monthOutboundAuxiliaryStandardTray_1m += ingredients.getAmount();break;
                case "1.2m标准托盘": monthOutboundAuxiliaryStandardTray_1_2m += ingredients.getAmount();break;
                case "吨箱": monthOutboundAuxiliaryTonBox += ingredients.getAmount();break;
                case "蒸汽": monthOutboundAuxiliarySteam += ingredients.getAmount();break;
                case "柴油": monthOutboundAuxiliaryDieselOil += ingredients.getAmount();break;
                case "天然气": monthOutboundAuxiliaryNaturalGas += ingredients.getAmount();break;
                case "电量": monthOutboundAuxiliaryElectricQuantity += ingredients.getAmount();break;
                case "工业水量": monthOutboundAuxiliaryIndustrialWater += ingredients.getAmount();break;
                case "自来水量": monthOutboundAuxiliaryTapWaterQuantity += ingredients.getAmount();break;
            }
        }
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
        productionDaily.setMonthOutboundAuxiliaryCollectionBox(monthOutboundAuxiliaryCollectionBox);
        productionDaily.setMonthOutboundAuxiliaryStandardBox(monthOutboundAuxiliaryStandardBox);
        productionDaily.setMonthOutboundAuxiliaryWoodenPallets(monthOutboundAuxiliaryWoodenPallets);
        productionDaily.setMonthOutboundAuxiliaryStandardTray_1m(monthOutboundAuxiliaryStandardTray_1m);
        productionDaily.setMonthOutboundAuxiliaryStandardTray_1_2m(monthOutboundAuxiliaryStandardTray_1_2m);
        productionDaily.setMonthOutboundAuxiliaryTonBox(monthOutboundAuxiliaryTonBox);
        productionDaily.setMonthOutboundAuxiliarySteam(monthOutboundAuxiliarySteam);
        productionDaily.setMonthOutboundAuxiliaryDieselOil(monthOutboundAuxiliaryDieselOil);
        productionDaily.setMonthOutboundAuxiliaryNaturalGas(monthOutboundAuxiliaryNaturalGas);
        productionDaily.setMonthOutboundAuxiliaryElectricQuantity(monthOutboundAuxiliaryElectricQuantity);
        productionDaily.setMonthOutboundAuxiliaryIndustrialWater(monthOutboundAuxiliaryIndustrialWater);
        productionDaily.setMonthOutboundAuxiliaryTapWaterQuantity(monthOutboundAuxiliaryTapWaterQuantity);

        // 运行情况统计
        float equipmentMonthA2RunningTime = 0f;
        float equipmentMonthB2RunningTime = 0f;
        float equipmentMonthPrepare2RunningTime = 0f;
        float equipmentMonthSecondRunningTime = 0f;
        float equipmentMonthThirdRunningTime = 0f;
        List<EquipmentItem> equipmentDateMonthList = equipmentService.getEquipmentDataByDate(monthFirstDay, monthEndDay);
        for (EquipmentItem equipmentItem : equipmentDateMonthList) {
            Equipment equipmentName = equipmentItem.getEquipment();
            switch (equipmentName.getName()) {
                case "A2":
                    equipmentMonthA2RunningTime += equipmentItem.getRunningTime();
                    break;
                case "B2":
                    equipmentMonthB2RunningTime += equipmentItem.getRunningTime();
                    break;
                case "备2":
                    equipmentMonthPrepare2RunningTime += equipmentItem.getRunningTime();
                    break;
                case "二期二燃室":
                    equipmentMonthSecondRunningTime += equipmentItem.getRunningTime();
                    break;
                case "三期预处理系统":
                    equipmentMonthThirdRunningTime += equipmentItem.getRunningTime();
                    break;
            }
        }
        // 运行时间和停止时间
        productionDaily.setMonthEquipmentA2RunningTime(equipmentMonthA2RunningTime);
        productionDaily.setMonthEquipmentB2RunningTime(equipmentMonthB2RunningTime);
        productionDaily.setMonthEquipmentPrepare2RunningTime(equipmentMonthPrepare2RunningTime);
        productionDaily.setMonthEquipmentSecondaryRunningTime(equipmentMonthSecondRunningTime);
        productionDaily.setMonthEquipmentThirdRunningTime(equipmentMonthThirdRunningTime);

        productionDaily.setMonthEquipmentA2StopTime(24 - productionDaily.getMonthEquipmentA2RunningTime());
        productionDaily.setMonthEquipmentB2StopTime(24 - productionDaily.getMonthEquipmentB2RunningTime());
        productionDaily.setMonthEquipmentPrepare2StopTime(24 - productionDaily.getMonthEquipmentPrepare2StopTime());
        productionDaily.setMonthEquipmentSecondaryStopTime(24 - productionDaily.getMonthEquipmentSecondaryRunningTime());
        productionDaily.setMonthEquipmentThirdStopTime(24 - productionDaily.getMonthEquipmentThirdRunningTime());
        // 运转率
        productionDaily.setMonthEquipmentA2RunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getMonthEquipmentA2RunningTime(), productionDaily.getMonthEquipmentA2StopTime())));
        productionDaily.setMonthEquipmentB2RunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getMonthEquipmentB2RunningTime(), productionDaily.getMonthEquipmentB2StopTime())));
        productionDaily.setMonthEquipmentPrepare2RunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getMonthEquipmentPrepare2RunningTime(), productionDaily.getMonthEquipmentPrepare2StopTime())));
        productionDaily.setMonthEquipmentSecondaryRunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getMonthEquipmentSecondaryRunningTime(), productionDaily.getMonthEquipmentSecondaryStopTime())));
        productionDaily.setMonthEquipmentThirdRunningRate(Float.parseFloat(RandomUtil.getPercentage(productionDaily.getMonthEquipmentThirdRunningTime(), productionDaily.getMonthEquipmentThirdStopTime())));

        // 4. 次生
        // 入库
        float monthSecondInSlag = 0f;
        float monthSecondInAsh = 0f;
        float monthSecondInBucket = 0f;
        List<InboundOrderItem> monthSecondInboundOrderList = inboundService.getSecondInboundOrderItemByRange(monthFirstDay, monthEndDay);
        for (InboundOrderItem inboundOrderItem : monthSecondInboundOrderList) {
            if (inboundOrderItem.getWastes() != null)
                if (inboundOrderItem.getWastes().getName().contains("飞灰")) {
                    monthSecondInAsh += inboundOrderItem.getWastesAmount();
                } else if (inboundOrderItem.getWastes().getName().contains("炉渣")) {
                    monthSecondInSlag += inboundOrderItem.getWastesAmount();
                } else if (inboundOrderItem.getWastes().getName().contains("桶")) {
                    monthSecondInBucket += inboundOrderItem.getWastesAmount();
                }
        }
        productionDaily.setMonthInboundSecondWastesAsh(monthSecondInAsh);
        productionDaily.setMonthInboundSecondWastesSlag(monthSecondInSlag);
        productionDaily.setMonthInboundSecondWastesBucket(monthSecondInBucket);
        // 出库
        float monthSecondOutSlag = 0f;
        float monthSecondOutAsh = 0f;
        float monthSecondOutBucket = 0f;
        float monthSecondOutSecondSlag = 0f;
        float monthSecondOutSecondAsh = 0f;
        float monthSecondOutThirdSlag = 0f;
        float monthSecondOutThirdAsh = 0f;
        List<OutboundOrder> monthSecondOutboundOrderList = outboundOrderService.getOutBoundByRange(monthFirstDay, monthEndDay);
        for (OutboundOrder outboundOrder : monthSecondOutboundOrderList) {
            if (outboundOrder.getBoundType() != null && outboundOrder.getBoundType().equals(BoundType.SecondaryOutbound) && outboundOrder.getWastes() != null)
                if (outboundOrder.getWastes().getName().contains("飞灰")) {
                    monthSecondOutAsh += outboundOrder.getOutboundNumber();
                    switch (outboundOrder.getEquipment()) {
                        case SecondaryTwoCombustionChamber:
                            monthSecondOutSecondAsh += outboundOrder.getOutboundNumber();
                            break;
                        case ThirdPhasePretreatmentSystem:
                            monthSecondOutThirdAsh += outboundOrder.getOutboundNumber();
                            break;
                        default:
                            break;
                    }
                } else if (outboundOrder.getWastes().getName().contains("炉渣")) {
                    monthSecondOutSlag += outboundOrder.getOutboundNumber();
                    switch (outboundOrder.getEquipment()) {
                        case SecondaryTwoCombustionChamber:
                            monthSecondOutSecondAsh += outboundOrder.getOutboundNumber();
                            break;
                        case ThirdPhasePretreatmentSystem:
                            monthSecondOutThirdSlag += outboundOrder.getOutboundNumber();
                            break;
                        default:
                            break;
                    }
                } else if (outboundOrder.getWastes().getName().contains("桶")) {
                    monthSecondOutBucket += outboundOrder.getOutboundNumber();
                }
        }
        productionDaily.setMonthOutboundSecondWastesAsh(monthSecondOutAsh);
        productionDaily.setMonthOutboundSecondWastesSlag(monthSecondOutSlag);
        productionDaily.setMonthOutboundSecondWastesBucket(monthSecondOutBucket);
        productionDaily.setMonthDisposalSecondarySlag(monthSecondOutSecondSlag);
        productionDaily.setMonthDisposalSecondaryAsh(monthSecondOutSecondAsh);
        productionDaily.setMonthDisposalThirdAsh(monthSecondOutThirdAsh);
        productionDaily.setMonthDisposalThirdSlag(monthSecondOutThirdSlag);


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

    /**
     * 导出日报
     * @param id 编号
     * @return 成功与否
     */
    @RequestMapping("exportProductionDailyExcel")
    @ResponseBody
    public void exportProductionDailyExcel(int id, HttpServletResponse response) {
        String filePath = "Files/Out/生产日报导出文件.xlsx";
        String fileName = "";   // 初始化文件名
        try {
            ProductionDaily productionDaily = productionDailyService.getProductionDailyById(id);
            makeProductionDailyExcel(productionDaily);
            // 获取文件路径，适配中文
//            filePath = new String(filePath.getBytes("iso8859-1"), "utf-8");
            String[] str = filePath.split("[/]");     // 根据“/”将字符串分割成数组
            fileName = java.net.URLEncoder.encode(str[str.length - 1], "UTF-8");  // 设置文件名
            response.setCharacterEncoding("UTF-8");   // 设置编码
            response.setContentType("multipart/form-data");
            // 设置头文件
            response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
            // 初始化输入流
            InputStream in = null;
            in = new FileInputStream(filePath);
            byte[] buffer = new byte[1024];
            int bytesRead = 0;
            do {
                // 写入字节
                bytesRead = in.read(buffer, 0, buffer.length);
                response.getOutputStream().write(buffer, 0, bytesRead);
            } while (bytesRead == buffer.length);
            in.close();      // 关闭输入流等
            response.getOutputStream().flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 制作日报文件
     * @param productionDaily 日报对象
     */
    private void makeProductionDailyExcel(ProductionDaily productionDaily) {
        String filePath = "Files/Templates/生产日报模板.xlsx";
        try {
            FileInputStream excelFileInputStream = new FileInputStream(filePath);
            XSSFWorkbook xwb = new XSSFWorkbook(excelFileInputStream);
            excelFileInputStream.close();
            XSSFSheet xSheet = xwb.getSheetAt(0);
            Map<String, Object> hashMap = new HashMap<>();
            hashMap.put("E02", DateUtil.getDateStr(productionDaily.getDate()));
            // 危废进厂数量
            hashMap.put("C05", productionDaily.getTodayInboundMedicalWastes());
            hashMap.put("C06", productionDaily.getTodayInboundMedicalWastesDirectDisposal());
            hashMap.put("C07", productionDaily.getTodayInboundMedicalWastesCooking());
            hashMap.put("C08", productionDaily.getTodayInboundMedicalWastesErrorNumber());
            hashMap.put("C09", productionDaily.getTodayInboundMedicalWastesAfterCooking());
            hashMap.put("C10", productionDaily.getTodayInboundMedicalWastesAfterCookingSend());
            hashMap.put("C11", productionDaily.getTodayInboundMedicalWastesAfterCookingInbound());
            hashMap.put("C12", productionDaily.getTodayInboundMedicalWastesWetNumber());
            hashMap.put("C13", productionDaily.getTodayInboundWastesBulk());
            hashMap.put("C14", productionDaily.getTodayInboundWastesCrushing());
            hashMap.put("C15", productionDaily.getTodayInboundWastesSludge());
            hashMap.put("C16", productionDaily.getTodayInboundWastesDistillation());
            hashMap.put("C17", productionDaily.getTodayInboundWastesSuspension());
            hashMap.put("C18", productionDaily.getTodayInboundWastesWasteLiquid());
            hashMap.put("C19", productionDaily.getTodayInboundWastesTotal());
            hashMap.put("C20", productionDaily.getTodayInboundSecondWastesSlag());
            hashMap.put("C21", productionDaily.getTodayInboundSecondWastesAsh());
            hashMap.put("C22", productionDaily.getTodayInboundSecondWastesBucket());

            hashMap.put("D05", productionDaily.getMonthInboundMedicalWastes());
            hashMap.put("D06", productionDaily.getMonthInboundMedicalWastesDirectDisposal());
            hashMap.put("D07", productionDaily.getMonthInboundMedicalWastesCooking());
            hashMap.put("D08", productionDaily.getMonthInboundMedicalWastesErrorNumber());
            hashMap.put("D09", productionDaily.getMonthInboundMedicalWastesAfterCooking());
            hashMap.put("D10", productionDaily.getMonthInboundMedicalWastesAfterCookingSend());
            hashMap.put("D11", productionDaily.getMonthInboundMedicalWastesAfterCookingInbound());
            hashMap.put("D12", productionDaily.getMonthInboundMedicalWastesWetNumber());
            hashMap.put("D13", productionDaily.getMonthInboundWastesBulk());
            hashMap.put("D14", productionDaily.getMonthInboundWastesCrushing());
            hashMap.put("D15", productionDaily.getMonthInboundWastesSludge());
            hashMap.put("D16", productionDaily.getMonthInboundWastesDistillation());
            hashMap.put("D17", productionDaily.getMonthInboundWastesSuspension());
            hashMap.put("D18", productionDaily.getMonthInboundWastesWasteLiquid());
            hashMap.put("D19", productionDaily.getMonthInboundWastesTotal());
            hashMap.put("D20", productionDaily.getMonthInboundSecondWastesSlag());
            hashMap.put("D21", productionDaily.getMonthInboundSecondWastesAsh());
            hashMap.put("D22", productionDaily.getMonthInboundSecondWastesBucket());

            hashMap.put("E05", productionDaily.getYearInboundMedicalWastes());
            hashMap.put("E06", productionDaily.getYearInboundMedicalWastesDirectDisposal());
            hashMap.put("E07", productionDaily.getYearInboundMedicalWastesCooking());
            hashMap.put("E08", productionDaily.getYearInboundMedicalWastesErrorNumber());
            hashMap.put("E09", productionDaily.getYearInboundMedicalWastesAfterCooking());
            hashMap.put("E10", productionDaily.getYearInboundMedicalWastesAfterCookingSend());
            hashMap.put("E11", productionDaily.getYearInboundMedicalWastesAfterCookingInbound());
            hashMap.put("E12", productionDaily.getYearInboundMedicalWastesWetNumber());
            hashMap.put("E13", productionDaily.getYearInboundWastesBulk());
            hashMap.put("E14", productionDaily.getYearInboundWastesCrushing());
            hashMap.put("E15", productionDaily.getYearInboundWastesSludge());
            hashMap.put("E16", productionDaily.getYearInboundWastesDistillation());
            hashMap.put("E17", productionDaily.getYearInboundWastesSuspension());
            hashMap.put("E18", productionDaily.getYearInboundWastesWasteLiquid());
            hashMap.put("E19", productionDaily.getYearInboundWastesTotal());
            hashMap.put("E20", productionDaily.getYearInboundSecondWastesSlag());
            hashMap.put("E21", productionDaily.getYearInboundSecondWastesAsh());
            hashMap.put("E22", productionDaily.getYearInboundSecondWastesBucket());

            // 危废处置
            hashMap.put("H05", productionDaily.getTodayOutboundMedicalWastes());
            hashMap.put("H06", productionDaily.getTodayOutboundMedicalWastesDirectDisposal());
            hashMap.put("H07", productionDaily.getTodayOutboundMedicalWastesCooking());
            hashMap.put("H08", productionDaily.getTodayOutboundMedicalWastesErrorNumber());
            hashMap.put("H09", productionDaily.getTodayOutboundMedicalWastesAfterCooking());
            hashMap.put("H10", productionDaily.getTodayOutboundMedicalWastesAfterCookingSend());
            hashMap.put("H11", productionDaily.getTodayOutboundMedicalWastesAfterCookingInbound());
            hashMap.put("H12", productionDaily.getTodayOutboundMedicalWastesWetNumber());
            hashMap.put("H13", productionDaily.getTodayOutboundWastesBulk());
            hashMap.put("H14", productionDaily.getTodayOutboundWastesCrushing());
            hashMap.put("H15", productionDaily.getTodayOutboundWastesSludge());
            hashMap.put("H16", productionDaily.getTodayOutboundWastesDistillation());
            hashMap.put("H17", productionDaily.getTodayOutboundWastesSuspension());
            hashMap.put("H18", productionDaily.getTodayOutboundWastesWasteLiquid());
            hashMap.put("H19", productionDaily.getTodayOutboundWastesTotal());
            hashMap.put("H20", productionDaily.getTodayOutboundSecondWastesSlag());
            hashMap.put("H21", productionDaily.getTodayOutboundSecondWastesAsh());
            hashMap.put("H22", productionDaily.getTodayOutboundSecondWastesBucket());

            hashMap.put("I05", productionDaily.getMonthOutboundMedicalWastes());
            hashMap.put("I06", productionDaily.getMonthOutboundMedicalWastesDirectDisposal());
            hashMap.put("I07", productionDaily.getMonthOutboundMedicalWastesCooking());
            hashMap.put("I08", productionDaily.getMonthOutboundMedicalWastesErrorNumber());
            hashMap.put("I09", productionDaily.getMonthOutboundMedicalWastesAfterCooking());
            hashMap.put("I10", productionDaily.getMonthOutboundMedicalWastesAfterCookingSend());
            hashMap.put("I11", productionDaily.getMonthOutboundMedicalWastesAfterCookingInbound());
            hashMap.put("I12", productionDaily.getMonthOutboundMedicalWastesWetNumber());
            hashMap.put("I13", productionDaily.getMonthOutboundWastesBulk());
            hashMap.put("I14", productionDaily.getMonthOutboundWastesCrushing());
            hashMap.put("I15", productionDaily.getMonthOutboundWastesSludge());
            hashMap.put("I16", productionDaily.getMonthOutboundWastesDistillation());
            hashMap.put("I17", productionDaily.getMonthOutboundWastesSuspension());
            hashMap.put("I18", productionDaily.getMonthOutboundWastesWasteLiquid());
            hashMap.put("I19", productionDaily.getMonthOutboundWastesTotal());
            hashMap.put("I20", productionDaily.getMonthOutboundSecondWastesSlag());
            hashMap.put("I21", productionDaily.getMonthOutboundSecondWastesAsh());
            hashMap.put("I22", productionDaily.getMonthOutboundSecondWastesBucket());
            // 年出库
            hashMap.put("J05", productionDaily.getYearOutboundMedicalWastes());
            hashMap.put("J06", productionDaily.getYearOutboundMedicalWastesDirectDisposal());
            hashMap.put("J07", productionDaily.getYearOutboundMedicalWastesCooking());
            hashMap.put("J08", productionDaily.getYearOutboundMedicalWastesErrorNumber());
            hashMap.put("J09", productionDaily.getYearOutboundMedicalWastesAfterCooking());
            hashMap.put("J10", productionDaily.getYearOutboundMedicalWastesAfterCookingSend());
            hashMap.put("J11", productionDaily.getYearOutboundMedicalWastesAfterCookingInbound());
            hashMap.put("J12", productionDaily.getYearOutboundMedicalWastesWetNumber());
            hashMap.put("J13", productionDaily.getYearOutboundWastesBulk());
            hashMap.put("J14", productionDaily.getYearOutboundWastesCrushing());
            hashMap.put("J15", productionDaily.getYearOutboundWastesSludge());
            hashMap.put("J16", productionDaily.getYearOutboundWastesDistillation());
            hashMap.put("J17", productionDaily.getYearOutboundWastesSuspension());
            hashMap.put("J18", productionDaily.getYearOutboundWastesWasteLiquid());
            hashMap.put("J19", productionDaily.getYearOutboundWastesTotal());
            hashMap.put("J20", productionDaily.getYearOutboundSecondWastesSlag());
            hashMap.put("J21", productionDaily.getYearOutboundSecondWastesAsh());
            hashMap.put("J22", productionDaily.getYearOutboundSecondWastesBucket());
            // 期初结余
            hashMap.put("M05", productionDaily.getMonthBalanceMedicalWastes());
            hashMap.put("M06", productionDaily.getMonthBalanceMedicalWastesDirectDisposal());
            hashMap.put("M07", productionDaily.getMonthBalanceMedicalWastesCooking());
            hashMap.put("M08", productionDaily.getMonthBalanceMedicalWastesErrorNumber());
            hashMap.put("M09", productionDaily.getMonthBalanceMedicalWastesAfterCooking());
            hashMap.put("M10", productionDaily.getMonthBalanceMedicalWastesAfterCookingSend());
            hashMap.put("M11", productionDaily.getMonthBalanceMedicalWastesAfterCookingInbound());
            hashMap.put("M12", productionDaily.getMonthBalanceMedicalWastesWetNumber());
            hashMap.put("M13", productionDaily.getMonthBalanceWastesBulk());
            hashMap.put("M14", productionDaily.getMonthBalanceWastesCrushing());
            hashMap.put("M15", productionDaily.getMonthBalanceWastesSludge());
            hashMap.put("M16", productionDaily.getMonthBalanceWastesDistillation());
            hashMap.put("M17", productionDaily.getMonthBalanceWastesSuspension());
            hashMap.put("M18", productionDaily.getMonthBalanceWastesWasteLiquid());
            hashMap.put("M19", productionDaily.getMonthBalanceWastesTotal());
            hashMap.put("M20", productionDaily.getMonthBalanceSecondWastesSlag());
            hashMap.put("M21", productionDaily.getMonthBalanceSecondWastesAsh());
            hashMap.put("M22", productionDaily.getMonthBalanceSecondWastesBucket());
            // 本日库存
            hashMap.put("N05", productionDaily.getTodayInventoryMedicalWastes());
            hashMap.put("N06", productionDaily.getTodayInventoryMedicalWastesDirectDisposal());
            hashMap.put("N07", productionDaily.getTodayInventoryMedicalWastesCooking());
            hashMap.put("N08", productionDaily.getTodayInventoryMedicalWastesErrorNumber());
            hashMap.put("N09", productionDaily.getTodayInventoryMedicalWastesAfterCooking());
            hashMap.put("N10", productionDaily.getTodayInventoryMedicalWastesAfterCookingSend());
            hashMap.put("N11", productionDaily.getTodayInventoryMedicalWastesAfterCookingInbound());
            hashMap.put("N12", productionDaily.getTodayInventoryMedicalWastesWetNumber());
            hashMap.put("N13", productionDaily.getTodayInventoryWastesBulk());
            hashMap.put("N14", productionDaily.getTodayInventoryWastesCrushing());
            hashMap.put("N15", productionDaily.getTodayInventoryWastesSludge());
            hashMap.put("N16", productionDaily.getTodayInventoryWastesDistillation());
            hashMap.put("N17", productionDaily.getTodayInventoryWastesSuspension());
            hashMap.put("N18", productionDaily.getTodayInventoryWastesWasteLiquid());
            hashMap.put("N19", productionDaily.getTodayInventoryWastesTotal());
            hashMap.put("N20", productionDaily.getTodayInventorySecondWastesSlag());
            hashMap.put("N21", productionDaily.getTodayInventorySecondWastesAsh());
            hashMap.put("N22", productionDaily.getTodayInventorySecondWastesBucket());
            // 辅料能源进厂量
            hashMap.put("C25", productionDaily.getTodayInboundAuxiliaryCalcareousLime());
            hashMap.put("C26", productionDaily.getTodayInboundAuxiliaryCommonActivatedCarbon());
            hashMap.put("C27", productionDaily.getTodayInboundAuxiliaryActivatedCarbon());
            hashMap.put("C28", productionDaily.getTodayInboundAuxiliaryActivatedCarbonParticles());
            hashMap.put("C29", productionDaily.getTodayInboundAuxiliaryLye());
            hashMap.put("C30", productionDaily.getTodayInboundAuxiliaryCausticSoda());
            hashMap.put("C31", productionDaily.getTodayInboundAuxiliaryUrea());
            hashMap.put("C32", productionDaily.getTodayInboundAuxiliaryHydrochloricAcid());
            hashMap.put("C33", productionDaily.getTodayInboundAuxiliaryNahco3());
            hashMap.put("C34", productionDaily.getTodayInboundAuxiliaryFlour());
            hashMap.put("C35", productionDaily.getTodayInboundAuxiliaryDefoamer());
            hashMap.put("C36", productionDaily.getTodayInboundAuxiliaryFlocculant());
            hashMap.put("C37", productionDaily.getTodayInboundAuxiliarySoftWaterReducingAgent());
            hashMap.put("C38", productionDaily.getTodayInboundAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("C39", productionDaily.getTodayInboundAuxiliaryAmmonia());
            hashMap.put("C40", productionDaily.getTodayInboundAuxiliaryWaterReducingAgent());
            hashMap.put("C41", productionDaily.getTodayInboundAuxiliaryWaterScaleInhibitor());
            hashMap.put("C42", productionDaily.getTodayInboundAuxiliaryNaclo());
            hashMap.put("C43", productionDaily.getTodayInboundAuxiliaryDeodorant());
            hashMap.put("C44", productionDaily.getTodayInboundAuxiliarySalt());
            hashMap.put("C45", productionDaily.getTodayInboundAuxiliarySlagBag());
            hashMap.put("C46", productionDaily.getTodayInboundAuxiliaryFlyAshBag());
            hashMap.put("C47", productionDaily.getTodayInboundAuxiliaryMedicalWastesBag());
            hashMap.put("C48", productionDaily.getTodayInboundAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("C49", productionDaily.getTodayInboundAuxiliaryCollectionBox());
            hashMap.put("C50", productionDaily.getTodayInboundAuxiliaryStandardBox());
            hashMap.put("C51", productionDaily.getTodayInboundAuxiliaryWoodenPallets());
            hashMap.put("C52", productionDaily.getTodayInboundAuxiliaryStandardTray_1m());
            hashMap.put("C53", productionDaily.getTodayInboundAuxiliaryStandardTray_1_2m());
            hashMap.put("C54", productionDaily.getTodayInboundAuxiliaryTonBox());
            hashMap.put("C55", productionDaily.getTodayInboundAuxiliarySteam());
            hashMap.put("C56", productionDaily.getTodayInboundAuxiliaryDieselOil());
            hashMap.put("C57", productionDaily.getTodayInboundAuxiliaryNaturalGas());
            hashMap.put("C58", productionDaily.getTodayInboundAuxiliaryElectricQuantity());
            hashMap.put("C59", productionDaily.getTodayInboundAuxiliaryIndustrialWater());
            hashMap.put("C60", productionDaily.getTodayInboundAuxiliaryTapWaterQuantity());

            hashMap.put("D25", productionDaily.getMonthInboundAuxiliaryCalcareousLime());
            hashMap.put("D26", productionDaily.getMonthInboundAuxiliaryCommonActivatedCarbon());
            hashMap.put("D27", productionDaily.getMonthInboundAuxiliaryActivatedCarbon());
            hashMap.put("D28", productionDaily.getMonthInboundAuxiliaryActivatedCarbonParticles());
            hashMap.put("D29", productionDaily.getMonthInboundAuxiliaryLye());
            hashMap.put("D30", productionDaily.getMonthInboundAuxiliaryCausticSoda());
            hashMap.put("D31", productionDaily.getMonthInboundAuxiliaryUrea());
            hashMap.put("D32", productionDaily.getMonthInboundAuxiliaryHydrochloricAcid());
            hashMap.put("D33", productionDaily.getMonthInboundAuxiliaryNahco3());
            hashMap.put("D34", productionDaily.getMonthInboundAuxiliaryFlour());
            hashMap.put("D35", productionDaily.getMonthInboundAuxiliaryDefoamer());
            hashMap.put("D36", productionDaily.getMonthInboundAuxiliaryFlocculant());
            hashMap.put("D37", productionDaily.getMonthInboundAuxiliarySoftWaterReducingAgent());
            hashMap.put("D38", productionDaily.getMonthInboundAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("D39", productionDaily.getMonthInboundAuxiliaryAmmonia());
            hashMap.put("D40", productionDaily.getMonthInboundAuxiliaryWaterReducingAgent());
            hashMap.put("D41", productionDaily.getMonthInboundAuxiliaryWaterScaleInhibitor());
            hashMap.put("D42", productionDaily.getMonthInboundAuxiliaryNaclo());
            hashMap.put("D43", productionDaily.getMonthInboundAuxiliaryDeodorant());
            hashMap.put("D44", productionDaily.getMonthInboundAuxiliarySalt());
            hashMap.put("D45", productionDaily.getMonthInboundAuxiliarySlagBag());
            hashMap.put("D46", productionDaily.getMonthInboundAuxiliaryFlyAshBag());
            hashMap.put("D47", productionDaily.getMonthInboundAuxiliaryMedicalWastesBag());
            hashMap.put("D48", productionDaily.getMonthInboundAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("D49", productionDaily.getMonthInboundAuxiliaryCollectionBox());
            hashMap.put("D50", productionDaily.getMonthInboundAuxiliaryStandardBox());
            hashMap.put("D51", productionDaily.getMonthInboundAuxiliaryWoodenPallets());
            hashMap.put("D52", productionDaily.getMonthInboundAuxiliaryStandardTray_1m());
            hashMap.put("D53", productionDaily.getMonthInboundAuxiliaryStandardTray_1_2m());
            hashMap.put("D54", productionDaily.getMonthInboundAuxiliaryTonBox());
            hashMap.put("D55", productionDaily.getMonthInboundAuxiliarySteam());
            hashMap.put("D56", productionDaily.getMonthInboundAuxiliaryDieselOil());
            hashMap.put("D57", productionDaily.getMonthInboundAuxiliaryNaturalGas());
            hashMap.put("D58", productionDaily.getMonthInboundAuxiliaryElectricQuantity());
            hashMap.put("D59", productionDaily.getMonthInboundAuxiliaryIndustrialWater());
            hashMap.put("D60", productionDaily.getMonthInboundAuxiliaryTapWaterQuantity());

            hashMap.put("F25", productionDaily.getYearInboundAuxiliaryCalcareousLime());
            hashMap.put("F26", productionDaily.getYearInboundAuxiliaryCommonActivatedCarbon());
            hashMap.put("F27", productionDaily.getYearInboundAuxiliaryActivatedCarbon());
            hashMap.put("F28", productionDaily.getYearInboundAuxiliaryActivatedCarbonParticles());
            hashMap.put("F29", productionDaily.getYearInboundAuxiliaryLye());
            hashMap.put("F30", productionDaily.getYearInboundAuxiliaryCausticSoda());
            hashMap.put("F31", productionDaily.getYearInboundAuxiliaryUrea());
            hashMap.put("F32", productionDaily.getYearInboundAuxiliaryHydrochloricAcid());
            hashMap.put("F33", productionDaily.getYearInboundAuxiliaryNahco3());
            hashMap.put("F34", productionDaily.getYearInboundAuxiliaryFlour());
            hashMap.put("F35", productionDaily.getYearInboundAuxiliaryDefoamer());
            hashMap.put("F36", productionDaily.getYearInboundAuxiliaryFlocculant());
            hashMap.put("F37", productionDaily.getYearInboundAuxiliarySoftWaterReducingAgent());
            hashMap.put("F38", productionDaily.getYearInboundAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("F39", productionDaily.getYearInboundAuxiliaryAmmonia());
            hashMap.put("F40", productionDaily.getYearInboundAuxiliaryWaterReducingAgent());
            hashMap.put("F41", productionDaily.getYearInboundAuxiliaryWaterScaleInhibitor());
            hashMap.put("F42", productionDaily.getYearInboundAuxiliaryNaclo());
            hashMap.put("F43", productionDaily.getYearInboundAuxiliaryDeodorant());
            hashMap.put("F44", productionDaily.getYearInboundAuxiliarySalt());
            hashMap.put("F45", productionDaily.getYearInboundAuxiliarySlagBag());
            hashMap.put("F46", productionDaily.getYearInboundAuxiliaryFlyAshBag());
            hashMap.put("F47", productionDaily.getYearInboundAuxiliaryMedicalWastesBag());
            hashMap.put("F48", productionDaily.getYearInboundAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("F49", productionDaily.getYearInboundAuxiliaryCollectionBox());
            hashMap.put("F50", productionDaily.getYearInboundAuxiliaryStandardBox());
            hashMap.put("F51", productionDaily.getYearInboundAuxiliaryWoodenPallets());
            hashMap.put("F52", productionDaily.getYearInboundAuxiliaryStandardTray_1m());
            hashMap.put("F53", productionDaily.getYearInboundAuxiliaryStandardTray_1_2m());
            hashMap.put("F54", productionDaily.getYearInboundAuxiliaryTonBox());
            hashMap.put("F55", productionDaily.getYearInboundAuxiliarySteam());
            hashMap.put("F56", productionDaily.getYearInboundAuxiliaryDieselOil());
            hashMap.put("F57", productionDaily.getYearInboundAuxiliaryNaturalGas());
            hashMap.put("F58", productionDaily.getYearInboundAuxiliaryElectricQuantity());
            hashMap.put("F59", productionDaily.getYearInboundAuxiliaryIndustrialWater());
            hashMap.put("F60", productionDaily.getYearInboundAuxiliaryTapWaterQuantity());

            hashMap.put("H25", productionDaily.getTodayOutboundAuxiliaryCalcareousLime());
            hashMap.put("H26", productionDaily.getTodayOutboundAuxiliaryCommonActivatedCarbon());
            hashMap.put("H27", productionDaily.getTodayOutboundAuxiliaryActivatedCarbon());
            hashMap.put("H28", productionDaily.getTodayOutboundAuxiliaryActivatedCarbonParticles());
            hashMap.put("H29", productionDaily.getTodayOutboundAuxiliaryLye());
            hashMap.put("H30", productionDaily.getTodayOutboundAuxiliaryCausticSoda());
            hashMap.put("H31", productionDaily.getTodayOutboundAuxiliaryUrea());
            hashMap.put("H32", productionDaily.getTodayOutboundAuxiliaryHydrochloricAcid());
            hashMap.put("H33", productionDaily.getTodayOutboundAuxiliaryNahco3());
            hashMap.put("H34", productionDaily.getTodayOutboundAuxiliaryFlour());
            hashMap.put("H35", productionDaily.getTodayOutboundAuxiliaryDefoamer());
            hashMap.put("H36", productionDaily.getTodayOutboundAuxiliaryFlocculant());
            hashMap.put("H37", productionDaily.getTodayOutboundAuxiliarySoftWaterReducingAgent());
            hashMap.put("H38", productionDaily.getTodayOutboundAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("H39", productionDaily.getTodayOutboundAuxiliaryAmmonia());
            hashMap.put("H40", productionDaily.getTodayOutboundAuxiliaryWaterReducingAgent());
            hashMap.put("H41", productionDaily.getTodayOutboundAuxiliaryWaterScaleInhibitor());
            hashMap.put("H42", productionDaily.getTodayOutboundAuxiliaryNaclo());
            hashMap.put("H43", productionDaily.getTodayOutboundAuxiliaryDeodorant());
            hashMap.put("H44", productionDaily.getTodayOutboundAuxiliarySalt());
            hashMap.put("H45", productionDaily.getTodayOutboundAuxiliarySlagBag());
            hashMap.put("H46", productionDaily.getTodayOutboundAuxiliaryFlyAshBag());
            hashMap.put("H47", productionDaily.getTodayOutboundAuxiliaryMedicalWastesBag());
            hashMap.put("H48", productionDaily.getTodayOutboundAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("H49", productionDaily.getTodayOutboundAuxiliaryCollectionBox());
            hashMap.put("H50", productionDaily.getTodayOutboundAuxiliaryStandardBox());
            hashMap.put("H51", productionDaily.getTodayOutboundAuxiliaryWoodenPallets());
            hashMap.put("H52", productionDaily.getTodayOutboundAuxiliaryStandardTray_1m());
            hashMap.put("H53", productionDaily.getTodayOutboundAuxiliaryStandardTray_1_2m());
            hashMap.put("H54", productionDaily.getTodayOutboundAuxiliaryTonBox());
            hashMap.put("H55", productionDaily.getTodayOutboundAuxiliarySteam());
            hashMap.put("H56", productionDaily.getTodayOutboundAuxiliaryDieselOil());
            hashMap.put("H57", productionDaily.getTodayOutboundAuxiliaryNaturalGas());
            hashMap.put("H58", productionDaily.getTodayOutboundAuxiliaryElectricQuantity());
            hashMap.put("H59", productionDaily.getTodayOutboundAuxiliaryIndustrialWater());
            hashMap.put("H60", productionDaily.getTodayOutboundAuxiliaryTapWaterQuantity());

            hashMap.put("I25", productionDaily.getMonthOutboundAuxiliaryCalcareousLime());
            hashMap.put("I26", productionDaily.getMonthOutboundAuxiliaryCommonActivatedCarbon());
            hashMap.put("I27", productionDaily.getMonthOutboundAuxiliaryActivatedCarbon());
            hashMap.put("I28", productionDaily.getMonthOutboundAuxiliaryActivatedCarbonParticles());
            hashMap.put("I29", productionDaily.getMonthOutboundAuxiliaryLye());
            hashMap.put("I30", productionDaily.getMonthOutboundAuxiliaryCausticSoda());
            hashMap.put("I31", productionDaily.getMonthOutboundAuxiliaryUrea());
            hashMap.put("I32", productionDaily.getMonthOutboundAuxiliaryHydrochloricAcid());
            hashMap.put("I33", productionDaily.getMonthOutboundAuxiliaryNahco3());
            hashMap.put("I34", productionDaily.getMonthOutboundAuxiliaryFlour());
            hashMap.put("I35", productionDaily.getMonthOutboundAuxiliaryDefoamer());
            hashMap.put("I36", productionDaily.getMonthOutboundAuxiliaryFlocculant());
            hashMap.put("I37", productionDaily.getMonthOutboundAuxiliarySoftWaterReducingAgent());
            hashMap.put("I38", productionDaily.getMonthOutboundAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("I39", productionDaily.getMonthOutboundAuxiliaryAmmonia());
            hashMap.put("I40", productionDaily.getMonthOutboundAuxiliaryWaterReducingAgent());
            hashMap.put("I41", productionDaily.getMonthOutboundAuxiliaryWaterScaleInhibitor());
            hashMap.put("I42", productionDaily.getMonthOutboundAuxiliaryNaclo());
            hashMap.put("I43", productionDaily.getMonthOutboundAuxiliaryDeodorant());
            hashMap.put("I44", productionDaily.getMonthOutboundAuxiliarySalt());
            hashMap.put("I45", productionDaily.getMonthOutboundAuxiliarySlagBag());
            hashMap.put("I46", productionDaily.getMonthOutboundAuxiliaryFlyAshBag());
            hashMap.put("I47", productionDaily.getMonthOutboundAuxiliaryMedicalWastesBag());
            hashMap.put("I48", productionDaily.getMonthOutboundAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("I49", productionDaily.getMonthOutboundAuxiliaryCollectionBox());
            hashMap.put("I50", productionDaily.getMonthOutboundAuxiliaryStandardBox());
            hashMap.put("I51", productionDaily.getMonthOutboundAuxiliaryWoodenPallets());
            hashMap.put("I52", productionDaily.getMonthOutboundAuxiliaryStandardTray_1m());
            hashMap.put("I53", productionDaily.getMonthOutboundAuxiliaryStandardTray_1_2m());
            hashMap.put("I54", productionDaily.getMonthOutboundAuxiliaryTonBox());
            hashMap.put("I55", productionDaily.getMonthOutboundAuxiliarySteam());
            hashMap.put("I56", productionDaily.getMonthOutboundAuxiliaryDieselOil());
            hashMap.put("I57", productionDaily.getMonthOutboundAuxiliaryNaturalGas());
            hashMap.put("I58", productionDaily.getMonthOutboundAuxiliaryElectricQuantity());
            hashMap.put("I59", productionDaily.getMonthOutboundAuxiliaryIndustrialWater());
            hashMap.put("I60", productionDaily.getMonthOutboundAuxiliaryTapWaterQuantity());

            hashMap.put("K25", productionDaily.getYearOutboundAuxiliaryCalcareousLime());
            hashMap.put("K26", productionDaily.getYearOutboundAuxiliaryCommonActivatedCarbon());
            hashMap.put("K27", productionDaily.getYearOutboundAuxiliaryActivatedCarbon());
            hashMap.put("K28", productionDaily.getYearOutboundAuxiliaryActivatedCarbonParticles());
            hashMap.put("K29", productionDaily.getYearOutboundAuxiliaryLye());
            hashMap.put("K30", productionDaily.getYearOutboundAuxiliaryCausticSoda());
            hashMap.put("K31", productionDaily.getYearOutboundAuxiliaryUrea());
            hashMap.put("K32", productionDaily.getYearOutboundAuxiliaryHydrochloricAcid());
            hashMap.put("K33", productionDaily.getYearOutboundAuxiliaryNahco3());
            hashMap.put("K34", productionDaily.getYearOutboundAuxiliaryFlour());
            hashMap.put("K35", productionDaily.getYearOutboundAuxiliaryDefoamer());
            hashMap.put("K36", productionDaily.getYearOutboundAuxiliaryFlocculant());
            hashMap.put("K37", productionDaily.getYearOutboundAuxiliarySoftWaterReducingAgent());
            hashMap.put("K38", productionDaily.getYearOutboundAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("K39", productionDaily.getYearOutboundAuxiliaryAmmonia());
            hashMap.put("K40", productionDaily.getYearOutboundAuxiliaryWaterReducingAgent());
            hashMap.put("K41", productionDaily.getYearOutboundAuxiliaryWaterScaleInhibitor());
            hashMap.put("K42", productionDaily.getYearOutboundAuxiliaryNaclo());
            hashMap.put("K43", productionDaily.getYearOutboundAuxiliaryDeodorant());
            hashMap.put("K44", productionDaily.getYearOutboundAuxiliarySalt());
            hashMap.put("K45", productionDaily.getYearOutboundAuxiliarySlagBag());
            hashMap.put("K46", productionDaily.getYearOutboundAuxiliaryFlyAshBag());
            hashMap.put("K47", productionDaily.getYearOutboundAuxiliaryMedicalWastesBag());
            hashMap.put("K48", productionDaily.getYearOutboundAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("K49", productionDaily.getYearOutboundAuxiliaryCollectionBox());
            hashMap.put("K50", productionDaily.getYearOutboundAuxiliaryStandardBox());
            hashMap.put("K51", productionDaily.getYearOutboundAuxiliaryWoodenPallets());
            hashMap.put("K52", productionDaily.getYearOutboundAuxiliaryStandardTray_1m());
            hashMap.put("K53", productionDaily.getYearOutboundAuxiliaryStandardTray_1_2m());
            hashMap.put("K54", productionDaily.getYearOutboundAuxiliaryTonBox());
            hashMap.put("K55", productionDaily.getYearOutboundAuxiliarySteam());
            hashMap.put("K56", productionDaily.getYearOutboundAuxiliaryDieselOil());
            hashMap.put("K57", productionDaily.getYearOutboundAuxiliaryNaturalGas());
            hashMap.put("K58", productionDaily.getYearOutboundAuxiliaryElectricQuantity());
            hashMap.put("K59", productionDaily.getYearOutboundAuxiliaryIndustrialWater());
            hashMap.put("K60", productionDaily.getYearOutboundAuxiliaryTapWaterQuantity());

            hashMap.put("M25", productionDaily.getMonthBalanceAuxiliaryCalcareousLime());
            hashMap.put("M26", productionDaily.getMonthBalanceAuxiliaryCommonActivatedCarbon());
            hashMap.put("M27", productionDaily.getMonthBalanceAuxiliaryActivatedCarbon());
            hashMap.put("M28", productionDaily.getMonthBalanceAuxiliaryActivatedCarbonParticles());
            hashMap.put("M29", productionDaily.getMonthBalanceAuxiliaryLye());
            hashMap.put("M30", productionDaily.getMonthBalanceAuxiliaryCausticSoda());
            hashMap.put("M31", productionDaily.getMonthBalanceAuxiliaryUrea());
            hashMap.put("M32", productionDaily.getMonthBalanceAuxiliaryHydrochloricAcid());
            hashMap.put("M33", productionDaily.getMonthBalanceAuxiliaryNahco3());
            hashMap.put("M34", productionDaily.getMonthBalanceAuxiliaryFlour());
            hashMap.put("M35", productionDaily.getMonthBalanceAuxiliaryDefoamer());
            hashMap.put("M36", productionDaily.getMonthBalanceAuxiliaryFlocculant());
            hashMap.put("M37", productionDaily.getMonthBalanceAuxiliarySoftWaterReducingAgent());
            hashMap.put("M38", productionDaily.getMonthBalanceAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("M39", productionDaily.getMonthBalanceAuxiliaryAmmonia());
            hashMap.put("M40", productionDaily.getMonthBalanceAuxiliaryWaterReducingAgent());
            hashMap.put("M41", productionDaily.getMonthBalanceAuxiliaryWaterScaleInhibitor());
            hashMap.put("M42", productionDaily.getMonthBalanceAuxiliaryNaclo());
            hashMap.put("M43", productionDaily.getMonthBalanceAuxiliaryDeodorant());
            hashMap.put("M44", productionDaily.getMonthBalanceAuxiliarySalt());
            hashMap.put("M45", productionDaily.getMonthBalanceAuxiliarySlagBag());
            hashMap.put("M46", productionDaily.getMonthBalanceAuxiliaryFlyAshBag());
            hashMap.put("M47", productionDaily.getMonthBalanceAuxiliaryMedicalWastesBag());
            hashMap.put("M48", productionDaily.getMonthBalanceAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("M49", productionDaily.getMonthBalanceAuxiliaryCollectionBox());
            hashMap.put("M50", productionDaily.getMonthBalanceAuxiliaryStandardBox());
            hashMap.put("M51", productionDaily.getMonthBalanceAuxiliaryWoodenPallets());
            hashMap.put("M52", productionDaily.getMonthBalanceAuxiliaryStandardTray_1m());
            hashMap.put("M53", productionDaily.getMonthBalanceAuxiliaryStandardTray_1_2m());
            hashMap.put("M54", productionDaily.getMonthBalanceAuxiliaryTonBox());
            hashMap.put("M55", productionDaily.getMonthBalanceAuxiliarySteam());
            hashMap.put("M56", productionDaily.getMonthBalanceAuxiliaryDieselOil());
            hashMap.put("M57", productionDaily.getMonthBalanceAuxiliaryNaturalGas());
            hashMap.put("M58", productionDaily.getMonthBalanceAuxiliaryElectricQuantity());
            hashMap.put("M59", productionDaily.getMonthBalanceAuxiliaryIndustrialWater());
            hashMap.put("M60", productionDaily.getMonthBalanceAuxiliaryTapWaterQuantity());

            hashMap.put("N25", productionDaily.getTodayInventoryAuxiliaryCalcareousLime());
            hashMap.put("N26", productionDaily.getTodayInventoryAuxiliaryCommonActivatedCarbon());
            hashMap.put("N27", productionDaily.getTodayInventoryAuxiliaryActivatedCarbon());
            hashMap.put("N28", productionDaily.getTodayInventoryAuxiliaryActivatedCarbonParticles());
            hashMap.put("N29", productionDaily.getTodayInventoryAuxiliaryLye());
            hashMap.put("N30", productionDaily.getTodayInventoryAuxiliaryCausticSoda());
            hashMap.put("N31", productionDaily.getTodayInventoryAuxiliaryUrea());
            hashMap.put("N32", productionDaily.getTodayInventoryAuxiliaryHydrochloricAcid());
            hashMap.put("N33", productionDaily.getTodayInventoryAuxiliaryNahco3());
            hashMap.put("N34", productionDaily.getTodayInventoryAuxiliaryFlour());
            hashMap.put("N35", productionDaily.getTodayInventoryAuxiliaryDefoamer());
            hashMap.put("N36", productionDaily.getTodayInventoryAuxiliaryFlocculant());
            hashMap.put("N37", productionDaily.getTodayInventoryAuxiliarySoftWaterReducingAgent());
            hashMap.put("N38", productionDaily.getTodayInventoryAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("N39", productionDaily.getTodayInventoryAuxiliaryAmmonia());
            hashMap.put("N40", productionDaily.getTodayInventoryAuxiliaryWaterReducingAgent());
            hashMap.put("N41", productionDaily.getTodayInventoryAuxiliaryWaterScaleInhibitor());
            hashMap.put("N42", productionDaily.getTodayInventoryAuxiliaryNaclo());
            hashMap.put("N43", productionDaily.getTodayInventoryAuxiliaryDeodorant());
            hashMap.put("N44", productionDaily.getTodayInventoryAuxiliarySalt());
            hashMap.put("N45", productionDaily.getTodayInventoryAuxiliarySlagBag());
            hashMap.put("N46", productionDaily.getTodayInventoryAuxiliaryFlyAshBag());
            hashMap.put("N47", productionDaily.getTodayInventoryAuxiliaryMedicalWastesBag());
            hashMap.put("N48", productionDaily.getTodayInventoryAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("N49", productionDaily.getTodayInventoryAuxiliaryCollectionBox());
            hashMap.put("N50", productionDaily.getTodayInventoryAuxiliaryStandardBox());
            hashMap.put("N51", productionDaily.getTodayInventoryAuxiliaryWoodenPallets());
            hashMap.put("N52", productionDaily.getTodayInventoryAuxiliaryStandardTray_1m());
            hashMap.put("N53", productionDaily.getTodayInventoryAuxiliaryStandardTray_1_2m());
            hashMap.put("N54", productionDaily.getTodayInventoryAuxiliaryTonBox());
            hashMap.put("N55", productionDaily.getTodayInventoryAuxiliarySteam());
            hashMap.put("N56", productionDaily.getTodayInventoryAuxiliaryDieselOil());
            hashMap.put("N57", productionDaily.getTodayInventoryAuxiliaryNaturalGas());
            hashMap.put("N58", productionDaily.getTodayInventoryAuxiliaryElectricQuantity());
            hashMap.put("N59", productionDaily.getTodayInventoryAuxiliaryIndustrialWater());
            hashMap.put("N60", productionDaily.getTodayInventoryAuxiliaryTapWaterQuantity());
            // 医废蒸煮系统
            hashMap.put("C63", productionDaily.getTodayDisposalMedicalWastes());
            hashMap.put("E63", productionDaily.getTodayDisposalMedicalWastesDisposalDirect());
            hashMap.put("F63", productionDaily.getTodayDisposalMedicalWastesCooking());
            hashMap.put("H63", productionDaily.getTodayDisposalMedicalWastesAfterCooking());
            hashMap.put("I63", productionDaily.getTodayDisposalMedicalWastesAfterCookingInbound());
            hashMap.put("K63", productionDaily.getTodayDisposalMedicalWastesAfterCookingSend());
            hashMap.put("M63", productionDaily.getTodayDisposalMedicalWastesErrorNumber());
            hashMap.put("N63", productionDaily.getTodayDisposalMedicalWastesWetNumber());
            // 处置系统
            hashMap.put("D65", productionDaily.getTodayOutboundA2WastesBulk());
            hashMap.put("D66", productionDaily.getTodayOutboundA2WastesCrushing());
            hashMap.put("D67", productionDaily.getTodayOutboundA2WastesSludge());
            hashMap.put("D68", productionDaily.getTodayOutboundA2WastesDistillation());
            hashMap.put("D69", productionDaily.getTodayOutboundA2WastesSuspension());
            hashMap.put("D70", productionDaily.getTodayOutboundA2WastesWasteLiquid());
            hashMap.put("D71", productionDaily.getTodayOutboundA2MedicalWastes());
            hashMap.put("D72", productionDaily.getTodayOutboundPrepare2WastesBulk());
            hashMap.put("D73", productionDaily.getTodayOutboundPrepare2WastesCrushing());
            hashMap.put("D74", productionDaily.getTodayOutboundPrepare2WastesSludge());
            hashMap.put("D75", productionDaily.getTodayOutboundPrepare2WastesDistillation());
            hashMap.put("D76", productionDaily.getTodayOutboundPrepare2WastesSuspension());
            hashMap.put("D77", productionDaily.getTodayOutboundPrepare2WastesWasteLiquid());
            hashMap.put("D78", productionDaily.getTodayOutboundPrepare2MedicalWastes());
            hashMap.put("D79", productionDaily.getTodayOutboundSecondPretreatmentWastes());
            hashMap.put("J65", productionDaily.getTodayOutboundB2WastesBulk());
            hashMap.put("J66", productionDaily.getTodayOutboundB2WastesCrushing());
            hashMap.put("J67", productionDaily.getTodayOutboundB2WastesSludge());
            hashMap.put("J68", productionDaily.getTodayOutboundB2WastesDistillation());
            hashMap.put("J69", productionDaily.getTodayOutboundB2WastesSuspension());
            hashMap.put("J70", productionDaily.getTodayOutboundB2WastesWasteLiquid());
            hashMap.put("J71", productionDaily.getTodayOutboundB2MedicalWastes());
            hashMap.put("J73", productionDaily.getTodayOutboundThirdPretreatmentSystemWastesBulk());
            hashMap.put("J74", productionDaily.getTodayOutboundThirdPretreatmentSystemWastesCrushing());
            hashMap.put("J75", productionDaily.getTodayOutboundThirdPretreatmentSystemWastesSludge());
            hashMap.put("J76", productionDaily.getTodayOutboundThirdPretreatmentSystemWastesDistillation());
            hashMap.put("J77", productionDaily.getTodayOutboundThirdPretreatmentSystemWastesSuspension());
            hashMap.put("J78", productionDaily.getTodayOutboundThirdPretreatmentSystemWastesWasteLiquid());
            hashMap.put("J79", productionDaily.getTodayOutboundThirdPretreatmentSystemMedicalWastes());

            hashMap.put("E65", productionDaily.getMonthOutboundA2WastesBulk());
            hashMap.put("E66", productionDaily.getMonthOutboundA2WastesCrushing());
            hashMap.put("E67", productionDaily.getMonthOutboundA2WastesSludge());
            hashMap.put("E68", productionDaily.getMonthOutboundA2WastesDistillation());
            hashMap.put("E69", productionDaily.getMonthOutboundA2WastesSuspension());
            hashMap.put("E70", productionDaily.getMonthOutboundA2WastesWasteLiquid());
            hashMap.put("E71", productionDaily.getMonthOutboundA2MedicalWastes());
            hashMap.put("E72", productionDaily.getMonthOutboundPrepare2WastesBulk());
            hashMap.put("E73", productionDaily.getMonthOutboundPrepare2WastesCrushing());
            hashMap.put("E74", productionDaily.getMonthOutboundPrepare2WastesSludge());
            hashMap.put("E75", productionDaily.getMonthOutboundPrepare2WastesDistillation());
            hashMap.put("E76", productionDaily.getMonthOutboundPrepare2WastesSuspension());
            hashMap.put("E77", productionDaily.getMonthOutboundPrepare2WastesWasteLiquid());
            hashMap.put("E78", productionDaily.getMonthOutboundPrepare2MedicalWastes());
            hashMap.put("E79", productionDaily.getMonthOutboundSecondPretreatmentWastes());
            hashMap.put("K65", productionDaily.getMonthOutboundB2WastesBulk());
            hashMap.put("K66", productionDaily.getMonthOutboundB2WastesCrushing());
            hashMap.put("K67", productionDaily.getMonthOutboundB2WastesSludge());
            hashMap.put("K68", productionDaily.getMonthOutboundB2WastesDistillation());
            hashMap.put("K69", productionDaily.getMonthOutboundB2WastesSuspension());
            hashMap.put("K70", productionDaily.getMonthOutboundB2WastesWasteLiquid());
            hashMap.put("K71", productionDaily.getMonthOutboundB2MedicalWastes());
            hashMap.put("K73", productionDaily.getMonthOutboundThirdPretreatmentSystemWastesBulk());
            hashMap.put("K74", productionDaily.getMonthOutboundThirdPretreatmentSystemWastesCrushing());
            hashMap.put("K75", productionDaily.getMonthOutboundThirdPretreatmentSystemWastesSludge());
            hashMap.put("K76", productionDaily.getMonthOutboundThirdPretreatmentSystemWastesDistillation());
            hashMap.put("K77", productionDaily.getMonthOutboundThirdPretreatmentSystemWastesSuspension());
            hashMap.put("K78", productionDaily.getMonthOutboundThirdPretreatmentSystemWastesWasteLiquid());
            hashMap.put("K79", productionDaily.getMonthOutboundThirdPretreatmentSystemMedicalWastes());

            hashMap.put("F65", productionDaily.getYearOutboundA2WastesBulk());
            hashMap.put("F66", productionDaily.getYearOutboundA2WastesCrushing());
            hashMap.put("F67", productionDaily.getYearOutboundA2WastesSludge());
            hashMap.put("F68", productionDaily.getYearOutboundA2WastesDistillation());
            hashMap.put("F69", productionDaily.getYearOutboundA2WastesSuspension());
            hashMap.put("F70", productionDaily.getYearOutboundA2WastesWasteLiquid());
            hashMap.put("F71", productionDaily.getYearOutboundA2MedicalWastes());
            hashMap.put("F72", productionDaily.getYearOutboundPrepare2WastesBulk());
            hashMap.put("F73", productionDaily.getYearOutboundPrepare2WastesCrushing());
            hashMap.put("F74", productionDaily.getYearOutboundPrepare2WastesSludge());
            hashMap.put("F75", productionDaily.getYearOutboundPrepare2WastesDistillation());
            hashMap.put("F76", productionDaily.getYearOutboundPrepare2WastesSuspension());
            hashMap.put("F77", productionDaily.getYearOutboundPrepare2WastesWasteLiquid());
            hashMap.put("F78", productionDaily.getYearOutboundPrepare2MedicalWastes());
            hashMap.put("F79", productionDaily.getYearOutboundSecondPretreatmentWastes());
            hashMap.put("L65", productionDaily.getYearOutboundB2WastesBulk());
            hashMap.put("L66", productionDaily.getYearOutboundB2WastesCrushing());
            hashMap.put("L67", productionDaily.getYearOutboundB2WastesSludge());
            hashMap.put("L68", productionDaily.getYearOutboundB2WastesDistillation());
            hashMap.put("L69", productionDaily.getYearOutboundB2WastesSuspension());
            hashMap.put("L70", productionDaily.getYearOutboundB2WastesWasteLiquid());
            hashMap.put("L71", productionDaily.getYearOutboundB2MedicalWastes());
            hashMap.put("L73", productionDaily.getYearOutboundThirdPretreatmentSystemWastesBulk());
            hashMap.put("L74", productionDaily.getYearOutboundThirdPretreatmentSystemWastesCrushing());
            hashMap.put("L75", productionDaily.getYearOutboundThirdPretreatmentSystemWastesSludge());
            hashMap.put("L76", productionDaily.getYearOutboundThirdPretreatmentSystemWastesDistillation());
            hashMap.put("L77", productionDaily.getYearOutboundThirdPretreatmentSystemWastesSuspension());
            hashMap.put("L78", productionDaily.getYearOutboundThirdPretreatmentSystemWastesWasteLiquid());
            hashMap.put("L79", productionDaily.getYearOutboundThirdPretreatmentSystemMedicalWastes());
            // B2配料比例
            hashMap.put("M65", productionDaily.getTodayOutboundB2RateWastesBulk());
            hashMap.put("M66", productionDaily.getTodayOutboundB2RateWastesCrushing());
            hashMap.put("M67", productionDaily.getTodayOutboundB2RateWastesSludge());
            hashMap.put("M68", productionDaily.getTodayOutboundB2RateWastesDistillation());
            hashMap.put("M69", productionDaily.getTodayOutboundB2RateWastesSuspension());
            hashMap.put("M70", productionDaily.getTodayOutboundB2RateWastesWasteLiquid());
            hashMap.put("M71", productionDaily.getTodayOutboundB2RateMedicalWastes());

            hashMap.put("M73", productionDaily.getTodayOutboundThirdPretreatmentSystemRateWastesBulk());
            hashMap.put("M74", productionDaily.getTodayOutboundThirdPretreatmentSystemRateWastesCrushing());
            hashMap.put("M75", productionDaily.getTodayOutboundThirdPretreatmentSystemRateWastesSludge());
            hashMap.put("M76", productionDaily.getTodayOutboundThirdPretreatmentSystemRateWastesDistillation());
            hashMap.put("M77", productionDaily.getTodayOutboundThirdPretreatmentSystemRateWastesSuspension());
            hashMap.put("M78", productionDaily.getTodayOutboundThirdPretreatmentSystemRateWastesWasteLiquid());
            hashMap.put("M79", productionDaily.getTodayOutboundThirdPretreatmentSystemRateMedicalWastes());
            hashMap.put("N73", productionDaily.getMonthOutboundThirdPretreatmentSystemRateWastesBulk());
            hashMap.put("N74", productionDaily.getMonthOutboundThirdPretreatmentSystemRateWastesCrushing());
            hashMap.put("N75", productionDaily.getMonthOutboundThirdPretreatmentSystemRateWastesSludge());
            hashMap.put("N76", productionDaily.getMonthOutboundThirdPretreatmentSystemRateWastesDistillation());
            hashMap.put("N77", productionDaily.getMonthOutboundThirdPretreatmentSystemRateWastesSuspension());
            hashMap.put("N78", productionDaily.getMonthOutboundThirdPretreatmentSystemRateWastesWasteLiquid());
            hashMap.put("N79", productionDaily.getMonthOutboundThirdPretreatmentSystemRateMedicalWastes());
            hashMap.put("O73", productionDaily.getYearOutboundThirdPretreatmentSystemRateWastesBulk());
            hashMap.put("O74", productionDaily.getYearOutboundThirdPretreatmentSystemRateWastesCrushing());
            hashMap.put("O75", productionDaily.getYearOutboundThirdPretreatmentSystemRateWastesSludge());
            hashMap.put("O76", productionDaily.getYearOutboundThirdPretreatmentSystemRateWastesDistillation());
            hashMap.put("O77", productionDaily.getYearOutboundThirdPretreatmentSystemRateWastesSuspension());
            hashMap.put("O78", productionDaily.getYearOutboundThirdPretreatmentSystemRateWastesWasteLiquid());
            hashMap.put("O79", productionDaily.getYearOutboundThirdPretreatmentSystemRateMedicalWastes());
            // 辅料能源消耗
            hashMap.put("S05", productionDaily.getTodayDisposalMedicalAuxiliaryNaclo());
            hashMap.put("S06", productionDaily.getTodayDisposalMedicalAuxiliaryDeodorant());
            hashMap.put("S07", productionDaily.getTodayDisposalMedicalAuxiliaryMedicalWastesBag());
            hashMap.put("S08", productionDaily.getTodayDisposalMedicalAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("S09", productionDaily.getTodayDisposalMedicalAuxiliaryCollectionBox());
            hashMap.put("S10", productionDaily.getTodayDisposalMedicalAuxiliarySteam());
            hashMap.put("S11", productionDaily.getTodayDisposalMedicalAuxiliaryIndustrialWater());
            hashMap.put("S12", productionDaily.getTodayDisposalSecondaryAuxiliaryCalcareousLime());
            hashMap.put("S13", productionDaily.getTodayDisposalSecondaryAuxiliaryCommonActivatedCarbon());
            hashMap.put("S14", productionDaily.getTodayDisposalSecondaryAuxiliaryActivatedCarbon());
            hashMap.put("S15", productionDaily.getTodayDisposalSecondaryAuxiliaryActivatedCarbonParticles());
            hashMap.put("S16", productionDaily.getTodayDisposalSecondaryAuxiliaryLye());
            hashMap.put("S17", productionDaily.getTodayDisposalSecondaryAuxiliarySalt());
            hashMap.put("S18", productionDaily.getTodayDisposalSecondaryAuxiliarySlagBag());
            hashMap.put("S19", productionDaily.getTodayDisposalSecondaryAuxiliaryFlyAshBag());
            hashMap.put("S20", productionDaily.getTodayDisposalSecondaryAuxiliaryDieselOil());
            hashMap.put("S21", productionDaily.getTodayDisposalSecondaryAuxiliaryIndustrialWater());
            hashMap.put("S22", productionDaily.getTodayDisposalSecondaryAuxiliaryElectricQuantity());
            hashMap.put("S23", productionDaily.getTodayDisposalSecondaryAuxiliaryWoodenPallets());
            hashMap.put("S24", productionDaily.getTodayDisposalThirdAuxiliaryCalcareousLime());
            hashMap.put("S25", productionDaily.getTodayDisposalThirdAuxiliaryCommonActivatedCarbon());
            hashMap.put("S26", productionDaily.getTodayDisposalThirdAuxiliaryActivatedCarbon());
            hashMap.put("S27", productionDaily.getTodayDisposalThirdAuxiliaryActivatedCarbonParticles());
            hashMap.put("S28", productionDaily.getTodayDisposalThirdAuxiliaryLye());
            hashMap.put("S29", productionDaily.getTodayDisposalThirdAuxiliaryCausticSoda());
            hashMap.put("S30", productionDaily.getTodayDisposalThirdAuxiliaryUrea());
            hashMap.put("S31", productionDaily.getTodayDisposalThirdAuxiliaryHydrochloricAcid());
            hashMap.put("S32", productionDaily.getTodayDisposalThirdAuxiliaryNahco3());
            hashMap.put("S33", productionDaily.getTodayDisposalThirdAuxiliaryFlour());
            hashMap.put("S34", productionDaily.getTodayDisposalThirdAuxiliaryDefoamer());
            hashMap.put("S35", productionDaily.getTodayDisposalThirdAuxiliaryFlocculant());
            hashMap.put("S36", productionDaily.getTodayDisposalThirdAuxiliarySoftWaterReducingAgent());
            hashMap.put("S37", productionDaily.getTodayDisposalThirdAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("S38", productionDaily.getTodayDisposalThirdAuxiliaryAmmonia());
            hashMap.put("S39", productionDaily.getTodayDisposalThirdAuxiliaryWaterReducingAgent());
            hashMap.put("S40", productionDaily.getTodayDisposalThirdAuxiliaryWaterScaleInhibitor());
            hashMap.put("S41", productionDaily.getTodayDisposalThirdAuxiliaryNaclo());
            hashMap.put("S42", productionDaily.getTodayDisposalThirdAuxiliaryStandardBox());
            hashMap.put("S43", productionDaily.getTodayDisposalThirdAuxiliaryWoodenPallets());
            hashMap.put("S44", productionDaily.getTodayDisposalThirdAuxiliaryStandardTray_1m());
            hashMap.put("S45", productionDaily.getTodayDisposalThirdAuxiliaryStandardTray_1_2m());
            hashMap.put("S46", productionDaily.getTodayDisposalThirdAuxiliarySlagBag());
            hashMap.put("S47", productionDaily.getTodayDisposalThirdAuxiliaryFlyAshBag());
            hashMap.put("S48", productionDaily.getTodayDisposalThirdAuxiliaryTonBox());
            hashMap.put("S49", productionDaily.getTodayDisposalThirdAuxiliarySteam());
            hashMap.put("S50", productionDaily.getTodayDisposalThirdAuxiliaryDieselOil());
            hashMap.put("S51", productionDaily.getTodayDisposalThirdAuxiliaryNaturalGas());
            hashMap.put("S52", productionDaily.getTodayDisposalThirdAuxiliaryIndustrialWater());
            hashMap.put("S53", productionDaily.getTodayDisposalThirdAuxiliaryElectricQuantity());
            hashMap.put("S54", productionDaily.getTodayDisposalThirdAuxiliaryTapWaterQuantity());
            hashMap.put("S55", productionDaily.getTodayDisposalTowerElectricQuantity());

            hashMap.put("T05", productionDaily.getMonthDisposalMedicalAuxiliaryNaclo());
            hashMap.put("T06", productionDaily.getMonthDisposalMedicalAuxiliaryDeodorant());
            hashMap.put("T07", productionDaily.getMonthDisposalMedicalAuxiliaryMedicalWastesBag());
            hashMap.put("T08", productionDaily.getMonthDisposalMedicalAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("T09", productionDaily.getMonthDisposalMedicalAuxiliaryCollectionBox());
            hashMap.put("T10", productionDaily.getMonthDisposalMedicalAuxiliarySteam());
            hashMap.put("T11", productionDaily.getMonthDisposalMedicalAuxiliaryIndustrialWater());
            hashMap.put("T12", productionDaily.getMonthDisposalSecondaryAuxiliaryCalcareousLime());
            hashMap.put("T13", productionDaily.getMonthDisposalSecondaryAuxiliaryCommonActivatedCarbon());
            hashMap.put("T14", productionDaily.getMonthDisposalSecondaryAuxiliaryActivatedCarbon());
            hashMap.put("T15", productionDaily.getMonthDisposalSecondaryAuxiliaryActivatedCarbonParticles());
            hashMap.put("T16", productionDaily.getMonthDisposalSecondaryAuxiliaryLye());
            hashMap.put("T17", productionDaily.getMonthDisposalSecondaryAuxiliarySalt());
            hashMap.put("T18", productionDaily.getMonthDisposalSecondaryAuxiliarySlagBag());
            hashMap.put("T19", productionDaily.getMonthDisposalSecondaryAuxiliaryFlyAshBag());
            hashMap.put("T20", productionDaily.getMonthDisposalSecondaryAuxiliaryDieselOil());
            hashMap.put("T21", productionDaily.getMonthDisposalSecondaryAuxiliaryIndustrialWater());
            hashMap.put("T22", productionDaily.getMonthDisposalSecondaryAuxiliaryElectricQuantity());
            hashMap.put("T23", productionDaily.getMonthDisposalSecondaryAuxiliaryWoodenPallets());
            hashMap.put("T24", productionDaily.getMonthDisposalThirdAuxiliaryCalcareousLime());
            hashMap.put("T25", productionDaily.getMonthDisposalThirdAuxiliaryCommonActivatedCarbon());
            hashMap.put("T26", productionDaily.getMonthDisposalThirdAuxiliaryActivatedCarbon());
            hashMap.put("T27", productionDaily.getMonthDisposalThirdAuxiliaryActivatedCarbonParticles());
            hashMap.put("T28", productionDaily.getMonthDisposalThirdAuxiliaryLye());
            hashMap.put("T29", productionDaily.getMonthDisposalThirdAuxiliaryCausticSoda());
            hashMap.put("T30", productionDaily.getMonthDisposalThirdAuxiliaryUrea());
            hashMap.put("T31", productionDaily.getMonthDisposalThirdAuxiliaryHydrochloricAcid());
            hashMap.put("T32", productionDaily.getMonthDisposalThirdAuxiliaryNahco3());
            hashMap.put("T33", productionDaily.getMonthDisposalThirdAuxiliaryFlour());
            hashMap.put("T34", productionDaily.getMonthDisposalThirdAuxiliaryDefoamer());
            hashMap.put("T35", productionDaily.getMonthDisposalThirdAuxiliaryFlocculant());
            hashMap.put("T36", productionDaily.getMonthDisposalThirdAuxiliarySoftWaterReducingAgent());
            hashMap.put("T37", productionDaily.getMonthDisposalThirdAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("T38", productionDaily.getMonthDisposalThirdAuxiliaryAmmonia());
            hashMap.put("T39", productionDaily.getMonthDisposalThirdAuxiliaryWaterReducingAgent());
            hashMap.put("T40", productionDaily.getMonthDisposalThirdAuxiliaryWaterScaleInhibitor());
            hashMap.put("T41", productionDaily.getMonthDisposalThirdAuxiliaryNaclo());
            hashMap.put("T42", productionDaily.getMonthDisposalThirdAuxiliaryStandardBox());
            hashMap.put("T43", productionDaily.getMonthDisposalThirdAuxiliaryWoodenPallets());
            hashMap.put("T44", productionDaily.getMonthDisposalThirdAuxiliaryStandardTray_1m());
            hashMap.put("T45", productionDaily.getMonthDisposalThirdAuxiliaryStandardTray_1_2m());
            hashMap.put("T46", productionDaily.getMonthDisposalThirdAuxiliarySlagBag());
            hashMap.put("T47", productionDaily.getMonthDisposalThirdAuxiliaryFlyAshBag());
            hashMap.put("T48", productionDaily.getMonthDisposalThirdAuxiliaryTonBox());
            hashMap.put("T49", productionDaily.getMonthDisposalThirdAuxiliarySteam());
            hashMap.put("T50", productionDaily.getMonthDisposalThirdAuxiliaryDieselOil());
            hashMap.put("T51", productionDaily.getMonthDisposalThirdAuxiliaryNaturalGas());
            hashMap.put("T52", productionDaily.getMonthDisposalThirdAuxiliaryIndustrialWater());
            hashMap.put("T53", productionDaily.getMonthDisposalThirdAuxiliaryElectricQuantity());
            hashMap.put("T54", productionDaily.getMonthDisposalThirdAuxiliaryTapWaterQuantity());
            hashMap.put("T55", productionDaily.getMonthDisposalTowerElectricQuantity());

            hashMap.put("U05", productionDaily.getYearDisposalMedicalAuxiliaryNaclo());
            hashMap.put("U06", productionDaily.getYearDisposalMedicalAuxiliaryDeodorant());
            hashMap.put("U07", productionDaily.getYearDisposalMedicalAuxiliaryMedicalWastesBag());
            hashMap.put("U08", productionDaily.getYearDisposalMedicalAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("U09", productionDaily.getYearDisposalMedicalAuxiliaryCollectionBox());
            hashMap.put("U10", productionDaily.getYearDisposalMedicalAuxiliarySteam());
            hashMap.put("U11", productionDaily.getYearDisposalMedicalAuxiliaryIndustrialWater());
            hashMap.put("U12", productionDaily.getYearDisposalSecondaryAuxiliaryCalcareousLime());
            hashMap.put("U13", productionDaily.getYearDisposalSecondaryAuxiliaryCommonActivatedCarbon());
            hashMap.put("U14", productionDaily.getYearDisposalSecondaryAuxiliaryActivatedCarbon());
            hashMap.put("U15", productionDaily.getYearDisposalSecondaryAuxiliaryActivatedCarbonParticles());
            hashMap.put("U16", productionDaily.getYearDisposalSecondaryAuxiliaryLye());
            hashMap.put("U17", productionDaily.getYearDisposalSecondaryAuxiliarySalt());
            hashMap.put("U18", productionDaily.getYearDisposalSecondaryAuxiliarySlagBag());
            hashMap.put("U19", productionDaily.getYearDisposalSecondaryAuxiliaryFlyAshBag());
            hashMap.put("U20", productionDaily.getYearDisposalSecondaryAuxiliaryDieselOil());
            hashMap.put("U21", productionDaily.getYearDisposalSecondaryAuxiliaryIndustrialWater());
            hashMap.put("U22", productionDaily.getYearDisposalSecondaryAuxiliaryElectricQuantity());
            hashMap.put("U23", productionDaily.getYearDisposalSecondaryAuxiliaryWoodenPallets());
            hashMap.put("U24", productionDaily.getYearDisposalThirdAuxiliaryCalcareousLime());
            hashMap.put("U25", productionDaily.getYearDisposalThirdAuxiliaryCommonActivatedCarbon());
            hashMap.put("U26", productionDaily.getYearDisposalThirdAuxiliaryActivatedCarbon());
            hashMap.put("U27", productionDaily.getYearDisposalThirdAuxiliaryActivatedCarbonParticles());
            hashMap.put("U28", productionDaily.getYearDisposalThirdAuxiliaryLye());
            hashMap.put("U29", productionDaily.getYearDisposalThirdAuxiliaryCausticSoda());
            hashMap.put("U30", productionDaily.getYearDisposalThirdAuxiliaryUrea());
            hashMap.put("U31", productionDaily.getYearDisposalThirdAuxiliaryHydrochloricAcid());
            hashMap.put("U32", productionDaily.getYearDisposalThirdAuxiliaryNahco3());
            hashMap.put("U33", productionDaily.getYearDisposalThirdAuxiliaryFlour());
            hashMap.put("U34", productionDaily.getYearDisposalThirdAuxiliaryDefoamer());
            hashMap.put("U35", productionDaily.getYearDisposalThirdAuxiliaryFlocculant());
            hashMap.put("U36", productionDaily.getYearDisposalThirdAuxiliarySoftWaterReducingAgent());
            hashMap.put("U37", productionDaily.getYearDisposalThirdAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("U38", productionDaily.getYearDisposalThirdAuxiliaryAmmonia());
            hashMap.put("U39", productionDaily.getYearDisposalThirdAuxiliaryWaterReducingAgent());
            hashMap.put("U40", productionDaily.getYearDisposalThirdAuxiliaryWaterScaleInhibitor());
            hashMap.put("U41", productionDaily.getYearDisposalThirdAuxiliaryNaclo());
            hashMap.put("U42", productionDaily.getYearDisposalThirdAuxiliaryStandardBox());
            hashMap.put("U43", productionDaily.getYearDisposalThirdAuxiliaryWoodenPallets());
            hashMap.put("U44", productionDaily.getYearDisposalThirdAuxiliaryStandardTray_1m());
            hashMap.put("U45", productionDaily.getYearDisposalThirdAuxiliaryStandardTray_1_2m());
            hashMap.put("U46", productionDaily.getYearDisposalThirdAuxiliarySlagBag());
            hashMap.put("U47", productionDaily.getYearDisposalThirdAuxiliaryFlyAshBag());
            hashMap.put("U48", productionDaily.getYearDisposalThirdAuxiliaryTonBox());
            hashMap.put("U49", productionDaily.getYearDisposalThirdAuxiliarySteam());
            hashMap.put("U50", productionDaily.getYearDisposalThirdAuxiliaryDieselOil());
            hashMap.put("U51", productionDaily.getYearDisposalThirdAuxiliaryNaturalGas());
            hashMap.put("U52", productionDaily.getYearDisposalThirdAuxiliaryIndustrialWater());
            hashMap.put("U53", productionDaily.getYearDisposalThirdAuxiliaryElectricQuantity());
            hashMap.put("U54", productionDaily.getYearDisposalThirdAuxiliaryTapWaterQuantity());
            hashMap.put("U55", productionDaily.getYearDisposalTowerElectricQuantity());

            hashMap.put("V05", productionDaily.getTodayAverageDisposalMedicalAuxiliaryNaclo());
            hashMap.put("V06", productionDaily.getTodayAverageDisposalMedicalAuxiliaryDeodorant());
            hashMap.put("V07", productionDaily.getTodayAverageDisposalMedicalAuxiliaryMedicalWastesBag());
            hashMap.put("V08", productionDaily.getTodayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("V09", productionDaily.getTodayAverageDisposalMedicalAuxiliaryCollectionBox());
            hashMap.put("V10", productionDaily.getTodayAverageDisposalMedicalAuxiliarySteam());
            hashMap.put("V11", productionDaily.getTodayAverageDisposalMedicalAuxiliaryIndustrialWater());
            hashMap.put("V12", productionDaily.getTodayAverageDisposalSecondaryAuxiliaryCalcareousLime());
            hashMap.put("V13", productionDaily.getTodayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon());
            hashMap.put("V14", productionDaily.getTodayAverageDisposalSecondaryAuxiliaryActivatedCarbon());
            hashMap.put("V15", productionDaily.getTodayAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles());
            hashMap.put("V16", productionDaily.getTodayAverageDisposalSecondaryAuxiliaryLye());
            hashMap.put("V17", productionDaily.getTodayAverageDisposalSecondaryAuxiliarySalt());
            hashMap.put("V18", productionDaily.getTodayAverageDisposalSecondaryAuxiliarySlagBag());
            hashMap.put("V19", productionDaily.getTodayAverageDisposalSecondaryAuxiliaryFlyAshBag());
            hashMap.put("V20", productionDaily.getTodayAverageDisposalSecondaryAuxiliaryDieselOil());
            hashMap.put("V21", productionDaily.getTodayAverageDisposalSecondaryAuxiliaryIndustrialWater());
            hashMap.put("V22", productionDaily.getTodayAverageDisposalSecondaryAuxiliaryElectricQuantity());
            hashMap.put("V23", productionDaily.getTodayAverageDisposalSecondaryAuxiliaryWoodenPallets());
            hashMap.put("V24", productionDaily.getTodayAverageDisposalThirdAuxiliaryCalcareousLime());
            hashMap.put("V25", productionDaily.getTodayAverageDisposalThirdAuxiliaryCommonActivatedCarbon());
            hashMap.put("V26", productionDaily.getTodayAverageDisposalThirdAuxiliaryActivatedCarbon());
            hashMap.put("V27", productionDaily.getTodayAverageDisposalThirdAuxiliaryActivatedCarbonParticles());
            hashMap.put("V28", productionDaily.getTodayAverageDisposalThirdAuxiliaryLye());
            hashMap.put("V29", productionDaily.getTodayAverageDisposalThirdAuxiliaryCausticSoda());
            hashMap.put("V30", productionDaily.getTodayAverageDisposalThirdAuxiliaryUrea());
            hashMap.put("V31", productionDaily.getTodayAverageDisposalThirdAuxiliaryHydrochloricAcid());
            hashMap.put("V32", productionDaily.getTodayAverageDisposalThirdAuxiliaryNahco3());
            hashMap.put("V33", productionDaily.getTodayAverageDisposalThirdAuxiliaryFlour());
            hashMap.put("V34", productionDaily.getTodayAverageDisposalThirdAuxiliaryDefoamer());
            hashMap.put("V35", productionDaily.getTodayAverageDisposalThirdAuxiliaryFlocculant());
            hashMap.put("V36", productionDaily.getTodayAverageDisposalThirdAuxiliarySoftWaterReducingAgent());
            hashMap.put("V37", productionDaily.getTodayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("V38", productionDaily.getTodayAverageDisposalThirdAuxiliaryAmmonia());
            hashMap.put("V39", productionDaily.getTodayAverageDisposalThirdAuxiliaryWaterReducingAgent());
            hashMap.put("V40", productionDaily.getTodayAverageDisposalThirdAuxiliaryWaterScaleInhibitor());
            hashMap.put("V41", productionDaily.getTodayAverageDisposalThirdAuxiliaryNaclo());
            hashMap.put("V42", productionDaily.getTodayAverageDisposalThirdAuxiliaryStandardBox());
            hashMap.put("V43", productionDaily.getTodayAverageDisposalThirdAuxiliaryWoodenPallets());
            hashMap.put("V44", productionDaily.getTodayAverageDisposalThirdAuxiliaryStandardTray_1m());
            hashMap.put("V45", productionDaily.getTodayAverageDisposalThirdAuxiliaryStandardTray_1_2m());
            hashMap.put("V46", productionDaily.getTodayAverageDisposalThirdAuxiliarySlagBag());
            hashMap.put("V47", productionDaily.getTodayAverageDisposalThirdAuxiliaryFlyAshBag());
            hashMap.put("V48", productionDaily.getTodayAverageDisposalThirdAuxiliaryTonBox());
            hashMap.put("V49", productionDaily.getTodayAverageDisposalThirdAuxiliarySteam());
            hashMap.put("V50", productionDaily.getTodayAverageDisposalThirdAuxiliaryDieselOil());
            hashMap.put("V51", productionDaily.getTodayAverageDisposalThirdAuxiliaryNaturalGas());
            hashMap.put("V52", productionDaily.getTodayAverageDisposalThirdAuxiliaryIndustrialWater());
            hashMap.put("V53", productionDaily.getTodayAverageDisposalThirdAuxiliaryElectricQuantity());
            hashMap.put("V54", productionDaily.getTodayAverageDisposalThirdAuxiliaryTapWaterQuantity());
            hashMap.put("V55", productionDaily.getTodayAverageDisposalTowerElectricQuantity());

            hashMap.put("W05", productionDaily.getMonthAverageDisposalMedicalAuxiliaryNaclo());
            hashMap.put("W06", productionDaily.getMonthAverageDisposalMedicalAuxiliaryDeodorant());
            hashMap.put("W07", productionDaily.getMonthAverageDisposalMedicalAuxiliaryMedicalWastesBag());
            hashMap.put("W08", productionDaily.getMonthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("W09", productionDaily.getMonthAverageDisposalMedicalAuxiliaryCollectionBox());
            hashMap.put("W10", productionDaily.getMonthAverageDisposalMedicalAuxiliarySteam());
            hashMap.put("W11", productionDaily.getMonthAverageDisposalMedicalAuxiliaryIndustrialWater());
            hashMap.put("W12", productionDaily.getMonthAverageDisposalSecondaryAuxiliaryCalcareousLime());
            hashMap.put("W13", productionDaily.getMonthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon());
            hashMap.put("W14", productionDaily.getMonthAverageDisposalSecondaryAuxiliaryActivatedCarbon());
            hashMap.put("W15", productionDaily.getMonthAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles());
            hashMap.put("W16", productionDaily.getMonthAverageDisposalSecondaryAuxiliaryLye());
            hashMap.put("W17", productionDaily.getMonthAverageDisposalSecondaryAuxiliarySalt());
            hashMap.put("W18", productionDaily.getMonthAverageDisposalSecondaryAuxiliarySlagBag());
            hashMap.put("W19", productionDaily.getMonthAverageDisposalSecondaryAuxiliaryFlyAshBag());
            hashMap.put("W20", productionDaily.getMonthAverageDisposalSecondaryAuxiliaryDieselOil());
            hashMap.put("W21", productionDaily.getMonthAverageDisposalSecondaryAuxiliaryIndustrialWater());
            hashMap.put("W22", productionDaily.getMonthAverageDisposalSecondaryAuxiliaryElectricQuantity());
            hashMap.put("W23", productionDaily.getMonthAverageDisposalSecondaryAuxiliaryWoodenPallets());
            hashMap.put("W24", productionDaily.getMonthAverageDisposalThirdAuxiliaryCalcareousLime());
            hashMap.put("W25", productionDaily.getMonthAverageDisposalThirdAuxiliaryCommonActivatedCarbon());
            hashMap.put("W26", productionDaily.getMonthAverageDisposalThirdAuxiliaryActivatedCarbon());
            hashMap.put("W27", productionDaily.getMonthAverageDisposalThirdAuxiliaryActivatedCarbonParticles());
            hashMap.put("W28", productionDaily.getMonthAverageDisposalThirdAuxiliaryLye());
            hashMap.put("W29", productionDaily.getMonthAverageDisposalThirdAuxiliaryCausticSoda());
            hashMap.put("W30", productionDaily.getMonthAverageDisposalThirdAuxiliaryUrea());
            hashMap.put("W31", productionDaily.getMonthAverageDisposalThirdAuxiliaryHydrochloricAcid());
            hashMap.put("W32", productionDaily.getMonthAverageDisposalThirdAuxiliaryNahco3());
            hashMap.put("W33", productionDaily.getMonthAverageDisposalThirdAuxiliaryFlour());
            hashMap.put("W34", productionDaily.getMonthAverageDisposalThirdAuxiliaryDefoamer());
            hashMap.put("W35", productionDaily.getMonthAverageDisposalThirdAuxiliaryFlocculant());
            hashMap.put("W36", productionDaily.getMonthAverageDisposalThirdAuxiliarySoftWaterReducingAgent());
            hashMap.put("W37", productionDaily.getMonthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("W38", productionDaily.getMonthAverageDisposalThirdAuxiliaryAmmonia());
            hashMap.put("W39", productionDaily.getMonthAverageDisposalThirdAuxiliaryWaterReducingAgent());
            hashMap.put("W40", productionDaily.getMonthAverageDisposalThirdAuxiliaryWaterScaleInhibitor());
            hashMap.put("W41", productionDaily.getMonthAverageDisposalThirdAuxiliaryNaclo());
            hashMap.put("W42", productionDaily.getMonthAverageDisposalThirdAuxiliaryStandardBox());
            hashMap.put("W43", productionDaily.getMonthAverageDisposalThirdAuxiliaryWoodenPallets());
            hashMap.put("W44", productionDaily.getMonthAverageDisposalThirdAuxiliaryStandardTray_1m());
            hashMap.put("W45", productionDaily.getMonthAverageDisposalThirdAuxiliaryStandardTray_1_2m());
            hashMap.put("W46", productionDaily.getMonthAverageDisposalThirdAuxiliarySlagBag());
            hashMap.put("W47", productionDaily.getMonthAverageDisposalThirdAuxiliaryFlyAshBag());
            hashMap.put("W48", productionDaily.getMonthAverageDisposalThirdAuxiliaryTonBox());
            hashMap.put("W49", productionDaily.getMonthAverageDisposalThirdAuxiliarySteam());
            hashMap.put("W50", productionDaily.getMonthAverageDisposalThirdAuxiliaryDieselOil());
            hashMap.put("W51", productionDaily.getMonthAverageDisposalThirdAuxiliaryNaturalGas());
            hashMap.put("W52", productionDaily.getMonthAverageDisposalThirdAuxiliaryIndustrialWater());
            hashMap.put("W53", productionDaily.getMonthAverageDisposalThirdAuxiliaryElectricQuantity());
            hashMap.put("W54", productionDaily.getMonthAverageDisposalThirdAuxiliaryTapWaterQuantity());
            hashMap.put("W55", productionDaily.getMonthAverageDisposalTowerElectricQuantity());

            hashMap.put("X05", productionDaily.getLimitDisposalMedicalAuxiliaryNaclo());
            hashMap.put("X06", productionDaily.getLimitDisposalMedicalAuxiliaryDeodorant());
            hashMap.put("X07", productionDaily.getLimitDisposalMedicalAuxiliaryMedicalWastesBag());
            hashMap.put("X08", productionDaily.getLimitDisposalMedicalAuxiliaryMedicalPackingPlasticBag());
            hashMap.put("X09", productionDaily.getLimitDisposalMedicalAuxiliaryCollectionBox());
            hashMap.put("X10", productionDaily.getLimitDisposalMedicalAuxiliarySteam());
            hashMap.put("X11", productionDaily.getLimitDisposalMedicalAuxiliaryIndustrialWater());
            hashMap.put("X12", productionDaily.getLimitDisposalSecondaryAuxiliaryCalcareousLime());
            hashMap.put("X13", productionDaily.getLimitDisposalSecondaryAuxiliaryCommonActivatedCarbon());
            hashMap.put("X14", productionDaily.getLimitDisposalSecondaryAuxiliaryActivatedCarbon());
            hashMap.put("X15", productionDaily.getLimitDisposalSecondaryAuxiliaryActivatedCarbonParticles());
            hashMap.put("X16", productionDaily.getLimitDisposalSecondaryAuxiliaryLye());
            hashMap.put("X17", productionDaily.getLimitDisposalSecondaryAuxiliarySalt());
            hashMap.put("X18", productionDaily.getLimitDisposalSecondaryAuxiliarySlagBag());
            hashMap.put("X19", productionDaily.getLimitDisposalSecondaryAuxiliaryFlyAshBag());
            hashMap.put("X20", productionDaily.getLimitDisposalSecondaryAuxiliaryDieselOil());
            hashMap.put("X21", productionDaily.getLimitDisposalSecondaryAuxiliaryIndustrialWater());
            hashMap.put("X22", productionDaily.getLimitDisposalSecondaryAuxiliaryElectricQuantity());
            hashMap.put("X23", productionDaily.getLimitDisposalSecondaryAuxiliaryWoodenPallets());
            hashMap.put("X24", productionDaily.getLimitDisposalThirdAuxiliaryCalcareousLime());
            hashMap.put("X25", productionDaily.getLimitDisposalThirdAuxiliaryCommonActivatedCarbon());
            hashMap.put("X26", productionDaily.getLimitDisposalThirdAuxiliaryActivatedCarbon());
            hashMap.put("X27", productionDaily.getLimitDisposalThirdAuxiliaryActivatedCarbonParticles());
            hashMap.put("X28", productionDaily.getLimitDisposalThirdAuxiliaryLye());
            hashMap.put("X29", productionDaily.getLimitDisposalThirdAuxiliaryCausticSoda());
            hashMap.put("X30", productionDaily.getLimitDisposalThirdAuxiliaryUrea());
            hashMap.put("X31", productionDaily.getLimitDisposalThirdAuxiliaryHydrochloricAcid());
            hashMap.put("X32", productionDaily.getLimitDisposalThirdAuxiliaryNahco3());
            hashMap.put("X33", productionDaily.getLimitDisposalThirdAuxiliaryFlour());
            hashMap.put("X34", productionDaily.getLimitDisposalThirdAuxiliaryDefoamer());
            hashMap.put("X35", productionDaily.getLimitDisposalThirdAuxiliaryFlocculant());
            hashMap.put("X36", productionDaily.getLimitDisposalThirdAuxiliarySoftWaterReducingAgent());
            hashMap.put("X37", productionDaily.getLimitDisposalThirdAuxiliarySoftWaterScaleInhibitor());
            hashMap.put("X38", productionDaily.getLimitDisposalThirdAuxiliaryAmmonia());
            hashMap.put("X39", productionDaily.getLimitDisposalThirdAuxiliaryWaterReducingAgent());
            hashMap.put("X40", productionDaily.getLimitDisposalThirdAuxiliaryWaterScaleInhibitor());
            hashMap.put("X41", productionDaily.getLimitDisposalThirdAuxiliaryNaclo());
            hashMap.put("X42", productionDaily.getLimitDisposalThirdAuxiliaryStandardBox());
            hashMap.put("X43", productionDaily.getLimitDisposalThirdAuxiliaryWoodenPallets());
            hashMap.put("X44", productionDaily.getLimitDisposalThirdAuxiliaryStandardTray_1m());
            hashMap.put("X45", productionDaily.getLimitDisposalThirdAuxiliaryStandardTray_1_2m());
            hashMap.put("X46", productionDaily.getLimitDisposalThirdAuxiliarySlagBag());
            hashMap.put("X47", productionDaily.getLimitDisposalThirdAuxiliaryFlyAshBag());
            hashMap.put("X48", productionDaily.getLimitDisposalThirdAuxiliaryTonBox());
            hashMap.put("X49", productionDaily.getLimitDisposalThirdAuxiliarySteam());
            hashMap.put("X50", productionDaily.getLimitDisposalThirdAuxiliaryDieselOil());
            hashMap.put("X51", productionDaily.getLimitDisposalThirdAuxiliaryNaturalGas());
            hashMap.put("X52", productionDaily.getLimitDisposalThirdAuxiliaryIndustrialWater());
            hashMap.put("X53", productionDaily.getLimitDisposalThirdAuxiliaryElectricQuantity());
            hashMap.put("X54", productionDaily.getLimitDisposalThirdAuxiliaryTapWaterQuantity());
            hashMap.put("X55", productionDaily.getLimitDisposalTowerElectricQuantity());

            hashMap.put("R60", productionDaily.getTodayEquipmentA2StopTime());
            hashMap.put("R61", productionDaily.getTodayEquipmentB2StopTime());
            hashMap.put("R62", productionDaily.getTodayEquipmentPrepare2StopTime());
            hashMap.put("R63", productionDaily.getTodayEquipmentSecondaryStopTime());
            hashMap.put("R64", productionDaily.getTodayEquipmentThirdStopTime());
            hashMap.put("S60", productionDaily.getMonthEquipmentA2StopTime());
            hashMap.put("S61", productionDaily.getMonthEquipmentB2StopTime());
            hashMap.put("S62", productionDaily.getMonthEquipmentPrepare2StopTime());
            hashMap.put("S63", productionDaily.getMonthEquipmentSecondaryStopTime());
            hashMap.put("S64", productionDaily.getMonthEquipmentThirdStopTime());
            hashMap.put("T60", productionDaily.getYearEquipmentA2StopTime());
            hashMap.put("T61", productionDaily.getYearEquipmentB2StopTime());
            hashMap.put("T62", productionDaily.getYearEquipmentPrepare2StopTime());
            hashMap.put("T63", productionDaily.getYearEquipmentSecondaryStopTime());
            hashMap.put("T64", productionDaily.getYearEquipmentThirdStopTime());

            hashMap.put("U60", productionDaily.getTodayEquipmentA2RunningTime());
            hashMap.put("U61", productionDaily.getTodayEquipmentB2RunningTime());
            hashMap.put("U62", productionDaily.getTodayEquipmentPrepare2RunningTime());
            hashMap.put("U63", productionDaily.getTodayEquipmentSecondaryRunningTime());
            hashMap.put("U64", productionDaily.getTodayEquipmentThirdRunningTime());
            hashMap.put("V60", productionDaily.getMonthEquipmentA2RunningTime());
            hashMap.put("V61", productionDaily.getMonthEquipmentB2RunningTime());
            hashMap.put("V62", productionDaily.getMonthEquipmentPrepare2RunningTime());
            hashMap.put("V63", productionDaily.getMonthEquipmentSecondaryRunningTime());
            hashMap.put("V64", productionDaily.getMonthEquipmentThirdRunningTime());
            hashMap.put("W60", productionDaily.getYearEquipmentA2RunningTime());
            hashMap.put("W61", productionDaily.getYearEquipmentB2RunningTime());
            hashMap.put("W62", productionDaily.getYearEquipmentPrepare2RunningTime());
            hashMap.put("W63", productionDaily.getYearEquipmentSecondaryRunningTime());
            hashMap.put("W64", productionDaily.getYearEquipmentThirdRunningTime());

            hashMap.put("R68", productionDaily.getTodayEquipmentA2RunningRate());
            hashMap.put("R69", productionDaily.getTodayEquipmentB2RunningRate());
            hashMap.put("R70", productionDaily.getTodayEquipmentPrepare2RunningRate());
            hashMap.put("R71", productionDaily.getTodayEquipmentSecondaryRunningRate());
            hashMap.put("R72", productionDaily.getTodayEquipmentThirdRunningRate());
            hashMap.put("S68", productionDaily.getMonthEquipmentA2RunningRate());
            hashMap.put("S69", productionDaily.getMonthEquipmentB2RunningRate());
            hashMap.put("S70", productionDaily.getMonthEquipmentPrepare2RunningRate());
            hashMap.put("S71", productionDaily.getMonthEquipmentSecondaryRunningRate());
            hashMap.put("S72", productionDaily.getMonthEquipmentThirdRunningRate());
            hashMap.put("T68", productionDaily.getYearEquipmentA2RunningRate());
            hashMap.put("T69", productionDaily.getYearEquipmentB2RunningRate());
            hashMap.put("T70", productionDaily.getYearEquipmentPrepare2RunningRate());
            hashMap.put("T71", productionDaily.getYearEquipmentSecondaryRunningRate());
            hashMap.put("T72", productionDaily.getYearEquipmentThirdRunningRate());
            // 炉渣飞灰
            hashMap.put("S76", productionDaily.getTodayDisposalSecondarySlag());
            hashMap.put("S77", productionDaily.getTodayDisposalSecondaryAsh());
            hashMap.put("S78", productionDaily.getTodayDisposalThirdSlag());
            hashMap.put("S79", productionDaily.getTodayDisposalThirdAsh());
            hashMap.put("T76", productionDaily.getMonthDisposalSecondarySlag());
            hashMap.put("T77", productionDaily.getMonthDisposalSecondaryAsh());
            hashMap.put("T78", productionDaily.getMonthDisposalThirdSlag());
            hashMap.put("T79", productionDaily.getMonthDisposalThirdAsh());
            hashMap.put("U76", productionDaily.getYearDisposalSecondarySlag());
            hashMap.put("U77", productionDaily.getYearDisposalSecondaryAsh());
            hashMap.put("U78", productionDaily.getYearDisposalThirdSlag());
            hashMap.put("U79", productionDaily.getYearDisposalThirdAsh());
            // 停车原因
            hashMap.put("V77", productionDaily.getParkingReason());
            hashMap.put("V96", productionDaily.getOtherIssue());

            // 增加位置信息
            List<String> inboundOrderItemWastesNameCellAddress = new ArrayList<>();
            List<String> inboundOrderItemWastesCompanyCellAddress = new ArrayList<>();
            List<String> inboundOrderItemWastesAmountCellAddress = new ArrayList<>();
            List<String> inboundOrderItemWastesCategoryCellAddress = new ArrayList<>();
            for (int i = 83; i < 95; i++) {
                String name1 = "B" + i;
                inboundOrderItemWastesNameCellAddress.add(name1);
                String name5 = "G" + i;
                inboundOrderItemWastesNameCellAddress.add(name5);
                String name9 = "L" + i;
                inboundOrderItemWastesNameCellAddress.add(name9);
                String name13 = "R" + i;
                inboundOrderItemWastesNameCellAddress.add(name13);

                String name2 = "C" + i;
                inboundOrderItemWastesCompanyCellAddress.add(name2);
                String name6 = "H" + i;
                inboundOrderItemWastesCompanyCellAddress.add(name6);
                String name10 = "M" + i;
                inboundOrderItemWastesCompanyCellAddress.add(name10);
                String name14 = "S" + i;
                inboundOrderItemWastesCompanyCellAddress.add(name14);

                String name3 = "D" + i;
                inboundOrderItemWastesAmountCellAddress.add(name3);
                String name7 = "I" + i;
                inboundOrderItemWastesAmountCellAddress.add(name7);
                String name11 = "N" + i;
                inboundOrderItemWastesAmountCellAddress.add(name11);
                String name15 = "T" + i;
                inboundOrderItemWastesAmountCellAddress.add(name15);

                String name4 = "E" + i;
                inboundOrderItemWastesCategoryCellAddress.add(name4);
                String name8 = "J" + i;
                inboundOrderItemWastesCategoryCellAddress.add(name8);
                String name12 = "O" + i;
                inboundOrderItemWastesCategoryCellAddress.add(name12);
                String name16 = "U" + i;
                inboundOrderItemWastesCategoryCellAddress.add(name16);
            }
            // 入场危废
            for (int i = 0; i < productionDaily.getInboundOrderItemList().size(); i++) {
                InboundOrderItem inboundOrderItem = productionDaily.getInboundOrderItemList().get(i);
                hashMap.put(inboundOrderItemWastesNameCellAddress.get(i), inboundOrderItem.getWastes().getName());
                hashMap.put(inboundOrderItemWastesCompanyCellAddress.get(i), inboundOrderItem.getProduceCompany().getCompanyName());
                hashMap.put(inboundOrderItemWastesAmountCellAddress.get(i), inboundOrderItem.getWastesAmount());
                hashMap.put(inboundOrderItemWastesCategoryCellAddress.get(i), inboundOrderItem.getHandleCategory().getName());
            }
            // 危废出库列表
            List<String> outboundOrderA2WastesNameCellAddress = new ArrayList<>();
            List<String> outboundOrderA2WastesCompanyCellAddress = new ArrayList<>();
            List<String> outboundOrderA2WastesAmountCellAddress = new ArrayList<>();
            List<String> outboundOrderA2WastesCategoryCellAddress = new ArrayList<>();

            List<String> outboundOrderB2WastesNameCellAddress = new ArrayList<>();
            List<String> outboundOrderB2WastesCompanyCellAddress = new ArrayList<>();
            List<String> outboundOrderB2WastesAmountCellAddress = new ArrayList<>();
            List<String> outboundOrderB2WastesCategoryCellAddress = new ArrayList<>();

            List<String> outboundOrderPrepare2WastesNameCellAddress = new ArrayList<>();
            List<String> outboundOrderPrepare2WastesCompanyCellAddress = new ArrayList<>();
            List<String> outboundOrderPrepare2WastesAmountCellAddress = new ArrayList<>();
            List<String> outboundOrderPrepare2WastesCategoryCellAddress = new ArrayList<>();

            List<String> outboundOrderThirdWastesNameCellAddress = new ArrayList<>();
            List<String> outboundOrderThirdWastesCompanyCellAddress = new ArrayList<>();
            List<String> outboundOrderThirdWastesAmountCellAddress = new ArrayList<>();
            List<String> outboundOrderThirdWastesCategoryCellAddress = new ArrayList<>();
            for (int i = 99; i < 124; i++) {
                String name1 = "B" + i;
                outboundOrderA2WastesNameCellAddress.add(name1);
                String name2 = "C" + i;
                outboundOrderA2WastesCompanyCellAddress.add(name2);
                String name3 = "D" + i;
                outboundOrderA2WastesAmountCellAddress.add(name3);
                String name4 = "E" + i;
                outboundOrderA2WastesCategoryCellAddress.add(name4);

                String name5 = "G" + i;
                outboundOrderB2WastesNameCellAddress.add(name5);
                String name6 = "H" + i;
                outboundOrderB2WastesCompanyCellAddress.add(name6);
                String name7 = "I" + i;
                outboundOrderB2WastesAmountCellAddress.add(name7);
                String name8 = "J" + i;
                outboundOrderB2WastesCategoryCellAddress.add(name8);

                String name9 = "L" + i;
                outboundOrderPrepare2WastesNameCellAddress.add(name9);
                String name10 = "M" + i;
                outboundOrderPrepare2WastesCompanyCellAddress.add(name10);
                String name11 = "N" + i;
                outboundOrderPrepare2WastesAmountCellAddress.add(name11);
                String name12 = "O" + i;
                outboundOrderPrepare2WastesCategoryCellAddress.add(name12);

                String name13= "R" + i;
                outboundOrderThirdWastesNameCellAddress.add(name13);
                String name14 = "S" + i;
                outboundOrderThirdWastesCompanyCellAddress.add(name14);
                String name15 = "T" + i;
                outboundOrderThirdWastesAmountCellAddress.add(name15);
                String name16 = "U" + i;
                outboundOrderThirdWastesCategoryCellAddress.add(name16);
            }

            for (int i = 0; i < productionDaily.getOutboundOrderA2List().size(); i++) {
                OutboundOrder outboundOrder = productionDaily.getOutboundOrderA2List().get(i);
                if (outboundOrder.getLaboratoryTest() != null)
                hashMap.put(outboundOrderA2WastesNameCellAddress.get(i), outboundOrder.getLaboratoryTest().getWastesName());
                if (outboundOrder.getClient() != null)
                hashMap.put(outboundOrderA2WastesCompanyCellAddress.get(i), outboundOrder.getClient().getCompanyName());
                hashMap.put(outboundOrderA2WastesAmountCellAddress.get(i), outboundOrder.getOutboundNumber());
                if (outboundOrder.getHandelCategory() != null)
                hashMap.put(outboundOrderA2WastesCategoryCellAddress.get(i), outboundOrder.getHandelCategory().getName());
            }

            for (int i = 0; i < productionDaily.getOutboundOrderB2List().size(); i++) {
                OutboundOrder outboundOrder = productionDaily.getOutboundOrderB2List().get(i);
                if (outboundOrder.getLaboratoryTest() != null)
                hashMap.put(outboundOrderB2WastesNameCellAddress.get(i), outboundOrder.getLaboratoryTest().getWastesName());
                if (outboundOrder.getClient() != null)
                hashMap.put(outboundOrderB2WastesCompanyCellAddress.get(i), outboundOrder.getClient().getCompanyName());
                hashMap.put(outboundOrderB2WastesAmountCellAddress.get(i), outboundOrder.getOutboundNumber());
                if (outboundOrder.getHandelCategory() != null)
                hashMap.put(outboundOrderB2WastesCategoryCellAddress.get(i), outboundOrder.getHandelCategory().getName());
            }

            for (int i = 0; i < productionDaily.getOutboundOrderPrepare2List().size(); i++) {
                OutboundOrder outboundOrder = productionDaily.getOutboundOrderPrepare2List().get(i);
                if (outboundOrder.getLaboratoryTest() != null)
                hashMap.put(outboundOrderPrepare2WastesNameCellAddress.get(i), outboundOrder.getLaboratoryTest().getWastesName());
                if (outboundOrder.getClient() != null)
                hashMap.put(outboundOrderPrepare2WastesCompanyCellAddress.get(i), outboundOrder.getClient().getCompanyName());
                hashMap.put(outboundOrderPrepare2WastesAmountCellAddress.get(i), outboundOrder.getOutboundNumber());
                if (outboundOrder.getHandelCategory() != null)
                hashMap.put(outboundOrderPrepare2WastesCategoryCellAddress.get(i), outboundOrder.getHandelCategory().getName());
            }

            for (int i = 0; i < productionDaily.getOutboundOrderThirdList().size(); i++) {
                OutboundOrder outboundOrder = productionDaily.getOutboundOrderThirdList().get(i);
                if (outboundOrder.getLaboratoryTest() != null)
                hashMap.put(outboundOrderThirdWastesNameCellAddress.get(i), outboundOrder.getLaboratoryTest().getWastesName());
                if (outboundOrder.getClient() != null)
                hashMap.put(outboundOrderThirdWastesCompanyCellAddress.get(i), outboundOrder.getClient().getCompanyName());
                hashMap.put(outboundOrderThirdWastesAmountCellAddress.get(i), outboundOrder.getOutboundNumber());
                if (outboundOrder.getHandelCategory() != null)
                hashMap.put(outboundOrderThirdWastesCategoryCellAddress.get(i), outboundOrder.getHandelCategory().getName());
            }

            // 迭代map赋值, 获取迭代器
            Iterator<Map.Entry<String, Object>> entries = hashMap.entrySet().iterator();
            while (entries.hasNext()) {
                Map.Entry<String, Object> entry = entries.next();
                // 定义单元格的位置
                CellAddress cellAddress = new CellAddress(entry.getKey());
                // 获取行
                XSSFRow row = xSheet.getRow(cellAddress.getRow());
                // 获取单元格
                XSSFCell cell = row.getCell(cellAddress.getColumn());
                if (entry.getValue() != null) cell.setCellValue(entry.getValue().toString());
                else cell.setCellValue("");
            }
            // 写入文件
            FileOutputStream excelFileOutPutStream = new FileOutputStream("Files/Out/生产日报导出文件.xlsx");//写数据到这个路径上		workbook.write(excelFileOutPutStream);		excelFileOutPutStream.flush();		excelFileOutPutStream.close();
            xwb.write(excelFileOutPutStream);
            excelFileOutPutStream.flush();
            excelFileOutPutStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
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
