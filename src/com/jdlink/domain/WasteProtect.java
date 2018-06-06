package com.jdlink.domain;

/**
 * Created by matt on 2018/5/3.
 */
public enum WasteProtect {
    ProtectiveGlasses("防护眼镜", 1),
    ProtectiveGarment("防护服", 2),
    ProtectiveMask("防护面罩呼吸保护", 3),
    HalfMask("半面罩", 4),
    CoverMask("全面罩", 5),
    PositiveRespirator("正压呼吸器", 6),
    ProtectiveGloves("防护手套", 7),
    ;

    private String name;
    private int index;
    WasteProtect(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static WasteProtect get(int index) {
        for (WasteProtect c : WasteProtect.values()) {
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
