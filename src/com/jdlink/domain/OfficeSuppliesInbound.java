package com.jdlink.domain;

import com.jdlink.domain.Dictionary.TicketRateItem;
import com.jdlink.domain.Dictionary.UnitDataItem;

import java.util.Date;
import java.util.List;

/**
 * 办公用品入库
 */
public class OfficeSuppliesInbound {
    /**
     * 出库单号
     */
    private String inboundId;
    /**
     * 入库单列表
     */
    private List<OfficeSuppliesItem> officeSuppliesItemList;
    /**
     * 含税总价
     */
    private Float totalTaxPrice;
    /**
     * 去税总价
     */
    private Float totalPrice;
    /**
     * 出库时间
     */
    private Date outboundDate;
    /**
     * 创建时间
     */
    private Date createTime;
}
