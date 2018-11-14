package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Material;
import com.jdlink.domain.Produce.Procurement;
import com.jdlink.mapper.ProcurementMapper;
import com.jdlink.service.ProcurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProcurementServiceImpl implements ProcurementService {
    @Autowired
    ProcurementMapper procurementMapper;
    @Override
    public void add(Procurement procurement) {
        procurementMapper.add(procurement);
    }

    @Override
    public List<String> getNewestId() {
        return procurementMapper.getNewestId();
    }

    @Override
    public void addMaterial(Material material) {
        procurementMapper.addMaterial(material);
    }

    @Override
    public List<Procurement> getProcurementList(Page page) {
        return procurementMapper.getProcurementList(page);
    }

    @Override
    public List<Procurement> getProcurementListById(String receiptNumber) {
        return procurementMapper.getProcurementListById(receiptNumber);
    }

    @Override
    public List<Procurement> searchProcurement(Procurement procurement) {
        return procurementMapper.searchProcurement(procurement);
    }

    @Override
    public List<String> getIngredientsList() {
      return   procurementMapper.getIngredientsList();

    }

    @Override
    public void setProcurementListCancel(String receiptNumber) {
        procurementMapper.setProcurementListCancel(receiptNumber);
    }

    @Override
    public void setProcurementListSubmit(String receiptNumber) {
        procurementMapper.setProcurementListSubmit(receiptNumber);
    }

    @Override
    public int totalMouth() {
        return procurementMapper.totalMouth();
    }

    @Override
    public int totalEmc() {
        return procurementMapper.totalEmc();
    }

    @Override
    public List<Date> getNewestMouth() {
        return procurementMapper.getNewestMouth();
    }

    @Override
    public List<Date> getNewestEm() {
        return procurementMapper.getNewestEm();
    }

    @Override
    public List<Procurement> getEmergencyProcurementList(Page page) {
        return procurementMapper.getEmergencyProcurementList(page);
    }

    @Override
    public List<Material> getProcurementItemList(Page page){ return procurementMapper.getProcurementItemList(page);}

    @Override
    public int countProcurementItemList(){ return procurementMapper.countProcurementItemList();}

    @Override
    public void submitProcurementListById(String receiptNumber) {
        procurementMapper.submitProcurementListById(receiptNumber);
    }

    @Override
    public void updateMaterial(Material material) {
        procurementMapper.updateMaterial(material);
    }

    @Override
    public List<Material> searchMaterial(Material material){ return procurementMapper.searchMaterial(material);}

    @Override
    public int searchMaterialTotal(Material material){ return procurementMapper.searchMaterialTotal(material);}

    @Override
    public Material getMaterialById(String id){ return procurementMapper.getMaterialById(id);}
}
