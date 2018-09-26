package com.jdlink.service;

import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.HandleCategory;

import java.util.Date;
import java.util.List;

public interface OutboundOrderService {
    List<String> check();
    void updateMaterialRequisitionOrderCheck1(OutboundOrder outboundOrder);
    List<OutboundOrder>loadOutBoundList(Page page);
    int total();
    int searchCount(OutboundOrder outboundOrder);
    List<OutboundOrder> getByOutBoundOrderId(String outboundOrderId);
    void updateOutBoundOrder(String outboundOrderId);
    List<OutboundOrder> getOutBoundOrderList();
    List<OutboundOrder> getById(String id);
    List<OutboundOrder> search(OutboundOrder outboundOrder);
    OutboundOrder getOutBoundByMId(String materialRequisitionId);
    void addSecondary(OutboundOrder outboundOrder);
    OutboundOrder  getOutBoundByInId(String inboundOrderId);
    void updateSecOutBoundOrder(OutboundOrder outboundOrder);
    void upWastesInventoryNumber(OutboundOrder outboundOrder);
    HandleCategory getHandelCategoryById(String outboundNumber);
    void upHandelCategoryById(String outboundOrderId,String  handelCategory);
    void  updateSecondart(OutboundOrder outboundOrder);
    List<OutboundOrder>  getOutBoundByRange(Date startDate, Date endDate);
    List<OutboundOrder> getOutBoundByDate (Date date);
    List<OutboundOrder>  getOutBoundByDateRangeAndEquipment(Date startDate, Date endDate,String equipment);
    List<OutboundOrder> getOutBoundByDateAndEquipment (Date date,String equipment);
    void cancelOutBoundOrder(String outboundOrderId);
    int  totalSecondaryInventory();
    List<OutboundOrder>  loadWastesOutBoundList(Page page);
    int totalWastesOutBoundRecord();
    List<OutboundOrder>  loadSecOutBoundList(Page page);
    int totalSecOutBoundRecord();
    List<Date>getNewestDate();
    List<Date>getNewestDateSec();
}
