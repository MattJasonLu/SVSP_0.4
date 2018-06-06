package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.service.SupplierService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
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

    @RequestMapping("showSupplier")
    public ModelAndView showSupplier(String supplierId) {
        ModelAndView mav = new ModelAndView();
        if (supplierId != null) {
            Supplier supplier = supplierService.getBySupplierId(supplierId);
            mav.addObject("supplier", supplier);
        }
        // 获取枚举列表
        // 企业类型
        List<String> enterpriseTypeStrList = new ArrayList<>();
        for (EnterpriseType enterpriseType : EnterpriseType.values()) {
            enterpriseTypeStrList.add(enterpriseType.getName());
        }
        // 经营方式
        List<String> operationModeStrList = new ArrayList<>();
        for (OperationMode operationMode : OperationMode.values()) {
            operationModeStrList.add(operationMode.getName());
        }
        // 经营单位类别
        List<String> operationTypeStrList = new ArrayList<>();
        for (OperationType operationType : OperationType.values()) {
            operationTypeStrList.add(operationType.getName());
        }
        // 应急预案
        List<String> contingencyPlanStrList = new ArrayList<>();
        for (ContingencyPlan contingencyPlan : ContingencyPlan.values()) {
            contingencyPlanStrList.add(contingencyPlan.getName());
        }
        // 危废记录
        List<String> operationRecordStrList = new ArrayList<>();
        for (OperationRecord operationRecord : OperationRecord.values()) {
            operationRecordStrList.add(operationRecord.getName());
        }
        // 申报状态
        List<String> applicationStatusStrList = new ArrayList<>();
        for (ApplicationStatus applicationStatus : ApplicationStatus.values()) {
            applicationStatusStrList.add(applicationStatus.getName());
        }
        // 供应商类型
        List<String> supplierTypeStrList = new ArrayList<>();
        for (SupplierType supplierType : SupplierType.values()) {
            supplierTypeStrList.add(supplierType.getName());
        }

        mav.addObject("operationModeStrList", operationModeStrList);
        mav.addObject("enterpriseTypeStrList", enterpriseTypeStrList);
        mav.addObject("operationTypeStrList", operationTypeStrList);
        mav.addObject("contingencyPlanStrList", contingencyPlanStrList);
        mav.addObject("operationRecordStrList", operationRecordStrList);
        mav.addObject("applicationStatusStrList", applicationStatusStrList);
        mav.addObject("supplierTypeStrList", supplierTypeStrList);
        mav.setViewName("showSupplier");
        return mav;
    }

    @RequestMapping("addSupplier")
    @ResponseBody
    public String addSupplier(@RequestBody Supplier supplier) {
        JSONObject res = new JSONObject();
        try {
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
     * @param supplier 供应商
     * @return 请求结果
     */
    @RequestMapping("submitSupplier")
    @ResponseBody
    public String submitSupplier(@RequestBody Supplier supplier) {
        Supplier resultSupplier = supplierService.getBySupplierId(supplier.getSupplierId());
        if (resultSupplier == null) {
            supplier.setCheckState(CheckState.Examining);
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

    @RequestMapping("updateSupplier")
    public ModelAndView updateSupplier(Supplier supplier) {
        ModelAndView mav = new ModelAndView();

        supplierService.update(supplier);

        return null;
    }

    @RequestMapping("getSupplier")
    public ModelAndView getSupplier(String keyword) {
        ModelAndView mav = new ModelAndView();

        return mav;
    }
}
