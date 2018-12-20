package com.jdlink.domain;

/**
 * 预警模块数据结构
 */
public class Warning {
    /**
     * 主键
     */
    private int id;

    /**
     * 预警名称
     */
    private String warningName;

    /**
     * 预警阈值
     */
    private Float  warningThreshold;

    /**
     * 预警单位
     * @return
     */
    private String warningUnit;

    /**
     * 分页
     * @return
     */
    private Page page;

    /**
     * 关键字
     * @return
     */
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

    public String getWarningUnit() {
        return warningUnit;
    }

    public void setWarningUnit(String warningUnit) {
        this.warningUnit = warningUnit;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWarningName() {
        return warningName;
    }

    public void setWarningName(String warningName) {
        this.warningName = warningName;
    }

    public Float getWarningThreshold() {
        return warningThreshold;
    }

    public void setWarningThreshold(Float warningThreshold) {
        this.warningThreshold = warningThreshold;
    }

    @Override
    public String toString() {
        return "Warning{" +
                "id=" + id +
                ", warningName='" + warningName + '\'' +
                ", warningThreshold=" + warningThreshold +
                '}';
    }
}
