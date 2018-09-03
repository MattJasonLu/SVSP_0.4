package com.jdlink.service.impl;

import com.jdlink.domain.Produce.MedicalWastes;
import com.jdlink.mapper.MedicalWastesMapper;
import com.jdlink.service.MedicalWastesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<MedicalWastes> loadMedicalWastesList() {
        return medicalWastesMapper.loadMedicalWastesList();
    }

    @Override
    public List<MedicalWastes> searchMedicalWastes(MedicalWastes medicalWastes) {
        return medicalWastesMapper.searchMedicalWastes(medicalWastes);
    }
}
