package com.jdlink.service.impl;

import com.jdlink.domain.Dictionary.SecondaryCategory;
import com.jdlink.mapper.dictionary.SecondaryCategoryMapper;
import com.jdlink.service.SecondaryCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecondaryCategoryServiceImpl implements SecondaryCategoryService {

    @Autowired
    SecondaryCategoryMapper secondaryCategoryMapper;

    @Override
    public List<SecondaryCategory> list() {
        return secondaryCategoryMapper.list();
    }

    @Override
    public SecondaryCategory getByCode(String code) {
        return secondaryCategoryMapper.getByCode(code);
    }
}
