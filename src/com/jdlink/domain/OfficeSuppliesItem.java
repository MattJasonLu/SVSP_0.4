package com.jdlink.domain;

import com.jdlink.domain.Dictionary.TicketRateItem;
import com.jdlink.domain.Dictionary.UnitDataItem;

import java.util.Date;

/**
 * 入库单条目
 */
public class OfficeSuppliesItem {
    /**
     * 入库单号
     */
    private String inboundId;
    /**
     * 出库单号
     */
    private String outboundId;
    /**
     * 采购单位
     */
    private Supplier supplier;
    /**
     * 物品编号
     */
    private String itemCode;
    /**
     * 物品名称
     */
    private String itemName;
    /**
     * 物品规格
     */
    private String itemSpecifications;
    /**
     * 计量单位
     */
    private UnitDataItem unitDataItem;
    /**
     * 物品数量
     */
    private Float itemAmount;
    /**
     * 剩余数量
     */
    private Float leftAmount;
    /**
     * 含税单位
     */
    private Float taxUnitPrice;
    /**
     * 不含税单价
     */
    private Float unitPrice;
    /**
     * 含税总价
     */
    private Float totalTaxPrice;
    /**
     * 不含税总价
     */
    private Float totalPrice;
    /**
     * 入库日期
     */
    private Date inboundDate;
    /**
     * 开票税率
     */
    private TicketRateItem ticketRateItem;
    /**
     * 制单人
     */
    private String author;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 关键字
     */
    private String keyword;
    /**
     * 页码
     */
    private Page page;
}
