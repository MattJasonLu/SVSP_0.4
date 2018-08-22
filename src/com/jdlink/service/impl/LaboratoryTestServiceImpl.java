package com.jdlink.service.impl;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.mapper.LaboratoryTestMapper;
import com.jdlink.service.LaboratoryTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.List;

/**
 * Created by Leon on 2018/8/2.
 */
@Service
public class LaboratoryTestServiceImpl implements LaboratoryTestService {

    @Autowired
    LaboratoryTestMapper laboratoryTestMapper;

    @Override
    public int count() {
        return laboratoryTestMapper.count();
    }

    @Override
    public void add(LaboratoryTest laboratoryTest) {
        laboratoryTestMapper.add(laboratoryTest);
    }

    @Override
    public List<LaboratoryTest> list(Page page) {
        return laboratoryTestMapper.list(page);
    }

    @Override
    public LaboratoryTest getLaboratoryTestById(String laboratoryTestNumber) {
        return laboratoryTestMapper.getLaboratoryTestById(laboratoryTestNumber);
    }

    @Override
    public List<LaboratoryTest> search(LaboratoryTest laboratoryTest) {
        return laboratoryTestMapper.search(laboratoryTest);
    }

    @Override
    public int searchCount(LaboratoryTest laboratoryTest) {
        return laboratoryTestMapper.searchCount(laboratoryTest);
    }

    @Override
    public void setInvalid(String laboratoryTestNumber) {
        laboratoryTestMapper.setInvalid(laboratoryTestNumber);
    }

    @Override
    public void setTested(String laboratoryTestNumber) {
        laboratoryTestMapper.setTested(laboratoryTestNumber);
    }

    @Override
    public void submit(String laboratoryTestNumber) {
        laboratoryTestMapper.submit(laboratoryTestNumber);
    }

    @Override
    public void confirm(String laboratoryTestNumber) {
        laboratoryTestMapper.confirm(laboratoryTestNumber);
    }

    @Override
    public String getCurrentId() {
        //得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(4);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(4);
        // 获取最新编号
        String id;
        int index = count();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (getLaboratoryTestById(id) != null);
        return id;
    }

    @Override
    public LaboratoryTest getRecentLaboratoryTestByClientId(String clientId) {
        LaboratoryTest laboratoryTest = null;
        String laboratoryTestNumber = laboratoryTestMapper.getRecentLaboratoryTestNumberByClientId(clientId);
        if (laboratoryTestNumber != null) laboratoryTest = getLaboratoryTestById(laboratoryTestNumber);
        return laboratoryTest;
    }
}
