package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Dictionary.SecondaryCategory;
import com.jdlink.domain.Inventory.*;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.IngredientsIn;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.domain.Produce.ProcessWay;
import com.jdlink.service.*;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import com.sun.xml.internal.bind.v2.runtime.reflect.Lister;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.text.Normalizer;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by matt on 2018/8/22.
 * DoubleClickTo 666
 */
@Controller
public class InboundController {

    @Autowired
    InboundService inboundService;
    @Autowired
    ClientService clientService;
    @Autowired
    QuotationService quotationService;
    @Autowired
    LaboratoryTestService laboratoryTestService;
    @Autowired
    WareHouseService wareHouseService;
    @Autowired
    SecondaryCategoryService secondaryCategoryService;
    @Autowired
    UserService userService;

    /**
     * 列出所有入库计划单信息
     *
     * @return 入库计划单列表
     */
    @RequestMapping("listInboundPlanOrder")
    @ResponseBody
    public String listInboundPlanOrder(Page page, InboundPlanOrder inboundPlanOrder) {
        JSONObject res = new JSONObject();
        try {
            List<InboundPlanOrder> inboundPlanOrderList = inboundService.listInboundPlanOrder(inboundPlanOrder, page);
            JSONArray data = JSONArray.fromArray(inboundPlanOrderList.toArray(new InboundPlanOrder[inboundPlanOrderList.size()]));
//            JSONArray data = JSONArray.fromArray(inboundPlanOrderList.toArray(new InboundPlanOrder[inboundPlanOrderList.size()]));
//            for (int i = 0; i < inboundPlanOrderList.size(); i++) {
//                InboundPlanOrder order = inboundPlanOrderList.get(i);
//                // 通过客户编码和危废编码获取价格
//                String clientId = order.getProduceCompany().getClientId();
//                String wastesCode = order.getWastes().getWastesId();
//                QuotationItem quotationItem = quotationService.getQuotationByWastesCodeAndClientId(wastesCode, clientId);
//                // 获取价格，如果价格存在则存入数据
//                if (quotationItem != null) {
//                    float unitPriceTax = quotationItem.getUnitPriceTax();
//                    data.getJSONObject(i).put("unitPriceTax", unitPriceTax);
//                }
//            }
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

    @RequestMapping("countInboundPlanOrder")
    @ResponseBody
    public String countInboundPlanOrder(InboundPlanOrder inboundPlanOrder) {
        JSONObject res = new JSONObject();
        try {
            int count = inboundService.countInboundPlanOrder(inboundPlanOrder);
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", count);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

    @RequestMapping("getInboundPlanOrder")
    @ResponseBody
    public String getInboundPlanOrder(String inboundPlanOrderId) {
        JSONObject res = new JSONObject();
        try {
            InboundPlanOrder inboundPlanOrder = inboundService.getInboundPlanOrder(inboundPlanOrderId);
            JSONObject data = JSONObject.fromBean(inboundPlanOrder);
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

    @RequestMapping("addInboundPlanOrder")
    @ResponseBody
    public String addInboundPlanOrder(@RequestBody InboundPlanOrder inboundPlanOrder) {
        JSONObject res = new JSONObject();
        try {
            // 设置入库单的编号
            inboundPlanOrder.setInboundPlanOrderId(inboundService.getInboundPlanOrderId());
            // 设置状态
            inboundPlanOrder.setCheckState(CheckState.NewBuild);
            inboundService.addInboundPlanOrder(inboundPlanOrder);
            res.put("status", "success");
            res.put("message", "增加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加失败");
        }
        return res.toString();
    }

    /**
     * 作废入库计划单
     * @param inboundPlanOrderId 入库计划单编号
     * @return 成功与否
     */
    @RequestMapping("setInboundPlanOrderInvalid")
    @ResponseBody
    public String setInboundPlanOrderInvalid(String inboundPlanOrderId) {
        JSONObject res = new JSONObject();
        try {
            inboundService.setInboundPlanOrderInvalid(inboundPlanOrderId);
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
     * 确认收样
     * @param inboundPlanOrderId 入库计划单号
     * @return 成功与否
     */
    @RequestMapping("setInboundPlanOrderSignIn")
    @ResponseBody
    public String setInboundPlanOrderSignIn(String inboundPlanOrderId) {
        JSONObject res = new JSONObject();
        try {
            inboundService.setInboundPlanOrderSignIn(inboundPlanOrderId);
            res.put("status", "success");
            res.put("message", "收样成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "收样失败");
        }
        return res.toString();
    }

    /**
     * 拒收入库计划单
     * @param inboundPlanOrder 参数
     * @return 结果
     */
    @RequestMapping("setInboundPlanOrderReject")
    @ResponseBody
    public String setInboundPlanOrderReject(InboundPlanOrder inboundPlanOrder) {
        JSONObject res = new JSONObject();
        try {
            inboundService.setInboundPlanOrderReject(inboundPlanOrder);
            res.put("status", "success");
            res.put("message", "拒收成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "拒收失败");
        }
        return res.toString();
    }

    /**
     * 查询入库计划单列表
     *
     * @param inboundPlanOrder 入库计划单数据
     * @return 查询结果
     */
    @RequestMapping("searchInboundPlanOrder")
    @ResponseBody
    public String searchInboundPlanOrder(@RequestBody InboundPlanOrder inboundPlanOrder) {
        JSONObject res = new JSONObject();
        try {
            List<InboundPlanOrder> inboundPlanOrderList = inboundService.searchInboundPlanOrder(inboundPlanOrder);
            JSONArray data = JSONArray.fromArray(inboundPlanOrderList.toArray(new InboundPlanOrder[inboundPlanOrderList.size()]));
            // 获取入库单列表
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
     * 增加入库单
     *
     * @param inboundOrder
     * @return
     */
    @RequestMapping("addInboundOrder")
    @ResponseBody
    public String addInboundOrder(@RequestBody InboundOrder inboundOrder, HttpSession session) {
        JSONObject res = new JSONObject();
        try {
            // 设置编号
            inboundOrder.setInboundOrderId(inboundService.getInboundOrderId());
            // 设置记录状态
            inboundOrder.setRecordState(RecordState.Usable);
            // 设置审核状态
            inboundOrder.setCheckState(CheckState.NewBuild);
            // 设置入库类别
            inboundOrder.setBoundType(BoundType.WasteInbound);
            // 获取用户登录信息
            User user = (User) session.getAttribute("user");
            if (user != null) {
                // 设置创建人和编辑人
                inboundOrder.setCreatorId(String.valueOf(user.getId()));
                inboundOrder.setModifierId(String.valueOf(user.getId()));
            }
            inboundOrder.setInboundDate(new Date());
            // 设置修改时间
            inboundOrder.setModifyDate(new Date());
            // 设置创建日期为当前日期
            inboundOrder.setCreateDate(new Date());
            // 遍历入库条目
            for (InboundOrderItem inboundOrderItem : inboundOrder.getInboundOrderItemList()) {
                // 设置条目编号为随机八位码
                inboundOrderItem.setInboundOrderItemId(RandomUtil.getRandomEightNumber());
                // 入库单号
                inboundOrderItem.setInboundOrderId(inboundOrder.getInboundOrderId());
                Client produceCompany = clientService.getByName(inboundOrderItem.getProduceCompany().getCompanyName());
                // 设置生产单位
                inboundOrderItem.setProduceCompany(produceCompany);
                // 根据客户编号和危废编码找到化验单中的对应的信息，绑定
                String clientId = produceCompany.getClientId();
                String wastesCode = inboundOrderItem.getWastes().getWastesId();
                LaboratoryTest laboratoryTest = laboratoryTestService.getLaboratoryTestByWastesCodeAndClientId(wastesCode, clientId);
                if (laboratoryTest != null) inboundOrderItem.setLaboratoryTest(laboratoryTest);
            }
            // 增加入库单
            inboundService.addInboundOrder(inboundOrder);
            res.put("status", "success");
            res.put("message", "增加入库单成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加入库单失败");
        }
        return res.toString();
    }

    /**
     * 列出所有入库单
     *
     * @return 入库单列表
     */
    @RequestMapping("listInboundOrder")
    @ResponseBody
    public String listInboundOrder(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 获取入库单列表
            List<InboundOrder> inboundOrderList = inboundService.listInboundOrder(page);
            JSONArray data = JSONArray.fromArray(inboundOrderList.toArray(new InboundOrder[inboundOrderList.size()]));
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
     * 获取查询入库单数量
     *
     * @param inboundOrder 入库单
     * @return 入库单数量
     */
    @RequestMapping("searchInboundOrderCount")
    @ResponseBody
    public int searchInboundOrderCount(@RequestBody InboundOrder inboundOrder) {
        try {
            // 设置入库类别为危废入库
            inboundOrder.setBoundType(BoundType.WasteInbound);
            return inboundService.searchInboundOrderCount(inboundOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询入库单
     *
     * @param inboundOrder 查询参数
     * @return 入库单结果
     */
    @RequestMapping("searchInboundOrder")
    @ResponseBody
    public String searchInboundOrder(@RequestBody InboundOrder inboundOrder) {
        JSONObject res = new JSONObject();
        try {
            // 设置入库类别为危废入库
            inboundOrder.setBoundType(BoundType.WasteInbound);
            List<InboundOrder> inboundOrderList = inboundService.searchInboundOrder(inboundOrder);
            JSONArray data = JSONArray.fromArray(inboundOrderList.toArray(new InboundOrder[inboundOrderList.size()]));
            // 获取入库单列表
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
     * 获取查询入库单数量
     *
     * @param inboundOrder 入库单
     * @return 入库单数量
     */
    @RequestMapping("searchSecondInboundOrderCount")
    @ResponseBody
    public int searchSecondInboundOrderCount(@RequestBody InboundOrder inboundOrder) {
        try {
            // 设置入库类别为次生入库
            inboundOrder.setBoundType(BoundType.SecondaryInbound);
            return inboundService.searchInboundOrderCount(inboundOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询次生入库单
     *
     * @param inboundOrder 查询信息
     * @return 次生入库单查询结果
     */
    @RequestMapping("searchSecondInboundOrder")
    @ResponseBody
    public String searchSecondInboundOrder(@RequestBody InboundOrder inboundOrder) {
        JSONObject res = new JSONObject();
        try {
            // 设置入库类别为次生入库
            inboundOrder.setBoundType(BoundType.SecondaryInbound);
            List<InboundOrder> inboundOrderList = inboundService.searchInboundOrder(inboundOrder);
            JSONArray data = JSONArray.fromArray(inboundOrderList.toArray(new InboundOrder[inboundOrderList.size()]));
            // 获取入库单列表
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
     * 通过日期获取入库单
     *
     * @param date 时间
     * @return 入库单信息
     */
    @RequestMapping("getInboundOrderByDate")
    @ResponseBody
    public String getInboundOrderByDate(Date date) {
        JSONObject res = new JSONObject();
        try {
            JSONObject data = null;
            // 获取入库单列表
            List<InboundOrderItem> inboundOrderList = inboundService.getInboundOrderItemByRange(date, date);
            if (inboundOrderList.size() > 0) {
                InboundOrderItem inboundOrder = inboundOrderList.get(0);
                data = JSONObject.fromBean(inboundOrder);
            }
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
     * 通过日期范围获取入库单列表
     *
     * @param startDate 起始日期
     * @param endDate   结束日期
     * @return 入库单列表
     */
    @RequestMapping("getInboundOrderByRange")
    @ResponseBody
    public String getInboundOrderByRange(Date startDate, Date endDate) {
        JSONObject res = new JSONObject();
        try {
            // 获取入库单列表
            List<InboundOrderItem> inboundOrderList = inboundService.getInboundOrderItemByRange(startDate, endDate);
            JSONArray data = JSONArray.fromArray(inboundOrderList.toArray(new InboundOrderItem[inboundOrderList.size()]));
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
     * 作废入库单
     *
     * @param inboundOrderId 入库单编号
     * @return 成功与否
     */
    @RequestMapping("setInboundOrderStateInvalid")
    @ResponseBody
    public String setInboundOrderStateInvalid(String inboundOrderId) {
        JSONObject res = new JSONObject();
        try {
            // 作废入库单
            inboundService.setInboundOrderStateInvalid(inboundOrderId);
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
     * 作废入库单
     *
     * @param inboundOrderId 入库单编号
     * @return 成功与否
     */
    @RequestMapping("setInboundOrderStateSubmit")
    @ResponseBody
    public String setInboundOrderStateSubmit(String inboundOrderId) {
        JSONObject res = new JSONObject();
        try {
            // 作废入库单
            inboundService.setInboundOrderStateSubmit(inboundOrderId);
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
     * 通过编号获取入库单
     *
     * @param inboundOrderId 入库单编号
     * @return 入库单对象
     */
    @RequestMapping("getInboundOrderById")
    @ResponseBody
    public String getInboundOrderById(String inboundOrderId) {
        JSONObject res = new JSONObject();
        try {
            InboundOrder inboundOrder = inboundService.getInboundOrderById(inboundOrderId);
            if (inboundOrder.getBoundType() != null && inboundOrder.getBoundType().equals(BoundType.SecondaryInbound)) {
                for (InboundOrderItem inboundOrderItem : inboundOrder.getInboundOrderItemList()) {
                    if (inboundOrderItem.getWastes() != null) {
                        SecondaryCategory secondaryCategory = secondaryCategoryService.getByCode(inboundOrderItem.getWastes().getName());
                        if (secondaryCategory != null)
                            inboundOrderItem.getWastes().setName(secondaryCategory.getName());
                    }
                }
            }
            JSONObject data = JSONObject.fromBean(inboundOrder);
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

    @RequestMapping("updateItemHandleCategory")
    @ResponseBody
    public String updateItemHandleCategory(@RequestBody InboundOrderItem InboundOrderItem) {
        JSONObject res = new JSONObject();
        try {
            // 更新进料方式
            inboundService.updateItemHandleCategory(InboundOrderItem);
            res.put("status", "success");
            res.put("message", "属性修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "属性修改失败");
        }
        return res.toString();
    }

    /**
     * 获取入库单的数量
     *
     * @return 入库单数量
     */
    @RequestMapping("countInboundOrder")
    @ResponseBody
    public int countInboundOrder() {
        try {
            return inboundService.countInboundOrder();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 获取入库单的数量
     *
     * @return 入库单数量
     */
    @RequestMapping("countSecondInboundOrder")
    @ResponseBody
    public int countSecondInboundOrder(@RequestBody InboundOrder inboundOrder) {
        try {
            return inboundService.countSecondInboundOrder(inboundOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 列出所有次生入库单
     *
     * @return 次生入库单列表
     */
    @RequestMapping("listSecondInboundOrder")
    @ResponseBody
    public String listSecondInboundOrder(@RequestBody InboundOrder inboundOrder) {
        JSONObject res = new JSONObject();
        try {
            // 获取入库单列表
            List<InboundOrder> inboundOrderList = inboundService.listSecondInboundOrder(inboundOrder);
            JSONArray data = JSONArray.fromArray(inboundOrderList.toArray(new InboundOrder[inboundOrderList.size()]));
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

    @RequestMapping("addSecondInboundOrder")
    @ResponseBody
    public String addSecondInboundOrder(@RequestBody InboundOrder inboundOrder, HttpSession session) {
        JSONObject res = new JSONObject();
        try {
            //得到一个NumberFormat的实例
            NumberFormat nf = NumberFormat.getInstance();
            //设置是否使用分组
            nf.setGroupingUsed(false);
            //设置最大整数位数
            nf.setMaximumIntegerDigits(4);
            //设置最小整数位数
            nf.setMinimumIntegerDigits(4);
            inboundOrder.setInboundOrderId(inboundService.getInboundOrderId());
            // 获取入库单列表
            inboundOrder.setBoundType(BoundType.SecondaryInbound);
            inboundOrder.setCheckState(CheckState.NewBuild);
            inboundOrder.setRecordState(RecordState.Usable);
            String labId = laboratoryTestService.getCurrentId();
            for (InboundOrderItem inboundOrderItem : inboundOrder.getInboundOrderItemList()) {
                inboundOrderItem.setInboundOrderItemId(RandomUtil.getRandomEightNumber());
                String companyName = inboundOrderItem.getProduceCompany().getCompanyName();
                // 通过名字查找客户
                Client produceCompany = clientService.getByName(companyName);
                // 如果查找到的公司为空则添加到客户表
                if (produceCompany == null) {
                    inboundOrderItem.getProduceCompany().setClientId(clientService.getCurrentId());
                    clientService.add(inboundOrderItem.getProduceCompany());
                } else {
                    inboundOrderItem.setProduceCompany(produceCompany);
                }
                // 设置编号
                inboundOrderItem.getLaboratoryTest().setLaboratoryTestNumber(labId);
                inboundOrderItem.getLaboratoryTest().setClient(produceCompany);
                inboundOrderItem.getLaboratoryTest().setWastesName(inboundOrderItem.getWastes().getName());
                inboundOrderItem.getLaboratoryTest().setWastesCode(inboundOrderItem.getWastes().getWastesId());
                // 自增编号
                int num = Integer.parseInt(labId);
                do {
                    num += 1;
                    labId = nf.format(num);
                } while (laboratoryTestService.getLaboratoryTestById(labId) != null);
                labId = nf.format(num);
            }
            // update 2018年11月13日 by Matt 增加用户信息
            User user = userService.getCurrentUserInfo(session);
            if (user != null) {
                inboundOrder.setCreatorId(user.getName());
                inboundOrder.setModifierId(user.getName());
                inboundOrder.setKeeperId(user.getName());
                inboundOrder.setApproverId(user.getName());
                inboundOrder.setDirectorId(user.getName());
            } else {
                inboundOrder.setCreatorId("管理员");
                inboundOrder.setModifierId("管理员");
                inboundOrder.setKeeperId("管理员");
                inboundOrder.setApproverId("管理员");
                inboundOrder.setDirectorId("管理员");
            }
            inboundOrder.setInboundDate(new Date());
            inboundOrder.setCreateDate(new Date());
            inboundService.addSecondInboundOrder(inboundOrder);
            res.put("status", "success");
            res.put("message", "增加次生入库单成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加次生入库单失败");
        }
        return res.toString();
    }

    /**
     * 更新次生入库单
     * @param inboundOrder 次生入库单
     * @return 成功与否
     */
    @RequestMapping("updateSecondInboundOrder")
    @ResponseBody
    public String updateSecondInboundOrder(@RequestBody InboundOrder inboundOrder) {
        JSONObject res = new JSONObject();
        try {
            inboundService.updateSecondInboundOrder(inboundOrder);
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
     * 导入危废入库单
     *
     * @param excelFile 导入文件
     * @return 成功与否
     */
    @RequestMapping("importWastesInboundExcel")
    @ResponseBody
    public String importWastesInboundExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            // 获取危废入库的表格数据
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            Map<String, InboundOrder> map = new HashMap<>();
            // 如果时间格式不符合需求是18-9-1格式的添加为2018-9-1
//            if (data[1][0].toString().substring(0, 3).replaceAll("\\d+", "") != null ||
//                    data[1][0].toString().substring(0, 3).replaceAll("\\d+", "") != "") {
//                SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
//                Date date = new Date();
//                String year1 = sdf.format(date).substring(0, 2); // 获取当前世纪 20
//                String date1 = year1 + data[1][0].toString();
//                System.out.print(data[1][0].toString()+" ");
//                inboundOrder.setInboundDate(DateUtil.getDateFromStr(date1));   // 设置入库日期
//            }else {
//                inboundOrder.setInboundDate(DateUtil.getDateFromStr(data[1][0].toString()));
//            }
            for (int i = 1; i < data.length; i++) {
                String id = data[i][0].toString();   // 获取入库ID
                if (!map.keySet().contains(id)) {
                    map.put(id, new InboundOrder());// 创建入库单对象
                    // 设置入库单编号
                    map.get(id).setInboundOrderId(id);
                    // 设置入库日期
                    map.get(id).setInboundDate(DateUtil.getDateFromStr(data[i][1].toString()));
                    // 通过仓库名称获取仓库
                    WareHouse wareHouse = wareHouseService.getWareHouseByName(data[i][2].toString());
                    if (wareHouse == null) {
                        wareHouse = new WareHouse();
                        wareHouse.setWareHouseId(wareHouseService.getCurrentId());
                        wareHouse.setWareHouseName(data[i][2].toString());
                        wareHouseService.add(wareHouse);
                    }
                    // 设置仓库
                    map.get(id).setWareHouse(wareHouse);
                    // 设置入库类别
                    map.get(id).setBoundType(BoundType.WasteInbound);
                    // 设置状态
                    map.get(id).setCheckState(CheckState.NewBuild);
                    // 设置单据状态
                    map.get(id).setRecordState(RecordState.Usable);
                    // 设置创建日期
                    map.get(id).setCreateDate(new Date());
                    map.get(id).setModifyDate(new Date());
                    map.get(id).setRemarks(data[i][13].toString());
                }
                // 创建入库单条目列表
                List<InboundOrderItem> inboundOrderItemList = new ArrayList<>();
                if (data[i][3].toString().equals("null")) break;
                // 创建入库单条目
                InboundOrderItem inboundOrderItem = new InboundOrderItem();
                // 设置入库单条目编号
                inboundOrderItem.setInboundOrderItemId(RandomUtil.getRandomEightNumber());
                // 设置入库单号外键
                inboundOrderItem.setInboundOrderId(map.get(id).getInboundOrderId());
                // 设置入库单日期
                inboundOrderItem.setInboundDate(DateUtil.getDateFromStr(data[i][1].toString()));
                inboundOrderItem.setTransferDraftId(data[i][4].toString());
                // 设置客户信息
                Client client = clientService.getByName(data[i][5].toString().trim());
                if (client == null) {
                    client = new Client();
                    client.setClientId(clientService.getCurrentId());
                    client.setCompanyName(data[i][5].toString().trim());
                    clientService.add(client);
                }
                inboundOrderItem.setProduceCompany(client);
                // 设置危废信息
                Wastes wastes = new Wastes();
                wastes.setName(data[i][6].toString());      // 危废名称
                wastes.setWastesId(data[i][7].toString());  // 危废代码
                inboundOrderItem.setWastes(wastes);
                inboundOrderItem.setWastesAmount(Float.parseFloat(data[i][8].toString()));
                inboundOrderItem.setUnitPriceTax(Float.parseFloat(data[i][9].toString())); // 危废数量
                inboundOrderItem.setTotalPrice(Float.parseFloat(data[i][10].toString()));   // 危废单价
                // 设置处置方式
                switch (data[i][11].toString()) {
                    case "焚烧":
                        inboundOrderItem.setProcessWay(ProcessWay.Burning);
                        break;
                    case "填埋":
                        inboundOrderItem.setProcessWay(ProcessWay.Landfill);
                        break;
                    default:
                        break;
                }
                // 设置进料方式
                if (data[i][12].toString().contains("污泥")) {
                    inboundOrderItem.setHandleCategory(HandleCategory.Sludge);
                } else if (data[i][12].toString().contains("废液")) {
                    inboundOrderItem.setHandleCategory(HandleCategory.WasteLiquid);
                } else if (data[i][12].toString().contains("散料")) {
                    inboundOrderItem.setHandleCategory(HandleCategory.Bulk);
                } else if (data[i][12].toString().contains("破碎")) {
                    inboundOrderItem.setHandleCategory(HandleCategory.Crushing);
                } else if (data[i][12].toString().contains("悬挂")) {
                    inboundOrderItem.setHandleCategory(HandleCategory.Suspension);
                } else if (data[i][12].toString().contains("精馏")) {
                    inboundOrderItem.setHandleCategory(HandleCategory.Distillation);
                }
                inboundOrderItem.setRemarks(data[i][13].toString());
                inboundOrderItem.setWarehouseArea(data[i][14].toString());
                // 增加到集合中
                inboundOrderItemList.add(inboundOrderItem);
                map.get(id).setInboundOrderItemList(inboundOrderItemList);// 设置入库条目列表
            }
            for (String key : map.keySet()) {
                InboundOrder inboundOrder = map.get(key);
                // 增加入库单
//                for(InboundOrderItem inboundOrderItem : inboundOrder.getInboundOrderItemList()){
//                    if(inboundService.getInventoryByWastesNameAndWareHouse(inboundOrderItem.getWastes().getName(),inboundOrder.getWareHouse().getWareHouseName()) > 0){
//                         inboundOrder.setAid("exist");
//                    }else{
//                        inboundOrder.setAid("notExist");
//                    }
//                }
                inboundService.addInboundOrder(inboundOrder);
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

    /**
     * 导入次生危废入库文件
     *
     * @param excelFile excel文件
     * @return 成功与否
     */
    @RequestMapping("importSecondWastesInboundExcel")
    @ResponseBody
    public String importSecondWastesInboundExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            // 获取危废入库的表格数据
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            System.out.println("数据为");
            for(int i =0;i<data.length;i++){
                for(int j=0;j<data[0].length;j++) {
                    System.out.print(data[i][j].toString()+" ");
                }
                System.out.println();
            }

            Map<String, InboundOrder> map = new HashMap<>();
            for (int i = 1; i < data.length; i++) {
                String id = data[i][0].toString();   // 获取入库ID
                if (!map.keySet().contains(id)) {
                    map.put(id, new InboundOrder());// 创建入库单对象
                    // 设置入库单编号
                    map.get(id).setInboundOrderId(id);
                    // 设置入库日期
                    map.get(id).setInboundDate(DateUtil.getDateFromStr(data[i][1].toString()));
                    // 通过仓库名称获取仓库
                    WareHouse wareHouse = wareHouseService.getWareHouseByName(data[i][2].toString());
                    if (wareHouse == null) {
                        wareHouse = new WareHouse();
                        wareHouse.setWareHouseId(wareHouseService.getCurrentId());
                        wareHouse.setWareHouseName(data[i][2].toString());
                        wareHouseService.add(wareHouse);
                    }
                    // 设置仓库
                    map.get(id).setWareHouse(wareHouse);
                    // 设置入库类别
                    map.get(id).setBoundType(BoundType.SecondaryInbound);
                    // 设置状态
                    map.get(id).setCheckState(CheckState.NewBuild);
                    // 设置单据状态
                    map.get(id).setRecordState(RecordState.Usable);
                    // 设置创建日期
                    map.get(id).setCreateDate(new Date());
                    map.get(id).setModifyDate(new Date());
                    map.get(id).setRemarks(data[i][16].toString());
                }
                // 创建入库单条目列表
                List<InboundOrderItem> inboundOrderItemList = new ArrayList<>();
                InboundOrderItem inboundOrderItem = new InboundOrderItem();
                // 设置入库条目单号
                inboundOrderItem.setInboundOrderItemId(RandomUtil.getRandomEightNumber());
                // 入库单号
                inboundOrderItem.setInboundOrderId(map.get(id).getInboundOrderId());
                // 设置客户信息
                Client client = clientService.getByName(data[i][4].toString());
                if (client != null) inboundOrderItem.setProduceCompany(client);
                else {
                    client = new Client();
                    client.setClientId(clientService.getCurrentId());
                    client.setCompanyName(data[i][4].toString());
                    clientService.add(client);
                    inboundOrderItem.setProduceCompany(client);
                }
                // 设置危废信息
                Wastes wastes = new Wastes();
                wastes.setName(data[i][5].toString());      // 危废名称
                wastes.setWastesId(data[i][6].toString());  // 危废代码
                inboundOrderItem.setWastes(wastes);
                inboundOrderItem.setWastesAmount(Float.parseFloat(data[i][7].toString()));
                inboundOrderItem.setUnitPriceTax(Float.parseFloat(data[i][8].toString())); // 危废数量
                inboundOrderItem.setTotalPrice(Float.parseFloat(data[i][9].toString()));   // 危废单价
                // 设置处置方式
                switch (data[i][10].toString()) {
                    case "焚烧":
                        inboundOrderItem.setProcessWay(ProcessWay.Burning);
                        break;
                    case "填埋":
                        inboundOrderItem.setProcessWay(ProcessWay.Landfill);
                        break;
                    case"清洗":
                        inboundOrderItem.setProcessWay(ProcessWay.Clean);
                        break;
                    default:
                        break;
                }
                // 设置进料方式
                switch (data[i][11].toString()) {
                    case "污泥":
                        inboundOrderItem.setHandleCategory(HandleCategory.Sludge);
                        break;
                    case "废液":
                        inboundOrderItem.setHandleCategory(HandleCategory.WasteLiquid);
                        break;
                    case "散装料":
                        inboundOrderItem.setHandleCategory(HandleCategory.Bulk);
                        break;
                    case "破碎料":
                        inboundOrderItem.setHandleCategory(HandleCategory.Crushing);
                        break;
                    case "精馏残渣":
                        inboundOrderItem.setHandleCategory(HandleCategory.Distillation);
                        break;
                    case "悬挂连":
                        inboundOrderItem.setHandleCategory(HandleCategory.Suspension);
                        break;
                    default:
                        break;
                }
                // 设置物质形态
                switch (data[i][12].toString()) {
                    case "气体":
                        inboundOrderItem.setFormType(FormType.Gas);
                        break;
                    case "液体":
                        inboundOrderItem.setFormType(FormType.Liquid);
                        break;
                    case "固体":
                        inboundOrderItem.setFormType(FormType.Solid);
                        break;
                    case "半固态":
                        inboundOrderItem.setFormType(FormType.HalfSolid);
                        break;
                    default:
                        break;
                }
                // 设置包装方式
                switch (data[i][13].toString()) {
                    case "吨袋":
                        inboundOrderItem.setPackageType(PackageType.Bag);
                        break;
                    case "标准箱":
                        inboundOrderItem.setPackageType(PackageType.Box);
                        break;
                    case "吨箱":
                        inboundOrderItem.setPackageType(PackageType.Ton);
                        break;
                    case "小袋":
                        inboundOrderItem.setPackageType(PackageType.Pouch);
                        break;
                    case "铁桶":
                        inboundOrderItem.setPackageType(PackageType.Iron);
                        break;
                    default:
                        break;
                }
                // 设置化验单
                LaboratoryTest laboratoryTest = new LaboratoryTest();
                laboratoryTest.setLaboratoryTestNumber(RandomUtil.getRandomEightNumber());
                laboratoryTest.setHeatAverage(Float.parseFloat(data[i][14].toString()));
//                laboratoryTest.setPhAverage(Float.parseFloat(data[i][14].toString()));
//                laboratoryTest.setAshAverage(Float.parseFloat(data[i][15].toString()));
                laboratoryTest.setWaterContentAverage(Float.parseFloat(data[i][15].toString()));
//                laboratoryTest.setChlorineContentAverage(Float.parseFloat(data[i][17].toString()));
//                laboratoryTest.setSulfurContentAverage(Float.parseFloat(data[i][18].toString()));
//                laboratoryTest.setPhosphorusContentAverage(Float.parseFloat(data[i][19].toString()));
//                laboratoryTest.setFluorineContentAverage(Float.parseFloat(data[i][20].toString()));
                inboundOrderItem.setLaboratoryTest(laboratoryTest);
                inboundOrderItem.setWarehouseArea(data[i][17].toString());
                inboundOrderItem.setRemarks(data[i][16].toString());
                inboundOrderItemList.add(inboundOrderItem);
                // 设置列表
                map.get(id).setInboundOrderItemList(inboundOrderItemList);
            }
            for (String key : map.keySet()) {
                InboundOrder inboundOrder = map.get(key);
                inboundService.addSecondInboundOrder(inboundOrder);
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
