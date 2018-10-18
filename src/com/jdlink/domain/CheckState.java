package com.jdlink.domain;

import com.jdlink.util.CodeBaseEnum;

/**
 * Created by matt on 2018/5/16.
 */
public enum CheckState implements CodeBaseEnum{
    Examining("审批中", 1),
    ToSubmit("待提交", 2),
    Finished("已完成", 3),
    Backed("已驳回", 4),
    ToExamine("待审批", 5),
    Keeping("履约中", 6),
    Invalid("已作废", 7),
    Enabled("生效中", 8),
    Disabled("已失效", 9),
    Tested("已化验", 10),
    Submitted("已提交", 11),
    Confirm("已确认", 12),
    NewBuild("新建",13),
    Approval("审批通过",14),
    ToInbound("待入库",15),
    ToOutbound("待出库",16),
    ToPick("待领料",17),
    Picked("已领料",18),
    OutBounded("已出库",19),
    Processed("已处理",20),
    Locked("已锁定", 21),
    ToGenerated("待生成物料", 21),
    Retired("已退库",22),
    ;

    private String name;
    private int index;
    CheckState(String name, int index) {
        this.name = name;
        this.index = index;
    }

    @Override
    public int code() {
        return index;
    }

    // 普通方法
    public static CheckState get(int index) {
        for (CheckState c : CheckState.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }
    public static CheckState getCheckState(String keyword) {
        for (CheckState p : CheckState.values()) {
            if(p.getName().contains(keyword)){
                return p;
            }
        }
        return null;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

}
