package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.domain.Produce.WayBillItem;
import com.jdlink.domain.Wastes;
import com.jdlink.mapper.WayBillMapper;
import com.jdlink.service.WayBillService;
import com.jdlink.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
@Service
public class WayBillServiceImpl implements WayBillService {
    @Autowired
    WayBillMapper wayBillMapper;

    @Override
    public int count(){ return wayBillMapper.count(); }

    @Override
    public List<WayBill> listPage(Page page){ return wayBillMapper.listPage(page); }

    @Override
    public WayBill getById(String id){ return wayBillMapper.getById(id); }

    @Override
    public List<WayBill> search(WayBill wayBill){ return wayBillMapper.search(wayBill); }

    @Override
    public int searchCount(WayBill wayBill){ return wayBillMapper.searchCount(wayBill); }

    @Override
    public int countById(String id){ return wayBillMapper.countById(id); }

    @Override
    public void approval(WayBill wayBill){  wayBillMapper.approval(wayBill); }

    @Override
    public void reject(WayBill wayBill){  wayBillMapper.reject(wayBill); }

    @Override
    public void submit(String id){ wayBillMapper.submit(id);}

    @Override
    public void invalid(String id){ wayBillMapper.invalid(id);}

    @Override
    public void addItem(WayBill wayBill){ wayBillMapper.addItem(wayBill); }

    @Override
    public int countItem(){ return wayBillMapper.countItem(); }

    @Override
    public WayBillItem getItemById(int id){ return wayBillMapper.getItemById(id); }

    @Override
    public String getSalesmanIdByName(String name){ return wayBillMapper.getSalesmanIdByName(name); }

    @Override
    public String getClientIdByName(String name){ return wayBillMapper.getClientIdByName(name); }

    @Override
    public String getWastesIdByName(String name){ return wayBillMapper.getWastesIdByName(name); }

    @Override
    public int countWastes(){ return wayBillMapper.countWastes();}

    @Override
    public Wastes getWastesById(String id){ return wayBillMapper.getWastesById(id); }

    @Override
    public String getCurrentWayBillId() {
        // 生成预约号
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String prefix = simpleDateFormat.format(date);
        int count = countById(prefix) + 1;
        String suffix;
        if (count <= 9) suffix = "0" + count;
        else suffix = count + "";
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (getById(id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id = index + "";
        }
        return id;
    }

    @Override
    public int getItemId() {
        int count = countItem() + 1;
        while (getItemById(count) != null) {
            count += 1;
        }
        return count;
    }

    @Override
    public String getWastesId(){
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(8);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(8);
        String id;
        int index = countWastes();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (getWastesById(id) != null);
        return id;
    }

    @Override
    public void addWayBill(WayBill wayBill){
        wayBillMapper.addWayBill(wayBill);
    }

    @Override
    public WayBill getByName(String name) { return wayBillMapper.getByName(name); }

    @Override
    public void update(WayBill wayBill){ wayBillMapper.update(wayBill); }

    @Override
    public WayBillItem getWayBillItemByClientIdAndWastesCode(String clientId, String code){ return wayBillMapper.getWayBillItemByClientIdAndWastesCode(clientId,code); }

    @Override
    public WayBill getWayBillById(String id){ return wayBillMapper.getWayBillById(id); }

    @Override
    public void deleteItem(String id){ wayBillMapper.deleteItem(id);}

    @Override
    public void updateSalesmanNameByCompanyName(String salesmanName,String companyName){ wayBillMapper.updateSalesmanNameByCompanyName(salesmanName,companyName);}

    @Override
    public WayBill getWayBillByContractId(String id){ return wayBillMapper.getWayBillByContractId(id); }

    @Override
    public void toSubmitWayBill(String id) {
        wayBillMapper.toSubmitWayBill(id);
    }

}
