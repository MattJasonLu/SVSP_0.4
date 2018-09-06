package com.jdlink.mapper;

import com.jdlink.domain.Produce.EquipmentDate;

import java.util.List;

/**
 * Created by Leon on 2018/8/30.
 */
public interface EquipmentMapper {

    /**
     * 通过日期查询设备明细集合
     * @param id 序号
     * @return 设备明细集合
     */
    List<EquipmentDate> getEquipment(Integer  id);

    /**
     * 查询设备按日期生成的列表
     * @return 设备列表
     */
    List<EquipmentDate> listEquipment();

}
