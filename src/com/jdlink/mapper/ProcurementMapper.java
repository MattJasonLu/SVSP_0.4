package com.jdlink.mapper;

import com.jdlink.domain.Produce.Material;
import com.jdlink.domain.Produce.Procurement;

import java.util.Date;
import java.util.List;

public interface ProcurementMapper {
    void  add(Procurement procurement);
    List<String> getNewestId();
    void addMaterial(Material material);
    List<Procurement> getProcurementList();
    List<Procurement> getProcurementListById(String receiptNumber);
    List<Procurement> searchProcurement(Procurement procurement);
    List<String> getIngredientsList();
    void setProcurementListCancel(String receiptNumber);
    void  setProcurementListSubmit(String receiptNumber);
    int totalMouth();
    int totalEmc();
    List<Date>getNewestMouth();
}
