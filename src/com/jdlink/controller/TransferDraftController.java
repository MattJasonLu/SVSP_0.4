package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Dictionary.FormTypeItem;
import com.jdlink.domain.Dictionary.HandleCategoryItem;
import com.jdlink.domain.Dictionary.PackageTypeItem;
import com.jdlink.domain.Inventory.InboundPlanOrder;
import com.jdlink.domain.Inventory.RecordState;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.TransferDraft;
import com.jdlink.service.*;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.PdfUtil;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by matt on 2018/8/2.
 * 转移联单控制器
 */
@Controller
public class TransferDraftController {

    /**
     * 转移联单服务
     */
    @Autowired
    TransferDraftService transferDraftService;

    @Autowired
    ClientService clientService;
    @Autowired
    SupplierService supplierService;
    @Autowired
    InboundService inboundService;
    @Autowired
    WastesService wastesService;

    /**
     * 获取目前的编号
     *
     * @return
     */
    @RequestMapping("getCurrentTransferDraftId")
    @ResponseBody
    public String getCurrentTransferDraftId() {
        //得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(4);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(4);
        // 获取最新编号
        String id;
        int index = transferDraftService.count();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (transferDraftService.getById(id) != null);
        JSONObject res = new JSONObject();
        res.put("transferDraftId", id);
        return res.toString();
    }

