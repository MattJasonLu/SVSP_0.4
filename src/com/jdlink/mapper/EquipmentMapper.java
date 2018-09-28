package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Equipment;
import com.jdlink.domain.Produce.EquipmentDate;
import com.jdlink.domain.Produce.EquipmentItem;

import java.util.Date;
import java.util.List;

/**
 * Created by Leon on 2018/8/30.
 */
public interface EquipmentMapper {

    /**
     * 通过日期查询设备明细集合
     * @param documentNumber 单据号
     * @return 设备明细集合
     */
    List<EquipmentDate> getEquipment(String documentNumber);

    /**
     * 查询设备按日期生成的列表
     * @return 设备列表
     */
    List<EquipmentDate> listEquipment();

    /**
     * 新增设备
     */
    void addEquipment(EquipmentDate equipmentDate);

    /**
     * 查找最新单据号
     */
    List<String> getNewestId();

    /**
     * 插入设备明细
     */
    void addEquipmentItem(EquipmentItem equipmentItem);

    /**
     * 设置下拉框数据
     */
    List<Equipment> getEquipmentNameList(Equipment equipment);

    /**
     * 查询设备
     */
    List<EquipmentDate> search(EquipmentDate equipmentDate);

    /**
     * 根据日期查询设备
     */
    List<EquipmentItem> getEquipmentDataByDate(Date dayTime,Date editTime);

    /**
     * 分页
     * @param page
     * @return Equipment列表
     */
    List<EquipmentDate> equipmentListPage(Page page);

    /**
     * 获取设备数量
     * @return 设备数量
     */
    int count();

    /**
     * 查询数量
     * @return 查询数量
     */
    int searchCount(Equipment equipment);
}
