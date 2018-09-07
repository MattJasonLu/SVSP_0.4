package com.jdlink.service.impl;

import com.jdlink.domain.Produce.EquipmentDate;
import com.jdlink.mapper.EquipmentMapper;
import com.jdlink.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquimentServiceImpl implements EquipmentService {

    @Autowired
    EquipmentMapper equipmentMapper;

    @Override
    public List<EquipmentDate> getEquipment(Integer id) {
        return equipmentMapper.getEquipment(id);
    }

    @Override
    public List<EquipmentDate> listEquipment() {
        return equipmentMapper.listEquipment();
    }

    @Override
    public void addEquipment(EquipmentDate equipmentDate) {

    }
}
