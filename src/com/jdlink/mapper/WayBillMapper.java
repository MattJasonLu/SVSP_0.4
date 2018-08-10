package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WayBill;

import java.util.List;

public interface WayBillMapper {
    int count();
    List<WayBill> listPage(Page page);
    WayBill getById(String id);
    List<WayBill> search(WayBill wayBill);
    int searchCount(WayBill wayBill);
    int countById(String id);
    void approval(WayBill wayBill);
    void reject(WayBill wayBill);
    void submit(String id);
    void invalid(String id);
}

