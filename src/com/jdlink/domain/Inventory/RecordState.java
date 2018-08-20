package com.jdlink.domain.Inventory;

public enum RecordState {
    ToStotage("待入库",1),
    CompletePlan("计划完成",2),
    Cancel("已作废",3);
    private String name;
    private int index;
    RecordState(String name, int index) {
        this.name = name;
        this.index = index;
    }
    // 普通方法

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

    public static RecordState get(int index) {
        for (RecordState c : RecordState.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }
    public static RecordState getCheckState(String keyword) {
        for (RecordState p : RecordState.values()) {
            if(p.getName().contains(keyword)){
                return p;
            }
        }
        return null;
    }
    @Override
    public String toString() {
        return super.toString();
    }
}
