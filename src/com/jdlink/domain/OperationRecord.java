package com.jdlink.domain;

import com.jdlink.util.CodeBaseEnum;

/**
 * Created by matt on 2018/4/23.
 */
public enum OperationRecord implements CodeBaseEnum{
    Established("已建立", 1),
    Unestablished("未建立", 2),;

    private String name;
    private int index;
    OperationRecord(String name, int index) {
        this.name = name;
        this.index = index;
    }
    @Override
    public int code() {
        return index;
    }
    // 普通方法
    public static OperationRecord get(int index) {
        for (OperationRecord c : OperationRecord.values()) {
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
