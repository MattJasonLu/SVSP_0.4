package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WayBill;

import java.util.List;

public interface WayBillService  {
    int count();
    List<WayBill> listPage(Page page);
    WayBill getById(String id);
    List<WayBill> search(WayBill wayBill);
    int searchCount(WayBill wayBill);
    int countById(String id);
}
