package com.jdlink.domain.Produce;
//污水/软水登记明细
public class SewageregistrationItem {

    private String id;

    private String wastesCode;//代码

    private String wastesName;//名称

    private String sampleinformationId;//主表编号

    private int ph; // PH值

    private int cod;

    private int bod5;

    private int o2;

    private int lye;//碱度

    private  int n2;//氨氮

    private int relativeAlkalinity;//相对碱度

    private int dissolvedSolidForm;//溶解固形物

    private int hardness;//硬度

    private int electricalConductivity;//电导率


//    public boolean getIsPH() {
//        return isPH;
//    }
//
//    public void setIsPH(boolean PH) {
//        this.isPH = PH;
//    }
//
//    public boolean getIsCOD() {
//        return isCOD;
//    }
//
//    public void setIsCOD(boolean COD) {
//        isCOD = COD;
//    }
//
//    public boolean getIsBOD5() {
//        return isBOD5;
//    }
//
//    public void setIsBOD5(boolean BOD5) {
//        isBOD5 = BOD5;
//    }
//
//
//    public boolean getIsO2() {
//        return isO2;
//    }
//
//    public void setIsO2(boolean O2) {
//        this.isO2 = O2;
//    }
//
//    public boolean getIsLye() {
//        return isLye;
//    }
//
//    public void setIsLye(boolean Lye) {
//        isLye = Lye;
//    }
//
//    public boolean getIsN2() {
//        return isN2;
//    }
//
//    public void setIsN2(boolean N2) {
//        isN2 = N2;
//    }
//
//
//    public boolean getIsRelativeAlkalinity() {
//        return isRelativeAlkalinity;
//    }
//
//    public void setIsRelativeAlkalinity(boolean RelativeAlkalinity) {
//        isRelativeAlkalinity = RelativeAlkalinity;
//    }
//
//    public boolean getIsHardness() {
//        return isHardness;
//    }
//
//    public void setIsHardness(boolean Hardness) {
//        isHardness = Hardness;
//    }
//
//    public boolean getIsDissolvedSolidForm() {
//        return isDissolvedSolidForm;
//    }
//
//    public void setIsDissolvedSolidForm(boolean DissolvedSolidForm) {
//        isDissolvedSolidForm = DissolvedSolidForm;
//    }
//
//    public boolean getIsElectricalConductivity() {
//        return isElectricalConductivity;
//    }
//
//    public void setIsElectricalConductivity(boolean ElectricalConductivity) {
//        isElectricalConductivity = ElectricalConductivity;
//    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }

    public String getSampleinformationId() {
        return sampleinformationId;
    }

    public void setSampleinformationId(String sampleinformationId) {
        this.sampleinformationId = sampleinformationId;
    }

    public int getPh() {
        return ph;
    }

    public void setPh(int ph) {
        this.ph = ph;
    }

    public int getCod() {
        return cod;
    }

    public void setCod(int cod) {
        this.cod = cod;
    }

    public int getBod5() {
        return bod5;
    }

    public void setBod5(int bod5) {
        this.bod5 = bod5;
    }

    public int getO2() {
        return o2;
    }

    public void setO2(int o2) {
        this.o2 = o2;
    }

    public int getLye() {
        return lye;
    }

    public void setLye(int lye) {
        this.lye = lye;
    }

    public int getN2() {
        return n2;
    }

    public void setN2(int n2) {
        this.n2 = n2;
    }

    public int getRelativeAlkalinity() {
        return relativeAlkalinity;
    }

    public void setRelativeAlkalinity(int relativeAlkalinity) {
        this.relativeAlkalinity = relativeAlkalinity;
    }

    public int getDissolvedSolidForm() {
        return dissolvedSolidForm;
    }

    public void setDissolvedSolidForm(int dissolvedSolidForm) {
        this.dissolvedSolidForm = dissolvedSolidForm;
    }

    public int getHardness() {
        return hardness;
    }

    public void setHardness(int hardness) {
        this.hardness = hardness;
    }

    public int getElectricalConductivity() {
        return electricalConductivity;
    }

    public void setElectricalConductivity(int electricalConductivity) {
        this.electricalConductivity = electricalConductivity;
    }

    @Override
    public String toString() {
        return "SewageregistrationItem{" +
                "wastesCode='" + wastesCode + '\'' +
                ", wastesName='" + wastesName + '\'' +
                ", sampleinformationId=" + sampleinformationId +
                ", ph=" + ph +
                ", cod=" + cod +
                ", bod5=" + bod5 +
                ", o2=" + o2 +
                ", lye=" + lye +
                ", n2=" + n2 +
                ", relativeAlkalinity=" + relativeAlkalinity +
                ", dissolvedSolidForm=" + dissolvedSolidForm +
                ", hardness=" + hardness +
                ", electricalConductivity=" + electricalConductivity +
                '}';
    }
}
