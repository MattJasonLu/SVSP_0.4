package com.jdlink.domain;

/**
 * Created by matt on 2018/7/8.
 */
public enum DocumentType {
    Contract("合同", 1),
    ManagePlan("管理计划", 2),
    EIA("环评", 3),
    BusinessLicense("营业执照", 4),
    Instruction("说明", 5),
    InvoiceInfo("开票资料", 6),
    MSDS("物质成分表", 7),
    ;
    private String name;
    private int index;
    DocumentType(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static DocumentType get(int index) {
        for (DocumentType c : DocumentType.values()) {
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
