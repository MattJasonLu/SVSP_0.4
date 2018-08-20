package com.jdlink.domain.Inventory;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Salesman;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/8/20.
 * DoubleClickTo 666
 * 出库单对象
 */
public class InboundOrder {

    /**
     * 转移联单号
     */
    private String transferDraftId;
    /**
     * 入库单号
     */
    private String inboundOrderId;
    /**
     * 入库日期
     */
    private Date inboundDate;
    /**
     * 仓库
     */
    private WareHouse wareHouse;
    /**
     * 业务员
     */
    private Salesman salesman;
    /**
     * 入库类别
     */
//    private BoundType boundType;
    /**
     * 计划数量
     */
    private float planCount;
    /**
     * 危废数量
     */
    private float actualCount;
    /**
     * 保管员编号
     */
    private String keeperId;
    /**
     * 主管编号
     */
    private String directorId;
    /**
     * 审批人编号
     */
    private String approverId;
    /**
     * 审批状态
     */
    private CheckState checkState;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 创建人编号
     */
    private String creatorId;
    /**
     * 创建日期
     */
    private Date createDate;
    /**
     * 创建部门编号
     */
    private String DepartmentId;
    /**
     * 创建公司编号
     */
    private String companyId;
    /**
     * 修改人
     */
    private String modifierId;
    /**
     * 修改时间
     */
    private Date modifyDate;
    /**
     * 记录状态
     */
    private RecordState recordState;
    /**
     * 入库单明细列表
     */
    private List<InboundOrderItem> inboundOrderItemList = new ArrayList<>();
}
