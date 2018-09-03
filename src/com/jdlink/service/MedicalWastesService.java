package com.jdlink.service;

import com.jdlink.domain.Produce.MedicalWastes;

import java.util.List;

public interface MedicalWastesService {
    List<String> getNewId();
    void addMedicalWastes(MedicalWastes medicalWastes);
    List<MedicalWastes> loadMedicalWastesList();
    List<MedicalWastes> searchMedicalWastes(MedicalWastes medicalWastes);
}
