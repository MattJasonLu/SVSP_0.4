package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.mapper.WastesInfoMapper;
import com.jdlink.mapper.WayBillMapper;
import com.jdlink.service.WayBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
