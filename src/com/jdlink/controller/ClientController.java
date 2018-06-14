package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.service.ClientService;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.NumberFormat;
import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
@Controller
public class ClientController {

    @Autowired
    ClientService clientService;

    /**
     * 新增客户
     * @param client 客户
     * @return 成功与否
     */
    @RequestMapping("addClient")
    @ResponseBody
    public String addClient(@RequestBody Client client) {
        JSONObject res = new JSONObject();
        try {
            // TODO: 同名文件上传会出现问题，修改为随机名称
            if (client.getMaterialAttachment() != null && !client.getMaterialAttachment().getOriginalFilename().equals("")) {
                String materialAttachmentName = client.getMaterialAttachment().getOriginalFilename();
                client.setMaterialAttachmentUrl(materialAttachmentName);
                File materialAttachment = new File("file/" + materialAttachmentName);
                materialAttachment.getParentFile().mkdirs();
                // 若文件存在则删除
                if (materialAttachment.exists()) materialAttachment.delete();
                client.getMaterialAttachment().transferTo(materialAttachment);
            }

            if (client.getProcessAttachment() != null && !client.getProcessAttachment().getOriginalFilename().equals("")) {
                String processAttachmentName = client.getProcessAttachment().getOriginalFilename();
                client.setProcessAttachmentUrl(processAttachmentName);
                File processAttachment = new File("file/" + processAttachmentName);
                processAttachment.getParentFile().mkdirs();
                if (processAttachment.exists()) processAttachment.delete();
                client.getProcessAttachment().transferTo(processAttachment);
            }
        } catch (IOException e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "创建客户失败，请完善信息!");
        }
        // TODO: 修改暂时编号（规则未定）
        client.setTemporaryId(RandomUtil.getRandomFileName());
        // 启用账户
        client.setClientState(ClientState.Enabled);

        try {
            clientService.add(client);
            res.put("status", "success");
            res.put("message", "备案成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "信息输入错误，请重试!");
        }
        return res.toString();
    }

    /**
     * 保存客户
     * @param client 客户
     * @return 成功与否
     */
    @RequestMapping("saveClient")
    @ResponseBody
    public String saveClient(@RequestBody Client client) {
        Client resultClient = clientService.getByClientId(client.getClientId());
        if (resultClient == null) {
            // 审核状态为待提交
            client.setCheckState(CheckState.ToSubmit);
            return addClient(client);
        } else {
            JSONObject res = new JSONObject();
            try {
                clientService.update(client);
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
     * 提交客户
     * @param client 客户
     * @return 成功与否
     */
    @RequestMapping("submitClient")
    @ResponseBody
    public String submitClient(@RequestBody Client client) {
        // 审核状态为审批中
        client.setCheckState(CheckState.Examining);
        Client resultClient = clientService.getByClientId(client.getClientId());
        if (resultClient == null) {
            return addClient(client);
        } else {
            JSONObject res = new JSONObject();
            try {
                clientService.update(client);
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

    @RequestMapping("submitClientById")
    @ResponseBody
    public String submitClientById(String clientId) {
        JSONObject res = new JSONObject();
        try {
            // 提交客户信息
            clientService.setCheckStateExamining(clientId);
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
     * 取出所有客户对象
     * @return 客户列表集合对象
     */
    @RequestMapping("listClient")
    @ResponseBody
    public String listClient(Page page) {
        // 取出所有客户
        List<Client> clientList = clientService.list(page);
        // 计算最后页
        page.caculateLast(clientService.total());
        JSONArray array = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
        // 返回结果
        return array.toString();
    }

    @RequestMapping("getAllClients")
    @ResponseBody
    public String getAllClients() {
        List<Client> clientList = clientService.list();
        JSONArray array = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
        return array.toString();
    }

    @RequestMapping("searchClient")
    @ResponseBody
    public String searchClient(String keyword) {
        List<Client> clientList = clientService.getByKeyword(keyword);
        JSONArray array = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
        // 返回结果
        return array.toString();
    }

    /**
     * 取出下拉框列表
     * @return 下拉框json数据对象
     */
    @RequestMapping("getSelectedList")
    @ResponseBody
    public String getSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        JSONArray array1 = JSONArray.fromArray(EnterpriseType.values());
        res.put("enterpriseTypeStrList", array1);
        JSONArray array2 = JSONArray.fromArray(OperationMode.values());
        res.put("operationModeStrList", array2);
        JSONArray array3 = JSONArray.fromArray(OperationType.values());
        res.put("operationTypeStrList", array3);
        JSONArray array4 = JSONArray.fromArray(ContingencyPlan.values());
        res.put("contingencyPlanStrList", array4);
        JSONArray array5 = JSONArray.fromArray(OperationRecord.values());
        res.put("operationRecordStrList", array5);
        JSONArray array6 = JSONArray.fromArray(ApplicationStatus.values());
        res.put("applicationStatusStrList", array6);
        JSONArray array7 = JSONArray.fromArray(SupplierType.values());
        res.put("supplierTypeStrList", array7);
        return res.toString();
    }

    @RequestMapping("getClient")
    @ResponseBody
    public String getClient(String id) {
        Client client = clientService.getByClientId(id);
        JSONObject res = JSONObject.fromBean(client);
        return res.toString();
    }

    @RequestMapping("enableClient")
    @ResponseBody
    public String enableClient(String clientId) {
        JSONObject res = new JSONObject();
        try {
            // 启用用户
            clientService.enableState(clientId);
            res.put("status", "success");
            res.put("message", "操作成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "操作失败");
        }
        return res.toString();
    }

    @RequestMapping("disableClient")
    @ResponseBody
    public String disableClient(String clientId) {
        JSONObject res = new JSONObject();
        try {
            // 禁用用户
            clientService.disableState(clientId);
            res.put("status", "success");
            res.put("message", "操作成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "操作失败");
        }
        return res.toString();
    }

    @RequestMapping("deleteClient")
    @ResponseBody
    public String deleteClient(String clientId) {
        JSONObject res = new JSONObject();
        try {
            // 删除用户
            clientService.delete(clientId);
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
     * 修改客户，显示客户信息
     * @param id 客户编号
     * @return 客户对象数据
     */
    @RequestMapping("showClient")
    @ResponseBody
    public ModelAndView showClient(String id) {
        ModelAndView mav = new ModelAndView();
        Client client = clientService.getByClientId(id);
        mav.addObject("client", client);
        mav.setViewName("jsp/showClient.jsp");
        return mav;
    }

    /**
     * 获取目前的客户编号
     * @return
     */
    @RequestMapping("getCurrentClientId")
    @ResponseBody
    public String getCurrentClientId() {
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
        int index = clientService.total();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (clientService.getByClientId(id) != null);
        JSONObject res = new JSONObject();
        res.put("clientId", id);
        return res.toString();
    }

    @RequestMapping("client/getClientBySession")
    @ResponseBody
    public String getClientBySession(HttpSession session) {
        JSONObject res = new JSONObject();
        try {
            User user = (User) session.getAttribute("user");
            String clientId = user.getClientId();
            Client client = clientService.getByClientId(clientId);
            JSONObject data = JSONObject.fromBean(client);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取客户信息成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取客户信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }
}
