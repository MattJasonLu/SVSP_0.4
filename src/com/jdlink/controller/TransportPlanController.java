package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.*;
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

import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * Created by matt on 2018/8/9.
 * DoubleClickTo 666
 * 运输计划控制器
 */
@Controller
public class TransportPlanController {

    @Autowired
    TransportPlanService transportPlanService;
    @Autowired
    WastesService wastesService;
    @Autowired
    ClientService clientService;
    @Autowired
    WayBillService wayBillService;
    @Autowired
    ContractService contractService;
    @Autowired
    StockService stockService;
    @Autowired
    UserService userService;

    /**
     * 增加运输计划
     * @param transportPlan 运输计划
     * @return 成功与否
     */
    @RequestMapping("addTransportPlan")
    @ResponseBody
    public String addTransportPlan(@RequestBody TransportPlan transportPlan, HttpSession session) {
        JSONObject res = new JSONObject();
        try {
            // 设置运输计划编号
            transportPlan.setId(RandomUtil.getRandomEightNumber());
            User userInfo = userService.getCurrentUserInfo(session);
            if (userInfo != null)
            transportPlan.setAuthor(userInfo.getName());
            transportPlan.setDepartmentDirector("测试用户");
            transportPlan.setProductionDirector("测试用户");
            transportPlan.setGroup("测试组别");
            transportPlan.setCheckState(CheckState.NewBuild);
            for (TransportPlanItem transportPlanItem : transportPlan.getTransportPlanItemList()) {
                // 设置运输计划条目的编号
                transportPlanItem.setId(RandomUtil.getRandomEightNumber());
                Client produceCompany = clientService.getByName(transportPlanItem.getProduceCompany().getCompanyName());
                transportPlanItem.setProduceCompany(produceCompany);
            }
            transportPlanService.add(transportPlan);
            res.put("status", "success");
            res.put("message", "增加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加失败");
        }
        return res.toString();
    }

