package com.jdlink.service.impl;

import com.jdlink.domain.Client;
import com.jdlink.domain.Salesman;
import com.jdlink.mapper.SalesmanMapper;
import com.jdlink.service.ClientService;
import com.jdlink.service.SalesmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
@Service
public class SalesmanServiceImpl implements SalesmanService {

    @Autowired
    SalesmanMapper salesmanMapper;

    @Override
    public void add(Salesman salesman) {
        salesmanMapper.add(salesman);
    }

    @Override
    public void delete(String salesmanId) {
        salesmanMapper.delete(salesmanId);
    }

    @Override
    public List<Salesman> get(Map params) {
        return salesmanMapper.get(params);
    }

    @Override
    public Salesman getBySalesmanId(String salesmanId) {
        return salesmanMapper.getBySalesmanId(salesmanId);
    }

    @Override
    public List<Salesman> getByClientId(String clientId) {
        return salesmanMapper.getByClientId(clientId);
    }

    @Override
    public void update(Salesman client) {
        salesmanMapper.update(client);
    }

    @Override
    public void assignClient(Salesman salesman) {
        salesmanMapper.assignClient(salesman);
    }

    @Override
    public List<Salesman> list() {
        return salesmanMapper.list();
    }

    @Override
    public int count() {
        return salesmanMapper.count();
    }
}
