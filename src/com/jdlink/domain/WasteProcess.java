package com.jdlink.domain;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by matt on 2018/5/2.
 * 危废处理流程
 */
public class WasteProcess {
    /**
     * 序号
     */
    private String processId;
    /**
     * 危废编码
     */
    private String code;
    /**
     * 生产流程描述
     */
    private String description;
    /**
     * 现有量
     */
    private float quantity = 0;
    /**
     * 上次处理时间
     */
    private Date lastProcessTime;
    /**
     * 年预计量
     */
    private float yearQuantity = 0;
    /**
     * 包装现状
     */
    private String packageSituation;

    public String getProcessId() {
        return processId;
    }

    public void setProcessId(String processId) {
        this.processId = processId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public Date getLastProcessTime() {
        return lastProcessTime;
    }

    public void setLastProcessTime(Date lastProcessTime) {
        this.lastProcessTime = lastProcessTime;
    }

    public String getLastProcessTimeStr() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time;
        try {
            time = simpleDateFormat.format(lastProcessTime);
            return time;
        } catch (Exception e) {
//            e.printStackTrace();
            return "时间错误";
        }
    }

    public float getYearQuantity() {
        return yearQuantity;
    }

    public void setYearQuantity(float yearQuantity) {
        this.yearQuantity = yearQuantity;
    }

    public String getPackageSituation() {
        return packageSituation;
    }

    public void setPackageSituation(String packageSituation) {
        this.packageSituation = packageSituation;
    }

    @Override
    public String toString() {
        return "WasteProcess{" +
                "processId='" + processId + '\'' +
                ", code='" + code + '\'' +
                ", description='" + description + '\'' +
                ", quantity=" + quantity +
                ", lastProcessTime=" + lastProcessTime +
                ", yearQuantity=" + yearQuantity +
                ", packageSituation='" + packageSituation + '\'' +
                '}';
    }
}
