package com.jdlink.mapper;

import com.jdlink.domain.OfficeSuppliesInbound;
import com.jdlink.domain.OfficeSuppliesItem;
import com.jdlink.domain.OfficeSuppliesOutbound;

import java.util.List;

public interface OfficeSuppliesMapper {

    /**
     * 获取办公用品入库单
     * @param officeSuppliesItem 办公用品条目
     * @return 办公用品入库单
     */
    List<OfficeSuppliesItem> listOfficeSuppliesInbound(OfficeSuppliesItem officeSuppliesItem);

    /**
     * 获取办公用品入库单条目的数量
     * @return 数量
     */
    int countOfficeSuppliesInboundItem(OfficeSuppliesItem officeSuppliesItem);

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
     * 获取办公用品出库单
     * @param officeSuppliesItem 办公用品条目
     * @return 办公用品出库单
     */
    List<OfficeSuppliesOutbound> listOfficeSuppliesOutbound(OfficeSuppliesItem officeSuppliesItem);

    /**
     * 获取办公用品出库单条目的数量
     * @return 数量
     */
    int countOfficeSuppliesOutboundItem();

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
     * 作废办公用品入库单条目
     * @param id 需要作废的条目编号
     */
    void setInvalidOfficeSuppliesInboundItem(String id);

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

    /**
     * 作废办公用品出库单条目
     * @param id 需要作废的条目编号
     */
    void setInvalidOfficeSuppliesOutboundItem(String id);

}
