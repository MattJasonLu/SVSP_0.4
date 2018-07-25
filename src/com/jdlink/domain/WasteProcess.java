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
    /**
     * 当前时间
     */
    private Date nowTime;

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
                ", nowTime=" + nowTime +
                '}';
    }

    public Date getNowTime() {
        return nowTime;
    }

    public void setNowTime(Date nowTime) {
        this.nowTime = nowTime;
    }

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
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String time;
        try {
            time = simpleDateFormat.format(lastProcessTime);
        } catch (Exception e) {
            time = simpleDateFormat.format(new Date());
        }
        return time;
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

}
