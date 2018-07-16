package com.jdlink.service.impl;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.mapper.ClientMapper;
import com.jdlink.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<Client> getByKeyword(String keyword) {
        return clientMapper.getByKeyword(keyword);
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
    public void setCheckStateFinished(String clientId) {
        clientMapper.setCheckStateFinished(clientId);
    }

    @Override
    public void setCheckStateBacked(String clientId) {
        clientMapper.setCheckStateBacked(clientId);
    }

    @Override
    public void setFilePath(Client client) {
        clientMapper.setFilePath(client);
    }

    @Override
    public int count() {
        return clientMapper.count();
    }
}