    /**
     * 增加转移联单
     *
     * @param transferDraft 转移联单对象
     * @return 成功与否
     */
    @RequestMapping("addTransferDraft")
    @ResponseBody
    public String addTransferDraft(@RequestBody TransferDraft transferDraft) {
        JSONObject res = new JSONObject();
        try {
            // 更新三个公司的信息
//            Client produceCompany = clientService.getByName(transferDraft.getProduceCompany().getCompanyName());
//            transferDraft.setProduceCompany(produceCompany);
//            Supplier transportCompany = supplierService.getByName(transferDraft.getTransportCompany().getCompanyName());
//            transferDraft.setTransportCompany(transportCompany);
//            Client acceptCompany = clientService.getByName(transferDraft.getAcceptCompany().getCompanyName());
//            transferDraft.setAcceptCompany(acceptCompany);
            // 获取旧的数据
            TransferDraft oldTransferDraft = transferDraftService.getById(transferDraft.getId());
            // 如果已存在数据则更新，否则进行新建
            if (oldTransferDraft != null) {
                transferDraft.getWastes().setId(oldTransferDraft.getWastes().getId());
                transferDraftService.update(transferDraft);
                res.put("status", "success");
                res.put("message", "修改成功");
            } else {
                // 更新危废物品的代码
                transferDraft.getWastes().setId(RandomUtil.getRandomEightNumber());
                transferDraftService.add(transferDraft);
                // 根据转移联单的信息生成入库计划单
                InboundPlanOrder inboundPlanOrder = new InboundPlanOrder();
                // 设置入库计划单号
                inboundPlanOrder.setInboundPlanOrderId(inboundService.getInboundPlanOrderId());
                // 设置计划日期
                inboundPlanOrder.setPlanDate(transferDraft.getTransferTime());
                // 设置产废单位
                inboundPlanOrder.setProduceCompany(transferDraft.getProduceCompany());
                // 设置接收单位
                inboundPlanOrder.setAcceptCompany(transferDraft.getAcceptCompany());
                // 设置转移时间
                inboundPlanOrder.setTransferDate(transferDraft.getTransferTime());
                // 设置联单号
                inboundPlanOrder.setTransferDraftId(transferDraft.getId());
                // 拟转数量
                inboundPlanOrder.setPrepareTransferCount(transferDraft.getWastes().getPrepareTransferCount());
                // 转移数量
                inboundPlanOrder.setTransferCount(transferDraft.getWastes().getTransferCount());
                // 危废信息
                Wastes wastes = new Wastes();
                wastes.setName(transferDraft.getWastes().getName());
                wastes.setCode(transferDraft.getWastes().getWastesId());
                wastes.setHandleCategory(transferDraft.getWastes().getHandleCategory());
                wastes.setCategory(transferDraft.getWastes().getCategory());
                inboundPlanOrder.setWastes(wastes);
                // 业务员信息
                inboundPlanOrder.setSalesman(transferDraft.getProduceCompany().getSalesman());
                // 单据状态
                inboundPlanOrder.setCheckState(CheckState.ToInbound);
                // 记录状态
                inboundPlanOrder.setRecordState(RecordState.Usable);
                // 增加入库计划单
                inboundService.addInboundPlanOrder(inboundPlanOrder);
                res.put("status", "success");
                res.put("message", "新增成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "操作失败");
        }
        return res.toString();
    }

    /**
     * 验收转移联单
     *
     * @param id 联单编号
     * @return 成功与否
     */
    @RequestMapping("setTransferDraftSignIn")
    @ResponseBody
    public String setTransferDraftSignIn(String id) {
        JSONObject res = new JSONObject();
        try {
            // 验收转移联单
            transferDraftService.setStateSignIn(id);
            res.put("status", "success");
            res.put("message", "验收成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "验收失败");
        }
        return res.toString();
    }

    /**
     * 作废转移联单
     *
     * @param id 联单编号
     * @return 成功与否
     */
    @RequestMapping("setTransferDraftInvalid")
    @ResponseBody
    public String setTransferDraftInvalid(String id) {
        JSONObject res = new JSONObject();
        try {
            // 作废转移联单
            transferDraftService.setStateInvalid(id);
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
     * 作废转移联单
     *
     * @param id 联单编号
     * @return 成功与否
     */
    @RequestMapping("setTransferDraftToExamine")
    @ResponseBody
    public String setTransferDraftToExamine(String id) {
        JSONObject res = new JSONObject();
        try {
            // 作废转移联单
            transferDraftService.setStateToExamine(id);
            res.put("status", "success");
            res.put("message", "提交成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");
        }
        return res.toString();
    }

    /*驳回*/
    @RequestMapping("setTransferDraftToBack")
    @ResponseBody
    public String setTransferDraftToBack(String id) {
        JSONObject res = new JSONObject();
        try {
            // 作废转移联单
            transferDraftService.setStateToBack(id);
            res.put("status", "success");
            res.put("message", "提交成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");
        }
        return res.toString();
    }

    /*审批*/
    @RequestMapping("setTransferDraftToApproval")
    @ResponseBody
    public String setTransferDraftToApproval(String id) {
        JSONObject res = new JSONObject();
        try {
            // 作废转移联单
            transferDraftService.setStateToApproval(id);
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
     * 获取联单数据
     *
     * @param id 联单编号
     * @return 获取的联单数据
     */
    @RequestMapping("getTransferDraftById")
    @ResponseBody
    public String getTransferDraftById(String id) {
        JSONObject res = new JSONObject();
        try {
            // 根据编号获取转移联单
            TransferDraft transferDraft = transferDraftService.getById(id);
            JSONObject data = JSONObject.fromBean(transferDraft);
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
     * 更新联单对象
     *
     * @param transferDraft 联单对象
     * @return 成功与否
     */
    @RequestMapping("updateTransferDraft")
    @ResponseBody
    public String updateTransferDraft(@RequestBody TransferDraft transferDraft) {
        JSONObject res = new JSONObject();
        try {
            // 更新联单对象
            transferDraftService.update(transferDraft);
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
     * 更新联单对象
     *
     * @return 成功与否
     */
    @RequestMapping("loadPageTransferDraftList")
    @ResponseBody
    public String loadPageTransferDraftList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 更新联单对象
            List<TransferDraft> transferDraftList = transferDraftService.list(page);
            JSONArray data = JSONArray.fromArray(transferDraftList.toArray(new TransferDraft[transferDraftList.size()]));
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
     * 获取总记录数
     *
     * @return 总记录数
     */
    @RequestMapping("totalTransferDraftRecord")
    @ResponseBody
    public int totalTransferDraftRecord() {
        try {
            return transferDraftService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取查询记录数
     *
     * @return 查询记录数
     */
    @RequestMapping("searchTransferDraftTotal")
    @ResponseBody
    public int searchTransferDraftTotal(@RequestBody TransferDraft transferDraft) {
        try {
            return transferDraftService.searchCount(transferDraft);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("searchTransferDraft")
    @ResponseBody
    public String searchTransferDraft(@RequestBody TransferDraft transferDraft) {
        JSONObject res = new JSONObject();
        try {
            List<TransferDraft> transferDraftList = transferDraftService.search(transferDraft);
            JSONArray data = JSONArray.fromArray(transferDraftList.toArray(new TransferDraft[transferDraftList.size()]));
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
     * 导入转移联单
     *
     * @return 成功与否
     */
    @RequestMapping("importTransferDraft")
    @ResponseBody
    public String importTransferDraft(MultipartFile pdfFile) {
        JSONObject res = new JSONObject();
        try {
            List<String> str = PdfUtil.getText(pdfFile);
            System.out.println();
            for (int i = 0; i < str.size(); i++) {
                if (i % 5 == 0) System.out.println();
                if (!str.get(i).equals("")) {
                    System.out.print(str.get(i) + " ");
                } else System.out.print("null" + " ");
            }
            // 导入数据
            TransferDraft transferDraft = new TransferDraft();
            transferDraft.setId(str.get(0));
            Client produceCompany = new Client();
            produceCompany.setCompanyName(str.get(1));
            produceCompany.setPhone(str.get(2));
            produceCompany.setLocation(str.get(3));
            produceCompany.setPostCode(str.get(4));
            if (clientService.getByName(str.get(1)) != null && clientService.getByName(str.get(1)).getClientId() != "")
                produceCompany.setClientId(clientService.getByName(str.get(1)).getClientId());
            transferDraft.setProduceCompany(produceCompany);
            Supplier transportCompany = new Supplier();
            transportCompany.setCompanyName(str.get(5));
            transportCompany.setPhone(str.get(6));
            transportCompany.setLocation(str.get(7));
            transportCompany.setPostCode(str.get(8));
            if (supplierService.getByName(str.get(5)) != null && supplierService.getByName(str.get(5)).getSupplierId() != "")
            transportCompany.setSupplierId(supplierService.getByName(str.get(5)).getSupplierId());
            transferDraft.setTransportCompany(transportCompany);
            Client acceptCompany = new Client();
            acceptCompany.setCompanyName(str.get(9));
            acceptCompany.setPhone(str.get(10));
            acceptCompany.setLocation(str.get(11));
            acceptCompany.setPostCode(str.get(12));
            if (clientService.getByName(str.get(9)) != null && clientService.getByName(str.get(9)).getClientId() != "")
            acceptCompany.setClientId(clientService.getByName(str.get(9)).getClientId());
            transferDraft.setAcceptCompany(acceptCompany);
            Wastes wastes = new Wastes();
            wastes.setName(str.get(13));          // 名称
            switch (str.get(14)) {                 // 危废类别
                case "污泥":
                    wastes.setHandleCategory(HandleCategory.Sludge);
                    HandleCategoryItem handleCategoryItem1 = new HandleCategoryItem();
                    handleCategoryItem1.setDataDictionaryItemId(28);
                    wastes.setHandleCategoryItem(handleCategoryItem1);
                    break;
                case "废液":
                    wastes.setHandleCategory(HandleCategory.WasteLiquid);
                    HandleCategoryItem handleCategoryItem2 = new HandleCategoryItem();
                    handleCategoryItem2.setDataDictionaryItemId(29);
                    wastes.setHandleCategoryItem(handleCategoryItem2);
                    break;
                case "散装料":
                    wastes.setHandleCategory(HandleCategory.Bulk);
                    HandleCategoryItem handleCategoryItem3 = new HandleCategoryItem();
                    handleCategoryItem3.setDataDictionaryItemId(30);
                    wastes.setHandleCategoryItem(handleCategoryItem3);
                    break;
                case "破碎料":
                    wastes.setHandleCategory(HandleCategory.Crushing);
                    HandleCategoryItem handleCategoryItem4 = new HandleCategoryItem();
                    handleCategoryItem4.setDataDictionaryItemId(31);
                    wastes.setHandleCategoryItem(handleCategoryItem4);
                    break;
                case "精馏残渣":
                    wastes.setHandleCategory(HandleCategory.Distillation);
                    HandleCategoryItem handleCategoryItem5 = new HandleCategoryItem();
                    handleCategoryItem5.setDataDictionaryItemId(32);
                    wastes.setHandleCategoryItem(handleCategoryItem5);
                    break;
                case "悬挂连":
                    wastes.setHandleCategory(HandleCategory.Suspension);
                    HandleCategoryItem handleCategoryItem6 = new HandleCategoryItem();
                    handleCategoryItem6.setDataDictionaryItemId(33);
                    wastes.setHandleCategoryItem(handleCategoryItem6);
                    break;
            }
            wastes.setWastesId(str.get(15));      // 八位码
            wastes.setPrepareTransferCount(Float.parseFloat(str.get(16)));
            wastes.setTransferCount(Float.parseFloat(str.get(17)));
            wastes.setSignCount(Float.parseFloat(str.get(18)));
            wastes.setWastesCharacter(str.get(19));
            switch (str.get(20)) {
                case "气体":
                    wastes.setFormType(FormType.Gas);
                    FormTypeItem formTypeItem1 = new FormTypeItem();
                    formTypeItem1.setDataDictionaryItemId(1);
                    wastes.setFormTypeItem(formTypeItem1);
                    break;
                case "液体":
                    wastes.setFormType(FormType.Liquid);
                    FormTypeItem formTypeItem2 = new FormTypeItem();
                    formTypeItem2.setDataDictionaryItemId(2);
                    wastes.setFormTypeItem(formTypeItem2);
                    break;
                case "固体":
                    wastes.setFormType(FormType.Solid);
                    FormTypeItem formTypeItem3 = new FormTypeItem();
                    formTypeItem3.setDataDictionaryItemId(3);
                    wastes.setFormTypeItem(formTypeItem3);
                    break;
                case "半固态":
                    wastes.setFormType(FormType.HalfSolid);
                    FormTypeItem formTypeItem4 = new FormTypeItem();
                    formTypeItem4.setDataDictionaryItemId(4);
                    wastes.setFormTypeItem(formTypeItem4);
                    break;
            }
            switch (str.get(21)) {
                case "吨袋":
                    wastes.setPackageType(PackageType.Bag);
                    PackageTypeItem packageTypeItem1 = new PackageTypeItem();
                    packageTypeItem1.setDataDictionaryItemId(121);
                    wastes.setPackageTypeItem(packageTypeItem1);
                    break;
                case "标准箱":
                    wastes.setPackageType(PackageType.Box);
                    PackageTypeItem packageTypeItem2 = new PackageTypeItem();
                    packageTypeItem2.setDataDictionaryItemId(122);
                    wastes.setPackageTypeItem(packageTypeItem2);
                    break;
                case "吨箱":
                    wastes.setPackageType(PackageType.Ton);
                    PackageTypeItem packageTypeItem3 = new PackageTypeItem();
                    packageTypeItem3.setDataDictionaryItemId(123);
                    wastes.setPackageTypeItem(packageTypeItem3);
                    break;
                case "小袋":
                    wastes.setPackageType(PackageType.Pouch);
                    PackageTypeItem packageTypeItem4 = new PackageTypeItem();
                    packageTypeItem4.setDataDictionaryItemId(124);
                    wastes.setPackageTypeItem(packageTypeItem4);
                    break;
                case "铁桶":
                    wastes.setPackageType(PackageType.Iron);
                    PackageTypeItem packageTypeItem5 = new PackageTypeItem();
                    packageTypeItem5.setDataDictionaryItemId(124);
                    wastes.setPackageTypeItem(packageTypeItem5);
                    break;
            }
            transferDraft.setWastes(wastes);
            transferDraft.setOutwardIsTransit(false);   // 是否中转储存
            transferDraft.setOutwardIsUse(false);        // 是否利用
            transferDraft.setOutwardIsDeal(false);       // 是否处理
            transferDraft.setOutwardIsDispose(false);      // 是否处置
            transferDraft.setMainDangerComponent(str.get(23));
            transferDraft.setDangerCharacter(str.get(24));
            transferDraft.setEmergencyMeasure(str.get(25));
            transferDraft.setEmergencyEquipment(str.get(26));
            transferDraft.setDispatcher(str.get(27));
            transferDraft.setDestination(str.get(28));      // 运达地
            transferDraft.setTransferTime(DateUtil.getDateTimeFromStr(str.get(29))); // 转移时间
            transferDraft.setFirstCarrier(str.get(30));
            transferDraft.setFirstCarryTime(DateUtil.getDateTimeFromStr(str.get(31)));
            transferDraft.setFirstModel(str.get(32));
            transferDraft.setFirstBrand(str.get(33));
            transferDraft.setFirstTransportNumber(str.get(34));
            transferDraft.setFirstOrigin(str.get(35));
            transferDraft.setFirstStation(str.get(36));
            transferDraft.setFirstDestination(str.get(37));
            transferDraft.setFirstCarrierSign("");           // 运输人签字
            transferDraft.setSecondCarrier(str.get(38));
            transferDraft.setSecondCarryTime(DateUtil.getDateTimeFromStr(str.get(39)));
            transferDraft.setSecondModel(str.get(40));
            transferDraft.setSecondBrand(str.get(41));
            transferDraft.setSecondTransportNumber(str.get(42));
            transferDraft.setSecondOrigin(str.get(43));
            transferDraft.setSecondStation(str.get(44));
            transferDraft.setSecondDestination(str.get(45));
            transferDraft.setSecondCarrierSign("");            // 运输人签字
            transferDraft.setAcceptCompanyLicense(str.get(46));
            transferDraft.setRecipient(str.get(47));
            transferDraft.setAcceptDate(DateUtil.getDateTimeFromStr(str.get(48)));    // 接收日期
            transferDraft.setDisposeIsUse(false);                              // 废物处置方式-是否利用
            transferDraft.setDisposeIsStore(false);                          // 是否贮存
            transferDraft.setDisposeIsBurn(false);                           // 是否焚烧
            transferDraft.setDisposeIsLandFill(false);                       // 是否填埋
            transferDraft.setDisposeIsOther(false);                        // 是否其他
            transferDraft.setHeadSign("");                                // 单位负责人签字
            transferDraft.setSignDate(DateUtil.getDateTimeFromStr(str.get(50)));
            transferDraftService.add(transferDraft);
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
     * 导入转移联单excel
     * @param excelFile 转移联单excel
     * @return 成功与否
     */
    @RequestMapping("importTransferDraftExcel")
    @ResponseBody
    public String importTransferDraftExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            for (int i = 1; i < data.length; i++) {
                TransferDraft transferDraft = new TransferDraft();
                // 转移日期
                transferDraft.setTransferTime(DateUtil.getDateFromStr(data[i][0].toString()));
                // 入场
                transferDraft.setInboundTime(data[i][1].toString());
                // 出场
                transferDraft.setOutboundTime(data[i][2].toString());
                // 联单编号
                transferDraft.setTransferId(data[i][3].toString());
                // 单位
                Client client = clientService.getByNameNotState(data[i][4].toString());
                if (client == null) {
                    client = new Client();
                    client.setCompanyName(data[i][4].toString());
                    clientService.add(client);
                }
                transferDraft.setProduceCompany(client);
                // 危废
                Wastes wastes = new Wastes();
                wastes.setName(data[i][5].toString());
                wastes.setWastesId(data[i][6].toString());
                // 毛重
                if (!data[i][7].toString().equals("null")) {
                    wastes.setPrepareTransferCount(Float.parseFloat(data[i][7].toString()));
                    wastes.setTransferCount(Float.parseFloat(data[i][7].toString()));
                }
                transferDraft.setWastes(wastes);
                if (!data[i][8].toString().equals("null"))
                transferDraft.setCount1H(Float.parseFloat(data[i][8].toString()));
                if (!data[i][9].toString().equals("null"))
                transferDraft.setCount2H(Float.parseFloat(data[i][9].toString()));
                if (!data[i][10].toString().equals("null"))
                transferDraft.setCountZN(Float.parseFloat(data[i][10].toString()));
                transferDraft.setFirstBrand(data[i][11].toString());
                transferDraft.setFirstCarrier(data[i][12].toString());
                transferDraft.setRecipient(data[i][13].toString());
                if (!data[i][14].toString().equals("null"))
                transferDraft.setRemark(data[i][14].toString());
                CheckStateItem checkStateItem = new CheckStateItem();
                checkStateItem.setDataDictionaryItemId(75);
                transferDraft.setCheckStateItem(checkStateItem);
                // 设置主键
                transferDraft.setId(RandomUtil.getRandomEightChar());
                transferDraftService.add(transferDraft);
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
}
