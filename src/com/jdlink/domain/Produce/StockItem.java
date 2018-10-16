package com.jdlink.domain.Produce;

/**
 * 库存申报明细
 */
public class StockItem {

    //主表编号
    private String stockId;

    //更新用的
    private String id;

    //危废名称
    private String wastesName;

    //危废编码
    private String wastesCode;

    //数量
    private float number;

    //成分
    private String content;

    //备注
    private String remarks;

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }

    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public float getNumber() {
        return number;
    }

    public void setNumber(float number) {
        this.number = number;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "StockItem{" +
                "id='" + id + '\'' +
                ", wastesName='" + wastesName + '\'' +
                ", wastesCode='" + wastesCode + '\'' +
                ", number=" + number +
                ", content='" + content + '\'' +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}
