package com.jdlink.service;

import com.jdlink.domain.Produce.MedicalWastes;

import java.util.Date;
import java.util.List;

public interface MedicalWastesService {
    List<String> getNewId();
    void addMedicalWastes(MedicalWastes medicalWastes);
    List<MedicalWastes> loadMedicalWastesList();
    List<MedicalWastes> searchMedicalWastes(MedicalWastes medicalWastes);
    MedicalWastes getMedicalWastesByDate(Date date);
    List<MedicalWastes>  getMedicalWastesByRange(Date startDate, Date endDate);
}
