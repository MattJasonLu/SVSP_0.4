package com.jdlink.domain.Dictionary;

import com.jdlink.domain.Page;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 数据字典
 */
public class DataDictionary {

    //主键
    private int dataDictionaryId;

    //字典类型编码
    private String dictionaryType;

    //字典类型名称
    private String dictionaryName;

    //创建时间
    private Date dateTime;

    //字典明细列表
    private List<DataDictionaryItem> dataDictionaryItemList=new ArrayList<>();

    //分页
    private Page page;

    //关键字
    private String keywords;

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public List<DataDictionaryItem> getDataDictionaryItemList() {
        return dataDictionaryItemList;
    }

    public void setDataDictionaryItemList(List<DataDictionaryItem> dataDictionaryItemList) {
        this.dataDictionaryItemList = dataDictionaryItemList;
    }

    public int getDataDictionaryId() {
        return dataDictionaryId;
    }

    public void setDataDictionaryId(int dataDictionaryId) {
        this.dataDictionaryId = dataDictionaryId;
    }

    public String getDictionaryType() {
        return dictionaryType;
    }

    public void setDictionaryType(String dictionaryType) {
        this.dictionaryType = dictionaryType;
    }

    public String getDictionaryName() {
        return dictionaryName;
    }

    public void setDictionaryName(String dictionaryName) {
        this.dictionaryName = dictionaryName;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    @Override
    public String toString() {
        return "DataDictionary{" +
                "dataDictionaryId='" + dataDictionaryId + '\'' +
                ", dictionaryType='" + dictionaryType + '\'' +
                ", dictionaryName='" + dictionaryName + '\'' +
                ", dateTime=" + dateTime +
                ", dataDictionaryItemList=" + dataDictionaryItemList +
                '}';
    }
}
