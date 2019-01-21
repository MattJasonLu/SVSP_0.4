package com.jdlink.domain;

public class City {
    /**
     *  城市编号
     */
    private String cityId;
    /**
     * 城市名
     */
    private String cityName;
    /**
     * 省份编号
     */
    private String provinceId;
    /**
     * 产废单位数
     */
    private int number;

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(String provinceId) {
        this.provinceId = provinceId;
    }

    @Override
    public String toString() {
        return "City{" +
                "cityId='" + cityId + '\'' +
                ", cityName='" + cityName + '\'' +
                ", provinceId='" + provinceId + '\'' +
                '}';
    }
}
