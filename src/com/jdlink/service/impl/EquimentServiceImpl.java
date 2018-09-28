package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Equipment;
import com.jdlink.domain.Produce.EquipmentDate;
import com.jdlink.domain.Produce.EquipmentItem;
import com.jdlink.mapper.EquipmentMapper;
import com.jdlink.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EquimentServiceImpl implements  EquipmentService {

    @Autowired
    EquipmentMapper equipmentMapper;

    @Override
    public List<EquipmentDate> getEquipment(String documentNumber) {
        return equipmentMapper.getEquipment(documentNumber);
    }

    @Override
    public List<EquipmentDate> listEquipment() {
        return equipmentMapper.listEquipment();
    }

    @Override
    public void addEquipment(EquipmentDate equipmentDate) {
        equipmentMapper.addEquipment(equipmentDate);
    }

    @Override
    public List<String> getNewestId() {
        return equipmentMapper.getNewestId();
    }

    @Override
    public void addEquipmentItem(EquipmentItem equipmentItem) {
        equipmentMapper.addEquipmentItem(equipmentItem);
    }

    @Override
    public List<Equipment> getEquipmentNameList(Equipment equipment) {
        return equipmentMapper.getEquipmentNameList(equipment);
    }

    @Override
    public List<EquipmentDate> search(EquipmentDate equipmentDate) {
        return equipmentMapper.search(equipmentDate);
    }

    @Override
    public List<EquipmentItem> getEquipmentDataByDate(Date dayTime, Date editTime) {
        return equipmentMapper.getEquipmentDataByDate(dayTime,editTime);
    }

    @Override
    public List<EquipmentDate> equipmentListPage(Page page) {
        return equipmentMapper.equipmentListPage(page);
    }

    @Override
    public int count() {
        return equipmentMapper.count();
    }

    @Override
    public int searchCount(Equipment equipment) {
        return equipmentMapper.searchCount(equipment);
    }

}
