package com.jdlink.service.impl;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.Assessment;
import com.jdlink.mapper.ContractMapper;
import com.jdlink.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/5/18.
 */
@Service
public class ContractServiceImpl implements ContractService

{
    @Autowired
    ContractMapper contractMapper;

    @Override
    public void updateEm(Contract contract) {
        contractMapper.updateEm(contract);
    }

    @Override
    public void add(Contract contract) {
        contractMapper.add(contract);
    }

    @Override
    public void delete(Contract contract) {
        contractMapper.delete(contract);
    }

    @Override
    public List<Contract> getByKeyword(String keyword,String nameBykey) {
        return contractMapper.getByKeyword(keyword,nameBykey);
    }

    @Override
    public Contract getByContractId(String contractId) {
        return contractMapper.getByContractId(contractId);
    }

    @Override
    public void update(Contract contract) {
        contractMapper.update(contract);
    }

    @Override
    public void setCheckStateToExamine(Contract contract) {
        contractMapper.setCheckStateToExamine(contract);
    }

    @Override
    public void setCheckStateKeeping(Contract contract) {
        contractMapper.setCheckStateKeeping(contract);
    }

    @Override
    public void setCheckStateInvalid(Contract contract) {
        contractMapper.setCheckStateInvalid(contract);
    }

    @Override
    public int countTemplate(){ return contractMapper.countTemplate(); }

    @Override
    public int countManage(int contractIndex){ return contractMapper.countManage(contractIndex); }

    @Override
    public int count() {
        return contractMapper.count();
    }

    @Override
    public List<Contract> listPageTemplate(Page page){ return contractMapper.listPageTemplate(page); }

    @Override
    public List<Contract> listPageManege(Page page){ return contractMapper.listPageManege(page); }

    @Override
    public List<Contract> list() {
        return contractMapper.list();
    }

    @Override
    public List<Contract> list1(String name) {
        return contractMapper.list1(name);
    }

    @Override
    public List<Contract> list2(String name, String index2) {
        return contractMapper.list2(name,index2);
    }

    @Override
    public List getContractIdList() {
        return contractMapper.getContractIdList();
    }

    @Override
    public void toSubmit(String id) {
        contractMapper.toSubmit(id);
    }

    @Override
    public void updateFreight1(String id) {
        contractMapper.updateFreight1(id);
    }

    @Override public void updateFreight2(String id) {
contractMapper.updateFreight2(id);
    }

    @Override
    public List listRate1() {
        return contractMapper.listRate1();
    }

    @Override
    public List listRate2() {
        return contractMapper.listRate2();
    }

    @Override
    public Contract getModel(String contractId) {
        return contractMapper.getModel(contractId);
    }

    @Override
    public Contract getModel2(String modelName) {
        return contractMapper.getModel2(modelName);
    }


    @Override
    public void addEm(Contract contract) {
        contractMapper.addEm(contract);
    }

    @Override
    public void cancel(String contractId,String nowTime) {
        contractMapper.cancel(contractId,nowTime);
    }

    @Override
    public void cancel1(String modelName) {
        contractMapper.cancel1(modelName);
    }

    @Override
    public void approval(String contractId) {
        contractMapper.approval(contractId);
    }

    @Override
    public List<String> modelName(String key) {
        return contractMapper.modelName(key);
    }

    @Override
    public void back(String contractId,String backContent,String nowTime) {
        contractMapper.back(contractId,backContent,nowTime);
    }

    @Override
    public void opinion(String contractId, String opinion,String nowTime) {
        contractMapper.opinion(contractId,opinion,nowTime);
    }

    @Override
    public String getContent(String contractId) {
        return contractMapper.getContent(contractId);
    }

    @Override
    public Client getByClientId(String clientId) {
        return contractMapper.getByClientId(clientId);
    }

    @Override
    public List<String> getNewestContractId() {
        return contractMapper.getNewestContractId();
    }

    @Override
    public Supplier getSupplierListById(String supplierId) {
        return contractMapper.getSupplierListById(supplierId);
    }

    @Override
    public List<Salesman> listSalesmanByContract(Page page) {
        return contractMapper.listSalesmanByContract(page);
    }

    @Override
    public int countSalesmanByContract() {
        return contractMapper.countSalesmanByContract();
    }

    @Override
    public List<Contract> getContractBySalesman(String salesmanId,String month) {
        return contractMapper.getContractBySalesman(salesmanId,month);
    }

    @Override
    public List<Contract> search(Contract contract) {
        return contractMapper.search(contract);
    }

    @Override
    public List<Contract> searchModel(Contract contract) {
        return contractMapper.searchModel(contract);
    }

    @Override
    public List<Contract> getContractList(String year){ return contractMapper.getContractList(year); }

    @Override
    public List<Contract> getContractListByMonth(String month){ return contractMapper.getContractListByMonth(month); }

    @Override
    public List<Contract> getAllContractBySalesmanId(Contract contract){ return contractMapper.getAllContractBySalesmanId(contract); }

    @Override
    public  int getAllContractCountBySalesmanId(String salesmanId){ return contractMapper.getAllContractCountBySalesmanId(salesmanId); }

    public void addQuotationItem(QuotationItem quotationItem) {
       contractMapper.addQuotationItem(quotationItem);
    }

    @Override
    public void updateContract(Contract contract) {
        contractMapper.updateContract(contract);
    }

