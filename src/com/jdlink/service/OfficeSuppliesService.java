package com.jdlink.service;

import com.jdlink.domain.City;
import com.jdlink.domain.OfficeSuppliesInbound;
import com.jdlink.domain.OfficeSuppliesItem;
import com.jdlink.domain.OfficeSuppliesOutbound;

import java.util.Date;
import java.util.List;

public interface OfficeSuppliesService {

    /**
     * 获取办公用品入库单
     * @param officeSuppliesItem 办公用品条目
     * @return 办公用品入库单
     */
    List<OfficeSuppliesInbound> listOfficeSuppliesInbound(OfficeSuppliesItem officeSuppliesItem);

    /**
     * 增加办公用品入库单
     * @param officeSuppliesInbound 办公用品入库单
     */
    void addOfficeSuppliesInbound(OfficeSuppliesInbound officeSuppliesInbound);

    /**
     * 获取办公用品入库单中前缀匹配的单据数量
     * @param prefix 前缀
     * @return 单据数量
     */
    int getOfficeSupplierInboundCountByPrefix(String prefix);

    /**
     * 根据入库时间获取办公用品入库单编号
     * @param date 入库时间
     * @return 入库单编号
     */
    String getOfficeSupplierInboundId(Date date);

    /**
     * 获取办公用品出库单
     * @param officeSuppliesItem 办公用品条目
     * @return 办公用品出库单
     */
    List<OfficeSuppliesOutbound> listOfficeSuppliesOutbound(OfficeSuppliesItem officeSuppliesItem);

    /**
     * 增加办公用品出库单
     * @param officeSuppliesOutbound 办公用品出库单
     */
    void addOfficeSuppliesOutbound(OfficeSuppliesOutbound officeSuppliesOutbound);

    /**
     * 通过条目编号获取办公用品条目
     * @param id 编号
     * @return 办公用品条目
     */
    OfficeSuppliesItem getOfficeSuppliesInboundItemById(String id);

    /**
     * 更新办公用品入库单条目
     * @param officeSuppliesItem 办公用品入库单条目
     */
    void updateOfficeSuppliesInboundItem(OfficeSuppliesItem officeSuppliesItem);

    /**
     * 通过条目编号获取办公用品条目
     * @param id 编号
     * @return 办公用品条目
     */
    OfficeSuppliesItem getOfficeSuppliesOutboundItemById(String id);

    /**
     * 更新办公用品出库单条目
     * @param officeSuppliesItem 办公用品出库单条目
     */
    void updateOfficeSuppliesOutboundItem(OfficeSuppliesItem officeSuppliesItem);

}
