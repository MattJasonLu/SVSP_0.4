package com.jdlink.domain;

public enum ContractVersion {
    companyContract("公司合同",1),
    customerContract("客户合同",2);
    private String name;
    private int index;
    ContractVersion(String name, int index) {
        this.name = name;
        this.index = index;
    }
    public static ContractVersion get(int index) {
        for (ContractVersion c : ContractVersion.values()) {
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