    @Override
    public void deleteQuotationItem(String contractId) {
        contractMapper.deleteQuotationItem(contractId);
    }

    @Override
    public List<Contract> getContractByClientId(String id){ return contractMapper.getContractByClientId(id); }

    @Override
    public List<Contract> searchMonthData(Assessment assessment){ return contractMapper.searchMonthData(assessment); }

    @Override
    public List<Contract> getContractByMonth(String month){ return contractMapper.getContractListByMonth(month); }

    @Override
    public  List<Contract> getContractByCompanyName(String companyName){ return contractMapper.getContractByCompanyName(companyName); }

    @Override
    public int getNewestContractId1() {
        return contractMapper.getNewestContractId1();
    }

    @Override
    public Contract getWastesInfoByCompanyName(String companyName,Date creationDate){ return contractMapper.getWastesInfoByCompanyName(companyName,creationDate);}

    @Override
    public List<QuotationItem> ContractList(Page page) {
        return contractMapper.ContractList(page);
    }

    @Override
    public int contractVolume() {
        return contractMapper.contractVolume();
    }

    @Override
    public void setFilePath(QuotationItem quotationItem) {
        contractMapper.setFilePath(quotationItem);
    }

    @Override
    public void setContractFilePath(Contract contract) {
        contractMapper.setContractFilePath(contract);
    }

    @Override
    public void updatePictureUrl(String wastesCode, String wastesName, String contractId, String url) {
        contractMapper.updatePictureUrl(wastesCode, wastesName, contractId, url);
    }

    @Override
    public List<QuotationItem> searchContractVolume(QuotationItem quotationItem) {
        return contractMapper.searchContractVolume(quotationItem);
    }

    @Override
    public void approvalModel(String contractId) {
        contractMapper.approvalModel(contractId);
    }

    @Override
    public void signContract(String contractId) {
        contractMapper.signContract(contractId);
    }

    @Override
    public List<String> getAllContractId() {
        return contractMapper.getAllContractId();
    }

    @Override
    public List<Contract> loadPageWastesContractList(Page page) {
        return contractMapper.loadPageWastesContractList(page);
    }

    @Override
    public int loadPageWastesContractListCount() {
        return contractMapper.loadPageWastesContractListCount();
    }

    @Override
    public List<Contract> searchWasteContract(Contract contract) {
        return contractMapper.searchWasteContract(contract);
    }

    @Override
    public int searchWasteContractCount(Contract contract) {
        return contractMapper.searchWasteContractCount(contract);
    }

    @Override
    public List<Contract> loadPageEmergencyContractList(Page page) {
        return contractMapper.loadPageEmergencyContractList(page);
    }

    @Override
    public int loadPageEmergencyContractListCount() {
        return contractMapper.loadPageEmergencyContractListCount();
    }

    @Override
    public List<Contract> searchEmergencyContract(Contract contract) {
        return contractMapper.searchEmergencyContract(contract);
    }

    @Override
    public int searchEmergencyContractCount(Contract contract) {
        return contractMapper.searchEmergencyContractCount(contract);
    }

    @Override
    public int loadPageLogisticsContractListCount() {
        return contractMapper.loadPageLogisticsContractListCount();
    }

    @Override
    public List<Contract> loadPageLogisticsContractList(Page page) {
        return contractMapper.loadPageLogisticsContractList(page);
    }

    @Override
    public List<Contract> searchLogisticsContract(Contract contract) {
        return contractMapper.searchLogisticsContract(contract);
    }

    @Override
    public int searchLogisticsContractCount(Contract contract) {
        return contractMapper.searchLogisticsContractCount(contract);
    }

    @Override
    public int loadPageDeriveContractListCount() {
        return contractMapper.loadPageDeriveContractListCount();
    }

    @Override
    public List<Contract> loadPageDeriveContractList(Page page) {
        return contractMapper.loadPageDeriveContractList(page);
    }

    @Override
    public List<Contract> searchDeriveContract(Contract contract) {
        return contractMapper.searchDeriveContract(contract);
    }

    @Override
    public int searchDeriveContractCount(Contract contract) {
        return contractMapper.searchDeriveContractCount(contract);
    }

    @Override
    public int loadPagePurchaseContractListCount() {
        return contractMapper.loadPagePurchaseContractListCount();
    }

    @Override
    public List<Contract> loadPagePurchaseContractList(Page page) {
        return contractMapper.loadPagePurchaseContractList(page);
    }

    @Override
    public List<Contract> searchPurchaseContract(Contract contract) {
        return contractMapper.searchPurchaseContract(contract);
    }

    @Override
    public int searchPurchaseContractCount(Contract contract) {
        return contractMapper.searchPurchaseContractCount(contract);
    }

    @Override
    public int loadPageOtherContractListCount() {
        return contractMapper.loadPageOtherContractListCount();
    }

    @Override
    public List<Contract> loadPageOtherContractList(Page page) {
        return contractMapper.loadPageOtherContractList(page);
    }

    @Override
    public List<Contract> searchOtherContract(Contract contract) {
        return contractMapper.searchOtherContract(contract);
    }

    @Override
    public int searchOtherContractCount(Contract contract) {
        return contractMapper.searchOtherContractCount(contract);
    }

    @Override
    public List<QuotationItem> getQuotationItemList() {
        return contractMapper.getQuotationItemList();
    }

}
