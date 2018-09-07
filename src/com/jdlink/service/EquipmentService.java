package com.jdlink.service;

import com.jdlink.domain.Produce.EquipmentDate;

import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface EquipmentService {

    /**
     * 通过日期查询设备明细集合
     * @param id 单据号
     * @return 设备明细集合
     */
    List<EquipmentDate> getEquipment(Integer id);

    /**
     * 查询设备按日期生成的列表
     * @return 设备列表
     */
    List<EquipmentDate> listEquipment();

    /**
     * 新增设备
     */
    void addEquipment(EquipmentDate equipmentDate);
}
