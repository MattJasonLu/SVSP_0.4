package com.jdlink.domain;

import java.util.Date;

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
    /**
     * 当前时间
     */
    private Date nowTime;

    @Override
    public String toString() {
        return "SensitiveElement{" +
                "id='" + id + '\'' +
                ", chemicalType=" + chemicalType +
                ", isOrganic=" + isOrganic +
                ", nowTime=" + nowTime +
                '}';
    }

    public boolean isOrganic() {
        return isOrganic;
    }

    public void setOrganic(boolean organic) {
        isOrganic = organic;
    }

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
