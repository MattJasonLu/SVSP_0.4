package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.MedicalWastes;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface MedicalWastesService {
    List<String> getNewId();
    void addMedicalWastes(MedicalWastes medicalWastes);
    List<MedicalWastes> loadMedicalWastesList(Page page);
    List<MedicalWastes> searchMedicalWastes(MedicalWastes medicalWastes);
    MedicalWastes getMedicalWastesByDate(Date date);
    List<MedicalWastes>  getMedicalWastesByRange(Date startDate, Date endDate);
    List<MedicalWastes>  getMedicalWastesByDateAndEquipment(Date startDate, Date endDate,String equipment);
    List<MedicalWastes>  getMedicalWastesBySimpleDateAndEquipment(Date date,String equipment);
    int total();
    void cancelMedicalWastes(String medicalWastesId);
    MedicalWastes  getMedicalWasteById(String medicalWastesId);
    void updateMedicalWaste(MedicalWastes medicalWastes);
    MedicalWastes getMedicalWasteFromPrevious(String date);

    MedicalWastes getCurrentWastesAmount();

    int searchMedicalWastesCount(MedicalWastes medicalWastes);
    List<MedicalWastes>UpdatePeriodAndInventory(@Param(value="keyword") String keyword );
}
