package com.jdlink.domain;

import java.util.Date;
import java.util.List;

public class OfficeSuppliesOutbound {
    /**
     * 出库单号
     */
    private String outboundId;
    /**
     * 入库单列表
     */
    private List<OfficeSuppliesInbound> officeSuppliesInboundList;
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
