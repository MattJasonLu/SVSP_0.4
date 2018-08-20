package com.jdlink.domain.Inventory;

public enum RecordState {
    Delete("删除",0),
    Usable("可用",1),
    Disabled("不可用",2);
    private String name;
    private int index;
    RecordState(String name, int index) {
        this.name = name;
        this.index = index;
    }
    // 普通方法
    public static RecordState get(int index) {
        for (RecordState c : RecordState.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }
    public static RecordState getRecordState(String keyword) {
        for (RecordState p : RecordState.values()) {
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


    @Override
    public String toString() {
        return super.toString();
    }
}