    @RequestMapping("updateTransportPlan")
    @ResponseBody
    public String updateTransportPlan(@RequestBody TransportPlan transportPlan) {
        JSONObject res = new JSONObject();
        try {
//            // 为危废设置编号
//            TransportPlan oldTransportPlan = transportPlanService.getById(transportPlan.getId());
//            for (int i = 0; i < oldTransportPlan.getTransportPlanItemList().size(); i++) {
//                transportPlan.getTransportPlanItemList().get(i).getWastes().setId(oldTransportPlan.getTransportPlanItemList().get(i).getWastes().getId());
//            }
            // 更新运输计划
            transportPlanService.update(transportPlan);
            res.put("status", "success");
            res.put("message", "更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();
    }

    /**
     * 获取最新的运输计划
     * @return 运输计划对象
     */
    @RequestMapping("getRecentTransportPlan")
    @ResponseBody
    public String getRecentTransportPlan() {
        JSONObject res = new JSONObject();
        try {
            TransportPlan transportPlan =  transportPlanService.getRecent();
            JSONObject data = JSONObject.fromBean(transportPlan);
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

    /**
     * 通过编号获取运输计划单
     * @param id 编号
     * @return 运输计划单
     */
    @RequestMapping("getTransportPlanById")
    @ResponseBody
    public String getTransportPlanById(String id) {
        JSONObject res = new JSONObject();
        try {
            TransportPlan transportPlan =  transportPlanService.getById(id);
            JSONObject data = JSONObject.fromBean(transportPlan);
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

    /**
     * 获取危废列表
     * @return 危废列表
     */
    @RequestMapping("getTransportPlanWastesList")
    @ResponseBody
    public String getTransportPlanWastesList() {
        JSONObject res = new JSONObject();
        try {
            List<TransportPlanItem> transportPlanItemList = new ArrayList<>();
            // 取出危废合同的所有信息
            List<Contract> contractList = contractService.listPageManege(null);
            // 所有危废合同
            for (Contract contract : contractList) {
                List<QuotationItem> quotationItemList = contract.getQuotationItemList();
                for (QuotationItem quotationItem : quotationItemList) {
                    // 创建运输计划条目明细
                    TransportPlanItem transportPlanItem = new TransportPlanItem();
                    transportPlanItem.setProduceCompany(contract.getClient());
                    transportPlanItem.setWastesName(quotationItem.getWastesName());
                    transportPlanItem.setWastesCode(quotationItem.getWastesCode());
                    transportPlanItem.setPackageTypeItem(quotationItem.getPackageTypeItem());
                    transportPlanItem.setHeat(quotationItem.getHeat());
                    transportPlanItem.setPh(quotationItem.getPh());
                    transportPlanItem.setAsh(quotationItem.getAsh());
                    transportPlanItem.setWaterContent(quotationItem.getWaterContent());
                    transportPlanItem.setChlorineContent(quotationItem.getChlorineContent());
                    transportPlanItem.setSulfurContent(quotationItem.getSulfurContent());
                    transportPlanItem.setPhosphorusContent(quotationItem.getPhosphorusContent());
                    transportPlanItem.setFluorineContent(quotationItem.getFluorineContent());
                    transportPlanItem.setWastesAmount(quotationItem.getContractAmount());
                    transportPlanItemList.add(transportPlanItem);
                }
            }
            // 获取所有库存申报的数据
            List<Stock> stockList = stockService.list();
            for (Stock stock : stockList) {
                List<StockItem> stockItemList = stock.getStockItemList();
                for (StockItem stockItem : stockItemList) {
                    // 创建运输计划单条目
                    TransportPlanItem transportPlanItem = new TransportPlanItem();
                    transportPlanItem.setProduceCompany(stock.getClient());
                    transportPlanItem.setWastesName(stockItem.getWastesName());
                    transportPlanItem.setWastesCode(stockItem.getWastesCode());
                    transportPlanItem.setWastesAmount(stockItem.getNumber());
                    transportPlanItemList.add(transportPlanItem);
                }
            }
            JSONArray data = JSONArray.fromArray(transportPlanItemList.toArray(new TransportPlanItem[transportPlanItemList.size()]));
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

    /**
     * 查找危废列表
     * @return 危废列表
     */
    @RequestMapping("searchTransportPlanWastesList")
    @ResponseBody
    public String searchTransportPlanWastesList(@RequestBody TransportPlanItem transportPlanItemParam) {
        JSONObject res = new JSONObject();
        try {
            // 待抽取方法
            List<TransportPlanItem> transportPlanItemList = new ArrayList<>();
            // 取出危废合同的所有信息
            List<Contract> contractList = contractService.listPageManege(null);
            // 所有危废合同
            for (Contract contract : contractList) {
                List<QuotationItem> quotationItemList = contract.getQuotationItemList();
                for (QuotationItem quotationItem : quotationItemList) {
                    // 创建运输计划条目明细
                    TransportPlanItem transportPlanItem = new TransportPlanItem();
                    transportPlanItem.setProduceCompany(contract.getClient());
                    transportPlanItem.setWastesName(quotationItem.getWastesName());
                    transportPlanItem.setWastesCode(quotationItem.getWastesCode());
                    transportPlanItem.setPackageTypeItem(quotationItem.getPackageTypeItem());
                    transportPlanItem.setHeat(quotationItem.getHeat());
                    transportPlanItem.setPh(quotationItem.getPh());
                    transportPlanItem.setAsh(quotationItem.getAsh());
                    transportPlanItem.setWaterContent(quotationItem.getWaterContent());
                    transportPlanItem.setChlorineContent(quotationItem.getChlorineContent());
                    transportPlanItem.setSulfurContent(quotationItem.getSulfurContent());
                    transportPlanItem.setPhosphorusContent(quotationItem.getPhosphorusContent());
                    transportPlanItem.setFluorineContent(quotationItem.getFluorineContent());
                    transportPlanItem.setWastesAmount(quotationItem.getContractAmount());
                    transportPlanItemList.add(transportPlanItem);
                }
            }
            // 获取所有库存申报的数据
            List<Stock> stockList = stockService.list();
            for (Stock stock : stockList) {
                List<StockItem> stockItemList = stock.getStockItemList();
                for (StockItem stockItem : stockItemList) {
                    // 创建运输计划单条目
                    TransportPlanItem transportPlanItem = new TransportPlanItem();
                    transportPlanItem.setProduceCompany(stock.getClient());
                    transportPlanItem.setWastesName(stockItem.getWastesName());
                    transportPlanItem.setWastesCode(stockItem.getWastesCode());
                    transportPlanItem.setWastesAmount(stockItem.getNumber());
                    transportPlanItemList.add(transportPlanItem);
                }
            }
            // 筛选列表
            List<TransportPlanItem> searchTransportPlanItemList = new ArrayList<>();
            for (TransportPlanItem transportPlanItem : transportPlanItemList) {
                if (transportPlanItem.getProduceCompany() != null && !transportPlanItemParam.getProduceCompany().getCompanyName().equals("") && transportPlanItemParam.getProduceCompany() != null && transportPlanItem.getProduceCompany().getCompanyName().contains(transportPlanItemParam.getProduceCompany().getCompanyName())) {
                    searchTransportPlanItemList.add(transportPlanItem);
                    continue;
                }
                if (transportPlanItem.getWastesName() != null && transportPlanItemParam.getWastesName() != null && !transportPlanItemParam.getWastesName().equals("") && transportPlanItem.getWastesName().contains(transportPlanItemParam.getWastesName())) {
                    searchTransportPlanItemList.add(transportPlanItem);
                    continue;
                }
                if (transportPlanItem.getWastesCode() != null && transportPlanItemParam.getWastesCode() != null && !transportPlanItemParam.getWastesCode().equals("") && transportPlanItem.getWastesCode().contains(transportPlanItemParam.getWastesCode())) {
                    searchTransportPlanItemList.add(transportPlanItem);
                    continue;
                }
                if (transportPlanItemParam.getHeat() != 0 && transportPlanItem.getHeat() == transportPlanItemParam.getHeat()) {
                    searchTransportPlanItemList.add(transportPlanItem);
                    continue;
                }
                if (transportPlanItemParam.getPh() != 0 && transportPlanItem.getPh() == transportPlanItemParam.getPh()) {
                    searchTransportPlanItemList.add(transportPlanItem);
                    continue;
                }
                if (transportPlanItemParam.getAsh() != 0 && transportPlanItem.getAsh() == transportPlanItemParam.getAsh()) {
                    searchTransportPlanItemList.add(transportPlanItem);
                    continue;
                }
                if (transportPlanItemParam.getWaterContent() != 0 && transportPlanItem.getWaterContent() == transportPlanItemParam.getWaterContent()) {
                    searchTransportPlanItemList.add(transportPlanItem);
                    continue;
                }
                if (transportPlanItemParam.getChlorineContent() != 0 && transportPlanItem.getChlorineContent() == transportPlanItemParam.getChlorineContent()) {
                    searchTransportPlanItemList.add(transportPlanItem);
                    continue;
                }
                if (transportPlanItemParam.getSulfurContent() != 0 && transportPlanItem.getSulfurContent() == transportPlanItemParam.getSulfurContent()) {
                    searchTransportPlanItemList.add(transportPlanItem);
                    continue;
                }
                if (transportPlanItemParam.getFluorineContent() != 0 && transportPlanItem.getPhosphorusContent() == transportPlanItemParam.getFluorineContent()) {
                    searchTransportPlanItemList.add(transportPlanItem);
                    continue;
                }
            }
            JSONArray data = JSONArray.fromArray(searchTransportPlanItemList.toArray(new TransportPlanItem[searchTransportPlanItemList.size()]));
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
     *
     * 设置运输计划状态为确认
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanConfirm")
    @ResponseBody
    public String setTransportPlanConfirm(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateConfirm(id);
            res.put("status", "success");
            res.put("message", "确认成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "确认失败");
        }
        return res.toString();
    }

    /**
     *
     * 设置运输计划状态为提交
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanSubmit")
    @ResponseBody
    public String setTransportPlanSubmit(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateSubmit(id);
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
     *
     * 设置运输计划状态为审核
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanExamined")
    @ResponseBody
    public String setTransportPlanExamined(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateExamined(id);
            res.put("status", "success");
            res.put("message", "审核成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "审核失败");
        }
        return res.toString();
    }

    /**
     *
     * 设置运输计划状态为作废
     * @return 成功与否
     */
    @RequestMapping("setTransportPlanInvalid")
    @ResponseBody
    public String setTransportPlanInvalid(String id) {
        JSONObject res = new JSONObject();
        try {
            transportPlanService.setStateInvalid(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }

    @RequestMapping("generateWayBill")
    @ResponseBody
    public String generateWayBill(String id) {
        JSONObject res = new JSONObject();
        try {
            TransportPlan transportPlan = transportPlanService.getById(id);
            Map<String, ArrayList<TransportPlanItem>> map = new HashMap<>();
            // 按公司进行划分为多个列表
            for (TransportPlanItem transportPlanItem : transportPlan.getTransportPlanItemList()) {
                // 获取客户编号
                String clientId = transportPlanItem.getProduceCompany().getClientId();
                // 判断编号是否存在于数组中，若不存在则初始化列表
                if (!map.keySet().contains(clientId)) {
                    map.put(clientId, new ArrayList<TransportPlanItem>());
                }
                map.get(clientId).add(transportPlanItem);
            }
            // 根据不同公司的列表生成接运单，一个公司一个接运单
            Iterator<Map.Entry<String, ArrayList<TransportPlanItem>>> entries = map.entrySet().iterator();
            while (entries.hasNext()) {
                Map.Entry<String, ArrayList<TransportPlanItem>> entry = entries.next();
                ArrayList<TransportPlanItem> itemList = entry.getValue();
                // 创建接运单
                WayBill wayBill = new WayBill();
                // 设置接运单的编号
                wayBill.setId(wayBillService.getCurrentWayBillId());
                // 设置接运单中的生产公司
                wayBill.setProduceCompanyId(itemList.get(0).getProduceCompany().getClientId());
                wayBill.setProduceCompanyName(itemList.get(0).getProduceCompany().getCompanyName());
                wayBill.setWayBillDate(new Date());
                wayBill.setFounder("管理员");
                wayBill.setProduceCompanyOperator("管理员");
                // 获取当前公司的业务员
                Salesman salesman = null;
                Client client = clientService.getByClientId(itemList.get(0).getProduceCompany().getClientId());
                if (client != null) {
                    if (client.getSalesman() != null) salesman = client.getSalesman();
                }
                List<WayBillItem> wayBillItemList = new ArrayList<>();
                int itemId = Integer.parseInt(wayBillService.getItemId());
                // 创建接运单中的接运单条目
                for (TransportPlanItem transportPlanItem : itemList) {
                    WayBillItem wayBillItem = new WayBillItem();
                    // 设置接运单条目的编号
                    wayBillItem.setItemId(String.valueOf(itemId));
                    // 设置接运单条目的危废
//                    wayBillItem.setWastesId(transportPlanItem);
                    wayBillItem.setWayBillId(wayBill.getId());
                    wayBillItem.setWastesCode(transportPlanItem.getWastesCode());
                    wayBillItem.setWastesAmount(transportPlanItem.getWastesAmount());
//                    wayBillItem.setWastesPrice(transportPlanItem.getWas);
                    wayBillItem.setWastesName(transportPlanItem.getWastesName());
                    wayBillItem.setWastesTotalPrice(wayBillItem.getWastesPrice() * wayBillItem.getWastesAmount());
                    // 设置接运单条目的业务员
                    if (salesman != null) wayBillItem.setSalesmanName(salesman.getName());
                    // 设置接运单条目的接运单日期
                    wayBillItem.setReceiveDate(transportPlanItem.getApproachTime());
                    // 设置接收单位
                    wayBillItem.setReceiveCompanyName("北控安耐得环保科技发展常州有限公司");
                    wayBillItem.setReceiveCompanyOperator("管理员");
                    // 增加接运单条目
                    wayBillItemList.add(wayBillItem);
                    itemId++;
                }
                // 设置接运单条目列表
                wayBill.setWayBillItemList(wayBillItemList);
                // 增加接运单
                wayBillService.addWayBill(wayBill);
            }
            res.put("status", "success");
            res.put("message", "生成成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "生成失败");
        }
        return res.toString();
    }

    /**
     * 读取运输计划单的分页数据
     * @param page 页码
     * @return 运输计划单数据
     */
    @RequestMapping("listTransportPlanByPage")
    @ResponseBody
    public String listTransportPlanByPage(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<TransportPlan> transportPlanList = transportPlanService.list(page);
            JSONArray data = JSONArray.fromArray(transportPlanList.toArray(new TransportPlan[transportPlanList.size()]));
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
     * 获取运输单的数量
     * @return 运输单的数量
     */
    @RequestMapping("transportPlanCount")
    @ResponseBody
    public int transportPlanCount() {
        try {
            return transportPlanService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查找运输计划单
     * @param transportPlan 运输计划单
     * @return 查询
     */
    @RequestMapping("searchTransportPlan")
    @ResponseBody
    public String searchTransportPlan(@RequestBody TransportPlan transportPlan) {
        JSONObject res = new JSONObject();
        try {
            List<TransportPlan> transportPlanList = transportPlanService.search(transportPlan);
            JSONArray data = JSONArray.fromArray(transportPlanList.toArray(new TransportPlan[transportPlanList.size()]));
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
     * 查询运输单的数量
     * @return 运输单的数量
     */
    @RequestMapping("searchTransportPlanCount")
    @ResponseBody
    public int searchTransportPlanCount(@RequestBody TransportPlan transportPlan) {
        try {
            return transportPlanService.searchCount(transportPlan);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 导入运输计划单
     * @param excelFile 文件
     * @return 导入成功与否
     */
    @RequestMapping("importTransportPlan")
    @ResponseBody
    public String importTransportPlan(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] excelData = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            TransportPlan transportPlan = new TransportPlan();
            // 设置编号等属性
            transportPlan.setId(RandomUtil.getRandomEightNumber());
            transportPlan.setCheckState(CheckState.NewBuild);
            transportPlan.setCreateDate(new Date());
            List<TransportPlanItem> transportPlanItemList = new ArrayList<>();
            for (int i = 1; i < excelData.length; i++) {
                if (excelData[i][0] == null || excelData[i][0].equals("null")) break;
                TransportPlanItem transportPlanItem = new TransportPlanItem();
                transportPlanItem.setId(RandomUtil.getRandomEightNumber());
                transportPlanItem.setApproachTime(DateUtil.getDateFromStr(excelData[i][4].toString()));
                // 通过客户名称查询到客户，若不存在则添加，否则直接更新
                Client client = clientService.getByName(excelData[i][2].toString());
                if (client == null) {
                    client = new Client();
                    client.setClientId(clientService.getCurrentId());
                    client.setCompanyName(excelData[i][2].toString());
                    clientService.add(client);
                }
                transportPlanItem.setProduceCompany(client);
                // 设置危废的信息
                Wastes wastes = new Wastes();
                // 随机编码
                wastes.setId(RandomUtil.getRandomEightNumber());
                wastes.setTransportPlanItemId(transportPlanItem.getId());
                // 设置进料方式
                switch (excelData[i][3].toString()) {
                    case "污泥":
                        wastes.setHandleCategory(HandleCategory.Sludge);
                        break;
                    case "废液":
                        wastes.setHandleCategory(HandleCategory.WasteLiquid);
                        break;
                    case "散装料":
                        wastes.setHandleCategory(HandleCategory.Bulk);
                        break;
                    case "破碎料":
                        wastes.setHandleCategory(HandleCategory.Crushing);
                        break;
                    case "精馏残渣":
                        wastes.setHandleCategory(HandleCategory.Distillation);
                        break;
                    case "悬挂连":
                        wastes.setHandleCategory(HandleCategory.Suspension);
                        break;
                    default:
                        break;
                }
                // 设置进料方式
                transportPlanItem.setHandleCategory(wastes.getHandleCategory());
                wastes.setName(excelData[i][5].toString());
                wastes.setWastesId(excelData[i][6].toString());
                wastes.setWasteAmount(Float.parseFloat(excelData[i][7].toString()));
                wastes.setUnit(excelData[i][8].toString());
                // 设置物质形态
                switch (excelData[i][9].toString()) {
                    case "气体":
                        wastes.setFormType(FormType.Gas);
                        break;
                    case "液体":
                        wastes.setFormType(FormType.Liquid);
                        break;
                    case "固体":
                        wastes.setFormType(FormType.Solid);
                        break;
                    case "半固态":
                        wastes.setFormType(FormType.HalfSolid);
                        break;
                    default:
                        break;
                }
                // 设置包装方式
                switch (excelData[i][10].toString()) {
                    case "吨袋":
                        wastes.setPackageType(PackageType.Bag);
                        break;
                    case "标准箱":
                        wastes.setPackageType(PackageType.Box);
                        break;
                    case "吨箱":
                        wastes.setPackageType(PackageType.Ton);
                        break;
                    case "小袋":
                        wastes.setPackageType(PackageType.Pouch);
                        break;
                    case "铁桶":
                        wastes.setPackageType(PackageType.Iron);
                        break;
                    default:
                        break;
                }
                wastes.setCalorific(Float.parseFloat(excelData[i][11].toString()));
                wastes.setPh(Float.parseFloat(excelData[i][12].toString()));
                wastes.setAshPercentage(Float.parseFloat(excelData[i][13].toString()));
                wastes.setWetPercentage(Float.parseFloat(excelData[i][14].toString()));
                wastes.setChlorinePercentage(Float.parseFloat(excelData[i][15].toString()));
                wastes.setSulfurPercentage(Float.parseFloat(excelData[i][16].toString()));
                wastes.setPhosphorusPercentage(Float.parseFloat(excelData[i][17].toString()));
                wastes.setFluorinePercentage(Float.parseFloat(excelData[i][18].toString()));
                // 设置处置方式
                switch (excelData[i][19].toString()) {
                    case "焚烧":
                        wastes.setProcessWay(ProcessWay.Burning);
                        break;
                    case "填埋":
                        wastes.setProcessWay(ProcessWay.Landfill);
                        break;
                    default:
                        break;
                }
//                transportPlanItem.setWastes(wastes);
                transportPlanItemList.add(transportPlanItem);
            }
            transportPlan.setTransportPlanItemList(transportPlanItemList);
            transportPlanService.add(transportPlan);
            // 增加危废
//            for (TransportPlanItem transportPlanItem : transportPlanItemList) {
//                wastesService.add(transportPlanItem.getWastes());
//            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败");
        }
        return res.toString();
    }
}
