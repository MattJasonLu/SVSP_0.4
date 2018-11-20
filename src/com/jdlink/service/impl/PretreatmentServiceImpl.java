package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Pretreatment;
import com.jdlink.domain.Produce.PretreatmentItem;
import com.jdlink.domain.Wastes;
import com.jdlink.mapper.PretreatmentMapper;
import com.jdlink.service.PoundsService;
import com.jdlink.service.PretreatmentService;
import com.jdlink.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PretreatmentServiceImpl implements PretreatmentService {
    @Autowired
    PretreatmentMapper pretreatmentMapper;

    @Override
    public int count() {
        return pretreatmentMapper.count();
    }

    @Override
    public void add(Pretreatment pretreatment) {
        pretreatmentMapper.add(pretreatment);
    }

    @Override
    public List<Pretreatment> listPage(Page page) {
        return pretreatmentMapper.listPage(page);
    }

    @Override
    public Pretreatment getById(String id) {
        return pretreatmentMapper.getById(id);
    }

    @Override
    public List<Pretreatment> search(Pretreatment pretreatment) {
        return pretreatmentMapper.search(pretreatment);
    }

    @Override
    public List<Pretreatment> list(){ return pretreatmentMapper.list(); }

    @Override
    public int searchCount(Pretreatment pretreatment) {
        return pretreatmentMapper.searchCount(pretreatment);
    }

    @Override
    public int countById(String id) {
        return pretreatmentMapper.countById(id);
    }

    @Override
    public void invalid(Pretreatment pretreatment) {
        pretreatmentMapper.invalid(pretreatment);
    }

    @Override
    public void adjust(Pretreatment pretreatment) {
        pretreatmentMapper.adjust(pretreatment);
    }

    @Override
    public String getCurrentPretreatmentId() {
        // 生成预约号 YCyyyyMM00000
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
        while (getById("YC" + id) != null) {
            int index = Integer.parseInt(id);
            index += 1;
            id =index + "";
        }
        return "YC" + id;
    }

    @Override
    public PretreatmentItem getItemsById(int id){
        return pretreatmentMapper.getItemsById(id);
    }

    @Override
    public int getCurrentItemId(){
        int count = pretreatmentMapper.countItem() + 1;
        while (getItemsById(count) != null){
            count += 1;
        }
        return count;
    }

    @Override
    public void update(Pretreatment pretreatment){
        pretreatmentMapper.update(pretreatment);
    }

    @Override
    public void confirm(String id){ pretreatmentMapper.confirm(id);}

}
