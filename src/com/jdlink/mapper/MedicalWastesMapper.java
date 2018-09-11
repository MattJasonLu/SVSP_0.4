package com.jdlink.mapper;

import com.jdlink.domain.Produce.MedicalWastes;

import java.util.Date;
import java.util.List;

public interface MedicalWastesMapper {
    List<String>  getNewId();
    void addMedicalWastes(MedicalWastes medicalWastes);
    List<MedicalWastes> loadMedicalWastesList();
    List<MedicalWastes> searchMedicalWastes(MedicalWastes medicalWastes);
    List<MedicalWastes>  getMedicalWastesByRange(Date startDate, Date endDate);
}
