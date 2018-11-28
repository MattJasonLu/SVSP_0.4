package com.jdlink.mapper;

import com.jdlink.domain.Inventory.OutboundOrder;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.HandleCategory;

import java.util.Date;
import java.util.List;

public interface OutboundOrderMapper {
    List<String> check();

    void updateMaterialRequisitionOrderCheck1(OutboundOrder outboundOrder);

    List<OutboundOrder> loadOutBoundList(Page page);
    List<OutboundOrder>  loadWastesOutBoundList(Page page);
    int total();
    int totalWastesOutBoundRecord();
    int searchCount(OutboundOrder outboundOrder);

    List<OutboundOrder> getByOutBoundOrderId(String outboundOrderId);

    void updateOutBoundOrder(String outboundOrderId);

    List<OutboundOrder> getOutBoundOrderList();

    List<OutboundOrder> getById(String id);

    List<OutboundOrder> search(OutboundOrder outboundOrder);

    OutboundOrder getOutBoundByMId(String materialRequisitionId);

    void addSecondary(OutboundOrder outboundOrder);

    OutboundOrder getOutBoundByInId(String inboundOrderId);

    void updateSecOutBoundOrder(OutboundOrder outboundOrder);

    void upWastesInventoryNumber(OutboundOrder outboundOrder);
    int getHandelCategoryById(String outboundNumber);
    void upHandelCategoryById(String outboundOrderId,int id);
    void  updateSecondart(OutboundOrder outboundOrder);
     List<OutboundOrder>  getOutBoundByRange(Date startDate, Date endDate);
    List<OutboundOrder>  getOutBoundByDateRangeAndEquipment(Date startDate, Date endDate,String equipment);
    void cancelOutBoundOrder(String outboundOrderId);
   int  totalSecondaryInventory();
    List<OutboundOrder>  loadSecOutBoundList(Page page);
    int totalSecOutBoundRecord();
    List<Date>getNewestDate();
    List<OutboundOrder> getOutBoundOrderByClientId(String id);
    List<Date>getNewestDateSec();

}
