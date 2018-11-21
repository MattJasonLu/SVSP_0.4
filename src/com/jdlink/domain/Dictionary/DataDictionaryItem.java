package com.jdlink.domain.Dictionary;

/**
 * 数据字典明细
 */
public class DataDictionaryItem {

    //明细字段编号
    private int dataDictionaryItemId;

    //外键(主表编号)
    private int dataDictionaryId;

    //明细类型编码
    private String dictionaryItemType;

    //明细类型名称
    private String dictionaryItemName;

    public int getDataDictionaryItemId() {
        return dataDictionaryItemId;
    }

    public void setDataDictionaryItemId(int dataDictionaryItemId) {
        this.dataDictionaryItemId = dataDictionaryItemId;
    }

    public int getDataDictionaryId() {
        return dataDictionaryId;
    }

    public void setDataDictionaryId(int dataDictionaryId) {
        this.dataDictionaryId = dataDictionaryId;
    }

    public String getDictionaryItemType() {
        return dictionaryItemType;
    }

    public void setDictionaryItemType(String dictionaryItemType) {
        this.dictionaryItemType = dictionaryItemType;
    }

    public String getDictionaryItemName() {
        return dictionaryItemName;
    }

    public void setDictionaryItemName(String dictionaryItemName) {
        this.dictionaryItemName = dictionaryItemName;
    }

    @Override
    public String toString() {
        return "DataDictionaryItem{" +
                "dataDictionaryItemId='" + dataDictionaryItemId + '\'' +
                ", dataDictionaryId='" + dataDictionaryId + '\'' +
                ", dictionaryItemType='" + dictionaryItemType + '\'' +
                ", dictionaryItemName='" + dictionaryItemName + '\'' +
                '}';
    }
}
