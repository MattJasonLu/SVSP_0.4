package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.service.SupplierService;
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
import org.springframework.web.servlet.ModelAndView;

import java.io.File;
import java.text.NumberFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/5/17.
 */
@Controller
public class SupplierController {
    @Autowired
    SupplierService supplierService;

    /**
     * 列出所有供应商
     *
     * @return 供应商jsonArray字符串
     */
    @RequestMapping("listSupplier")
    @ResponseBody
    public String listSupplier() {
        try {
            List<Supplier> supplierList = supplierService.list();
            JSONArray res = JSONArray.fromArray(supplierList.toArray(new Supplier[supplierList.size()]));
            return res.toString();
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject res = new JSONObject();
            res.put("status", "fail");
            return res.toString();
        }
    }

    /**
     * 根据编号查找供应商
     */
    @RequestMapping("listSupplierById")
    @ResponseBody
    public String listSupplierById(String id) {
        Supplier supplier = supplierService.getBySupplierId(id);
        JSONObject res = JSONObject.fromBean(supplier);
        return res.toString();
    }

    /**
     * 根据公司名称查找供应商
     */
    @RequestMapping("getSuppier")
    @ResponseBody
    public String getSuppier(String companyName) {
        Supplier supplier = supplierService.getByName(companyName);
        JSONObject res = JSONObject.fromBean(supplier);
        return res.toString();
    }


    @RequestMapping("showSupplier")
    public ModelAndView showSupplier(String supplierId) {
        ModelAndView mav = new ModelAndView();
        if (supplierId != null) {
            Supplier supplier = supplierService.getBySupplierId(supplierId);
            mav.addObject("supplier", supplier);
        }
        mav.setViewName("jsp/showSupplier.jsp");
        return mav;
    }

