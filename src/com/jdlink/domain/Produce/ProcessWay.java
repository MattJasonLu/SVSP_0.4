package com.jdlink.domain.Produce;

/**
 * Created by matt on 2018/8/9.
 * DoubleClickTo 666
 */
public enum ProcessWay {
    Burning("焚烧", 1),
    Landfill("填埋",2),
    Clean("清洗",3)
    ;

    private String name;
    private int index;
    ProcessWay(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static ProcessWay get(int index) {
        for (ProcessWay c : ProcessWay.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }
    public static ProcessWay getProcessWay(String keyword) {
        for (ProcessWay p : ProcessWay.values()) {
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
