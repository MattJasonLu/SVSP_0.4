package com.jdlink.service.impl;

import com.jdlink.domain.MixingElement;
import com.jdlink.mapper.MixingElementMapper;
import com.jdlink.service.MixingElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/5/4.
 */
@Service
public class MixingElementServiceImpl implements MixingElementService {
    @Autowired
    MixingElementMapper mixingElementMapper;

    @Override
    public void add(MixingElement mixingElement) {
        mixingElementMapper.add(mixingElement);
    }

    @Override
    public void delete(String id) {
        mixingElementMapper.delete(id);
    }

    @Override
    public MixingElement get(String id) {
        return mixingElementMapper.get(id);
    }

    @Override
    public void update(MixingElement mixingElement) {
        mixingElementMapper.update(mixingElement);
    }

    @Override
    public List<MixingElement> list() {
        return mixingElementMapper.list();
    }

    @Override
    public int count() {
        return mixingElementMapper.count();
    }
}
