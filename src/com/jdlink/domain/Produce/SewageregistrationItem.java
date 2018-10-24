package com.jdlink.domain.Produce;
//污水/软水登记明细
public class SewageregistrationItem {

    private String wastesCode;//代码

    private String wastesName;//名称

    private int sampleinformationId;//主表编号

    private boolean isPH; // PH值

    private boolean isCOD;

    private boolean isBOD5;

    private boolean isO2;

    private boolean isLye;

    private  boolean isN2;


    public boolean getIsPH() {
        return isPH;
    }

    public void setIsPH(boolean PH) {
        isPH = PH;
    }

    public boolean getIsN2() {
        return isN2;
    }

    public void setIsN2(boolean N2) {
        isN2 = N2;
    }

    public boolean getIsCOD() {
        return isCOD;
    }

    public void setIsCOD(boolean COD) {
        isCOD = COD;
    }

    public boolean getIsBOD5() {
        return isBOD5;
    }

    public void setIsBOD5(boolean BOD5) {
        isBOD5 = BOD5;
    }

    public boolean getIsO2() {
        return isO2;
    }

    public void setIsO2(boolean O2) {
        isO2 = O2;
    }

    public boolean getIsLye() {
        return isLye;
    }

    public void setIsLye(boolean Lye) {
        isLye = Lye;
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

    public int getSampleinformationId() {
        return sampleinformationId;
    }

    public void setSampleinformationId(int sampleinformationId) {
        this.sampleinformationId = sampleinformationId;
    }

    @Override
    public String toString() {
        return "SewageregistrationItem{" +
                "wastesCode='" + wastesCode + '\'' +
                ", wastesName='" + wastesName + '\'' +
                ", isCOD=" + isCOD +
                ", isBOD5=" + isBOD5 +
                ", isO2=" + isO2 +
                ", isLye=" + isLye +
                ", isN2=" + isN2 +
                '}';
    }
}
