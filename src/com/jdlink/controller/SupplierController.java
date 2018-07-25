package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Supplier;
import com.jdlink.service.SupplierService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.NumberFormat;
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

    /**
     * 根据编号查找供应商
     */
    @RequestMapping("listSupplierById")
    @ResponseBody
    public String listSupplierById(String id){
     Supplier supplier=supplierService.getBySupplierId(id);
     JSONObject res=JSONObject.fromBean(supplier);
     return res.toString();
    }
    /**
     * 根据公司名称查找供应商
     */
    @RequestMapping("getSuppier")
    @ResponseBody
    public String getSuppier(String companyName){
        Supplier supplier=supplierService.getByName(companyName);
        JSONObject res=JSONObject.fromBean(supplier);
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
     * 启用供应商
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

    /**
     * 获取目前的客户编号
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
}
