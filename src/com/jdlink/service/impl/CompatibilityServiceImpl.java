package com.jdlink.service.impl;

import com.jdlink.domain.Produce.Compatibility;
import com.jdlink.mapper.CompatibilityMapper;
import com.jdlink.service.CompatibilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompatibilityServiceImpl implements CompatibilityService {
    @Autowired
    CompatibilityMapper compatibilityMapper;
    @Override
    public int total() {
        return compatibilityMapper.total() ;
    }

    @Override
    public Compatibility getByCompatibilityId(String pwId) {
        return compatibilityMapper.getByCompatibilityId(pwId);
    }

    @Override
    public int getLastId() {
        return compatibilityMapper.getLastId();
    }

    @Override
    public List<String> check() {
        return compatibilityMapper.check();
    }

    @Override
    public void updateCompatibility(String compatibilityId, String id, String id2) {
        compatibilityMapper.updateCompatibility(compatibilityId,id,id2);
    }
}
