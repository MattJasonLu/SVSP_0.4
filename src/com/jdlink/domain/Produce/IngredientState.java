package com.jdlink.domain.Produce;

import com.jdlink.util.CodeBaseEnum;

/**
 * 辅料/备件 入库领用出库状态
 */
public enum IngredientState implements CodeBaseEnum {

    ToInBound("待入库",1),
    InBounded("已入库",2),
    PartInBound("部分入库",3),
    ToReceive("待领用",4),
    Received("已领用", 5),
    PartReceived("部分领用",6),
    ToOutBound("待出库",7),
    OutBounded("已出库",8),
    PartOutBound("部分出库",9),
    ;

    @Override
    public int code() {
        return index;
    }

    private String name;
    private int index;
    IngredientState(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static IngredientState get(int index) {
        for (IngredientState c : IngredientState.values()) {
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
