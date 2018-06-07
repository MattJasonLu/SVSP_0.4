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
        mav.setViewName("jsp/showSupplier.jsp");
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
     * 查询供应商信息
     * @param keyword 关键字
     * @return 供应商信息列表
     */
    @RequestMapping("searchSupplier")
    @ResponseBody
    public String searchSupplier(String keyword) {
        try {
            List<Supplier> supplierList = supplierService.getByKeyword(keyword);
            JSONArray array = JSONArray.fromArray(supplierList.toArray(new Supplier[supplierList.size()]));
            // 返回结果
            return array.toString();
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject res = new JSONObject();
            res.put("status", "fail");
            res.put("message", "操作失败");
            return res.toString();
        }
    }
}
