package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Dictionary.*;
import com.jdlink.domain.Inventory.InboundOrder;
import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.service.*;
import com.jdlink.util.DBUtil;
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

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
@Controller
public class ClientController {

    @Autowired
    ClientService clientService;
    @Autowired
    SalesmanService salesmanService;
    @Autowired
    SampleInformationService sampleInformationService;
    @Autowired
    SampleInfoWareHouseService sampleInfoWareHouseService;
    @Autowired
    ContractService contractService;
    @Autowired
    OutboundOrderService outboundOrderService;
    @Autowired
    InboundService inboundService;
    @Autowired
    UserService userService;

    /**
     * 新增客户
     * @param client 客户
     * @return 成功与否
     */
    @RequestMapping("addClient")
    @ResponseBody
    public String addClient(@RequestBody Client client, HttpSession session) {
        JSONObject res = new JSONObject();
        // 启用账户
        client.setClientState(ClientState.Enabled);
        ClientStateItem clientStateItem = new ClientStateItem();
        clientStateItem.setDataDictionaryItemId(89);
        client.setClientStateItem(clientStateItem);
        client.setClientType(ClientType.EnquiryClient);
        ClientTypeItem clientTypeItem = new ClientTypeItem();
        clientTypeItem.setDataDictionaryItemId(91);
        client.setClientTypeItem(clientTypeItem);
        CheckStateItem checkStateItem = new CheckStateItem();
        checkStateItem.setDataDictionaryItemId(64);
        client.setCheckStateItem(checkStateItem);
        User user = userService.getCurrentUserInfo(session);
        if (user != null) {
            client.setCreator(user.getName());
        }
        client.setCreateTime(new Date());
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
    @RequestMapping("saveClient")//保存客户
    @ResponseBody
    public String saveClient(@RequestBody Client client, HttpSession session) {
        Client resultClient = clientService.getByClientId(client.getClientId());
        if (resultClient == null) {
            // 审核状态为待提交
            client.setCheckState(CheckState.ToSubmit);
            CheckStateItem checkStateItem = new CheckStateItem();
            checkStateItem.setDataDictionaryItemId(64);
            client.setCheckStateItem(checkStateItem);
            return addClient(client, session);
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
    public String submitClient(@RequestBody Client client, HttpSession session) {
        // 审核状态为审批中
        client.setCheckState(CheckState.Examining);
        CheckStateItem checkStateItem = new CheckStateItem();
        checkStateItem.setDataDictionaryItemId(63);
        client.setCheckStateItem(checkStateItem);
        Client resultClient = clientService.getByClientId(client.getClientId());
        if (resultClient == null) {
            return addClient(client, session);
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

    @RequestMapping("saveFiles")
    @ResponseBody
    public String saveFiles(String clientId, MultipartFile materialAttachment, MultipartFile processAttachment) {
        JSONObject res = new JSONObject();
        try {
            if (materialAttachment != null || processAttachment != null) {
                Client client = new Client();
                client.setClientId(clientId);
                // 若文件夹不存在则创建文件夹
                if (materialAttachment != null) {
                    String materialPath = "Files/EIA/Material";
                    File materialDir = new File(materialPath);
                    if (!materialDir.exists()) {
                        materialDir.mkdirs();
                    }
                    String materialName = clientId + "-" + materialAttachment.getOriginalFilename();
                    String materialFilePath = materialPath + "/" + materialName;
                    File materialFile = new File(materialFilePath);
                    materialAttachment.transferTo(materialFile);
                    client.setMaterialAttachmentUrl(materialFilePath);
                }
                if (processAttachment != null) {
                    String processPath = "Files/EIA/Process";
                    File processDir = new File(processPath);
                    if (!processDir.exists()) {
                        processDir.mkdirs();
                    }
                    // 获取文件名字
                    String processName = clientId + "-" + processAttachment.getOriginalFilename();
                    String processFilePath = processPath + "/" + processName;
                    File processFile = new File(processFilePath);
                    processAttachment.transferTo(processFile);
                    // 更新客户保存文件的路径
                    client.setProcessAttachmentUrl(processFilePath);
                }
                clientService.setFilePath(client);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return res.toString();
    }

    @RequestMapping("submitClientById")//提交客户备案
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
    public String listClient() {
        try {
            // 取出所有客户
            List<Client> clientList = clientService.list();
            // 计算最后页
//            page.caculateLast(clientService.total());
            JSONArray array = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
            // 返回结果
            return array.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 取出所有客户对象
     * @return 客户列表集合对象
     */
    @RequestMapping("listAllocatedClient")
    @ResponseBody
    public String listAllocatedClient(Page page) {
        try {
            // 取出所有客户
            List<Client> clientList = clientService.listAllocated();
            // 计算最后页
            page.caculateLast(clientService.total());
            JSONArray array = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
            // 返回结果
            return array.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("loadPageClientList")
    @ResponseBody
    public String loadPageClientList(@RequestBody Page page){
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<Client> clientList = clientService.list(page);
            JSONArray data = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
            // 返回结果
            res.put("data",data);
            res.put("status","success");
            res.put("message","数据获取成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","数据获取失败！");
        }
        return res.toString();
    }

    /**
     * 获取总记录数
     * @return
     */
    @RequestMapping("totalClientSalesmanRecord")
    @ResponseBody
    public int totalRecord(){
        try {
            return clientService.total();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 取出所有客户对象
     * @return 客户列表集合对象
     */
    @RequestMapping("listUnallocatedClient")
    @ResponseBody
    public String listUnallocatedClient(Page page) {
        try {
            // 取出所有客户
            List<Client> clientList = clientService.listUnallocated();
            // 计算最后页
            page.caculateLast(clientService.total());
            JSONArray array = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
            // 返回结果
            return array.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("getAllClients")
    @ResponseBody
    public String getAllClients() {
        try {
            List<Client> clientList = clientService.list();
            JSONArray array = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
            return array.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("searchClient")
    @ResponseBody
    public String searchClient(@RequestBody Client client) {
        JSONObject res = new JSONObject();
        try {
            List<Client> clientList = clientService.search(client);
            JSONArray data = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
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

    @RequestMapping("searchClientData")
    @ResponseBody
    public String searchClientData(@RequestBody Client client) {
        JSONObject res = new JSONObject();
        try {
            // 获取企业数据
            List<Client> clientList = clientService.search(client);
            JSONArray data = JSONArray.fromArray(clientList.toArray(new Client[clientList.size()]));
            Client client1 = new Client();
            if(clientList.size() > 0){
                client1 = clientList.get(0);
            }
            // 获取企业的接运单数据
            List<SampleInformation> sampleInformationList = sampleInformationService.getSampleInfoByClientId(client1.getClientId());//市场
            List<SampleInformation> sampleInformationList1 = sampleInfoWareHouseService.getSampleInfoByClientId(client1.getClientId());//仓储
            for(SampleInformation sampleInformation : sampleInformationList1){
                sampleInformation.setSignOrderId("仓储部送样登记");
                sampleInformationList.add(sampleInformation);
            }
            JSONArray sampleInfoList = JSONArray.fromArray(sampleInformationList.toArray(new SampleInformation[sampleInformationList.size()]));
            // 获取企业的有效合同数据
            List<Contract> contractList = contractService.getContractByClientId(client1.getClientId());
            JSONArray contractInfo = JSONArray.fromArray(contractList.toArray(new Contract[contractList.size()]));
            // 派车

            // 获取危废接收数据（危废入库）
            List<InboundOrderItem> inboundOrderItemList = inboundService.getInboundOrderItemByClientId(client1.getClientId());
            JSONArray inboundOrderItemInfo = JSONArray.fromArray(inboundOrderItemList.toArray(new InboundOrderItem[inboundOrderItemList.size()]));
            // 获取危废处置数据 （危废出库）
            List<OutboundOrder> outboundOrderList = outboundOrderService.getOutBoundOrderByClientId(client1.getClientId());
            JSONArray outboundOrderInfo = JSONArray.fromArray(outboundOrderList.toArray(new OutboundOrder[outboundOrderList.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("clientList", data);
            res.put("sampleInfoList", sampleInfoList);
            res.put("contractList", contractInfo);
            res.put("inboundOrderItemList",inboundOrderItemInfo);
            res.put("outboundOrderList",outboundOrderInfo);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    @RequestMapping("searchClientTotal")
    @ResponseBody
    public int searchClientTotal(@RequestBody Client client) {
        try {
            return clientService.searchCount(client);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
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
        JSONArray array8 = JSONArray.fromArray(TicketRate1.values());
        res.put("ticketRate1StrList", array8);
        return res.toString();
    }

    @RequestMapping("getClientSeniorSelectedList")
    @ResponseBody
    public String getSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        JSONArray checkStateList = JSONArray.fromArray(CheckState.values());
        res.put("checkStateList", checkStateList);
        JSONArray clientStateList = JSONArray.fromArray(ClientState.values());
        res.put("clientStateList", clientStateList);
        JSONArray applicationStatusList = JSONArray.fromArray(ApplicationStatus.values());
        res.put("applicationStatusList", applicationStatusList);
        JSONArray clientTypeList = JSONArray.fromArray(ClientType.values());
        res.put("clientTypeList", clientTypeList);
        String[] salesmenStatus = new String[]{"已分配","未分配"};
        JSONArray salesmenStatusList = JSONArray.fromArray(salesmenStatus);
        res.put("salesmenStatusList", salesmenStatusList);
        return res.toString();
    }

    //业务员分配
    @RequestMapping("getClient")
    @ResponseBody
    public String getClient(String id) {
        Client client = clientService.getByClientId(id);//获得用户
        JSONObject res = JSONObject.fromBean(client);
        return res.toString();
    }
    @RequestMapping("getClient1")
    @ResponseBody
    public String getClient1(String[] clientArray) {
        for (String s:clientArray) {
            System.out.println(s);
        }

       // JSONObject res = JSONObject.fromBean(client);
       //return res.toString();
        return  null;
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
     * 审批通过客户
     * @param clientId 客户编号
     * @return 成功与否
     */
    @RequestMapping("passClient")
    @ResponseBody
    public String passClient(String clientId,String advice) {
        JSONObject res = new JSONObject();
        try {
            // 设置客户审批状态为已完成
            clientService.setCheckStateFinished(clientId,advice);
            res.put("status", "success");
            res.put("message", "客户信息审批通过");
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "客户信息审批未通过");
        }
        return res.toString();
    }

    /**
     * 驳回客户
     * @param clientId 客户编号
     * @return 成功与否
     */
    @RequestMapping("backClient")
    @ResponseBody
    public String backClient(String clientId,String advice) {
        JSONObject res = new JSONObject();
        try {
            // 设置客户审批状态为已驳回
            clientService.setCheckStateBacked(clientId,advice);
            res.put("status", "success");
            res.put("message", "客户信息驳回成功");
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "客户信息驳回失败");
        }
        return res.toString();
    }

    @RequestMapping("assignSalesman")//分配业务员到客户属性中
    @ResponseBody
    public String assignSalesman(@RequestBody Client client) {
        JSONObject res = new JSONObject();
        List<String> list=new ArrayList<>();
        list.add(client.getClientId());//获得有用的用户编号
        try {
            clientService.assignSalesman(client);
            res.put("status", "success");
            res.put("message", "操作成功!");
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "操作失败!");
        }
        return res.toString();
    }

    /**
     * 获取目前的客户编号
     * @return
     */
    @RequestMapping("getCurrentClientId")
    @ResponseBody
    public String getCurrentClientId() {
        String id = clientService.getCurrentId();
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
            if (client == null) throw new Exception("客户信息为空");
            JSONObject data = JSONObject.fromBean(client);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取客户信息成功");
        } catch (Exception e) {
//            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取客户信息失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    @RequestMapping("importClientExcel")
    @ResponseBody
    public String importClientExcel(MultipartFile excelFile,String tableName,String id){
        JSONObject res = new JSONObject();
        try {
//            DBUtil db=new DBUtil();
//            db.importExcel(excelFile, tableName, id);
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            for (int i = 1; i < data.length; i++) {
                Client client = new Client();
                // 设置编号
                client.setClientId(clientService.getCurrentId());
                client.setClientType(ClientType.EnquiryClient);
                ClientTypeItem clientTypeItem = new ClientTypeItem();
                clientTypeItem.setDataDictionaryItemId(91);
                client.setClientTypeItem(clientTypeItem);
                client.setCheckState(CheckState.Finished);
                CheckStateItem checkStateItem = new CheckStateItem();
                checkStateItem.setDataDictionaryItemId(65);
                client.setCheckStateItem(checkStateItem);
                client.setClientState(ClientState.Enabled);
                ClientStateItem clientStateItem = new ClientStateItem();
                clientStateItem.setDataDictionaryItemId(89);
                client.setClientStateItem(clientStateItem);
                client.setApplicationStatus(ApplicationStatus.Declared);
                ApplicationStatusItem applicationStatusItem = new ApplicationStatusItem();
                applicationStatusItem.setDataDictionaryItemId(47);
                client.setApplicationStatusItem(applicationStatusItem);
                client.setCompanyName(data[i][0].toString());
                // 三证合一
                client.setOrganizationCode(data[i][1].toString());
                client.setLicenseCode(data[i][1].toString());
                client.setTaxNumber(data[i][1].toString());
                client.setRepresentative(data[i][2].toString());
                client.setPostCode(data[i][3].toString());

                // 设置企业类型
                switch (data[i][4].toString()) {
                    case "国有企业":
                        client.setEnterpriseType(EnterpriseType.StateOwnedEnterprises);
                        EnterpriseTypeItem enterpriseTypeItem1 = new EnterpriseTypeItem();
                        enterpriseTypeItem1.setDataDictionaryItemId(108);
                        client.setEnterpriseTypeItem(enterpriseTypeItem1);
                        break;
                    case "集体企业":
                        client.setEnterpriseType(EnterpriseType.CollectiveEnterprise);
                        EnterpriseTypeItem enterpriseTypeItem2 = new EnterpriseTypeItem();
                        enterpriseTypeItem2.setDataDictionaryItemId(109);
                        client.setEnterpriseTypeItem(enterpriseTypeItem2);
                        break;
                    case "国有企业改组的股份合作企业":
                        client.setEnterpriseType(EnterpriseType.JointStockByStateOwnedEnterprises);
                        EnterpriseTypeItem enterpriseTypeItem3 = new EnterpriseTypeItem();
                        enterpriseTypeItem3.setDataDictionaryItemId(170);
                        client.setEnterpriseTypeItem(enterpriseTypeItem3);
                        break;
                    case "集体企业改组的股份合作企业":
                        client.setEnterpriseType(EnterpriseType.JointStockByCollectiveEnterprise);
                        EnterpriseTypeItem enterpriseTypeItem4 = new EnterpriseTypeItem();
                        enterpriseTypeItem4.setDataDictionaryItemId(171);
                        client.setEnterpriseTypeItem(enterpriseTypeItem4);
                        break;
                    case "有限责任公司":
                        client.setEnterpriseType(EnterpriseType.LimitedLiabilityCompany);
                        EnterpriseTypeItem enterpriseTypeItem5 = new EnterpriseTypeItem();
                        enterpriseTypeItem5.setDataDictionaryItemId(110);
                        client.setEnterpriseTypeItem(enterpriseTypeItem5);
                        break;
                    case "私营企业":
                        client.setEnterpriseType(EnterpriseType.ThePrivateEnterprise);
                        EnterpriseTypeItem enterpriseTypeItem6 = new EnterpriseTypeItem();
                        enterpriseTypeItem6.setDataDictionaryItemId(111);
                        client.setEnterpriseTypeItem(enterpriseTypeItem6);
                    default:
                        break;
                }
                // 设置经营方式
                switch (data[i][5].toString()) {
                    case "生产":
                        client.setOperationMode(OperationMode.Production);
                        OperationModelItem operationModelItem1 = new OperationModelItem();
                        operationModelItem1.setDataDictionaryItemId(114);
                        client.setOperationModelItem(operationModelItem1);
                        break;
                    case "综合":
                        client.setOperationMode(OperationMode.Comprehensive);
                        OperationModelItem operationModelItem2 = new OperationModelItem();
                        operationModelItem2.setDataDictionaryItemId(112);
                        client.setOperationModelItem(operationModelItem2);
                        break;
                    case "收集":
                        client.setOperationMode(OperationMode.Collect);
                        OperationModelItem operationModelItem3 = new OperationModelItem();
                        operationModelItem3.setDataDictionaryItemId(113);
                        client.setOperationModelItem(operationModelItem3);
                        break;
                    default:
                        break;
                }
                // 经营单位类别
                switch (data[i][6].toString()) {
                    case "利用处置危险废物及医疗废物":
                        client.setOperationType(OperationType.WasteAndClinical);
                        OperationTypeItem operationTypeItem1 = new OperationTypeItem();
                        operationTypeItem1.setDataDictionaryItemId(117);
                        client.setOperationTypeItem(operationTypeItem1);
                        break;
                    case "只从事收集活动":
                        client.setOperationType(OperationType.CollectOnly);
                        OperationTypeItem operationTypeItem2 = new OperationTypeItem();
                        operationTypeItem2.setDataDictionaryItemId(118);
                        client.setOperationTypeItem(operationTypeItem2);
                        break;
                    case "只利用处置危险废物":
                        client.setOperationType(OperationType.WasteOnly);
                        OperationTypeItem operationTypeItem3 = new OperationTypeItem();
                        operationTypeItem3.setDataDictionaryItemId(119);
                        client.setOperationTypeItem(operationTypeItem3);
                        break;
                    case "只处置医疗废物":
                        client.setOperationType(OperationType.ClinicalOnly);
                        OperationTypeItem operationTypeItem4 = new OperationTypeItem();
                        operationTypeItem4.setDataDictionaryItemId(120);
                        client.setOperationTypeItem(operationTypeItem4);
                        break;
                    default:
                        break;
                }
                // 事故防范和应急预案
                switch (data[i][7].toString()) {
                    case "制定并确定了应急协调人":
                        client.setContingencyPlan(ContingencyPlan.Identify);
                        ContingencyPlanItem contingencyPlanItem1 = new ContingencyPlanItem();
                        contingencyPlanItem1.setDataDictionaryItemId(167);
                        client.setContingencyPlanItem(contingencyPlanItem1);
                        break;
                    case "已制定":
                        client.setContingencyPlan(ContingencyPlan.Developed);
                        ContingencyPlanItem contingencyPlanItem2 = new ContingencyPlanItem();
                        contingencyPlanItem2.setDataDictionaryItemId(168);
                        client.setContingencyPlanItem(contingencyPlanItem2);
                        break;
                    case "未制定":
                        client.setContingencyPlan(ContingencyPlan.Undeveloped);
                        ContingencyPlanItem contingencyPlanItem3 = new ContingencyPlanItem();
                        contingencyPlanItem3.setDataDictionaryItemId(169);
                        client.setContingencyPlanItem(contingencyPlanItem3);
                        break;
                    default:
                        break;
                }
                // 建立危废经营记录情况
                switch (data[i][8].toString()) {
                    case "已建立":
                        client.setOperationRecord(OperationRecord.Established);
                        OperationTypeItem operationTypeItem1 = new OperationTypeItem();
                        operationTypeItem1.setDataDictionaryItemId(115);
                        client.setOperationTypeItem(operationTypeItem1);
                        break;
                    case "未建立":
                        client.setOperationRecord(OperationRecord.Unestablished);
                        OperationTypeItem operationTypeItem2 = new OperationTypeItem();
                        operationTypeItem2.setDataDictionaryItemId(116);
                        client.setOperationTypeItem(operationTypeItem2);
                        break;
                    default:
                        break;
                }
                client.setLocation(data[i][9].toString());
                client.setStreet(data[i][10].toString());
                client.setProcessDesp(data[i][11].toString().equals("null") ? null : data[i][11].toString());
                client.setContactName(data[i][12].toString());
                client.setMobile(data[i][14].toString());
                client.setPhone(data[i][13].toString().equals("null") ? client.getMobile() : data[i][13].toString());
                client.setEmail(data[i][15].toString());
                client.setIndustry(data[i][16].toString());
                client.setProduct(data[i][17].toString());
                client.setBankName(data[i][18].toString());
                client.setBankAccount(data[i][19].toString());
                // 开票税率
                switch (data[i][20].toString()) {
                    case "增值税专用发票16%":
                        client.setTicketType(TicketRate1.Rate1);
                        TicketRateItem ticketRateItem1 = new TicketRateItem();
                        ticketRateItem1.setDataDictionaryItemId(132);
                        client.setTicketRateItem(ticketRateItem1);
                        break;
                    case "增值税专用发票3%":
                        client.setTicketType(TicketRate1.Rate2);
                        TicketRateItem ticketRateItem2 = new TicketRateItem();
                        ticketRateItem2.setDataDictionaryItemId(133);
                        client.setTicketRateItem(ticketRateItem2);
                        break;
                    default:
                        break;
                }
                // 是否为北控
                client.setIsDisposal(data[i][21].toString().equals("是"));
                clientService.add(client);
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！"+e.getMessage());
        }
        return res.toString();

    }
   /*取出没有分配到的业务员*/
    @RequestMapping("nearestClient")
    @ResponseBody
    public  String nearestClient(String salesmanId, String selectedValues){
        JSONArray jsonArray = JSONArray.fromObject(selectedValues);
        //1找到所有的list
        List<String> list = JSONArray.toList(jsonArray, String.class);// 过时方法 小
        //1找到所有的list1
        List<String> list1=salesmanService.getClientBySalesId(salesmanId);//大
        list1.removeAll(list);//将需要的客户编号去除
        for(int i=0;i<list1.size();i++){
           clientService.deleteSalesId(list1.get(i));
    }
        return null;
    }

//    @RequestMapping("getSalesmanIdByName1")
//    @ResponseBody
//    public String getSalesmanIdByName(String name){
//        JSONObject res = new JSONObject();
//        String id = clientService.getSalesmanIdByName(name);
//        res.put("id",id);
//        return res.toString();
//    }
}
