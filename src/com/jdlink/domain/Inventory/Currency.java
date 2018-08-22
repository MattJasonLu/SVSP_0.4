package com.jdlink.domain.Inventory;

/**
 * 币种
 */
public enum  Currency {
    Dollar("美元",1),
    Pound("英镑",2),
    Euro("欧元",3),
    RMB("人民币",4),
    Yen("日元",5);
    private String name;
    private int index;
    Currency(String name, int index) {
        this.name = name;
        this.index = index;
    }
    // 普通方法
    public static Currency get(int index) {
        for (Currency c : Currency.values()) {
            if (c.getIndex() == index) {
                return c;
            }
        }
        return null;
    }
    public static Currency getCurrency(String keyword) {
        for (Currency p : Currency.values()) {
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
        return "Currency{" +
                "name='" + name + '\'' +
                ", index=" + index +
                '}';
    }
}
