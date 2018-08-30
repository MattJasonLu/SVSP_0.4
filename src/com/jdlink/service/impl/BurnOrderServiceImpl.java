package com.jdlink.service.impl;

import com.jdlink.domain.Produce.BurnOrder;
import com.jdlink.domain.Produce.Pretreatment;
import com.jdlink.mapper.BurnOrderMapper;
import com.jdlink.service.BurnOrderService;
import com.jdlink.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class BurnOrderServiceImpl implements BurnOrderService {

    @Autowired
    BurnOrderMapper burnOrderMapper;

    @Override
    public String getCurrentBurnOrderId(){
        // 生成焚烧工单号 yyyyMM00000
        Date date = new Date();   //获取当前时间
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMM");
        String prefix = simpleDateFormat.format(date);
        int count = countById(prefix) + 1;
        String suffix;
        if (count <= 9) suffix = "0000" + count;
        else if(count >9 && count <= 99) suffix = "000" + count;
        else if(count >99 && count <= 999) suffix = "00" + count;
        else if(count > 999 && count <= 9999)suffix = "0" + count;
        else suffix = "" + count;
        String id = RandomUtil.getAppointId(prefix, suffix);
        // 确保编号唯一
        while (getById(id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id =index + "";
        }
        return id;
    }

    @Override
    public int countById(String id){
        return burnOrderMapper.countById(id);
    }

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


}
