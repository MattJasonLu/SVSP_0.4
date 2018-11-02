package com.jdlink.mapper;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
public interface ClientMapper {

    void add(Client client);

    void delete(String clientId);

    Client getByClientId(String clientId);

    List<Client> search(Client client);

    int searchCount(Client client);

    Client getByName(String companyName);

    List<Client> get(Map params);

    List<Client> listAll();

    List<Client> get(Client client);

    void update(Client client);

    void assignSalesman(Client client);

    List<Client> list();

    List<Client> listAllocated();

    List<Client> listUnallocated();

    List<Client> list(Page page);

    List<String> listClientId();

    int total();

    void enableState(String clientId);

    void disableState(String clientId);

    void setCheckStateToSubmit(String clientId);

    void setCheckStateExamining(String clientId);

    void setCheckStateFinished(String clientId,String advice);

    void setCheckStateBacked(String clientId,String advice);

    void setFilePath(Client client);

    int count();

    List<Client> getClientList(int index, int pageSize);      //得到请求页的数据列表
    void deleteSalesId(String clienrId);

    String getSalesmanIdByName(String name);

    void updateInvoiceItem(Client client);


}
