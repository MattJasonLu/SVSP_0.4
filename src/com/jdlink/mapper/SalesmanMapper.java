package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Salesman;
import com.jdlink.domain.Sample;

import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
public interface SalesmanMapper {

    void add(Salesman salesman);

    void delete(String salesmanId);

    List<Salesman> get(Map params);

    List<Salesman> listPage(Page page);

    Salesman getBySalesmanId(String salesmanId);

    List<Salesman> getByClientId(String clientId);

    void assignClient(Salesman salesman);

    void update(Salesman salesman);

    List<Salesman> list();

    List<Salesman> search(Salesman salesman);

    int searchCount(Salesman salesman);

    int count();

    List<String> getClientBySalesId(String salesmanId);

    Salesman getSalesmanByCompanyName(String companyName);


}
