package com.jdlink.domain.Inventory;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Wastes;

import java.util.Date;

/**
 * Created by matt on 2018/8/20.
 * DoubleClickTo 666
 */
public class InboundPlanOrder {
    /**
     * 计划单号
     */
    private String inboundPlanOrderId;
    /**
     * 计划日期
     */
    private Date planDate;
    /**
     * 产废单位
     */
    private Client produceCompany;
    /**
     * 接收单位
     */
    private Client acceptCompany;
    /**
     * 联单号
     */
    private String transferDraftId;
    /**
     * 拟转移量
     */
    private float prepareTransferCount;
    /**
     * 转移量
     */
    private float transferCount;
    /**
     * 已入库数量
     */
    private float storageCount;
    /**
     * 剩余数量
     */
    private float leftCount;
    /**
     * 磅单数量
     */
    private float poundsCount;
    /**
     * 危废(危废名称、危废代码、危废类别)
     */
    private Wastes wastes;
    /**
     * 创建人编号
     */
    private String creatorId;
    /**
     * 创建日期
     */
    private Date createDate;
    /**
     * 创建部门
     */
    private String departmentId;
    /**
     * 创建公司
     */
    private String companyId;
    /**
     * 修改人
     */
    private String modifierId;
    /**
     * 单据状态
     */
    private CheckState checkState;
    /**
     * 记录状态
     */
    private RecordState recordState;
}
