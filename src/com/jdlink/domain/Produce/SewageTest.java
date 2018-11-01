package com.jdlink.domain.Produce;

import com.jdlink.domain.Page;

//污水化验
public class SewageTest {

    private String id;//污水验单编号

    private String address;//采样点

    private float ph;//ph值

    private float COD; //COD值

    private float BOD5;//BOD5值

    private float N2;//氨氮

    private  float alkalinity;//碳酸盐碱度Cao

    private float alkalinityCaCo3;//碳酸盐碱度CaCo3

    private float alkalinityHCO3;//碳酸盐碱度HCO3-

    private  float bicarbonate;//重碳酸盐碱度Cao

    private  float bicarbonateCaCo3;//重碳酸盐碱度CaCo3

    private  float bicarbonateHCO3;//重碳酸盐碱度HCO3-

    private float nitrogen;//总氮

    private  float phosphorus;//总磷

    private String remarks;//备注

    private String sampleId;//预约单号

    //分页
    private Page page;

    public float getAlkalinityCaCo3() {
        return alkalinityCaCo3;
    }

    public void setAlkalinityCaCo3(float alkalinityCaCo3) {
        this.alkalinityCaCo3 = alkalinityCaCo3;
    }

    public float getAlkalinityHCO3() {
        return alkalinityHCO3;
    }

    public void setAlkalinityHCO3(float alkalinityHCO3) {
        this.alkalinityHCO3 = alkalinityHCO3;
    }

    public float getBicarbonateCaCo3() {
        return bicarbonateCaCo3;
    }

    public void setBicarbonateCaCo3(float bicarbonateCaCo3) {
        this.bicarbonateCaCo3 = bicarbonateCaCo3;
    }

    public float getBicarbonateHCO3() {
        return bicarbonateHCO3;
    }

    public void setBicarbonateHCO3(float bicarbonateHCO3) {
        this.bicarbonateHCO3 = bicarbonateHCO3;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public float getPh() {
        return ph;
    }

    public void setPh(float ph) {
        this.ph = ph;
    }

    public float getCOD() {
        return COD;
    }

    public void setCOD(float COD) {
        this.COD = COD;
    }

    public float getBOD5() {
        return BOD5;
    }

    public void setBOD5(float BOD5) {
        this.BOD5 = BOD5;
    }

    public float getN2() {
        return N2;
    }

    public void setN2(float n2) {
        N2 = n2;
    }

    public float getAlkalinity() {
        return alkalinity;
    }

    public void setAlkalinity(float alkalinity) {
        this.alkalinity = alkalinity;
    }

    public float getBicarbonate() {
        return bicarbonate;
    }

    public void setBicarbonate(float bicarbonate) {
        this.bicarbonate = bicarbonate;
    }

    public float getNitrogen() {
        return nitrogen;
    }

    public void setNitrogen(float nitrogen) {
        this.nitrogen = nitrogen;
    }

    public float getPhosphorus() {
        return phosphorus;
    }

    public void setPhosphorus(float phosphorus) {
        this.phosphorus = phosphorus;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getSampleId() {
        return sampleId;
    }

    public void setSampleId(String sampleId) {
        this.sampleId = sampleId;
    }

    @Override
    public String toString() {
        return "SewageTestService{" +
                "id='" + id + '\'' +
                ", address='" + address + '\'' +
                ", ph=" + ph +
                ", COD=" + COD +
                ", BOD5=" + BOD5 +
                ", N2=" + N2 +
                ", alkalinity=" + alkalinity +
                ", bicarbonate=" + bicarbonate +
                ", nitrogen=" + nitrogen +
                ", phosphorus=" + phosphorus +
                ", remarks='" + remarks + '\'' +
                ", sampleId='" + sampleId + '\'' +
                '}';
    }
}