    @RequestMapping("addSupplier")
    @ResponseBody
    public String addSupplier(@RequestBody Supplier supplier) {
        JSONObject res = new JSONObject();
        try {
            supplier.setSupplierState(ClientState.Enabled);
            supplierService.add(supplier);
            res.put("status", "success");
            res.put("message", "操作成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "操作失败");
        }
        return res.toString();
    }

    /**
     * 保存供应商
     *
     * @param supplier 供应商
     * @return 请求结果
     */
    @RequestMapping("saveSupplier")
    @ResponseBody
    public String saveSupplier(@RequestBody Supplier supplier) {
        Supplier resultSupplier = supplierService.getBySupplierId(supplier.getSupplierId());
        if (resultSupplier == null) {
            // 审核状态为待提交
            supplier.setCheckState(CheckState.ToSubmit);
            return addSupplier(supplier);
        } else {
            JSONObject res = new JSONObject();
            try {
                supplierService.update(supplier);
                res.put("status", "success");
                res.put("message", "保存成功");
            } catch (Exception e) {
                e.printStackTrace();
                res.put("status", "fail");
                res.put("message", "信息输入错误，请重试!");
            }
            return res.toString();
        }
    }

    /**
     * 提交供应商
     *
     * @param supplier 供应商
     * @return 请求结果
     */
    @RequestMapping("submitSupplier")
    @ResponseBody
    public String submitSupplier(@RequestBody Supplier supplier) {
        supplier.setCheckState(CheckState.Examining);
        Supplier resultSupplier = supplierService.getBySupplierId(supplier.getSupplierId());
        if (resultSupplier == null) {
            return addSupplier(supplier);
        } else {
            JSONObject res = new JSONObject();
            try {
                supplierService.update(supplier);
                res.put("status", "success");
                res.put("message", "保存成功");
            } catch (Exception e) {
                e.printStackTrace();
                res.put("status", "fail");
                res.put("message", "信息输入错误，请重试!");
            }
            return res.toString();
        }
    }

    @RequestMapping("submitSupplierById")
    @ResponseBody
    public String submitSupplierById(String supplierId) {
        JSONObject res = new JSONObject();
        try {
            // 提交客户信息
            supplierService.setCheckStateExamining(supplierId);
            res.put("status", "success");
            res.put("message", "操作成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "操作失败");
        }
        return res.toString();
    }

    /**
     * 根据供应商编号删除
     *
     * @param supplierId 供应商编号
     * @return 操作成功与否
     */
    @RequestMapping("deleteSupplier")
    @ResponseBody
    public String deleteSupplier(String supplierId) {
        JSONObject res = new JSONObject();
        try {
            supplierService.delete(supplierId);
            res.put("status", "success");
            res.put("message", "操作成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "操作失败");
        }
        return res.toString();
    }

    /**
     * 启用供应商
     *
     * @param supplierId 供应商编号
     * @return 操作成功与否
     */
    @RequestMapping("enableSupplier")
    @ResponseBody
    public String enableSupplier(String supplierId) {
        JSONObject res = new JSONObject();
        try {
            // 下面就等于  UPDATE t_supplier SET state='Enabled' WHERE supplierId=#{supplierId};
            supplierService.enable(supplierId);
            res.put("status", "success");
            res.put("message", "启用成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "启用失败");
        }
        return res.toString();
    }

    /**
     * 禁用供应商
     *
     * @param supplierId 供应商编号
     * @return 操作成功与否
     */
    @RequestMapping("disableSupplier")
    @ResponseBody
    public String disableSupplier(String supplierId) {
        JSONObject res = new JSONObject();
        try {
            // 下面就等于  UPDATE t_supplier SET state='Disabled' WHERE supplierId=#{supplierId};
            supplierService.disable(supplierId);
            res.put("status", "success");
            res.put("message", "禁用成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "禁用失败");
        }
        return res.toString();
    }

    /**
     * 查询供应商信息
     *
     * @param supplier 供应商
     * @return 供应商信息列表
     */
    @RequestMapping("searchSupplier")
    @ResponseBody
    public String searchSupplier(@RequestBody Supplier supplier) {
        JSONObject res = new JSONObject();
        try {
            //枚举类型转换
            //供应商类型
            String keyword = supplier.getKeyword();
            if (keyword != null) {
                if (keyword.equals("次生处置供方") || keyword.equals("次生处置") || keyword.equals("次生") || keyword.equals("处置"))
                    keyword = "DeriveDisposal";
                if (keyword.equals("运输类供方") || keyword.equals("运输类") || keyword.equals("运输"))
                    keyword = "Transport";
                if (keyword.equals("采购供方") || keyword.equals("采购"))
                    keyword = "Purchase";
                if (keyword.equals("其他供方") || keyword.equals("其他"))
                    keyword = "Others";
                //supplierState
                if (keyword.equals("已启用") || keyword.equals("启用")) keyword = "Enabled";
                if (keyword.equals("已禁用") || keyword.equals("禁用")) keyword = "Disabled";
                //checkState
                for (CheckState c : CheckState.values()) {
                    if (keyword.equals(c.getName())) {
                        keyword = c.name();
                        //System.out.println("keyword=" + keyword);
                    }
                }
                supplier.setKeyword(keyword);
            }
            List<Supplier> supplierList = supplierService.search(supplier);
            JSONArray data = JSONArray.fromArray(supplierList.toArray(new Supplier[supplierList.size()]));
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

    @RequestMapping("searchSupplierTotal")
    @ResponseBody
    public int searchSupplierTotal(@RequestBody Supplier supplier) {
        try {
            //枚举类型转换
            //供应商类型
            String keyword = supplier.getKeyword();
            if (keyword != null) {
                if (keyword.equals("次生处置供方") || keyword.equals("次生处置") || keyword.equals("次生") || keyword.equals("处置"))
                    keyword = "DeriveDisposal";
                if (keyword.equals("运输类供方") || keyword.equals("运输类") || keyword.equals("运输"))
                    keyword = "Transport";
                if (keyword.equals("采购供方") || keyword.equals("采购"))
                    keyword = "Purchase";
                if (keyword.equals("其他供方") || keyword.equals("其他"))
                    keyword = "Others";
                //supplierState
                if (keyword.equals("已启用") || keyword.equals("启用")) keyword = "Enabled";
                if (keyword.equals("已禁用") || keyword.equals("禁用")) keyword = "Disabled";
                //checkState
                for (CheckState c : CheckState.values()) {
                    if (keyword.equals(c.getName())) {
                        keyword = c.name();
                        //System.out.println("keyword=" + keyword);
                    }
                }
                supplier.setKeyword(keyword);
            }
            return supplierService.searchCount(supplier);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("getSupplierSeniorSelectedList")
    @ResponseBody
    public String getSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        JSONArray checkStateList = JSONArray.fromArray(CheckState.values());
        res.put("checkStateList", checkStateList);
        JSONArray supplierStateList = JSONArray.fromArray(ClientState.values());
        res.put("supplierStateList", supplierStateList);
        JSONArray supplierTypeList = JSONArray.fromArray(SupplierType.values());
        res.put("supplierTypeList", supplierTypeList);
        return res.toString();
    }

    /**
     * 获取目前的客户编号
     *
     * @return
     */
    @RequestMapping("getCurrentSupplierId")
    @ResponseBody
    public String getCurrentSupplierId() {
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
        int index = supplierService.count();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (supplierService.getBySupplierId(id) != null);
        JSONObject res = new JSONObject();
        res.put("supplierId", id);
        return res.toString();
    }

    /**
     * 通过供应商编号获取供应商
     *
     * @param supplierId 供应商编号
     * @return 供应商信息
     */
    @RequestMapping("getBySupplierId")
    @ResponseBody
    public String getBySupplierId(String supplierId) {
        JSONObject res = new JSONObject();
        try {
            Supplier supplier = supplierService.getBySupplierId(supplierId);
            if (supplier == null) throw new Exception("没有该供应商");
            JSONObject data = JSONObject.fromBean(supplier);
            res.put("status", "success");
            res.put("data", data.toString());
            res.put("message", "获取供应商信息成功");
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "获取供应商信息失败");
        }
        return res.toString();
    }

    /**
     * 审批通过供应商
     *
     * @param supplierId 客户编号
     * @return 成功与否
     */
    @RequestMapping("passSupplier")
    @ResponseBody
    public String passSupplier(String supplierId) {
        JSONObject res = new JSONObject();
        try {
            // 设置客户审批状态为已完成
            supplierService.setCheckStateFinished(supplierId);
            res.put("status", "success");
            res.put("message", "审批通过");
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "审批未通过");
        }
        return res.toString();
    }

    /**
     * 驳回供应商
     *
     * @param supplierId 客户编号
     * @return 成功与否
     */
    @RequestMapping("backSupplier")
    @ResponseBody
    public String backSupplier(String supplierId) {
        JSONObject res = new JSONObject();
        try {
            // 设置客户审批状态为已驳回
            supplierService.setCheckStateBacked(supplierId);
            res.put("status", "success");
            res.put("message", "驳回成功");
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "驳回失败");
        }
        return res.toString();
    }

    @RequestMapping("saveSupplierFiles")
    @ResponseBody
    public String saveSupplierFiles(String supplierId, MultipartFile licenseFile1, MultipartFile licenseFile2) {
        JSONObject res = new JSONObject();
        try {
            Supplier supplier = new Supplier();
            supplier.setSupplierId(supplierId);
            // 若文件夹不存在则创建文件夹
            String supplierPath = "Files/Supplier";
            File supplierDir = new File(supplierPath);
            if (!supplierDir.exists()) {
                supplierDir.mkdirs();
            }
            if (licenseFile1 != null) {
                String licenseFile1Name = supplierId + "-" + licenseFile1.getOriginalFilename();
                String licenseFile1Path = supplierPath + "/" + licenseFile1Name;
                File licenseFile1File = new File(licenseFile1Path);
                licenseFile1.transferTo(licenseFile1File);
                supplier.setLicenseFile1Url(licenseFile1Path);
            }
            if (licenseFile2 != null) {
                // 获取文件名字
                String processName = supplierId + "-" + licenseFile2.getOriginalFilename();
                String licenseFile2Path = supplierPath + "/" + processName;
                File licenseFile2File = new File(licenseFile2Path);
                licenseFile2.transferTo(licenseFile2File);
                // 更新客户保存文件的路径
                supplier.setLicenseFile2Url(licenseFile2Path);
            }
            // 更新供应商文件路径
            supplierService.setFilePath(supplier);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return res.toString();
    }

    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalSupplierRecord")
    @ResponseBody
    public int totalSupplierRecord() {
        try {
            return supplierService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageSupplierList")
    @ResponseBody
    public String loadPageSupplierList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<Supplier> QuestionnaireList = supplierService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(QuestionnaireList.toArray(new Supplier[QuestionnaireList.size()]));
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
     * 导入供应商文件
     * @param excelFile excel文件
     * @return 成功与否
     */
    @RequestMapping("importSupplierExcel")
    @ResponseBody
    public String importSupplierExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            // 获取危废入库的表格数据
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            for (int i = 1; i < data.length; i++) {
                // 创建供应商
                Supplier supplier = new Supplier();
                supplier.setSupplierId(data[i][0].toString());
                supplier.setGroupId(data[i][1].toString());
                supplier.setCompanyName(data[i][2].toString());
                supplier.setOrganizationCode(data[i][3].toString());
                supplier.setLicenseCode(data[i][4].toString());
                supplier.setRepresentative(data[i][5].toString());
                supplier.setPostCode(data[i][6].toString());
                // 设置企业类型
                switch (data[i][7].toString()) {
                    case "国有企业":
                        supplier.setEnterpriseType(EnterpriseType.StateOwnedEnterprises);
                        break;
                    case "集体企业":
                        supplier.setEnterpriseType(EnterpriseType.CollectiveEnterprise);
                        break;
                    case "国有企业改组的股份合作企业":
                        supplier.setEnterpriseType(EnterpriseType.JointStockByStateOwnedEnterprises);
                        break;
                    case "集体企业改组的股份合作企业":
                        supplier.setEnterpriseType(EnterpriseType.JointStockByCollectiveEnterprise);
                        break;
                    default:
                        break;
                }
                // 设置经营方式
                switch (data[i][8].toString()) {
                    case "综合":
                        supplier.setOperationMode(OperationMode.Comprehensive);
                        break;
                    case "收集":
                        supplier.setOperationMode(OperationMode.Collect);
                        break;
                    default:
                        break;
                }
                // 经营单位类别
                switch (data[i][9].toString()) {
                    case "利用处置危险废物及医疗废物":
                        supplier.setOperationType(OperationType.WasteAndClinical);
                        break;
                    case "只从事收集活动":
                        supplier.setOperationType(OperationType.CollectOnly);
                        break;
                    case "只利用处置危险废物":
                        supplier.setOperationType(OperationType.WasteOnly);
                        break;
                    case "只处置医疗废物":
                        supplier.setOperationType(OperationType.ClinicalOnly);
                        break;
                    default:
                        break;
                }
                // 事故防范和应急预案
                switch (data[i][10].toString()) {
                    case "制定并确定了应急协调人":
                        supplier.setContingencyPlan(ContingencyPlan.Identify);
                        break;
                    case "已制定":
                        supplier.setContingencyPlan(ContingencyPlan.Developed);
                        break;
                    case "未制定":
                        supplier.setContingencyPlan(ContingencyPlan.Undeveloped);
                        break;
                    default:
                        break;
                }
                // 建立危废经营记录情况
                switch (data[i][11].toString()) {
                    case "已建立":
                        supplier.setOperationRecord(OperationRecord.Established);
                        break;
                    case "未建立":
                        supplier.setOperationRecord(OperationRecord.Unestablished);
                        break;
                    default:
                        break;
                }
                // 工商注册地址
                supplier.setLocation(data[i][12].toString());
                supplier.setStreet(data[i][13].toString());
                // 申报状态
                switch (data[i][14].toString()) {
                    case "已申报":
                        break;
                    case "未申报":
                        break;
                    default:
                        break;
                }
                supplier.setContactName(data[i][15].toString());
                supplier.setPhone(data[i][16].toString());
                supplier.setMobile(data[i][17].toString());
                supplier.setEmail(data[i][18].toString());
                supplier.setIndustry(data[i][19].toString());
                supplier.setProduct(data[i][20].toString());
                // 供应商类型
                switch (data[i][21].toString()) {
                    case "次生处置供方":
                        supplier.setSupplierType(SupplierType.DeriveDisposal);
                        break;
                    case "运输类供方":
                        supplier.setSupplierType(SupplierType.Transport);
                        break;
                    case "采购供方":
                        supplier.setSupplierType(SupplierType.Purchase);
                        break;
                    case "其他供方":
                        supplier.setSupplierType(SupplierType.Others);
                        break;
                    default:
                        break;
                }
                // 审核状态
                switch (data[i][22].toString()) {
                    case "审批中":
                        supplier.setCheckState(CheckState.Examining);
                        break;
                    case "待提交":
                        supplier.setCheckState(CheckState.ToSubmit);
                        break;
                    case "已完成":
                        supplier.setCheckState(CheckState.Finished);
                        break;
                    case "已驳回":
                        supplier.setCheckState(CheckState.Backed);
                        break;
                    case "待审批":
                        supplier.setCheckState(CheckState.ToExamine);
                        break;
                    default:
                        break;
                }
                // 账号状态
                switch (data[i][23].toString()) {
                    case "已启用":
                        supplier.setSupplierState(ClientState.Enabled);
                        break;
                    case "已禁用":
                        supplier.setSupplierState(ClientState.Disabled);
                        break;
                    default:
                        break;
                }
                // 税号、注册资本
                supplier.setTaxNumber(data[i][24].toString());
                supplier.setRegisteredCapital(data[i][25].toString());
                supplier.setCreateDate(DateUtil.getDateFromStr(data[i][26].toString()));
                supplier.setBusinessLimit(data[i][27].toString());
                supplier.setTransportLicense(data[i][28].toString());
                supplier.setExpirationDate(DateUtil.getDateFromStr(data[i][29].toString()));
                supplier.setBankName(data[i][30].toString());
                supplier.setBankAccount(data[i][31].toString());
                // 开票税率
                switch (data[i][32].toString()) {
                    case "增值税专用发票16%":
                        supplier.setTicketRate(TicketRate1.Rate1);
                        break;
                    case "增值税专用发票3%":
                        supplier.setTicketRate(TicketRate1.Rate2);
                        break;
                    default:
                        break;
                }

                supplierService.add(supplier);
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
