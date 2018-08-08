package com.jdlink.domain.Produce;

public enum HeavyMetal {
    Hg("汞Hg", 1),
    Na("钠Na", 2),
    Cu("铜Cu", 3),
    Ti("钛Ti", 4),
    Li("锂Li", 5),
    Se("硒Se", 6),
    Sb("锑Sb", 7),
    Ca("钙Ca", 8),
    Fe("铁Fe", 9),
    Pb("铅Pb", 10),
    Cr("铬Cr", 11),
    V("钒V", 12),
    Te("碲Te", 13),
    Zn("锌Zn", 14),
    Cd("镉Cd", 15),
    K("钾K", 16),
    Mn("锰Mn", 17),
    Co("钴Co", 18),
    Mg("镁Mg", 19),
    Al("铝Al", 20),
    As("砷As", 21),
    Si("硅Si", 22),
    Tu("钍Tu", 23),
    Ni("镍Ni", 24),
    Sn("锡Sn", 25),
    Tl("铊Tl", 26),
    ;

    private String name;
    private int index;
    HeavyMetal(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static HeavyMetal get(int index) {
        for (HeavyMetal c : HeavyMetal.values()) {
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
