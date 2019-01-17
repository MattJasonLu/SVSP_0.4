package com.jdlink.service;

import com.jdlink.domain.Inventory.InboundOrder;
import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Inventory.InboundPlanOrder;
import com.jdlink.domain.Page;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/8/22.
 * DoubleClickTo 666
 */
public interface InboundService {

    /**
     * 列出所有入库计划单
     * @return 入库计划单
     */
    List<InboundPlanOrder> listInboundPlanOrder(InboundPlanOrder inboundPlanOrder);

    /**
     * 获取入库单的数量
     * @param inboundPlanOrder 入库计划单的数量
     * @return 数量
     */
    int countInboundPlanOrder(InboundPlanOrder inboundPlanOrder);

    /**
     * 更新入库计划单的磅单
     * @param inboundPlanOrder 入库计划单
     */
    void updateInboundPlanPounds(InboundPlanOrder inboundPlanOrder);

    /**
     * 增加入库计划单
     * @param inboundPlanOrder 入库计划单
     */
    void addInboundPlanOrder(InboundPlanOrder inboundPlanOrder);

    /**
     * 通过编号获取入库计划单
     * @param inboundPlanOrderId 入库计划单号
     * @return 入库计划单
     */
    InboundPlanOrder getInboundPlanOrder(String inboundPlanOrderId);

    /**
     * 设置入库计划单失效
     * @param inboundPlanOrderId 入库计划单编号
     */
    void setInboundPlanOrderInvalid(String inboundPlanOrderId);

    /**
     * 确认收样
     * @param inboundPlanOrderId
     */
    void setInboundPlanOrderSignIn(String inboundPlanOrderId);

    /**
     * 拒收入库计划单
     * @param inboundPlanOrder 入库计划单
     */
    void setInboundPlanOrderReject(InboundPlanOrder inboundPlanOrder);

    /**
     * 查找入库计划单
     * @param inboundPlanOrder 入库计划单数据
     * @return 符合条件的入库计划单列表
     */
    List<InboundPlanOrder> searchInboundPlanOrder(InboundPlanOrder inboundPlanOrder);

    /**
     * 获取入库计划单编号
     * @return 入库计划单编号
     */
    String getInboundPlanOrderId();

    /**
     * 根据年月前缀获取入库计划单数量
     * @param prefix 前缀
     * @return 数量
     */
    int getInboundPlanCountByPrefix(String prefix);

    /**
     * 获取入库单号
     * @return 入库单号
     */
    String getInboundOrderId();

    /**
     * 增加入库单
     * @param inboundOrder 入库单
     */
    void addInboundOrder(InboundOrder inboundOrder);

    /**
     * 列出入库单
     * @return 入库单列表
     */
    List<InboundOrder> listInboundOrder(Page page);

    /**
     * 查询入库单
     * @param inboundOrder 入库单数据
     * @return 查询结果
     */
    List<InboundOrder> searchInboundOrder(InboundOrder inboundOrder);

    /**
     * 获取查询到的入库单的数量
     * @param inboundOrder 查询参数
     * @return 入库单的数量
     */
    int searchInboundOrderCount(InboundOrder inboundOrder);

    /**
     * 作废入库单
     * @param inboundOrderId 入库单编号
     */
    void setInboundOrderStateInvalid(String inboundOrderId);

    /**
     * 提交入库单
     * @param inboundOrderId 入库单编号
     */
    void setInboundOrderStateSubmit(String inboundOrderId);

    /**
     * 根据编号获取入库单
     * @param inboundOrderId 入库单号
     * @return 入库单
     */
    InboundOrder getInboundOrderById(String inboundOrderId);

    /**
     * 更新入库单条目
     * @param inboundOrderItem 入库单条目
     */
    void updateInboundOrderItem(InboundOrderItem inboundOrderItem);

    /**
     * 更新入库单明细中的进料方式
     * @param inboundOrderItem 入库单明细
     */
    void updateItemHandleCategory(InboundOrderItem inboundOrderItem);

    /**
     * 是否存在该单号
     * @param inboundOrderId 入库单号
     * @return 存在与否
     */
    boolean existInboundOrderId(String inboundOrderId);

    /**
     * 计算入库单数量
     * @return 入库单数量
     */
    int countInboundOrder();

    /**
     * 计算次生入库单数量
     * @return 入库单数量
     */
    int countSecondInboundOrder(InboundOrder inboundOrder);

    /**
     * 列出次生入库单
     * @return 次生入库单列表
     */
    List<InboundOrder> listSecondInboundOrder(InboundOrder inboundOrder);

    /**
     * 增加次生危废入库单
     * @param inboundOrder 入库单
     */
    void addSecondInboundOrder(InboundOrder inboundOrder);

    /**
     * 更新入库单
     * @param inboundOrder 入库单
     */
    void updateSecondInboundOrder(InboundOrder inboundOrder);

    /**
     * 通过日期范围获取入库单
     * @param startDate 起始日期
     * @param endDate 结束日期
     * @return 入库单集合
     */
    List<InboundOrderItem> getInboundOrderItemByRange(Date startDate, Date endDate);

    /**
     * 通过日期范围获取入库单
     * @param startDate 起始日期
     * @param endDate 结束日期
     * @return 入库单集合
     */
    List<InboundOrderItem> getSecondInboundOrderItemByRange(Date startDate, Date endDate);

    List<InboundOrderItem> getInboundOrderItemByClientId(String id);

    /**
     * 根据仓库名和物品名查询库存是否存在
     * @param wastesName
     * @param wareHouseName
     * @return
     */
    int getInventoryByWastesNameAndWareHouse(String wastesName,String wareHouseName);

    /**
     * 更新入库计划单的图片路径
     * @param id 编号
     * @param imgUrl 图片路径
     */
    void updateInboundPlanOrderImgUrl(String id, String imgUrl);
}
