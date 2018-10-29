package com.jdlink.domain;

import com.jdlink.util.CodeBaseEnum;

/**
 * Created by matt on 2018/5/8.
 * 样品预约单状态
 */
public enum ApplyState implements CodeBaseEnum {
    ToSignIn("待签收", 1),
    SignedIn("已签收", 2),
    Backed("已退回", 3),
    Appointed("已预约", 4),
    SampleTaked("已取样", 5),
    Canceld("预约取消", 6),
    Invalid("已作废",7),
    ToSubmit("待提交", 8),
    ToExamine("待审批", 9),
    Examining("审批中", 10),
    Finished("已完成", 11),
    Rejected("已拒收",12),
    Received("已收样",13)
    ;

    @Override
    public int code() {
        return index;
    }

    private String name;
    private int index;
    ApplyState(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static ApplyState get(int index) {
        for (ApplyState c : ApplyState.values()) {
            if (c.getIndex() == index) {
                return c;
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
