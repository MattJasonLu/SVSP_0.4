package com.jdlink.service.impl;

import com.jdlink.domain.SensitiveElement;
import com.jdlink.mapper.SensitiveElementMapper;
import com.jdlink.service.SensitiveElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/5/4.
 */
@Service
public class SensitiveElementServiceImpl implements SensitiveElementService {
    @Autowired
    SensitiveElementMapper sensitiveElementMapper;
    @Override
    public void add(SensitiveElement sensitiveElement) {
        sensitiveElementMapper.add(sensitiveElement);
    }

    @Override
    public void delete(String id) {
        sensitiveElementMapper.delete(id);
    }

    @Override
    public SensitiveElement get(String id) {
        return sensitiveElementMapper.get(id);
    }

    @Override
    public void update(SensitiveElement sensitiveElement) {
        sensitiveElementMapper.update(sensitiveElement);
    }

    @Override
    public List<SensitiveElement> list() {
        return sensitiveElementMapper.list();
    }

    @Override
    public int count() {
        return sensitiveElementMapper.count();
    }
}
