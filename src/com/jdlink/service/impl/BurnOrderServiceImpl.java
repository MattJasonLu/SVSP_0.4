package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.BurnOrder;
import com.jdlink.domain.Produce.Pretreatment;
import com.jdlink.domain.Produce.PretreatmentItem;
import com.jdlink.mapper.BurnOrderMapper;
import com.jdlink.service.BurnOrderService;
import com.jdlink.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BurnOrderServiceImpl implements BurnOrderService {

    @Autowired
    BurnOrderMapper burnOrderMapper;

    @Override
    public int countById(String id){
        return burnOrderMapper.countById(id);
    }

    @Override
    public int count(){ return burnOrderMapper.count(); }

    @Override
    public int searchCount(BurnOrder burnOrder){ return burnOrderMapper.searchCount(burnOrder); }

    @Override
    public BurnOrder getById(String id){
        return burnOrderMapper.getById(id);
    }

    @Override
    public void updateTemporaryAddressById(Pretreatment pretreatment){
        burnOrderMapper.updateTemporaryAddressById(pretreatment);
    }

    @Override
    public void insert(BurnOrder burnOrder){
        burnOrderMapper.insert(burnOrder);
    }

    @Override
    public List<BurnOrder> listPage(Page page){ return burnOrderMapper.listPage(page); }

    @Override
    public void invalid(String id){ burnOrderMapper.invalid(id); }

    @Override
    public List<BurnOrder> search(BurnOrder burnOrder){ return burnOrderMapper.search(burnOrder); }

    @Override
    public void update(BurnOrder burnOrder){ burnOrderMapper.update(burnOrder); }

    @Override
    public PretreatmentItem getItemsById(int id){
        return burnOrderMapper.getItemsById(id);
    }

    @Override
    public int getCurrentItemId(){
        int count = burnOrderMapper.countItem() + 1;
        while (getItemsById(count) != null){
            count += 1;
        }
        return count;
    }
}
