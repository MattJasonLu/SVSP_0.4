package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.domain.Produce.WayBillItem;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface WayBillService  {
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
    Wastes getWastesById(String id);
    void addWayBill(WayBill wayBill);
    WayBill getByName(String name);
    void update(WayBill wayBill);
    /**
     * 获得当前接运单的序列号
     * @return 序列号
     */
    String getCurrentWayBillId();

    String getItemId();

    String getWastesId();

    /**
     * 根据客户Id和危废编码获取接运单明细数据
     */
    WayBillItem getWayBillItemByClientIdAndWastesCode(String clientId, String code);
    WayBill getWayBillById(String id);
    void deleteItem(String id);
    void updateSalesmanNameByCompanyName(String salesmanName,String companyName);
}
