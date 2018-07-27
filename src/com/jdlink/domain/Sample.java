package com.jdlink.domain;

/**
 * Created by matt on 2018/7/27.
 */
public class Sample {
    /**
     * 样品编号
     */
    private String sampleId;
    /**
     * 样品名称
     */
    private String productName;
    /**
     * 代码
     */
    private String code;
    /**
     * 样品状态
     */
    private FormType formType;
    /**
     * 颜色
     */
    private String color;
    /**
     * 处置量
     */
    private float quantity;
    /**
     * 拟用包装
     */
    private PackageType packageType;

    public String getSampleId() {
        return sampleId;
    }

    public void setSampleId(String sampleId) {
        this.sampleId = sampleId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public PackageType getPackageType() {
        return packageType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    @Override
    public String toString() {
        return "Sample{" +
                "sampleId='" + sampleId + '\'' +
                ", productName='" + productName + '\'' +
                ", code='" + code + '\'' +
                ", formType=" + formType +
                ", color='" + color + '\'' +
                ", quantity=" + quantity +
                ", packageType=" + packageType +
                '}';
    }
}
