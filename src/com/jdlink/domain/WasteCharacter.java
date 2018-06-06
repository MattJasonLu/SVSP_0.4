package com.jdlink.domain;

/**
 * Created by matt on 2018/5/3.
 */
public enum WasteCharacter {
    Virulence("毒性", 1),
    Flammable("易燃", 2),
    Sour("酸性", 3),
    Alkaline("碱性", 4),
    Explosion("易爆性", 5),
    Oxidability("氧化性", 6),
    Reducibility("还原性", 7),
    WaterFlammable("遇水易燃", 8),
    WaterVirulence("遇水易释放有毒气", 9),
    AirFlammable("接触空气可发生自燃", 10),
    ;

    private String name;
    private int index;
    WasteCharacter(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static WasteCharacter get(int index) {
        for (WasteCharacter c : WasteCharacter.values()) {
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
