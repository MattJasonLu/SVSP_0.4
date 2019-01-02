package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.domain.Produce.WayBillItem;
import com.jdlink.domain.Wastes;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestBody;

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
    WayBillItem getItemById(int id);
    String getSalesmanIdByName(String name);
    String getClientIdByName(String name);
    String getWastesIdByName(String name);
    int countWastes();
    Wastes getWastesById(String id);
    void addWayBill(WayBill wayBill);
    void update(WayBill wayBill);
    WayBill getByName(String name);
    WayBillItem getWayBillItemByClientIdAndWastesCode(@Param("clientId")String clientId, @Param("code")String code);
    WayBill getWayBillById(String id);
    void deleteItem(String id);
    void updateSalesmanNameByCompanyName(@Param("salesmanName") String salesmanName,@Param("companyName") String companyName);
    WayBill getWayBillByContractId(String id);
}

