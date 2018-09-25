package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.MedicalWastes;
import com.jdlink.mapper.MedicalWastesMapper;
import com.jdlink.service.MedicalWastesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MedicalWastesServiceImpl implements MedicalWastesService {
    @Autowired
    MedicalWastesMapper medicalWastesMapper;
    @Override
    public List<String> getNewId() {
        return medicalWastesMapper.getNewId();
    }

    @Override
    public void addMedicalWastes(MedicalWastes medicalWastes) {
        medicalWastesMapper.addMedicalWastes(medicalWastes);
    }

    @Override
    public List<MedicalWastes> loadMedicalWastesList(Page page) {
        return medicalWastesMapper.loadMedicalWastesList(page);
    }

    @Override
    public List<MedicalWastes> searchMedicalWastes(MedicalWastes medicalWastes) {
        return medicalWastesMapper.searchMedicalWastes(medicalWastes);
    }

    @Override
    public MedicalWastes getMedicalWastesByDate(Date date) {
        return medicalWastesMapper.getMedicalWastesByRange(date,date).get(0);
    }

    @Override
    public List<MedicalWastes> getMedicalWastesByRange(Date startDate, Date endDate) {
        return medicalWastesMapper.getMedicalWastesByRange(startDate,endDate);
    }

    @Override
    public List<MedicalWastes> getMedicalWastesByDateAndEquipment(Date startDate, Date endDate, String equipment) {
        return medicalWastesMapper.getMedicalWastesByDateAndEquipment(startDate, endDate, equipment);
    }

    @Override
    public List<MedicalWastes> getMedicalWastesBySimpleDateAndEquipment(Date date, String equipment) {
        return medicalWastesMapper.getMedicalWastesByDateAndEquipment(date,date,equipment);
    }

    @Override
    public int total() {
        return medicalWastesMapper.total();
    }
}
