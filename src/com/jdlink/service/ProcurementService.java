package com.jdlink.service;

import com.jdlink.domain.Produce.Material;
import com.jdlink.domain.Produce.Procurement;

import java.util.List;

public interface ProcurementService {
    void  add(Procurement procurement);
    List<String> getNewestId();
    void addMaterial(Material material);
    List<Procurement> getProcurementList();
    List<Procurement> getProcurementListById(String receiptNumber);
    List<Procurement> searchProcurement(Procurement procurement);
    List<String> getIngredientsList();
}
