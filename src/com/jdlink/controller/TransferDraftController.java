package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.TransferDraft;
import com.jdlink.service.ClientService;
import com.jdlink.service.SupplierService;
import com.jdlink.service.TransferDraftService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.NumberFormat;
import java.util.List;

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

    /**
     * 获取目前的编号
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
     * @param transferDraft 转移联单对象
     * @return 成功与否
     */
    @RequestMapping("addTransferDraft")
    @ResponseBody
    public String addTransferDraft(@RequestBody TransferDraft transferDraft) {
        JSONObject res = new JSONObject();
        try {
            // 更新三个公司的编号
            String produceCompanyId = clientService.getByName(transferDraft.getProduceCompany().getCompanyName()).getClientId();
            transferDraft.getProduceCompany().setClientId(produceCompanyId);
            String transportCompanyId = supplierService.getByName(transferDraft.getTransportCompany().getCompanyName()).getSupplierId();
            transferDraft.getTransportCompany().setSupplierId(transportCompanyId);
            String acceptCompanyId = clientService.getByName(transferDraft.getAcceptCompany().getCompanyName()).getClientId();
            transferDraft.getAcceptCompany().setClientId(acceptCompanyId);
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
     * 作废转移联单
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
     * 获取联单数据
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
     * @return 总记录数
     */
    @RequestMapping("totalTransferDraftRecord")
    @ResponseBody
    public int totalTransferDraftRecord(){
        try {
            return transferDraftService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取查询记录数
     * @return 查询记录数
     */
    @RequestMapping("searchTransferDraftTotal")
    @ResponseBody
    public int searchTransferDraftTotal(@RequestBody TransferDraft transferDraft){
        try {
            return transferDraftService.searchCount(transferDraft);
        }catch(Exception e){
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

}
