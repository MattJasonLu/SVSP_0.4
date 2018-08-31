package com.jdlink.service;


import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.BurnOrder;
import com.jdlink.domain.Produce.Pretreatment;
import com.jdlink.domain.Produce.PretreatmentItem;
import org.springframework.stereotype.Service;

import java.util.List;


public interface BurnOrderService {

    int countById(String id);
    int count();
    int searchCount(BurnOrder burnOrder);
    BurnOrder getById(String id);
    void updateTemporaryAddressById(Pretreatment pretreatment);
    void insert(BurnOrder burnOrder);
    List<BurnOrder> listPage(Page page);
    List<BurnOrder> search(BurnOrder burnOrder);
    void invalid(String id);
    void update(BurnOrder burnOrder);
    int getCurrentItemId();
    PretreatmentItem getItemsById(int id);
}
