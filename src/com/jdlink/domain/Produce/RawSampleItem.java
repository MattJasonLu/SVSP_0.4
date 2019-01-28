package com.jdlink.domain.Produce;
/*原辅材料送样字表*/
public class RawSampleItem {

    /*字表主键(主表主键)*/
    private String id;

    /*外键*/
   private  String sampleinformationId;

    /*检测项目*/

    //氢氧化钠
    private Boolean sodium;

    //氢氧化钙
    private Boolean calcium;

    //干燥减量
    private Boolean dry;

    //碘吸附值
    private Boolean adsorption;

    //PH
    private Boolean ph;

    //水分
    private Boolean water;

    //灰分
    private Boolean ash;

    //粒度分布
    private Boolean particle;

    //表观密度
    private Boolean density;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean getSodium() {
        return sodium;
    }

    public void setSodium(Boolean sodium) {
        this.sodium = sodium;
    }

    public Boolean getCalcium() {
        return calcium;
    }

    public void setCalcium(Boolean calcium) {
        this.calcium = calcium;
    }

    public Boolean getDry() {
        return dry;
    }

    public void setDry(Boolean dry) {
        this.dry = dry;
    }

    public Boolean getAdsorption() {
        return adsorption;
    }

    public void setAdsorption(Boolean adsorption) {
        this.adsorption = adsorption;
    }

    public Boolean getPh() {
        return ph;
    }

    public void setPh(Boolean ph) {
        this.ph = ph;
    }

    public Boolean getWater() {
        return water;
    }

    public void setWater(Boolean water) {
        this.water = water;
    }

    public Boolean getAsh() {
        return ash;
    }

    public void setAsh(Boolean ash) {
        this.ash = ash;
    }

    public Boolean getParticle() {
        return particle;
    }

    public void setParticle(Boolean particle) {
        this.particle = particle;
    }

    public Boolean getDensity() {
        return density;
    }

    public void setDensity(Boolean density) {
        this.density = density;
    }

    public String getSampleinformationId() {
        return sampleinformationId;
    }

    public void setSampleinformationId(String sampleinformationId) {
        this.sampleinformationId = sampleinformationId;
    }

    @Override
    public String toString() {
        return "RawSampleItem{" +
                "id='" + id + '\'' +
                ", sodium=" + sodium +
                ", calcium=" + calcium +
                ", dry=" + dry +
                ", adsorption=" + adsorption +
                ", ph=" + ph +
                ", water=" + water +
                ", ash=" + ash +
                ", particle=" + particle +
                ", density=" + density +
                '}';
    }
}
