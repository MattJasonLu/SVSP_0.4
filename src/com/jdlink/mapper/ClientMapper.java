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

    List<Client> getByKeyword(String keyword);

    Client getByName(String companyName);

    List<Client> get(Map params);

    List<Client> get(Client client);

    void update(Client client);

    List<Client> list();

    List<Client> list(Page page);

    int total();

    void enableState(String clientId);

    void disableState(String clientId);

    void setCheckStateToSubmit(String clientId);

    void setCheckStateExamining(String clientId);

    void setCheckStateFinished(String clientId);

    int count();

}
