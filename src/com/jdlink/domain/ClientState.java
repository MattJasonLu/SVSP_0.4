package com.jdlink.domain;

import com.jdlink.util.CodeBaseEnum;

/**
 * Created by matt on 2018/5/16.
 */
public enum ClientState implements CodeBaseEnum {
    Enabled("已启用", 1),
    Disabled("已禁用", 2),
    ;

    @Override
    public int code() {
        return index;
    }

    private String name;
    private int index;
    ClientState(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static ClientState get(int index) {
        for (ClientState c : ClientState.values()) {
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
