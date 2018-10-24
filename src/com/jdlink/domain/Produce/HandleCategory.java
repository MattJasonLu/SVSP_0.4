package com.jdlink.domain.Produce;


public enum HandleCategory {
    Sludge("污泥",1),
    WasteLiquid("废液",2),
    Bulk("散装料",3),
    Crushing("破碎料",4),
    Distillation("精馏残渣",5),
    Suspension("悬挂链",6),
    Jelly("果冻状",7);
    private String name;
    private int index;
    HandleCategory(String name, int index) {
        this.name = name;
        this.index = index;
    }
    // 普通方法
    public static HandleCategory get(int index) {
        for (HandleCategory h : HandleCategory.values()) {
            if (h.getIndex() == index) {
                return h;
            }
        }
        return null;
    }
    public static HandleCategory getHandleCategory(String keyword) {
        for (HandleCategory p : HandleCategory.values()) {
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
