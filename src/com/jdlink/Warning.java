package com.jdlink;

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
