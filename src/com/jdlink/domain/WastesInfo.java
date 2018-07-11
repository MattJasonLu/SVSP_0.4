package com.jdlink.domain;

public class WastesInfo {//产废表1实体结构
    private String category;
    private String industry;
    private String code;
    private String description;
    private String wastesCharacter;



    public WastesInfo() {
    }
    public WastesInfo(String category, String industry, String code, String description,String wastesCharacter) {
        this.category = category;
        this.industry = industry;
        this.code = code;
        this.description = description;
        this.wastesCharacter=wastesCharacter;
    }

    @Override
    public String toString() {
        return "StuEntity [category=" + category + ", industry=" + industry + ", code=" + code
                + ", description=" + description + ",wastesCharacter="+wastesCharacter+"]";
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getIndustry() {
        return industry;
    }
    public void setIndustry(String industry) {
        this.industry = industry;
    }
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public String getDescription() { return description; }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getWastesCharacter(){return wastesCharacter;}
    public void setCharacter(String wastesCharacter){this.wastesCharacter=wastesCharacter;}
}

