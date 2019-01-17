package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Dictionary.*;
import com.jdlink.domain.Inventory.*;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.IngredientsIn;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.domain.Produce.ProcessWay;
import com.jdlink.service.*;
import com.jdlink.service.dictionary.DictionaryService;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import com.sun.xml.internal.bind.v2.runtime.reflect.Lister;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
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
    @Autowired
    DictionaryService dictionaryService;

    /**
     * 列出所有入库计划单信息
     *
     * @return 入库计划单列表
     */
    @RequestMapping("listInboundPlanOrder")
    @ResponseBody
    public String listInboundPlanOrder(@RequestBody InboundPlanOrder inboundPlanOrder) {
        JSONObject res = new JSONObject();
        try {
            List<InboundPlanOrder> inboundPlanOrderList = inboundService.listInboundPlanOrder(inboundPlanOrder);
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
    public String countInboundPlanOrder(@RequestBody InboundPlanOrder inboundPlanOrder) {
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
            if (inboundOrder.getWareHouse() != null) {
                // 查找仓库
                WareHouse wareHouse = wareHouseService.getWareHouseById(inboundOrder.getWareHouse().getWareHouseId() + "");
                if (wareHouse != null) {
                    inboundOrder.setWareHouse(wareHouse);
                    // 如果仓库存在则在编号前面加上仓库名称缩写
                    inboundOrder.setInboundOrderId(wareHouse.getPrefix() + inboundService.getInboundOrderId());
                }
            } else {
                // 如果没有仓库对象则直接赋值编号
                inboundOrder.setInboundOrderId(inboundService.getInboundOrderId());
            }
            // 设置记录状态
            inboundOrder.setRecordState(RecordState.Usable);
            RecordStateItem recordStateItem = new RecordStateItem();
            recordStateItem.setDataDictionaryItemId(20);
            inboundOrder.setRecordStateItem(recordStateItem);
            // 设置审核状态
            inboundOrder.setCheckState(CheckState.NewBuild);
            CheckStateItem checkStateItem = new CheckStateItem();
            checkStateItem.setDataDictionaryItemId(75);
            inboundOrder.setCheckStateItem(checkStateItem);
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
                if (inboundOrderItem.getProduceCompany().getClientId() == null || inboundOrderItem.getProduceCompany().getClientId().equals("")) {
                    Client produceCompany = clientService.getByName(inboundOrderItem.getProduceCompany().getCompanyName());
                    // 设置生产单位
                    inboundOrderItem.setProduceCompany(produceCompany);
                }
                // 根据客户编号和危废编码找到化验单中的对应的信息，绑定
                String clientId = inboundOrderItem.getProduceCompany().getClientId();
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

            // 设置入库单编号
            // 设置编号
            if (inboundOrder.getWareHouse() != null) {
                // 查找仓库
                WareHouse wareHouse = wareHouseService.getWareHouseById(inboundOrder.getWareHouse().getWareHouseId() + "");
                if (wareHouse != null) {
                    inboundOrder.setWareHouse(wareHouse);
                    // 如果仓库存在则在编号前面加上仓库名称缩写
                    inboundOrder.setInboundOrderId(wareHouse.getPrefix() + inboundService.getInboundOrderId());
                }
            } else {
                // 如果没有仓库对象则直接赋值编号
                inboundOrder.setInboundOrderId(inboundService.getInboundOrderId());
            }
            // 设置记录状态
            inboundOrder.setRecordState(RecordState.Usable);
            RecordStateItem recordStateItem = new RecordStateItem();
            recordStateItem.setDataDictionaryItemId(20);
            inboundOrder.setRecordStateItem(recordStateItem);
            // 设置审核状态
            inboundOrder.setCheckState(CheckState.NewBuild);
            CheckStateItem checkStateItem = new CheckStateItem();
            checkStateItem.setDataDictionaryItemId(75);
            inboundOrder.setCheckStateItem(checkStateItem);

            // 获取入库单列表
            inboundOrder.setBoundType(BoundType.SecondaryInbound);

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
            List<InboundOrder> inboundOrderList = new ArrayList<>();
            for (int i = 1; i < data.length; i++) {
                InboundOrder inboundOrder = new InboundOrder();
                WareHouse wareHouse = null;
                // 通过仓库设置编号
                if (data[i][2].toString().contains("1号")) {
                    wareHouse = wareHouseService.getWareHouseById("1");
                } else if (data[i][2].toString().contains("2号")) {
                    wareHouse = wareHouseService.getWareHouseById("2");
                } else if (data[i][2].toString().contains("3号")) {
                    wareHouse = wareHouseService.getWareHouseById("3");
                } else if (data[i][2].toString().contains("4号")) {
                    wareHouse = wareHouseService.getWareHouseById("4");
                } else if (data[i][2].toString().contains("智能")) {
                    wareHouse = wareHouseService.getWareHouseById("5");
                } else if (data[i][2].toString().contains("暂存") && data[i][2].toString().contains("1")) {
                    wareHouse = wareHouseService.getWareHouseById("6");
                } else if (data[i][2].toString().contains("暂存") && data[i][2].toString().contains("2")) {
                    wareHouse = wareHouseService.getWareHouseById("7");
                } else if (data[i][2].toString().contains("暂存") && data[i][2].toString().contains("3")) {
                    wareHouse = wareHouseService.getWareHouseById("8");
                } else if (data[i][2].toString().contains("暂存") && data[i][2].toString().contains("4")) {
                    wareHouse = wareHouseService.getWareHouseById("9");
                } else if (data[i][2].toString().contains("暂存") && data[i][2].toString().contains("5")) {
                    wareHouse = wareHouseService.getWareHouseById("10");
                } else if (data[i][2].toString().contains("五金")) {
                    wareHouse = wareHouseService.getWareHouseById("11");
                } else if (data[i][2].toString().contains("原辅料")) {
                    wareHouse = wareHouseService.getWareHouseById("12");
                } else if (data[i][2].toString().contains("次生")) {
                    wareHouse = wareHouseService.getWareHouseById("15");
                }
                if (wareHouse != null) {
                    inboundOrder.setWareHouse(wareHouse);
                    inboundOrder.setInboundOrderId(wareHouse.getPrefix() + inboundService.getInboundOrderId());
                } else {
                    inboundOrder.setInboundOrderId(inboundService.getInboundOrderId());
                }
                inboundOrder.setInboundDate(DateUtil.getDateFromStr(data[i][1].toString()));
                // 设置入库类别
                inboundOrder.setBoundType(BoundType.WasteInbound);
                // 设置状态
                CheckStateItem checkStateItem = new CheckStateItem();
                checkStateItem.setDataDictionaryItemId(75);
                inboundOrder.setCheckStateItem(checkStateItem);
                inboundOrder.setCheckState(CheckState.NewBuild);
                // 设置单据状态
                RecordStateItem recordStateItem = new RecordStateItem();
                recordStateItem.setDataDictionaryItemId(20);
                inboundOrder.setRecordStateItem(recordStateItem);
                inboundOrder.setRecordState(RecordState.Usable);
                // 设置创建日期
                inboundOrder.setCreateDate(new Date());
                inboundOrder.setModifyDate(new Date());
                inboundOrder.setRemarks(data[i][13].toString());
                // 创建入库单条目列表
                List<InboundOrderItem> inboundOrderItemList = new ArrayList<>();
                // 创建入库单条目
                InboundOrderItem inboundOrderItem = new InboundOrderItem();
                // 设置入库单条目编号
                inboundOrderItem.setInboundOrderItemId(RandomUtil.getRandomEightNumber());
                // 设置入库单号外键
                inboundOrderItem.setInboundOrderId(inboundOrder.getInboundOrderId());
                // 设置入库单日期
                inboundOrderItem.setInboundDate(inboundOrder.getInboundDate());
                inboundOrderItem.setTransferDraftId(data[i][4].toString());
                // 设置客户信息
                Client client = clientService.getByNameNotState(data[i][5].toString().trim());
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
                if (data[i][11].toString().contains("焚烧")) {
                    ProcessWayItem processWayItem = new ProcessWayItem();
                    processWayItem.setDataDictionaryItemId(44);
                    inboundOrderItem.setProcessWayItem(processWayItem);
                    inboundOrderItem.setProcessWay(ProcessWay.Burning);
                } else if (data[i][11].toString().contains("填埋")) {
                    ProcessWayItem processWayItem = new ProcessWayItem();
                    processWayItem.setDataDictionaryItemId(45);
                    inboundOrderItem.setProcessWayItem(processWayItem);
                    inboundOrderItem.setProcessWay(ProcessWay.Landfill);
                } else if (data[i][11].toString().contains("清洗")) {
                    ProcessWayItem processWayItem = new ProcessWayItem();
                    processWayItem.setDataDictionaryItemId(46);
                    inboundOrderItem.setProcessWayItem(processWayItem);
                    inboundOrderItem.setProcessWay(ProcessWay.Clean);
                }
                // 设置进料方式
                if (data[i][12].toString().contains("污泥")) {
                    HandleCategoryItem handleCategoryItem = new HandleCategoryItem();
                    handleCategoryItem.setDataDictionaryItemId(28);
                    inboundOrderItem.setHandleCategoryItem(handleCategoryItem);
                    inboundOrderItem.setHandleCategory(HandleCategory.Sludge);
                } else if (data[i][12].toString().contains("废液")) {
                    HandleCategoryItem handleCategoryItem = new HandleCategoryItem();
                    handleCategoryItem.setDataDictionaryItemId(29);
                    inboundOrderItem.setHandleCategoryItem(handleCategoryItem);
                    inboundOrderItem.setHandleCategory(HandleCategory.WasteLiquid);
                } else if (data[i][12].toString().contains("散料")) {
                    HandleCategoryItem handleCategoryItem = new HandleCategoryItem();
                    handleCategoryItem.setDataDictionaryItemId(30);
                    inboundOrderItem.setHandleCategoryItem(handleCategoryItem);
                    inboundOrderItem.setHandleCategory(HandleCategory.Bulk);
                } else if (data[i][12].toString().contains("破碎")) {
                    HandleCategoryItem handleCategoryItem = new HandleCategoryItem();
                    handleCategoryItem.setDataDictionaryItemId(31);
                    inboundOrderItem.setHandleCategoryItem(handleCategoryItem);
                    inboundOrderItem.setHandleCategory(HandleCategory.Crushing);
                } else if (data[i][12].toString().contains("悬挂")) {
                    HandleCategoryItem handleCategoryItem = new HandleCategoryItem();
                    handleCategoryItem.setDataDictionaryItemId(33);
                    inboundOrderItem.setHandleCategoryItem(handleCategoryItem);
                    inboundOrderItem.setHandleCategory(HandleCategory.Suspension);
                } else if (data[i][12].toString().contains("精馏")) {
                    HandleCategoryItem handleCategoryItem = new HandleCategoryItem();
                    handleCategoryItem.setDataDictionaryItemId(32);
                    inboundOrderItem.setHandleCategoryItem(handleCategoryItem);
                    inboundOrderItem.setHandleCategory(HandleCategory.Distillation);
                }
                inboundOrderItem.setRemarks(data[i][13].toString());
                inboundOrderItem.setWarehouseArea(data[i][14].toString());
                // 增加到集合中
                inboundOrderItemList.add(inboundOrderItem);
                inboundOrder.setInboundOrderItemList(inboundOrderItemList);// 设置入库条目列表
                inboundOrderList.add(inboundOrder);
                // 增加入库单
                inboundService.addInboundOrder(inboundOrder);
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (DuplicateKeyException e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "单号已存在");
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
            }

            Map<String, InboundOrder> map = new HashMap<>();
            for (int i = 1; i < data.length; i++) {
                String id = data[i][0].toString();   // 获取入库ID
                // 通过仓库名称获取仓库
                WareHouse wareHouse = wareHouseService.getWareHouseByName(data[i][2].toString());
                //仓库信息
                if (wareHouse != null) {
                    id=wareHouse.getPrefix()+id;
                }


                if (!map.keySet().contains(id)) {
                    map.put(id, new InboundOrder());// 创建入库单对象
                    // 设置入库单编号
                    map.get(id).setInboundOrderId(id);
                    // 设置入库日期
                    map.get(id).setInboundDate(DateUtil.getDateFromStr(data[i][1].toString()));
                    // 设置入库类别
                    map.get(id).setBoundType(BoundType.SecondaryInbound);
                    // 设置状态
                    CheckStateItem checkStateItem=new CheckStateItem();
                    checkStateItem.setDataDictionaryItemId(75);
                    map.get(id).setCheckStateItem(checkStateItem);
//                    map.get(id).setCheckState(CheckState.NewBuild);
                    // 设置单据状态
                    RecordStateItem recordStateItem=new RecordStateItem();
                    recordStateItem.setDataDictionaryItemId(20);
                    map.get(id).setRecordStateItem(recordStateItem);
//                    map.get(id).setRecordState(RecordState.Usable);
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
                WareHouse wareHouse1 = wareHouseService.getWareHouseByName(data[i][2].toString());
                //仓库信息
                if (wareHouse1 != null) {
                    inboundOrderItem.setWareHouse(wareHouse1);
                }

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

                SecondaryCategoryItem secondaryCategoryItem= new SecondaryCategoryItem();

                int dataDictionaryItemId=dictionaryService.getdatadictionaryitemIdByName(data[i][5].toString(),26);
                secondaryCategoryItem.setDataDictionaryItemId(dataDictionaryItemId);
                inboundOrderItem.setSecondaryCategoryItem(secondaryCategoryItem);

                /**
                 * 除了桶单位是只，其他为吨
                 * 桶的包装方式为铁桶，其他的为吨袋
                 *
                 */
                UnitDataItem unitDataItem=new UnitDataItem();
                PackageTypeItem packageTypeItem=new PackageTypeItem();
                if(data[i][5].toString().equals("桶")){
                unitDataItem.setDataDictionaryItemId(147);
                    packageTypeItem.setDataDictionaryItemId(125);
                }
                if(!data[i][5].toString().equals("桶")) {
                    unitDataItem.setDataDictionaryItemId(139);
                    packageTypeItem.setDataDictionaryItemId(121);
                }
                inboundOrderItem.setUnitDataItem(unitDataItem);
                inboundOrderItem.setPackageTypeItem(packageTypeItem);
                wastes.setWastesId(data[i][6].toString());  // 危废代码
                inboundOrderItem.setWastes(wastes);
                if(data[i][7].toString()=="null")
                {
                    data[i][7]="0";
                }
                inboundOrderItem.setWastesAmount(Float.parseFloat(data[i][7].toString()));
                if(data[i][8].toString()=="null") {
                    data[i][8] = "0";
                }
                inboundOrderItem.setUnitPriceTax(Float.parseFloat(data[i][8].toString())); // 危废数量
                if(data[i][9].toString()=="null")
                {
                    data[i][9]="0";
                }
                inboundOrderItem.setTotalPrice(Float.parseFloat(data[i][9].toString()));   // 危废单价

                //处置方式适配
                ProcessWayItem processWayItem =new ProcessWayItem();
                if(data[i][10].toString()!="null"){
                    int  dataDictionaryItemId1= dictionaryService.getdatadictionaryitemIdByName(data[i][10].toString(),8);
                    processWayItem.setDataDictionaryItemId(dataDictionaryItemId1);
                    inboundOrderItem.setProcessWayItem(processWayItem);
                }




//                // 设置处置方式
//                switch (data[i][10].toString()) {
//                    case "焚烧":
//                        inboundOrderItem.setProcessWay(ProcessWay.Burning);
//                        break;
//                    case "填埋":
//                        inboundOrderItem.setProcessWay(ProcessWay.Landfill);
//                        break;
//                    case"清洗":
//                        inboundOrderItem.setProcessWay(ProcessWay.Clean);
//                        break;
//                    default:
//                        break;
//                }
                // 设置进料方式
                //进料方式适配
                HandleCategoryItem handleCategoryItem =new HandleCategoryItem();
                if(data[i][11].toString()!="null"){
                    int  dataDictionaryItemId2= dictionaryService.getdatadictionaryitemIdByName(data[i][11].toString(),6);
                    handleCategoryItem.setDataDictionaryItemId(dataDictionaryItemId2);
                    inboundOrderItem.setHandleCategoryItem(handleCategoryItem);
                }
//                switch (data[i][11].toString()) {
//                    case "污泥":
//                        inboundOrderItem.setHandleCategory(HandleCategory.Sludge);
//                        break;
//                    case "废液":
//                        inboundOrderItem.setHandleCategory(HandleCategory.WasteLiquid);
//                        break;
//                    case "散装料":
//                        inboundOrderItem.setHandleCategory(HandleCategory.Bulk);
//                        break;
//                    case "破碎料":
//                        inboundOrderItem.setHandleCategory(HandleCategory.Crushing);
//                        break;
//                    case "精馏残渣":
//                        inboundOrderItem.setHandleCategory(HandleCategory.Distillation);
//                        break;
//                    case "悬挂连":
//                        inboundOrderItem.setHandleCategory(HandleCategory.Suspension);
//                        break;
//                    default:
//                        break;
//                }
                // 设置物质形态
                FormTypeItem formTypeItem =new FormTypeItem();
                formTypeItem.setDataDictionaryItemId(3);
                inboundOrderItem.setFormTypeItem(formTypeItem);

//                switch (data[i][12].toString()) {
//                    case "气体":
//                        inboundOrderItem.setFormType(FormType.Gas);
//                        break;
//                    case "液体":
//                        inboundOrderItem.setFormType(FormType.Liquid);
//                        break;
//                    case "固体":
//                        inboundOrderItem.setFormType(FormType.Solid);
//                        break;
//                    case "半固态":
//                        inboundOrderItem.setFormType(FormType.HalfSolid);
//                        break;
//                    default:
//                        break;
//                }
//




//                switch (data[i][13].toString()) {
//                    case "吨袋":
//                        inboundOrderItem.setPackageType(PackageType.Bag);
//                        break;
//                    case "标准箱":
//                        inboundOrderItem.setPackageType(PackageType.Box);
//                        break;
//                    case "吨箱":
//                        inboundOrderItem.setPackageType(PackageType.Ton);
//                        break;
//                    case "小袋":
//                        inboundOrderItem.setPackageType(PackageType.Pouch);
//                        break;
//                    case "铁桶":
//                        inboundOrderItem.setPackageType(PackageType.Iron);
//                        break;
//                    default:
//                        break;
//                }
                // 设置化验单
                LaboratoryTest laboratoryTest = new LaboratoryTest();
                laboratoryTest.setLaboratoryTestNumber(RandomUtil.getRandomEightNumber());
                if(data[i][14].toString()=="null"){
                    data[i][14]="0";
                }
                laboratoryTest.setHeatAverage(Float.parseFloat(data[i][14].toString()));
//                laboratoryTest.setPhAverage(Float.parseFloat(data[i][14].toString()));
//                laboratoryTest.setAshAverage(Float.parseFloat(data[i][15].toString()));
                if(data[i][15].toString()=="null"){
                    data[i][15]="0";
                }
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

    /**
     * 更新入库单条目
     * @param inboundOrderItem 入库单条目
     * @return 成功与否
     */
    @RequestMapping("updateInboundOrderItem")
    @ResponseBody
    public String updateInboundOrderItem(@RequestBody InboundOrderItem inboundOrderItem) {
        JSONObject res = new JSONObject();
        try {
            inboundService.updateInboundOrderItem(inboundOrderItem);
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
     * 保存入库计划单的图片
     * @param req 请求
     * @param file 图片文件
     * @param inboundPlanOrderId 入库计划单编号
     * @return 成功与否
     */
    @RequestMapping("saveInboundPlanOrderImg")
    @ResponseBody
    public void saveInboundPlanOrderImg(HttpServletRequest req, HttpServletResponse resp, @RequestParam("file") MultipartFile file,
                                          @RequestParam("inboundPlanOrderId") String inboundPlanOrderId) {
        JSONObject res = new JSONObject();
        try {
            String fileName = System.currentTimeMillis()+file.getOriginalFilename(); // 文件名设置为当前时间加上传的文件名
            // 获取文件的真实路径然后拼接前面的文件名，uploaded是存放文件的目录名
            String filePath = "Files/Image";
            String destFileName = filePath + "/" + fileName;
            File fileDir = new File(filePath);
            if (!fileDir.exists()) {
                fileDir.mkdirs();
            }
            // 初始化目录(第一次上传目录不存在需要初始化)
            File destFile = new File(destFileName);
            file.transferTo(destFile); // 将file复制给destFile
            // 将路径进行保存
            // 2更新路径
            inboundService.updateInboundPlanOrderImgUrl(inboundPlanOrderId, destFileName);
            res.put("status", "success");
            res.put("message", "图片更新成功");
            resp.sendRedirect("InboundPlanOrder.html");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "图片更新失败");
        }
    }

}
