package com.jdlink.service;

import com.jdlink.domain.Client;
import com.jdlink.domain.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
public interface ClientService {

    void add(Client client);

    void delete(String clientId);

    Client getByClientId(String clientId);

    Client getByName(String companyName);

    List<Client> get(Map params);

    List<Client> get(Client client);

    void update(Client client);

    void assignSalesman(Client client);

    List<Client> list();

    List<Client> listAll();

    List<Client> listAllocated();

    List<Client> listUnallocated();

    List<Client> list(Page page);

    List<Client> search(Client client);

    List<String> listClientId();

    int searchCount(Client client);

    int total();

    /**
     * 启用用户
     * @param clientId
     */
    void enableState(String clientId);
    /**
     * 禁用用户
     * @param clientId
     */
    void disableState(String clientId);

    void setCheckStateToSubmit(String clientId);

    void setCheckStateExamining(String clientId);

    void setCheckStateFinished(String clientId, String advice);

    void setCheckStateBacked(String clientId, String advice);

    void setFilePath(Client client);

    int count();

    List<Client> getClientList(int index, int pageSize);      //得到请求页的数据列表

    String getCurrentId();
    void deleteSalesId(String clientId);

    String getSalesmanIdByName(String name);

    void updateInvoiceItem(Client client);

    /**
     * 根据公司名获取相似度最高的那个
     * @return
     */
    Client getClientByCompanyName(String companyName);

    Client getByNameNotState(String companyName);

    Float getCurrentInBound(String clientId);

    Float getCurrentOutBound(String clientId);

}
