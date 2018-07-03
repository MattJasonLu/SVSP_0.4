package com.jdlink.domain;

import java.util.Date;

/**
 * Created by matt on 2018/7/3.
 */
public class Quotation {

    /**
     * 报价单编号
     */
    private String quotationId;
    /**
     * 客户(包含客户名称、联系人、电话、地址)
     */
    private Client client;
    /**
     * 开始日期
     */
    private Date startDate;
    /**
     * 结束日期
     */
    private Date endDate;
    /**
     * 是否含税
     */
    private boolean isContainTax;
    /**
     * 是否含运费
     */
    private boolean isContainFreight;

}
