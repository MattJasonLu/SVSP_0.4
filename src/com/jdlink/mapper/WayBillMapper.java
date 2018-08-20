package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.domain.Produce.WayBillItem;

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
    void addItem(WayBill wayBill);
    int countItem();
    WayBillItem getItemById(String id);
    String getSalesmanIdByName(String name);
    String getClientIdByName(String name);
    String getWastesIdByName(String name);
    int countWastes();
    String getWastesById(String id);
    void addWayBill(WayBill wayBill);
    void update(WayBill wayBill);
    WayBill getByName(String name);
}

