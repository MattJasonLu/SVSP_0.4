package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.BurnOrder;
import com.jdlink.domain.Produce.Pretreatment;
import com.jdlink.domain.Produce.PretreatmentItem;

import java.util.List;

public interface BurnOrderMapper {

    int countById(String id);
    int count();
    int searchCount(BurnOrder burnOrder);
    BurnOrder getById(String id);
    void updateTemporaryAddressById(Pretreatment pretreatment);
    void add(BurnOrder burnOrder);
    List<BurnOrder> listPage(Page page);
    void invalid(BurnOrder burnOrder);
    List<BurnOrder> search(BurnOrder burnOrder);
    void update(BurnOrder burnOrder);
    int countItem();
    PretreatmentItem getItemsById(int id);

}
