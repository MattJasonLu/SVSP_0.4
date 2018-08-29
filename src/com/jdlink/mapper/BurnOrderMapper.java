package com.jdlink.mapper;

import com.jdlink.domain.Produce.BurnOrder;
import com.jdlink.domain.Produce.Pretreatment;

public interface BurnOrderMapper {

    int countById(String id);
    BurnOrder getById(String id);
    void updateTemporaryAddressById(Pretreatment pretreatment);
    void insert(BurnOrder burnOrder);
}
