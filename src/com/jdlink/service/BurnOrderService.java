package com.jdlink.service;


import com.jdlink.domain.Produce.BurnOrder;
import com.jdlink.domain.Produce.Pretreatment;
import org.springframework.stereotype.Service;


public interface BurnOrderService {

    String getCurrentBurnOrderId();
    int countById(String id);
    BurnOrder getById(String id);
    void updateTemporaryAddressById(Pretreatment pretreatment);
    void insert(BurnOrder burnOrder);

}
