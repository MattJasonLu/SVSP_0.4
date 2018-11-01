package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Salesman;

import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
public interface SalesmanService {

    void add(Salesman salesman);

    void delete(String salesmanId);

    List<Salesman> get(Map params);

    Salesman getBySalesmanId(String salesmanId);

    List<Salesman> getByClientId(String clientId);

    void update(Salesman salesman);

    void assignClient(Salesman salesman);

    List<Salesman> list();

    List<Salesman> listPage(Page page);

    List<Salesman> search(Salesman salesman);

    int searchCount(Salesman salesman);

    int count();
    List<String> getClientBySalesId(String salesmanId);

    Salesman getSalesmanByCompanyName(String companyName);

}
