package com.jdlink.domain.Produce;

import com.jdlink.domain.Dictionary.MaterialCategoryItem;
import com.jdlink.domain.Dictionary.UnitDataItem;

import java.util.Date;

/**
 * 辅料备件物品管理树状结构
 */
public class IngredientsTree {
    /**
     * 主键（物品编码）
     */
    private int id;
    /**
     * 父节点ID
     */
    private int pId;
    /**
     * 物品编码
     */
    private int code;
    /**
     * 名称
     */
    private String name;
    /**
     * 规格型号
     */
    private String specification;
    /**
     * 创建时间
     */
    private Date creationTime;
    /**
     * 修改时间
     */
    private Date modifyTime;
    /**
     * 单位数据字典
     */
    private UnitDataItem unitDataItem;
    /**
     * 物资类别数据字典
     */
    private MaterialCategoryItem materialCategoryItem;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getpId() {
        return pId;
    }

    public void setpId(int pId) {
        this.pId = pId;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public Date getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Date creationTime) {
        this.creationTime = creationTime;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    public UnitDataItem getUnitDataItem() {
        return unitDataItem;
    }

    public void setUnitDataItem(UnitDataItem unitDataItem) {
        this.unitDataItem = unitDataItem;
    }

    public MaterialCategoryItem getMaterialCategoryItem() {
        return materialCategoryItem;
    }

    public void setMaterialCategoryItem(MaterialCategoryItem materialCategoryItem) {
        this.materialCategoryItem = materialCategoryItem;
    }

    @Override
    public String toString() {
        return "IngredientsTree{" +
                "id=" + id +
                ", pId=" + pId +
                ", code=" + code +
                ", name='" + name + '\'' +
                ", specification='" + specification + '\'' +
                ", creationTime=" + creationTime +
                ", modifyTime=" + modifyTime +
                ", unitDataItem=" + unitDataItem +
                ", materialCategoryItem=" + materialCategoryItem +
                '}';
    }
}
