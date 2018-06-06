package com.jdlink.domain;

import com.jdlink.util.CodeBaseEnum;

/**
 * Created by matt on 2018/5/2.
 * 特别关注的物质
 */
public enum WasteInclusionType implements CodeBaseEnum {
    Perchlorhydria("过氯化物", 1),
    Organonitrogen("有机氮", 2),
    DiethylEther("乙醚", 3),
    Benzene("苯", 4),
    Peroxide("过氧化物", 5),
    Radioactive("放射性物质", 6),
    Lacrimation("催泪物质", 7),
    PolychlorinatedBiphenylTerphenyls("多氯联苯-聚氯三联苯", 8),
    OrganicCyanogen("有机氰", 9),
    Anhydride("酸酐", 10),
    Selenide("硒化物", 11),
    Oxidant("氧化剂", 12),
    Explosive("爆炸物", 13),
    BiochemistryWaste("生化废料", 14),
    Phenol("苯酚", 15),
    Reductant("还原剂", 16),
    ;

    @Override
    public int code() {
        return index;
    }

    private String name;
    private int index;
    WasteInclusionType(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static WasteInclusionType get(int index) {
        for (WasteInclusionType c : WasteInclusionType.values()) {
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
