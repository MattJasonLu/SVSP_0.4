package com.jdlink.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by matt on 2018/5/2.
 */
public class RawWastes {
    /**
     * 序号
     */
    private String materialId;
    /**
     * 危废编码（官方）
     */
    private String code;
    /**
     * 主要原料
     */
    private String mainMaterial;
    /**
     * 辅助物
     */
    private String auxMaterial;
    /**
     * 可能引入物质
     */
    private String draginMaterial;


    public String getMaterialId() {
        return materialId;
    }

    public void setMaterialId(String materialId) {
        this.materialId = materialId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMainMaterial() {
        return mainMaterial;
    }

    public void setMainMaterial(String mainMaterial) {
        this.mainMaterial = mainMaterial;
    }

    public String getAuxMaterial() {
        return auxMaterial;
    }

    public void setAuxMaterial(String auxMaterial) {
        this.auxMaterial = auxMaterial;
    }

    public String getDraginMaterial() {
        return draginMaterial;
    }

    public void setDraginMaterial(String draginMaterial) {
        this.draginMaterial = draginMaterial;
    }

    @Override
    public String toString() {
        return "RawWastes{" +
                "materialId='" + materialId + '\'' +
                ", code='" + code + '\'' +
                ", mainMaterial='" + mainMaterial + '\'' +
                ", auxMaterial='" + auxMaterial + '\'' +
                ", draginMaterial='" + draginMaterial + '\'' +
                '}';
    }
}
