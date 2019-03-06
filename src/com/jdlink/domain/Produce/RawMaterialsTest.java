package com.jdlink.domain.Produce;

import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Page;

import java.util.Date;

/*原辅材料化验数据结构*/
public class RawMaterialsTest {

    /*预约单号*/
    private String id;

    /*原辅材料类别*/
    private String rawMaterialsName;

    /*分页*/
    private Page page;

    /*状态数据字典*/
    private CheckStateItem checkStateItem;

    /*关键字*/
    private String keyword;

    /*创建日期*/
    private Date createTime;

    //氢氧化钠
    private float sodium;

    //氢氧化钙
    private float calcium;

    //干燥减量
    private float dry;

    //碘吸附值
    private float adsorption;

    //PH
    private float ph;

    //水分
    private float water;

    //灰分
    private float ash;

    //粒度分布
    private float particle;

    //表观密度
    private float density;

    /*备注*/
   private String remarks;



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRawMaterialsName() {
        return rawMaterialsName;
    }

    public void setRawMaterialsName(String rawMaterialsName) {
        this.rawMaterialsName = rawMaterialsName;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public float getSodium() {
        return sodium;
    }

    public void setSodium(float sodium) {
        this.sodium = sodium;
    }

    public float getCalcium() {
        return calcium;
    }

    public void setCalcium(float calcium) {
        this.calcium = calcium;
    }

    public float getDry() {
        return dry;
    }

    public void setDry(float dry) {
        this.dry = dry;
    }

    public float getAdsorption() {
        return adsorption;
    }

    public void setAdsorption(float adsorption) {
        this.adsorption = adsorption;
    }

    public float getPh() {
        return ph;
    }

    public void setPh(float ph) {
        this.ph = ph;
    }

    public float getWater() {
        return water;
    }

    public void setWater(float water) {
        this.water = water;
    }

    public float getAsh() {
        return ash;
    }

    public void setAsh(float ash) {
        this.ash = ash;
    }

    public float getParticle() {
        return particle;
    }

    public void setParticle(float particle) {
        this.particle = particle;
    }

    public float getDensity() {
        return density;
    }

    public void setDensity(float density) {
        this.density = density;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "RawMaterialsTest{" +
                "id='" + id + '\'' +
                ", rawMaterialsName='" + rawMaterialsName + '\'' +
                ", page=" + page +
                ", checkStateItem=" + checkStateItem +
                ", keyword='" + keyword + '\'' +
                ", sodium=" + sodium +
                ", calcium=" + calcium +
                ", dry=" + dry +
                ", adsorption=" + adsorption +
                ", ph=" + ph +
                ", water=" + water +
                ", ash=" + ash +
                ", particle=" + particle +
                ", density=" + density +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}
