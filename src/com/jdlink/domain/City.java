package com.jdlink.domain;

public class City {
    String cityid;
    String cityname;
    String provincedId;

    public String getCityid() {
        return cityid;
    }

    public void setCityid(String cityid) {
        this.cityid = cityid;
    }

    public String getCityname() {
        return cityname;
    }

    public void setCityname(String cityname) {
        this.cityname = cityname;
    }

    public String getProvincedId() {
        return provincedId;
    }

    public void setProvincedId(String provincedId) {
        this.provincedId = provincedId;
    }

    @Override
    public String toString() {
        return "City{" +
                "cityid='" + cityid + '\'' +
                ", cityname='" + cityname + '\'' +
                ", provincedId='" + provincedId + '\'' +
                '}';
    }
}
