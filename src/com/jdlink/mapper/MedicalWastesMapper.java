package com.jdlink.mapper;

import com.jdlink.domain.Produce.MedicalWastes;

import java.util.List;

public interface MedicalWastesMapper {
    List<String>  getNewId();
    void addMedicalWastes(MedicalWastes medicalWastes);
    List<MedicalWastes> loadMedicalWastesList();
    List<MedicalWastes> searchMedicalWastes(MedicalWastes medicalWastes);
}
