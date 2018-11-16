package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Material;
import com.jdlink.domain.Produce.Procurement;
import com.jdlink.domain.Produce.ProcurementPlan;
import com.jdlink.domain.Produce.ProcurementPlanItem;
import com.jdlink.mapper.ProcurementMapper;
import com.jdlink.service.ProcurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProcurementServiceImpl implements ProcurementService

{
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
    public List<Material> getProcurement() {
        return procurementMapper.getProcurement();
    }

    @Override
    public List<Material> searchNewProcurementPlan(Material material) {
        return procurementMapper.searchNewProcurementPlan(material);
    }

    @Override
    public int getPrefixCount(String prefix) {
        return procurementMapper.getPrefixCount(prefix);
    }

    @Override
    public void addProcurementPlan(ProcurementPlan procurementPlan) {
        procurementMapper.addProcurementPlan(procurementPlan);
    }

    @Override
    public String getApplyDepartmentByReceiptNumber(String id) {
        return procurementMapper.getApplyDepartmentByReceiptNumber(id);
    }

    @Override
    public void addProcurementPlanItem(ProcurementPlanItem procurementPlanItem) {
        procurementMapper.addProcurementPlanItem(procurementPlanItem);
    }

    @Override
    public List<ProcurementPlan> getProcurementPlanList(Page page) {
        return procurementMapper.getProcurementPlanList(page);
    }

    @Override
    public void updateProcurementState(String id) {
        procurementMapper.updateProcurementState(id);
    }

    @Override
    public List<ProcurementPlan> getProcurementPlanById(String id) {
        return procurementMapper.getProcurementPlanById(id);
    }

    @Override
    public void adjustProcurementPlan(ProcurementPlan procurementPlan) {
        procurementMapper.adjustProcurementPlan(procurementPlan);
    }

    @Override
    public void adjustProcurementPlanItem(ProcurementPlanItem procurementPlanItem) {
        procurementMapper.adjustProcurementPlanItem(procurementPlanItem);
    }

    @Override
    public void submitProcurementPlan(String id) {
        procurementMapper.submitProcurementPlan(id);
    }

    @Override
    public void approvalProcurementPlan(String procurementPlanId, String approvalName, String advice) {
        procurementMapper.approvalProcurementPlan(procurementPlanId, approvalName, advice);
    }

    @Override
    public void backProcurementPlan(String procurementPlanId, String advice) {
        procurementMapper.backProcurementPlan(procurementPlanId, advice);
    }

    @Override
    public void cancelProcurementPlanById(String id) {
        procurementMapper.cancelProcurementPlanById(id);
    }

    @Override
    public int totalProcurementPlanRecord() {
        return procurementMapper.totalProcurementPlanRecord();
    }

    @Override
    public List<ProcurementPlan> searchProcurementPlan(ProcurementPlan procurementPlan) {
        return procurementMapper.searchProcurementPlan(procurementPlan);
    }

    @Override
    public int searchProcurementPlanCount(ProcurementPlan procurementPlan) {
        return procurementMapper.searchProcurementPlanCount(procurementPlan);
    }

    @Override
    public List<Material> searchMaterial(Material material){ return procurementMapper.searchMaterial(material);}

    @Override
    public int searchMaterialTotal(Material material){ return procurementMapper.searchMaterialTotal(material);}

    @Override
    public Material getMaterialById(String id){ return procurementMapper.getMaterialById(id);}
}
