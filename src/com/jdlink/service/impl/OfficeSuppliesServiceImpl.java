package com.jdlink.service.impl;

import com.jdlink.domain.City;
import com.jdlink.domain.OfficeSuppliesInbound;
import com.jdlink.domain.OfficeSuppliesItem;
import com.jdlink.domain.OfficeSuppliesOutbound;
import com.jdlink.mapper.CityMapper;
import com.jdlink.mapper.OfficeSuppliesMapper;
import com.jdlink.service.CityService;
import com.jdlink.service.OfficeSuppliesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class OfficeSuppliesServiceImpl implements OfficeSuppliesService {
    @Autowired
    OfficeSuppliesMapper officeSuppliesMapper;


    @Override
    public List<OfficeSuppliesInbound> listOfficeSuppliesInbound(OfficeSuppliesItem officeSuppliesItem) {
        return officeSuppliesMapper.listOfficeSuppliesInbound(officeSuppliesItem);
    }

    @Override
    public int countOfficeSuppliesInboundItem() {
        return officeSuppliesMapper.countOfficeSuppliesInboundItem();
    }

    @Override
    public void addOfficeSuppliesInbound(OfficeSuppliesInbound officeSuppliesInbound) {
        officeSuppliesMapper.addOfficeSuppliesInbound(officeSuppliesInbound);
    }

    @Override
    public int getOfficeSupplierInboundCountByPrefix(String prefix) {
        return officeSuppliesMapper.getOfficeSupplierInboundCountByPrefix(prefix);
    }

    @Override
    public String getOfficeSupplierInboundId(Date date) {
        Calendar calendar = Calendar.getInstance();
        // 如果时间对象为空则获取当前时间
        if (date != null) calendar.setTime(date);
        // 获取年份
        String year = String.valueOf(calendar.get(Calendar.YEAR));
        // 获取月份
        //得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(2);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(2);
        // 获取最新编号
        String month = nf.format(calendar.get(Calendar.MONTH) + 1);
        String prefix = year + month;
        // 获取数量
        int count = getOfficeSupplierInboundCountByPrefix(prefix) + 1;
        //得到一个NumberFormat的实例
        nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(5);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(5);
        // 获取最新编号
        String countStr = nf.format(count);
        return prefix + countStr;
    }

    @Override
    public List<OfficeSuppliesOutbound> listOfficeSuppliesOutbound(OfficeSuppliesItem officeSuppliesItem) {
        return officeSuppliesMapper.listOfficeSuppliesOutbound(officeSuppliesItem);
    }

    @Override
    public int countOfficeSuppliesOutboundItem() {
        return officeSuppliesMapper.countOfficeSuppliesOutboundItem();
    }

    @Override
    public void addOfficeSuppliesOutbound(OfficeSuppliesOutbound officeSuppliesOutbound) {
        officeSuppliesMapper.addOfficeSuppliesOutbound(officeSuppliesOutbound);
    }

    @Override
    public OfficeSuppliesItem getOfficeSuppliesInboundItemById(String id) {
        return officeSuppliesMapper.getOfficeSuppliesInboundItemById(id);
    }

    @Override
    public void updateOfficeSuppliesInboundItem(OfficeSuppliesItem officeSuppliesItem) {
        officeSuppliesMapper.updateOfficeSuppliesInboundItem(officeSuppliesItem);
    }

    @Override
    public void setInvalidOfficeSuppliesInboundItem(String id) {
        officeSuppliesMapper.setInvalidOfficeSuppliesInboundItem(id);
    }

    @Override
    public OfficeSuppliesItem getOfficeSuppliesOutboundItemById(String id) {
        return officeSuppliesMapper.getOfficeSuppliesOutboundItemById(id);
    }

    @Override
    public void updateOfficeSuppliesOutboundItem(OfficeSuppliesItem officeSuppliesItem) {
        officeSuppliesMapper.updateOfficeSuppliesOutboundItem(officeSuppliesItem);
    }

    @Override
    public void setInvalidOfficeSuppliesOutboundItem(String id) {
        officeSuppliesMapper.setInvalidOfficeSuppliesOutboundItem(id);
    }
}
