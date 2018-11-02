package com.jdlink.service.impl;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.mapper.ClientMapper;
import com.jdlink.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    ClientMapper clientMapper;

    @Override
    public void add(Client client) {
        clientMapper.add(client);
    }

    @Override
    public void delete(String clientId) {
        clientMapper.delete(clientId);
    }

    @Override
    public Client getByClientId(String clientId) {
        return clientMapper.getByClientId(clientId);
    }

    @Override
    public Client getByName(String companyName) {
        return clientMapper.getByName(companyName);
    }

    @Override
    public  List<Client> listAll(){ return clientMapper.listAll();}

    @Override
    public List<Client> get(Map params) {
        return clientMapper.get(params);
    }

    @Override
    public List<Client> get(Client client) {
        return clientMapper.get(client);
    }

    @Override
    public void update(Client client) {
        clientMapper.update(client);
    }

    @Override
    public void assignSalesman(Client client) {
        clientMapper.assignSalesman(client);
    }

    @Override
    public List<Client> list() {
        return clientMapper.list();
    }

    @Override
    public List<Client> listAllocated() {
        return clientMapper.listAllocated();
    }

    @Override
    public List<Client> listUnallocated() {
        return clientMapper.listUnallocated();
    }

    @Override
    public List<Client> list(Page page) {
        return clientMapper.list(page);
    }

    @Override
    public List<Client> search(Client client) {
        return clientMapper.search(client);
    }

    @Override
    public List<String> listClientId(){ return clientMapper.listClientId(); }

    @Override
    public int searchCount(Client client) {
        return clientMapper.searchCount(client);
    }

    @Override
    public int total() {
        return clientMapper.total();
    }

    @Override
    public void enableState(String clientId) {
        clientMapper.enableState(clientId);
    }

    @Override
    public void disableState(String clientId) {
        clientMapper.disableState(clientId);
    }

    @Override
    public void setCheckStateToSubmit(String clientId) {
        clientMapper.setCheckStateToSubmit(clientId);
    }

    @Override
    public void setCheckStateExamining(String clientId) {
        clientMapper.setCheckStateExamining(clientId);
    }


    @Override
    public void setCheckStateFinished(String clientId, String advice) {
        clientMapper.setCheckStateFinished(clientId,advice);
    }

    @Override
    public void setCheckStateBacked(String clientId, String advice) {
        clientMapper.setCheckStateBacked(clientId,advice);
    }

    @Override
    public void setFilePath(Client client) {
        clientMapper.setFilePath(client);
    }

    @Override
    public int count() {
        return clientMapper.count();
    }

    @Override
    public  List<Client> getClientList(int index, int pageSize){ return clientMapper.getClientList(index,pageSize); }

    @Override
    public String getCurrentId() {
        //得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(4);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(4);
        // 获取最新编号
        String id;
        int index = total();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (getByClientId(id) != null);
        return id;
    }

    @Override
    public void deleteSalesId(String clienrId) {
        clientMapper.deleteSalesId(clienrId);
    }

    @Override
    public String getSalesmanIdByName(String name){ return clientMapper.getSalesmanIdByName(name); }

    @Override
    public void updateInvoiceItem(Client client) {
        clientMapper.updateInvoiceItem(client);
    }

    /**
     * 根据公司名获取最高的那一个公司
     * @return
     */
    @Override
    public Client getClientByCompanyName(String companyName){
       List<Client> clientList = clientMapper.getClientByLikeCompanyName(companyName);
        if(clientList.size() > 1){ // 如果存在多个类似名称的公司则进行精确匹配
            return clientMapper.getClientByEqualCompanyName(companyName);
        }else {
            return clientList.get(0);
        }

    }
}
