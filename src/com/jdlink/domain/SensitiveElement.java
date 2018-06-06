package com.jdlink.domain;

/**
 * Created by matt on 2018/5/2.
 */
public class SensitiveElement {

    private String id;
    /**
     * 化学物质类型
     */
    private ChemicalType chemicalType;
    /**
     * 是否有机
     */
    private boolean isOrganic;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ChemicalType getChemicalType() {
        return chemicalType;
    }

    public void setChemicalType(ChemicalType chemicalType) {
        this.chemicalType = chemicalType;
    }

    public boolean getIsOrganic() {
        return isOrganic;
    }

    public void setIsOrganic(boolean organic) {
        isOrganic = organic;
    }
}
